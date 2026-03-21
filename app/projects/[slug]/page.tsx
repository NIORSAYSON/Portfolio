import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/api/projects";
import ProjectDetailClient from "./ProjectDetailClient";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Nestor Sayson`,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getAllProjects(),
  ]);

  if (!project) notFound();

  const otherProjects = allProjects.filter((p) => p.slug !== slug);

  return (
    <ProjectDetailClient
      project={project}
      otherProjects={otherProjects}
      isMobile={project.isMobile}
    />
  );
}
