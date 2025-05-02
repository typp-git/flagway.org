"use client";

import { useEffect, useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import { FaEdit, FaEye } from "react-icons/fa";

// import Editor from "@/components/Editor";

import { createClient } from "@/utils/supabase/client";

type Post = {
  id: string;
  title: string;
  published_at: string;
  author: string;
  markdown: string;
};

export default function BlogPage() {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({ title: "", published_at: "" });
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, published_at, author, markdown")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching:", error);
      } else {
        setPosts(data || []);
      }
    };
    fetchPosts();
  }, [supabase]);

  const openCreateDialog = () => {
    setEditingPost(null);
    setFormData({ title: "", published_at: "" });
    setIsOpen(true);
  };

  const openEditDialog = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      published_at: post.published_at.split("T")[0], // trim to YYYY-MM-DD
    });
    setIsOpen(true);
    setMarkdown(post.markdown || "");
  };

  const closeDialog = () => {
    setIsOpen(false);
    setEditingPost(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Markdown:", markdown);
    console.log("Title:", formData.title);
    console.log("Date:", formData.published_at);
    // TODO: Save to Supabase

    const payload = {
      title: formData.title,
      published_at: formData.published_at,
      markdown,
      author: "Flagway League", // Replace this if needed
    };

    if (editingPost) {
      console.log("Editing post:", editingPost.id);
      const { data, error } = await supabase
        .from("posts")
        .update(payload)
        .eq("id", editingPost.id);
      if (error) {
        console.error("Error updating post:", error);
      } else {
        console.log("Post updated:", data);
      }
    } else {
      console.log("Creating new post");
      await supabase.from("posts").insert([payload]);
    }

    closeDialog();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <button
          onClick={openCreateDialog}
          className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
        >
          Create New
        </button>
      </div>

      <ul className="space-y-4 bg-gray-100 p-5 rounded-xl">
        {posts.map((post) => (
          <li key={post.id} className="p-4 rounded-md bg-white">
            <div className="text-lg font-display">{post.title}</div>
            <div className="mt-2 w-full text-sm text-gray-500 flex gap-4">
              Published on {new Date(post.published_at).toLocaleDateString()}
              <div className="flex flex-grow" />
              <button
                onClick={() => openEditDialog(post)}
                className="text-sm text-gray-600  hover:cursor-pointer hover:text-gray-900 inline-flex items-center gap-1"
              >
                <FaEdit /> Edit
              </button>
              <Link
                href={`/posts/${post.id}`}
                target="_blank"
                className="text-sky-700 hover:underline hover:cursor-pointer text-sm inline-flex items-center gap-1"
              >
                <FaEye /> View
              </Link>
            </div>
            <div className="mt-2 flex gap-4"></div>
          </li>
        ))}
      </ul>

      <Dialog
        as="div"
        className="relative z-10"
        open={isOpen}
        onClose={closeDialog}
      >
        <Transition appear show={isOpen} as={Fragment}>
          <div>
            {/* Overlay transition */}
            <Transition
              as={Fragment}
              enter="ease-out duration-250"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-250"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50" />
            </Transition>

            {/* Dialog panel transition */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Transition
                as={Fragment}
                enter="ease-out duration-250"
                enterFrom="opacity-0 scale-95 translate-y-4"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-250"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all transform-gpu">
                  {/* ... your content ... */}

                  <DialogTitle className="text-lg font-medium text-gray-900">
                    {editingPost ? "Edit Post" : "Create New Post"}
                  </DialogTitle>

                  <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-md border-gray-300 h-8 p-1 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Publish Date
                      </label>
                      <input
                        type="date"
                        name="published_at"
                        value={formData.published_at}
                        onChange={handleInputChange}
                        className="mt-1 w-fit rounded-md border-gray-300 h-8 p-1 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Markdown Content
                      </label>
                      <div className="mt-2 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-yellow-800">Component Work in Progress</p>
                      </div>
                      {/* <Editor
                        content={markdown}
                        onChange={setMarkdown}
                      /> */}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <button
                        type="button"
                        onClick={closeDialog}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
                      >
                        {editingPost ? "Update Post" : "Save Post"}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </Transition>
            </div>
          </div>
        </Transition>
      </Dialog>
    </div>
  );
}
