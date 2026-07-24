import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { TerminalPanel } from "./TerminalPanel";

export function AIChatPreview() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
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
                  <span style={{ color: "#a78bfa" }} className="font-medium">AI Agents &amp; RAG</span>,{" "}
                  <span style={{ color: "#818cf8" }} className="font-medium">Full Stack Dev</span>, and{" "}
                  <span style={{ color: "#a78bfa" }} className="font-medium">LLM Systems</span>. Python, TypeScript, Next.js &amp; Node.js are his core stack.
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
    </section>
  );
}
