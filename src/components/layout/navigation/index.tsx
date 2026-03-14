"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { MenuToggle } from "./menu-toggle"
import { MenuOverlay } from "./menu-overlay"
import { useScrollLock } from "@/hooks/use-scroll-lock"
import { SITE_METADATA } from "@/lib/site-metadata"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [])
  
  useScrollLock(isOpen)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="mx-auto max-w-7xl px-4 py-4 md:py-8 flex items-center justify-between pointer-events-auto">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 rounded-md border border-border bg-card/80 px-3 py-2 md:px-4 md:py-2 backdrop-blur-xl hover:border-primary/50 transition-all"
            >
              <div className="relative h-6 w-6 md:h-7 md:w-7 overflow-hidden rounded-sm">
                <Image
                  src={SITE_METADATA.logo}
                  alt="Logo"
                  fill
                  className="object-cover invert dark:invert-0 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="hidden font-mono text-xs tracking-tighter text-foreground/80 sm:block">
                viraj.dev
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
