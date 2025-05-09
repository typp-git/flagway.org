import React from "react";
import { List } from "lucide-react";
import { MenuButton } from "./MenuButton";
import { Editor } from "@tiptap/react";

interface BulletListButtonProps {
  editor: Editor;
}

export const BulletListButton = ({ editor }: BulletListButtonProps) => {
  return (
    <MenuButton
      editor={editor}
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      isActive={editor.isActive("bulletList")}
      title="Bullet List"
    >
      <List size={16} />
    </MenuButton>
  );
}; 