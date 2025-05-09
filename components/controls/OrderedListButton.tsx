import React from "react";
import { ListOrdered } from "lucide-react";
import { MenuButton } from "./MenuButton";
import { Editor } from "@tiptap/react";

interface OrderedListButtonProps {
  editor: Editor;
}

export const OrderedListButton = ({ editor }: OrderedListButtonProps) => {
  return (
    <MenuButton
      editor={editor}
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      isActive={editor.isActive("orderedList")}
      title="Ordered List"
    >
      <ListOrdered size={16} />
    </MenuButton>
  );
}; 