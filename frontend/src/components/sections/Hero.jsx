import { motion, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

class Star {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = (Math.random() - 0.5) * canvasWidth * 2;
    this.y = (Math.random() - 0.5) * canvasHeight * 2;
    this.z = Math.random() * 2000;
    this.pz = this.z;
    const colors = ["#a855f7", "#3b82f6", "#ffffff", "#22d3ee"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(speed, canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.pz = this.z;
    this.z -= speed;

    if (this.z < 1) {
      this.z = 2000;
      this.pz = 2000;
      this.x = (Math.random() - 0.5) * canvasWidth * 2;
      this.y = (Math.random() - 0.5) * canvasHeight * 2;
    }
  }

  draw(ctx, focalLength, vpX, vpY) {
    const sx = (this.x / this.z) * focalLength + vpX;
    const sy = (this.y / this.z) * focalLength + vpY;
    const px = (this.x / this.pz) * focalLength + vpX;
    const py = (this.y / this.pz) * focalLength + vpY;

    const size = Math.max(0.5, (1 - this.z / 2000) * 3 + 0.5);
    const opacity = Math.max(0, 1 - this.z / 2000);

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.globalAlpha = opacity;
    ctx.moveTo(px, py);
    ctx.lineTo(sx, sy);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function MagneticButton({ children, href, className, primary }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "group relative px-8 py-4 font-bold rounded-full overflow-hidden transition-all hover:scale-105 flex items-center justify-center gap-2",
        primary
          ? "bg-white text-background"
          : "glass-panel text-white hover:bg-white/10 hover:border-white/20",
        className,
      )}
    >
      {primary && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <span
        className={cn(
          "relative flex items-center justify-center gap-2 transition-colors",
          primary ? "group-hover:text-white" : "",
        )}
      >
        {children}
      </span>
    </motion.a>
  );
}

const PHRASES = [
  "Digital Masterpieces",
  "Enterprise Software",
  "Global Experiences",
];

export function Hero() {
  const canvasRef = useRef(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(8);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // 3D Parallax Mouse Tracking
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    // Calculate mouse speed for warp effect
    const dx = clientX - lastMousePosRef.current.x;
    const dy = clientY - lastMousePosRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 10) {
      speedRef.current = Math.min(25, speedRef.current + dist * 0.1);
    }

    lastMousePosRef.current = { x: clientX, y: clientY };
    mousePosRef.current = { x: clientX, y: clientY };

    if (sectionRef.current) {
      const { width, height, left, top } =
        sectionRef.current.getBoundingClientRect();
      const nx = (clientX - left) / width - 0.5;
      const ny = (clientY - top) / height - 0.5;
      mouseX.set(nx * 100);
      mouseY.set(ny * 100);
    }
  };

  const contentX = useTransform(mouseX, (v) => v * 0.3);
  const contentY = useTransform(mouseY, (v) => v * 0.3);

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];

    // Pause at end of phrase before deleting
    if (!isDeleting && displayText === currentPhrase) {
      const timer = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timer);
    }

    // Pause before typing next phrase
    if (isDeleting && displayText === "") {
      const timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }, 500);
      return () => clearTimeout(timer);
    }

    const typeSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(() => {
      setDisplayText(
        currentPhrase.substring(0, displayText.length + (isDeleting ? -1 : 1)),
      );
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  // Warp Speed Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mousePosRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
      lastMousePosRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = 300;
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star(canvas.width, canvas.height));
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decay speed back to normal
      speedRef.current = speedRef.current > 8 ? speedRef.current * 0.95 : 8;

      const focalLength = canvas.width;

      // Calculate vanishing point based on mouse (parallax)
      const nx = mousePosRef.current.x / canvas.width - 0.5;
      const ny = mousePosRef.current.y / canvas.height - 0.5;

      const vpX = canvas.width / 2 + nx * 100; // maxOffset 100px
      const vpY = canvas.height / 2 + ny * 100;

      for (let i = 0; i < stars.length; i++) {
        stars[i].update(speedRef.current, canvas.width, canvas.height);
        stars[i].draw(ctx, focalLength, vpX, vpY);
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background & Canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-32 right-32 geo-cube z-10 pointer-events-none opacity-60 hidden md:block" />
      <div className="absolute bottom-32 left-32 geo-triangle z-10 pointer-events-none opacity-60 hidden md:block" />
      <div className="absolute top-1/2 left-16 -translate-y-1/2 geo-ring z-10 pointer-events-none opacity-60 hidden md:block" />

      <motion.div
        style={{ x: contentX, y: contentY }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pointer-events-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary/30 glow-primary cursor-default"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-white/90">
            Premium Digital Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.1] tracking-tight mb-6 h-[120px] md:h-[180px] lg:h-[200px]"
        >
          <span className="text-white">Engineering</span> <br />
          <span className="text-gradient-primary">{displayText}</span>
          <span className="animate-pulse text-primary">|</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl text-lg md:text-xl text-white/60 mb-8 font-light"
        >
          We build visionary web applications and robust software solutions for
          global brands that demand unparalleled performance and aesthetics.
        </motion.p>

        {/* Floating Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-wrap justify-center gap-3 mb-10 max-w-3xl"
        >
          {["React", "Node.js", "AWS", "TypeScript", "Python"].map(
            (badge, i) => (
              <motion.div
                key={badge}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-white/70 glass-panel border-white/10 cursor-default"
              >
                {badge}
              </motion.div>
            ),
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <MagneticButton href="#work" primary>
            View Our Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          <MagneticButton href="#contact">Start a Project</MagneticButton>
        </motion.div>
      </motion.div>

      {/* Client Logos Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-24 w-full flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 font-mono">
          Trusted by industry leaders
        </span>
        <div className="flex gap-8 md:gap-16 items-center justify-center px-4 overflow-hidden">
          {["AURA", "SYNAPSE", "LUMINA", "VERTEX", "HALO"].map((logo) => (
            <span
              key={logo}
              className="font-display font-bold text-xl md:text-2xl text-white/30 tracking-widest"
            >
              {logo}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 pointer-events-none z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-primary/80 to-transparent"
        />
      </motion.div>
    </section>
  );
}
