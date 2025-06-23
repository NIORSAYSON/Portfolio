"use client";

import { Roboto } from "next/font/google";
import Image from "next/image";
import {
  BiPersonCheck,
  BxlGmail,
  CarbonMachineLearning,
  CodiconGithubAlt,
  GrommetIconsTechnology,
  IcBaselineFacebook,
  LineiconsFigma,
  MaterialSymbolsLightMailOutline,
  MdiGithub,
  MdiInstagram,
  MdiLightPin,
  MdiLinkedin,
  PhOpenAiLogo,
  SolarCodeLineDuotone,
} from "../icons";
import ProjectCard from "@/components/ProjectCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SkillsTicker from "@/components/SkillsTicker";
import { skillIcons1, skillIcons2, typewriterTexts } from "../constants";
import Accordion from "@/components/Accordion";
import ContributionCalendar from "@/components/GithubContributions";
import { useTheme } from "next-themes";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function HomePage() {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState<false | number>(0);
  const [mounted, setMounted] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentSentence, setCurrentSentence] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const today = new Date();
    setDay(today.toLocaleDateString(undefined, { weekday: "long" }));
    setDate(
      today.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  useEffect(() => {
    let current = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText(typewriterTexts[currentSentence].slice(0, current + 1));
      current++;
      if (current === typewriterTexts[currentSentence].length) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentSentence((prev) => (prev + 1) % typewriterTexts.length);
        }, 1500); // Pause before next sentence
      }
    }, 30);
    return () => clearInterval(interval);
  }, [currentSentence]);

  return (
    <main className="min-h-screen w-full">
      <div className="grid xl:grid-cols-6 w-full min-h-screen">
        <div className="col-span-2 xl:col-span-4 w-full">
          {/* Home Background with typewriter */}
          <div className="h-[40vh] md:h-[40vh] mt-20 md:mt-0 relative mx-5 mb-5 xl:mr-0">
            <Image
              src="/Home Background.jpg"
              alt="Home Background"
              layout="fill"
              objectFit="cover"
              priority
              className="rounded-2xl"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                boxShadow: "inset 0 -120px 100px 10px rgba(0,0,0,0.5)",
              }}>
              <div className="text-black rounded px-5 py-3 text-sm md:text-lg font-bold">
                {day && date ? (
                  <>
                    {day.slice(0, 3)}, {date}
                  </>
                ) : (
                  <span>Loading...</span>
                )}
              </div>
              <motion.h1
                className={`absolute bottom-6 text-center text-white text-xl sm:text-3xl font-semibold px-4 ${roboto.className}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                {displayedText}
                <span className="animate-pulse">|</span>
              </motion.h1>
            </div>
          </div>
          {/* Projects Section */}
          <div className="bg-sbackground relative md:mx-5 md:rounded-xl md:mb-5 xl:mr-0 text-text">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <MdiLightPin
                  className="w-6 h-6 items-center justify-center"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-lg font-semibold text-center ">
                Projects
              </span>
            </div>
            <div className="mx-5">
              <div className="hide-scrollbar flex h-[360px] w-full items-start justify-start overflow-x-auto">
                <div className="flex flex-nowrap gap-5 max-w-[300px]">
                  <ProjectCard
                    title="POS System Application"
                    subtitle="Internship Project"
                    image="/Projects/POS.png"
                    description="Developed a tablet-based POS system app using React Native."
                    link=""
                  />
                  <ProjectCard
                    title="Conversational Agent for CSPC"
                    subtitle="Thesis Project"
                    image="/Projects/Conversational Agent Project.png"
                    description="A chatbot using a pretrained transformer model to answer queries based on CSPC official information."
                    link="https://huggingface.co/spaces/Nioooor/CSPC_Conversational_Agent"
                  />
                  <ProjectCard
                    title="SIAS Student Portal Redesign"
                    subtitle="Human Computer Interaction Project"
                    image="/Projects/SIAS Project.png"
                    description="Redesigned the SIAS Online Portal using Bootstrap to enhance its layout, responsiveness, and user experience."
                    link="https://niorsayson.github.io/SIAS-Online-Portal-Redesign/"
                  />
                  <ProjectCard
                    title="Cryptographic Application"
                    subtitle="Applied Cryptography Project"
                    image="/Projects/Cryptographic App Project.png"
                    description="Developed a cryptographic application using Python to encrypt and decrypt messages."
                    link="https://saysonnior-cs3b.streamlit.app/"
                  />
                  <ProjectCard
                    title="Synthetic Data Simulation"
                    subtitle="Modeling and Simulation Project"
                    image="/Projects/Modeling and Simulation Project.png"
                    description="An app that generates synthetic data for use in modeling, simulation, and analysis."
                    link="https://synthetic-data-generator-sayson.streamlit.app/Synthetic_Data_Generator"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Contributions Section */}
          <div className="bg-sbackground text-text mt-2 relative md:mx-5 md:rounded-xl md:mb-5 xl:mr-0">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <CodiconGithubAlt
                  className="w-6 h-6 items-center justify-center"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-lg font-semibold text-center ">
                GitHub Contributions
              </span>
            </div>
            <div className="mx-5 justify-center items-center text-center">
              <ContributionCalendar />
            </div>
          </div>
        </div>
        <div className="col-span-2 xl:col-span-2 w-full text-text">
          {/* Skills Section */}
          <div className="bg-sbackground mt-2 md:mt-0 relative md:mx-5 md:rounded-xl md:mb-5">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <GrommetIconsTechnology
                  className="w-6 h-6 items-center justify-center"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-lg font-semibold text-center ">Skills</span>
            </div>
            <div className="mx-5">
              <div className="w-full h-[200px] overflow-hidden MyGradient">
                <SkillsTicker images={skillIcons1} from={0} to={"-100%"} />
                <SkillsTicker images={skillIcons2} from={"-100%"} to={0} />
              </div>
            </div>
          </div>
          {/* Expertise Section */}
          <div className="bg-sbackground text-text mt-2 xl:mt-0 relative pb-5 md:mx-5 md:rounded-xl md:mb-5">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <BiPersonCheck
                  className="w-6 h-6 items-center justify-center mr-1"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-lg font-semibold text-center ">
                Expertise
              </span>
            </div>
            <div className="mt-5 relative rounded-xl border-3 border-border shadow-md p-4 mx-5">
              <Accordion
                i={0}
                expanded={expanded}
                setExpanded={setExpanded}
                accordionTitle="Web Development"
                className="mb-2 bg-sbackground text-text"
                icon={
                  <SolarCodeLineDuotone
                    className="mr-2"
                    fill={theme === "dark" ? "#fff" : "#000"}
                  />
                }>
                <div className="text-sm border border-gray-200 px-4 py-2 rounded-b-lg">
                  I specialize in front-end web development, where I build
                  responsive and user-friendly websites using modern
                  technologies. I focus on creating clean, interactive
                  interfaces that provide a smooth and engaging experience for
                  users across all devices, and I integrate APIs to connect the
                  front end with dynamic data and external services.
                </div>
              </Accordion>
              <Accordion
                i={1}
                expanded={expanded}
                setExpanded={setExpanded}
                accordionTitle="Machine Learning"
                className="mb-2"
                icon={
                  <CarbonMachineLearning
                    className="mr-2 w-6 h-6"
                    fill={theme === "dark" ? "#fff" : "#000"}
                  />
                }>
                <div className="text-sm  text-text border border-gray-200 px-4 py-2 rounded-b-lg">
                  I explore machine learning by building models that can analyze
                  data, recognize patterns, and make predictions. I work on
                  training, testing, and improving these models to solve
                  real-world problems using tools like Python and popular ML
                  libraries.
                </div>
              </Accordion>
              <Accordion
                i={2}
                expanded={expanded}
                setExpanded={setExpanded}
                accordionTitle="Large Language Model"
                className="mb-2"
                icon={
                  <PhOpenAiLogo
                    className="mr-2 w-6 h-6"
                    fill={theme === "dark" ? "#fff" : "#000"}
                  />
                }>
                <div className="text-sm text-text border border-gray-200 px-4 py-2 rounded-b-lg">
                  I work with large language models and use Retrieval-Augmented
                  Generation (RAG) to build more accurate and context-aware
                  applications. By combining LLMs with external knowledge
                  sources, I enable the model to retrieve relevant information
                  and generate reliable, real-time responses for tasks like
                  question answering and conversational agents.
                </div>
              </Accordion>
              <Accordion
                i={3}
                expanded={expanded}
                setExpanded={setExpanded}
                accordionTitle="UI/UX Design"
                className=""
                icon={
                  <LineiconsFigma
                    className="mr-2 w-6 h-6"
                    fill={theme === "dark" ? "#fff" : "#000"}
                  />
                }>
                <div className="text-sm text-text border border-gray-200 px-4 py-2 rounded-b-lg">
                  I design easy-to-use and visually clean interfaces. I focus on
                  making sure users have a smooth and enjoyable experience when
                  using a website or app.
                </div>
              </Accordion>
            </div>
          </div>
          {/* Contact Section */}
          <div className="bg-sbackground text-text mt-2 relative md:mx-5 md:rounded-xl md:mb-5">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <MaterialSymbolsLightMailOutline
                  className="w-7 h-7 items-center justify-center"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-lg font-semibold text-center ">
                Let&rsquo;s Connect
              </span>
            </div>
            <div className="justify-center items-center text-center mx-5 mt-4 p-3">
              <div className="flex-col ">
                {mounted && (
                  <div className="flex justify-center items-center flex-wrap gap-2">
                    <IcBaselineFacebook
                      className="h-10 w-10"
                      fill={theme === "dark" ? "#fff" : "#000"}
                    />
                    <MdiInstagram
                      className="h-10 w-10"
                      fill={theme === "dark" ? "#fff" : "#000"}
                    />
                    <BxlGmail
                      className="h-10 w-10"
                      fill={theme === "dark" ? "#fff" : "#000"}
                    />
                    <MdiLinkedin
                      className="h-10 w-10"
                      fill={theme === "dark" ? "#fff" : "#000"}
                    />
                    <MdiGithub
                      className="h-10 w-10"
                      fill={theme === "dark" ? "#fff" : "#000"}
                    />
                  </div>
                )}
                <div className="flex justify-center items-center mt-4">
                  <span className="opacity-40 text-xs md:text-sm">
                    Let&rsquo;s create something amazing &mdash; reach out
                    through any of the platforms above and let&rsquo;s start the
                    conversation.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
