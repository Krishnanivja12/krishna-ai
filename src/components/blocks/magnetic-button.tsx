"use client"

import { useRef } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: "div" | "span"
}

export function MagneticButton({ children, className = "", strength = 0.3, as = "div" }: MagneticButtonProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  const offsetX = useSpring(0, { damping: 20, stiffness: 300 })
  const offsetY = useSpring(0, { damping: 20, stiffness: 300 })

  // Inner content moves slightly more for a layered feel
  const innerX = useTransform(offsetX, (v) => v * 0.6)
  const innerY = useTransform(offsetY, (v) => v * 0.6)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const target = as === "span" ? spanRef.current : divRef.current
    if (!target) return
    const rect = target.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = (e.clientX - centerX) * strength
    const dy = (e.clientY - centerY) * strength
    offsetX.set(dx)
    offsetY.set(dy)
  }

  const handleMouseLeave = () => {
    offsetX.set(0)
    offsetY.set(0)
  }

  const content = (
    <motion.span
      style={{ x: innerX, y: innerY, display: "inline-block" }}
    >
      {children}
    </motion.span>
  )

  if (as === "span") {
    return (
      <motion.span
        ref={spanRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: offsetX, y: offsetY }}
        className={`inline-block ${className}`}
      >
        {content}
      </motion.span>
    )
  }

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: offsetX, y: offsetY }}
      className={`inline-block ${className}`}
    >
      {content}
    </motion.div>
  )
}
