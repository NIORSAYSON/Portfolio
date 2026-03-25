"use client";
import React, { FormEvent, ChangeEvent, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Briefcase,
  Check,
  Clock,
  Code2,
  Copy,
  Database,
  Figma,
  Globe,
  Handshake,
  Mail,
  MapPin,
  Phone,
  Smartphone,
  Workflow,
} from "lucide-react";
import SocialMedia from "@/components/SocialMedia";
import {
  CARD_BASE,
  SECTION_HEADER_CLASS,
  SECTION_TITLE_CLASS,
} from "@/lib/styles";

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

const contactInfo = [
  {
    Icon: MapPin,
    label: "Location",
    value: "West Carisac Libon, Albay",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+63 938 403 1607",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "nessayson@gmail.com",
  },
];

/** Floating label input field */
function FloatingInput({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required,
}: {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer block w-full border border-border bg-background rounded-xl px-4 pt-5 pb-2 text-sm text-text placeholder-transparent focus:outline-none focus:border-none transition-all duration-200"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-3.5 text-xs text-text-muted pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-accent peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-[11px]">
        {label}
      </label>
      <span className="hidden">{placeholder}</span>
    </div>
  );
}

/** Floating label textarea */
function FloatingTextarea({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  rows = 8,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        rows={rows}
        className="peer block w-full border border-border bg-background rounded-xl px-4 pt-5 pb-2 text-sm text-text placeholder-transparent resize-none focus:outline-none focus:border-none transition-all duration-200"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-3.5 text-xs text-text-muted pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-accent peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-[11px]">
        {label}
      </label>
      <span className="hidden">{placeholder}</span>
    </div>
  );
}

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = mounted && theme === "dark";

  const [values, setValues] = useState<FormValues>(initValues);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = async (value: string, index: number) => {
    let success = false;

    // Modern Clipboard API (requires HTTPS + user gesture)
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        success = true;
      } catch {
        // fall through to legacy method
      }
    }

    // Legacy fallback — works on HTTP and older mobile browsers
    if (!success) {
      try {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.cssText =
          "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        // setSelectionRange improves iOS support
        ta.setSelectionRange(0, value.length);
        success = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        // clipboard unavailable
      }
    }

    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
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
            className={`${CARD_BASE} text-text`}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <Mail
                  className="w-5 h-5"
                  color={isDark ? "#9ca3af" : "#6b7280"}
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
                  <motion.button
                    key={index}
                    type="button"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    onClick={() => handleCopy(item.value, index)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent transition-all duration-200 text-left group relative"
                    aria-label={`Copy ${item.label}`}>
                    {mounted && (
                      <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0">
                        <item.Icon
                          className="w-4 h-4"
                          color={isDark ? "#f0f0f0" : "#0a0a0a"}
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-text-muted uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="text-sm truncate">{item.value}</p>
                    </div>
                    {/* Copy button */}
                    <AnimatePresence mode="wait">
                      {copiedIndex === index ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-1 text-[11px] font-semibold text-accent shrink-0">
                          <Check className="w-4 h-4" />
                          Copied!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy-icon"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-1 text-[11px] text-text-muted group-hover:text-accent shrink-0 transition-colors duration-200">
                          <Copy className="w-4 h-4" />
                          Copy
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Social Media Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`${CARD_BASE} text-text pb-5`}>
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

          {/* Availability Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`${CARD_BASE} text-text overflow-hidden md:mb-5`}>
            {/* Header */}
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-1">
                    Current Status
                  </p>
                  <h3 className="text-base font-bold text-text">
                    Open to Opportunities
                  </h3>
                </div>
                {/* Live indicator */}
                <div className="shrink-0 flex flex-col items-center gap-1 mt-0.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-green-500">
                    Live
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border mx-5" />

            {/* Status rows */}
            <div className="px-5 py-4 space-y-2">
              {[
                {
                  Icon: Briefcase,
                  label: "Freelance",
                  note: "Available now",
                  color: "text-green-500",
                  bg: "bg-green-500/10 border-green-500/20",
                  iconColor: "#22c55e",
                },
                {
                  Icon: Handshake,
                  label: "Full-time",
                  note: "Open to opportunities",
                  color: "text-green-500",
                  bg: "bg-green-500/10 border-green-500/20",
                  iconColor: "#22c55e",
                },
                {
                  Icon: Clock,
                  label: "Response Time",
                  note: "Within 24 hours",
                  color: "text-accent",
                  bg: "bg-accent/10 border-accent/20",
                  iconColor: "var(--accent)",
                },
              ].map(({ Icon, label, note, color, bg, iconColor }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-snbackground border border-border">
                  {mounted && (
                    <div
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${bg}`}>
                      <Icon className="w-3.5 h-3.5" color={iconColor} />
                    </div>
                  )}
                  <span className="text-sm flex-1">{label}</span>
                  <span className={`text-xs font-medium ${color}`}>{note}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column — Contact Form */}
        <div className="xl:col-span-3 w-full flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`${CARD_BASE} text-text`}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <Mail
                  className="w-5 h-5"
                  color={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Send a Message</span>
            </div>

            <div className="px-5 py-4">
              <form onSubmit={onSubmit} className="space-y-4">
                <FloatingInput
                  id="name"
                  name="name"
                  label="Full Name"
                  placeholder="John Doe"
                  value={values.name}
                  onChange={handleChange}
                  required
                />
                <FloatingInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="john.doe@example.com"
                  value={values.email}
                  onChange={handleChange}
                  required
                />
                <FloatingInput
                  id="subject"
                  name="subject"
                  label="Subject"
                  placeholder="Project Inquiry"
                  value={values.subject}
                  onChange={handleChange}
                  required
                />
                <FloatingTextarea
                  id="message"
                  name="message"
                  label="Message"
                  placeholder="Tell me about your project or idea..."
                  value={values.message}
                  onChange={handleChange}
                  required
                  rows={8}
                />

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-accent hover:bg-accent-hover text-white font-medium w-full py-2.5 rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
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

          {/* Services Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`${CARD_BASE} text-text mb-5`}>
            <div className={SECTION_HEADER_CLASS}>
              {mounted && (
                <Globe
                  className="w-5 h-5"
                  color={isDark ? "#9ca3af" : "#6b7280"}
                />
              )}
              <span className={SECTION_TITLE_CLASS}>Services I Offer</span>
            </div>
            <div className="px-5 pb-5 pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                {
                  Icon: Code2,
                  title: "Web Development",
                  desc: "Next.js, React, Tailwind",
                },
                {
                  Icon: Smartphone,
                  title: "Mobile Apps",
                  desc: "React Native, Expo",
                },
                {
                  Icon: Bot,
                  title: "AI Integration",
                  desc: "RAG, LLMs, OpenAI",
                },
                {
                  Icon: Workflow,
                  title: "Automation",
                  desc: "n8n, Zapier, Python",
                },
                {
                  Icon: Database,
                  title: "Backend & APIs",
                  desc: "Node.js, Express, Supabase",
                },
                {
                  Icon: Figma,
                  title: "UI/UX Design",
                  desc: "Figma, prototyping",
                },
              ].map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-2 p-3 rounded-xl bg-snbackground border border-border hover:border-accent/40 transition-colors duration-200">
                  {mounted && (
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Icon className="w-4 h-4" color="var(--accent)" />
                    </div>
                  )}
                  <p className="text-sm font-semibold leading-tight">{title}</p>
                  <p className="text-xs text-text-muted leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
