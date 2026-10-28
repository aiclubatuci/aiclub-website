"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";

const projects = projectsData as Project[];

const hasOpenApplications = projects.some(
  (project) => project.status === "open" && project.link?.trim(),
);

const INFO_CARDS: { title: string; body: ReactNode }[] = [
  {
    title: "Applications",
    body: hasOpenApplications
      ? "Applications are currently open! Explore our available projects below."
      : "Open every quarter. Fall, Winter, and Spring — typically Week 1.",
  },
  {
    title: "Who can apply",
    body: "All UCI students. Teams form after applications close.",
  },
  {
    title: "How to apply",
    body: hasOpenApplications ? (
      <>
        Applications are open!{" "}
        <a
          href="#ongoing-projects"
          className="text-[#4a8fd4] transition-colors duration-150 hover:text-[#70a9e3]"
        >
          Apply directly through the project cards below
        </a>
        .
      </>
    ) : (
      <>
        <a
          href="https://discord.com/invite/a24QHw2xZz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 transition-colors duration-150 hover:text-[#4a8fd4]"
        >
          Join the Discord
        </a>
        .{" "}
        <Link
          href="/contact"
          className="text-white/70 no-underline transition-colors duration-150 hover:text-[#4a8fd4]"
        >
          Get notified on the mailing list
        </Link>
        .
      </>
    ),
  },
];

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

export default function ProjectInfo() {
  return (
    <section className="px-[clamp(1.5rem,5vw,4rem)] pb-20">
      <motion.div
        className="mx-auto grid max-w-[1000px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {INFO_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            variants={itemVariants}
            className="h-full rounded-2xl border border-white/[0.08] bg-[#1f1f1f] px-6 py-7"
          >
            <div className="mb-2.5 text-xs font-medium tracking-[0.06em] text-[#4a8fd4]">
              {String(i + 1).padStart(2, "0")}
            </div>

            <h3 className="mb-2.5 font-serif text-[22px] leading-[1.15] text-white">
              {card.title}
            </h3>

            <p className="m-0 text-[15px] leading-[1.6] text-white/70">
              {card.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
