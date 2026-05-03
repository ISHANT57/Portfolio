import { motion } from "framer-motion";
import { Trophy, GraduationCap, BookOpen, Award } from "lucide-react";

const coursework = [
  "Data Structures & Algorithms",
  "Machine Learning",
  "Database Management Systems",
  "Web Development",
  "Artificial Intelligence"
];

export function Achievements() {
  return (
    <section id="achievements" className="py-28 relative overflow-hidden">
      <div className="orb w-[400px] h-[350px] bg-yellow-500/8 top-0 right-1/4" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="section-divider mb-24" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Milestones <span className="text-gradient">& Education</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education timeline */}
            <div>
              <h3 className="flex items-center gap-2.5 text-base font-semibold mb-8 text-foreground/80">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}>
                  <GraduationCap className="w-4 h-4" style={{ color: "#818cf8" }} />
                </div>
                Education
              </h3>

              <div className="relative pl-6 border-l" style={{ borderColor: "rgba(99,102,241,0.15)" }}>
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 12px rgba(99,102,241,0.5)" }} />

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 60%)" }} />

                  <span className="text-xs font-mono mb-3 block" style={{ color: "#818cf8" }}>Aug 2023 – May 2027</span>
                  <h4 className="font-bold text-lg text-foreground mb-1">B.Tech Computer Science</h4>
                  <p className="text-sm text-foreground/55 mb-4">Sitare University with SRMU, Lucknow, India</p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono px-3 py-1.5 rounded-lg font-semibold"
                      style={{ background: "rgba(99,102,241,0.12)", color: "#a78bfa", border: "1px solid rgba(99,102,241,0.2)" }}>
                      GPA: 7.94
                    </span>
                    <span className="text-xs text-foreground/40 font-mono">/ 10.0</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Awards & Courses */}
            <div className="space-y-7">
              {/* Scholarship */}
              <div>
                <h3 className="flex items-center gap-2.5 text-base font-semibold mb-6 text-foreground/80">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(234,179,8,0.12)", border: "1px solid rgba(234,179,8,0.22)" }}>
                    <Trophy className="w-4 h-4 text-yellow-400" />
                  </div>
                  Awards
                </h3>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="glass-card rounded-2xl p-6 relative overflow-hidden group"
                  style={{ borderColor: "rgba(234,179,8,0.12)" }}
                >
                  <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full pointer-events-none transition-all group-hover:scale-125"
                    style={{ background: "radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)" }} />
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.18)" }}>
                      <Award className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1.5">100% B.Tech CS Scholarship</h4>
                      <p className="text-sm text-foreground/55 leading-relaxed">
                        Awarded by the <span className="text-yellow-400 font-medium">Sitare Foundation</span> recognizing exceptional academic potential in computer science.
                      </p>
                      <p className="text-xs font-mono text-foreground/35 mt-2">Aug 2024 – Present</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Coursework */}
              <div>
                <h3 className="flex items-center gap-2.5 text-base font-semibold mb-5 text-foreground/80">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.22)" }}>
                    <BookOpen className="w-4 h-4" style={{ color: "#60a5fa" }} />
                  </div>
                  Relevant Coursework
                </h3>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course, i) => (
                    <motion.span
                      key={course}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                      className="text-sm px-3.5 py-1.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: "var(--s2)",
                        border: "1px solid var(--b3)",
                        color: "var(--t3)"
                      }}
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
