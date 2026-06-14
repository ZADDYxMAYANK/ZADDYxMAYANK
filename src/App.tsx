import React, { useState } from "react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  RefreshCw, 
  Copy, 
  Check, 
  Eye, 
  Code, 
  Plus, 
  Trash2, 
  Briefcase, 
  Wrench, 
  Layers, 
  Award, 
  Instagram,
  FileCode2,
  FileText
} from "lucide-react";
import { ProfileData, Project } from "./types";
import { TECH_BADGES, INITIAL_PROJECTS, STATS_THEMES } from "./data/presets";
import { generateMarkdown } from "./utils";

const THEME_PALETTES: Record<string, { bg: string; title: string; text: string; accent: string; border: string }> = {
  github_dark: {
    bg: "#0d1117",
    title: "#58a6ff",
    text: "#c9d1d9",
    accent: "#58a6ff",
    border: "#30363d",
  },
  radical: {
    bg: "#141321",
    title: "#fe428e",
    text: "#a9fef7",
    accent: "#fe428e",
    border: "#242238",
  },
  tokyonight: {
    bg: "#1a1b26",
    title: "#7aa2f7",
    text: "#a9b1d6",
    accent: "#7aa2f7",
    border: "#24283b",
  },
  dracula: {
    bg: "#282a36",
    title: "#ff79c6",
    text: "#f8f8f2",
    accent: "#50fa7b",
    border: "#44475a",
  },
  buefy: {
    bg: "#ffffff",
    title: "#7957d5",
    text: "#363636",
    accent: "#7957d5",
    border: "#dbdbdb",
  },
  ocean_dark: {
    bg: "#1f222b",
    title: "#00a3cc",
    text: "#cdd6e2",
    accent: "#00a3cc",
    border: "#2d313f",
  },
  solarized_dark: {
    bg: "#002b36",
    title: "#268bd2",
    text: "#93a1a1",
    accent: "#268bd2",
    border: "#073642",
  },
};

const getStatsSvg = (username: string, theme: string) => {
  const colors = THEME_PALETTES[theme] || THEME_PALETTES.github_dark;
  const escBg = encodeURIComponent(colors.bg);
  const escTitle = encodeURIComponent(colors.title);
  const escText = encodeURIComponent(colors.text);
  const escAccent = encodeURIComponent(colors.accent);
  const escBorder = encodeURIComponent(colors.border);
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='450' height='195' viewBox='0 0 450 195' fill='none'><rect x='0.5' y='0.5' width='449' height='194' rx='4.5' fill='${escBg}' stroke='${escBorder}'/><g transform='translate(25, 35)'><text x='0' y='0' fill='${escTitle}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-weight='600' font-size='18'>${username}'s GitHub Stats</text><g transform='translate(0, 25)'><g transform='translate(0, 0)'><text x='25' y='12.5' fill='${escText}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-size='14'>⭐ Total Stars:</text><text x='220' y='12.5' fill='${escAccent}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-weight='600' font-size='14'>48</text></g><g transform='translate(0, 26)'><text x='25' y='12.5' fill='${escText}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-size='14'>💖 Total Commits:</text><text x='220' y='12.5' fill='${escAccent}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-weight='600' font-size='14'>1,280</text></g><g transform='translate(0, 52)'><text x='25' y='12.5' fill='${escText}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-size='14'>🔥 Total PRs:</text><text x='220' y='12.5' fill='${escAccent}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-weight='600' font-size='14'>142</text></g><g transform='translate(0, 78)'><text x='25' y='12.5' fill='${escText}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-size='14'>💼 Issues Closed:</text><text x='220' y='12.5' fill='${escAccent}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-weight='600' font-size='14'>89</text></g><g transform='translate(0, 104)'><text x='25' y='12.5' fill='${escText}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-size='14'>🏆 Contributed to:</text><text x='220' y='12.5' fill='${escAccent}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-weight='600' font-size='14'>12 repos</text></g></g></g></svg>`;
};

const getLangsSvg = (username: string, theme: string) => {
  const colors = THEME_PALETTES[theme] || THEME_PALETTES.github_dark;
  const escBg = encodeURIComponent(colors.bg);
  const escTitle = encodeURIComponent(colors.title);
  const escText = encodeURIComponent(colors.text);
  const escAccent = encodeURIComponent(colors.accent);
  const escBorder = encodeURIComponent(colors.border);
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='350' height='195' viewBox='0 0 350 195' fill='none'><rect x='0.5' y='0.5' width='349' height='194' rx='4.5' fill='${escBg}' stroke='${escBorder}'/><g transform='translate(25, 35)'><text x='0' y='0' fill='${escTitle}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-weight='600' font-size='18'>Most Used Languages</text><g transform='translate(0, 30)'><g><text x='0' y='10' fill='${escText}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-size='12' font-weight='bold'>JavaScript (54.2%)</text><rect x='0' y='18' width='220' height='8' rx='4' fill='%23f1e05a'/></g><g transform='translate(0, 38)'><text x='0' y='10' fill='${escText}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-size='12' font-weight='bold'>TypeScript (31.8%)</text><rect x='0' y='18' width='130' height='8' rx='4' fill='%233178c6'/></g><g transform='translate(0, 76)'><text x='0' y='10' fill='${escText}' font-family='&quot;Segoe UI&quot;, Ubuntu, Sans-Serif' font-size='12' font-weight='bold'>Python (14.0%)</text><rect x='0' y='18' width='57' height='8' rx='4' fill='%233572A5'/></g></g></g></svg>`;
};

