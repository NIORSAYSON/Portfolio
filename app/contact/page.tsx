"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, FormEvent } from "react";
import {
  BxlGmail,
  CircumMail,
  IcBaselineFacebook,
  MaterialSymbolsLightMailOutline,
  MdiGithub,
  MdiInstagram,
  MdiLightPhone,
  MdiLinkedin,
  MynauiLocation,
} from "../icons";

const initValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function About() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const [values, setValues] = useState(initValues);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = ({ target }: any) => {
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
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
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <main className="min-h-screen w-full md:py-5">
      <div className="bg-sbackground md:rounded-xl shadow-md overflow-hidden md:mx-5 mt-20 md:mt-0 text-text mb-5">
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
        <div className="mb-5 mt-10 text-[15px] md:text-[16px] text-center px-10">
          Feel free to reach out for collaboration, questions, or just to say
          hello — I&rsquo;d love to connect with you!
        </div>
        <div className="items-center justify-center h-50 md:border-1 rounded-lg xl:mx-30 md:mx-10 mx-10">
          <div className="flex flex-col items-center md:items-start h-full justify-center xl:ml-20 md:mx-10">
            <div className="flex overflow-hidden justify-center items-center gap-4 mb-2">
              {mounted && (
                <MynauiLocation
                  className="w-8 h-8 items-center justify-center"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span className="text-[15px] md:text-[16px]">
                West Carisac Libon, Albay
              </span>
            </div>
            <div className="flex justify-center items-center gap-5 mb-2">
              {mounted && (
                <MdiLightPhone
                  className="w-7 h-7 items-center justify-center"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span>+63 938 403 1607</span>
            </div>
            <div className="flex justify-center items-center gap-5">
              {mounted && (
                <CircumMail
                  className="w-7 h-7 items-center justify-center"
                  fill={theme === "dark" ? "#fff" : "#000"}
                />
              )}
              <span>nessayson@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="items-center justify-center h-150 md:h-85 xl:mx-30 md:mx-10 mx-10 mt-5">
          <form onSubmit={onSubmit} className="flex flex-col gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Fields */}
              <div className="flex-1 flex flex-col space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[15px] md:text-[16px] font-medium mb-1">
                    NAME
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    name="name"
                    value={values.name}
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[15px] md:text-[16px] font-medium mb-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[15px] md:text-[16px] font-medium mb-1">
                    SUBJECT
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    name="subject"
                    value={values.subject}
                    id="subject"
                    type="text"
                    placeholder="Subject"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>
              {/* Message TextArea */}
              <div className="flex-1">
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[15px] md:text-[16px] font-medium mb-1">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    id="message"
                    placeholder="Your message"
                    rows={6}
                    className="border border-gray-300 rounded px-3 py-2 w-full h-53 resize-none"
                  />
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#1B56FD] hover:bg-blue-700 text-white font-medium w-full py-2 rounded">
                Submit
              </button>
            </div>
          </form>
          {status === "success" && (
            <p className="mt-2 text-[15px] text-green-600">
              Your message was sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-600">
              There was an error. Please try again.
            </p>
          )}
        </div>
        {mounted && (
          <div className="flex justify-center items-center flex-wrap gap-2 my-10">
            {[
              IcBaselineFacebook,
              MdiInstagram,
              BxlGmail,
              MdiLinkedin,
              MdiGithub,
            ].map((Icon, idx) => (
              <button
                key={idx}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors transform hover:scale-110"
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
                    window.open("https://github.com/NIORSAYSON", "_blank");
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
      </div>
    </main>
  );
}
