"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Image from "@tiptap/extension-image";
import { Toolbar, ToolbarDivider } from "./ui/Toolbar";
import { BoldButton } from "./controls/BoldButton";
import { ItalicButton } from "./controls/ItalicButton";
import { UndoButton } from "./controls/UndoButton";
import { RedoButton } from "./controls/RedoButton";
import { BulletListButton } from "./controls/BulletListButton";
import { OrderedListButton } from "./controls/OrderedListButton";
import { BlockquoteButton } from "./controls/BlockquoteButton";
import { ImageButton } from "./controls/ImageButton";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown.configure({
        html: false,
        transformPastedText: true,
        transformCopiedText: true,
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.storage.markdown.getMarkdown());
    },
    immediatelyRender: false
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-200 rounded-lg flex flex-col max-h-screen">
      <div className="rte-menu-bar">
        <Toolbar dense>
          <UndoButton editor={editor} />
          <RedoButton editor={editor} />
          <ToolbarDivider />
          <BoldButton editor={editor} />
          <ItalicButton editor={editor} />
          <ToolbarDivider />
          <BulletListButton editor={editor} />
          <OrderedListButton editor={editor} />
          <BlockquoteButton editor={editor} />
          <ToolbarDivider />
          <ImageButton editor={editor} />
        </Toolbar>
      </div>
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[200px] max-h-0.5 h-full focus:outline-none"
      />
    </div>
  );
} 