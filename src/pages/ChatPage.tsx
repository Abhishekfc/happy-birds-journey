
import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const counselors = [
  {
    id: 1,
    name: "Dr. Arlene McCoy",
    title: "Clinical Psychologist",
    location: "New York, NY",
    rating: 4.9,
    experience: 8,
    avatar: null,
    verified: true
  },
  {
    id: 2,
    name: "Dr. Dianne Russell",
    title: "Counseling Psychologist",
    location: "Boston, MA",
    rating: 4.8,
    experience: 6,
    avatar: null,
    verified: true
  },
  {
    id: 3,
    name: "Dr. Annette Black",
    title: "Counseling Psychologist",
    location: "Seattle, WA",
    rating: 4.7,
    experience: 5,
    avatar: null,
    verified: true
  }
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("counsellors");
  const [selectedFilter, setSelectedFilter] = useState("experience");
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-4">
        <button 
          onClick={() => navigate(-1)} 
          className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="text-xl font-semibold">Chat</h1>
      </div>
      
      <div className="px-4 pb-4">
        <p className="text-sm text-muted-foreground">
          Discuss with a counsellor your feelings and resolve your issues.
        </p>
      </div>
      
      <div className="flex gap-2 px-4 mb-4">
        <Button
          variant={activeTab === "counsellors" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("counsellors")}
          className="flex-1"
        >
          <span className="text-sm">👨‍⚕️ Counsellors</span>
        </Button>
        <Button
          variant={activeTab === "my-conversations" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("my-conversations")}
          className="flex-1"
        >
          <span className="text-sm">💬 My Conversations</span>
        </Button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto px-4 pb-4 no-scrollbar">
        <Button
          variant="outline"
          size="sm"
          className={`${selectedFilter === "experience" ? "border-happy-500 text-happy-500" : ""}`}
          onClick={() => setSelectedFilter("experience")}
        >
          Years of Experience
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`${selectedFilter === "gender" ? "border-happy-500 text-happy-500" : ""}`}
          onClick={() => setSelectedFilter("gender")}
        >
          Gender
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`${selectedFilter === "rating" ? "border-happy-500 text-happy-500" : ""}`}
          onClick={() => setSelectedFilter("rating")}
        >
          Rating
        </Button>
      </div>
      
      <div className="flex-1 px-4 pb-20 space-y-4 overflow-y-auto">
        {counselors.map((counselor) => (
          <div 
            key={counselor.id}
            className="glass-card p-4 rounded-xl animate-enter"
            style={{animationDelay: `${(counselor.id - 1) * 100}ms`}}
          >
            <div className="flex gap-4">
              <Avatar className="h-16 w-16 rounded-full border border-white/10">
                <AvatarFallback className="bg-bird-500/20 text-bird-400">
                  {counselor.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-medium">{counselor.name}</h3>
                  {counselor.verified && (
                    <Badge variant="outline" className="h-5 bg-blue-500/10 text-blue-400 text-[10px] font-normal">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">{counselor.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{counselor.location}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <div className="text-yellow-500">★</div>
                    <span className="text-sm">{counselor.rating}</span>
                    <span className="text-xs text-muted-foreground"> / 5 avg</span>
                  </div>
                  
                  <Button size="sm" className="h-7 rounded-full px-3">
                    🔴 I'm live
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="glass-card p-4 rounded-xl animate-enter" style={{animationDelay: "300ms"}}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
              🤖
            </div>
            <div>
              <h3 className="font-medium">Talk to AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Get immediate help 24/7</p>
            </div>
          </div>
          <Button className="w-full">Start Conversation</Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default ChatPage;
