// components/TiptapEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import TiptapToolbar from "@/components/TextEditor/TiptapToolbar";

export default function TiptapEditor({
  initialMarkdown = "",
  onChange,
}: {
  initialMarkdown?: string;
  onChange: (markdown: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      Link,
      Placeholder.configure({
        placeholder: "Write your post here...",
      }),
    ],
    content: "",
    onUpdate({ editor }) {
      const md = editor.storage.markdown.getMarkdown();
      onChange(md);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && initialMarkdown) {
      editor.commands.setContent(initialMarkdown);
    }
  }, [editor, initialMarkdown]);

  return (
    <div className="border border-gray-300 rounded-md p-3">
      <TiptapToolbar editor={editor} />
      <div className="prose max-w-none min-h-[300px] h-full focus:outline-none">
        <EditorContent className="h-full" editor={editor} />
      </div>
    </div>
  );
}
