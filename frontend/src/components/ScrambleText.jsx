import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const CHARS = "!<>-_\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function ScrambleText({ text, className, as: Tag = "span" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const [displayText, setDisplayText] = useState(() =>
    text
      .split("")
      .map((char) =>
        char === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)],
      )
      .join(""),
  );

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const queue = text.split("").map((char) => ({
      char,
      isSpace: char === " ",
    }));

    const update = () => {
      let complete = true;
      let newText = "";

      for (let i = 0; i < queue.length; i++) {
        if (queue[i].isSpace) {
          newText += " ";
          continue;
        }

        const lockFrame = i * 3; // Lock a character every 3 frames (~50ms)
        if (frame >= lockFrame) {
          newText += queue[i].char;
        } else {
          complete = false;
          newText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(newText);
      frame++;

      if (!complete) {
        requestAnimationFrame(update);
      }
    };

    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [inView, text]);

  const Comp = Tag;
  return (
    <Comp ref={ref} className={cn("inline-block", className)}>
      {displayText}
    </Comp>
  );
}
