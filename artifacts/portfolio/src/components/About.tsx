import { motion } from "framer-motion";
import { TerminalPanel } from "./TerminalPanel";
import { MapPin, Calendar, Star } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Section lighting */}
      <div className="orb w-[400px] h-[400px] bg-blue-600/10 top-0 right-0" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="section-divider mb-24" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
              The dev behind{" "}
              <span className="text-gradient">the code</span>
            </h2>

            <p className="text-foreground/60 leading-relaxed mb-8 text-base md:text-lg">
              I'm a Computer Science undergraduate at Sitare University, driven by a passion for building robust, scalable applications and integrating cutting-edge AI technologies. From designing RAG pipelines to building real-time analytics dashboards, I turn complex problems into clean, working software.
            </p>

            {/* Education card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-2xl p-6 mb-4 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                style={{ background: "linear-gradient(180deg, #6366f1, #8b5cf6, #a855f7)" }} />
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-foreground">B.Tech Computer Science</h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(99,102,241,0.12)", color: "#a78bfa", border: "1px solid rgba(99,102,241,0.2)" }}>
                  2023 → 2027
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="flex items-center gap-2 text-sm text-foreground/60">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  Sitare University with SRMU, Lucknow, India
                </p>
                <p className="flex items-center gap-2 text-sm text-foreground/60">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  Expected completion May 2027
                </p>
                <p className="text-sm font-mono mt-1 font-semibold" style={{ color: "#a78bfa" }}>
                  GPA: 7.94 / 10
                </p>
              </div>
            </motion.div>

            {/* Scholarship card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden"
              style={{ borderColor: "rgba(234,179,8,0.15)" }}
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)" }} />
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(234,179,8,0.12)", border: "1px solid rgba(234,179,8,0.2)" }}>
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1">100% B.Tech CS Scholarship</h3>
                  <p className="text-sm text-foreground/60">
                    Awarded by the <span className="text-yellow-400 font-medium">Sitare Foundation</span> for academic excellence and potential in computer science.
                  </p>
                  <p className="text-xs font-mono text-foreground/40 mt-1.5">Aug 2024 – Present</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - JSON Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute inset-0 blur-3xl -z-10 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />

            <TerminalPanel title="ishant@portfolio:~$ cat about.json">
              <pre className="text-[13px] leading-relaxed overflow-x-auto">
                <code>
                  <span style={{ color: "var(--t5)" }}>{"{"}</span>{"\n"}
                  {"  "}<span style={{ color: "#60a5fa" }}>"name"</span><span style={{ color: "var(--t5)" }}>: </span><span style={{ color: "#4ade80" }}>"Ishant Bhoyar"</span><span style={{ color: "var(--t5)" }}>,</span>{"\n"}
                  {"  "}<span style={{ color: "#60a5fa" }}>"role"</span><span style={{ color: "var(--t5)" }}>: </span><span style={{ color: "#4ade80" }}>"Full Stack Developer & AI Engineer"</span><span style={{ color: "var(--t5)" }}>,</span>{"\n"}
                  {"  "}<span style={{ color: "#60a5fa" }}>"location"</span><span style={{ color: "var(--t5)" }}>: </span><span style={{ color: "#4ade80" }}>"Lucknow, India"</span><span style={{ color: "var(--t5)" }}>,</span>{"\n"}
                  {"  "}<span style={{ color: "#60a5fa" }}>"education"</span><span style={{ color: "var(--t5)" }}>: {"{"}</span>{"\n"}
                  {"    "}<span style={{ color: "#60a5fa" }}>"degree"</span><span style={{ color: "var(--t5)" }}>: </span><span style={{ color: "#4ade80" }}>"B.Tech CS"</span><span style={{ color: "var(--t5)" }}>,</span>{"\n"}
                  {"    "}<span style={{ color: "#60a5fa" }}>"university"</span><span style={{ color: "var(--t5)" }}>: </span><span style={{ color: "#4ade80" }}>"Sitare University with SRMU"</span><span style={{ color: "var(--t5)" }}>,</span>{"\n"}
                  {"    "}<span style={{ color: "#60a5fa" }}>"gpa"</span><span style={{ color: "var(--t5)" }}>: </span><span style={{ color: "#c084fc" }}>7.94</span><span style={{ color: "var(--t5)" }}>,</span>{"\n"}
                  {"    "}<span style={{ color: "#60a5fa" }}>"graduation"</span><span style={{ color: "var(--t5)" }}>: </span><span style={{ color: "#4ade80" }}>"May 2027"</span>{"\n"}
                  {"  "}<span style={{ color: "var(--t5)" }}>{"}"}</span><span style={{ color: "var(--t5)" }}>,</span>{"\n"}
                  {"  "}<span style={{ color: "#60a5fa" }}>"scholarship"</span><span style={{ color: "var(--t5)" }}>: </span><span style={{ color: "#c084fc" }}>true</span><span style={{ color: "var(--t5)" }}>,</span>{"\n"}
                  {"  "}<span style={{ color: "#60a5fa" }}>"specializations"</span><span style={{ color: "var(--t5)" }}>: [</span>{"\n"}
                  {"    "}<span style={{ color: "#4ade80" }}>"RAG Pipelines"</span><span style={{ color: "var(--t5)" }}>,</span>{"\n"}
                  {"    "}<span style={{ color: "#4ade80" }}>"NLP & Vector Databases"</span><span style={{ color: "var(--t5)" }}>,</span>{"\n"}
                  {"    "}<span style={{ color: "#4ade80" }}>"Full Stack Development"</span><span style={{ color: "var(--t5)" }}>,</span>{"\n"}
                  {"    "}<span style={{ color: "#4ade80" }}>"AI-driven Health Tech"</span>{"\n"}
                  {"  "}<span style={{ color: "var(--t5)" }}>],</span>{"\n"}
                  {"  "}<span style={{ color: "#60a5fa" }}>"open_to_work"</span><span style={{ color: "var(--t5)" }}>: </span><span style={{ color: "#c084fc" }}>true</span>{"\n"}
                  <span style={{ color: "var(--t5)" }}>{"}"}</span>{"\n"}
                  <span className="inline-block w-2 h-4 animate-pulse" style={{ background: "#a78bfa", marginTop: "4px" }} />
                </code>
              </pre>
            </TerminalPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
