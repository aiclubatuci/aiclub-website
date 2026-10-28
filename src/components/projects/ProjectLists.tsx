"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";
import ProjectCard from "@/components/projects/ProjectCard";

const projects = projectsData as Project[];

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

export default function ProjectLists() {
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
  );
}
