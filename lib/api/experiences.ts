import { fetchGraphQL } from "@/lib/graphql";
import { GET_ALL_EXPERIENCES } from "@/lib/queries/experiences";
import type { CmsExperience, CmsExperiencesResponse } from "@/lib/types/cms";
import {
  agentGeniusDescText,
  freelanceDescText,
  internshipText,
  collegeText,
  seniorHighText,
  juniorHighText,
} from "@/app/constants";

const FALLBACK_EXPERIENCES: CmsExperience[] = [
  {
    id: "ag",
    title: "AI Automation Engineer",
    subtitle: "AgentGenius.ai",
    date: "Aug 2025 - Present",
    description: agentGeniusDescText,
    logo: { url: "/exp-logo/AG-Logo.png" },
    type: "experience",
    gwa: null,
    isCollege: false,
  },
  {
    id: "freelance",
    title: "Independent Software Engineer",
    subtitle: "Freelance",
    date: "Jun 2025 - Present",
    description: freelanceDescText,
    logo: { url: "/exp-logo/freelance-logo.png" },
    type: "experience",
    gwa: null,
    isCollege: false,
  },
  {
    id: "internship",
    title: "Front-End Developer Intern",
    subtitle: "Intelliseven Technology Solutions Inc.",
    date: "Mar 2025 - Jun 2025",
    description: internshipText,
    logo: { url: "/exp-logo/i7-No BG.png" },
    type: "experience",
    gwa: null,
    isCollege: false,
  },
  {
    id: "college",
    title: "BS in Computer Science",
    subtitle: "Camarines Sur Polytechnic Colleges",
    date: "Aug 2021 - Jul 2025",
    description: collegeText,
    logo: { url: "/educ-logo/CSPC.png" },
    type: "education",
    gwa: "GWA: 1.3103",
    isCollege: true,
    competitons: [
      {
        name: "ICPC Asia Manila Regional Contest – Participant",
        detail: "Ateneo de Manila University (December 15–16, 2022)",
      },
      {
        name: "2022 Programming Contest – 9th Place",
        detail: "Camarines Sur Polytechnic Colleges (November 14, 2022)",
      },
    ],
  },
  {
    id: "shs",
    title: "General Academic Strand (GAS)",
    subtitle: "Libon Community Colleges (SHS)",
    date: "Aug 2019 - Jun 2021",
    description: seniorHighText,
    logo: { url: "/educ-logo/LICOM-No BG.png" },
    type: "education",
    gwa: null,
    isCollege: false,
  },
  {
    id: "jhs",
    title: "Computer System and Services",
    subtitle: "Libon Agro Industrial High School",
    date: "July 2015 - Jun 2019",
    description: juniorHighText,
    logo: { url: "/educ-logo/LAIHS-No BG.png" },
    type: "education",
    gwa: null,
    isCollege: false,
  },
];

export async function getAllExperiences(): Promise<CmsExperience[]> {
  try {
    const data =
      await fetchGraphQL<CmsExperiencesResponse>(GET_ALL_EXPERIENCES);
    return data.experiences;
  } catch (err) {
    console.warn(
      "[CMS] getAllExperiences() falling back to local data.",
      (err as Error).message
    );
    return FALLBACK_EXPERIENCES;
  }
}

export async function getExperiencesByType(
  type: "experience" | "education"
): Promise<CmsExperience[]> {
  const all = await getAllExperiences();
  return all.filter((e) => e.type === type);
}
