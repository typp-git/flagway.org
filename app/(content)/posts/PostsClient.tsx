"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Post } from "@/utils/types";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

function truncateMarkdown(md: string, limit: number): string {
  return md.length <= limit ? md : md.slice(0, limit).trim() + "...";
}

export default function PostsClient() {
  const supabase = createClient();
  const [announcements, setAnnouncements] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, published_at, markdown")
        .order("published_at", { ascending: false });

      if (!error && data) {
        // Skip the latest post (already shown in server component)
        setAnnouncements(data.slice(1) as Post[]);
      }
    };

    fetchPosts();
  }, [supabase]);

  return (
    <div className="mt-20 mx-10 md:mx-0 mb-5">
      <h2 className="text-xl font-semibold">Other Posts</h2>
      <ul className="space-y-3">
        {announcements.map((post) => (
          <li
            key={post.id}
            className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-all rounded-xl p-3"
          >
            <Link href={`/${post.id}`}>
              <div className="font-display text-gray-800">{post.title}</div>
              <div className="text-sm text-gray-400">
                {new Date(post.published_at).toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
                <span className="italic text-gray-500 ml-2">
                  <ReactMarkdown components={{ p: "span" }}>
                    {truncateMarkdown(post.markdown, 30)}
                  </ReactMarkdown>
                </span>
              </div>
            </Link>
          </li>
        ))}
        {announcements.length === 0 && (
          <li className="text-gray-500">No announcements yet.</li>
        )}
      </ul>
    </div>
  );
}
