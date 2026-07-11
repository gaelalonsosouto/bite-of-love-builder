import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { bloquesQueryOptions } from "@/lib/content";

type FlameStyle = "realista" | "velas" | "infierno";

type Plume = { left: string; delay: string; scale: number; heightPct: number; duration: string };

const PLUMES_REALISTA: Plume[] = [
  { left: "8%",  delay: "-1.3s", scale: 0.78, heightPct: 62,  duration: "4.7s" },
  { left: "20%", delay: "0.8s",  scale: 0.88, heightPct: 74,  duration: "3.9s" },
  { left: "32%", delay: "-2.1s", scale: 1.02, heightPct: 88,  duration: "5.3s" },
  { left: "44%", delay: "0.35s", scale: 1.08, heightPct: 96,  duration: "3.3s" },
  { left: "56%", delay: "-1.7s", scale: 1.12, heightPct: 100, duration: "4.1s" },
  { left: "68%", delay: "1.15s", scale: 1.0,  heightPct: 90,  duration: "3.6s" },
  { left: "80%", delay: "-0.55s",scale: 0.9,  heightPct: 76,  duration: "4.9s" },
  { left: "92%", delay: "1.4s",  scale: 0.8,  heightPct: 64,  duration: "5.7s" },
];

// "Velas": pocas plumas, finas y altas, movimiento tranquilo.
const PLUMES_VELAS: Plume[] = [
  { left: "15%", delay: "-0.6s", scale: 0.45, heightPct: 70, duration: "6.2s" },
  { left: "35%", delay: "0.9s",  scale: 0.5,  heightPct: 82, duration: "5.5s" },
  { left: "55%", delay: "-1.4s", scale: 0.55, heightPct: 90, duration: "6.8s" },
  { left: "75%", delay: "0.4s",  scale: 0.48, heightPct: 76, duration: "5.9s" },
];

// "Infierno": muchas plumas grandes y agresivas.
const PLUMES_INFIERNO: Plume[] = [
  { left: "5%",  delay: "-0.9s", scale: 1.0,  heightPct: 85,  duration: "2.6s" },
  { left: "14%", delay: "0.3s",  scale: 1.15, heightPct: 100, duration: "2.9s" },
  { left: "24%", delay: "-1.6s", scale: 1.25, heightPct: 108, duration: "2.4s" },
  { left: "34%", delay: "0.55s", scale: 1.3,  heightPct: 115, duration: "3.1s" },
  { left: "44%", delay: "-0.4s", scale: 1.35, heightPct: 120, duration: "2.7s" },
  { left: "54%", delay: "1.0s",  scale: 1.32, heightPct: 118, duration: "2.5s" },
  { left: "64%", delay: "-1.2s", scale: 1.28, heightPct: 112, duration: "3.0s" },
  { left: "74%", delay: "0.7s",  scale: 1.2,  heightPct: 104, duration: "2.6s" },
  { left: "84%", delay: "-0.5s", scale: 1.1,  heightPct: 96,  duration: "2.9s" },
  { left: "94%", delay: "1.3s",  scale: 1.0,  heightPct: 88,  duration: "2.4s" },
];

function pickPlumes(style: FlameStyle): Plume[] {
  if (style === "velas") return PLUMES_VELAS;
  if (style === "infierno") return PLUMES_INFIERNO;
  return PLUMES_REALISTA;
}

function bedGradient(style: FlameStyle): string {
  if (style === "velas") {
    return "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.7 0.18 60 / 0.35) 0%, oklch(0.5 0.16 40 / 0.18) 40%, transparent 80%)";
  }
  if (style === "infierno") {
    return "radial-gradient(ellipse 140% 120% at 50% 100%, oklch(0.75 0.28 30 / 0.85) 0%, oklch(0.55 0.26 20 / 0.6) 30%, oklch(0.35 0.22 15 / 0.35) 60%, transparent 90%)";
  }
  return "radial-gradient(ellipse 120% 100% at 50% 100%, oklch(0.78 0.24 50 / 0.6) 0%, oklch(0.6 0.24 35 / 0.4) 25%, oklch(0.4 0.2 25 / 0.22) 50%, transparent 82%)";
}

function parseNum(v: string | undefined, fallback: number): number {
  if (!v) return fallback;
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Fixed layered "flames" that gradually fade out as the user scrolls down.
 * Uses stacked animated radial gradients + blurred blobs — no image assets.
 * Sits behind content in the carta page (pointer-events: none).
 */
export function FlamesBackground() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const { data: bloques } = useQuery(bloquesQueryOptions);

  const rawStyle = (bloques?.get("efectos_llamas_estilo")?.valor ?? "realista").trim().toLowerCase();
  const style: FlameStyle =
    rawStyle === "velas" || rawStyle === "infierno" ? (rawStyle as FlameStyle) : "realista";
  const speed = Math.max(0.1, parseNum(bloques?.get("efectos_llamas_velocidad")?.valor, 1));
  const endScroll = Math.min(1, Math.max(0.05, parseNum(bloques?.get("efectos_llamas_extincion")?.valor, 0.92)));
  const intensityBase = Math.min(1, Math.max(0, parseNum(bloques?.get("efectos_llamas_intensidad")?.valor, 1)));
  const plumes = pickPlumes(style);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const raw = max > 0 ? window.scrollY / max : 0;
      const p = Math.min(1, Math.max(0, raw / endScroll));
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
  }, [endScroll]);

  const intensity = (1 - progress) * intensityBase; // 1 = full flames, 0 = extinguished

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
          background: bedGradient(style),
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
          {plumes.map((p) => (
            <FlamePlume key={p.left} {...p} speed={speed} />
          ))}
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
  speed,
}: {
  left: string;
  delay: string;
  scale: number;
  heightPct: number;
  duration: string;
  speed: number;
}) {
  // Speed multiplier scales the animation duration (larger speed = shorter duration).
  const durSec = parseFloat(duration) / speed;
  return (
    <div
      className="absolute bottom-0 w-[12vw] flame-plume"
      style={{
        left,
        height: `${heightPct}%`,
        transform: `translateX(-50%) scale(${scale})`,
        // CSS vars propagate to child .flame-core / .flame-mid / .flame-outer
        ["--plume-delay" as string]: delay,
        ["--plume-duration" as string]: `${durSec}s`,
      }}
    >
      <div className="flame-core" />
      <div className="flame-mid" />
      <div className="flame-outer" />
    </div>
  );
}