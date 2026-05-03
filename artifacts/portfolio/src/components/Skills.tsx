import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiPython, SiJavascript, SiTypescript,
  SiReact, SiNodedotjs, SiFlask,
  SiMysql, SiMongodb, SiPostgresql, SiGraphql,
  SiGit, SiGithub, SiTailwindcss, SiPandas, SiNumpy,
  SiHtml5, SiCss, SiExpress, SiHuggingface, SiOpenai
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

type IconType = React.ComponentType<{ style?: React.CSSProperties; className?: string }>;
type Level = "Expert" | "Advanced" | "Intermediate";

interface Skill {
  name: string;
  icon: IconType | null;
  abbr?: string;
  color: string;
  cat: string;
  level: Level;
  context: string;
}

const LEVEL_COLOR: Record<Level, string> = {
  Expert: "#4ade80",
  Advanced: "#a78bfa",
  Intermediate: "#60a5fa",
};

const TABS = [
  { id: "all",       label: "All" },
  { id: "frontend",  label: "Frontend" },
  { id: "backend",   label: "Backend" },
  { id: "languages", label: "Languages" },
  { id: "databases", label: "Databases" },
  { id: "tools",     label: "Tools & AI" },
];

const SKILLS: Skill[] = [
  { name: "Python",        icon: SiPython,       color: "#3b82f6",  cat: "languages", level: "Advanced",      context: "Primary language for AI/ML & backend APIs" },
  { name: "JavaScript",    icon: SiJavascript,   color: "#eab308",  cat: "languages", level: "Advanced",      context: "Full-stack development & browser scripting" },
  { name: "TypeScript",    icon: SiTypescript,   color: "#60a5fa",  cat: "languages", level: "Intermediate",  context: "Type-safe React & Node.js applications" },
  { name: "Java",          icon: FaJava,         color: "#f97316",  cat: "languages", level: "Intermediate",  context: "OOP, DSA & custom interpreter design" },
  { name: "React.js",      icon: SiReact,        color: "#38bdf8",  cat: "frontend",  level: "Advanced",      context: "SPAs, dashboards & real-time UIs" },
  { name: "Tailwind CSS",  icon: SiTailwindcss,  color: "#38bdf8",  cat: "frontend",  level: "Advanced",      context: "Utility-first styling across all projects" },
  { name: "HTML5",         icon: SiHtml5,        color: "#f97316",  cat: "frontend",  level: "Expert",        context: "Semantic markup & web accessibility" },
  { name: "CSS3",          icon: SiCss,          color: "#60a5fa",  cat: "frontend",  level: "Expert",        context: "Animations, layouts & responsive design" },
  { name: "Node.js",       icon: SiNodedotjs,    color: "#4ade80",  cat: "backend",   level: "Intermediate",  context: "REST APIs & real-time server applications" },
  { name: "Flask",         icon: SiFlask,        color: "#e2e8f0",  cat: "backend",   level: "Intermediate",  context: "Python web APIs & ML model backends" },
  { name: "GraphQL",       icon: SiGraphql,      color: "#e879f9",  cat: "backend",   level: "Intermediate",  context: "Used in LeetCode Tracker for efficient queries" },
  { name: "Express",       icon: SiExpress,      color: "#6b7280",  cat: "backend",   level: "Intermediate",  context: "Node.js middleware & routing layer" },
  { name: "PostgreSQL",    icon: SiPostgresql,   color: "#60a5fa",  cat: "databases", level: "Intermediate",  context: "Primary relational DB with complex queries" },
  { name: "MongoDB",       icon: SiMongodb,      color: "#4ade80",  cat: "databases", level: "Intermediate",  context: "Document store for Node.js applications" },
  { name: "MySQL",         icon: SiMysql,        color: "#38bdf8",  cat: "databases", level: "Intermediate",  context: "Schema design & query optimization" },
  { name: "Qdrant",        icon: null, abbr: "QD", color: "#a78bfa", cat: "databases", level: "Intermediate", context: "Vector DB powering RAG semantic search" },
  { name: "Git",           icon: SiGit,          color: "#f97316",  cat: "tools",     level: "Advanced",      context: "Version control & team collaboration" },
  { name: "GitHub",        icon: SiGithub,       color: "#c4b5fd",  cat: "tools",     level: "Advanced",      context: "Open source, CI/CD & code reviews" },
  { name: "Pandas",        icon: SiPandas,       color: "#60a5fa",  cat: "tools",     level: "Intermediate",  context: "Data wrangling & analysis pipelines" },
  { name: "NumPy",         icon: SiNumpy,        color: "#60a5fa",  cat: "tools",     level: "Intermediate",  context: "Numerical computing & matrix ops" },
  { name: "RAG Pipelines", icon: SiOpenai,       color: "#c084fc",  cat: "tools",     level: "Intermediate",  context: "AI Q&A with Mistral embeddings + Qdrant" },
  { name: "NLP",           icon: SiHuggingface,  color: "#f59e0b",  cat: "tools",     level: "Intermediate",  context: "Text processing, tokenization & embeddings" },
  { name: "BeautifulSoup", icon: null, abbr: "BS", color: "#4ade80", cat: "tools",    level: "Intermediate",  context: "HTML parsing & web scraping" },
];

