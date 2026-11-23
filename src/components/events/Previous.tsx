"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EventCard from "@/components/events/EventCard";
import type { Event } from "@/types";

const MOBILE_INITIAL = 4;
const DESKTOP_INITIAL = 8;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function Previous({ events }: { events: Event[] }) {
  const [showAll, setShowAll] = useState(false);
  const cappedEvents = showAll ? events : events.slice(0, DESKTOP_INITIAL);
  const hasMoreMobile = events.length > MOBILE_INITIAL;
  const hasMoreDesktop = events.length > DESKTOP_INITIAL;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.h2
        variants={itemVariants}
        className="mb-8 font-serif text-2xl font-normal leading-[1.05] text-white"
      >
        Previous
      </motion.h2>
      {events.length === 0 ? (
        <motion.div variants={itemVariants} className="py-16 text-center">
          <p className="text-white/55 text-3xl font-normal font-serif leading-[1.05]">
            Coming soon...
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cappedEvents.map((event, index) => (
              <motion.div
                key={`${event.title}-${event.dateLabel}-${index}`}
                variants={itemVariants}
                className={`h-full${
                  !showAll && index >= MOBILE_INITIAL ? " hidden lg:block" : ""
                }`}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
          {hasMoreMobile && (
            <div
              className={`mt-8 flex justify-center${
                hasMoreDesktop ? "" : " lg:hidden"
              }`}
            >
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="cursor-pointer text-xs uppercase tracking-[0.15em] text-gray-400 transition-colors hover:text-white"
              >
                {showAll ? "Show less" : "See all"}
              </button>
            </div>
          )}
        </>
      )}
    </motion.section>
  );
}
