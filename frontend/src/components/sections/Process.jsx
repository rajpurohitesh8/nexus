import { motion } from "framer-motion";
import { Compass, Palette, Code2, Rocket } from "lucide-react";
import { useRef } from "react";
import { ScrambleText } from "@/components/ScrambleText";

const STEPS = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We deep-dive into your market, goals, and technical requirements to architect a winning strategy.",
    icon: Compass,
  },
  {
    num: "02",
    title: "Design & Prototype",
    desc: "Our designers craft pixel-perfect interfaces that captivate users from the first interaction.",
    icon: Palette,
  },
  {
    num: "03",
    title: "Engineering",
    desc: "Elite engineers build with bulletproof code, rigorous testing, and performance obsession.",
    icon: Code2,
  },
  {
    num: "04",
    title: "Launch & Scale",
    desc: "We deploy to global infrastructure and monitor performance, iterating for continuous excellence.",
    icon: Rocket,
  },
];

export function Process() {
  const containerRef = useRef(null);

  return (
    <section id="process" className="py-32 relative bg-card overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-white/5"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-white/80">
              Methodology
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            <ScrambleText
              text="Our Process"
              className="text-secondary text-glow-accent"
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl"
          >
            From vision to deployment in four precise phases. We've refined our
            delivery model to ensure speed without compromising quality.
          </motion.p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 border-dashed border-t-[2px] border-white/10 bg-transparent" />

          <motion.div
            className="hidden lg:block absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-primary via-accent to-secondary -translate-y-1/2"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-6 relative">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 !== 0;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className={`relative flex flex-col ${isEven ? "lg:flex-col-reverse lg:-translate-y-1/2" : "lg:translate-y-1/2"}`}
                >
                  {/* Mobile timeline line */}
                  <div className="lg:hidden absolute top-0 left-8 bottom-0 w-[2px] bg-white/10" />

                  {/* Node point */}
                  <div
                    className={`relative z-10 flex lg:justify-center items-center ${isEven ? "lg:mb-8" : "lg:mt-8"} mb-8`}
                  >
                    <div className="w-16 h-16 rounded-full glass-panel border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.15)] relative bg-background">
                      <Icon className="w-6 h-6 text-primary" />

                      {/* Connecting vertical line on desktop */}
                      <div
                        className={`hidden lg:block absolute left-1/2 w-[2px] h-8 bg-primary/30 -translate-x-1/2 ${isEven ? "-top-8" : "-bottom-8"}`}
                      />
                    </div>
                  </div>

                  <div className="ml-24 lg:ml-0 lg:text-center glass-panel p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-colors duration-500 group relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 text-8xl font-display font-bold text-white/[0.02] group-hover:text-primary/[0.05] transition-colors duration-500">
                      {step.num}
                    </div>

                    <h3 className="text-xl font-display font-bold text-white mb-4 relative z-10">
                      {step.num}. {step.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm relative z-10">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
