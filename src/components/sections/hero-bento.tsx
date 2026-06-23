"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, FileText } from "lucide-react"
import dynamic from "next/dynamic"
import { TerminalCard } from "../blocks/terminal-card"
import { TechTicker } from "../blocks/tech-ticker"
import { GlowCard } from "../blocks/glow-card"

const NeuralVisualization = dynamic(
  () => import("../blocks/neural-visualization").then((mod) => mod.NeuralVisualization),
  { ssr: false }
)
import { useMode } from "@/hooks/use-mode"
import { HeroContent } from "@/lib/bio-data"
import { RESUMES } from "@/config/navigation-data"
import { SITE_METADATA } from "@/lib/site-metadata"
import { staggerContainer, cinematicReveal, headerReveal, lineReveal, easePremium } from "@/lib/animations"
import { useAutoHighlight, useIsMobile } from "@/hooks/use-mobile-view-effect"
import { DiaText } from "../animations/text/dia-text"
import { TextBlurIn } from "../animations/text/blur-in"
import { MagneticButton } from "../blocks/magnetic-button"

const DecorativeTag = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div variants={staggerContainer} className={`flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] text-muted-foreground/50 uppercase italic ${className}`}>
    <motion.div variants={lineReveal} className="h-[1px] w-4 bg-border/50 origin-left" />
    <motion.span variants={headerReveal}>
      {children}
    </motion.span>
  </motion.div>
)

interface HeroBentoProps {
  index: number
}

const expertiseAreas = ["LLM Fine-Tuning", "RAG Pipelines", "NLP Systems", "AI Agents"]

