import { useRef, useState, useCallback, useEffect } from "react"
import { useAccessibility } from "@/contexts/accessibility-context"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  glowRadius?: number
  glowOpacity?: number
  enableTilt?: boolean
  style?: React.CSSProperties
  // Allow Framer Motion props to pass through without explicit typing
  [key: string]: unknown
}

export function GlowCard({
  children,
  className = "",
  as: Component = "div",
  glowRadius = 350,
  glowOpacity = 0.4,
  enableTilt = false,
  style,
  ...rest
}: GlowCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
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

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  const showGlow = isDesktop && !reducedMotion

  return (
    <Component
      ref={containerRef}
      className={`group relative overflow-hidden rounded-md transition-all duration-500 ease-out gpu-layer ${className} ${isHovering ? "border-primary/30 shadow-2xl shadow-primary/5" : "border-border"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        scale: enableTilt && isHovering && !reducedMotion ? 1.01 : 1,
        ...style,
      }}
      {...rest}
    >
      {/* Inner Highlight Ring */}
      <div 
        className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${isHovering ? "opacity-10" : "opacity-0"}`}
        style={{
          boxShadow: "inset 0 0 40px 0 hsla(var(--primary) / 0.2)"
        }}
      />

      {/* Border Glow - CSS only, no Framer Motion interpolation of CSS vars */}
      {showGlow && isHovering && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-100 transition-opacity duration-300"
          style={{
            border: "1px solid transparent",
            borderImage: `radial-gradient(${glowRadius}px circle at 50% 50%, hsla(var(--primary) / ${glowOpacity}), transparent 80%) 1`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />
      )}

      {children}
    </Component>
  )
}
