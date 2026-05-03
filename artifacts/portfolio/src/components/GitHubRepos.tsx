import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { goExternal } from "@/lib/utils";
import { Star, GitFork, ExternalLink, RefreshCw } from "lucide-react";

const GITHUB_USERNAME = "ISHANT57";
const EXCLUDED_REPOS = ["machine-learning", "ISHANT57", "Machine-Learning-"];
const PINNED_REPOS = ["Resume-Analyzer", "Zara-Interpreter-IDE", "trading-bot-binance", "Gitabot_NYD_2026"];

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

const LANG_COLORS: Record<string, string> = {
  Python: "#3b82f6",
  JavaScript: "#eab308",
  TypeScript: "#3b82f6",
  Java: "#f97316",
  HTML: "#ef4444",
  CSS: "#8b5cf6",
  Jupyter: "#f97316",
  Shell: "#4ade80",
};

function RepoSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 rounded bg-white/10" />
        <div className="h-4 w-36 rounded bg-white/10" />
      </div>
      <div className="h-3 w-full rounded bg-white/5 mb-2" />
      <div className="h-3 w-2/3 rounded bg-white/5 mb-5" />
      <div className="flex items-center gap-4">
        <div className="h-3 w-12 rounded bg-white/10" />
        <div className="h-3 w-10 rounded bg-white/10" />
        <div className="h-3 w-14 rounded bg-white/10" />
      </div>
    </div>
  );
}

export function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ public_repos: number; followers: number; following: number } | null>(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch more repos so we have a big enough pool after filtering
      const [reposRes, profileRes, ...pinnedRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20&type=public`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        ...PINNED_REPOS.map(name =>
          fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${name}`)
        ),
      ]);
      if (!reposRes.ok) throw new Error("GitHub API error");

      const reposData: Repo[] = await reposRes.json();
      const profileData = await profileRes.json();

      // Resolve pinned repos (ignore failures)
      const pinnedData: Repo[] = (
        await Promise.all(pinnedRes.map(r => r.ok ? r.json() : null))
      ).filter(Boolean) as Repo[];

      // Filter out excluded repos
      const filtered = reposData.filter(
        r => !EXCLUDED_REPOS.some(ex => r.name.toLowerCase() === ex.toLowerCase())
      );

      // Merge: pinned first, then rest (no duplicates), limit to 6
      const pinnedIds = new Set(pinnedData.map(r => r.id));
      const rest = filtered.filter(r => !pinnedIds.has(r.id))
        .sort((a, b) => b.stargazers_count - a.stargazers_count);

      setRepos([...pinnedData, ...rest].slice(0, 6));
      setProfile({ public_repos: profileData.public_repos, followers: profileData.followers, following: profileData.following });
    } catch {
      setError("Could not load GitHub repositories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRepos(); }, []);

  return (
    <section id="github" className="py-28 relative overflow-hidden">
      <div className="orb w-[400px] h-[300px] bg-green-600/8 top-1/2 left-0" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="section-divider mb-24" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-label">// GITHUB</span>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Open <span className="text-gradient">Source</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {profile && (
              <div className="flex items-center gap-5 text-sm">
                {[
                  { label: "Repos", value: profile.public_repos },
                  { label: "Followers", value: profile.followers },
                  { label: "Following", value: profile.following },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <div className="text-lg font-bold text-gradient">{stat.value}</div>
                    <div className="text-xs font-mono text-foreground/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => { e.preventDefault(); goExternal(`https://github.com/${GITHUB_USERNAME}`); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--s1)",
                border: "1px solid var(--b1)",
                color: "var(--t2)"
              }}
              data-testid="link-github-profile"
            >
              <SiGithub className="w-4 h-4" />
              @{GITHUB_USERNAME}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {error && (
          <div className="glass-card rounded-2xl p-8 text-center mb-8">
            <p className="text-foreground/50 text-sm mb-4">{error}</p>
            <button
              onClick={fetchRepos}
              className="flex items-center gap-2 mx-auto px-4 py-2 rounded-xl text-sm transition-all hover:scale-105"
              style={{ background: "rgba(99,102,241,0.12)", color: "#a78bfa", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        )}

        {/* Contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <p className="text-xs font-mono mb-4" style={{ color: "var(--t4)" }}>
            // contribution graph — {GITHUB_USERNAME}
          </p>
          <img
            src={`https://ghchart.rshah.org/7C5CFC/${GITHUB_USERNAME}`}
            alt="GitHub contribution graph"
            className="w-full rounded-lg"
            style={{ filter: "brightness(0.9) contrast(1.1)" }}
            loading="lazy"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 6 }, (_, i) => <RepoSkeleton key={i} />)
            : repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => { e.preventDefault(); goExternal(repo.html_url); }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="glass-card rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1.5"
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(99,102,241,0.3)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 40px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.07)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
                }}
                data-testid={`repo-card-${repo.id}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <SiGithub className="w-4 h-4 shrink-0 text-foreground/40" />
                    <span className="font-semibold text-sm text-foreground/90 truncate group-hover:text-foreground transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-foreground/20 group-hover:text-foreground/60 transition-colors" />
                </div>

                <p className="text-xs text-foreground/50 leading-relaxed line-clamp-2 flex-1 min-h-[2.5rem]">
                  {repo.description || "No description provided."}
                </p>

                <div className="flex items-center gap-4 mt-auto pt-3 border-t" style={{ borderColor: "var(--b5)" }}>
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: LANG_COLORS[repo.language] || "#6b7280" }}
                      />
                      <span className="text-xs font-mono text-foreground/50">{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 ml-auto">
                    <div className="flex items-center gap-1 text-xs text-foreground/40">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-foreground/40">
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))
          }
        </div>
      </div>
    </section>
  );
}
