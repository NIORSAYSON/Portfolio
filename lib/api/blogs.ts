import { fetchGraphQL } from "@/lib/graphql";
import {
  GET_ALL_BLOG_POSTS,
  GET_BLOG_POST_BY_SLUG,
} from "@/lib/queries/blogs";
import type {
  CmsBlogPost,
  CmsBlogPostsResponse,
  CmsBlogPostResponse,
} from "@/lib/types/cms";
import {
  getAllPosts as getLocalPosts,
  getPostBySlug as getLocalPostBySlug,
} from "@/lib/blog";

function localToCmsBlogPost(p: ReturnType<typeof getLocalPosts>[number]): CmsBlogPost {
  return {
    id: p.slug,
    slug: p.slug,
    title: p.title,
    date: p.date,
    category: p.category,
    tags: p.tags,
    excerpt: p.excerpt,
    coverImage: p.image ? { url: p.image } : null,
    content: {
      raw: { children: [] },
      html: "",
      text: "",
    },
    featured: p.featured,
    readingTime: p.readingTime,
  };
}

export async function getAllBlogPosts(): Promise<CmsBlogPost[]> {
  try {
    const data = await fetchGraphQL<CmsBlogPostsResponse>(GET_ALL_BLOG_POSTS);
    return data.blogPosts.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (err) {
    console.warn(
      "[CMS] getAllBlogPosts() falling back to local MDX files.",
      (err as Error).message
    );
    return getLocalPosts().map(localToCmsBlogPost);
  }
}

export async function getBlogBySlug(
  slug: string
): Promise<CmsBlogPost | null> {
  try {
    const data = await fetchGraphQL<CmsBlogPostResponse>(
      GET_BLOG_POST_BY_SLUG,
      { slug }
    );
    return data.blogPost;
  } catch (err) {
    console.warn(
      "[CMS] getBlogBySlug() falling back to local MDX file.",
      (err as Error).message
    );
    const local = getLocalPostBySlug(slug);
    if (!local) return null;
    return {
      ...localToCmsBlogPost(local),
      content: {
        raw: { children: [] },
        html: local.content,
        text: local.content,
      },
    };
  }
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const cats = new Set(posts.map((p) => p.category));
  return Array.from(cats).sort();
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const tags = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tags).sort();
}
