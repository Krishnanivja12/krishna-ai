"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseSize: number;
}

interface Explosion {
  x: number;          // Screen-projected X
  y: number;          // Screen-projected Y
  progress: number;   // 0 → 1 over lifetime
  maxRadius: number;  // How far the shockwave ring expands
  particleIndex: number; // Which particle exploded
}

// ─── Configuration ───────────────────────────────────────────
const CONFIG = {
  desktop: { count: 90, connectionDist: 180 },
  mobile: { count: 30, connectionDist: 130 },
  baseDepth: 300,
  nodeOpacity: 0.7,
  lineOpacity: 0.3,
  lineWidth: 0.8,
  speed: 0.2,
  parallaxStrength: 45,
  canvasOpacity: 0.18,

  // Explosion settings
  explosion: {
    minDelay: 3000,       // Min ms between explosions
    maxDelay: 8000,       // Max ms between explosions
    duration: 1200,       // How long the explosion animation lasts (ms)
    maxRadius: 120,       // Max shockwave ring radius
    flashIntensity: 0.6,  // Peak glow opacity
    scatterForce: 3.5,    // How hard nearby particles get pushed
    scatterRadius: 160,   // How far the push reaches (px in world space)
  },
} as const;

// ─── Helper: parse CSS variable to "H, S%, L%" for Canvas ───
function getHSLFromCSSVar(varName: string): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  if (!raw) return "0, 0%, 100%";
  const parts = raw.split(/\s+/);
  if (parts.length >= 3) {
    return `${parts[0]}, ${parts[1]}, ${parts[2]}`;
  }
  return raw;
}

