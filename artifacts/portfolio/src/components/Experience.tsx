import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";
import { goExternal } from "@/lib/utils";

const projects = ["Goqii Transcriber", "CareNexus"];

export function Experience() {
  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="orb w-[400px] h-[350px] bg-violet-600/10 top-0 left-1/4" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="section-divider mb-24" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Work <span className="text-gradient">Experience</span>
            </h2>
          </div>

          <div className="relative pl-6 border-l" style={{ borderColor: "rgba(99,102,241,0.15)" }}>
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 12px rgba(99,102,241,0.5)" }} />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.07) 0%, transparent 60%)" }} />

              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.22)" }}>
                    <Briefcase className="w-5 h-5" style={{ color: "#818cf8" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground leading-tight">Software Developer Intern</h3>
                    <button
                      onClick={() => goExternal("https://goqii.com/in-en")}
                      className="flex items-center gap-1.5 text-sm mt-1 transition-colors hover:text-indigo-300"
                      style={{ color: "#a78bfa" }}
                      data-testid="link-goqii"
                    >
                      GoQii Technologies, Mumbai
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1.5 rounded-lg whitespace-nowrap"
                  style={{ background: "rgba(99,102,241,0.12)", color: "#a78bfa", border: "1px solid rgba(99,102,241,0.2)" }}>
                  Jun 2026 – Aug 2026
                </span>
              </div>

              <p className="text-sm text-foreground/55 leading-relaxed mb-5">
                Building production healthcare software — real-time clinical transcription with
                SOAP-note and prescription generation, and a multi-tenant hospital management platform.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/40 self-center mr-1">
                  Projects
                </span>
                {projects.map((p) => (
                  <span
                    key={p}
                    className="text-sm px-3 py-1.5 rounded-lg font-medium"
                    style={{ background: "var(--s2)", border: "1px solid var(--b3)", color: "var(--t3)" }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
