
import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { ChevronLeft, Heart, Headphones, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const meditations = [
  {
    id: 1,
    title: "Sleep Meditation",
    description: "Best practice meditations",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    duration: "10 min",
    category: "sleep"
  },
  {
    id: 2,
    title: "Anxiety Relief",
    description: "Calm your mind and body",
    image: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85",
    duration: "15 min",
    category: "anxiety"
  },
  {
    id: 3,
    title: "Morning Energy",
    description: "Start your day right",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
    duration: "8 min",
    category: "morning"
  }
];

const MeditationPage = () => {
  const navigate = useNavigate();
  const [activeMeditation, setActiveMeditation] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const startMeditation = (id: number) => {
    setActiveMeditation(id);
    setProgress(0);
    
    // Simulate progress
    if (!isPlaying) {
      setIsPlaying(true);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 300);
    }
  };
  
  const closeMeditation = () => {
    setActiveMeditation(null);
    setIsPlaying(false);
    setProgress(0);
  };
  
  const meditation = meditations.find(m => m.id === activeMeditation);
  
  return (
    <div className="h-full flex flex-col">
      {activeMeditation && meditation ? (
        <div className="flex flex-col h-full relative animate-fade-in">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button 
              onClick={closeMeditation}
              className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center"
            >
              <X size={18} />
            </button>
            <button className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
              <Heart size={18} />
            </button>
          </div>
          
          <div className="h-[45%] relative">
            <img 
              src={meditation.image} 
              alt={meditation.title} 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          </div>
          
          <div className="flex-1 px-6 pt-4 pb-24 flex flex-col">
            <h1 className="text-2xl font-bold mb-1">{meditation.title}</h1>
            <p className="text-muted-foreground">{meditation.description}</p>
            
            <div className="mt-8 mb-4">
              <Progress value={progress} className="h-1" />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <div>{Math.floor(progress / 100 * parseInt(meditation.duration)) + " min"}</div>
                <div>{meditation.duration}</div>
              </div>
            </div>
            
            <p className="text-sm mb-8">
              Meditation is a practice where an individual uses a technique – such as mindfulness, 
              or focusing their mind on a particular object, thought, or activity – to train attention 
              and awareness, and achieve a mentally clear and emotionally calm state.
            </p>
            
            <div className="mt-auto flex items-center justify-center gap-6">
              <button className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                <Headphones size={24} />
              </button>
              
              <button 
                className="h-16 w-16 rounded-full bg-primary flex items-center justify-center"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <div className="h-5 w-5 bg-white rounded-sm"></div>
                ) : (
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                )}
              </button>
              
              <button className="h-14 w-14 rounded-full bg-muted flex items-center justify-center transform rotate-45">
                <Headphones size={24} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 p-4">
            <button 
              onClick={() => navigate(-1)} 
              className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>
            <h1 className="text-xl font-semibold">Meditation</h1>
          </div>
          
          <div className="px-4 pb-4">
            <p className="text-sm text-muted-foreground">
              Discover peace and mindfulness with guided meditations.
            </p>
          </div>
          
          <div className="flex-1 px-4 pb-20 space-y-6 overflow-y-auto">
            <div>
              <h2 className="font-medium mb-3">Recommended for you</h2>
              
              <div className="space-y-4">
                {meditations.map((item, index) => (
                  <div 
                    key={item.id}
                    className="relative h-48 rounded-xl overflow-hidden animate-enter"
                    style={{animationDelay: `${index * 100}ms`}}
                    onClick={() => startMeditation(item.id)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-white/20 text-white text-xs">
                          {item.duration}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-sm text-white/80">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="font-medium mb-3">Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                {["Sleep", "Anxiety", "Focus", "Stress"].map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    className="h-auto py-6 flex flex-col gap-2"
                  >
                    <div className="text-xl">
                      {category === "Sleep" ? "😴" : 
                       category === "Anxiety" ? "😌" :
                       category === "Focus" ? "🧠" : "🧘"}
                    </div>
                    <span>{category}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <BottomNav />
        </>
      )}
    </div>
  );
};

// Needed to prevent TypeScript error
const Badge = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={`inline-block px-2 py-0.5 rounded-full ${className}`}>
    {children}
  </div>
);

export default MeditationPage;
