"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { MenuToggle } from "./menu-toggle"
import { MenuOverlay } from "./menu-overlay"
import { useScrollLock } from "@/hooks/use-scroll-lock"
import { useProjectModal } from "@/hooks/use-project-modal"
import { useNavigationHub } from "@/contexts/navigation-hub-context"

export function Navigation() {
  const { isOpen, setIsOpen, toggleOpen } = useNavigationHub()
  const { selectedProject } = useProjectModal()

  useScrollLock(isOpen)

  // Tap-based menu toggle for touch devices (reliable on mobile)
  useEffect(() => {
    let lastTap = 0
    let tapTimeout: ReturnType<typeof setTimeout>

    const handleTouchEnd = (e: TouchEvent) => {
      // Disable for PC/Mouse users
      const isPC = window.matchMedia("(pointer: fine)").matches
      if (isPC) return

      // Don't trigger if modal is open
      if (selectedProject) return

      const target = e.target as HTMLElement
      const isInteractive = target.closest('button, a, input, [role="button"]')
      if (isInteractive) return

      const currentTime = new Date().getTime()
      const tapLength = currentTime - lastTap

      clearTimeout(tapTimeout)

      if (tapLength < 300 && tapLength > 0) {
        // Double tap detected
        e.preventDefault()
        toggleOpen()
        lastTap = 0
      } else {
        lastTap = currentTime
        // Reset after single tap timeout
        tapTimeout = setTimeout(() => {
          lastTap = 0
        }, 300)
      }
    }

    window.addEventListener("touchend", handleTouchEnd, { passive: false })
    return () => {
      window.removeEventListener("touchend", handleTouchEnd)
      clearTimeout(tapTimeout)
    }
  }, [toggleOpen, selectedProject])

  // Browser "Back" button support to close menu
  useEffect(() => {
    if (isOpen) {
      // Push a new state to history when menu opens
      window.history.pushState({ menuOpen: true }, "")
    }

    const handlePopState = (e: PopStateEvent) => {
      if (isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [isOpen, setIsOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[160] transition-all duration-500 ${selectedProject ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 pointer-events-auto translate-y-0"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 md:py-8 flex items-center justify-between pointer-events-auto">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isOpen ? 0 : 1,
              x: isOpen ? -20 : 0
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={isOpen ? "pointer-events-none" : ""}
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="group flex items-center rounded-md border border-border bg-card/80 px-4 py-2 backdrop-blur-xl hover:border-primary/50 transition-all"
            >
              <span className="font-mono text-xs tracking-tighter text-foreground/80">
                Krishna.dev
              </span>
            </Link>
          </motion.div>

          {/* Toggle Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <MenuToggle isOpen={isOpen} toggle={toggleOpen} />
          </motion.div>
        </div>
      </header>

      <MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
