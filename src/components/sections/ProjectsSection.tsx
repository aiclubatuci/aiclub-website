"use client";

import { useState } from "react";
import data from "@/data/data.json";

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
    <div className="min-h-screen pt-36 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-8">
            Ongoing
          </h2>
          {ongoingProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-sm uppercase tracking-[0.15em]">
                Coming Soon...
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {displayedOngoing.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
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
          <h2 className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-8">
            Previous
          </h2>
          {completedProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-sm uppercase tracking-[0.15em]">
                Coming Soon...
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {displayedCompleted.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
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
