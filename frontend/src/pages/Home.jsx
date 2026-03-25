import { PageIntro } from "@/components/PageIntro";
import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { TechShowcase } from "@/components/sections/TechShowcase";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { ImpactNumbers } from "@/components/sections/ImpactNumbers";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { PerspectiveGrid } from "@/components/PerspectiveGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <PageIntro />
      <CustomCursor />
      <Navigation />

      <main>
        <Hero />
        <PerspectiveGrid />
        <Services />
        <TechShowcase />
        <Projects />
        <PerspectiveGrid />
        <Stats />
        <Process />
        <About />
        <ImpactNumbers />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
