import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Send, Linkedin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { goExternal } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TerminalPanel } from "./TerminalPanel";
import { ParticlesBackground } from "./ParticlesBackground";

function AnimatedCounter({
  to,
  decimals = 0,
  suffix = "",
  duration = 1400,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || !ref.current) return;
    const el = ref.current;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (eased * to).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, to, decimals, suffix, duration]);

  return (
    <span ref={ref}>
      {(0).toFixed(decimals)}{suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Particle canvas */}
      <ParticlesBackground />

      {/* Ambient lighting orbs */}
      <div className="orb w-[700px] h-[500px] bg-violet-600/20 -top-32 -left-48 animate-float" />
      <div className="orb w-[500px] h-[400px] bg-blue-600/15 top-1/2 -right-32 animate-float-delay" />
      <div className="orb w-[300px] h-[300px] bg-purple-500/10 bottom-0 left-1/3 animate-float" />

      {/* Spotlight from top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)"
        }}
      />

      <div className="container mx-auto px-4 md:px-8 z-10 relative" style={{ position: "relative", zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-10 items-center">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-start gap-7"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-sm font-medium"
              style={{
                background: "rgba(34, 197, 94, 0.08)",
                borderColor: "rgba(34, 197, 94, 0.25)",
                color: "#4ade80"
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              Available for opportunities
            </motion.div>

            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
                <span className="text-foreground/90">Hi, I'm</span>
                <br />
                <span className="text-gradient">Ishant Bhoyar</span>
              </h1>
              <p className="text-lg md:text-xl font-mono text-muted-foreground mt-3 tracking-tight">
                Full Stack Developer | AI Engineer
              </p>
            </div>

            <p className="text-base md:text-lg text-foreground/60 max-w-lg leading-relaxed">
              CS undergrad building scalable full-stack systems and AI-powered applications — from RAG pipelines to real-time analytics dashboards. Passionate about AI-driven health-tech.
            </p>

            <div className="flex flex-wrap gap-3 mt-1">
              <Button
                size="lg"
                className="relative overflow-hidden font-semibold px-6 gap-2 glow-primary glow-primary-hover transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6, #7c3aed)",
                  color: "white",
                  border: "none"
                }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="btn-view-work"
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </Button>
              {/* <a
                href="https://docs.google.com/document/d/1UC69ZunmXNMoESPhePTrICZBVe1KmtS4qBLIIpZbuiE/export?format=pdf"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => { e.preventDefault(); goExternal("https://docs.google.com/document/d/1UC69ZunmXNMoESPhePTrICZBVe1KmtS4qBLIIpZbuiE/export?format=pdf"); }}
                data-testid="btn-download-resume"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="font-semibold px-6 gap-2 transition-all duration-300"
                  style={{ background: "var(--s2)", borderColor: "var(--b1)", color: "var(--t2)" }}
                >
                  <Download className="w-4 h-4" /> Download Resume
                </Button>
              </a> */}
              <a
  href="https://drive.google.com/uc?export=download&id=1OeppecoYMGZJqJGB0ByMHyIjXhSnUK9G"
  target="_blank"
  rel="noreferrer"
  onClick={(e) => {
    e.preventDefault();
    goExternal("https://drive.google.com/uc?export=download&id=1OeppecoYMGZJqJGB0ByMHyIjXhSnUK9G");
  }}
  data-testid="btn-download-resume"
>
  <Button
    variant="outline"
    size="lg"
    className="font-semibold px-6 gap-2 transition-all duration-300"
    style={{
      background: "var(--s2)",
      borderColor: "var(--b1)",
      color: "var(--t2)"
    }}
  >
    <Download className="w-4 h-4" /> Download Resume
  </Button>
</a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-1">
              <a
                href="https://github.com/ISHANT57"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => { e.preventDefault(); goExternal("https://github.com/ISHANT57"); }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-github"
              >
                <SiGithub className="w-4 h-4" />
                GitHub
              </a>
              <span className="w-1 h-1 rounded-full" style={{ background: "var(--t6)" }} />
              <a
                href="https://www.linkedin.com/in/ishant-bhoyar-555413214/"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => { e.preventDefault(); goExternal("https://www.linkedin.com/in/ishant-bhoyar-555413214/"); }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mt-6 pt-6 w-full border-t" style={{ borderColor: "var(--b4)" }}>
              {[
                { label: "PROJECTS", counter: <AnimatedCounter to={4} /> },
                { label: "YEARS EXP.", counter: <AnimatedCounter to={2} suffix="+" /> },
                { label: "GPA", counter: <AnimatedCounter to={7.94} decimals={2} /> },
                { label: "SCHOLARSHIP", counter: <AnimatedCounter to={100} suffix="%" /> },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex flex-col gap-1"
                >
                  <span className="text-2xl md:text-3xl font-extrabold text-gradient">{stat.counter}</span>
                  <span className="text-[10px] font-mono text-muted-foreground tracking-widest">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Terminal Chat */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="w-full max-w-lg mx-auto lg:ml-auto relative"
          >
            {/* Glow behind terminal */}
            <div
              className="absolute inset-0 blur-3xl pointer-events-none -z-10 rounded-3xl"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.1) 50%, transparent 100%)" }}
            />
            <TerminalPanel title="ishant-ai — chat" className="h-[460px] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-5 mb-4">
                {/* AI message */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white shrink-0 mt-0.5 font-bold"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  >
                    AI
                  </div>
                  <div className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground/90 leading-relaxed max-w-[85%]"
                    style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
                  >
                    Hi! I'm Ishant's AI assistant. Ask me anything about his skills, projects, or experience.
                  </div>
                </div>

                {/* User question */}
                <div className="flex justify-end">
                  <div className="rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-foreground/80 max-w-[75%]"
                    style={{ background: "var(--s1)", border: "1px solid var(--b2)" }}
                  >
                    What are his strongest skills?
                  </div>
                </div>

                {/* AI response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white shrink-0 mt-0.5 font-bold"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  >
                    AI
                  </div>
                  <div className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground/90 leading-relaxed max-w-[85%]"
                    style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
                  >
                    Ishant specializes in{" "}
                    <span style={{ color: "#a78bfa" }} className="font-medium">RAG Pipelines</span>,{" "}
                    <span style={{ color: "#818cf8" }} className="font-medium">Full Stack Dev</span>, and{" "}
                    <span style={{ color: "#a78bfa" }} className="font-medium">AI Systems</span>. Python, React &amp; Node.js are his core stack.
                  </div>
                </div>

                {/* Quick chips */}
                <div className="flex flex-wrap gap-2">
                  {["Projects", "Skills", "Contact", "About me"].map((chip) => (
                    <button
                      key={chip}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: "rgba(99,102,241,0.08)",
                        border: "1px solid rgba(99,102,241,0.2)",
                        color: "rgba(167,139,250,0.9)"
                      }}
                      data-testid={`btn-chat-chip-${chip.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="mt-auto relative">
                <input
                  type="text"
                  placeholder="Ask anything about Ishant..."
                  className="w-full rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none transition-all duration-200 font-mono placeholder:text-muted-foreground/50"
                  style={{
                    background: "var(--inp-bg)",
                    border: "1px solid var(--b2)",
                    color: "var(--inp-fg)"
                  }}
                  readOnly
                  data-testid="input-chat"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  data-testid="btn-chat-send"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </TerminalPanel>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
