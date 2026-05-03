import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "> Initializing portfolio...", color: "rgba(255,255,255,0.35)" },
  { text: "> Loading React framework", color: "rgba(255,255,255,0.35)" },
  { text: "✓ Framework ready", color: "#4ade80" },
  { text: "> Mounting AI modules", color: "rgba(255,255,255,0.35)" },
  { text: "✓ AI modules loaded", color: "#4ade80" },
  { text: "> Connecting project database", color: "rgba(255,255,255,0.35)" },
  { text: "✓ Welcome — Ishant.dev is ready!", color: "#a78bfa" },
];

const DELAY_MS = 230;

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [shown, setShown] = useState<number[]>([]);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setShown(prev => [...prev, i]);
          if (i === BOOT_LINES.length - 1) {
            setTimeout(() => {
              setExiting(true);
              setTimeout(onComplete, 550);
            }, 450);
          }
        }, i * DELAY_MS)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: "#0A0A0F" }}
        >
          <div className="w-full max-w-sm px-8">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-10 flex items-center gap-3"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-white text-sm"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 0 24px rgba(139,92,246,0.45)"
                }}
              >
                IB
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-white/90">Ishant Bhoyar</p>
                <p className="font-mono text-[10px] text-white/30 tracking-wider">portfolio v2.0</p>
              </div>
            </motion.div>

            <div className="font-mono text-xs space-y-2 min-h-[148px]">
              {BOOT_LINES.map((line, i) =>
                shown.includes(i) ? (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ color: line.color }}
                  >
                    {line.text}
                  </motion.p>
                ) : null
              )}
              {shown.length < BOOT_LINES.length && (
                <span
                  className="inline-block w-[7px] h-[14px] animate-pulse"
                  style={{ background: "#a78bfa", borderRadius: "2px" }}
                />
              )}
            </div>

            <div
              className="mt-8 h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)" }}
                animate={{ width: `${(shown.length / BOOT_LINES.length) * 100}%` }}
                transition={{ duration: 0.28 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
