import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HolographicCard } from "@/components/HolographicCard";

const CATEGORIES = ["All", "Web App", "Mobile", "AI/ML", "Enterprise"];

const PROJECTS = [
  {
    title: "Aura Financial",
    category: "Web App",
    tech: ["React", "TypeScript", "Node.js"],
    image: "project-fintech.png",
  },
  {
    title: "Synapse AI",
    category: "AI/ML",
    tech: ["Next.js", "Python", "TensorFlow"],
    image: "project-ai.png",
  },
  {
    title: "Vertex Analytics",
    category: "Enterprise",
    tech: ["TypeScript", "D3.js", "PostgreSQL"],
    image: "project-fintech.png",
  },
  {
    title: "Lumina Commerce",
    category: "Web App",
    tech: ["Shopify Plus", "React", "AWS"],
    image: "project-ecommerce.png",
  },
  {
    title: "Halo Logistics",
    category: "Enterprise",
    tech: ["Go", "Kubernetes", "React"],
    image: "project-ecommerce.png",
  },
  {
    title: "Nova Health",
    category: "Mobile",
    tech: ["React Native", "GraphQL"],
    image: "project-health.png",
  },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  const filteredProjects = PROJECTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section id="work" ref={containerRef} className="relative h-[200vh] bg-background border-y border-white/5">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header Area */}
        <div className="pt-32 px-4 sm:px-6 lg:px-8 max-w-[100vw]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-8 max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-white/5">
                <span className="text-xs font-semibold tracking-widest uppercase text-white/80">Selected Works</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                Featured <span className="text-accent text-glow-accent">Projects</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end shrink-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === cat
                      ? "bg-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                      : "glass-panel text-white/60 hover:text-white hover:bg-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Area */}
        <div className="flex-grow flex items-center overflow-hidden">
          <motion.div 
            style={{ x }} 
            className="flex gap-8 px-4 sm:px-6 lg:px-8 pb-16"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                initial={{ opacity: 0.5, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "0px 100px 0px 100px" }}
                transition={{ duration: 0.6 }}
                key={project.title}
                className="w-[85vw] sm:w-[500px] shrink-0"
              >
                <HolographicCard className="h-[calc(100vh-320px)] min-h-[400px] rounded-3xl cursor-pointer">
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-background rounded-3xl">
                    <img
                      src={`${import.meta.env.BASE_URL}images/${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-1000 ease-out opacity-60 group-hover:opacity-40 group-hover:[filter:drop-shadow(-2px_0_0_rgba(255,0,128,0.3))_drop-shadow(2px_0_0_rgba(0,200,255,0.3))]"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  
                  {/* Chromatic aberration effect is applied via HolographicCard inherently or custom CSS */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
                    <span className="px-6 py-3 rounded-full bg-white text-background font-bold flex items-center gap-2 shadow-2xl">
                      View Case Study <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
                    <div className="flex justify-end">
                      <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/50 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.8)]">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                    </div>
                    
                    <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium glass-panel rounded-full text-white/90 border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="text-primary font-medium mb-2 uppercase tracking-wider text-sm">{project.category}</p>
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
