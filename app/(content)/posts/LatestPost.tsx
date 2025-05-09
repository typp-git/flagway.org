import { createClient } from "@/utils/supabase/server";
import MdxLayout from "@/components/MdxLayout";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function LatestPost() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, published_at, author, markdown")
    .order("published_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data)
    return <div className="text-gray-500">No latest post found.</div>;

  return (
    <MdxLayout
      title={data.title}
      author={data.author}
      date={new Date(data.published_at)}
    >
      <MDXRemote source={data.markdown} />
    </MdxLayout>
  );
}
