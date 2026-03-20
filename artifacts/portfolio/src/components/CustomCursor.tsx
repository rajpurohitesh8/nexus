import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useSpring(0, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (window.innerWidth < 768) { setIsMobile(true); return; }
    
    const moveCursor = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button'));
    };
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    document.body.style.cursor = 'none';
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      document.body.style.cursor = '';
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-[9999] pointer-events-none" style={{ willChange: 'transform' }} />
      <motion.div
        style={{ x: mouseX, y: mouseY, willChange: 'transform' }}
        animate={{ scale: isHovering ? 2 : 1, backgroundColor: isHovering ? 'rgba(139,92,246,0.15)' : 'transparent' }}
        className="fixed top-0 left-0 w-8 h-8 border border-primary/60 rounded-full z-[9998] pointer-events-none"
      />
    </>
  );
}
