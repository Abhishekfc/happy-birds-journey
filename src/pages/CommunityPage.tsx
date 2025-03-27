
import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Flag, PenSquare, Users } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

const posts = [
  {
    id: 1,
    author: {
      name: "Emily Thompson",
      avatar: null,
      isVerified: true
    },
    time: "2 hours ago",
    content: "I've been struggling with anxiety lately. What techniques do you use to calm down when you feel an attack coming?",
    likes: 24,
    comments: 8,
    tags: ["Anxiety", "Coping"]
  },
  {
    id: 2,
    author: {
      name: "Michael Chen",
      avatar: null,
      isVerified: false
    },
    time: "5 hours ago",
    content: "Just completed a 30-day meditation challenge and I feel amazing! Anyone else tried this? Would love to hear your experiences.",
    likes: 42,
    comments: 15,
    tags: ["Meditation", "Challenge"]
  },
  {
    id: 3,
    author: {
      name: "Sarah Johnson",
      avatar: null,
      isVerified: true
    },
    time: "Yesterday",
    content: "Does anyone have recommendations for books on managing work-related stress? I'm looking for practical advice that I can apply in my daily life.",
    likes: 17,
    comments: 21,
    tags: ["Books", "Work-Stress"]
  }
];

const CommunityPage = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  
  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
    } else {
      setLikedPosts(prev => [...prev, postId]);
      
      if (user && !user.isGuest) {
        // Update user coins
        const updatedUser = { 
          ...user, 
          coins: user.coins + 2
        };
        localStorage.setItem("happyBirdsUser", JSON.stringify(updatedUser));
        
        toast.success("You liked a post! +2 coins");
      }
    }
  };
  
  return (
    <div className="pb-20">
      <Header title="Community" />
      
      <div className="px-4 mb-4">
        <p className="text-sm text-muted-foreground">
          Connect with others, share experiences, and find support in our community.
        </p>
      </div>
      
      <div className="flex gap-2 overflow-x-auto px-4 pb-4 no-scrollbar">
        <Button
          variant="outline"
          size="sm"
          className={`${activeCategory === "all" ? "border-happy-500 text-happy-500" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All Posts
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`${activeCategory === "anxiety" ? "border-happy-500 text-happy-500" : ""}`}
          onClick={() => setActiveCategory("anxiety")}
        >
          Anxiety
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`${activeCategory === "depression" ? "border-happy-500 text-happy-500" : ""}`}
          onClick={() => setActiveCategory("depression")}
        >
          Depression
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`${activeCategory === "meditation" ? "border-happy-500 text-happy-500" : ""}`}
          onClick={() => setActiveCategory("meditation")}
        >
          Meditation
        </Button>
      </div>
      
      <div className="px-4 mb-4 flex gap-3">
        <Button className="flex-1 gap-2">
          <PenSquare size={16} />
          <span>New Post</span>
        </Button>
        <Button variant="outline" className="flex-1 gap-2">
          <Users size={16} />
          <span>Find Groups</span>
        </Button>
      </div>
      
      <div className="px-4 space-y-4 pb-4">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="glass-card p-4 rounded-xl animate-enter"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-bird-500/20 text-bird-400 text-sm">
                  {post.author.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-medium text-sm">{post.author.name}</h3>
                  {post.author.isVerified && (
                    <span className="text-blue-400 text-xs">✓</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{post.time}</p>
              </div>
              
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Flag size={14} className="text-muted-foreground" />
              </Button>
            </div>
            
            <p className="text-sm mb-3">{post.content}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map(tag => (
                <div 
                  key={tag} 
                  className="px-2 py-1 rounded-full bg-secondary text-xs text-muted-foreground"
                >
                  #{tag}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between border-t border-white/5 pt-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-1.5 text-xs ${likedPosts.includes(post.id) ? "text-happy-500" : "text-muted-foreground"}`}
                onClick={() => handleLike(post.id)}
              >
                <ThumbsUp size={14} />
                <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1.5 text-xs text-muted-foreground"
              >
                <MessageSquare size={14} />
                <span>{post.comments}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default CommunityPage;
