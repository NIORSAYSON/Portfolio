import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { colorTheme } from "@/app/constants";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function ContributionCalendar() {
  const [year, setYear] = useState(2025);
  const username = "NIORSAYSON";
  const years = [2025, 2024, 2023, 2022];
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="h-[250px] text-text">
      {/* <motion.div
        className="flex justify-start mt-3 items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <label htmlFor="year-select" className="mr-2 text-sm font-medium">
          Year:
        </label>
        <motion.select
          id="year-select"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border-gray-300 border-1 rounded px-4 py-1 text-sm "
          whileFocus={{ scale: 1.05, borderColor: "#6366f1" }}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </motion.select>
      </motion.div> */}
      <div className="flex">
        <div className="hide-scrollbar overflow-x-auto w-full">
          <div className="flex flex-nowrap gap-5 max-w-[10px]">
            <div className="flex flex-col">
              <motion.div
                className="my-4 items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}>
                <GitHubCalendar
                  username={username}
                  year={year}
                  maxLevel={4}
                  hideColorLegend={true}
                  blockMargin={3}
                  blockRadius={3}
                  blockSize={12}
                  showWeekdayLabels={true}
                  theme={{
                    light: colorTheme.dark,
                    dark: colorTheme.light,
                  }}
                  colorScheme={
                    mounted ? (theme === "dark" ? "dark" : "light") : "light"
                  }
                />
              </motion.div>
            </div>
          </div>
        </div>
        {/* Year selector */}
        <ul className="xl:w-80 w-25 pl-5 flex flex-col justify-center space-y-2 text-sm">
          {years.map((yr) => (
            <li key={yr}>
              <button
                className={
                  `w-full text-left px-4 py-1 rounded ` +
                  (year === yr
                    ? "bg-[#1B56FD] text-white"
                    : "text-gray-500 hover:text-gray-700")
                }
                onClick={() => setYear(yr)}>
                {yr}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <motion.div
        className="flex justify-center gap-2 text-xs text-gray-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}>
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <motion.span
              key={level}
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                borderRadius: 3,
                background:
                  mounted && theme === "dark"
                    ? colorTheme.light[level]
                    : colorTheme.dark[level],
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + level * 0.05 }}
            />
          ))}
        </div>
        <span>More</span>
      </motion.div>
    </main>
  );
}
