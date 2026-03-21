import { Suspense } from "react";
import {
  getAllProjects,
  getAllProjectCategories,
} from "@/lib/api/projects";
import ProjectsClient from "./ProjectsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Nestor Sayson",
  description:
    "Browse the portfolio projects of Nestor Sayson, spanning web, mobile, AI, and full-stack development.",
};

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getAllProjects(),
    getAllProjectCategories(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-text-muted">
          Loading projects…
        </div>
      }>
      <ProjectsClient projects={projects} categories={categories} />
    </Suspense>
  );
}