// ─── Easing helpers ──────────────────────────────────────────
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// ─── Component ───────────────────────────────────────────────
export function PremiumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const explosionsRef = useRef<Explosion[]>([]);
  const animFrameRef = useRef<number>(0);
  const explosionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  // Mouse tracking with framer-motion springs
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springX = useSpring(rawMouseX, { stiffness: 30, damping: 20, mass: 1.2 });
  const springY = useSpring(rawMouseY, { stiffness: 30, damping: 20, mass: 1.2 });

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

  // ─── Explosion scheduling ────────────────────────────────
  const scheduleNextExplosion = useCallback(() => {
    const { minDelay, maxDelay } = CONFIG.explosion;
    const delay = minDelay + Math.random() * (maxDelay - minDelay);

    explosionTimerRef.current = setTimeout(() => {
      const particles = particlesRef.current;
      if (particles.length === 0) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Pick a random particle to explode
      const idx = Math.floor(Math.random() * particles.length);
      const p = particles[idx];

      // Project its position for the visual explosion center
      const scale = CONFIG.baseDepth / (CONFIG.baseDepth + p.z);
      const projX = (p.x - w / 2) * scale + w / 2;
      const projY = (p.y - h / 2) * scale + h / 2;

      // Create the explosion
      explosionsRef.current.push({
        x: projX,
        y: projY,
        progress: 0,
        maxRadius: CONFIG.explosion.maxRadius * (0.7 + Math.random() * 0.6),
        particleIndex: idx,
      });

      // Scatter nearby particles away from the explosion point
      const { scatterForce, scatterRadius } = CONFIG.explosion;
      for (let i = 0; i < particles.length; i++) {
        if (i === idx) continue;
        const other = particles[i];
        const dx = other.x - p.x;
        const dy = other.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < scatterRadius && dist > 0) {
          const force = (1 - dist / scatterRadius) * scatterForce;
          const angle = Math.atan2(dy, dx);
          other.vx += Math.cos(angle) * force;
          other.vy += Math.sin(angle) * force;
        }
      }

      // Respawn the exploded particle at a new random position
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      p.z = Math.random() * CONFIG.baseDepth;
      p.vx = (Math.random() - 0.5) * CONFIG.speed;
      p.vy = (Math.random() - 0.5) * CONFIG.speed;
      p.vz = (Math.random() - 0.5) * CONFIG.speed * 0.5;
      p.baseSize = Math.random() * 2.5 + 1.5;

      // Schedule the next one
      scheduleNextExplosion();
    }, delay);
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

    // Start explosion cycle
    scheduleNextExplosion();

    const onResize = () => {
      handleResize();
      initParticles();
    };
    window.addEventListener("resize", onResize);

    // Mouse listener (desktop only)
    const onMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      rawMouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawMouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouseMove);

    let lastTime = performance.now();

    // ─── Render Loop ────────────────────────────────────────
    const render = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const color = getHSLFromCSSVar("--foreground");

      const pX = springX.get() * CONFIG.parallaxStrength;
      const pY = springY.get() * CONFIG.parallaxStrength;
      const particles = particlesRef.current;
      const isMob = w < 768;
      const maxDist = isMob ? CONFIG.mobile.connectionDist : CONFIG.desktop.connectionDist;

      // ─── Dampen scattered velocities back to normal ───────
      const dampFactor = Math.pow(0.97, dt / 16); // framerate-independent damping
      for (const p of particles) {
        // Gradually reduce velocity back toward original speed
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed > CONFIG.speed * 1.5) {
          p.vx *= dampFactor;
          p.vy *= dampFactor;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

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

      // ─── Draw connections ─────────────────────────────────
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

      // ─── Draw nodes ───────────────────────────────────────
      for (const pt of projected) {
        const alpha = pt.scale * CONFIG.nodeOpacity;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color}, ${alpha})`;
        ctx.fill();
      }

      // ─── Draw & update explosions ─────────────────────────
      const explosions = explosionsRef.current;
      for (let i = explosions.length - 1; i >= 0; i--) {
        const exp = explosions[i];

        // Advance progress
        exp.progress += dt / CONFIG.explosion.duration;
        if (exp.progress >= 1) {
          explosions.splice(i, 1);
          continue;
        }

        const t = exp.progress;
        const easedRadius = easeOutQuart(t) * exp.maxRadius;
        const fadeOut = 1 - easeOutCubic(t);

        // 1) Central glow flash — bright at start, fades out
        const glowRadius = easedRadius * 0.6;
        const glowAlpha = fadeOut * CONFIG.explosion.flashIntensity;
        const gradient = ctx.createRadialGradient(
          exp.x, exp.y, 0,
          exp.x, exp.y, glowRadius
        );
        gradient.addColorStop(0, `hsla(${color}, ${glowAlpha})`);
        gradient.addColorStop(0.4, `hsla(${color}, ${glowAlpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${color}, 0)`);

        ctx.beginPath();
        ctx.arc(exp.x, exp.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // 2) Expanding shockwave ring
        const ringAlpha = fadeOut * 0.35;
        const ringWidth = 1.5 + (1 - fadeOut) * 1; // Gets thinner as it fades
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, easedRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${color}, ${ringAlpha})`;
        ctx.lineWidth = ringWidth;
        ctx.stroke();

        // 3) Scatter spark particles (little dots flying outward from center)
        const sparkCount = 6;
        for (let s = 0; s < sparkCount; s++) {
          const angle = (s / sparkCount) * Math.PI * 2 + t * 0.5; // Slow rotation
          const sparkDist = easedRadius * (0.5 + Math.random() * 0.5);
          const sparkX = exp.x + Math.cos(angle) * sparkDist;
          const sparkY = exp.y + Math.sin(angle) * sparkDist;
          const sparkAlpha = fadeOut * 0.5;
          const sparkSize = (1 - t) * 1.5;

          ctx.beginPath();
          ctx.arc(sparkX, sparkY, sparkSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${color}, ${sparkAlpha})`;
          ctx.fill();
        }
      }

      // Reset line width for next frame
      ctx.lineWidth = CONFIG.lineWidth;

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (explosionTimerRef.current) clearTimeout(explosionTimerRef.current);
    };
  }, [mounted, handleResize, initParticles, scheduleNextExplosion, rawMouseX, rawMouseY, springX, springY]);

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
