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
      return;
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

// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { AuthError, User as SupabaseUser } from "@supabase/supabase-js";
// import { Profile } from "../types";
// import toast from "react-hot-toast";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: SupabaseUser | null;
//   profile: Profile | null;
//   login: (credentials: {
//     email: string;
//     password: string;
//   }) => Promise<AuthError | null>;
//   signUp: (credentials: {
//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//   }) => Promise<AuthError | null>;
//   logout: () => Promise<void>;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<SupabaseUser | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   // ------------------------------------------------------------------
//   // LOAD SESSION + PROFILE
//   // ------------------------------------------------------------------
//   useEffect(() => {
//     const load = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       setUser(session?.user ?? null);

//       if (session?.user) {
//         const profileRes = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", session.user.id)
//           .single();

//         setProfile(profileRes.data || null);
//       }

//       setLoading(false);
//     };

//     load();

//     // Listen for auth changes
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         setUser(session?.user ?? null);

//         if (session?.user) {
//           const profileRes = await supabase
//             .from("profiles")
//             .select("*")
//             .eq("id", session.user.id)
//             .single();

//           console.log("Profile response:", profileRes);

//           setProfile(profileRes.data || null);
//         } else {
//           setProfile(null);
//         }

//         setLoading(false);
//       }
//     );

//     return () => listener.subscription.unsubscribe();
//   }, []);

//   // ------------------------------------------------------------------
//   // LOGIN
//   // ------------------------------------------------------------------
//   const login = async (credentials: { email: string; password: string }) => {
//     setLoading(true);
//     const { error } = await supabase.auth.signInWithPassword(credentials);

//     if (error) toast.error(error.message);

//     setLoading(false);
//     return error;
//   };

//   // ------------------------------------------------------------------
//   // SIGN UP + INSERT INTO profiles
//   // ------------------------------------------------------------------
//   const signUp = async (credentials: any) => {
//     setLoading(true);

//     // 1) Create Auth User
//     const { data, error } = await supabase.auth.signUp({
//       email: credentials.email,
//       password: credentials.password,
//       options: {
//         data: {
//           firstName: credentials.firstName,
//           lastName: credentials.lastName,
//         },
//       },
//     });
//     console.log(data, error);
//     if (error) {
//       toast.error(error.message);
//       setLoading(false);
//       return error;
//     }

//     const user = data.user;
//     console.log("Signed up user:", user);

//     // // 2) INSERT into profiles table
//     // if (user) {
//     //   const { error: profileError } = await supabase.from("profiles").insert({
//     //     id: user.id,
//     //     first_name: credentials.firstName,
//     //     last_name: credentials.lastName,
//     //   });

//     //   if (profileError) {
//     //     console.error("Failed to insert profile:", profileError);
//     //   }
//     // }

//     toast.success("Account created successfully!");
//     setLoading(false);
//     return null;
//   };

//   // ------------------------------------------------------------------
//   // LOGOUT
//   // ------------------------------------------------------------------
//   const logout = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) toast.error(error.message);
//     else toast.success("Logged out.");
//     setUser(null);
//     setProfile(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated: !!user,
//         user,
//         profile,
//         login,
//         signUp,
//         logout,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };
