"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { CARD_BASE } from "@/lib/styles";
import type { PostMeta } from "@/lib/blog";

type Props = {
  posts: PostMeta[];
  categories: string[];
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogClient({ posts, categories }: Props) {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const tag = searchParams.get("tag");
    if (tag) setSelectedTag(tag);
  }, [searchParams]);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  const filtered = posts.filter((p) => {
    const catMatch =
      selectedCategory === "All" || p.category === selectedCategory;
    const tagMatch = !selectedTag || p.tags.includes(selectedTag);
    return catMatch && tagMatch;
  });

  const [featured, ...rest] = filtered;

  return (
    <div className="flex flex-col gap-6">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 px-1">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedTag(null);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-accent text-white border-accent"
                : "border-border text-text-muted hover:border-accent hover:text-accent"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-1">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTag((prev) => (prev === tag ? null : tag))
              }
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200 ${
                selectedTag === tag
                  ? "bg-accent/20 text-accent border border-accent/40"
                  : "bg-snbackground text-text-muted border border-border hover:border-accent/40 hover:text-accent"
              }`}>
              #{tag}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-text-muted text-sm text-center py-12">
            No posts found for this filter.
          </motion.p>
        ) : (
          <motion.div
            key={selectedCategory + selectedTag}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-5">
            {/* Featured post */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div
                  className={`${CARD_BASE} overflow-hidden flex flex-col md:flex-row`}>
                  <div className="relative w-full md:w-64 shrink-0 aspect-video md:aspect-auto md:h-auto overflow-hidden bg-snbackground">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-accent/10">
                        <Tag
                          className="w-10 h-10 text-accent opacity-40"
                          color="var(--accent)"
                        />
                      </div>
                    )}
                    <span className="absolute top-2 left-2 bg-accent text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Featured
                    </span>
                  </div>
                  <div className="p-5 flex flex-col gap-3 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-accent-muted text-accent border border-accent/20">
                        {featured.category}
                      </span>
                      {featured.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-text-muted bg-snbackground border border-border rounded-md px-2 py-0.5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-lg font-bold text-text leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
                      <div className="flex items-center gap-4 text-[11px] text-text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(featured.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {featured.readingTime} min read
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-accent font-medium group-hover:gap-2 transition-all duration-200">
                        Read more <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest of posts grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.06 }}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block h-full">
                      <div
                        className={`${CARD_BASE} overflow-hidden flex flex-col h-full`}>
                        <div className="relative w-full aspect-video overflow-hidden bg-snbackground">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-accent/10">
                              <Tag
                                className="w-8 h-8 opacity-30"
                                color="var(--accent)"
                              />
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex flex-col gap-2 flex-1">
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-accent-muted text-accent border border-accent/20 self-start">
                            {post.category}
                          </span>
                          <h3 className="text-sm font-bold text-text leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
                            {post.title}
                          </h3>
                          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed flex-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-text-muted mt-2 pt-2 border-t border-border">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readingTime} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
