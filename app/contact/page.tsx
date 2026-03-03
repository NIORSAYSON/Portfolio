"use client";
import React, { FormEvent, ChangeEvent, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  CircumMail,
  MaterialSymbolsLightMailOutline,
  MdiLightPhone,
  MynauiLocation,
} from "../icons";
import SocialMedia from "@/components/SocialMedia";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const [values, setValues] = useState<FormValues>(initValues);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setStatus("success");
      setValues(initValues);
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme-aware classes for status messages to ensure good contrast in light mode
  const successBoxClass =
    theme === "dark"
      ? "p-4 bg-green-900/30 border border-green-500 rounded-lg"
      : "p-4 bg-green-600 border border-green-600 text-white rounded-lg";
  const successTextClass =
    theme === "dark"
      ? "text-[15px] text-green-300 text-center"
      : "text-[15px] text-white text-center";

  const errorBoxClass =
    theme === "dark"
      ? "p-4 bg-red-900/30 border border-red-500 rounded-lg"
      : "p-4 bg-red-600 border border-red-600 text-white rounded-lg";
  const errorTextClass =
    theme === "dark"
      ? "text-[15px] text-red-300 text-center"
      : "text-[15px] text-white text-center";

  const contactInfo = [
    {
      icon: MynauiLocation,
      label: "Location",
      value: "West Carisac Libon, Albay",
    },
    {
      icon: MdiLightPhone,
      label: "Phone",
      value: "+63 938 403 1607",
    },
    {
      icon: CircumMail,
      label: "Email",
      value: "nessayson@gmail.com",
    },
  ];


  return (
    <main className="min-h-screen w-full">
      <div className="grid xl:grid-cols-5 w-full min-h-screen gap-0">
        {/* Left Column - Contact Info & Social */}
        <div className="col-span-2 w-full">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-sbackground md:rounded-xl shadow-md overflow-hidden mx-5 mt-20 md:mt-5 text-text">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <MaterialSymbolsLightMailOutline
                  className="w-8 h-8"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-[18px] md:text-[20px] font-bold">
                Get in Touch
              </span>
            </div>

            <div className="px-5 py-6">
              <p className="text-[15px] md:text-[16px] mb-6 opacity-80">
                I&rsquo;m always open to discussing new projects, creative
                ideas, or opportunities to be part of your vision. Feel free to
                reach out!
              </p>

              {/* Contact Information */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-snbackground transition-all duration-300">
                    {mounted && (
                      <item.icon
                        className="w-6 h-6 flex-shrink-0"
                        fill={theme === "dark" ? "#fff" : "#000"}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs opacity-60 mb-1">{item.label}</p>
                      <p className="text-[15px] md:text-[16px] truncate">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Social Media Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-sbackground md:rounded-xl shadow-md overflow-hidden mx-5 mt-5 text-text md:mb-5">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              <span className="text-[18px] md:text-[20px] font-bold">
                Connect on Social Media
              </span>
            </div>

            <div className="px-5 py-6">
              <p className="text-[15px] md:text-[16px] mb-6 opacity-80">
                Follow me on social media to stay updated with my latest
                projects and activities.
              </p>

              {mounted && <SocialMedia />}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="col-span-3 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-sbackground md:rounded-xl shadow-md overflow-hidden xl:ml-0 mx-5 mt-5 xl:mt-5 md:mr-5 text-text mb-5">
            <div className="ml-5 pt-4 flex flex-row items-center gap-1">
              {mounted && (
                <MaterialSymbolsLightMailOutline
                  className="w-8 h-8"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-[18px] md:text-[20px] font-bold">
                Send Me a Message
              </span>
            </div>

            <div className="px-5 py-6">
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[15px] md:text-[16px] font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    name="name"
                    value={values.name}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="border border-border bg-background rounded-lg px-4 py-3 w-full text-text focus:outline-none focus:ring-2 focus:ring-[#1B56FD] transition-all duration-300"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[15px] md:text-[16px] font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="border border-border bg-background rounded-lg px-4 py-3 w-full text-text focus:outline-none focus:ring-2 focus:ring-[#1B56FD] transition-all duration-300"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[15px] md:text-[16px] font-medium mb-2">
                    Subject
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    name="subject"
                    value={values.subject}
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry"
                    className="border border-border bg-background rounded-lg px-4 py-3 w-full text-text focus:outline-none focus:ring-2 focus:ring-[#1B56FD] transition-all duration-300"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[15px] md:text-[16px] font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    required
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    id="message"
                    placeholder="Tell me about your project or idea..."
                    rows={8}
                    className="border border-border bg-background rounded-lg px-4 py-3 w-full text-text resize-none focus:outline-none focus:ring-2 focus:ring-[#1B56FD] transition-all duration-300"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#1B56FD] hover:bg-blue-700 text-white font-medium w-full py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
                  {status === "loading" ? "Sending..." : "Send Message"}
                </motion.button>

                {/* Status Messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={successBoxClass}>
                    <p className={successTextClass}>
                      ✓ Your message was sent successfully! I&rsquo;ll get back
                      to you soon.
                    </p>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={errorBoxClass}>
                    <p className={errorTextClass}>
                      ✗ There was an error sending your message. Please try
                      again.
                    </p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
