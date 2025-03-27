
import { useState, useEffect } from "react";
import { BottomNav } from "../components/BottomNav";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, MessageCircle, Users, BarChart2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [userMood, setUserMood] = useState<string | null>(null);
  const [dailyCheckin, setDailyCheckin] = useState(false);

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning!");
    else if (hour < 18) setGreeting("Good Afternoon!");
    else setGreeting("Good Evening!");
    
    // Simulate active users
    setActiveUsers(Math.floor(Math.random() * 5000) + 75000);
    
    // Check if user has already checked in today
    const lastCheckin = localStorage.getItem("lastCheckin");
    if (lastCheckin) {
      const today = new Date().toDateString();
      if (lastCheckin === today) {
        setDailyCheckin(true);
        const mood = localStorage.getItem("userMood");
        if (mood) setUserMood(mood);
      }
    }
  }, []);
  
  const handleMoodSelect = (mood: string) => {
    setUserMood(mood);
    setDailyCheckin(true);
    localStorage.setItem("userMood", mood);
    localStorage.setItem("lastCheckin", new Date().toDateString());
    
    if (user && !user.isGuest) {
      // Update user streak and coins
      const updatedUser = { 
        ...user, 
        streak: user.streak + 1,
        coins: user.coins + 10
      };
      localStorage.setItem("happyBirdsUser", JSON.stringify(updatedUser));
      
      toast.success("Daily check-in complete! +10 coins");
    } else {
      toast.success("Daily check-in complete!");
    }
  };
  
  return (
    <div className="pb-20 pt-2">
      <Header />
      
      <div className="px-4 pt-2 pb-6 animate-slide-up">
        <h1 className="text-xl font-bold">{greeting}</h1>
        <p className="text-sm text-muted-foreground">
          {activeUsers.toLocaleString()} people are here today
        </p>
        
        {user && !user.isGuest && (
          <div className="flex items-center gap-2 mt-2">
            <div className="px-2 py-1 bg-accent/30 rounded-full text-xs">
              {user.streak} day streak
            </div>
            <div className="px-2 py-1 bg-happy-500/20 rounded-full text-xs flex items-center gap-1">
              <span className="text-happy-400">•</span> {user.coins} coins
            </div>
          </div>
        )}
      </div>
      
      <div className="px-4 mb-6">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="relative h-28 overflow-hidden">
            <img 
              src="/lovable-uploads/556aa736-7e15-4ab8-beee-b38be3d23c65.png"
              alt="Mindfulness" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bird-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <div className="text-xs text-bird-200 mb-1">with Natalie James</div>
              <h3 className="text-lg font-semibold">Five Principles of Living Mindfully</h3>
              <div className="flex items-center mt-1 gap-1 text-xs text-white/70">
                <Clock size={12} />
                <span>Today · 05:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Let us support you!</h2>
        
        <div className="space-y-3 animate-enter">
          <Button 
            variant="secondary" 
            className="w-full justify-between items-center h-auto py-4 group"
            onClick={() => navigate("/chat")}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-happy-500/20 flex items-center justify-center text-happy-400">
                <MessageCircle size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium">Chat</div>
                <div className="text-xs text-muted-foreground">One-to-one and group chat</div>
              </div>
            </div>
            <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full justify-between items-center h-auto py-4 group"
            onClick={() => navigate("/community")}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-bird-500/20 flex items-center justify-center text-bird-400">
                <Users size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium">Community</div>
                <div className="text-xs text-muted-foreground">Ask questions and get support</div>
              </div>
            </div>
            <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full justify-between items-center h-auto py-4 group"
            onClick={() => navigate("/plan")}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <BarChart2 size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium">Plan</div>
                <div className="text-xs text-muted-foreground">Take steps to grow & learn</div>
              </div>
            </div>
            <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      
      <div className="px-4 mb-6">
        <div className="glass-card rounded-xl p-4">
          <h3 className="font-medium mb-2">Daily Check-in</h3>
          <p className="text-sm text-muted-foreground mb-3">How are you feeling today?</p>
          
          {dailyCheckin && userMood ? (
            <div className="text-center py-2">
              <div className="text-xl mb-1">{
                userMood === "Great" ? "😄" : 
                userMood === "Good" ? "🙂" : 
                userMood === "Okay" ? "😐" : 
                userMood === "Sad" ? "😔" : "😢"
              }</div>
              <p className="text-sm">You're feeling <span className="font-medium">{userMood}</span> today</p>
              <p className="text-xs text-muted-foreground mt-2">Check back tomorrow for another check-in</p>
            </div>
          ) : (
            <div className="flex justify-between">
              <button onClick={() => handleMoodSelect("Great")} className="mood-button">
                <span className="text-xl">😄</span>
                <span className="text-xs">Great</span>
              </button>
              <button onClick={() => handleMoodSelect("Good")} className="mood-button">
                <span className="text-xl">🙂</span>
                <span className="text-xs">Good</span>
              </button>
              <button onClick={() => handleMoodSelect("Okay")} className="mood-button">
                <span className="text-xl">😐</span>
                <span className="text-xs">Okay</span>
              </button>
              <button onClick={() => handleMoodSelect("Sad")} className="mood-button">
                <span className="text-xl">😔</span>
                <span className="text-xs">Sad</span>
              </button>
              <button onClick={() => handleMoodSelect("Awful")} className="mood-button">
                <span className="text-xl">😢</span>
                <span className="text-xs">Awful</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="px-4 mb-6">
        <div className="glass-card p-4 rounded-xl border-l-4 border-l-happy-500">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Daily Motivation</h3>
          </div>
          <p className="text-sm italic my-2">"The only way to do great work is to love what you do."</p>
          <p className="text-xs text-muted-foreground">— Steve Jobs</p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default HomePage;
