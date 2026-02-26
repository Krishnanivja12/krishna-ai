"use client"

import { useState, useEffect } from "react"
import { flushSync } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, ChevronDown, FileText } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useMode } from "@/hooks/use-mode"
import { SITE_CONFIG } from "@/config/site-config"
import { SITE_METADATA } from "@/lib/site-metadata"
import { socialLinks } from "@/components/footer"

const exploreLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Me", href: "/about" },
  { label: "Education", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Work Experience", href: "/#experience" },
  { label: "Projects", href: "/projects" },
  { label: "Certificates", href: "/#certificates" },
  { label: "Services", href: "/#services" },
  { label: "Get in Touch", href: "/#contact" },
]

const modes = [
  { id: "generalist", label: "Generalist" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "data", label: "Data" },
]

const RESUMES = [
  { id: "fullstack", label: "Full Stack Resume", href: "/resumes/Viraj Mavani_Resume_FullStack.pdf" },
  // { id: "fullstack", label: "Full Stack Resume", href: "https://uwoca-my.sharepoint.com/:b:/g/personal/vmavani2_uwo_ca/IQDtOwLXU5P2R4ujwpNLHlqiAcM00LiuTindE7b4bi-x3Uk?e=Nvd39I" },
  { id: "data", label: "AI / ML Resume", href: "/resumes/Viraj Mavani_Resume_DA.pdf" },
  // { id: "data", label: "AI / ML Resume", href: "https://uwoca-my.sharepoint.com/:b:/g/personal/vmavani2_uwo_ca/IQCinxObn6-5SYuUk8kjK4C0AUwPl-qwzOxUMNR7Ho9vEew?e=RSl3ZQ" },
]

