import React from "react";
import { Bold } from "lucide-react";
import { MenuButton } from "./MenuButton";
import { Editor } from "@tiptap/react";

interface BoldButtonProps {
  editor: Editor;
}

export const BoldButton = ({ editor }: BoldButtonProps) => {
  return (
    <MenuButton
      editor={editor}
      onClick={() => editor.chain().focus().toggleBold().run()}
      isActive={editor.isActive("bold")}
      title="Bold"
    >
      <Bold size={16} />
    </MenuButton>
  );
}; 