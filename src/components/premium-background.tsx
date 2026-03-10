"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

// ─── Particle Type ───────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseSize: number;
}

// ─── Configuration ───────────────────────────────────────────
const CONFIG = {
  desktop: { count: 90, connectionDist: 180 },
  mobile: { count: 30, connectionDist: 130 },
  baseDepth: 300,
  nodeOpacity: 0.7,       // Strong enough to see individual nodes
  lineOpacity: 0.3,       // Clearly visible connection lines
  lineWidth: 0.8,
  speed: 0.2,
  parallaxStrength: 45,
  canvasOpacity: 0.18,    // Subtle but visible — dial down if too much
} as const;

// ─── Helper: parse CSS variable to "H, S%, L%" for Canvas ───
function getHSLFromCSSVar(varName: string): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  if (!raw) return "0, 0%, 100%";
  // CSS vars are stored as "H S% L%" (space-separated), Canvas hsla() needs commas
  const parts = raw.split(/\s+/);
  if (parts.length >= 3) {
    return `${parts[0]}, ${parts[1]}, ${parts[2]}`;
  }
  return raw;
}

// ─── Component ───────────────────────────────────────────────
export function PremiumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  // Mouse tracking with framer-motion springs
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springX = useSpring(rawMouseX, { stiffness: 30, damping: 20, mass: 1.2 });
  const springY = useSpring(rawMouseY, { stiffness: 30, damping: 20, mass: 1.2 });

  // Ensure we only render on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Resize handler ──────────────────────────────────────
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  // ─── Initialize particles ────────────────────────────────
  const initParticles = useCallback(() => {
    const isMob = window.innerWidth < 768;
    const cfg = isMob ? CONFIG.mobile : CONFIG.desktop;
    const w = window.innerWidth;
    const h = window.innerHeight;

    particlesRef.current = Array.from({ length: cfg.count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * CONFIG.baseDepth,
      vx: (Math.random() - 0.5) * CONFIG.speed,
      vy: (Math.random() - 0.5) * CONFIG.speed,
      vz: (Math.random() - 0.5) * CONFIG.speed * 0.5,
      baseSize: Math.random() * 2.5 + 1.5,
    }));
  }, []);

  // ─── Main animation loop ─────────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    handleResize();
    initParticles();

    window.addEventListener("resize", () => {
      handleResize();
      initParticles();
    });

    // Mouse listener (desktop only)
    const onMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      rawMouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawMouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouseMove);

    // ─── Render Loop ────────────────────────────────────────
    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Get theme-aware color every frame for instant light/dark transitions
      const color = getHSLFromCSSVar("--foreground");

      const pX = springX.get() * CONFIG.parallaxStrength;
      const pY = springY.get() * CONFIG.parallaxStrength;
      const particles = particlesRef.current;
      const isMob = w < 768;
      const maxDist = isMob ? CONFIG.mobile.connectionDist : CONFIG.desktop.connectionDist;

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Soft wrap around the edges instead of bouncing
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;
        if (p.z < 0) p.z = CONFIG.baseDepth;
        if (p.z > CONFIG.baseDepth) p.z = 0;
      }

      // Pre-project all particle positions
      const projected = particles.map((p) => {
        const scale = CONFIG.baseDepth / (CONFIG.baseDepth + p.z);
        return {
          x: (p.x - w / 2) * scale + w / 2 + pX * scale,
          y: (p.y - h / 2) * scale + h / 2 + pY * scale,
          scale,
          size: p.baseSize * scale,
        };
      });

      // Draw connections first (behind nodes)
      ctx.lineWidth = CONFIG.lineWidth;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const fade = 1 - dist / maxDist;
            const avgScale = (a.scale + b.scale) / 2;
            const alpha = fade * avgScale * CONFIG.lineOpacity;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${color}, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const pt of projected) {
        const alpha = pt.scale * CONFIG.nodeOpacity;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color}, ${alpha})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mounted, handleResize, initParticles, rawMouseX, rawMouseY, springX, springY]);

  // Don't render anything on the server
  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          opacity: CONFIG.canvasOpacity,
        }}
      />
    </div>
  );
}
