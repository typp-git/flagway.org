import React from "react";

interface ToolbarProps {
  dense?: boolean;
  children: React.ReactNode;
}

export const Toolbar = ({ dense = false, children }: ToolbarProps) => {
  return (
    <div className={`flex items-center gap-1 ${dense ? "p-1" : "p-2"}`}>
      {children}
    </div>
  );
};

export const ToolbarDivider = () => {
  return <div className="h-6 w-px bg-gray-200 mx-1" />;
}; 