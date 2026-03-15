"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { useAccessibility } from "@/contexts/accessibility-context"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  glowRadius?: number
  glowOpacity?: number
  [key: string]: any
}

export function GlowCard({
  children,
  className = "",
  as: Component = "div",
  glowRadius = 350,
  glowOpacity = 0.4,
  ...rest
}: GlowCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const { reducedMotion } = useAccessibility()

  // Physics-based mouse tracking
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const springConfig = { stiffness: 150, damping: 25, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const check = () => {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
      setIsDesktop(mq.matches && window.innerWidth > 768)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }, [mouseX, mouseY])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    mouseX.set(-1000)
    mouseY.set(-1000)
  }, [mouseX, mouseY])

  const showGlow = isDesktop && !reducedMotion
  const borderBackground = useMotionTemplate`radial-gradient(${glowRadius}px circle at ${smoothX}px ${smoothY}px, hsla(var(--primary) / ${glowOpacity}), transparent 80%)`
  const ambientBackground = useMotionTemplate`radial-gradient(${glowRadius / 1.5}px circle at ${smoothX}px ${smoothY}px, hsla(var(--primary) / 0.08), transparent 80%)`

  return (
    <Component
      ref={containerRef}
      className={`group relative overflow-hidden rounded-md ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {/* 1. Ambient Background Glow (Subtle tint follows cursor inside) */}
      {/* {showGlow && (
        <motion.div
           className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
           style={{ background: ambientBackground }}
        />
      )} */}

      {/* 2. Border Glow Layer */}
      {showGlow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            border: "1px solid transparent",
            background: borderBackground,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />
      )}

      {/* Content wrapper to ensure it stays above ambient glow */}
      {/* {/* <div className="relative z-10 h-full w-full"> */}
        {children}
      {/* </div> */}
    </Component>
  )
}
