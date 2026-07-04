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
      // Flames stay lit almost the whole page — fully extinguished just
      // before hitting the footer (around ~92% scrolled).
      const raw = max > 0 ? window.scrollY / max : 0;
      const start = 0.55; // start dimming at 55%
      const end = 0.92;   // fully out just before the footer
      const p =
        raw <= start
          ? 0
          : raw >= end
          ? 1
          : (raw - start) / (end - start);
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
      {/* Wide grill bed of embers along the bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 100%, oklch(0.78 0.24 50 / 0.75) 0%, oklch(0.6 0.24 35 / 0.55) 20%, oklch(0.4 0.2 25 / 0.35) 45%, transparent 80%)",
          filter: `blur(${6 + progress * 10}px) saturate(${1.3 - progress * 0.6})`,
        }}
      />
      {/* Tall, sharp flame tongues — start near mid-screen and lower as you scroll */}
      {reduce ? null : (
        <div
          className="absolute inset-x-0 bottom-0 h-[60vh] pointer-events-none"
          style={{
            transform: `translateY(${progress * 20}vh) scaleY(${1 - progress * 0.4})`,
            transformOrigin: "50% 100%",
          }}
        >
          <FlamePlume left="8%"  delay="0s"    scale={1.0} />
          <FlamePlume left="20%" delay="0.3s"  scale={0.9} />
          <FlamePlume left="32%" delay="0.7s"  scale={1.1} />
          <FlamePlume left="44%" delay="0.15s" scale={0.95} />
          <FlamePlume left="56%" delay="0.5s"  scale={1.15} />
          <FlamePlume left="68%" delay="0.2s"  scale={0.9} />
          <FlamePlume left="80%" delay="0.6s"  scale={1.05} />
          <FlamePlume left="92%" delay="0.35s" scale={0.95} />
        </div>
      )}
      {/* Hot coal glow strip at the very bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            "linear-gradient(to top, oklch(0.72 0.26 45 / 0.6), oklch(0.5 0.22 30 / 0.25) 50%, transparent)",
          mixBlendMode: "screen",
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
      className="absolute bottom-0 w-[12vw] h-full flame-plume"
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