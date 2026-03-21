import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { colorTheme } from "@/app/constants";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function ContributionCalendar() {
  const [year, setYear] = useState(2026);
  const username = "NIORSAYSON";
  const years = [2026, 2025, 2024, 2023, 2022];
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="py-3 text-text">
      {/* Year selector — horizontal row, always visible */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {years.map((yr) => (
          <button
            key={yr}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
              year === yr
                ? "bg-[--navtext] text-white"
                : "text-text-muted hover:text-text border border-transparent hover:border-border"
            }`}
            onClick={() => setYear(yr)}>
            {yr}
          </button>
        ))}
      </div>

      {/* Calendar — scrolls horizontally on mobile */}
      <div className="overflow-x-auto w-full" style={{ WebkitOverflowScrolling: "touch" }}>
        <motion.div
          className="inline-block"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <GitHubCalendar
            username={username}
            year={year}
            maxLevel={4}
            hideColorLegend={true}
            hideTotalCount={true}
            blockMargin={2}
            blockRadius={3}
            blockSize={10}
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

      {/* Legend */}
      <motion.div
        className="flex items-center gap-2 text-xs text-text-muted mt-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}>
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <motion.span
              key={level}
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: 2,
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
    </div>
  );
}