export function TopNav() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const { mode: activeMode, setMode: setActiveMode } = useMode() 

  // --- Resume Tooltip Logic ---
  const [showResumeTooltip, setShowResumeTooltip] = useState(false)

  // Trigger: Only on initial app load
  useEffect(() => {
    const hasShown = sessionStorage.getItem("hasShownResumeTooltip")
    if (!hasShown) {
      sessionStorage.setItem("hasShownResumeTooltip", "true")
      const showTimer = setTimeout(() => setShowResumeTooltip(true), 0)
      const hideTimer = setTimeout(() => setShowResumeTooltip(false), 2500)
      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [])

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = resolvedTheme === "dark"
    const newTheme = isDark ? "light" : "dark"

    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Left box - Logo / Name */}
          <div className="flex items-center rounded-md border border-border bg-card/80 px-2 py-2 md:px-4 md:py-2 backdrop-blur-xl">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-7 w-7 overflow-hidden rounded-sm">
                <Image
                  src={SITE_METADATA.logo}
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="hidden font-mono text-xs tracking-wider text-foreground sm:block">
                viraj.dev
              </span>
            </Link>
          </div>

          {/* Middle - Context Switcher */}
          {/* THIS CHECK: Only show if enabled in Config */}
          {SITE_CONFIG.enableContextSwitcher ? (
            <div className="flex min-w-0 flex-1 justify-center">
              <nav
                className="flex w-fit items-center gap-6 rounded-md border border-border bg-card/80 px-2 py-1.5 backdrop-blur-xl"
                role="navigation"
                aria-label="Mode switcher"
              >
                <span className="hidden pl-3 font-mono text-xs tracking-widest text-muted-foreground uppercase sm:block">
                  mode
                </span>

                <div className="flex items-center gap-0.5 rounded-sm bg-secondary p-0.5" role="tablist">
                  {modes.map((mode) => (
                    <button
                      key={mode.id}
                      role="tab"
                      aria-selected={activeMode === mode.id}
                      // if mode.id string doesn't perfectly match
                      // We can cast it: setActiveMode(mode.id as any) if needed
                      onClick={() => setActiveMode(mode.id as any)}
                      className={`relative flex items-center gap-2 rounded-sm px-3 py-1.5 font-mono text-xs tracking-tight transition-all duration-200 ${
                        activeMode === mode.id
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {activeMode === mode.id && (
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                          aria-hidden="true"
                        />
                      )}
                      {mode.label}
                    </button>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="hidden rounded-sm border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground sm:block"
                >
                  Contact
                </a>
              </nav>
            </div>
          ) : (
            // If hidden, keep the layout balanced (optional spacer)
            <div className="flex-1" />
          )}

          {/* Right box - Theme Toggle + Drawer Button */}
          <div className="flex items-center gap-1 rounded-md border border-border bg-card/80 px-2 py-1.5 backdrop-blur-xl">
          
            {/* Dynamic Resume Button with Tooltip Wrapper */}
            <div className="relative flex items-center justify-center">
              {activeMode === "generalist" ? (
                // If Generalist: Show Dropdown Menu
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:h-auto sm:w-auto sm:border sm:border-border sm:bg-transparent sm:px-3 sm:py-1.5 sm:font-mono sm:text-xs sm:hover:border-primary sm:hover:bg-transparent outline-none">
                    <FileText className="h-4 w-4 sm:hidden" />
                    <span className="hidden sm:flex sm:items-center sm:gap-1">
                      Resume <ChevronDown className="h-3 w-3 opacity-70" />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[160px] font-mono text-xs">
                    {RESUMES.map((resume) => (
                      <DropdownMenuItem key={resume.id} asChild className="cursor-pointer">
                        <a href={resume.href} target="_blank" rel="noopener noreferrer">
                          {resume.label}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // If Specific Mode: Show Direct Link
                (() => {
                  const resumeId = activeMode === "ai-ml" ? "data" : activeMode //TODO: set diiferent resume for data
                  const resume = RESUMES.find((r) => r.id === resumeId)
                  if (!resume) return null
                  return (
                    <a
                      href={resume.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:h-auto sm:w-auto sm:border sm:border-border sm:bg-transparent sm:px-3 sm:py-1.5 sm:font-mono sm:text-xs sm:hover:border-primary sm:hover:bg-transparent"
                    >
                      <FileText className="h-4 w-4 sm:hidden" />
                      <span className="hidden sm:inline">Resume</span>
                    </a>
                  )
                })()
              )}

              {/* Mobile Tooltip - Shows only on initial load */}
              <div 
                className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-mono font-medium rounded shadow-lg pointer-events-none transition-opacity duration-300 sm:hidden ${
                  showResumeTooltip ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-primary"></div>
                Resume
              </div>
            </div>

            <div className="mx-1 h-4 w-px bg-border" aria-hidden="true" />

            <motion.button
              whileTap={{ scale: 0.9, rotate: 15 }}
              onClick={toggleTheme}
              className="relative flex h-9 w-9 items-center justify-center rounded-sm bg-transparent lg:hover:bg-secondary/50 transition-colors overflow-hidden"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: 20, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: 45 }}
                  transition={{type: "spring", stiffness: 300, damping: 20}}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? (
                    <Sun className="h-[1.1rem] w-[1.1rem] text-amber-500 fill-amber-500/10" />
                  ) : (
                    <Moon className="h-[1.1rem] w-[1.1rem] text-blue-400 fill-blue-400/10" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <div className="mx-1 h-5 w-px bg-border" aria-hidden="true" />

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-border bg-card w-full max-w-96 overflow-y-auto"
              >
                <SheetHeader className="border-b border-border pb-4">
                  <SheetTitle className="flex items-center gap-2 font-mono text-sm tracking-wider text-foreground">
                    <div className="relative h-6 w-6 overflow-hidden rounded-sm">
                      <Image
                        src={SITE_METADATA.logo}
                        alt="Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    Navigation
                  </SheetTitle>
                </SheetHeader>

                {/* Section 0.5: Resume */}
                <div className="py-6">
                  <span className="mb-4 block font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Resume
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-sm border border-border px-3 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground outline-none">
                      <span>Download Resume</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 font-mono text-xs">
                      {RESUMES.map((resume) => (
                        <DropdownMenuItem key={resume.id} asChild className="cursor-pointer">
                          <a href={resume.href} target="_blank" rel="noopener noreferrer">
                            {resume.label}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="h-px bg-border" aria-hidden="true" />

                {/* Section 1: Explore */}
                <div className="py-6">
                  <span className="mb-4 block font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Explore
                  </span>
                  <nav className="flex flex-col gap-1" role="navigation" aria-label="Page sections">
                    {exploreLinks.map((link) => {
                      const isPageLink = link.href.startsWith("/") && !link.href.startsWith("/#")
                      const Component = isPageLink ? Link : "a"
                      return (
                        <Component
                          key={link.label}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-sm px-3 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <span className="text-[10px] text-primary">{">"}</span>
                          {link.label}
                        </Component>
                      )
                    })}
                  </nav>
                </div>

                <div className="h-px bg-border" aria-hidden="true" />

                {/* Section 2: Connect with me */}
                <div className="py-6">
                  <span className="mb-4 block font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Connect with me
                  </span>
                  <nav className="flex flex-col gap-1" role="navigation" aria-label="Social links">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-sm px-3 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        <link.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Bottom status */}
                <div className="mt-auto border-t border-border pt-4">
                  <div className="flex items-center gap-2 px-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      Available for Freelance
                    </span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}