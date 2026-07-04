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
      // Progress tracks the scroll linearly so flames descend smoothly
      // and are fully extinguished right before the footer (~92%).
      const raw = max > 0 ? window.scrollY / max : 0;
      const end = 0.92;
      const p = Math.min(1, Math.max(0, raw / end));
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
            "radial-gradient(ellipse 120% 100% at 50% 100%, oklch(0.78 0.24 50 / 0.6) 0%, oklch(0.6 0.24 35 / 0.4) 25%, oklch(0.4 0.2 25 / 0.22) 50%, transparent 82%)",
          filter: `blur(${18 + progress * 14}px) saturate(${1.2 - progress * 0.5})`,
          transform: `translateY(${progress * 30}vh)`,
        }}
      />
      {/* Tall, sharp flame tongues — start near mid-screen and lower as you scroll */}
      {reduce ? null : (
        <div
          className="absolute inset-x-0 bottom-0 h-[60vh] pointer-events-none"
          style={{
            transform: `translateY(${progress * 55}vh) scaleY(${1 - progress * 0.55})`,
            transformOrigin: "50% 100%",
            filter: `blur(${4 + progress * 8}px)`,
          }}
        >
          {/* Side plumes sit lower; center plumes stand tallest. Height + delay + duration vary per plume so nothing flickers in sync. */}
          <FlamePlume left="8%"  delay="-0.4s"  scale={0.78} heightPct={62} duration="2.1s" />
          <FlamePlume left="20%" delay="0.35s"  scale={0.88} heightPct={74} duration="1.55s" />
          <FlamePlume left="32%" delay="-0.9s"  scale={1.02} heightPct={88} duration="1.8s" />
          <FlamePlume left="44%" delay="0.15s"  scale={1.08} heightPct={96} duration="1.25s" />
          <FlamePlume left="56%" delay="-0.55s" scale={1.12} heightPct={100} duration="1.9s" />
          <FlamePlume left="68%" delay="0.5s"   scale={1.0}  heightPct={90} duration="1.4s" />
          <FlamePlume left="80%" delay="-0.25s" scale={0.9}  heightPct={76} duration="1.65s" />
          <FlamePlume left="92%" delay="0.6s"   scale={0.8}  heightPct={64} duration="2.2s" />
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
  heightPct,
  duration,
}: {
  left: string;
  delay: string;
  scale: number;
  heightPct: number;
  duration: string;
}) {
  return (
    <div
      className="absolute bottom-0 w-[12vw] flame-plume"
      style={{
        left,
        height: `${heightPct}%`,
        transform: `translateX(-50%) scale(${scale})`,
        animationDelay: delay,
        animationDuration: duration,
      }}
    >
      <div className="flame-core" />
      <div className="flame-mid" />
      <div className="flame-outer" />
    </div>
  );
}