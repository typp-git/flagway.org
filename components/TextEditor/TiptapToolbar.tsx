// components/TiptapToolbar.tsx
"use client";

import {
  FaBold,
  FaItalic,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaUndo,
  FaRedo,
  FaLink,
  FaUnlink,
} from "react-icons/fa";
import { Editor } from "@tiptap/react";
import clsx from "clsx";

export default function TiptapToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 border border-gray-200 rounded-md px-2 py-1 mb-2 bg-gray-50">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        <FaBold
          className={clsx("h-4 w-4", {
            "text-sky-600": editor.isActive("bold"),
          })}
        />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        <FaItalic
          className={clsx("h-4 w-4", {
            "text-sky-600": editor.isActive("italic"),
          })}
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <FaHeading
          className={clsx("h-4 w-4", {
            "text-sky-600": editor.isActive("heading", { level: 1 }),
          })}
        />
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <FaListUl
          className={clsx("h-4 w-4", {
            "text-sky-600": editor.isActive("bulletList"),
          })}
        />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <FaListOl
          className={clsx("h-4 w-4", {
            "text-sky-600": editor.isActive("orderedList"),
          })}
        />
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <FaQuoteRight
          className={clsx("h-4 w-4", {
            "text-sky-600": editor.isActive("blockquote"),
          })}
        />
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>
        <FaUndo className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <FaRedo className="h-4 w-4" />
      </button>
      <button
        onClick={() => {
          const url = prompt("Enter URL");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
      >
        <FaLink className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().unsetLink().run()}>
        <FaUnlink className="h-4 w-4" />
      </button>
    </div>
  );
}
