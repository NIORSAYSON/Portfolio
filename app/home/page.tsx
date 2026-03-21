import { getAllProjects } from "@/lib/api/projects";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const allProjects = await getAllProjects();
  const featuredProjects = allProjects.filter((p) => p.isFeatured);

  return <HomeClient featuredProjects={featuredProjects} />;
}
