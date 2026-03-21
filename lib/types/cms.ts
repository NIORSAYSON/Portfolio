export type CmsAsset = {
  url: string;
  width?: number;
  height?: number;
};

export type CmsRichText = {
  raw: RichTextContent;
  html: string;
  text: string;
};

export type RichTextContent = {
  children: RichTextNode[];
};

export type RichTextNode = {
  type?: string;
  tag?: string;
  children?: RichTextNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  href?: string;
  src?: string;
  altText?: string;
  title?: string;
  [key: string]: unknown;
};

// ---------------------------------------------------------------------------
// Project
// ---------------------------------------------------------------------------

export type CmsProject = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  categories: string[];
  projectLink: string | null;
  projectLinkName: string | null;
  tools: string[];
  mockup: CmsAsset | null;
  images: CmsAsset[];
  description: string;
  duration: string | null;
  isMobile: boolean;
  displayOrder: number | null;
  isFeatured: boolean;
};

export type CmsProjectsResponse = {
  projects: CmsProject[];
};

export type CmsProjectResponse = {
  project: CmsProject | null;
};

// ---------------------------------------------------------------------------
// Experience / Education
// ---------------------------------------------------------------------------

export type CmsExperience = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  logo: CmsAsset;
  order?: number;
  type: "experience" | "education";
  gwa: string | null;
  isCollege: boolean;
  competitons?: CmsCompetition[] | null;
};

export type CmsCompetition = {
  name: string;
  detail: string;
};

export type CmsExperiencesResponse = {
  experiences: CmsExperience[];
};

// ---------------------------------------------------------------------------
// Blog Post
// ---------------------------------------------------------------------------

export type CmsBlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage: CmsAsset | null;
  content: CmsRichText;
  featured: boolean;
  readingTime: number;
};

export type CmsBlogPostsResponse = {
  blogPosts: CmsBlogPost[];
};

export type CmsBlogPostResponse = {
  blogPost: CmsBlogPost | null;
};
