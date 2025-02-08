import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "app", "(content)", "posts");

export function getPostsList() {
  const folders = fs
    .readdirSync(postsDirectory)
    .filter((folder) =>
      fs.statSync(path.join(postsDirectory, folder)).isDirectory(),
    );

  const posts = folders.map((folder) => {
    const filePath = path.join(postsDirectory, folder, "page.mdx");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent); // Extract frontmatter but ignore content

    return {
      slug: folder,
      title: data.title || folder,
      author: data.author || "Unknown",
      date: data.date || "Unknown date",
    };
  });

  // Sort posts by date (assuming ISO format)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
