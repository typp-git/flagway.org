import LatestPost from "./LatestPost";
import dynamic from "next/dynamic";

const PostsClient = dynamic(() => import("./PostsClient"), { ssr: false });

export default function PostsPage() {
  return (
    <div className="md:flex">
      <div className="prose ml-4 mt-4 max-w-5xl">
        <LatestPost />
      </div>
      <PostsClient />
    </div>
  );
}
