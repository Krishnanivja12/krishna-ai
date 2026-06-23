"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "@/contexts/accessibility-context";

const layers = [
  {
    className:
      "left-[-12%] top-[8%] h-[22rem] w-[22rem] bg-[radial-gradient(circle_at_center,hsla(var(--primary)/0.14),transparent_68%)]",
    animate: {
      x: [0, 50, -20, 0],
      y: [0, -30, 25, 0],
      scale: [1, 1.08, 0.96, 1],
      opacity: [0.45, 0.7, 0.5, 0.45],
    },
    transition: { duration: 18, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    className:
      "right-[-10%] top-[20%] h-[18rem] w-[18rem] bg-[radial-gradient(circle_at_center,hsla(var(--foreground)/0.08),transparent_72%)]",
    animate: {
      x: [0, -35, 15, 0],
      y: [0, 30, -15, 0],
      scale: [1, 0.92, 1.05, 1],
      opacity: [0.3, 0.55, 0.35, 0.3],
    },
    transition: { duration: 22, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    className:
      "bottom-[-14%] left-[18%] h-[24rem] w-[24rem] bg-[radial-gradient(circle_at_center,hsla(var(--primary)/0.1),transparent_70%)]",
    animate: {
      x: [0, 28, -22, 0],
      y: [0, -18, 20, 0],
      scale: [1, 1.04, 0.94, 1],
      opacity: [0.28, 0.5, 0.34, 0.28],
    },
    transition: { duration: 26, repeat: Infinity, ease: "easeInOut" as const },
  },
];

export function PremiumBackground() {
  const { reducedMotion } = useAccessibility();
  const [showLayers, setShowLayers] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 768px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setShowLayers(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden gpu-layer"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,hsla(var(--background)/0.18))]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(hsla(var(--border)/0.12)_1px,transparent_1px),linear-gradient(90deg,hsla(var(--border)/0.12)_1px,transparent_1px)] [background-size:96px_96px]" />

      {showLayers &&
        layers.map((layer) =>
          reducedMotion ? (
            <div
              key={layer.className}
              className={`absolute rounded-full blur-3xl ${layer.className}`}
            />
          ) : (
            <motion.div
              key={layer.className}
              className={`absolute rounded-full blur-3xl ${layer.className}`}
              animate={layer.animate}
              transition={layer.transition}
            />
          )
        )}
    </div>
  );
}
