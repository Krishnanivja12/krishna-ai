"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function AmbientCursor() {
  const [isDesktop, setIsDesktop] = useState(false)

  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)

  const springConfig = { damping: 40, stiffness: 90, mass: 1.2 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only enable on non-touch devices with hover capability
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    const checkDesktop = () => setIsDesktop(mediaQuery.matches && window.innerWidth > 768)

    checkDesktop()

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleResize = () => checkDesktop()

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [cursorX, cursorY])

  if (!isDesktop) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.10) 0%, hsl(var(--primary) / 0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </motion.div>
  )
}
