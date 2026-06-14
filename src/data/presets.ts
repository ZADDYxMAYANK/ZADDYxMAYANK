import { TechBadge, Project } from "../types";

export const TECH_BADGES: TechBadge[] = [
  // Languages
  { name: "javascript", label: "JavaScript", color: "F7DF1E", logo: "javascript", category: "languages" },
  { name: "typescript", label: "TypeScript", color: "3178C6", logo: "typescript", category: "languages" },
  { name: "python", label: "Python", color: "3776AB", logo: "python", category: "languages" },
  { name: "html5", label: "HTML5", color: "E34F26", logo: "html5", category: "languages" },
  { name: "css3", label: "CSS3", color: "1572B6", logo: "css3", category: "languages" },
  { name: "sql", label: "SQL", color: "CC2927", logo: "postgresql", category: "languages" },

  // Frameworks & Libraries
  { name: "react", label: "React", color: "61DAFB", logo: "react", category: "frameworks" },
  { name: "node", label: "Node.js", color: "5FA04E", logo: "node.js", category: "frameworks" },
  { name: "express", label: "Express.js", color: "000000", logo: "express", category: "frameworks" },
  { name: "nextjs", label: "Next.js", color: "000000", logo: "next.js", category: "frameworks" },
  { name: "redux", label: "Redux", color: "764ABC", logo: "redux", category: "frameworks" },
  { name: "tailwind", label: "Tailwind CSS", color: "06B6D4", logo: "tailwindcss", category: "frameworks" },
  { name: "fastapi", label: "FastAPI", color: "009688", logo: "fastapi", category: "frameworks" },
  { name: "django", label: "Django", color: "092E20", logo: "django", category: "frameworks" },

  // Databases
  { name: "mongodb", label: "MongoDB", color: "47A248", logo: "mongodb", category: "databases" },
  { name: "postgresql", label: "PostgreSQL", color: "4169E1", logo: "postgresql", category: "databases" },
  { name: "mysql", label: "MySQL", color: "4479A1", logo: "mysql", category: "databases" },
  { name: "redis", label: "Redis", color: "DC382D", logo: "redis", category: "databases" },

  // Tools & Cloud
  { name: "git", label: "Git", color: "F05032", logo: "git", category: "tools" },
  { name: "github", label: "GitHub", color: "181717", logo: "github", category: "tools" },
  { name: "postman", label: "Postman", color: "FF6C37", logo: "postman", category: "tools" },
  { name: "docker", label: "Docker", color: "2496ED", logo: "docker", category: "tools" },
  { name: "netlify", label: "Netlify", color: "00C7B7", logo: "netlify", category: "tools" },
  { name: "vercel", label: "Vercel", color: "000000", logo: "vercel", category: "tools" },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    name: "Aura Private",
    url: "https://aura-private.netlify.app/",
    description: "A highly customizable digital workspace and personal ambiance controller designed with localized focus-assisting environments.",
    techStack: ["React", "Tailwind CSS", "Web Audio API", "LocalStorage"],
  },
  {
    name: "Himalyan Trail",
    url: "https://himalya-trail.netlify.app/",
    description: "An interactive adventure travel cataloging app focusing on regional maps, trek safety, and height logs.",
    techStack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
  },
  {
    name: "Restro Bar",
    url: "https://restro-bar.netlify.app/",
    description: "A digital restaurant command-center with seamless menu management and fully responsive real-time order states.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
  },
];

export const STATS_THEMES = [
  { value: "github_dark", label: "GitHub Dark" },
  { value: "radical", label: "Radical" },
  { value: "tokyonight", label: "Tokyo Night" },
  { value: "dracula", label: "Dracula" },
  { value: "buefy", label: "Buefy" },
  { value: "ocean_dark", label: "Ocean Dark" },
  { value: "solarized_dark", label: "Solarized Dark" },
];
