"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { TerminalCard } from "../blocks/terminal-card"
import { TechTicker } from "../blocks/tech-ticker"
import { useMode } from "@/hooks/use-mode"
import { HeroContent } from "@/lib/bio-data"
import { sectionVariants, cardVariantUp, cardVariantLeft, cardVariantRight, cardVariantDown } from "@/lib/animations"
import { useAutoHighlight, useIsMobile } from "@/hooks/use-mobile-view-effect"
import { DiaText } from "../animations/text/dia-text";
import { TextBlurIn } from "../animations/text/blur-in";
import { MagneticButton } from "../blocks/magnetic-button";

interface HeroBentoProps {
  index: number
}

export function HeroBento({ index }: HeroBentoProps) {
  const { mode } = useMode()
  const content = HeroContent[mode as keyof typeof HeroContent] || HeroContent.generalist
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useIsMobile()
  const nameRef = useRef<HTMLSpanElement>(null)
  const isNameActive = useAutoHighlight(nameRef, isMobile)
  const [isAutoExpanded, setIsAutoExpanded] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] = useState(false)

  useEffect(() => {
    if (isMobile) return
    if (hasInteracted) return

    const expandTimer = setTimeout(() => setIsAutoExpanded(true), 1200)
    const collapseTimer = setTimeout(() => setIsAutoExpanded(false), 3000)

    return () => {
      clearTimeout(expandTimer)
      clearTimeout(collapseTimer)
    }
  }, [isMobile, hasInteracted])

  const shouldExpand = isHovered || isNameActive || (isAutoExpanded && !isMobile)


  return (
    <section id="home" className="mx-auto max-w-7xl px-4 pt-32 pb-16 md:pt-36 lg:pt-40 lg:pb-24" aria-labelledby="hero-heading">
      {/* Section label */}
      <div className="mb-8 flex items-center gap-4">
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          index
        </span>
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Bento Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:grid-rows-[1fr_auto]"
      >
        {/* Card 1 - Intro */}
        <motion.div variants={cardVariantDown} className="sm:col-span-2 md:col-span-2 flex flex-col justify-between rounded-md border border-border bg-card p-6 md:p-8 lg:p-10">
          <div>
            <span className="mb-4 inline-block font-mono text-[10px] tracking-widest text-primary uppercase">
              <DiaText words={["Full-Stack", "AI"]} duration={3500} /> {content.title}
            </span>
            <h1
              id="hero-heading"
              className="text-balance text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              <TextBlurIn as={motion.span} className="inline-block">Hello, I am</TextBlurIn>
              <br />
              <motion.span
                ref={nameRef}
                className="text-primary inline-flex cursor-pointer select-none"
                onHoverStart={() => {
                  if (isMobile) return
                  setIsHovered(true)
                  setHasInteracted(true)
                  setIsAutoExpanded(false)
                }}
                onHoverEnd={() => !isMobile && setIsHovered(false)}
                onTap={() => {
                  setIsHovered(!isHovered)
                  setHasInteracted(true)
                  setIsAutoExpanded(false)
                }}
                layout
              >
                <motion.span
                  layout
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >V</motion.span>
                <AnimatePresence>
                  {shouldExpand && isInitialAnimationComplete && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      iraj
                    </motion.span>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {shouldExpand && isInitialAnimationComplete && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden whitespace-pre"
                    >
                      {" "}
                    </motion.span>
                  )}
                </AnimatePresence>

                <motion.span
                  layout
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >M</motion.span>
                <AnimatePresence>
                  {shouldExpand && isInitialAnimationComplete && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      avani
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.span
                  layout
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  onAnimationComplete={() => setIsInitialAnimationComplete(true)}
                >.</motion.span>
              </motion.span>
            </h1>
            <TextBlurIn className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              {content.description}
            </TextBlurIn>
          </div>

          <motion.div
            className="mt-8">
            <MagneticButton>
              <Link
                href="/about"
                className={`group inline-flex items-center gap-3 rounded-sm bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:gap-4 ${isNameActive ? "gap-4" : ""}`}
              >
                About Me
                <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${isNameActive ? "translate-x-0.5" : ""}`} aria-hidden="true" />
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Card 2 - Terminal (Tall, Right, spans 2 rows) */}
        <motion.div variants={cardVariantLeft} className="hidden md:block md:col-span-1 min-h-[425px] md:min-h-[440px] md:row-span-2" >
          <TerminalCard />
        </motion.div>

        {/* Card 3 - Status (Small, Bottom Left) */}
        <motion.div variants={cardVariantRight} className="flex items-center gap-4 rounded-md border border-border bg-card px-6 py-5">
          <div className="relative flex items-center justify-center">
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-400/40" aria-hidden="true" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              current status
            </span>
            <span className="text-sm font-medium text-foreground">
              Available for Freelance
            </span>
          </div>
        </motion.div>

        {/* Card 4 - Tech Stack Ticker (Small, Bottom Center) */}
        <motion.div variants={cardVariantUp} className="min-h-[72px]">
          <TechTicker />
        </motion.div>
      </motion.div>
    </section>
  )
}