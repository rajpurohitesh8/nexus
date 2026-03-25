import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem("nexus-intro-shown");
    if (!hasShown) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        localStorage.setItem("nexus-intro-shown", "true");
        document.body.classList.add("intro-completed");
      }, 2800);
      return () => clearTimeout(timer);
    } else {
      document.body.classList.add("intro-completed");
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Scanline */}
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 2.5, ease: "linear" }}
            className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none z-10"
          />

          <div className="flex text-5xl md:text-7xl font-display font-bold tracking-widest text-white z-20">
            {["N", "E", "X", "U", "S"].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.15 + 0.5,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className={
                  i % 2 === 0 ? "glitch-text inline-block" : "inline-block"
                }
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
