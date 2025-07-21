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
    <>
      <div className="flex p-5 gap-3">
        <div className="w-14 flex-shrink-1 flex items-center justify-center self-start">
          <div className="w-14 h-14 overflow-hidden">
            <Image
              src={image}
              alt="Profile"
              width={150}
              height={150}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-[16px] md:text-[18px] font-semibold">{title}</h3>
          <h5 className="text-[15px] md:text-[16px]">{subtitle}</h5>
          {isCollege && <h5 className="text-[15px] md:text-[16px]">{gwa}</h5>}
          <h5 className="text-[15px] md:text-[16px] opacity-[60%] mb-1">
            {date}
          </h5>
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={showMore ? "full" : "short"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[15px] md:text-[16px] inline">
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
                <p className="text-[15px] md:text-[16px] font-semibold">
                  Competitions:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    <span className="text-[15px] md:text-[16px] font-semibold">
                      ICPC Asia Manila Regional Contest – Participant
                    </span>
                    <span className="block text-[15px] md:text-[16px] ml-5">
                      Ateneo de Manila University (December 15–16, 2022)
                    </span>
                  </li>
                  <li>
                    <span className="text-[15px] md:text-[16px] font-semibold">
                      2022 Programming Contest – 9th Place
                    </span>
                    <span className="block text-[15px] md:text-[16px] ml-5">
                      Camarines Sur Polytechnic Colleges (November 14, 2022)
                    </span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            className="ml-2 text-[#1B56FD] hover:underline text-[15px] md:text-[16px] font-medium"
            onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </>
  );
}
