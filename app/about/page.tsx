"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  aboutText,
  collegeText,
  internshipText,
  juniorHighText,
  projects,
  seniorHighText,
} from "@/app/constants";
import {
  BiPersonCheck,
  BxlGmail,
  CilEducation,
  IcBaselineFacebook,
  MaterialSymbolsLightMailOutline,
  MdiGithub,
  MdiInstagram,
  MdiLightPin,
  MdiLinkedin,
} from "../icons";
import { useTheme } from "next-themes";
import ProjectCard from "@/components/ProjectCard";
import ExpAndEduc from "@/components/ExpAndEduc";

export default function About() {
  const [showMore, setShowMore] = useState<{
    about: boolean;
    internship: boolean;
    college: boolean;
    seniorHigh: boolean;
    juniorHigh: boolean;
  }>({
    about: false,
    internship: false,
    college: false,
    seniorHigh: false,
    juniorHigh: false,
  });

  const getShortText = (text: string, length: number = 160) =>
    text.slice(0, length) + (text.length > length ? "..." : "");

  const aboutMeShortText = getShortText(aboutText);
  const internshipShortText = getShortText(internshipText);
  const collegeShortText = getShortText(collegeText);
  const juniorHighShortText = getShortText(juniorHighText);
  const seniorHighShortText = getShortText(seniorHighText);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  // const [current, setCurrent] = useState(0);

  // const prevProject = () => {
  //   setCurrent((prev) => (prev === 0 ? 5 - 1 : prev - 1));
  // };

  // const nextProject = () => {
  //   setCurrent((prev) => (prev === 5 - 1 ? 0 : prev + 1));
  // };

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <main className="min-h-screen w-full">
      <div className="grid xl:grid-cols-9 w-full min-h-screen">
        {/* Right Column */}
        <div className="col-span-2 xl:col-span-5 w-full">
          {/* About Me Section */}
          <div className="bg-sbackground rounded-xl shadow-md overflow-hidden mx-5 mt-20 md:mt-5 text-text">
            {/* Banner */}
            <div className="relative h-45 w-full">
              <Image
                src="/Home Background.jpg"
                alt="Banner"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Profile section */}
            <div className="relative flex flex-col -mt-8 px-3 md:px-6 pb-6">
              <div className="w-30 h-30 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="-mt-18 ml-33 md:ml-35">
                <h2 className="text-[18px] md:text-[20px] font-bold">
                  Nestor B. Sayson Jr.
                </h2>
                <p className="text-[15px] md:text-[16px]">
                  Front-End Developer
                </p>
              </div>
              {/* About Me */}
              <div className="mt-6 w-full">
                <h3 className="font-semibold text-[18px] md:text-[20px] mb-1 mt-5">
                  About Me
                </h3>
                <p className="text-[15px] md:text-[16px] inline">
                  {showMore.about ? aboutText : aboutMeShortText}
                </p>
                <button
                  className="ml-2 text-[#1B56FD] hover:underline text-[15px] md:text-[16px] font-medium"
                  onClick={() =>
                    setShowMore((prev) => ({
                      ...prev,
                      about: !prev.about,
                    }))
                  }>
                  {showMore.about ? "Show less" : "Show more"}
                </button>
              </div>
            </div>
          </div>
          {/* Experience Section */}
          <div className="bg-sbackground md:rounded-xl shadow-md md:mx-5 mt-5 text-text">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <BiPersonCheck
                  className="w-6 h-6 items-center justify-center mr-1"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-[18px] md:text-[20px] font-bold text-center ">
                Experience
              </span>
            </div>
            <ExpAndEduc
              showMore={showMore.internship}
              setShowMore={(value: boolean) =>
                setShowMore((prev) => ({ ...prev, internship: value }))
              }
              descText={internshipText}
              shortDescText={internshipShortText}
              image="/i7-No BG.png"
              title="Front-End Developer Intern"
              subtitle="Intelliseven Technology Solutions Inc."
              date="Mar 2025 - Jun 2025"
            />
          </div>
          {/* Projects Section */}
          <div className="bg-sbackground relative md:mx-5 md:rounded-xl xl:mb-5 text-text mt-2 md:mt-5 shadow-md">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <MdiLightPin
                  className="w-7 h-7 items-center justify-center"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-[18px] md:text-[20px] font-bold text-center ">
                Projects
              </span>
            </div>
            <div className="mx-5">
              <div className="hide-scrollbar flex h-[360px] w-full items-start justify-start overflow-x-auto">
                <div className="flex flex-nowrap gap-5 max-w-[300px] items-center">
                  {/* <button
                    onClick={prevProject}
                    className="absolute left-8 z-10 flex items-center justify-center p-4 bg-gray-200 opacity-80 rounded-full shadow hover:bg-gray-300"
                    style={{
                      width: "50px",
                      height: "50px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    aria-label="Previous Project">
                    <MingcuteArrowLeftFill className="w-14 h-14" />
                  </button> */}
                  <ProjectCard
                    title={projects[0].title}
                    subtitle="Personal Project"
                    image="/Projects/Portfolio.png"
                    description={projects[0].description}
                    slug={projects[0].slug}
                    link="https://niorsayson.vercel.app/"
                  />
                  <ProjectCard
                    title={projects[1].title}
                    subtitle="Internship Project"
                    image="/Projects/POS.png"
                    description={projects[1].description}
                    slug={projects[1].slug}
                  />
                  <ProjectCard
                    title={projects[2].title}
                    subtitle="Thesis Project"
                    image="/Projects/Conversational Agent Project.png"
                    description={projects[2].description}
                    slug={projects[2].slug}
                    link="https://huggingface.co/spaces/Nioooor/CSPC_Conversational_Agent"
                  />
                  <ProjectCard
                    title={projects[3].title}
                    subtitle="Human Computer Interaction Project"
                    image="/Projects/SIAS Project.png"
                    description={projects[3].description}
                    slug={projects[3].slug}
                    link="https://niorsayson.github.io/SIAS-Online-Portal-Redesign/"
                  />
                  <ProjectCard
                    title={projects[4].title}
                    subtitle="Modeling and Simulation Project"
                    image="/Projects/Modeling and Simulation Project.png"
                    description={projects[4].description}
                    slug={projects[4].slug}
                    link="https://synthetic-data-generator-sayson.streamlit.app/Synthetic_Data_Generator"
                  />
                  <ProjectCard
                    title={projects[5].title}
                    subtitle="Applied Cryptography Project"
                    image="/Projects/Cryptographic App Project.png"
                    description={projects[5].description}
                    slug={projects[5].slug}
                    link="https://saysonnior-cs3b.streamlit.app/"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column */}
        <div className="col-span-2 xl:col-span-4 w-full text-text">
          {/* Education Section */}
          <div className="bg-sbackground mt-2 md:mt-5 xl:ml-0 relative md:mx-5 md:rounded-xl">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <CilEducation
                  className="w-7 h-7 items-center justify-center mr-1"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-[18px] md:text-[20px] font-bold text-center ">
                Education
              </span>
            </div>
            <ExpAndEduc
              showMore={showMore.college}
              setShowMore={(value: boolean) =>
                setShowMore((prev) => ({ ...prev, college: value }))
              }
              descText={collegeText}
              shortDescText={collegeShortText}
              image="/CSPC.png"
              title="BS in Computer Science"
              subtitle="Camarines Sur Polytechnic Colleges"
              date="Aug 2021 - Jul 2025"
              gwa="GWA: 1.3103"
              isCollege={true}
            />
            <ExpAndEduc
              showMore={showMore.seniorHigh}
              setShowMore={(value: boolean) =>
                setShowMore((prev) => ({ ...prev, seniorHigh: value }))
              }
              descText={seniorHighText}
              shortDescText={seniorHighShortText}
              image="/LICOM-No BG.png"
              title="General Academic Strand (GAS)"
              subtitle="Libon Community Colleges (SHS)"
              date="Aug 2019 - Jun 2021"
            />
            <ExpAndEduc
              showMore={showMore.juniorHigh}
              setShowMore={(value: boolean) =>
                setShowMore((prev) => ({ ...prev, juniorHigh: value }))
              }
              descText={juniorHighText}
              shortDescText={juniorHighShortText}
              image="/LAIHS-No BG.png"
              title="Computer System and Services"
              subtitle="Libon Agro Industrial High School"
              date="July 2015 - Jun 2019"
            />
          </div>
          {/* Contact Section */}
          <div className="bg-sbackground text-text mt-2 md:mt-5 xl:ml-0 relative md:mx-5 md:rounded-xl md:mb-5 shadow-md ml-0">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <MaterialSymbolsLightMailOutline
                  className="w-8 h-8 items-center justify-center"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-[18px] md:text-[20px] font-bold text-center ">
                Let&rsquo;s Connect
              </span>
            </div>
            <div className="justify-center items-center text-center mx-5 mt-4 p-3">
              <div className="flex-col ">
                {mounted && (
                  <div className="flex justify-center items-center flex-wrap gap-2">
                    {[
                      IcBaselineFacebook,
                      MdiInstagram,
                      BxlGmail,
                      MdiLinkedin,
                      MdiGithub,
                    ].map((Icon, idx) => (
                      <button
                        key={idx}
                        className={`p-2 rounded-full ${
                          theme === "dark"
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-200"
                        } transition-colors transform hover:scale-110`}
                        aria-label={`social-icon-${idx}`}
                        onClick={() => {
                          if (idx === 0) {
                            window.open(
                              "https://www.facebook.com/nioooooor?mibextid=ZbWKwL",
                              "_blank"
                            );
                          } else if (idx === 1) {
                            window.open(
                              "https://www.instagram.com/niorsayson/",
                              "_blank"
                            );
                          } else if (idx === 2) {
                            window.location.href = "mailto:nessayson@gmail.com";
                          } else if (idx === 3) {
                            window.open(
                              "https://www.linkedin.com/in/nestor-sayson-b8671b292/",
                              "_blank"
                            );
                          } else if (idx === 4) {
                            window.open(
                              "https://github.com/NIORSAYSON",
                              "_blank"
                            );
                          }
                        }}>
                        <Icon
                          className="h-10 w-10"
                          fill={theme === "dark" ? "#fff" : "#000"}
                        />
                      </button>
                    ))}
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
