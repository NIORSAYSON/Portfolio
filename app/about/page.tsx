import { getAllExperiences } from "@/lib/api/experiences";
import AboutClient from "./AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Nestor Sayson",
  description:
    "Learn about Nestor Sayson's experience, education, and technical skills.",
};

export default async function AboutPage() {
  const allEntries = await getAllExperiences();

  const experiences = allEntries.filter((e) => e.type === "experience");
  const education = allEntries.filter((e) => e.type === "education");

  return <AboutClient experiences={experiences} education={education} />;
}
