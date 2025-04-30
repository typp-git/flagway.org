"use client";

import { useState, useEffect } from "react";
import {
  FaPlus,
  FaPencilAlt,
  FaExclamationCircle,
  FaEye,
} from "react-icons/fa";
import { Transition } from "@headlessui/react";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/utils/supabase/client";
import Editor from "./Editor";

interface Post {
  id: number;
  title: string;
  published_at: string;
  markdown: string;
}

export default function DashboardContent() {
  const supabase = createClient();
  const [registeredCount, setRegisteredCount] = useState<number>(0);
  const [pendingReviews, setPendingReviews] = useState<number>(0);
  const [announcements, setAnnouncements] = useState<Post[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchRegisteredCount = async () => {
      const { count, error } = await supabase
        .from('players')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching player count:', error);
      } else {
        setRegisteredCount(count || 0);
      }
    };

    const fetchPendingReviews = async () => {
      const { count, error } = await supabase
        .from('players')
        .select('*', { count: 'exact', head: true })
        .eq('verified', false);

      if (error) {
        console.error('Error fetching pending reviews:', error);
      } else {
        setPendingReviews(count || 0);
      }
    };

    fetchRegisteredCount();
    fetchPendingReviews();
  }, [supabase]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, published_at, markdown");

      console.log("Fetched announcements:", data);

      if (error) {
        console.error("Error fetching:", error);
      } else {
        setAnnouncements(data);
      }
    };
    fetchAnnouncements();
  }, [supabase]); // empty dependency array = run on mount only

  const handleCreateAnnouncement = async () => {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title: newAnnouncement.title,
          markdown: newAnnouncement.content,
          published_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Error creating announcement:", error);
    } else {
      setAnnouncements([...announcements, ...data]);
      setIsCreating(false);
      setNewAnnouncement({ title: "", content: "" });
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl m-auto">
        {/* Registered Card */}
        <div className="bg-gray-100 col-span-4 lg:col-span-1 rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <div className="text-6xl font-bold font-display text-sky-700">
            {registeredCount}
          </div>
          <div className="text-gray-700 mt-2">
            {registeredCount === 1 ? "person" : "people"} registered!
          </div>
        </div>

        {/* Announcements */}
        <div className="col-span-4 lg:col-span-3 bg-gray-100 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Announcements
            </h2>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
            >
              <FaPlus size={14} />
            </button>
          </div>

          {isCreating && (
            <div className="mb-6 bg-white rounded-lg p-4">
              <input
                type="text"
                placeholder="Announcement title"
                className="w-full p-2 mb-4 border rounded"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    title: e.target.value,
                  })
                }
              />
              <Editor
                content={newAnnouncement.content}
                onChange={(content) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    content,
                  })
                }
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAnnouncement}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Post
                </button>
              </div>
            </div>
          )}

          <ul className="space-y-3">
            {announcements.map((post) => (
              <li
                key={post.id}
                className="flex justify-between items-center bg-white rounded p-3"
              >
                <div>
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
                </div>
                <div className="flex items-center space-x-3">
                  <Tooltip icon={<FaEye size={14} />} label="View post" />
                  <Tooltip icon={<FaPencilAlt size={14} />} label="Edit post" />
                </div>
              </li>
            ))}
            {announcements.length === 0 && !isCreating && (
              <li className="text-gray-500">No announcements yet.</li>
            )}
          </ul>
        </div>

        {/* Review Registrants */}
        <div className="bg-gray-100 rounded-lg p-6 col-span-2 flex items-center space-x-4">
          <div className="text-sky-700">
            <FaExclamationCircle size={28} />
          </div>
          <div>
            <p className="text-gray-800 mb-2">
              There {pendingReviews === 1 ? "is" : "are"} <strong>{pendingReviews}</strong> registrant{pendingReviews === 1 ? "" : "s"} that need{pendingReviews === 1 ? "s" : ""}{" "}
              your review.
            </p>
            <button className="bg-sky-700 text-white px-4 py-1 rounded hover:bg-sky-800 text-sm">
              Review them now
            </button>
          </div>
        </div>

        {/* Empty block */}
        <div className="bg-gray-100 rounded-lg p-6 col-span-2" />
      </div>
    </div>
  );
}

// Tooltip component
function Tooltip({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button className="text-gray-500 hover:text-gray-700">{icon}</button>
      <Transition
        show={hovered}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
          {label}
        </div>
      </Transition>
    </div>
  );
}

// Helper to trim and avoid breaking markdown syntax
function truncateMarkdown(md: string, limit: number): string {
  return md.length <= limit ? md : md.slice(0, limit).trim() + "...";
}
