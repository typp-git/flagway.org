import React from "react";
import { Image as ImageIcon } from "lucide-react";
import { MenuButton } from "./MenuButton";
import { Editor } from "@tiptap/react";

interface ImageButtonProps {
  editor: Editor;
}

export const ImageButton = ({ editor }: ImageButtonProps) => {
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a URL for the file
    const url = URL.createObjectURL(file);

    // Insert the image at the current cursor position
    editor.chain().focus().setImage({ src: url }).run();

    // Clean up the URL after the image is loaded
    const img = new Image();
    img.onload = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  return (
    <MenuButton
      editor={editor}
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
          e.stopPropagation();
          handleImageUpload(e as unknown as React.ChangeEvent<HTMLInputElement>);
        };
        input.onclick = (e) => {
          e.stopPropagation();
        };
        input.click();
      }}
      title="Insert Image"
    >
      <ImageIcon size={16} />
    </MenuButton>
  );
}; 