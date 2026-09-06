"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Event } from "@/components/EventCard";

const MEETING_INFO_SHORT = "Wed 4:00–5:30 PM · DBH 6011";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
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

export default function UpcomingEvents({ events }: { events: Event[] }) {
  const [selected, setSelected] = useState(0);
  const current = events[selected];

  return (
    <motion.section
      className="mb-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        variants={itemVariants}
        className="mb-8 flex flex-wrap items-center justify-between gap-3"
      >
        <h2 className="font-serif text-2xl font-normal leading-[1.05] text-white">
          Upcoming
        </h2>
        <span className="text-sm text-[#4a8fd4]/85">{MEETING_INFO_SHORT}</span>
      </motion.div>

      {events.length === 0 || !current ? (
        <motion.div variants={itemVariants} className="py-16 text-center">
          <p className="text-white/55 text-3xl font-normal font-serif leading-[1.05]">
            No upcoming events right now...
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="grid overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1f1f1f] md:grid-cols-[220px_1fr]"
        >
          <div
            role="listbox"
            aria-label="Upcoming events"
            className="border-b border-white/[0.06] py-2 md:border-b-0 md:border-r"
          >
            {events.map((event, i) => {
              const active = i === selected;
              return (
                <button
                  key={`${event.title}-${event.dateLabel}`}
                  type="button"
                  onClick={() => setSelected(i)}
                  role="option"
                  aria-selected={active}
                  className={`block w-full border-l-2 px-5 py-3.5 text-left transition-colors duration-150 ${
                    active
                      ? "border-[#4a8fd4] bg-[rgba(74,143,212,0.08)]"
                      : "border-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-[0.06em] text-white/40">
                    {event.dayLabel ?? event.tag}
                  </div>
                  <div
                    className={`mt-0.5 text-sm ${
                      active ? "font-medium text-[#4a8fd4]" : "text-white"
                    }`}
                  >
                    {event.dateLabel}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-white/50">
                    {event.title}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className={`relative px-8 py-8 sm:px-9 ${
              events.some((event) => event.flyerSrc)
                ? "lg:min-h-[calc(4rem+(280px*4/3))]"
                : ""
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.title}-${current.dateLabel}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={current.flyerSrc ? "lg:pr-[312px]" : ""}
              >
                <h3 className="mb-3 font-serif text-[28px] leading-[1.15] text-white">
                  {current.title}
                </h3>
                {current.description && (
                  <p className="mb-5 text-[15px] leading-[1.6] text-white/70">
                    {current.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-[13px] text-white/55">
                  <span>{current.locationText}</span>
                  <span className="text-white/20">·</span>
                  <span>{current.datetimeText}</span>
                  {current.tag && (
                    <>
                      <span className="text-white/20">·</span>
                      <span>{current.tag}</span>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {current.flyerSrc && (
                <motion.div
                  key={current.flyerSrc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative mx-auto mt-8 aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#282828] lg:absolute lg:right-9 lg:top-8 lg:mt-0 lg:w-[280px]"
                >
                  <Image
                    src={current.flyerSrc}
                    alt={`${current.title} flyer`}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
