import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { ArrowLeft, Calendar, Clock, Tag, PenLine } from "lucide-react";
import { CARD_BASE } from "@/lib/styles";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Nestor Sayson`,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.category === post.category ||
          p.tags.some((t) => post.tags.includes(t)))
    )
    .slice(0, 3);

  const otherPosts = allPosts
    .filter((p) => p.slug !== slug && !related.find((r) => r.slug === p.slug))
    .slice(0, 3 - related.length);

  const sidebarPosts = [...related, ...otherPosts].slice(0, 3);

  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags))).sort();

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div className="p-4 pt-16 md:pt-5 w-full min-w-0 overflow-x-hidden">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors duration-200 w-fit mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Two-column layout: article + sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_18rem] gap-5">
          {/* Article */}
          <article className={`${CARD_BASE} overflow-hidden min-w-0`}>
            {/* Hero image */}
            {post.image && (
              <div className="relative w-full aspect-video overflow-hidden bg-snbackground">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex flex-col gap-3">
              {/* Category + tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent-muted text-accent border border-accent/20 uppercase tracking-wide">
                  {post.category}
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-0.5 text-[11px] text-text-muted bg-snbackground border border-border rounded-md px-2 py-0.5">
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-text leading-snug">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-text-muted text-sm leading-relaxed">
                {post.excerpt}
              </p>

              {/* Meta row */}
              <div className="flex items-center gap-4 text-xs text-text-muted pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime} min read
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border mx-6" />

          {/* MDX content */}
          <div className="px-6 py-6 prose">
              <MDXRemote source={post.content} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4 min-w-0">
            {/* Post info card */}
            <div className={`${CARD_BASE} p-4 flex flex-col gap-3`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Post Info
              </p>
              <div className="flex flex-col gap-2 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0 text-accent" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0 text-accent" />
                  <span>{post.readingTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <PenLine className="w-4 h-4 shrink-0 text-accent" />
                  <span>{post.category}</span>
                </div>
              </div>
              {post.tags.length > 0 && (
                <>
                  <div className="h-px bg-border" />
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-snbackground border border-border text-text-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* More posts card */}
            {sidebarPosts.length > 0 && (
              <div className={`${CARD_BASE} p-4 flex flex-col gap-3`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  More Posts
                </p>
                <div className="flex flex-col gap-3">
                  {sidebarPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group flex flex-col gap-1">
                      <span className="text-[10px] font-medium text-accent uppercase tracking-wide">
                        {p.category}
                      </span>
                      <span className="text-sm font-medium text-text line-clamp-2 group-hover:text-accent transition-colors duration-200 leading-snug">
                        {p.title}
                      </span>
                      <span className="text-[11px] text-text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {p.readingTime} min read
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tags cloud */}
            {allTags.length > 0 && (
              <div className={`${CARD_BASE} p-4 flex flex-col gap-3`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  All Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className={`text-[11px] px-2.5 py-1 rounded-md border transition-all duration-200 ${
                        post.tags.includes(tag)
                          ? "bg-accent/10 text-accent border-accent/30"
                          : "bg-snbackground border-border text-text-muted hover:border-accent/40 hover:text-accent"
                      }`}>
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to blog */}
            {/* <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors duration-200 px-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link> */}
          </aside>
        </div>
      </div>
    </main>
  );
}
