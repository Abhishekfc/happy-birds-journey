
import React from "react";

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-container h-full w-full">
      {children}
    </div>
  );
};
