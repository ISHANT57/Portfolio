import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SiGithub, SiPython, SiFlask, SiPandas, SiNumpy } from "react-icons/si";
import { goExternal } from "@/lib/utils";
import { TerminalPanel } from "./TerminalPanel";

const codeSnippet = `# RAG Pipeline for Sacred Texts Q&A
from qdrant_client import QdrantClient
from mistral_embeddings import embed

client = QdrantClient(":memory:")

def semantic_search(query: str, top_k: int = 5):
    """Retrieve relevant passages using Mistral embeddings"""
    query_vector = embed(query)
    
    results = client.search(
        collection_name="sacred_texts",
        query_vector=query_vector,
        limit=top_k,
        with_payload=True
    )
    
    return [hit.payload for hit in results]

def generate_answer(query: str) -> str:
    context = semantic_search(query)
    return rag_pipeline(query, context)`;

const techStack = [
  { name: "Python", icon: SiPython, color: "#3b82f6" },
  { name: "Flask", icon: SiFlask, color: "#e2e8f0" },
  { name: "Pandas", icon: SiPandas, color: "#60a5fa" },
  { name: "NumPy", icon: SiNumpy, color: "#60a5fa" },
  { name: "Qdrant", icon: null, color: "#a78bfa" },
  { name: "Mistral", icon: null, color: "#f97316" },
  { name: "RAG Pipeline", icon: null, color: "#c084fc" },
  { name: "NLP", icon: null, color: "#34d399" },
];

const highlights = [
  "Multi-concurrent query handling via semantic search",
  "High-dimensional Mistral embeddings + Qdrant vector DB",
  "NLP-enhanced query understanding for better relevance",
  "Flask REST API with optimized retrieval pipeline",
];

export function FeaturedProject() {
  return (
    <section id="featured" className="py-28 relative overflow-hidden">
      {/* Dramatic lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)"
        }}
      />
      <div className="orb w-[500px] h-[500px] bg-violet-600/10 top-1/2 -translate-y-1/2 -left-48 animate-float" />
      <div className="orb w-[300px] h-[300px] bg-blue-600/08 bottom-0 right-0 animate-float-delay" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="section-divider mb-24" />

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold">
            AI Q&amp;A for <span className="text-gradient">Sacred Texts</span>
          </h2>
          <p className="text-foreground/50 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            The most complex system I've built — combining semantic search, vector databases, and RAG pipelines to answer questions with high relevance and accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          {/* Left — terminal code */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TerminalPanel title="rag_pipeline.py — Python">
              <pre className="text-[12px] leading-relaxed overflow-x-auto">
                {codeSnippet.split("\n").map((line, i) => {
                  // Simple syntax highlighting
                  const isComment = line.trimStart().startsWith("#");
                  const isKeyword = /^(from|import|def|return|class)\b/.test(line.trim());
                  const isString = line.includes('"') || line.includes("'");

                  let color = "var(--t2)";
                  if (isComment) color = "rgba(99,102,241,0.6)";
                  else if (isKeyword) color = "#c084fc";

                  return (
                    <div key={i} className="flex">
                      <span className="select-none w-7 shrink-0 text-right mr-4 text-[10px]"
                        style={{ color: "var(--t6)", lineHeight: "1.75" }}>
                        {i + 1}
                      </span>
                      <span style={{ color }}>{line || " "}</span>
                    </div>
                  );
                })}
                <div className="inline-block w-2 h-4 mt-1 animate-pulse" style={{ background: "#a78bfa" }} />
              </pre>
            </TerminalPanel>
          </motion.div>

          {/* Right — details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-8"
          >
            {/* Architecture highlights */}
            <div>
              <h3 className="text-sm font-mono text-foreground/40 mb-4 tracking-widest">SYSTEM HIGHLIGHTS</h3>
              <div className="space-y-3">
                {highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}>
                      <ArrowRight className="w-3 h-3" style={{ color: "#a78bfa" }} />
                    </div>
                    <p className="text-sm text-foreground/70 leading-relaxed">{h}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-mono text-foreground/40 mb-4 tracking-widest">TECH STACK</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map(tech => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all hover:-translate-y-0.5"
                      style={{
                        background: `${tech.color}10`,
                        border: `1px solid ${tech.color}25`,
                        color: tech.color
                      }}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {tech.name}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://github.com/ISHANT57/Gitabot_NYD_2026"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => { e.preventDefault(); goExternal("https://github.com/ISHANT57/Gitabot_NYD_2026"); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "white",
                  boxShadow: "0 0 20px rgba(99,102,241,0.3)"
                }}
                data-testid="link-featured-github"
              >
                <SiGithub className="w-4 h-4" /> View Source
              </a>
              <a
                href="https://gitabot-nyd-2026--ishantbhoyar59.replit.app/"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => { e.preventDefault(); goExternal("https://gitabot-nyd-2026--ishantbhoyar59.replit.app/"); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                style={{
                  background: "var(--s2)",
                  border: "1px solid var(--b2)",
                  color: "var(--t2)"
                }}
                data-testid="link-featured-demo"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
