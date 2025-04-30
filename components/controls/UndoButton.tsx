import React from "react";
import { Undo } from "lucide-react";
import { MenuButton } from "./MenuButton";
import { Editor } from "@tiptap/react";

interface UndoButtonProps {
  editor: Editor;
}

export const UndoButton = ({ editor }: UndoButtonProps) => {
  return (
    <MenuButton
      editor={editor}
      onClick={() => editor.chain().focus().undo().run()}
      title="Undo"
    >
      <Undo size={16} />
    </MenuButton>
  );
}; 