import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useLocation } from "@tanstack/react-router";
import burgerAsset from "@/assets/smash-burger.png.asset.json";

/**
 * Fixed 3D-rotating burger that spins in place as the user scrolls, inspired
 * by the Black Cube website's rotating hero object. Perspective + rotateY +
 * rotateX + rotateZ give a coin-like tumble; no longer falls down the page.
 */
const BURGER_URL = burgerAsset.url;

export function ScrollBurger() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  // Re-key on every navigation to /, so the fall-in replays every time the
  // user lands on or returns to the home page.
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

  // Stays roughly centered on the right. Rotates on multiple axes with scroll.
  const rotY = progress * 720;   // two full spins around vertical axis
  const rotX = Math.sin(progress * Math.PI * 2) * 25;
  const rotZ = progress * 180 - 30;
  const scale = 0.85 + Math.sin(progress * Math.PI) * 0.25;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {/* brasa halo that pulses with the burger */}
      <div
        className="absolute top-1/2 right-[-10%] w-[60vw] h-[60vw] -translate-y-1/2 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.22 30 / 0.55), transparent 60%)",
        }}
      />
      <img
        key={entryKey}
        src={BURGER_URL}
        alt=""
        style={{
          transform: `translate(-50%, -50%) rotateY(${rotY}deg) rotateX(${rotX}deg) rotateZ(${rotZ}deg) scale(${scale})`,
          transformStyle: "preserve-3d",
          willChange: "transform",
          filter:
            "drop-shadow(0 40px 60px oklch(0 0 0 / 0.8)) drop-shadow(0 0 80px oklch(0.6 0.24 45 / 0.35))",
        }}
        className="absolute top-1/2 right-[8%] md:right-[12%] w-[70vw] max-w-[460px] md:w-[36vw] md:max-w-[560px] burger-drop-in"
      />
      {/* vignette to keep contrast for content */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:via-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80" />
    </div>
  );
}