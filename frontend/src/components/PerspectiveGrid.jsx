import { useEffect, useRef } from "react";

export function PerspectiveGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let offset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200; // Fixed height
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const vpX = w / 2;
      const vpY = -50; // Vanishing point above canvas

      offset = (offset + 1) % 20;

      ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
      ctx.lineWidth = 1;

      // Draw vertical lines fanning out
      ctx.beginPath();
      const numVerticals = 30;
      for (let i = -numVerticals; i <= numVerticals; i++) {
        const xBottom = vpX + i * 60;
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(xBottom, h);
      }
      ctx.stroke();

      // Draw horizontal lines with perspective compression
      ctx.beginPath();
      for (let i = 0; i < 20; i++) {
        const yDist = Math.pow(i + offset / 20, 1.5) * 2; // Perspective math
        if (yDist > h) break;
        const y = vpY + yDist;
        if (y > 0) {
          ctx.globalAlpha = Math.min(1, y / h + 0.15); // Fade out towards top
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Glow near bottom
      const gradient = ctx.createLinearGradient(0, h - 50, 0, h);
      gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
      gradient.addColorStop(1, "rgba(139, 92, 246, 0.15)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, h - 50, w, 50);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[200px] pointer-events-none block"
      style={{ background: "transparent" }}
    />
  );
}
