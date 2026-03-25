import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function HolographicCard({ children, className }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height;
    const y = (e.clientX - rect.left) / rect.width;

    // For 3D tilt
    setTilt({ x: (x - 0.5) * -20, y: (y - 0.5) * 20 });
    setGlare({ x: y * 100, y: x * 100 });

    // For Holographic custom properties
    ref.current.style.setProperty("--mouse-x", y.toString());
    ref.current.style.setProperty("--mouse-y", x.toString());
  };

  const reset = () => {
    setTilt({ x: 0, y: 0 });
    if (ref.current) {
      ref.current.style.setProperty("--mouse-x", "0.5");
      ref.current.style.setProperty("--mouse-y", "0.5");
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("holo-card relative overflow-hidden group", className)}
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
        }}
      />

      {/* Iridescent overlay */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 opacity-0 group-hover:opacity-15 transition-opacity duration-300 mix-blend-color-dodge"
        style={{
          background: `conic-gradient(from calc(var(--angle) + var(--mouse-x, 0.5) * 180deg) at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), #8b5cf6, #3b82f6, #22d3ee, #06b6d4, #8b5cf6)`,
        }}
      />

      {children}
    </motion.div>
  );
}
