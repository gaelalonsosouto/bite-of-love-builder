import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Fixed layered "flames" that gradually fade out as the user scrolls down.
 * Uses stacked animated radial gradients + blurred blobs — no image assets.
 * Sits behind content in the carta page (pointer-events: none).
 */
export function FlamesBackground() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      // Extinguish more aggressively — fully out by ~40% of the page
      const p = max > 0 ? Math.min(1, (window.scrollY / max) * 2.5) : 0;
      setProgress(p);
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
  }, []);

  const intensity = 1 - progress; // 1 = full flames, 0 = extinguished

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
      style={{ opacity: intensity }}
    >
      {/* Ember glow at the bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.68 0.24 45 / 0.55) 0%, oklch(0.55 0.22 27 / 0.35) 25%, oklch(0.25 0.12 25 / 0.2) 50%, transparent 75%)",
          filter: `blur(${8 + progress * 8}px)`,
        }}
      />
      {/* Individual flame plumes */}
      {reduce ? null : (
        <>
          <FlamePlume left="12%" delay="0s" scale={1} />
          <FlamePlume left="28%" delay="0.4s" scale={0.85} />
          <FlamePlume left="46%" delay="0.15s" scale={1.15} />
          <FlamePlume left="62%" delay="0.6s" scale={0.9} />
          <FlamePlume left="82%" delay="0.25s" scale={1.05} />
        </>
      )}
      {/* Subtle heat haze at the very bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(to top, oklch(0.7 0.2 55 / 0.35), transparent)",
        }}
      />
    </div>
  );
}

function FlamePlume({
  left,
  delay,
  scale,
}: {
  left: string;
  delay: string;
  scale: number;
}) {
  return (
    <div
      className="absolute bottom-[-6vh] w-[22vw] h-[55vh] flame-plume"
      style={{
        left,
        transform: `translateX(-50%) scale(${scale})`,
        animationDelay: delay,
      }}
    >
      <div className="flame-core" />
      <div className="flame-mid" />
      <div className="flame-outer" />
    </div>
  );
}