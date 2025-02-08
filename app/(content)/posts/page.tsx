import { getPostsList } from "./postUtil";
import dynamic from "next/dynamic";
import Link from "next/link";

export default function PostsPage() {
  const posts = getPostsList();

  if (posts.length === 0) return <p>No posts available.</p>;

  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  // Dynamically import the latest post's MDX file (without processing frontmatter again)
  const LatestPost = dynamic(() => import(`./${latestPost.slug}/page.mdx`));

  return (
    <div className="md:flex">
      <div className="prose ml-4 mt-4 max-w-5xl">
        <LatestPost />
      </div>
      <div className="mt-16">
        <h2 className="text-xl font-semibold">Other Posts</h2>
        <ul className="list-disc pl-5">
          {otherPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="text-blue-500 hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">
                By {post.author} •{" "}
                {new Date(post.date).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
