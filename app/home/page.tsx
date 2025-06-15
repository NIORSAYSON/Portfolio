"use client";

import { Roboto } from "next/font/google";
import Image from "next/image";
import { GrommetIconsTechnology, MdiLightPin } from "../icons";
import ProjectCard from "@/components/ProjectCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SkillsTicker from "@/components/SkillsTicker";
import { skillIcons1, skillIcons2 } from "../constants";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function HomePage() {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");

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

  const typewriterTexts = [
    "A Front-End Developer crafting delightful digital experiences.",
    "Passionate about building accessible and responsive web apps.",
    "Turning ideas into interactive user interfaces.",
  ];
  const [displayedText, setDisplayedText] = useState("");
  const [currentSentence, setCurrentSentence] = useState(0);

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
    <main>
      <div className="h-[40vh] sm:h-[70vh] mt-20 md:mt-0 relative mx-5 mb-5">
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
          <div className="text-white rounded px-3 py-1 text-sm md:text-lg font-semibold">
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
      <div className="bg-white relative">
        <div className="ml-5 pt-4 flex flex-row items-center gap-1">
          <MdiLightPin className="w-6 h-6 items-center justify-center" />
          <span className="text-lg font-semibold text-black text-center ">
            Projects
          </span>
        </div>
        <div className="mx-5">
          <div className="hide-scrollbar flex h-[320px] w-full items-start justify-start overflow-x-auto">
            <div className="flex flex-nowrap gap-5 max-w-[300px]">
              <ProjectCard
                title="POS System Application"
                subtitle="Internship Project"
                image="/Projects/POS.png"
                description="Developed a tablet-based POS system app using React Native."
              />
              <ProjectCard
                title="Conversational Agent for CSPC"
                subtitle="Thesis Project"
                image="/Projects/CSPC CA.png"
                description="A chatbot using a pretrained transformer model to answer queries based on CSPC official information."
              />
              <ProjectCard
                title="SIAS Student Portal Redesign"
                subtitle="Human Computer Interaction Project"
                image="/Projects/SIAS Redesign.png"
                description="Redesigned the SIAS Online Portal using Bootstrap to enhance its layout, responsiveness, and user experience."
              />
              <ProjectCard
                title="Cryptographic Application"
                subtitle="Applied Cryptography Project"
                image="/Projects/Cryptographic App.png"
                description="Developed a cryptographic application using Python to encrypt and decrypt messages."
              />
              <ProjectCard
                title="Synthetic Data Simulation"
                subtitle="Modeling and Simulation Project"
                image="/Projects/Modeling and Simulation.png"
                description="An app that generates synthetic data for use in modeling, simulation, and analysis."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-5 relative">
        <div className="ml-5 pt-4 flex flex-row items-center gap-1">
          <GrommetIconsTechnology className="w-6 h-6 items-center justify-center" />
          <span className="text-lg font-semibold text-black text-center ">
            Skills
          </span>
        </div>
        <div className="mx-5">
          <div className="w-full h-[200px] overflow-hidden MyGradient">
            <SkillsTicker images={skillIcons1} from={0} to={"-100%"} />
            <SkillsTicker images={skillIcons2} from={"-100%"} to={0} />
          </div>
        </div>
      </div>
    </main>
  );
}
