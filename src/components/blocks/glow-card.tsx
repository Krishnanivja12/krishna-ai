"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { useAccessibility } from "@/contexts/accessibility-context"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  /** Radius (px) of the glow spot on the border. Default 200. */
  glowRadius?: number
  /** Peak opacity of the glow border highlight. Default 0.5. */
  glowOpacity?: number
  /** Whether the card should have default border styling. Default true. */
  bordered?: boolean
  /** Any extra props to forward to the wrapper element (e.g. framer-motion ones) */
  [key: string]: any
}

/**
 * GlowCard — A card wrapper that adds a cursor-proximity border glow.
 *
 * When the mouse hovers over (or near) this card, a radial gradient
 * follows the cursor along the card's border, creating a subtle
 * edge-glow effect that matches the ambient cursor's color.
 *
 * Usage:
 *   <GlowCard className="p-8 bg-card">
 *     ...your content...
 *   </GlowCard>
 */
export function GlowCard({
  children,
  className = "",
  as: Component = "div",
  glowRadius = 200,
  glowOpacity = 0.5,
  bordered = true,
  ...rest
}: GlowCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [isHovering, setIsHovering] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const { reducedMotion } = useAccessibility()

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
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setMousePos({ x: -1000, y: -1000 })
  }, [])

  const showGlow = isDesktop && !reducedMotion && isHovering

  return (
    <Component
      ref={containerRef}
      className={`glow-card-wrapper relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {/* Glow border overlay — sits on top of the card, uses pointer-events-none */}
      {showGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{
            // Use a radial gradient mask to show a border only near the cursor
            border: "1px solid transparent",
            background: `radial-gradient(${glowRadius}px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / ${glowOpacity}), transparent 70%)`,
            // Only show the gradient on the border area using the mask trick
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px", // This creates the "border" thickness for the mask
            transition: "opacity 0.2s ease",
          }}
        />
      )}
      {children}
    </Component>
  )
}
