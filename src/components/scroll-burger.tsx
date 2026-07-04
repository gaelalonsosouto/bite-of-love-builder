import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLocation } from "@tanstack/react-router";
import burgerAsset from "@/assets/smash-burger.png.asset.json";

/**
 * Fixed burger that drops in from above with an elegant framer-motion spring
 * bounce, sits with a soft blurred backdrop and floating sparkle particles,
 * and rotates counterclockwise as the user scrolls.
 */
const BURGER_URL = burgerAsset.url;

export function ScrollBurger() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const [entryKey, setEntryKey] = useState(0);
  useEffect(() => {
    if (location.pathname === "/") setEntryKey((k) => k + 1);
  }, [location.pathname]);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const rotZ = -25 - progress * 540;
  const scale = 0.9 + Math.sin(progress * Math.PI) * 0.15;

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 380,
        y: (Math.random() - 0.5) * 380,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 4,
      })),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    >
      <div
        className="absolute top-1/2 right-[-10%] w-[60vw] h-[60vw] -translate-y-1/2 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.22 30 / 0.55), transparent 60%)",
        }}
      />
      <motion.div
        key={entryKey}
        initial={reduce ? false : { y: "-120vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 90,
                damping: 11,
                mass: 1.2,
                delay: 0.25,
              }
        }
        className="absolute top-1/2 right-[8%] md:right-[12%] w-[70vw] max-w-[460px] md:w-[36vw] md:max-w-[560px]"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.22 30 / 0.35) 0%, oklch(0.55 0.22 30 / 0.12) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background:
                  "radial-gradient(circle, oklch(0.98 0.12 90 / 0.95), oklch(0.8 0.2 55 / 0) 70%)",
                boxShadow: "0 0 8px oklch(0.9 0.2 70 / 0.9)",
              }}
              animate={
                reduce
                  ? undefined
                  : {
                      x: [p.x - 20, p.x + 20, p.x - 20],
                      y: [p.y + 20, p.y - 20, p.y + 20],
                      opacity: [0, 1, 0],
                      scale: [0.6, 1.1, 0.6],
                    }
              }
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <motion.img
          src={BURGER_URL}
          alt=""
          style={{
            transform: `translate(-50%, -50%) rotate(${rotZ}deg) scale(${scale})`,
            willChange: "transform",
            filter:
              "drop-shadow(0 40px 60px oklch(0 0 0 / 0.8)) drop-shadow(0 0 80px oklch(0.6 0.24 45 / 0.35))",
          }}
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="block w-full relative"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:via-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80" />
    </div>
  );
}