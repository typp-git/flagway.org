import React from "react";
import { Italic } from "lucide-react";
import { MenuButton } from "./MenuButton";
import { Editor } from "@tiptap/react";

interface ItalicButtonProps {
  editor: Editor;
}

export const ItalicButton = ({ editor }: ItalicButtonProps) => {
  return (
    <MenuButton
      editor={editor}
      onClick={() => editor.chain().focus().toggleItalic().run()}
      isActive={editor.isActive("italic")}
      title="Italic"
    >
      <Italic size={16} />
    </MenuButton>
  );
}; 