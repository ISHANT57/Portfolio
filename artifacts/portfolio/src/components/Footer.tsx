import { motion } from "framer-motion";
import { Mail, Phone, Github } from "lucide-react";
import { SiInstagram, SiLeetcode } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { goExternal } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "LeetCode",     href: "#leetcode" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",      href: "#contact" },
];

const SOCIALS = [
  { icon: Github,        label: "GitHub",    href: "https://github.com/ISHANT57",                        color: "#e2e8f0" },
  { icon: Linkedin,      label: "LinkedIn",  href: "https://linkedin.com/in/ishant-bhoyar-555413214",    color: "#0ea5e9" },
  { icon: SiInstagram,   label: "Instagram", href: "https://instagram.com/ishant_bhoyar",                color: "#e1306c" },
  { icon: SiLeetcode,    label: "LeetCode",  href: "https://leetcode.com/u/Ishant_57/",                  color: "#f97316" },
];

export function Footer() {
  return (
    <footer className="relative" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} data-testid="footer">
      <div className="orb w-[500px] h-[300px] bg-violet-600/6 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12 mb-14">

          {/* Left — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm text-white"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 20px rgba(99,102,241,0.35)" }}
              >
                IB
              </div>
              <span className="font-bold text-base" style={{ color: "rgba(255,255,255,0.9)" }}>Ishant Bhoyar</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              CS undergrad & Full Stack + AI Engineer dedicated to crafting immersive, high-performance
              digital experiences with cutting-edge technology.
            </p>
          </motion.div>

          {/* Middle — Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.35)" }}>
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Connect */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.35)" }}>
              Connect
            </p>
            <div className="space-y-3 mb-7">
              <button
                onClick={() => { navigator.clipboard.writeText("ishantbhoyar59@gmail.com"); }}
                className="flex items-center gap-2.5 text-sm transition-colors duration-200 hover:text-white group"
                style={{ color: "rgba(255,255,255,0.5)" }}
                title="Click to copy"
              >
                <Mail className="w-3.5 h-3.5 shrink-0 group-hover:text-violet-400 transition-colors" />
                ishantbhoyar59@gmail.com
              </button>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <Phone className="w-3.5 h-3.5 shrink-0" />
                +91 7798881236
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(s => {
                const Icon = s.icon;
                return (
                  <motion.button
                    key={s.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    onClick={() => goExternal(s.href)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.45)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = `${s.color}15`;
                      (e.currentTarget as HTMLButtonElement).style.borderColor = `${s.color}40`;
                      (e.currentTarget as HTMLButtonElement).style.color = s.color;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)";
                    }}
                    aria-label={s.label}
                    title={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-xs font-mono"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.25)" }}
        >
          <span>© {new Date().getFullYear()} Ishant Bhoyar. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <span className="text-red-400">♥</span> in India
          </span>
        </div>
      </div>
    </footer>
  );
}
