import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote: "NEXUS transformed our fintech platform into an industry benchmark. The engineering quality is second to none.",
    author: "Sarah Chen",
    role: "CTO at Aura Financial",
    initials: "SC"
  },
  {
    quote: "The AI integration they built reduced our processing time by 80%. Absolutely extraordinary team.",
    author: "Marcus Webb",
    role: "CEO at Synapse AI",
    initials: "MW"
  },
  {
    quote: "From concept to launch in 8 weeks. The design blew our board away. Unmatched speed and quality.",
    author: "Priya Sharma",
    role: "VP Product at Nova Health",
    initials: "PS"
  },
  {
    quote: "Our conversion rate increased 340% after NEXUS rebuilt our e-commerce platform. ROI was immediate.",
    author: "Daniel Park",
    role: "CMO at Lumina Commerce",
    initials: "DP"
  },
  {
    quote: "They don't just build software — they build competitive moats. A true strategic technology partner.",
    author: "Elena Vasquez",
    role: "Founder at Vertex Analytics",
    initials: "EV"
  },
  {
    quote: "The Kubernetes infrastructure they designed handles 10x our traffic with zero downtime. Phenomenal.",
    author: "James Liu",
    role: "CTO at Halo Logistics",
    initials: "JL"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const getIndices = () => {
    const prev = (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    const next = (currentIndex + 1) % TESTIMONIALS.length;
    return [prev, currentIndex, next];
  };

  const [prevIdx, currIdx, nextIdx] = getIndices();

  return (
    <section id="testimonials" className="py-32 relative bg-background border-y border-white/5 overflow-hidden perspective-[1000px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
          >
            Client <span className="text-gradient-primary">Voices</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            Don't take our word for it
          </motion.p>
        </div>

        <div 
          className="relative h-[450px] md:h-[350px] flex items-center justify-center max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 md:-left-12 z-30 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-white hover:border-primary transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 md:-right-12 z-30 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-white hover:border-primary transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <AnimatePresence mode="popLayout">
            {/* Previous Card */}
            <motion.div
              key={`prev-${prevIdx}`}
              initial={{ opacity: 0, x: -100, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 0.6, x: "-50%", scale: 0.85, rotateY: 15, zIndex: 10 }}
              exit={{ opacity: 0, x: -200, scale: 0.8, rotateY: 20 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-[300px] md:w-[450px] glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center justify-center hidden sm:flex"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-lg font-display text-white mb-6 line-clamp-3">"{TESTIMONIALS[prevIdx].quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-white font-bold text-sm">
                  {TESTIMONIALS[prevIdx].initials}
                </div>
                <div className="text-left text-sm">
                  <div className="font-bold text-white">{TESTIMONIALS[prevIdx].author}</div>
                </div>
              </div>
            </motion.div>

            {/* Current Card */}
            <motion.div
              key={`curr-${currIdx}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0, zIndex: 20 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-full sm:w-[400px] md:w-[600px] glass-panel p-8 md:p-12 rounded-3xl border border-primary/40 glow-primary flex flex-col items-center text-center justify-center bg-[#050505]/80"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Quote className="w-12 h-12 text-primary/40 mb-6 absolute top-8 left-8" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-display font-medium text-white mb-8 leading-tight">
                "{TESTIMONIALS[currIdx].quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  {TESTIMONIALS[currIdx].initials}
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">{TESTIMONIALS[currIdx].author}</div>
                  <div className="text-sm text-primary">{TESTIMONIALS[currIdx].role}</div>
                </div>
              </div>
            </motion.div>

            {/* Next Card */}
            <motion.div
              key={`next-${nextIdx}`}
              initial={{ opacity: 0, x: 100, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 0.6, x: "50%", scale: 0.85, rotateY: -15, zIndex: 10 }}
              exit={{ opacity: 0, x: 200, scale: 0.8, rotateY: -20 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-[300px] md:w-[450px] glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center justify-center hidden sm:flex"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-lg font-display text-white mb-6 line-clamp-3">"{TESTIMONIALS[nextIdx].quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-white font-bold text-sm">
                  {TESTIMONIALS[nextIdx].initials}
                </div>
                <div className="text-left text-sm">
                  <div className="font-bold text-white">{TESTIMONIALS[nextIdx].author}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === idx ? "w-8 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