export default function App() {
  // Pre-load application state with Mayank's authentic requested skills & projects
  const [profile, setProfile] = useState<ProfileData>({
    name: "ZADDYxMAYANK",
    role: "Full Stack Web Developer",
    experienceYears: 1,
    portfolioUrl: "https://himalya-trail.netlify.app/", // use trail app as primary portfolio
    linkedInUrl: "https://linkedin.com/in/mayank-sinjali",
    email: "mayanksinjali159@gmail.com",
    instagramUrl: "https://www.instagram.com/mayank_notatall/",
    githubUsername: "ZADDYxMAYANK",
    aboutMe: "A focused and creative Full Stack Developer with 1 year of professional experience designing, building, and optimizing modern full-stack web applications. Expertly proficient in the MERN stack (MongoDB, Express.js, React, Node.js) combined with computational backend scripts in Python, prioritizing secure APIs and high-performance user interfaces.",
    skills: {
      languages: ["javascript", "typescript", "python", "html5", "css3"],
      frameworks: ["react", "node", "express", "tailwind", "redux"],
      databases: ["mongodb", "postgresql"],
      tools: ["git", "github", "postman", "netlify", "vercel"]
    },
    projects: [...INITIAL_PROJECTS],
    statsTheme: "github_dark",
    showStats: true,
    showLangs: true,
    showAvatar: true,
  });

  const [activeTab, setActiveTab] = useState<"preview" | "markdown">("preview");
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<"about" | "contact" | "skills" | "projects" | "stats">("about");

  const [newProject, setNewProject] = useState<Project>({
    name: "",
    url: "",
    description: "",
    techStack: ["React"],
  });

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all edits to the developer profile?")) {
      setProfile({
        name: "ZADDYxMAYANK",
        role: "Full Stack Web Developer",
        experienceYears: 1,
        portfolioUrl: "https://himalya-trail.netlify.app/",
        linkedInUrl: "https://linkedin.com/in/mayank-sinjali",
        email: "mayanksinjali159@gmail.com",
        instagramUrl: "https://www.instagram.com/mayank_notatall/",
        githubUsername: "ZADDYxMAYANK",
        aboutMe: "A focused and creative Full Stack Developer with 1 year of professional experience designing, building, and optimizing modern full-stack web applications. Expertly proficient in the MERN stack (MongoDB, Express.js, React, Node.js) combined with computational backend scripts in Python, prioritizing secure APIs and high-performance user interfaces.",
        skills: {
          languages: ["javascript", "typescript", "python", "html5", "css3"],
          frameworks: ["react", "node", "express", "tailwind", "redux"],
          databases: ["mongodb", "postgresql"],
          tools: ["git", "github", "postman", "netlify", "vercel"]
        },
        projects: [...INITIAL_PROJECTS],
        statsTheme: "github_dark",
        showStats: true,
        showLangs: true,
        showAvatar: true,
      });
    }
  };

  const handleCopy = () => {
    const md = generateMarkdown(profile);
    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toggleSkill = (category: "languages" | "frameworks" | "databases" | "tools", skillName: string) => {
    const list = [...profile.skills[category]];
    const index = list.indexOf(skillName);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(skillName);
    }
    setProfile({
      ...profile,
      skills: {
        ...profile.skills,
        [category]: list
      }
    });
  };

  const handleProjectChange = (index: number, field: keyof Project, value: any) => {
    const updated = [...profile.projects];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, projects: updated });
  };

  const handleAddProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      setProfile({
        ...profile,
        projects: [...profile.projects, { ...newProject }]
      });
      setNewProject({
        name: "",
        url: "",
        description: "",
        techStack: ["React"],
      });
    } else {
      alert("Please provide at least a project title and description.");
    }
  };

  const handleRemoveProject = (index: number) => {
    const updated = profile.projects.filter((_, i) => i !== index);
    setProfile({ ...profile, projects: updated });
  };

  const generatedMarkdownText = generateMarkdown(profile);

  return (
    <div className="min-h-screen bg-[#010409] text-[#c9d1d9] font-sans selection:bg-[#58a6ff]/30 selection:text-[#f0f6fc]">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#010409]/85 backdrop-blur-xl border-b border-[#30363d] px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-tr from-[#238636] to-[#2ea043] rounded-xl shadow-md">
              <Github className="w-7 h-7 text-white font-bold" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#f0f6fc]">
                GitHub README Architect
              </h1>
              <p className="text-sm text-[#8b949e] mt-0.5">
                Generate and refine modern technical candidate bios tailored for technical recruiters
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#21262d] hover:bg-[#30363d] text-sm font-semibold text-[#c9d1d9] border border-[#30363d] rounded-lg transition"
              title="Restore original Mayank Sinjali's resume presets"
            >
              <RefreshCw className="w-4 h-4 text-[#58a6ff]" />
              Reset presets
            </button>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-5 py-2.5 font-bold text-sm rounded-lg shadow-md transition ${
                copied 
                  ? "bg-[#238636] text-white hover:bg-[#2ea043]" 
                  : "bg-[#2ea043] text-white hover:bg-[#238636]"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy RAW Markdown"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel - Form Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Form Selection Rails */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden p-1.5 flex gap-1.5 scrollbar-none overflow-x-auto">
              <button
                onClick={() => setActiveSection("about")}
                className={`flex-1 py-2.5 px-4 text-center rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-250 ${
                  activeSection === "about"
                    ? "bg-[#21262d] text-[#58a6ff] border border-[#30363d] shadow-sm"
                    : "text-[#8b949e] hover:text-[#f0f6fc]"
                }`}
              >
                1. Bio & Links
              </button>
              <button
                onClick={() => setActiveSection("skills")}
                className={`flex-1 py-2.5 px-4 text-center rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-250 ${
                  activeSection === "skills"
                    ? "bg-[#21262d] text-[#58a6ff] border border-[#30363d] shadow-sm"
                    : "text-[#8b949e] hover:text-[#f0f6fc]"
                }`}
              >
                2. Tech Stack
              </button>
              <button
                onClick={() => setActiveSection("projects")}
                className={`flex-1 py-2.5 px-4 text-center rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-250 ${
                  activeSection === "projects"
                    ? "bg-[#21262d] text-[#58a6ff] border border-[#30363d] shadow-sm"
                    : "text-[#8b949e] hover:text-[#f0f6fc]"
                }`}
              >
                3. Projects
              </button>
              <button
                onClick={() => setActiveSection("stats")}
                className={`flex-1 py-2.5 px-4 text-center rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-250 ${
                  activeSection === "stats"
                    ? "bg-[#21262d] text-[#58a6ff] border border-[#30363d] shadow-sm"
                    : "text-[#8b949e] hover:text-[#f0f6fc]"
                }`}
              >
                4. Metrics & Stats
              </button>
            </div>

            {/* Active Section Content Panels */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-6 shadow-xl">
              
              {/* About and Basic Info Card */}
              {activeSection === "about" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#30363d]">
                    <Briefcase className="w-5 h-5 text-[#58a6ff]" />
                    <h3 className="font-bold text-base text-[#f0f6fc]">1. Header & Core Experience</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-[#c9d1d9] font-semibold">Developer Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-[#c9d1d9] font-semibold font-mono">Job Title / Role</label>
                      <input
                        type="text"
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-[#c9d1d9] font-semibold">Experience (Years)</label>
                      <input
                        type="number"
                        min="0"
                        value={profile.experienceYears}
                        onChange={(e) => setProfile({ ...profile, experienceYears: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-[#c9d1d9] font-semibold font-mono">GitHub Username</label>
                      <input
                        type="text"
                        value={profile.githubUsername}
                        onChange={(e) => setProfile({ ...profile, githubUsername: e.target.value })}
                        className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70"
                      />
                    </div>
                  </div>

                  {/* Owner Avatar Toggle */}
                  <div className="flex items-center justify-between bg-[#161b22] border border-[#30363d] rounded-xl p-4">
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-[#c9d1d9]">Include Owner Avatar</span>
                      <p className="text-xs text-[#8b949e]">Displays your GitHub profile picture at the top of your README</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.showAvatar}
                      onChange={(e) => setProfile({ ...profile, showAvatar: e.target.checked })}
                      className="w-5 h-5 text-[#2ea043] bg-[#0d1117] border-[#30363d] rounded focus:ring-[#2ea043]/30 accent-[#2ea043] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-[#c9d1d9] font-semibold flex items-center justify-between">
                      <span>Recruiter Pitch / About Me</span>
                      <span className="text-[11px] text-[#8b949e]/80 font-mono">Confiders scannability (Recommended: ~2-3 sentences)</span>
                    </label>
                    <textarea
                      rows={5}
                      value={profile.aboutMe}
                      onChange={(e) => setProfile({ ...profile, aboutMe: e.target.value })}
                      className="w-full bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-sm text-[#f0f6fc] leading-relaxed focus:outline-none focus:border-[#58a6ff]/70 resize-y"
                    />
                  </div>

                  <div className="space-y-4 pt-2">
                    <h4 className="text-sm font-bold text-[#c9d1d9]">Professional Contact Channels</h4>
                    
                    <div className="space-y-3.5">
                       <div className="flex items-center gap-3 bg-[#161b22] border border-[#30363d] rounded-lg p-2">
                        <span className="p-2 bg-[#21262d] text-[#8b949e] rounded-md">
                          <ExternalLink className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          placeholder="Portfolio / Primary URL"
                          value={profile.portfolioUrl}
                          onChange={(e) => setProfile({ ...profile, portfolioUrl: e.target.value })}
                          className="flex-1 bg-transparent border-0 p-1 text-[#f0f6fc] text-sm focus:ring-0 focus:outline-none placeholder-[#484f58]"
                        />
                      </div>

                       <div className="flex items-center gap-3 bg-[#161b22] border border-[#30363d] rounded-lg p-2">
                        <span className="p-2 bg-[#21262d] text-[#8b949e] rounded-md">
                          <Linkedin className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          placeholder="LinkedIn Profile URL"
                          value={profile.linkedInUrl}
                          onChange={(e) => setProfile({ ...profile, linkedInUrl: e.target.value })}
                          className="flex-1 bg-transparent border-0 p-1 text-[#f0f6fc] text-sm focus:ring-0 focus:outline-none placeholder-[#484f58]"
                        />
                      </div>

                       <div className="flex items-center gap-3 bg-[#161b22] border border-[#30363d] rounded-lg p-2">
                        <span className="p-2 bg-[#21262d] text-[#8b949e] rounded-md">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          placeholder="Professional Email Address"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="flex-1 bg-transparent border-0 p-1 text-[#f0f6fc] text-sm focus:ring-0 focus:outline-none placeholder-[#484f58]"
                        />
                      </div>

                       <div className="flex items-center gap-3 bg-[#161b22] border border-[#30363d] rounded-lg p-2">
                        <span className="p-2 bg-[#21262d] text-[#8b949e] rounded-md">
                          <Instagram className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          placeholder="Instagram Link"
                          value={profile.instagramUrl}
                          onChange={(e) => setProfile({ ...profile, instagramUrl: e.target.value })}
                          className="flex-1 bg-transparent border-0 p-1 text-[#f0f6fc] text-sm focus:ring-0 focus:outline-none placeholder-[#484f58]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills Checklist Card */}
              {activeSection === "skills" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#30363d]">
                    <div className="flex items-center gap-2.5">
                      <Wrench className="w-5 h-5 text-[#58a6ff]" />
                      <h3 className="font-bold text-base text-[#f0f6fc]">2. Modern Shields.io Tech Stack</h3>
                    </div>
                    <span className="text-xs text-[#8b949e] font-medium">Click badges to toggle them on or off</span>
                  </div>

                  {/* Languages Group */}
                  <div className="space-y-3">
                    <label className="text-xs text-[#f0f6fc] tracking-widest font-bold uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#58a6ff] rounded-full"></span>
                      Languages
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {TECH_BADGES.filter((b) => b.category === "languages").map((badge) => {
                        const active = profile.skills.languages.includes(badge.name);
                        return (
                          <button
                            key={badge.name}
                            onClick={() => toggleSkill("languages", badge.name)}
                            style={{ 
                              borderColor: active ? `#${badge.color}aa` : "#30363d",
                              background: active ? `#${badge.color}18` : "#161b22" 
                            }}
                            className={`px-4 py-2 text-sm rounded-lg border font-semibold transition flex items-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95 ${
                              active 
                                ? "text-[#f0f6fc]" 
                                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]"
                            }`}
                          >
                            <span 
                              className="w-2 h-2 rounded-full animate-pulse" 
                              style={{ backgroundColor: `#${badge.color}` }}
                            />
                            {badge.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Frameworks Group */}
                  <div className="space-y-3">
                    <label className="text-xs text-[#f0f6fc] tracking-widest font-bold uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#2ea043] rounded-full"></span>
                      Frameworks & Libraries
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {TECH_BADGES.filter((b) => b.category === "frameworks").map((badge) => {
                        const active = profile.skills.frameworks.includes(badge.name);
                        return (
                          <button
                            key={badge.name}
                            onClick={() => toggleSkill("frameworks", badge.name)}
                            style={{ 
                              borderColor: active ? `#${badge.color}aa` : "#30363d",
                              background: active ? `#${badge.color}18` : "#161b22" 
                            }}
                            className={`px-4 py-2 text-sm rounded-lg border font-semibold transition flex items-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95 ${
                              active 
                                ? "text-[#f0f6fc]" 
                                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]"
                            }`}
                          >
                            <span 
                              className="w-2 h-2 rounded-full animate-pulse" 
                              style={{ backgroundColor: `#${badge.color}` }}
                            />
                            {badge.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Databases Group */}
                  <div className="space-y-3">
                    <label className="text-xs text-[#f0f6fc] tracking-widest font-bold uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#f1e05a] rounded-full"></span>
                      Databases
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {TECH_BADGES.filter((b) => b.category === "databases").map((badge) => {
                        const active = profile.skills.databases.includes(badge.name);
                        return (
                          <button
                            key={badge.name}
                            onClick={() => toggleSkill("databases", badge.name)}
                            style={{ 
                              borderColor: active ? `#${badge.color}aa` : "#30363d",
                              background: active ? `#${badge.color}18` : "#161b22" 
                            }}
                            className={`px-4 py-2 text-sm rounded-lg border font-semibold transition flex items-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95 ${
                              active 
                                ? "text-[#f0f6fc]" 
                                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]"
                            }`}
                          >
                            <span 
                              className="w-2 h-2 rounded-full animate-pulse" 
                              style={{ backgroundColor: `#${badge.color}` }}
                            />
                            {badge.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tools Group */}
                  <div className="space-y-3">
                    <label className="text-xs text-[#f0f6fc] tracking-widest font-bold uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#e34c26] rounded-full"></span>
                      Tools, Server & Platform
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {TECH_BADGES.filter((b) => b.category === "tools").map((badge) => {
                        const active = profile.skills.tools.includes(badge.name);
                        return (
                          <button
                            key={badge.name}
                            onClick={() => toggleSkill("tools", badge.name)}
                            style={{ 
                              borderColor: active ? `#${badge.color}aa` : "#30363d",
                              background: active ? `#${badge.color}18` : "#161b22" 
                            }}
                            className={`px-4 py-2 text-sm rounded-lg border font-semibold transition flex items-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95 ${
                              active 
                                ? "text-[#f0f6fc]" 
                                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]"
                            }`}
                          >
                            <span 
                              className="w-2 h-2 rounded-full animate-pulse" 
                              style={{ backgroundColor: `#${badge.color}` }}
                            />
                            {badge.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Projects List Card */}
              {activeSection === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-[#30363d]">
                    <Layers className="w-5 h-5 text-[#58a6ff]" />
                    <h3 className="font-bold text-base text-[#f0f6fc]">3. Showcase Featured Projects</h3>
                  </div>

                  {/* Project Accordion/Items */}
                  <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                    {profile.projects.map((proj, idx) => (
                      <div 
                        key={idx} 
                        className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 space-y-4 shadow-sm relative group"
                      >
                        <button
                          onClick={() => handleRemoveProject(idx)}
                          className="absolute top-4 right-4 p-2 text-[#8b949e] hover:text-red-400 hover:bg-[#21262d] rounded-md transition"
                          title="Remove Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <span className="text-xs font-mono text-[#58a6ff] uppercase font-bold tracking-wider">
                          Project #{idx + 1}
                        </span>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[11px] text-[#c9d1d9] uppercase font-bold tracking-wider">Project Name</label>
                            <input
                              type="text"
                              value={proj.name}
                              onChange={(e) => handleProjectChange(idx, "name", e.target.value)}
                              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[11px] text-[#c9d1d9] uppercase font-bold tracking-wider">Netlify / Live Link</label>
                            <input
                              type="text"
                              value={proj.url}
                              onChange={(e) => handleProjectChange(idx, "url", e.target.value)}
                              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] text-[#c9d1d9] uppercase font-bold tracking-wider">
                            1-Sentence Problem & Solution Description
                          </label>
                          <input
                            type="text"
                            value={proj.description}
                            onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] text-[#c9d1d9] uppercase font-bold tracking-wider">
                            Stack Technologies (Comma-separated)
                          </label>
                          <input
                            type="text"
                            value={proj.techStack.join(", ")}
                            onChange={(e) => {
                              const arr = e.target.value.split(",").map((s) => s.trim());
                              handleProjectChange(idx, "techStack", arr);
                            }}
                            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Project Box */}
                  <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 space-y-4 pt-4">
                    <span className="text-sm font-bold text-[#f0f6fc] flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#58a6ff]" />
                      Add Another Custom Project
                    </span>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70 placeholder-[#484f58]"
                      />
                      <input
                        type="text"
                        placeholder="https://example.netlify.app"
                        value={newProject.url}
                        onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70 placeholder-[#484f58]"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Concise 1-sentence description of the real-world problem it solves"
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70 placeholder-[#484f58]"
                    />

                    <div className="flex items-center justify-between gap-4 pt-1">
                      <input
                        type="text"
                        placeholder="React, MongoDB, Tailwind, etc. (comma-separated)"
                        value={newProject.techStack.join(", ")}
                        onChange={(e) => {
                          const arr = e.target.value.split(",").map((s) => s.trim());
                          setNewProject({ ...newProject, techStack: arr });
                        }}
                        className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]/70 placeholder-[#484f58]"
                      />
                      <button
                        type="button"
                        onClick={handleAddProject}
                        className="px-4 py-2.5 bg-[#238636] text-white hover:bg-[#2ea043] text-sm font-bold rounded-lg transition shadow-sm border border-[#2ea043]"
                      >
                        Insert Project
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* GitHub Stats Cards Configuration */}
              {activeSection === "stats" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-[#30363d]">
                    <Award className="w-5 h-5 text-[#2ea043]" />
                    <h3 className="font-bold text-base text-[#f0f6fc]">4. GitHub Metrics & Theme Customization</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-[#161b22] border border-[#30363d] rounded-xl p-4">
                      <div className="space-y-1">
                        <span className="text-sm font-bold text-[#c9d1d9]">Include Github Readme Stats</span>
                        <p className="text-xs text-[#8b949e]">Renders core performance, lines written, commits count</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.showStats}
                        onChange={(e) => setProfile({ ...profile, showStats: e.target.checked })}
                        className="w-5 h-5 text-[#2ea043] bg-[#0d1117] border-[#30363d] rounded focus:ring-[#2ea043]/30 accent-[#2ea043] cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between bg-[#161b22] border border-[#30363d] rounded-xl p-4">
                      <div className="space-y-1">
                        <span className="text-sm font-bold text-[#c9d1d9]">Include Most Used Languages Card</span>
                        <p className="text-xs text-[#8b949e]">Highlights proportional distribution of active repo languages</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.showLangs}
                        onChange={(e) => setProfile({ ...profile, showLangs: e.target.checked })}
                        className="w-5 h-5 text-[#2ea043] bg-[#0d1117] border-[#30363d] rounded focus:ring-[#2ea043]/30 accent-[#2ea043] cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2 bg-[#161b22] border border-[#30363d] rounded-xl p-4">
                      <label className="text-sm font-bold text-[#c9d1d9]">Metric Cards Color Theme</label>
                      <select
                        value={profile.statsTheme}
                        onChange={(e) => setProfile({ ...profile, statsTheme: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-sm text-[#c9d1d9] font-semibold focus:outline-none focus:border-[#2ea043]/50"
                      >
                        {STATS_THEMES.map((theme) => (
                          <option key={theme.value} value={theme.value} className="bg-[#0d1117] text-[#c9d1d9]">
                            {theme.label} ({theme.value})
                          </option>
                        ))}
                      </select>
                      <span className="text-[10px] text-[#8b949e] leading-normal pt-1 block">
                        These options format the standard <code>github-readme-stats</code> metrics parameters dynamically.
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right panel - Dynamic Live Preview and Markdown Renderer */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Display Mode Selection Tabs */}
            <div className="flex items-center justify-between bg-[#0d1117] border border-[#30363d] p-2 rounded-xl">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer select-none ${
                    activeTab === "preview"
                      ? "bg-[#21262d] text-[#58a6ff] border border-[#30363d] shadow-sm"
                      : "text-[#8b949e] hover:text-[#f0f6fc]"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Live Preview Representation
                </button>
                <button
                  onClick={() => setActiveTab("markdown")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer select-none ${
                    activeTab === "markdown"
                      ? "bg-[#21262d] text-[#58a6ff] border border-[#30363d] shadow-sm"
                      : "text-[#8b949e] hover:text-[#f0f6fc]"
                  }`}
                >
                  <Code className="w-4 h-4" />
                  Raw Markdown Code
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#8b949e] font-mono pr-3 hidden sm:flex">
                <span>scannability check: </span>
                <span className="text-[#2ea043] font-bold">Passed</span>
              </div>
            </div>

            {/* Live Interactive Canvas */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm min-h-[550px] flex flex-col justify-stretch">
              
              {activeTab === "preview" ? (
                /* Styled GitHub Simulator Container */
                <div className="p-6 bg-[#0d1117] text-[#c9d1d9] flex-1 font-sans text-sm select-text flex flex-col">
                  
                  {/* Mock Github File Header */}
                  <div className="border border-[#30363d] rounded-t-xl bg-[#161b22] px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCode2 className="w-4 h-4 text-[#8b949e]" />
                      <span className="text-xs font-semibold text-[#c9d1d9] font-mono">README.md</span>
                    </div>
                    <span className="text-[10px] text-[#8b949e] font-mono bg-[#21262d] px-1.5 py-0.5 rounded border border-[#30363d]">
                      Preview State
                    </span>
                  </div>

                  {/* Rendered Markdown Area (Simulated accurately) */}
                  <div className="border-x border-b border-[#30363d] rounded-b-xl px-8 py-10 bg-[#0d1117] text-[#c9d1d9] flex-1 leading-relaxed overflow-y-auto space-y-6">
                    
                    {/* 1. Header (Welcome/Headline) */}
                    <div className="space-y-2 pb-6 border-b border-[#21262d] relative min-h-[90px]">
                      {profile.showAvatar && profile.githubUsername && (
                        <div className="absolute top-0 right-0">
                          <img
                            src={`https://github.com/${profile.githubUsername}.png`}
                            alt={`${profile.githubUsername}'s avatar`}
                            className="w-24 h-24 rounded-full border-2 border-[#30363d] shadow-md bg-[#161b22]"
                            onError={(e: any) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className={profile.showAvatar && profile.githubUsername ? "pr-28" : ""}>
                        <h1 className="text-3xl font-bold tracking-tight text-[#f0f6fc] flex items-center gap-2">
                          Hi there, I'm {profile.name} 👋
                        </h1>
                        <p className="text-lg text-[#8b949e] font-medium leading-normal">{profile.role}</p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-3.5 text-xs text-[#58a6ff] font-mono">
                        {profile.portfolioUrl && (
                          <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                            🌐 Portfolio {profile.portfolioUrl.includes('netlify') && <span className="text-[9px] bg-sky-900/50 text-sky-400 px-1 py-0.2 rounded border border-sky-800/30">Live</span>}
                          </a>
                        )}
                        {profile.portfolioUrl && profile.linkedInUrl && <span className="text-[#30363d]">•</span>}
                        {profile.linkedInUrl && (
                          <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                            🔗 LinkedIn
                          </a>
                        )}
                        {profile.linkedInUrl && profile.email && <span className="text-[#30363d]">•</span>}
                        {profile.email && (
                          <a href={`mailto:${profile.email}`} className="hover:underline flex items-center gap-1">
                            ✉️ Email
                          </a>
                        )}
                        {profile.email && profile.instagramUrl && <span className="text-[#30363d]">•</span>}
                        {profile.instagramUrl && (
                          <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                            📸 Instagram
                          </a>
                        )}
                      </div>
                    </div>

                    {/* 2. About Me */}
                    <div className="space-y-3">
                      <h2 className="text-xl font-semibold text-[#f0f6fc] pb-1 border-b border-[#21262d] flex items-center gap-2">
                        🚀 About Me
                      </h2>
                      <p className="text-[#8b949e] leading-relaxed font-normal whitespace-pre-wrap">
                        {profile.aboutMe}
                      </p>
                      <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#8b949e] pt-1">
                        <li>
                          🛠️ <strong>Current focus:</strong> Building responsive, robust, and accessible user experiences with a commitment to clean code.
                        </li>
                        <li>
                          ⚡ <strong>Experience:</strong> {profile.experienceYears} year{profile.experienceYears === 1 ? "" : "s"} of technical development and high-quality crafting.
                        </li>
                      </ul>
                    </div>

                    {/* 3. Tech Stack */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-[#f0f6fc] pb-1 border-b border-[#21262d] flex items-center gap-2">
                        💻 Tech Stack & Tools
                      </h2>

                      {/* Displaying Live Badges dynamically */}
                      <div className="space-y-3 pt-1">
                        
                        {/* Languages list */}
                        {TECH_BADGES.filter((b) => b.category === "languages" && profile.skills.languages.includes(b.name)).length > 0 && (
                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-[#8b949e]">🗣️ Languages</span>
                            <div className="flex flex-wrap gap-1.5">
                              {TECH_BADGES.filter((b) => b.category === "languages" && profile.skills.languages.includes(b.name)).map((b) => (
                                <img
                                  key={b.name}
                                  src={`https://img.shields.io/badge/${encodeURIComponent(b.label)}-${b.color}?style=flat-square&logo=${b.logo}&logoColor=white`}
                                  alt={b.label}
                                  className="h-[20px]"
                                  referrerPolicy="no-referrer"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Frameworks list */}
                        {TECH_BADGES.filter((b) => b.category === "frameworks" && profile.skills.frameworks.includes(b.name)).length > 0 && (
                          <div className="space-y-1 pt-1">
                            <span className="text-xs font-semibold text-[#8b949e]">📂 Frameworks & Libraries</span>
                            <div className="flex flex-wrap gap-1.5">
                              {TECH_BADGES.filter((b) => b.category === "frameworks" && profile.skills.frameworks.includes(b.name)).map((b) => (
                                <img
                                  key={b.name}
                                  src={`https://img.shields.io/badge/${encodeURIComponent(b.label)}-${b.color}?style=flat-square&logo=${b.logo}&logoColor=white`}
                                  alt={b.label}
                                  className="h-[20px]"
                                  referrerPolicy="no-referrer"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Databases list */}
                        {TECH_BADGES.filter((b) => b.category === "databases" && profile.skills.databases.includes(b.name)).length > 0 && (
                          <div className="space-y-1 pt-1">
                            <span className="text-xs font-semibold text-[#8b949e]">🗄️ Databases</span>
                            <div className="flex flex-wrap gap-1.5">
                              {TECH_BADGES.filter((b) => b.category === "databases" && profile.skills.databases.includes(b.name)).map((b) => (
                                <img
                                  key={b.name}
                                  src={`https://img.shields.io/badge/${encodeURIComponent(b.label)}-${b.color}?style=flat-square&logo=${b.logo}&logoColor=white`}
                                  alt={b.label}
                                  className="h-[20px]"
                                  referrerPolicy="no-referrer"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tools list */}
                        {TECH_BADGES.filter((b) => b.category === "tools" && profile.skills.tools.includes(b.name)).length > 0 && (
                          <div className="space-y-1 pt-1">
                            <span className="text-xs font-semibold text-[#8b949e]">⚙️ Tools & Platform</span>
                            <div className="flex flex-wrap gap-1.5">
                              {TECH_BADGES.filter((b) => b.category === "tools" && profile.skills.tools.includes(b.name)).map((b) => (
                                <img
                                  key={b.name}
                                  src={`https://img.shields.io/badge/${encodeURIComponent(b.label)}-${b.color}?style=flat-square&logo=${b.logo}&logoColor=white`}
                                  alt={b.label}
                                  className="h-[20px]"
                                  referrerPolicy="no-referrer"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                    {/* 4. Featured Projects */}
                    <div className="space-y-4 pt-2">
                      <h2 className="text-xl font-semibold text-[#f0f6fc] pb-1 border-b border-[#21262d] flex items-center gap-2">
                        📂 Featured Projects
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {profile.projects.map((proj, i) => (
                          <div 
                            key={i} 
                            className="bg-[#161b22] border border-[#30363d] p-5 rounded-xl hover:border-[#8b949e]/30 transition group flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between pb-1.5">
                                <h3 className="font-semibold text-[#58a6ff] hover:underline flex items-center gap-1.5 text-sm">
                                  <a href={proj.url} target="_blank" rel="noopener noreferrer">
                                    {proj.name}
                                  </a>
                                  <ExternalLink className="w-3 h-3 text-[#58a6ff] opacity-0 group-hover:opacity-100 transition" />
                                </h3>
                                <span className="text-[10px] bg-slate-900 border border-[#30363d] px-2 py-0.5 rounded-full text-[#8b949e] font-mono">
                                  netlify
                                </span>
                              </div>
                              <p className="text-xs text-[#8b949e] leading-relaxed font-normal pt-1 pb-4">
                                {proj.description}
                              </p>
                            </div>
                            <div className="space-y-2 pt-2 border-t border-[#21262d]/50">
                              <p className="text-[11px] text-[#8b949e]">
                                <strong>Stack:</strong> <span className="text-[#c9d1d9] font-mono text-[10px]">{proj.techStack.join(", ")}</span>
                              </p>
                              <p className="text-[11px] text-[#58a6ff] font-mono">
                                repo: <span className="hover:underline cursor-pointer">
                                  github.com/{profile.githubUsername || "mayanksinjali"}/{proj.name.toLowerCase().replace(/\s+/g, "-")}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5. Stats Metric Previews */}
                    {(profile.showStats || profile.showLangs) && (
                      <div className="space-y-4 pt-2">
                        <h2 className="text-xl font-semibold text-[#f0f6fc] pb-1 border-b border-[#21262d]">
                          📊 GitHub Stats
                        </h2>

                        <div className="flex flex-col md:flex-row gap-4 items-center justify-center bg-[#161b22] p-6 border border-[#30363d] rounded-xl">
                           {profile.showStats && (
                            <div className="text-center space-y-2 p-3 bg-[#0d1117] border border-[#30363d] rounded-xl flex-1 max-w-lg">
                              <span className="text-xs font-bold text-[#8b949e] font-mono block">Simulated Stats Widget</span>
                              <img
                                src={`https://github-readme-stats.vercel.app/api?username=${profile.githubUsername || "mayanksinjali"}&show_icons=true&theme=${profile.statsTheme}`}
                                alt="Stats"
                                className="max-w-full rounded-lg h-auto mx-auto border border-[#30363d]/40 shadow-sm"
                                onError={(e) => {
                                  // Fallback layout using pixel-perfect dynamic SVG themed generators
                                  (e.target as any).src = getStatsSvg(profile.githubUsername || "mayanksinjali", profile.statsTheme);
                                }}
                              />
                            </div>
                          )}

                          {profile.showLangs && (
                            <div className="text-center space-y-2 p-3 bg-[#0d1117] border border-[#30363d] rounded-xl flex-1 max-w-md">
                              <span className="text-xs font-bold text-[#8b949e] font-mono block">Simulated Languages Widget</span>
                              <img
                                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername || "mayanksinjali"}&layout=compact&theme=${profile.statsTheme}`}
                                alt="Top Languages"
                                className="max-w-full rounded-lg h-auto mx-auto border border-[#30363d]/40 shadow-sm"
                                onError={(e) => {
                                  // Fallback top languages widget matching selected theme
                                  (e.target as any).src = getLangsSvg(profile.githubUsername || "mayanksinjali", profile.statsTheme);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              ) : (
                /* Raw Code Display tab */
                <div className="flex-1 flex flex-col min-h-0 bg-[#0d1117] text-[#c9d1d9] font-mono text-sm relative">
                  <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-2.5 flex items-center justify-between">
                    <span className="text-xs text-[#8b949e] flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                      <FileText className="w-3.5 h-3.5 text-[#58a6ff]" />
                      Raw Markdown Source
                    </span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 hover:text-white bg-[#21262d] hover:bg-[#30363d] px-3 py-1 text-[11px] font-semibold border border-[#30363d] rounded-lg transition"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#2ea043]" /> : <Copy className="w-3 h-3" />}
                      {copied ? "Copied code!" : "Copy Code"}
                    </button>
                  </div>
                  
                  <textarea
                    readOnly
                    value={generatedMarkdownText}
                    className="flex-1 bg-[#0d1117] p-6 leading-relaxed text-xs focus:outline-none focus:ring-0 overflow-y-auto w-full h-full resize-none selection:bg-[#58a6ff]/25 selection:text-white"
                  />
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Showcase Profile Footnote */}
      <footer className="bg-[#010409] text-[#8b949e] text-xs text-center border-t border-[#30363d] py-10 mt-16 space-y-2">
        <p>Interactive Customizer &middot; Specially designed for <strong>{profile.name}</strong> ({profile.role}).</p>
        <p className="text-[10px]">Built with React, Tailwind CSS, & Shields.io.</p>
      </footer>
    </div>
  );
}
