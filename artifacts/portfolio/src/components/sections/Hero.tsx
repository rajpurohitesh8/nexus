import { motion, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/lib/utils";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 1;
    this.vy = (Math.random() - 0.5) * 1;
    this.size = Math.random() * 2 + 0.5;
    const colors = ['#a855f7', '#3b82f6', '#22d3ee']; // purple, blue, cyan
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(canvasWidth: number, canvasHeight: number, mouseX: number, mouseY: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    
    // Mouse repulsion
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 100) {
      this.vx += (dx / dist) * 0.05;
      this.vy += (dy / dist) * 0.05;
    }

    // Velocity limits and decay
    this.vx *= 0.99;
    this.vy *= 0.99;
    
    // Ensure minimal movement
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed < 0.2) {
      this.vx += (Math.random() - 0.5) * 0.1;
      this.vy += (Math.random() - 0.5) * 0.1;
    }

    if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;
    
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function MagneticButton({ children, href, className, primary }: { children: React.ReactNode, href: string, className?: string, primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
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
        className
      )}
    >
      {primary && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <span className={cn("relative flex items-center justify-center gap-2 transition-colors", primary ? "group-hover:text-white" : "")}>
        {children}
      </span>
    </motion.a>
  );
}

const PHRASES = ["Digital Masterpieces", "Enterprise Software", "Global Experiences"];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  // 3D Parallax Mouse Tracking
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: ReactMouseEvent) => {
    const { clientX, clientY } = e;
    mousePosRef.current = { x: clientX, y: clientY };
    
    if (sectionRef.current) {
      const { width, height, left, top } = sectionRef.current.getBoundingClientRect();
      // Normalized from -0.5 to 0.5
      const nx = (clientX - left) / width - 0.5;
      const ny = (clientY - top) / height - 0.5;
      mouseX.set(nx * 100); // Max offset 100px
      mouseY.set(ny * 100);
    }
  };

  const bgX = useTransform(mouseX, (v) => -v * 0.5);
  const bgY = useTransform(mouseY, (v) => -v * 0.5);
  
  const orbsX = useTransform(mouseX, (v) => -v * 1.0);
  const orbsY = useTransform(mouseY, (v) => -v * 1.0);
  
  const canvasX = useTransform(mouseX, (v) => -v * 0.2);
  const canvasY = useTransform(mouseY, (v) => -v * 0.2);
  
  const contentX = useTransform(mouseX, (v) => v * 0.3);
  const contentY = useTransform(mouseY, (v) => v * 0.3);

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && displayText === currentPhrase) {
      typeSpeed = 2000;
      setIsDeleting(true);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      typeSpeed = 500;
    }

    const timer = setTimeout(() => {
      setDisplayText(currentPhrase.substring(0, displayText.length + (isDeleting ? -1 : 1)));
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  // Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height, mx, my);
        particles[i].draw(ctx);
        
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 - distance/600})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
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
        {/* Layer 1: Background Image */}
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-[-5%] w-[110%] h-[110%]">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Abstract Digital Background"
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
        
        {/* Layer 3: Particles */}
        <motion.canvas 
          ref={canvasRef} 
          style={{ x: canvasX, y: canvasY, opacity: 0.6 }}
          className="absolute inset-[-5%] w-[110%] h-[110%]"
        />
        
        {/* Layer 2: Animated Glow Orbs */}
        <motion.div style={{ x: orbsX, y: orbsY }} className="absolute inset-[-10%] w-[120%] h-[120%] pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-[10%] w-[800px] h-[800px] bg-primary/30 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 -right-[10%] w-[600px] h-[600px] bg-accent/30 rounded-full blur-[100px]" 
          />
        </motion.div>
      </div>

      <motion.div 
        style={{ x: contentX, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pointer-events-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary/30 glow-primary cursor-default"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-white/90">Premium Digital Agency</span>
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
          We build visionary web applications and robust software solutions for global brands that demand unparalleled performance and aesthetics.
        </motion.p>

        {/* Floating Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-wrap justify-center gap-3 mb-10 max-w-3xl"
        >
          {['React', 'Node.js', 'AWS', 'TypeScript', 'Python'].map((badge, i) => (
            <motion.div
              key={badge}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-white/70 glass-panel border-white/10 cursor-default"
            >
              {badge}
            </motion.div>
          ))}
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
          <MagneticButton href="#contact">
            Start a Project
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Client Logos Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-24 w-full flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 font-mono">Trusted by industry leaders</span>
        <div className="flex gap-8 md:gap-16 items-center justify-center px-4 overflow-hidden">
          {['AURA', 'SYNAPSE', 'LUMINA', 'VERTEX', 'HALO'].map((logo) => (
            <span key={logo} className="font-display font-bold text-xl md:text-2xl text-white/30 tracking-widest">{logo}</span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 pointer-events-none"
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
