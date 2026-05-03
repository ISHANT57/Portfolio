import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Trophy, Zap, Target, RefreshCw } from "lucide-react";

const LEETCODE_USERNAME = "Ishant_57";

interface LeetCodeData {
  status: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
}

function CircleProgress({ solved, total, color, label }: { solved: number; total: number; color: string; label: string }) {
  const pct = total > 0 ? Math.min(solved / total, 1) : 0;
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - pct * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={r} fill="none" strokeWidth="4" stroke="var(--b4)" />
          <motion.circle
            cx="36" cy="36" r={r}
            fill="none"
            strokeWidth="4"
            stroke={color}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold" style={{ color }}>{solved}</span>
        </div>
      </div>
      <span className="text-xs font-mono text-foreground/50">{label}</span>
      <span className="text-[10px] text-foreground/30">/ {total}</span>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) {
  return (
    <div className="glass-card rounded-xl p-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}14`, border: `1px solid ${color}28`, color }}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs font-mono text-foreground/40">{label}</p>
        <p className="font-bold text-base text-foreground/90">{value}</p>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="glass-card rounded-xl p-4 flex items-center gap-3 animate-pulse">
      <div className="w-9 h-9 rounded-xl bg-white/5" />
      <div>
        <div className="h-2.5 w-16 rounded bg-white/5 mb-2" />
        <div className="h-4 w-10 rounded bg-white/10" />
      </div>
    </div>
  );
}

export function LeetCodeStats() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`);
      if (!res.ok) throw new Error("API error");
      const profile = await res.json();
      if (profile.errors) throw new Error("User not found");

      // Calculate acceptance rate from totalSubmissions array
      // each entry: { difficulty, count (accepted), submissions (total) }
      const allSub = (profile.totalSubmissions as { difficulty: string; count: number; submissions: number }[] | undefined)
        ?.find(s => s.difficulty === "All");
      const acceptanceRate = allSub && allSub.submissions > 0
        ? (allSub.count / allSub.submissions) * 100
        : 0;

      setData({
        status: "success",
        totalSolved: profile.totalSolved ?? 0,
        totalQuestions: profile.totalQuestions ?? 3000,
        easySolved: profile.easySolved ?? 0,
        totalEasy: profile.totalEasy ?? 941,
        mediumSolved: profile.mediumSolved ?? 0,
        totalMedium: profile.totalMedium ?? 2050,
        hardSolved: profile.hardSolved ?? 0,
        totalHard: profile.totalHard ?? 929,
        acceptanceRate,
        ranking: profile.ranking ?? 0,
        contributionPoints: profile.contributionPoint ?? 0,
      });
    } catch {
      setError("Could not load LeetCode stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <section id="leetcode" className="py-20 relative overflow-hidden">
      <div className="orb w-[350px] h-[300px] bg-orange-500/8 top-0 right-0" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="section-divider mb-20" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Coding <span className="text-gradient">Stats</span>
            </h2>
          </div>
          <a
            href={`https://leetcode.com/${LEETCODE_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(234,179,8,0.08)",
              border: "1px solid rgba(234,179,8,0.2)",
              color: "rgba(234,179,8,0.8)"
            }}
            data-testid="link-leetcode-profile"
          >
            <Code2 className="w-4 h-4" />
            @{LEETCODE_USERNAME}
          </a>
        </div>

        {error && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <Code2 className="w-8 h-8 mx-auto mb-3 text-foreground/20" />
            <p className="text-foreground/50 text-sm mb-4">{error}</p>
            <button
              onClick={fetchStats}
              className="flex items-center gap-2 mx-auto px-4 py-2 rounded-xl text-sm transition-all hover:scale-105"
              style={{ background: "rgba(99,102,241,0.12)", color: "#a78bfa", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        )}

        {(loading || data) && (
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-center">
            {/* Circle progress rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 flex flex-col items-center gap-6"
            >
              {loading ? (
                <div className="flex items-center gap-8 animate-pulse">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-white/5" />
                      <div className="h-2.5 w-12 rounded bg-white/5" />
                    </div>
                  ))}
                </div>
              ) : data ? (
                <>
                  <div className="flex items-center gap-8 md:gap-10">
                    <CircleProgress solved={data.easySolved} total={data.totalEasy} color="#4ade80" label="Easy" />
                    <CircleProgress solved={data.mediumSolved} total={data.totalMedium} color="#eab308" label="Medium" />
                    <CircleProgress solved={data.hardSolved} total={data.totalHard} color="#f87171" label="Hard" />
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-gradient">{data.totalSolved}</p>
                    <p className="text-xs font-mono text-foreground/40 mt-1">total problems solved</p>
                  </div>
                </>
              ) : null}
            </motion.div>

            {/* Stats grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {loading ? (
                [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
              ) : data ? (
                <>
                  <StatCard icon={Trophy} label="Global Ranking" value={data.ranking > 0 ? `#${data.ranking.toLocaleString()}` : "N/A"} color="#eab308" />
                  <StatCard icon={Target} label="Acceptance Rate" value={`${data.acceptanceRate?.toFixed(1) ?? "—"}%`} color="#6366f1" />
                  <StatCard icon={Zap} label="Problems Solved" value={`${data.totalSolved} / ${data.totalQuestions}`} color="#a855f7" />
                  <StatCard icon={Code2} label="Contribution Pts" value={data.contributionPoints ?? "—"} color="#10b981" />
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
