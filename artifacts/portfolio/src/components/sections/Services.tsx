import { motion } from "framer-motion";
import { Code2, Smartphone, Cloud, Layers, Cpu, ShieldCheck, RefreshCw, Lock, Link as LinkIcon, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height;
    const y = (e.clientX - rect.left) / rect.width;
    setTilt({ x: (x - 0.5) * -20, y: (y - 0.5) * 20 }); // Reversed signs for natural tilt feeling
    setGlare({ x: y * 100, y: x * 100 });
  };
  
  const reset = () => setTilt({ x: 0, y: 0 });
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)` }}
      />
      {children}
    </motion.div>
  );
}

const SERVICES = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Web Applications",
    description: "High-performance, scalable React & Node.js architectures tailored for complex enterprise needs.",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile Development",
    description: "Native-feeling cross-platform mobile experiences that engage and retain users.",
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "UI/UX Design",
    description: "Award-winning interface design focusing on seamless journeys and cinematic aesthetics.",
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud Architecture",
    description: "Resilient infrastructure design on AWS and GCP for zero-downtime global deployment.",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "AI Integration",
    description: "Embedding cutting-edge LLMs and machine learning models into your product ecosystem.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Enterprise Software",
    description: "Secure, compliant, and robust custom software replacing legacy operational systems.",
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: "DevOps & CI/CD",
    description: "Automated pipelines, container orchestration, and zero-downtime deployments.",
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Cybersecurity",
    description: "Enterprise security audits, penetration testing, and robust compliance frameworks.",
  },
  {
    icon: <LinkIcon className="w-8 h-8" />,
    title: "Blockchain & Web3",
    description: "Decentralized application development, smart contracts, and secure tokenization.",
  }
];

export function Services() {
  return (
    <section id="services" className="py-32 relative z-10 bg-background overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-24 md:text-center md:max-w-3xl md:mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-white/5"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-white/80">Expertise</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
          >
            Core <span className="text-gradient-primary">Capabilities</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl"
          >
            We don't just write code. We architect solutions that define the future of your industry, combining technical excellence with visionary design.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const num = (index + 1).toString().padStart(2, '0');
            return (
              <TiltCard key={service.title} className="group relative h-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full p-8 rounded-3xl bg-card border border-white/5 group-hover:border-white/10 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {/* Number Prefix */}
                  <div className="absolute top-6 right-6 font-display font-bold text-6xl text-white/[0.03] group-hover:text-primary/[0.05] transition-colors duration-500 select-none">
                    {num}
                  </div>

                  {/* Glowing Left Line on Hover */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 h-full flex flex-col pointer-events-none">
                    <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-white/80 group-hover:text-primary group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500 mb-8 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    
                    <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
