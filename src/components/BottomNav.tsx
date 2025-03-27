
import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, User2, BarChart3 } from "lucide-react";

export const BottomNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-t border-white/5 flex justify-around items-center px-2 animate-slide-up">
      <Link
        to="/home"
        className={`nav-item ${pathname === "/home" ? "active" : "text-muted-foreground"}`}
      >
        <Home size={20} />
        <span>Home</span>
      </Link>
      
      <Link
        to="/chat"
        className={`nav-item ${pathname === "/chat" ? "active" : "text-muted-foreground"}`}
      >
        <MessageCircle size={20} />
        <span>Chat</span>
      </Link>
      
      <Link
        to="/meditation"
        className={`nav-item ${pathname === "/meditation" ? "active" : "text-muted-foreground"}`}
      >
        <User2 size={20} />
        <span>Meditation</span>
      </Link>
      
      <Link
        to="/plan"
        className={`nav-item ${pathname === "/plan" ? "active" : "text-muted-foreground"}`}
      >
        <BarChart3 size={20} />
        <span>Plan</span>
      </Link>
    </div>
  );
};