const ROW1 = SKILLS.filter(s => s.cat === "languages" || s.cat === "frontend");
const ROW2 = SKILLS.filter(s => s.cat === "backend"   || s.cat === "databases");
const ROW3 = SKILLS.filter(s => s.cat === "tools");

function catLabel(cat: string) {
  if (cat === "tools") return "Tools & AI";
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

function SkillPill({ skill, isGrid = false }: { skill: Skill; isGrid?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <div className="relative group">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-44 pointer-events-none"
          >
            <div
              className="rounded-xl px-3 py-2.5 text-center"
              style={{
                background: "rgba(10,10,20,0.92)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: `1px solid ${skill.color}30`,
                boxShadow: `0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px ${skill.color}18`,
              }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: LEVEL_COLOR[skill.level] }} />
                <span className="text-[10px] font-semibold font-mono" style={{ color: LEVEL_COLOR[skill.level] }}>
                  {skill.level}
                </span>
              </div>
              <p className="text-[10px] leading-snug" style={{ color: "rgba(255,255,255,0.55)" }}>
                {skill.context}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-2.5 h-2.5 rotate-45 -mt-1.5"
                style={{ background: "rgba(10,10,20,0.92)", border: `1px solid ${skill.color}30`, clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={`inline-flex items-center gap-3 cursor-default select-none rounded-2xl ${isGrid ? "px-5 py-3.5" : "px-4 py-3 mx-2"}`}
        style={{
          minWidth: isGrid ? 170 : 160,
          background: hovered ? `${skill.color}0d` : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? skill.color + "50" : "rgba(255,255,255,0.07)"}`,
          boxShadow: hovered
            ? `0 0 28px ${skill.color}20, inset 0 1px 0 rgba(255,255,255,0.06)`
            : "none",
          transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Rotating icon box */}
        <motion.div
          animate={{ rotate: hovered ? 360 : 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{
            width: 38, height: 38,
            background: hovered ? `${skill.color}1a` : `${skill.color}10`,
            border: `1px solid ${skill.color}28`,
          }}
        >
          {Icon ? (
            <Icon style={{ width: 20, height: 20, color: skill.color, filter: hovered ? `drop-shadow(0 0 5px ${skill.color}90)` : "none" }} />
          ) : (
            <span className="text-[11px] font-bold font-mono" style={{ color: skill.color }}>{skill.abbr}</span>
          )}
        </motion.div>

        {/* Text */}
        <div className="min-w-0">
          <p
            className="text-sm font-semibold leading-tight truncate"
            style={{ color: hovered ? skill.color : "rgba(255,255,255,0.85)", transition: "color 0.2s" }}
          >
            {skill.name}
          </p>
          <p className="text-[10px] font-mono uppercase tracking-widest mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
            {catLabel(skill.cat)}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function MarqueeRow({ skills, direction, speed = 35 }: { skills: Skill[]; direction: "left" | "right"; speed?: number }) {
  const [paused, setPaused] = useState(false);
  const doubled = [...skills, ...skills];

  return (
    <div
      className="relative overflow-hidden w-full py-1"
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex"
        style={{
          width: "max-content",
          animation: `marquee-${direction} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? SKILLS
    : SKILLS.filter(s => s.cat === activeTab);

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="orb w-[600px] h-[500px] bg-purple-600/8 top-1/2 -translate-y-1/2 -right-60 animate-pulse-glow" />
      <div className="orb w-[400px] h-[300px] bg-blue-600/6 top-0 -left-32" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="section-divider mb-24" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-foreground/50 text-sm max-w-md mx-auto">
            Hover any skill to see my experience level and how I've used it
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-5 py-2 rounded-xl text-sm font-medium font-mono transition-all duration-200 overflow-hidden"
                style={{
                  background: isActive ? "rgba(99,102,241,0.15)" : "var(--s1)",
                  border: `1px solid ${isActive ? "rgba(99,102,241,0.45)" : "var(--b3)"}`,
                  color: isActive ? "#a78bfa" : "var(--t3)",
                  boxShadow: isActive ? "0 0 16px rgba(99,102,241,0.15)" : "none",
                }}
                data-testid={`tab-skills-${tab.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="skill-tab-bg"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "rgba(99,102,241,0.08)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content: Marquee for All, Grid for filtered */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "all" ? (
              <div className="space-y-5">
                <MarqueeRow skills={ROW1} direction="left"  speed={40} />
                <MarqueeRow skills={ROW2} direction="right" speed={50} />
                <MarqueeRow skills={ROW3} direction="left"  speed={32} />
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                {filtered.map(skill => (
                  <SkillPill key={skill.name} skill={skill} isGrid />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-6 mt-14"
        >
          {(Object.entries(LEVEL_COLOR) as [Level, string][]).map(([level, color]) => (
            <div key={level} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-xs font-mono" style={{ color: "var(--t4)" }}>{level}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
