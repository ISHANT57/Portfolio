import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Code2 } from "lucide-react";
import { goExternal } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  accentColor: string;
  screenshotUrl: string | null;
}

const projects: Project[] = [
  {
    id: "01",
    title: "AI-Powered Q&A for Sacred Texts",
    description: "AI Q&A system handling multiple concurrent queries using semantic search and RAG. Engineered a high-dimensional search pipeline with Mistral embeddings and Qdrant vector database for high relevance.",
    tech: ["Python", "RAG Pipeline", "Mistral", "Qdrant", "Flask", "NLP", "Pandas", "NumPy"],
    github: "https://github.com/ISHANT57/Gitabot_NYD_2026",
    demo: "https://gitabot-nyd-2026--ishantbhoyar59.replit.app/",
    accentColor: "#8b5cf6",
    screenshotUrl: "/screenshots/dharmabot.png",
  },
  {
    id: "02",
    title: "AI Resume Analyzer",
    description: "AI-powered resume analysis platform that scores resumes against job descriptions, highlights skill gaps, and gives actionable improvement suggestions using NLP.",
    tech: ["TypeScript", "React", "Node.js", "AI/NLP", "Tailwind CSS"],
    github: "https://github.com/ISHANT57/Resume-Analyzer",
    demo: "https://resume-ai-frontend-8f88.onrender.com",
    accentColor: "#10b981",
    screenshotUrl: "https://image.thum.io/get/width/640/crop/400/noanimate/https://resume-ai-frontend-8f88.onrender.com",
  },
  {
    id: "03",
    title: "ZARA Web IDE",
    description: "Browser-based IDE for the ZARA scripting language with syntax highlighting, real-time code execution, and an interactive output console — built in TypeScript.",
    tech: ["TypeScript", "React", "Code Editor", "ZARA", "Vite"],
    github: "https://github.com/ISHANT57/Zara-Interpreter-IDE",
    demo: "https://zara-interpreter-ide.onrender.com/index.html",
    accentColor: "#f59e0b",
    screenshotUrl: "/screenshots/zara-ide.png",
  },
  {
    id: "05",
    title: "LeetCode Student Progress Tracker",
    description: "Full-stack web app tracking 100+ students with real-time performance analytics, interactive dashboards with heatmaps and charts, powered by GraphQL APIs.",
    tech: ["React.js", "Node.js", "PostgreSQL", "Chart.js", "Tailwind CSS", "GraphQL"],
    github: "https://github.com/ISHANT57/LEETCODE-TRACKER",
    demo: "https://leetpeer-updated-ishant-1.onrender.com/auth",
    accentColor: "#3b82f6",
    screenshotUrl: "/screenshots/leetcode-tracker.png",
  },
  {
    id: "06",
    title: "AQI Website Analysis Platform",
    description: "Real-time AQI monitoring platform with historical trend analysis using interactive maps and charts. Enables comparative analysis across cities with dynamic health insights.",
    tech: ["JavaScript", "Flask", "HTML/CSS", "Chart.js", "Python", "Pandas"],
    github: "https://github.com/ISHANT57/AQI-WEBSITE-ANALYSIS",
    demo: "https://aqi-website-analysis-1.onrender.com/",
    accentColor: "#0ea5e9",
    screenshotUrl: "/screenshots/aqi.png",
  },
  {
    id: "07",
    title: "GitHub Profile Tracker",
    description: "Developer analytics dashboard visualising GitHub profile stats — repositories, contributions, top languages, and activity trends — powered by the GitHub REST API.",
    tech: ["React", "TypeScript", "GitHub API", "Chart.js", "Tailwind CSS"],
    github: "https://github.com/ISHANT57/Git-Tracker-",
    demo: "https://sitare-github-tracker.onrender.com",
    accentColor: "#f97316",
    screenshotUrl: "/screenshots/git-tracker.png",
  },
];

const MAX_TAGS = 4;

function ProjectThumbnail({ project }: { project: Project }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (project.screenshotUrl && !imgFailed) {
    return (
      <img
        src={project.screenshotUrl}
        alt={project.title}
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        onError={() => setImgFailed(true)}
        loading="lazy"
      />
    );
  }

  /* Gradient placeholder for projects with no live demo */
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4 relative overflow-hidden"
      style={{ background: `linear-gradient(145deg, ${project.accentColor}14 0%, #07071200 80%)` }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${project.accentColor}08 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}08 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Big number */}
      <span
        className="font-mono font-black select-none"
        style={{ fontSize: "6rem", lineHeight: 1, color: `${project.accentColor}18` }}
      >
        {project.id}
      </span>
      <span
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: `${project.accentColor}55` }}
      >
        No Live Preview
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const visibleTech = project.tech.slice(0, MAX_TAGS);
  const extraCount = project.tech.length - MAX_TAGS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(12, 12, 22, 0.85)",
        border: "1px solid rgba(255,255,255,0.065)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${project.accentColor}40`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 24px 60px ${project.accentColor}18, 0 4px 20px rgba(0,0,0,0.5)`;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.065)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "";
      }}
      data-testid={`project-card-${project.id}`}
    >
      {/* Screenshot area */}
      <div className="relative overflow-hidden" style={{ height: "220px" }}>
        {/* macOS-style top bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 px-3 py-2"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <ProjectThumbnail project={project} />
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(12,12,22,0.9), transparent)" }} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Title */}
        <h3
          className="text-base font-bold leading-snug transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.92)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>
          {project.description.length > 130
            ? project.description.slice(0, 130) + "…"
            : project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {visibleTech.map((tech, i) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg"
              style={i === 0
                ? { background: `${project.accentColor}22`, color: project.accentColor, border: `1px solid ${project.accentColor}40` }
                : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              {tech}
            </span>
          ))}
          {extraCount > 0 && (
            <span
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg"
              style={{ background: `${project.accentColor}12`, color: `${project.accentColor}90`, border: `1px solid ${project.accentColor}20` }}
            >
              +{extraCount}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          {project.demo ? (
            <button
              onClick={() => goExternal(project.demo!)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.85)",
              }}
              data-testid={`link-project-demo-${project.id}`}
            >
              <Globe className="w-3.5 h-3.5" />
              LIVE DEMO
            </button>
          ) : (
            <div
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              <Globe className="w-3.5 h-3.5" />
              NO DEMO
            </div>
          )}
          <button
            onClick={() => goExternal(project.github)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
            }}
            data-testid={`link-project-github-${project.id}`}
          >
            <Code2 className="w-3.5 h-3.5" />
            SOURCE
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="orb w-[500px] h-[400px] bg-violet-600/12 top-1/4 -left-32" />
      <div className="orb w-[400px] h-[300px] bg-blue-600/10 bottom-0 right-0" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="section-divider mb-24" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mt-2">
            Featured <span className="text-gradient">Creations</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mb-16 text-sm max-w-lg mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          A selection of high-impact digital solutions, built with focus on scalability,
          performance, and exceptional user experience.
        </motion.p>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
