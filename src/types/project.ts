export type ProjectStatus = "open" | "closed" | "completed";

export type Project = {
  title: string;
  description: string;
  sponsor?: string;
  tech: string[];
  status: ProjectStatus;
  date: string;
  image?: string;
  link?: string;
};
