import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  profile: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (credentials: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setProfile(parsedUser);
    }
    setLoading(false);
  }, []);

  // ---------------------------------------------
  // LOGIN
  // ---------------------------------------------
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);

    const savedUsers = JSON.parse(localStorage.getItem("all_users") || "[]");

    const found = savedUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!found) {
      toast.error("Invalid email or password");
      setLoading(false);
      return;
    }

    localStorage.setItem("auth_user", JSON.stringify(found));
    setUser(found);
    setProfile(found);

    toast.success("Logged in successfully!");
    setLoading(false);
  };

  // ---------------------------------------------
  // SIGN UP
  // ---------------------------------------------
  const signUp = async ({ email, password, firstName, lastName }: any) => {
    setLoading(true);

    const users = JSON.parse(localStorage.getItem("all_users") || "[]");

    // prevent duplicate accounts
    if (users.find((u: any) => u.email === email)) {
      toast.error("Email already exists");
      setLoading(false);
      return false;
    }

    const newUser = { email, password, firstName, lastName };

    users.push(newUser);
    localStorage.setItem("all_users", JSON.stringify(users));

    // auto-login after signup
    localStorage.setItem("auth_user", JSON.stringify(newUser));
    setUser(newUser);
    setProfile(newUser);

    toast.success("Account created successfully!");
    setLoading(false);
    return true;
  };

  // ---------------------------------------------
  // LOGOUT
  // ---------------------------------------------
  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
    setProfile(null);
    toast.success("Logged out successfully.");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        profile,
        login,
        signUp,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
