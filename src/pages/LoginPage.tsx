
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginWithGoogle, loginWithApple, loginAsGuest, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(phoneNumber, password);
  };

  return (
    <div className="flex flex-col h-full p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-8 mt-4">Login</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-muted-foreground">
            Enter your mobile number
          </label>
          <div className="flex items-center border border-input rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-ring">
            <div className="bg-muted px-3 py-2 text-sm border-r border-input">+91</div>
            <Input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="1234567890"
              className="border-0 focus-visible:ring-0"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
            Enter your password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex justify-end">
            <button type="button" className="text-xs text-primary hover:underline">
              forgot password?
            </button>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-border"></div>
        <span className="px-3 text-xs text-muted-foreground">or</span>
        <div className="flex-1 border-t border-border"></div>
      </div>
      
      <div className="flex flex-col gap-3">
        <Button 
          variant="outline" 
          className="relative" 
          onClick={loginWithGoogle}
          disabled={isLoading}
        >
          <svg className="absolute left-4 h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>
        
        <Button 
          variant="outline" 
          className="relative" 
          onClick={loginWithApple}
          disabled={isLoading}
        >
          <svg className="absolute left-4 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.86-3.1.38-1.09-.5-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.18 15.89 3.26 7.46 9.38 7c1.54.12 2.64.89 3.6.92 1.22-.16 2.4-.98 3.8-.9 1.83.13 3.23.9 4.1 2.32-3.34 2.14-2.29 6.61.58 8.12-.7 1.47-1.6 2.9-3.39 2.82-.16-.01-.33-.07-.5-.08-1.27-.05-2.1.58-2.85 1.05-.35.22-.38.22-.67.03z"/>
            <path d="M12.8 7c.06-1.94 1.6-3.88 3.52-4-1.07 1.79-.77 3.75.7 5.4-1.44.52-2.95-.15-4.22-1.4z"/>
          </svg>
          Continue with Apple
        </Button>
        
        <Button 
          variant="ghost" 
          className="text-muted-foreground"
          onClick={loginAsGuest}
          disabled={isLoading}
        >
          Continue as Guest
        </Button>
      </div>
      
      <div className="mt-auto mb-4 text-center text-sm">
        <span className="text-muted-foreground">Don't have an account?</span>{" "}
        <button className="text-primary font-medium hover:underline">Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
