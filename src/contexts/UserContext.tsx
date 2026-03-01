import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { User, ItokenData } from "../types";
import { authService } from "../services/api";

interface UserContextType {
  isAuthenticated: boolean;
  tokenData: ItokenData | null;
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, data: { password: string, confirmPassword: string }) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [tokenData, setTokenData] = useState<ItokenData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (authToken: string) => {
    try {
      const response = await authService.getMe(authToken);
      setUser(response.data);
    } catch (error) {
      console.error("Failed to load user profile", error);
    }
  };

  // Initial load: check for token and its expiration
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem("auth_token");
      if (savedToken) {
        try {
          const decodedToken = jwtDecode<ItokenData>(savedToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            // Token expired
            handleLogout();
          } else {
            // Token valid
            setToken(savedToken);
            setTokenData(decodedToken);
            await loadUserProfile(savedToken);
          }
        } catch (error) {
          // Invalid token format
          handleLogout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const handleLogin = async (credentials: any) => {
    try {
      const data = await authService.login(credentials);

      if (data.token) {
        const decodedToken = jwtDecode<ItokenData>(data.token);
        localStorage.setItem("auth_token", data.token);
        setToken(data.token);
        setTokenData(decodedToken);
        await loadUserProfile(data.token);
        toast.success("Logged in successfully!");
      } else {
        throw new Error("No token received.");
      }
    } catch (error: any) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout API failed, but clearing local session anyway.", error);
    } finally {
      localStorage.removeItem("auth_token");
      setToken(null);
      setTokenData(null);
      setUser(null);
      toast.success("Logged out successfully.");
    }
  };

  const handleForgetPassword = async (email: string) => {
    try {
      await authService.forgetPassword(email);
      toast.success("If an account exists with this email, a password reset link has been sent.");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to send reset email.";
      toast.error(msg);
      throw error;
    }
  };

  const handleResetPassword = async (resetToken: string, data: { password: string, confirmPassword: string }) => {
    try {
      await authService.resetPassword(resetToken, data);
      toast.success("Password reset successfully. You can now log in.");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to reset password.";
      toast.error(msg);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated: !!token && !!user,
        tokenData,
        user,
        token,
        loading,
        login: handleLogin,
        logout: handleLogout,
        forgetPassword: handleForgetPassword,
        resetPassword: handleResetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
