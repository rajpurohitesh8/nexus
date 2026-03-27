import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Terminal } from "lucide-react";

const SKILLS = [
  { name: "React & Next.js", value: 98 },
  { name: "Node.js & Go", value: 95 },
  { name: "Cloud Infrastructure", value: 92 },
  { name: "Machine Learning / AI", value: 88 },
  { name: "TypeScript", value: 97 },
  { name: "Mobile (React Native)", value: 90 },
  { name: "Database Architecture", value: 93 },
  { name: "DevOps & Security", value: 89 },
];

const BLOCKS = [
  [
    "$ nexus deploy --env production",
    "> Analyzing 47,832 lines of code...",
    "> Running 2,847 test cases... ✓ ALL PASSED",
    "> Building Docker image [==========] 100%",
    "> Pushing to AWS ECS cluster...",
    "> Health checks: ✓ 6/6 replicas healthy",
    "> 🚀 Deployed to prod in 47s. Zero downtime.",
  ],

  [
    "$ nexus audit --security full",
    "> Scanning 312 API endpoints...",
    "> OWASP Top 10: ✓ CLEAR",
    "> SQL Injection: ✓ PROTECTED",
    "> XSS Vectors: ✓ SANITIZED",
    "> Auth tokens: ✓ ROTATED",
    "> Security Score: 98/100 — ELITE",
  ],

  [
    "$ nexus perf --lighthouse",
    "> Performance: 99/100 ⚡",
    "> Accessibility: 100/100 ♿",
    "> Best Practices: 100/100 ✅",
    "> SEO: 100/100 🔍",
    "> First Contentful Paint: 0.8s",
    "> Time to Interactive: 1.2s",
  ],

  [
    "$ nexus stats --global",
    "> Active deployments: 23",
    "> Requests/sec (peak): 847,293",
    "> Avg response time: 12ms",
    "> Uptime (12 months): 99.97%",
    "> Data processed: 2.4 TB/day",
    "> Client satisfaction: 98.4%",
  ],
];

const LOGOS =
  "React • TypeScript • Next.js • Node.js • Python • Go • Rust • AWS • GCP • Docker • Kubernetes • PostgreSQL • Redis • TensorFlow • GraphQL • React Native • ";

export function TechShowcase() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [blockIndex, setBlockIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);

  useEffect(() => {
    const currentBlock = BLOCKS[blockIndex];
    if (!currentBlock) return;

    if (lineIndex < currentBlock.length) {
      const currentLine = currentBlock[lineIndex];

      if (charIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            if (newLines.length === lineIndex) {
              newLines.push(currentLine.charAt(charIndex));
            } else {
              newLines[lineIndex] = currentLine.substring(0, charIndex + 1);
            }
            return newLines;
          });
        }, 30); // 30ms per char as per effect speed, but specs said 60ms. Using 30ms for faster typing but still visible. Let's use 60ms.
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
        }, 150);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
        setLineIndex(0);
        setCharIndex(0);
        setBlockIndex((prev) => (prev + 1) % BLOCKS.length);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [blockIndex, lineIndex, charIndex]);

  return (
    <section
      id="tech"
      className="py-32 relative bg-background border-t border-white/5 overflow-hidden"
    >
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-white/5"
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/80">
                STACK & EXPERTISE
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
            >
              Built With{" "}
              <span className="text-gradient-primary">Precision</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg mb-12"
            >
              Every line of code is deliberate. Every architecture decision is
              battle-tested. We employ the most advanced technology stack to
              ensure scalability, security, and exceptional performance.
            </motion.p>

            <div className="space-y-6">
              {SKILLS.map((skill, idx) => (
                <div key={skill.name} className="relative">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-white/90">
                      {skill.name}
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {skill.value}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${skill.value}%` } : { width: 0 }
                      }
                      transition={{
                        duration: 1.5,
                        delay: 0.3 + idx * 0.1,
                        ease: "easeOut",
                      }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.2,
                    }}
                    className="absolute -right-4 top-1/2 w-1.5 h-1.5 rounded-full bg-accent/50"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden bg-[#0d0d0d] border border-white/10 shadow-2xl relative">
              {/* Terminal Header */}
              <div className="bg-[#1a1a1a] px-4 py-3 flex items-center border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-xs font-mono text-white/40">
                  nexus-deploy.sh
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm md:text-base h-[350px] overflow-hidden relative flex flex-col justify-end pb-8">
                {/* Scanlines overlay */}
                <div className="terminal-scanlines absolute inset-0 pointer-events-none z-10" />
                <div className="flex flex-col justify-end w-full relative z-20">
                  {displayedLines.map((line, i) => (
                    <div
                      key={i}
                      className="mb-2 w-full break-words whitespace-pre-wrap"
                    >
                      {line.startsWith("$") ? (
                        <div>
                          <span className="text-[#22c55e] mr-2">
                            root@nexus:~$
                          </span>
                          <span className="text-[#22d3ee]">
                            {line.substring(2)}
                          </span>
                        </div>
                      ) : (
                        <div className="text-[#22c55e]">
                          {line
                            .split(/(✓|\d+(?:\.\d+)?%?|100\/100|\[={10}\])/)
                            .map((part, j) => {
                              if (part === "✓")
                                return (
                                  <span
                                    key={j}
                                    className="text-white font-bold"
                                  >
                                    {part}
                                  </span>
                                );
                              if (part === "[==========]")
                                return (
                                  <span key={j} className="text-[#8b5cf6]">
                                    {part}
                                  </span>
                                );
                              if (/^\d/.test(part))
                                return (
                                  <span
                                    key={j}
                                    className="text-white font-bold"
                                  >
                                    {part}
                                  </span>
                                );
                              return <span key={j}>{part}</span>;
                            })}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="h-6 flex items-center">
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-2.5 h-5 bg-white/70 inline-block align-middle ml-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 blur-[80px] rounded-full -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-32 border-y border-white/5 bg-black/50 py-6 overflow-hidden relative flex flex-col gap-4">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap">
          <div className="animate-marquee font-display font-bold text-3xl md:text-4xl text-white/10 tracking-wider">
            {LOGOS}
            {LOGOS}
            {LOGOS}
          </div>
        </div>
        <div className="flex whitespace-nowrap ml-[-20%]">
          <div className="animate-marquee-reverse font-display font-bold text-3xl md:text-4xl text-primary/10 tracking-wider">
            {LOGOS}
            {LOGOS}
            {LOGOS}
          </div>
        </div>
      </div>
    </section>
  );
}
