import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setIsDark(saved !== "light");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const sections = ["home", "about", "skills", "projects", "achievements", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "HOME", id: "home" },
    { name: "ABOUT", id: "about" },
    { name: "SKILLS", id: "skills" },
    { name: "PROJECTS", id: "projects" },
    { name: "CONTACT", id: "contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: isScrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: isScrolled ? "1px solid var(--b5)" : "none",
        boxShadow: isScrolled ? "0 8px 40px rgba(0,0,0,0.15)" : "none",
        paddingTop: isScrolled ? "12px" : "20px",
        paddingBottom: isScrolled ? "12px" : "20px",
      }}
      data-testid="navbar"
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group"
          onClick={(e) => { e.preventDefault(); scrollTo("home"); }}
          data-testid="link-home-logo"
        >
          <Avatar
            className="w-10 h-10 transition-all duration-300 group-hover:scale-105"
            style={{ boxShadow: "0 0 0 2px rgba(99,102,241,0.5), 0 0 20px rgba(99,102,241,0.4)" }}
          >
            <AvatarImage src="/profile.jpeg" alt="Ishant Bhoyar" className="object-cover object-[center_15%]" />
            <AvatarFallback
              className="text-white font-bold text-lg"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              IB
            </AvatarFallback>
          </Avatar>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
              style={{
                color: activeSection === link.id ? "rgba(167,139,250,1)" : "var(--t4)",
              }}
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {activeSection === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "rgba(99,102,241,0.12)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Command palette hint */}
          <button
            onClick={() => {
              const e = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
              document.dispatchEvent(e);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 hover:opacity-80"
            style={{ background: "var(--s2)", border: "1px solid var(--b3)", color: "var(--t4)" }}
            title="Open command palette"
            data-testid="button-command-palette"
          >
            <span>⌘K</span>
          </button>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: "var(--t4)" }}
            aria-label="Toggle theme"
            data-testid="button-toggle-theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Button
            className="font-semibold px-5 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white",
              border: "none",
              boxShadow: "0 0 20px rgba(99,102,241,0.35), 0 4px 12px rgba(0,0,0,0.2)"
            }}
            data-testid="button-hire-me"
            onClick={() => scrollTo("contact")}
          >
            Hire Me
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ color: "var(--t4)" }}
            aria-label="Toggle theme"
            data-testid="button-toggle-theme-mobile"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 border-b py-4 px-4"
            style={{
              background: "var(--menu-bg)",
              backdropFilter: "blur(24px)",
              borderColor: "var(--b5)"
            }}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium py-3 px-4 rounded-lg text-left transition-colors"
                  style={{
                    color: activeSection === link.id ? "rgba(167,139,250,1)" : "var(--t3)",
                    background: activeSection === link.id ? "rgba(99,102,241,0.1)" : "transparent"
                  }}
                  data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </button>
              ))}
              <Button
                className="mt-3 w-full font-semibold"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", border: "none" }}
                onClick={() => scrollTo("contact")}
                data-testid="button-mobile-hire-me"
              >
                Hire Me
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
