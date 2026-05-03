import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Projects } from "@/components/Projects";
import { LeetCodeStats } from "@/components/LeetCodeStats";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <FeaturedProject />
        <Projects />
        <LeetCodeStats />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
