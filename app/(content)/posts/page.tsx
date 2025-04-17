"use client";
import MdxLayout from "@/components/MdxLayout";
import ReactMarkdown from "react-markdown";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Post } from "@/utils/types";
import Link from "next/link";

export default function PostsPage() {
  const supabase = createClient();
  const [announcements, setAnnouncements] = useState<Post[]>([]);
  const [latestPost, setLatestPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, published_at, author, markdown")
        .order("published_at", { ascending: false });

      console.log("Fetched announcements:", data);

      if (error) {
        console.error("Error fetching:", error);
      } else {
        setAnnouncements(data);
        setLatestPost(data[0]);
      }
    };
    fetchAnnouncements();
  }, [supabase]); // empty dependency array = run on mount only

  return (
    <div className="md:flex">
      <div className="prose ml-4 mt-4 max-w-5xl">
        {latestPost && (
          <MdxLayout
            title={latestPost?.title}
            author={latestPost?.author}
            date={new Date(latestPost?.published_at)}
          >
            <MDXRemote source={latestPost.markdown} />
          </MdxLayout>
        )}
      </div>
      <div className="mt-16 mx-10 md:mx-0 mb-5">
        <h2 className="text-xl font-semibold">Other Posts</h2>

        <ul className="space-y-3">
          {announcements.map((post) => (
            <li
              key={post.id}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-all rounded-xl p-3 "
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
    </div>
  );
}

// Helper to trim and avoid breaking markdown syntax
function truncateMarkdown(md: string, limit: number): string {
  return md.length <= limit ? md : md.slice(0, limit).trim() + "...";
}
