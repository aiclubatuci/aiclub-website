"use client";

import { useState } from "react";

interface Project {
  title: string;
  description: string;
  sponsor?: string;
  tech: string[];
  status: "ongoing" | "completed";
  date: string;
  image?: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Sunstone Cities",
    description:
      "Sunstone Cities specializes in economic development, infrastructure planning, and public private investment partnerships. Our students are helping to build an automated city economic report system used by real city officials.",
    sponsor: "Sunstone Cities",
    tech: ["Economic Development", "Data Analytics", "Automation"],
    status: "ongoing",
    date: "2025 - Present",
    image: "/img/projects/sunstone.png",
  },
  {
    title: "Sound Ethics",
    description:
      "Sound Ethics advocates for the use of ethical AI in the music industry. They are partnered with artists, educational institutions, industry stakeholders, and legal experts. Our students are building a VST plugin that embeds a conversational AI directly into a DAW as well as ML models in audio generation, voice cloning, and stem separation.",
    sponsor: "Sound Ethics",
    tech: ["AI", "VST Plugin", "Audio ML", "Music Technology"],
    status: "ongoing",
    date: "2025 - Present",
    image: "/img/projects/soundethics.png",
  },
  {
    title: "Playtime Planning",
    description:
      "Playtime Planning is startup building a platform where parents can easily find local activities for their children that match with their schedule and children's interests. Our students are helping to build the base app and launch to the current waiting list of users.",
    sponsor: "Playtime Planning",
    tech: ["React Native", "Full Stack", "Mobile Development"],
    status: "ongoing",
    date: "2025 - Present",
    image: "/img/projects/playtimeplanning.png",
  },
  {
    title: "AI MNIST Internal Project",
    description:
      "This is an AI Club self-paced internal project where use datasets to build a CNN for digit classification. Students submit their models and compare with others in the project.",
    tech: ["Python", "CNN", "Machine Learning", "Computer Vision"],
    status: "ongoing",
    date: "2025 - Present",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const content = (
    <div className="group border border-[#363636]/40 rounded-lg hover:border-[#363636] transition-colors duration-300 overflow-hidden">
      <div className="w-full aspect-[16/10] bg-[#282828] relative">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#333]" />
        )}
      </div>
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

export default function Projects() {
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
