import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ArrowRight, Copy, Moon, Sun,
  ExternalLink, Code, User, Cpu, Terminal, Mail, Linkedin
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { goExternal } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type IconComp = React.ComponentType<{ className?: string }>;

interface Cmd {
  id: string;
  label: string;
  description?: string;
  icon: IconComp;
  group: string;
  action: () => void;
  keywords?: string[];
}

const GithubIcon: IconComp = ({ className }) => <SiGithub className={className} />;
const LinkedinIcon: IconComp = ({ className }) => <Linkedin className={className} />;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const close = useCallback(() => setOpen(false), []);

  const scrollTo = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      close();
    },
    [close]
  );

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("ishantbhoyar59@gmail.com").then(() => {
      toast({ title: "Email copied!", description: "ishantbhoyar59@gmail.com" });
    });
    close();
  }, [close, toast]);

  const toggleTheme = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
    close();
  }, [close]);

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const commands: Cmd[] = [
    { id: "nav-home", label: "Go to Top", icon: Terminal, group: "Navigate", action: () => scrollTo("home"), keywords: ["hero", "top"] },
    { id: "nav-about", label: "About", icon: User, group: "Navigate", action: () => scrollTo("about") },
    { id: "nav-skills", label: "Skills", icon: Code, group: "Navigate", action: () => scrollTo("skills") },
    { id: "nav-projects", label: "Projects", icon: ExternalLink, group: "Navigate", action: () => scrollTo("projects") },
    { id: "nav-github", label: "GitHub Repos", icon: GithubIcon, group: "Navigate", action: () => scrollTo("github") },
    { id: "nav-leetcode", label: "LeetCode Stats", icon: Cpu, group: "Navigate", action: () => scrollTo("leetcode") },
    { id: "nav-contact", label: "Contact", icon: Mail, group: "Navigate", action: () => scrollTo("contact") },
    { id: "copy-email", label: "Copy Email Address", description: "ishantbhoyar59@gmail.com", icon: Copy, group: "Actions", action: copyEmail },
    {
      id: "toggle-theme",
      label: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
      description: "Toggle colour scheme",
      icon: isDark ? Sun : Moon,
      group: "Actions",
      action: toggleTheme
    },
    {
      id: "open-github", label: "Open GitHub Profile", icon: GithubIcon, group: "Social",
      action: () => { goExternal("https://github.com/ISHANT57"); close(); }
    },
    {
      id: "open-linkedin", label: "Open LinkedIn", icon: LinkedinIcon, group: "Social",
      action: () => { goExternal("https://www.linkedin.com/in/ishant-bhoyar-555413214/"); close(); }
    },
  ];

  const filtered = query.trim()
    ? commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description?.toLowerCase().includes(query.toLowerCase()) ||
        c.group.toLowerCase().includes(query.toLowerCase()) ||
        c.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase()))
      )
    : commands;

  const groups = filtered.reduce<Record<string, Cmd[]>>((acc, cmd) => {
    (acc[cmd.group] ||= []).push(cmd);
    return acc;
  }, {});

  const flat = Object.values(groups).flat();

  useEffect(() => { setSelected(0); }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(p => !p);
      }
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [close]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, flat.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    else if (e.key === "Enter" && flat[selected]) flat[selected].action();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] flex items-start justify-center pt-[18vh] px-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
          onClick={e => { if (e.target === e.currentTarget) close(); }}
        >
          <motion.div
            key="cmd-box"
            initial={{ opacity: 0, scale: 0.96, y: -14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="w-full max-w-xl rounded-2xl overflow-hidden"
            style={{
              background: "var(--menu-bg)",
              border: "1px solid var(--b2)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.06)"
            }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "var(--b3)" }}>
              <Search className="w-4 h-4 shrink-0" style={{ color: "var(--t4)" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search commands..."
                className="flex-1 bg-transparent outline-none text-sm font-mono"
                style={{ color: "var(--t1)" }}
              />
              <kbd
                className="px-2 py-0.5 rounded text-[10px] font-mono"
                style={{ background: "var(--s2)", color: "var(--t5)", border: "1px solid var(--b3)" }}
              >
                ESC
              </kbd>
            </div>

            <div className="max-h-[360px] overflow-y-auto py-2">
              {flat.length === 0 ? (
                <p className="text-center py-10 text-sm font-mono" style={{ color: "var(--t5)" }}>
                  No results for "{query}"
                </p>
              ) : (
                Object.entries(groups).map(([group, cmds]) => (
                  <div key={group}>
                    <p
                      className="px-4 pt-3 pb-1 text-[10px] font-mono tracking-widest uppercase"
                      style={{ color: "var(--t5)" }}
                    >
                      {group}
                    </p>
                    {cmds.map(cmd => {
                      const idx = flat.indexOf(cmd);
                      const isActive = idx === selected;
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelected(idx)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                          style={{ background: isActive ? "rgba(99,102,241,0.1)" : "transparent" }}
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              background: isActive ? "rgba(99,102,241,0.22)" : "var(--s2)",
                              color: isActive ? "#a78bfa" : "var(--t4)"
                            }}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-sm font-medium"
                              style={{ color: isActive ? "var(--t1)" : "var(--t2)" }}
                            >
                              {cmd.label}
                            </p>
                            {cmd.description && (
                              <p className="text-xs truncate mt-0.5" style={{ color: "var(--t5)" }}>
                                {cmd.description}
                              </p>
                            )}
                          </div>
                          {isActive && (
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--t4)" }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div
              className="flex items-center gap-5 px-5 py-2.5 border-t text-[10px] font-mono"
              style={{ borderColor: "var(--b4)", color: "var(--t5)" }}
            >
              <span>
                <kbd className="px-1 mr-1 rounded" style={{ background: "var(--s2)" }}>↑↓</kbd>
                navigate
              </span>
              <span>
                <kbd className="px-1 mr-1 rounded" style={{ background: "var(--s2)" }}>↵</kbd>
                select
              </span>
              <span className="ml-auto">
                <kbd className="px-1 mr-1 rounded" style={{ background: "var(--s2)" }}>⌘K</kbd>
                toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
