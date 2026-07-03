import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Full-page burger that lives fixed at the right side of the viewport and
 * drops from the top of the page to the footer as the user scrolls.
 * Uses a realistic hotlinked photo (Unsplash, non-AI) — deliberately kept
 * as a single image, not composed of separated ingredients.
 */
const BURGER_URL =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80";

export function ScrollBurger() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

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

  // Drop from -10% viewport height to 70% viewport height, gently rotate.
  const topPct = -10 + progress * 80;
  const rot = -18 + progress * 36;
  const scale = 0.9 + Math.sin(progress * Math.PI) * 0.15;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    >
      {/* red brasa halo that follows the burger */}
      <motion.div
        style={{ top: `${topPct + 15}%` }}
        className="absolute right-[-8%] w-[60vw] h-[60vw] rounded-full blur-3xl opacity-40"
        animate={{
          background: [
            "radial-gradient(circle, oklch(0.55 0.22 27 / 0.5), transparent 60%)",
            "radial-gradient(circle, oklch(0.6 0.22 30 / 0.55), transparent 60%)",
            "radial-gradient(circle, oklch(0.55 0.22 27 / 0.5), transparent 60%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.img
        src={BURGER_URL}
        alt=""
        style={{
          top: `${topPct}%`,
          transform: `translateX(-50%) rotate(${rot}deg) scale(${scale})`,
        }}
        className="absolute right-[-6%] md:right-[2%] w-[70vw] max-w-[520px] md:w-[38vw] md:max-w-[560px] rounded-full shadow-[0_40px_100px_-20px_oklch(0_0_0/0.9)]"
      />
      {/* vignette to keep contrast for content */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:via-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80" />
    </div>
  );
}