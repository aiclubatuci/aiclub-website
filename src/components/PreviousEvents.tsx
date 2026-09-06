"use client";

import { motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import type { Event } from "@/components/EventCard";

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

export default function PreviousEvents({ events }: { events: Event[] }) {
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event, index) => (
            <motion.div
              key={`${event.title}-${event.dateLabel}-${index}`}
              variants={itemVariants}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}
