// app/posts/[id]/page.tsx
import { createClient } from "@/utils/supabase/server";
import MdxLayout from "@/components/MdxLayout";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function PostPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <MdxLayout
      title={data.title}
      author="Flagway Team"
      date={new Date(data.published_at)}
    >
      <MDXRemote source={data.markdown} />
    </MdxLayout>
  );
}
