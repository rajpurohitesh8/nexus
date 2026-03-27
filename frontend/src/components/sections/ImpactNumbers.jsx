import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ScrambleText } from "@/components/ScrambleText";

const STATS = [
  {
    value: 47832,
    prefix: "",
    suffix: "+",
    label: "Lines of Code Shipped",
    desc: "Across 200+ production repositories",
  },
  {
    value: 99.97,
    prefix: "",
    suffix: "%",
    label: "Average Uptime",
    desc: "Across all client production systems",
    decimals: 2,
  },
  {
    value: 847,
    prefix: "",
    suffix: "K",
    label: "Peak Requests/Sec",
    desc: "Handled without performance degradation",
  },
  {
    value: 2.4,
    prefix: "$",
    suffix: "B+",
    label: "Client Revenue Influenced",
    desc: "Through platforms we've engineered",
    decimals: 1,
  },
  {
    value: 2847,
    prefix: "",
    suffix: "",
    label: "Test Cases Per Project",
    desc: "Zero-compromise quality assurance",
  },
  {
    value: 12,
    prefix: "",
    suffix: "ms",
    label: "Average API Response",
    desc: "Sub-20ms guaranteed SLA on all builds",
  },
];

function ComplexCounter({ stat }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (inView) {
      let startTimestamp = null;
      const duration = 2500;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress =
          progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const currentVal = easeProgress * stat.value;
        setCount(currentVal);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setIsFinished(true);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [inView, stat.value]);

  const displayValue = stat.decimals
    ? count.toFixed(stat.decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span
      ref={nodeRef}
      className={`text-5xl lg:text-6xl font-display font-bold tracking-tighter transition-all duration-500 ${isFinished ? "text-white pulse-glow px-4 rounded-xl" : "text-white/80"}`}
    >
      {stat.prefix}
      {displayValue}
      {stat.suffix}
    </span>
  );
}

export function ImpactNumbers() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01".split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = Math.random() * -100;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(34, 211, 238, 0.15)";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="py-32 relative bg-[#0a0a0a] overflow-hidden border-y border-white/5">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-screen pointer-events-none"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            <ScrambleText
              text="The Numbers Don't Lie"
              className="text-white glitch-text"
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-accent text-xl font-medium tracking-wide uppercase"
          >
            Precision. Performance. Impact.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md overflow-hidden group hover:border-accent/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col items-center text-center py-4">
                <div className="mb-6 group-hover:scale-105 transition-transform duration-500">
                  <ComplexCounter stat={stat} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {stat.label}
                </h4>
                <p className="text-white/50 text-sm">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
