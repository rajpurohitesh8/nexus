import { cn } from "@/lib/utils";

export function MorphingBlob({ className }: { className?: string }) {
  return (
    <div className={cn("absolute pointer-events-none w-[600px] h-[600px] md:w-[800px] md:h-[800px]", className)}>
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="blobGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"/>
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <path fill="url(#blobGrad)">
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M200,80 C270,80 340,120 360,200 C380,280 340,360 260,380 C180,400 100,360 80,280 C60,200 100,80 200,80;
              M200,60 C290,70 370,140 370,220 C370,300 300,380 210,390 C120,400 60,320 60,230 C60,140 110,50 200,60;
              M200,90 C260,70 340,110 360,190 C385,280 330,375 250,385 C160,395 80,330 70,250 C55,160 120,115 200,90;
              M200,80 C270,80 340,120 360,200 C380,280 340,360 260,380 C180,400 100,360 80,280 C60,200 100,80 200,80
            "
          />
        </path>
      </svg>
    </div>
  );
}
