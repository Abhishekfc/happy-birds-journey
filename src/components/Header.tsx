
import { Bell, Search, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  title?: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center justify-between p-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 bg-accent">
          <AvatarFallback className="text-sm text-white">
            {user?.name.substring(0, 2) || "G"}
          </AvatarFallback>
        </Avatar>
        {title && <h2 className="text-lg font-semibold">{title}</h2>}
      </div>
      
      <div className="flex items-center gap-4">
        <button className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-foreground">
          <Search size={18} />
        </button>
        <button className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-foreground">
          <Bell size={18} />
        </button>
      </div>
    </div>
  );
};
