
import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, ChevronRight, BarChart, Activity, Clock, Target, Book } from "lucide-react";
import { toast } from "sonner";

const tasks = [
  { id: 1, title: "Complete daily mood check-in", completed: true },
  { id: 2, title: "10-minute meditation session", completed: false },
  { id: 3, title: "Read article on stress management", completed: false },
  { id: 4, title: "Take a 15-minute walk outside", completed: false },
  { id: 5, title: "Write in gratitude journal", completed: false }
];

const goals = [
  { 
    id: 1, 
    title: "Reduce Anxiety", 
    icon: <Activity size={18} />,
    progress: 35, 
    activities: 3,
    color: "bg-green-500" 
  },
  { 
    id: 2, 
    title: "Better Sleep", 
    icon: <Clock size={18} />,
    progress: 60, 
    activities: 4,
    color: "bg-blue-500" 
  },
  { 
    id: 3, 
    title: "Build Confidence", 
    icon: <Target size={18} />,
    progress: 20, 
    activities: 2,
    color: "bg-purple-500" 
  }
];

const PlanPage = () => {
  const { user } = useAuth();
  const [userTasks, setUserTasks] = useState(tasks);
  
  const toggleTask = (id: number) => {
    setUserTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    
    if (!userTasks.find(t => t.id === id)?.completed && user) {
      // Update user coins
      const updatedUser = { 
        ...user, 
        coins: user.coins + 5
      };
      localStorage.setItem("happyBirdsUser", JSON.stringify(updatedUser));
      
      toast.success("Task completed! +5 coins");
    }
  };
  
  const completedTasks = userTasks.filter(t => t.completed).length;
  const progress = (completedTasks / userTasks.length) * 100;
  
  return (
    <div className="pb-20">
      <Header title="Plan" />
      
      <div className="px-4 mb-6">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Today's Progress</h3>
            <span className="text-sm text-muted-foreground">{completedTasks}/{userTasks.length} tasks</span>
          </div>
          
          <Progress value={progress} className="h-2 mb-4" />
          
          {userTasks.map(task => (
            <div 
              key={task.id}
              className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
            >
              <button 
                onClick={() => toggleTask(task.id)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 size={20} className="text-primary" />
                ) : (
                  <Circle size={20} />
                )}
              </button>
              <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Goals</h2>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            See All
          </Button>
        </div>
        
        <div className="space-y-3">
          {goals.map((goal, index) => (
            <div 
              key={goal.id}
              className="glass-card p-4 rounded-xl flex items-center justify-between animate-enter"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full ${goal.color}/20 flex items-center justify-center`}>
                  {goal.icon}
                </div>
                <div>
                  <h3 className="font-medium">{goal.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={goal.progress} className="h-1.5 w-24" />
                    <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronRight size={16} />
              </Button>
            </div>
          ))}
          
          <Button variant="outline" className="w-full gap-2">
            <span className="text-lg">+</span> Add New Goal
          </Button>
        </div>
      </div>
      
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Recommended Resources</h2>
        
        <div className="glass-card p-4 rounded-xl animate-enter border-l-4 border-l-happy-500">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-happy-500/20 flex items-center justify-center text-happy-400">
              <Book size={20} />
            </div>
            <div>
              <h3 className="font-medium">How to Build Mental Resilience</h3>
              <p className="text-xs text-muted-foreground mt-1">10 min read • Dr. Sarah Johnson</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-3">
            Read Article
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default PlanPage;
