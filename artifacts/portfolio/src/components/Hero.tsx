import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Linkedin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { goExternal } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
              CS undergrad building scalable full-stack systems and AI-powered applications — autonomous agents, hybrid RAG platforms, and real-time clinical tools. Next.js, Python & production LLM systems.
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
            <div className="grid grid-cols-3 gap-6 mt-6 pt-6 w-full border-t" style={{ borderColor: "var(--b4)" }}>
              {[
                { label: "PROJECTS", counter: <AnimatedCounter to={10} suffix="+" /> },
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

          {/* Right Column - Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="w-full flex justify-center lg:justify-end order-last"
          >
            <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px] animate-float">
              {/* Ambient glow behind portrait */}
              <div
                className="absolute inset-0 blur-3xl pointer-events-none -z-10 scale-125 rounded-full"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.22) 45%, transparent 72%)" }}
              />
              {/* Gradient ring */}
              <div
                className="w-full h-full rounded-full p-[4px]"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.3)",
                }}
              >
                <img
                  src="/profile.jpeg"
                  alt="Ishant Bhoyar"
                  className="w-full h-full rounded-full object-cover object-[center_12%]"
                  style={{ border: "4px solid hsl(237 60% 3%)" }}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
