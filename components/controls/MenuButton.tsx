import React from "react";
import { Editor } from "@tiptap/react";

interface MenuButtonProps {
  editor: Editor;
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title?: string;
}

export const MenuButton = ({
  onClick,
  isActive,
  children,
  title,
}: MenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded hover:bg-gray-100 ${
        isActive ? "bg-gray-100" : ""
      }`}
      title={title}
    >
      {children}
    </button>
  );
}; 