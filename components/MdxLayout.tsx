"use client";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MdxLayout({
  children,
  className,
  title,
  author,
  date,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  author: string;
  date: Date;
}) {
  // Create any shared layout or styles here
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        className,
        "prose max-w-3xl mx-auto prose-slate w-full flex-grow px-6 py-12",
        // headings
        "prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:lg:prose-headings:scroll-mt-[8.5rem]",
        // lead
        "prose-lead:text-slate-500",
        // links
        "prose-a:font-semibold",
        // link underline
        "prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.indigo.300))] hover:prose-a:[--tw-prose-underline-size:6px",
        // pre
        "prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg",
        // hr
        "prose-hr:border-slate-300",
        "prose-par: text-[1.05rem]",
      )}
    >
      {pathname !== "/posts" ? (
        <>
          <Link href="/posts" className="flex gap-1 text-gray-500">
            <ArrowLeftIcon className="h-[1em] my-auto" />
            All Posts
          </Link>
        </>
      ) : (
        <div className="text-gray-500">Latest post:</div>
      )}
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="text-gray-600">
        By {author} •{" "}
        {new Date(date).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      {children}
    </div>
  );
}
