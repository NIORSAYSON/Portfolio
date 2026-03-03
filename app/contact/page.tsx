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

const SECTION_HEADER_CLASS = "flex items-center gap-2 px-5 pt-5 pb-1";
const SECTION_TITLE_CLASS =
  "text-[15px] font-semibold tracking-wide uppercase text-text-muted";

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = mounted && theme === "dark";

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
      <div className="grid grid-cols-1 xl:grid-cols-5 w-full min-h-screen gap-5 p-5 pt-16 md:pt-5">
        {/* Left Column */}
        <div className="xl:col-span-2 w-full flex flex-col gap-5">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-sbackground border border-border rounded-2xl text-text">
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <MaterialSymbolsLightMailOutline
                  className="w-5 h-5"
                  fill={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Get in Touch</span>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-text-muted leading-relaxed mb-5">
                I&rsquo;m always open to discussing new projects, creative
                ideas, or opportunities to be part of your vision. Feel free to
                reach out!
              </p>
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-[--navtext] transition-all duration-200">
                    {mounted && (
                      <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0">
                        <item.icon
                          className="w-4 h-4"
                          fill={isDark ? "#f0f0f0" : "#0a0a0a"}
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[11px] text-text-muted uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="text-sm truncate">{item.value}</p>
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
            className="bg-sbackground border border-border rounded-2xl text-text pb-5 md:mb-5">
            <div className={SECTION_HEADER_CLASS}>
              <span className={SECTION_TITLE_CLASS}>Social Media</span>
            </div>
            <div className="px-5 py-2">
              <p className="text-sm text-text-muted leading-relaxed mb-2">
                Follow me to stay updated with my latest projects and
                activities.
              </p>
              <SocialMedia />
            </div>
          </motion.div>
        </div>

        {/* Right Column — Contact Form */}
        <div className="xl:col-span-3 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-sbackground border border-border rounded-2xl text-text mb-5">
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <MaterialSymbolsLightMailOutline
                  className="w-5 h-5"
                  fill={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Send a Message</span>
            </div>

            <div className="px-5 py-4">
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">
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
                    className="border border-border bg-background rounded-xl px-4 py-2.5 w-full text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-[--navtext] transition-all duration-200"
                  />
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">
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
                    className="border border-border bg-background rounded-xl px-4 py-2.5 w-full text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-[--navtext] transition-all duration-200"
                  />
                </div>
                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">
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
                    className="border border-border bg-background rounded-xl px-4 py-2.5 w-full text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-[--navtext] transition-all duration-200"
                  />
                </div>
                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    id="message"
                    placeholder="Tell me about your project or idea..."
                    rows={8}
                    className="border border-border bg-background rounded-xl px-4 py-2.5 w-full text-sm text-text placeholder:text-text-muted resize-none focus:outline-none focus:border-[--navtext] transition-all duration-200"
                  />
                </div>
                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[--navtext] hover:opacity-90 text-white font-medium w-full py-2.5 rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === "loading" ? "Sending..." : "Send Message"}
                </motion.button>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <p className="text-sm text-green-500 text-center">
                      Message sent successfully! I&rsquo;ll get back to you
                      soon.
                    </p>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-sm text-red-500 text-center">
                      There was an error sending your message. Please try again.
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
