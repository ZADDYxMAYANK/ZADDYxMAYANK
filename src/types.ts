export interface Project {
  name: string;
  url: string;
  description: string;
  techStack: string[];
}

export interface TechBadge {
  name: string;
  label: string;
  color: string;
  logo: string;
  category: "languages" | "frameworks" | "databases" | "tools";
}

export interface ProfileData {
  name: string;
  role: string;
  experienceYears: number;
  portfolioUrl: string;
  linkedInUrl: string;
  email: string;
  instagramUrl: string;
  githubUsername: string;
  aboutMe: string;
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
  };
  projects: Project[];
  statsTheme: string;
  showStats: boolean;
  showLangs: boolean;
  showAvatar: boolean;
}
