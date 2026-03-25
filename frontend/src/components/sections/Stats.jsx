import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Trophy, Star, Calendar, Users, TrendingUp } from "lucide-react";
import { MorphingBlob } from "@/components/MorphingBlob";
import { ScrambleText } from "@/components/ScrambleText";

const STATS = [
  { value: 200, label: "Projects Delivered", suffix: "+", icon: Trophy },
  { value: 98, label: "Client Satisfaction", suffix: "%", icon: Star },
  { value: 14, label: "Years Experience", suffix: "+", icon: Calendar },
  { value: 60, label: "Global Clients", suffix: "+", icon: Users },
  {
    value: 2,
    label: "Revenue Generated",
    suffix: "B+",
    prefix: "$",
    icon: TrendingUp,
  },
];

function Counter({ from, to, prefix = "", suffix }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      let startTimestamp = null;
      const duration = 2500; // 2.5 seconds

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // easeOutExpo
        const easeProgress =
          progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(easeProgress * (to - from) + from));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [inView, from, to]);

  return (
    <span
      ref={nodeRef}
      className="text-5xl lg:text-6xl font-display font-bold text-white tracking-tighter drop-shadow-lg"
    >
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Morphing Blob Background */}
      <MorphingBlob className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60 z-0" />

      {/* Stunning horizontal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-background to-accent/20 z-0" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] mix-blend-overlay z-0" />

      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-0" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            <ScrambleText text="Our Global Impact" className="text-white" />
          </h2>
        </div>

        <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 lg:gap-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="flex flex-col items-center relative group w-full sm:w-[calc(50%-2rem)] lg:w-auto"
              >
                {/* Glowing divider between stats (except last one) on large screens */}
                {i !== STATS.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent group-hover:via-primary transition-colors duration-500" />
                )}

                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:text-accent transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="mb-2 group-hover:scale-105 transition-transform duration-300">
                  <Counter
                    from={0}
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>

                <p className="text-white/60 font-medium uppercase tracking-widest text-xs md:text-sm text-center">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
