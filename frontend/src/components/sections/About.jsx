import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Award } from "lucide-react";

function OrbitalDiagram() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let time = 0;
    let hoverScale = 1;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = () => {
      hoverScale = 2;
    };
    const handleMouseLeave = () => {
      hoverScale = 1;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const orbits = [
      { radius: 100, speed: 0.005, items: ["React", "Python", "Go"] },
      {
        radius: 160,
        speed: 0.003,
        items: ["AWS", "Node.js", "K8s", "TypeScript"],
      },
      {
        radius: 220,
        speed: 0.002,
        items: ["PostgreSQL", "TensorFlow", "Docker", "Redis", "GraphQL"],
      },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      time += hoverScale;

      // Draw center orb
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      gradient.addColorStop(0, "rgba(139, 92, 246, 1)");
      gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("NEXUS", cx, cy);

      // Draw rings and items
      orbits.forEach((orbit, i) => {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.setLineDash([5, 5]);
        ctx.arc(cx, cy, orbit.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        orbit.items.forEach((item, j) => {
          const angle =
            (j / orbit.items.length) * Math.PI * 2 + time * orbit.speed;
          const x = cx + Math.cos(angle) * orbit.radius;
          const y = cy + Math.sin(angle) * orbit.radius;

          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = i === 0 ? "#8b5cf6" : i === 1 ? "#3b82f6" : "#22d3ee";
          ctx.fill();
          ctx.shadowBlur = 10;
          ctx.shadowColor = ctx.fillStyle;

          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.shadowBlur = 0;
          ctx.font = "10px sans-serif";
          ctx.fillText(item, x, y - 12);
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />;
}

export function About() {
  return (
    <section id="about" className="py-32 relative bg-card overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Engineering the <br />
              <span className="text-gradient-primary">Impossible</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed max-w-xl">
              NEXUS was founded on a singular premise: to build software that
              feels like magic. We are a collective of elite engineers,
              visionary designers, and strategic thinkers dedicated to pushing
              the boundaries of what's possible on the web.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-12">
              {[
                "Uncompromising Code Quality",
                "Rapid 8-Week Delivery",
                "Award-Winning Visual Design",
                "Dedicated Team Pod",
                "Scalable Enterprise Architecture",
                "24/7 Global Support",
                "Agile & Transparent Delivery",
                "IP Rights Fully Transferred",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-white/80 font-medium text-sm md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 rounded-full font-bold bg-white text-background hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-none hover:border-white/20">
              Meet The Leadership
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px]"
          >
            <div className="absolute inset-0 glass-panel rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
              <OrbitalDiagram />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-[60px] -z-10" />
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/20 rounded-full blur-[60px] -z-10" />
          </motion.div>
        </div>

        {/* Awards Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 pt-12 border-t border-white/5"
        >
          <div className="text-center mb-8">
            <span className="text-white/40 uppercase tracking-widest text-sm font-semibold flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-primary" /> Industry Recognition
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Awwwards Site of the Year 2023",
              "Clutch Top Agency 2024",
              "Webby Award Winner",
              "Forbes Top 50 Tech Agency",
            ].map((award) => (
              <div
                key={award}
                className="px-6 py-3 rounded-full glass-panel border border-white/5 text-white/80 font-medium text-sm md:text-base hover:bg-white/5 hover:border-primary/30 transition-all cursor-default hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)]"
              >
                {award}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
