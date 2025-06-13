import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  eslint: {
    dirs: ["app", "components"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qbrwntkvkdhrfolsgtpw.supabase.co",
        pathname: "/storage/v1/object/public/**",
      }
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [rehypeSlug],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
