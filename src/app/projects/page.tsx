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
    title: "Project Alpha",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company A",
    tech: ["Python", "AI", "Machine Learning"],
    status: "ongoing",
    date: "2025 - Present",
    link: "#",
  },
  {
    title: "Project Beta",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company B",
    tech: ["JavaScript", "Web Dev"],
    status: "ongoing",
    date: "2025 - Present",
  },
  {
    title: "Project Gamma",
    description: "Description of the Project and Company Sponsor",
    tech: ["Python", "Data Science"],
    status: "ongoing",
    date: "2025 - Present",
  },
  {
    title: "Project Delta",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company C",
    tech: ["React", "Node.js"],
    status: "completed",
    date: "2024 - 2025",
    link: "#",
  },
  {
    title: "Project Epsilon",
    description: "Description of the Project and Company Sponsor",
    tech: ["Python", "TensorFlow"],
    status: "completed",
    date: "2024",
  },
  {
    title: "Project Zeta",
    description: "Description of the Project and Company Sponsor",
    sponsor: "Company D",
    tech: ["Vue", "Firebase"],
    status: "completed",
    date: "2023 - 2024",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Image Area */}
      <div className="w-full h-64 bg-gradient-to-br from-gray-300 to-gray-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300/50 to-gray-400/50 group-hover:scale-105 transition-transform duration-300"></div>
        {project.link && (
          <a
            href={project.link}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-gray-900 transition-colors shadow-md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        )}
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col h-64 justify-center items-center text-center">
        <p className="text-black text-base font-medium leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  const ongoingProjects = projects.filter((p) => p.status === "ongoing");
  const completedProjects = projects.filter((p) => p.status === "completed");

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Ongoing Projects Section */}
        <section className="mb-24">
          <h2 className="text-5xl font-bold text-white text-center mb-12">
            Ongoing Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ongoingProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Previous Projects Section */}
        <section>
          <h2 className="text-5xl font-bold text-white text-center mb-12">
            Previous Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {completedProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
