
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type User = {
  id: string;
  phoneNumber: string;
  name: string;
  isGuest: boolean;
  joinDate: Date;
  streak: number;
  coins: number;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("happyBirdsUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phoneNumber: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        phoneNumber,
        name: "John Doe",
        isGuest: false,
        joinDate: new Date(),
        streak: 0,
        coins: 50
      };
      
      setUser(newUser);
      localStorage.setItem("happyBirdsUser", JSON.stringify(newUser));
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: "google_" + Math.random().toString(36).substr(2, 9),
        phoneNumber: "+1234567890",
        name: "Google User",
        isGuest: false,
        joinDate: new Date(),
        streak: 0,
        coins: 50
      };
      
      setUser(newUser);
      localStorage.setItem("happyBirdsUser", JSON.stringify(newUser));
      toast.success("Logged in with Google!");
      navigate("/home");
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: "apple_" + Math.random().toString(36).substr(2, 9),
        phoneNumber: "+1234567890",
        name: "Apple User",
        isGuest: false,
        joinDate: new Date(),
        streak: 0,
        coins: 50
      };
      
      setUser(newUser);
      localStorage.setItem("happyBirdsUser", JSON.stringify(newUser));
      toast.success("Logged in with Apple!");
      navigate("/home");
    } catch (error) {
      toast.error("Apple login failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuest = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: "guest_" + Math.random().toString(36).substr(2, 9),
        phoneNumber: "",
        name: "Guest User",
        isGuest: true,
        joinDate: new Date(),
        streak: 0,
        coins: 10
      };
      
      setUser(newUser);
      localStorage.setItem("happyBirdsUser", JSON.stringify(newUser));
      toast.success("Logged in as guest!");
      navigate("/home");
    } catch (error) {
      toast.error("Guest login failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("happyBirdsUser");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        loginWithApple,
        loginAsGuest,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
