import type { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
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
