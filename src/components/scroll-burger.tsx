import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useLocation } from "@tanstack/react-router";
import burgerAsset from "@/assets/smash-burger.png";

/**
 * Fixed 3D-rotating burger that spins in place as the user scrolls, inspired
 * by the Black Cube website's rotating hero object. Perspective + rotateY +
 * rotateX + rotateZ give a coin-like tumble; no longer falls down the page.
 */
const BURGER_URL = burgerAsset;

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

  // 2D rotation only — counterclockwise as the user scrolls. No perspective
  // distortion so the burger keeps its shape.
  // Start tilted at -25° from vertical (a bit to the left of the normal) and
  // rotate counterclockwise as the user scrolls.
  const rotZ = -25 - progress * 540;
  const scale = 0.9 + Math.sin(progress * Math.PI) * 0.15;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    >
      {/* brasa halo that pulses with the burger */}
      <div
        className="absolute top-1/2 right-[-10%] w-[60vw] h-[60vw] -translate-y-1/2 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.22 30 / 0.55), transparent 60%)",
        }}
      />
      <div
        key={entryKey}
        className="absolute top-1/2 left-1/2 md:left-auto md:right-[12%] w-[70vw] max-w-[460px] md:w-[36vw] md:max-w-[560px] burger-drop-in"
      >
        <img
          src={BURGER_URL}
          alt=""
          style={{
            transform: `translate(-50%, -50%) rotate(${rotZ}deg) scale(${scale})`,
            willChange: "transform",
            filter:
              "drop-shadow(0 40px 60px oklch(0 0 0 / 0.8)) drop-shadow(0 0 80px oklch(0.6 0.24 45 / 0.35))",
          }}
          className="block w-full"
        />
      </div>
      {/* vignette to keep contrast for content */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:via-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80" />
    </div>
  );
}