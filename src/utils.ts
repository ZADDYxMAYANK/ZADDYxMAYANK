import { ProfileData } from "./types";
import { TECH_BADGES } from "./data/presets";

export function generateMarkdown(data: ProfileData): string {
  // 1. HEADER
  let markdown = "";
  if (data.showAvatar && data.githubUsername) {
    markdown += `<a href="https://github.com/${data.githubUsername}">\n` +
                `  <img src="https://github.com/${data.githubUsername}.png" align="right" width="120" style="border-radius: 50%" />\n` +
                `</a>\n\n`;
  }
  markdown += `# Hi there, I'm ${data.name} 👋\n`;
  markdown += `### ${data.role}\n\n`;

  // Links
  const links: string[] = [];
  if (data.portfolioUrl) {
    links.push(`[🌐 Portfolio](${data.portfolioUrl})`);
  }
  if (data.linkedInUrl) {
    links.push(`[🔗 LinkedIn](${data.linkedInUrl})`);
  }
  if (data.email) {
    links.push(`[✉️ Email](mailto:${data.email})`);
  }
  if (data.instagramUrl) {
    links.push(`[📸 Instagram](${data.instagramUrl})`);
  }

  if (links.length > 0) {
    markdown += `${links.join(" • ")}\n\n---\n\n`;
  } else {
    markdown += `---\n\n`;
  }

  // 2. ABOUT ME
  markdown += `## 🚀 About Me\n\n`;
  markdown += `${data.aboutMe}\n\n`;
  markdown += `* 🛠️ **Current focus:** Building responsive, robust, and accessible user experiences with a commitment to clean code.\n`;
  markdown += `* ⚡ **Experience:** ${data.experienceYears} year${data.experienceYears === 1 ? "" : "s"} of technical development and high-quality crafting.\n\n`;

  // 3. TECH STACK & TOOLS
  markdown += `## 💻 Tech Stack & Tools\n\n`;

  const activeLangs = TECH_BADGES.filter((b) => b.category === "languages" && data.skills.languages.includes(b.name));
  const activeFrameworks = TECH_BADGES.filter((b) => b.category === "frameworks" && data.skills.frameworks.includes(b.name));
  const activeDatabases = TECH_BADGES.filter((b) => b.category === "databases" && data.skills.databases.includes(b.name));
  const activeTools = TECH_BADGES.filter((b) => b.category === "tools" && data.skills.tools.includes(b.name));

  const buildBadgeString = (badges: typeof TECH_BADGES) => {
    return badges
      .map((b) => {
        // Shields.io flat-square formatting:
        // https://img.shields.io/badge/<LABEL>-<COLOR>?style=flat-square&logo=<LOGO>&logoColor=white
        const escapedLabel = encodeURIComponent(b.label);
        return `![${b.label}](https://img.shields.io/badge/${escapedLabel}-${b.color}?style=flat-square&logo=${b.logo}&logoColor=white)`;
      })
      .join(" ");
  };

  if (activeLangs.length > 0) {
    markdown += `### 🗣️ Languages\n${buildBadgeString(activeLangs)}\n\n`;
  }
  if (activeFrameworks.length > 0) {
    markdown += `### 📂 Frameworks & Libraries\n${buildBadgeString(activeFrameworks)}\n\n`;
  }
  if (activeDatabases.length > 0) {
    markdown += `### 🗄️ Databases\n${buildBadgeString(activeDatabases)}\n\n`;
  }
  if (activeTools.length > 0) {
    markdown += `### ⚙️ Tools & Platform\n${buildBadgeString(activeTools)}\n\n`;
  }

  markdown += `---\n\n`;

  // 4. FEATURED PROJECTS
  markdown += `## 📂 Featured Projects\n\n`;

  data.projects.forEach((proj) => {
    if (proj.name.trim()) {
      markdown += `### 🌟 [${proj.name}](${proj.url})\n`;
      markdown += `* **Real-world problem solved:** ${proj.description}\n`;
      markdown += `* **Tech Stack:** ${proj.techStack.join(", ")}\n`;
      markdown += `* **Repository:** [View Code](https://github.com/${data.githubUsername || "mayanksinjali"}/${proj.name.toLowerCase().replace(/\s+/g, "-")}) *(Placeholder)*\n\n`;
    }
  });

  markdown += `---\n\n`;

  // 5. GH STATS
  if (data.showStats || data.showLangs) {
    markdown += `## 📊 GitHub Stats\n\n`;
    markdown += `<p align="middle">\n`;
    
    const username = data.githubUsername || "mayanksinjali";
    
    if (data.showStats) {
      markdown += `  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${data.statsTheme}" alt="${username}'s GitHub stats" />\n`;
    }
    if (data.showLangs) {
      markdown += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${data.statsTheme}" alt="${username}'s Top Languages" />\n`;
    }
    markdown += `</p>\n\n`;
  }

  return markdown;
}
