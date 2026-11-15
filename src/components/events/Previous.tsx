"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EventCard from "@/components/events/EventCard";
import type { Event } from "@/types";

const EVENTS_PER_PAGE = 10;

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
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(events.length / EVENTS_PER_PAGE);
  const pageEvents = events.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE,
  );

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pageEvents.map((event, index) => (
              <motion.div
                key={`${event.title}-${event.dateLabel}-${index}`}
                variants={itemVariants}
                className="h-full"
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
          {pageCount > 1 && (
            <nav
              aria-label="Previous events pagination"
              className="mt-8 flex items-center justify-center gap-6"
            >
              <button
                type="button"
                aria-label="Previous events page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
                className="text-xs uppercase tracking-[0.15em] text-gray-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-gray-700"
              >
                Previous
              </button>
              <span aria-live="polite" className="text-xs text-gray-500">
                Page {currentPage} of {pageCount}
              </span>
              <button
                type="button"
                aria-label="Next events page"
                disabled={currentPage === pageCount}
                onClick={() => setCurrentPage((page) => page + 1)}
                className="text-xs uppercase tracking-[0.15em] text-gray-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-gray-700"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </motion.section>
  );
}
