import { fetchGraphQL } from "@/lib/graphql";
import { GET_ALL_PROJECTS, GET_PROJECT_BY_SLUG } from "@/lib/queries/projects";
import type {
  CmsProject,
  CmsProjectsResponse,
  CmsProjectResponse,
} from "@/lib/types/cms";
import { projects as localProjects } from "@/app/constants";

function toCategories(
  cat: string | string[] | undefined
): string[] {
  if (!cat) return [];
  return Array.isArray(cat) ? cat : [cat];
}

// Phone-shaped mobile projects (excludes tablets like the POS system)
const PHONE_SLUGS = new Set([
  "agrimarket",
  "busis-campus-app",
  "notes-app",
]);

const FALLBACK_PROJECTS: CmsProject[] = localProjects.map((p, index) => ({
  id: String(p.id),
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
  categories: toCategories((p as { category?: string | string[] }).category),
  projectLink: p.projectLink?.link ?? null,
  projectLinkName: p.projectLink?.linkName ?? null,
  tools: p.tools,
  images: p.projectImages.map((url) => ({ url })),
  mockup: null,
  description: p.description,
  duration: (p as { duration?: string }).duration ?? null,
  isMobile: PHONE_SLUGS.has(p.slug),
  displayOrder: index + 1,
  isFeatured: false,
}));

function sortByDisplayOrder(projects: CmsProject[]): CmsProject[] {
  return [...projects].sort((a, b) => {
    if (a.displayOrder == null && b.displayOrder == null) return 0;
    if (a.displayOrder == null) return 1;
    if (b.displayOrder == null) return -1;
    return a.displayOrder - b.displayOrder;
  });
}

export async function getAllProjects(): Promise<CmsProject[]> {
  try {
    const data = await fetchGraphQL<CmsProjectsResponse>(GET_ALL_PROJECTS);
    return data.projects;
  } catch (err) {
    console.warn(
      "[CMS] getAllProjects() falling back to local data.",
      (err as Error).message
    );
    return sortByDisplayOrder(FALLBACK_PROJECTS);
  }
}

export async function getProjectBySlug(
  slug: string
): Promise<CmsProject | null> {
  try {
    const data = await fetchGraphQL<CmsProjectResponse>(GET_PROJECT_BY_SLUG, {
      slug,
    });
    return data.project;
  } catch (err) {
    console.warn(
      "[CMS] getProjectBySlug() falling back to local data.",
      (err as Error).message
    );
    return FALLBACK_PROJECTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getAllProjectCategories(): Promise<string[]> {
  const projects = await getAllProjects();
  const cats = new Set<string>();
  for (const p of projects) {
    for (const c of p.categories) {
      cats.add(c);
    }
  }
  return Array.from(cats).sort();
}
