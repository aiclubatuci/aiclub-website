"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import data from "@/data/data.json";

const INFO_CARDS: { title: string; body: ReactNode }[] = [
  {
    title: "Applications",
    body: "Open every quarter. Fall, Winter, and Spring — typically Week 1.",
  },
  {
    title: "Who can apply",
    body: "All UCI students. Teams form after applications close.",
  },
  {
    title: "How to apply",
    body: (
      <>
        <a
          href="https://discord.gg/fKd7mpcq"
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

type Project = {
  title: string;
  description: string;
  sponsor?: string;
  tech: string[];
  status: "ongoing" | "completed";
  date: string;
  image?: string;
  link?: string;
};

const projects = data.Projects as Project[];

function ProjectCard({ project }: { project: Project }) {
  const content = (
    <div className="group border border-[#363636]/40 rounded-lg hover:border-[#363636] transition-colors duration-300 overflow-hidden">
      {project.image && (
        <div className="w-full aspect-[16/10] bg-[#282828] relative">
          <img
            src={project.image}
            sizes="100vw"
            alt={project.title}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-white text-sm">{project.title}</h3>
          <span className="text-[10px] text-gray-600 uppercase tracking-[0.1em] shrink-0">
            {project.date}
          </span>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-[10px] text-gray-600 uppercase tracking-[0.1em]"
            >
              {t}
              {i < project.tech.length - 1 && " ·"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return project.link ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}

function ProjectsHeader() {
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-36 pb-12 text-center sm:px-8 sm:pt-76 md:px-16 lg:px-24">
      <h1 className="mb-8 font-serif text-[clamp(2.5rem,5.5vw,4rem)] font-normal leading-[1.05] text-white">
        Projects
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
        Our project teams partner with startups and organizations to build AI
        that actually ships. Each quarter, students apply to join a team, work
        alongside other members, and grow a portfolio beyond coursework.
      </p>
    </section>
  );
}

function ProjectsInfo() {
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

export default function ProjectsSection() {
  const [ongoingExpanded, setOngoingExpanded] = useState(false);
  const [completedExpanded, setCompletedExpanded] = useState(false);

  const ongoingProjects = projects.filter((p) => p.status === "ongoing");
  const completedProjects = projects.filter((p) => p.status === "completed");

  const displayedOngoing = ongoingExpanded
    ? ongoingProjects
    : ongoingProjects.slice(0, 6);
  const displayedCompleted = completedExpanded
    ? completedProjects
    : completedProjects.slice(0, 6);

  const hasMoreOngoing = ongoingProjects.length > 6;
  const hasMoreCompleted = completedProjects.length > 6;

  return (
    <div className="min-h-screen pb-16">
      <ProjectsHeader />
      <ProjectsInfo />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-16 lg:px-24">
        <section className="mb-20">
          <h2 className="font-serif text-2xl font-normal leading-[1.05] text-white mb-8">
            Ongoing
          </h2>
          {ongoingProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/55 text-3xl font-normal font-serif leading-[1.05]">
                Coming Soon...
              </p>
            </div>
          ) : (
            <>
              <motion.div
                className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {displayedOngoing.map((project) => (
                  <motion.div key={project.title} variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
              {hasMoreOngoing && (
                <button
                  onClick={() => setOngoingExpanded(!ongoingExpanded)}
                  className="mt-8 text-xs text-gray-500 uppercase tracking-[0.15em] hover:text-gray-400 transition-colors duration-300 mx-auto block"
                >
                  {ongoingExpanded
                    ? "Show Less"
                    : `Show All (${ongoingProjects.length})`}
                </button>
              )}
            </>
          )}
        </section>

        <section>
          <h2 className="font-serif text-2xl font-normal leading-[1.05] text-white mb-8">
            Previous
          </h2>
          {completedProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/55 text-3xl font-normal font-serif leading-[1.05]">
                Coming Soon...
              </p>
            </div>
          ) : (
            <>
              <motion.div
                className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {displayedCompleted.map((project) => (
                  <motion.div key={project.title} variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
              {hasMoreCompleted && (
                <button
                  onClick={() => setCompletedExpanded(!completedExpanded)}
                  className="mt-8 text-xs text-gray-500 uppercase tracking-[0.15em] hover:text-gray-400 transition-colors duration-300 mx-auto block"
                >
                  {completedExpanded
                    ? "Show Less"
                    : `Show All (${completedProjects.length})`}
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
