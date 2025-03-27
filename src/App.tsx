
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileFrame } from "./components/MobileFrame";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import MeditationPage from "./pages/MeditationPage";
import PlanPage from "./pages/PlanPage";
import CommunityPage from "./pages/CommunityPage";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Listen for device ready event when running as a native app
  useEffect(() => {
    document.addEventListener('deviceready', onDeviceReady, false);
    
    return () => {
      document.removeEventListener('deviceready', onDeviceReady, false);
    };
  }, []);

  const onDeviceReady = () => {
    // Initialize any native plugins or functionality here
    console.log('Device is ready');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="h-full w-full bg-gradient-to-br from-gray-950 to-gray-900">
              <MobileFrame>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/meditation" element={<MeditationPage />} />
                  <Route path="/plan" element={<PlanPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                </Routes>
              </MobileFrame>
            </div>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
