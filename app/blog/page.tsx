import { Suspense } from "react";
import { PenLine } from "lucide-react";
import { getAllBlogPosts, getAllCategories } from "@/lib/api/blogs";
import { SECTION_HEADER_CLASS, SECTION_TITLE_CLASS } from "@/lib/styles";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog — Nestor Sayson",
  description:
    "Thoughts on web development, AI, and software engineering by Nestor Sayson.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(),
    getAllCategories(),
  ]);

  return (
    <main className="min-h-screen w-full">
      <div className="flex flex-col gap-4 p-4 pt-16 md:pt-5 w-full min-w-0">
        <div className="bg-sbackground border border-border rounded-2xl shadow-card text-text">
          <div className={SECTION_HEADER_CLASS}>
            <PenLine className="w-5 h-5 text-text-muted" />
            <span className={SECTION_TITLE_CLASS}>Blog</span>
          </div>

          <div className="px-5 pb-2">
            <p className="text-sm text-text-muted">
              Thoughts on web development, AI automation, and the craft of
              building software.
            </p>
          </div>

          <div className="h-px bg-border mx-5 mb-5" />

          <div className="px-5 pb-5">
            <Suspense
              fallback={
                <div className="py-12 text-center text-sm text-text-muted">
                  Loading posts…
                </div>
              }>
              <BlogClient posts={posts} categories={categories} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
