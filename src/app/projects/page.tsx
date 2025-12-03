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
    title: "Project A",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company A",
    tech: ["Python", "AI", "Machine Learning"],
    status: "ongoing",
    date: "2025 - Present",
    link: "#",
  },
  {
    title: "Project B",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company B",
    tech: ["JavaScript", "Web Dev"],
    status: "ongoing",
    date: "2025 - Present",
  },
  {
    title: "Project C",
    description: "Description of the Project and Company Sponsor",
    tech: ["Python", "Data Science"],
    status: "ongoing",
    date: "2025 - Present",
  },
  {
    title: "Project D",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company C",
    tech: ["React", "Node.js"],
    status: "completed",
    date: "2024 - 2025",
    link: "#",
  },
  {
    title: "Project E",
    description: "Description of the Project and Company Sponsor",
    tech: ["Python", "TensorFlow"],
    status: "completed",
    date: "2024",
  },
  {
    title: "Project F",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company D",
    tech: ["Vue", "Firebase"],
    status: "completed",
    date: "2023 - 2024",
  },
  {
    title: "Project G",
    description: "Description of the Project and Company Sponsor",
    tech: ["TypeScript", "Next.js"],
    status: "ongoing",
    date: "2025 - Present",
  },
  {
    title: "Project H",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company E",
    tech: ["PyTorch", "Deep Learning"],
    status: "ongoing",
    date: "2025 - Present",
    link: "#",
  },
  {
    title: "Project I",
    description: "Description of the Project and Company Sponsor",
    tech: ["Docker", "Kubernetes"],
    status: "completed",
    date: "2024",
  },
  {
    title: "Project J",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company F",
    tech: ["Swift", "iOS"],
    status: "completed",
    date: "2023 - 2024",
    link: "#",
  },
  {
    title: "Project K",
    description: "Description of the Project and Company Sponsor",
    tech: ["Rust", "Systems"],
    status: "ongoing",
    date: "2025 - Present",
  },
  {
    title: "Project L",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company G",
    tech: ["Go", "Backend"],
    status: "ongoing",
    date: "2025 - Present",
  },
  {
    title: "Project M",
    description: "Description of the Project and Company Sponsor",
    tech: ["Flutter", "Mobile"],
    status: "ongoing",
    date: "2025 - Present",
    link: "#",
  },
  {
    title: "Project N",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company H",
    tech: ["GraphQL", "API"],
    status: "ongoing",
    date: "2025 - Present",
  },
  {
    title: "Project O",
    description: "Description of the Project and Company Sponsor",
    tech: ["MongoDB", "Database"],
    status: "completed",
    date: "2024",
  },
  {
    title: "Project P",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company I",
    tech: ["AWS", "Cloud"],
    status: "completed",
    date: "2023 - 2024",
    link: "#",
  },
  {
    title: "Project Q",
    description: "Description of the Project and Company Sponsor",
    tech: ["Elixir", "Functional"],
    status: "completed",
    date: "2024",
  },
  {
    title: "Project R",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company J",
    tech: ["Angular", "Frontend"],
    status: "completed",
    date: "2023 - 2024",
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
            className="w-full h-full object-cover"
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
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-8">
            Previous
          </h2>
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
        </section>
      </div>
    </div>
  );
}
