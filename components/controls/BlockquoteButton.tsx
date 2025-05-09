import React from "react";
import { Quote } from "lucide-react";
import { MenuButton } from "./MenuButton";
import { Editor } from "@tiptap/react";

interface BlockquoteButtonProps {
  editor: Editor;
}

export const BlockquoteButton = ({ editor }: BlockquoteButtonProps) => {
  return (
    <MenuButton
      editor={editor}
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      isActive={editor.isActive("blockquote")}
      title="Blockquote"
    >
      <Quote size={16} />
    </MenuButton>
  );
}; 