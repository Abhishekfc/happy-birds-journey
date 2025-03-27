
import React from "react";

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mobile-frame">
      <div className="h-7 w-full flex items-center justify-between px-5 pt-1">
        <div className="text-xs font-medium">11:30</div>
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
        </div>
      </div>
      <div className="app-container">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 flex justify-center">
        <div className="h-1 w-32 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};
