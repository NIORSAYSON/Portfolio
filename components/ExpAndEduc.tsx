import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ExpAndEducProps {
  descText: string;
  shortDescText: string;
  image: string;
  title: string;
  subtitle: string;
  date: string;
  gwa?: string;
  showMore: boolean;
  isCollege?: boolean;
  setShowMore: (value: boolean) => void;
}

export default function ExpAndEduc({
  showMore,
  setShowMore,
  descText,
  shortDescText,
  image,
  title,
  subtitle,
  date,
  gwa,
  isCollege,
}: ExpAndEducProps) {
  return (
    <div className="flex gap-4 px-5 py-4 border-b border-border last:border-b-0">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-border shrink-0 bg-sbackground">
          <Image
            src={image}
            alt={title}
            width={40}
            height={40}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="w-px flex-1 bg-border mt-2 min-h-[20px]" />
      </div>
      <div className="flex-1 pb-2">
        <p className="text-xs text-text-muted mb-1">{date}</p>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-sm text-text-muted">{subtitle}</p>
        {isCollege && gwa && (
          <p className="text-xs text-text-muted mt-0.5">{gwa}</p>
        )}
        <div className="mt-2">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={showMore ? "full" : "short"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-text-muted leading-relaxed inline">
              {showMore ? descText : shortDescText}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence>
            {showMore && isCollege && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 overflow-hidden">
                <p className="text-sm font-semibold text-text">Competitions:</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-1">
                  <li>
                    <span className="text-sm font-medium text-text">
                      ICPC Asia Manila Regional Contest – Participant
                    </span>
                    <span className="block text-xs text-text-muted ml-4">
                      Ateneo de Manila University (December 15–16, 2022)
                    </span>
                  </li>
                  <li>
                    <span className="text-sm font-medium text-text">
                      2022 Programming Contest – 9th Place
                    </span>
                    <span className="block text-xs text-text-muted ml-4">
                      Camarines Sur Polytechnic Colleges (November 14, 2022)
                    </span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            className="mt-2 text-xs text-[--navtext] hover:underline font-medium"
            onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </div>
  );
}
