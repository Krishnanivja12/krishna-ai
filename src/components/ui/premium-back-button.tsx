"use client"

import { motion } from "framer-motion"
import { ChevronLeft, Terminal } from "lucide-react"
import Link from "next/link"

interface PremiumBackButtonProps {
  href: string
  text: string
  className?: string
}

export function PremiumBackButton({ href, text, className = "" }: PremiumBackButtonProps) {
  return (
    <Link href={href}>
      <motion.div
        initial="initial"
        whileHover="hover"
        className={`group relative flex items-center gap-4 font-mono ${className}`}
      >
        {/* Terminal HUD Block */}
        <div className="relative flex items-center">
          {/* Constant Pulse Glow */}
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-1 rounded-sm bg-primary/20 blur-md group-hover:bg-primary/40"
          />

          <motion.div
            variants={{
              initial: { scale: 1, backgroundColor: "rgba(var(--secondary), 0.3)" },
              hover: { scale: 1.05, backgroundColor: "hsl(var(--primary))" }
            }}
            className="relative flex h-8 items-center justify-center rounded-sm border border-primary/30 px-3 transition-colors duration-300 group-hover:border-primary"
          >
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-tighter transition-colors group-hover:text-primary-foreground">
              <motion.span
                variants={{
                  initial: { width: 0, opacity: 0, x: -5, marginRight: 0 },
                  hover: { width: "auto", opacity: 0.6, x: 0, marginRight: 0 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="overflow-hidden whitespace-nowrap text-[8px]"
              >
                [[
              </motion.span>

              <span>ESC</span>

              <motion.span
                variants={{
                  initial: { width: 0, opacity: 0, x: 5, marginLeft: 0 },
                  hover: { width: "auto", opacity: 0.6, x: 0, marginLeft: 0 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="overflow-hidden whitespace-nowrap text-[8px]"
              >
                ]]
              </motion.span>
              <ChevronLeft className="h-3 w-3" strokeWidth={3} />
            </span>
          </motion.div>
        </div>

        {/* Command Info */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <Terminal className="h-2.5 w-2.5 text-primary/40 group-hover:text-primary/60" />
            <span className="text-[8px] tracking-[0.2em] text-muted-foreground/50 uppercase group-hover:text-primary/30">
              CMD: BACK_TO_ROOT
            </span>
          </div>
          <motion.span
            variants={{
              initial: { x: 0, opacity: 0.8 },
              hover: { x: 4, opacity: 1 }
            }}
            className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase transition-colors group-hover:text-foreground"
          >
            {text}
          </motion.span>
        </div>

        {/* HUD Scan Line animation on hover */}
        <motion.div
          variants={{
            initial: { scaleX: 0, opacity: 0 },
            hover: { scaleX: 1, opacity: 1 }
          }}
          className="absolute -bottom-2 left-0 h-[1px] w-full origin-left bg-gradient-to-r from-primary to-transparent"
        />
      </motion.div>
    </Link>
  )
}
