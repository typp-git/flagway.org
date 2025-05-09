import React from "react";
import { Redo } from "lucide-react";
import { MenuButton } from "./MenuButton";
import { Editor } from "@tiptap/react";

interface RedoButtonProps {
  editor: Editor;
}

export const RedoButton = ({ editor }: RedoButtonProps) => {
  return (
    <MenuButton
      editor={editor}
      onClick={() => editor.chain().focus().redo().run()}
      title="Redo"
    >
      <Redo size={16} />
    </MenuButton>
  );
}; 