export function HeroBento({ index }: HeroBentoProps) {
  const { mode } = useMode()
  const content = HeroContent[mode as keyof typeof HeroContent] || HeroContent.generalist
  const resumeHref = RESUMES[0]?.href ?? "/resumes/KrishnaNivja_Resume.pdf"
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useIsMobile()
  const nameRef = useRef<HTMLSpanElement>(null)
  const isNameActive = useAutoHighlight(nameRef, isMobile)
  const [showTerminal, setShowTerminal] = useState(false)
  const ctaButtonClassName = `group inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 font-mono text-xs font-medium text-primary-foreground transition-all hover:gap-3 sm:px-6 sm:py-3 sm:text-sm sm:gap-3 ${isNameActive ? "gap-4" : ""}`
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
    <section id="home" className="mx-auto max-w-7xl px-4 pt-24 pb-16 md:pt-36 lg:pt-40 lg:pb-24 gpu-layer-paint" aria-labelledby="hero-heading">
      {/* Section label */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mb-8 flex items-center gap-4"
      >
        <motion.span variants={headerReveal} className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          index
        </motion.span>
        <motion.div variants={lineReveal} className="h-px flex-1 bg-border origin-left" aria-hidden="true" />
        <motion.span variants={headerReveal} className="font-mono text-[10px] tracking-widest text-muted-foreground">
          {String(index).padStart(2, "0")}
        </motion.span>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:grid-rows-[1fr_auto]"
      >
        {/* Card 1 - Intro (Left, spans 2 cols) */}
        <GlowCard as={motion.div} variants={cinematicReveal} className="sm:col-span-2 md:col-span-2 flex flex-col justify-between rounded-md border border-border bg-card/40 backdrop-blur-md p-6 md:p-8 lg:p-10 relative overflow-hidden">
          {/* Gradient overlay */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsla(var(--glow-primary), 0.3), transparent)",
              filter: "blur(40px)",
            }}
          />

          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="font-mono text-[8px] tracking-widest">[ 01, 01 ]</span>
          </div>

          <div className="relative z-10">
            <span className="mb-4 inline-block font-mono text-[10px] tracking-widest text-primary uppercase">
              <DiaText words={["AI/ML", "Deep Learning", "ML"]} duration={3500} /> {content.title}
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
              >
                <motion.span
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >K</motion.span>
                <AnimatePresence>
                  {shouldExpand && isInitialAnimationComplete && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      rishna
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
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >N</motion.span>
                <AnimatePresence>
                  {shouldExpand && isInitialAnimationComplete && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      ivja
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.span
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

          {/* Key expertise tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5, ease: easePremium }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {expertiseAreas.map((area, i) => (
              <span
                key={area}
                className="inline-flex items-center rounded-sm border border-border/40 bg-card/30 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-foreground"
              >
                <span
                  className="mr-1.5 inline-block h-1 w-1 rounded-full"
                  style={{ backgroundColor: `hsla(${172 + i * 30}, 100%, 48%, 0.5)` }}
                  aria-hidden="true"
                />
                {area}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons + Socials */}
          <motion.div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Link
                href="/about"
                className={ctaButtonClassName}
              >
                About Me
                <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${isNameActive ? "translate-x-0.5" : ""}`} aria-hidden="true" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-sm border border-border bg-card/40 px-4 py-2.5 font-mono text-xs font-medium text-muted-foreground transition-all hover:border-primary hover:text-foreground hover:gap-3 sm:px-6 sm:py-3 sm:text-sm"
              >
                <FileText className="h-4 w-4" strokeWidth={1.5} />
                Resume
              </a>
            </MagneticButton>

            {/* Social icons */}
            <div className="ml-1 flex items-center gap-1.5 border-l border-border/30 pl-2 sm:ml-2 sm:gap-2 sm:pl-3">
              <motion.a
                href={SITE_METADATA.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-border/40 text-muted-foreground transition-all hover:border-[#24292e] hover:bg-[#24292e] hover:text-white sm:h-9 sm:w-9"
              >
                <Github className="h-4 w-4" strokeWidth={1.5} />
              </motion.a>
              <motion.a
                href={SITE_METADATA.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-border/40 text-muted-foreground transition-all hover:border-[#0077b5] hover:bg-[#0077b5] hover:text-white sm:h-9 sm:w-9"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.5} />
              </motion.a>
              <motion.a
                href={`mailto:${SITE_METADATA.social.email}`}
                aria-label="Email"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-border/40 text-muted-foreground transition-all hover:border-[#EA4335] hover:bg-[#EA4335] hover:text-white sm:h-9 sm:w-9"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </motion.a>
            </div>
          </motion.div>
        </GlowCard>

        {/* Card 2 - AI Visualization + Terminal Toggle (Right, spans 2 rows) */}
        <GlowCard
          as={motion.div}
          variants={cinematicReveal}
          className="hidden md:flex flex-col md:col-span-1 min-h-[425px] md:min-h-[440px] md:row-span-2 relative group rounded-md border border-border bg-card/40 backdrop-blur-md overflow-hidden"
        >
          {/* Toggle bar */}
          <div className="flex items-center gap-1 border-b border-border/40 px-3 py-2">
            <button
              onClick={() => setShowTerminal(false)}
              className={`px-3 py-1 rounded-sm font-mono text-[9px] tracking-wider transition-all ${
                !showTerminal
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground/50 hover:text-muted-foreground border border-transparent"
              }`}
            >
              AI Core
            </button>
            <button
              onClick={() => setShowTerminal(true)}
              className={`px-3 py-1 rounded-sm font-mono text-[9px] tracking-wider transition-all ${
                showTerminal
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground/50 hover:text-muted-foreground border border-transparent"
              }`}
            >
              Active Shell
            </button>

            <div className="ml-auto">
              <DecorativeTag>&gt; {showTerminal ? "Shell" : "AI Core"}</DecorativeTag>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {showTerminal ? (
              <motion.div
                key="terminal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: easePremium }}
                className="flex h-full w-full overflow-hidden"
              >
                <TerminalCard key={mode} />
              </motion.div>
            ) : (
              <motion.div
                key="viz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: easePremium }}
                className="flex h-full w-full items-center justify-center p-2"
              >
                <NeuralVisualization />
              </motion.div>
            )}
          </AnimatePresence>
        </GlowCard>

        {/* Card 3 - Status (Small, Bottom Left) */}
        <GlowCard as={motion.div} variants={cinematicReveal} className="flex items-center gap-4 rounded-md border border-border bg-card/40 backdrop-blur-md px-4 sm:px-6 py-5 relative">
          <div className="absolute top-2 right-2 opacity-20">
            <span className="font-mono text-[8px] tracking-widest">[ 01, 02 ]</span>
          </div>
          <div className="relative flex items-center justify-center">
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-400/40" aria-hidden="true" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              current status
            </span>
            <span className="text-sm font-medium text-foreground">
              Available for Freelance & Full-time
            </span>
          </div>
        </GlowCard>

        {/* Card 4 - Tech Stack Ticker (Small, Bottom Center) */}
        <GlowCard as={motion.div} variants={cinematicReveal} className="min-h-[72px] relative group bg-card/40 backdrop-blur-md rounded-md border border-border flex items-center px-4 overflow-hidden">
          <div className="absolute top-2 right-2 opacity-20 z-10">
            <span className="font-mono text-[8px] tracking-widest">[ 02, 01 ]</span>
          </div>
          <TechTicker />
        </GlowCard>
      </motion.div>
    </section>
  )
}
