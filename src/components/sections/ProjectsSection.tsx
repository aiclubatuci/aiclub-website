"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import projectsData from "@/data/projects.json";

type Project = {
  title: string;
  description: string;
  sponsor?: string;
  tech: string[];
  status: "open" | "closed" | "completed";
  date: string;
  image?: string;
  link?: string;
};

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

function ProjectCard({ project }: { project: Project }) {
  const href = project.link?.trim();
  const showApply = Boolean(href && project.status === "open");

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#363636]/40 transition-colors duration-300 hover:border-[#363636]">
      {project.image && (
        <div className="relative aspect-[16/10] w-full bg-[#282828]">
          <img
            src={project.image}
            sizes="100vw"
            alt={project.title}
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="text-sm text-white">{project.title}</h3>
          <span className="shrink-0 text-[10px] uppercase tracking-[0.1em] text-gray-600">
            {project.date}
          </span>
        </div>

        <p className="mb-3 text-xs leading-relaxed text-gray-500">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-[0.1em] text-gray-600"
              >
                {t}
                {i < project.tech.length - 1 && " ·"}
              </span>
            ))}
          </div>

          {showApply && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded border border-[#4a8fd4]/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#4a8fd4] transition-colors duration-200 hover:border-[#4a8fd4]/80 hover:bg-[#4a8fd4]/10"
            >
              Apply
            </a>
          )}

          {project.status === "closed" && (
            <span className="shrink-0 text-[10px] uppercase tracking-[0.12em] text-gray-600">
              Apps closed
            </span>
          )}
        </div>
      </div>
    </div>
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

  const ongoingProjects = projects.filter(
    (p) => p.status === "open" || p.status === "closed",
  );

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
        <section id="ongoing-projects" className="mb-20 scroll-mt-24">
          <h2 className="mb-8 font-serif text-2xl font-normal leading-[1.05] text-white">
            Ongoing
          </h2>

          {ongoingProjects.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-3xl font-normal leading-[1.05] text-white/55">
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
                  className="mx-auto mt-8 block text-xs uppercase tracking-[0.15em] text-gray-500 transition-colors duration-300 hover:text-gray-400"
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
          <h2 className="mb-8 font-serif text-2xl font-normal leading-[1.05] text-white">
            Previous
          </h2>

          {completedProjects.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-3xl font-normal leading-[1.05] text-white/55">
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
                  className="mx-auto mt-8 block text-xs uppercase tracking-[0.15em] text-gray-500 transition-colors duration-300 hover:text-gray-400"
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
