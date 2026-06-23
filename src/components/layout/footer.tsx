"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { steps } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUp, Check, Copy } from "lucide-react"
import { DiscordIcon } from "../blocks/discord-icon"
import { MagneticButton } from "../blocks/magnetic-button"

export const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Krishnanivja12", color: "hover:text-white hover:bg-[#24292e] hover:border-[#24292e]" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/krishnanivja/", color: "hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5]" },
  { icon: DiscordIcon, label: "Discord", href: "https://discord.com/users/krishnanivja", color: "hover:text-white hover:bg-[#5865F2] hover:border-[#5865F2]" },
  { icon: Mail, label: "Email", href: "mailto:krishnanivja249@gmail.com", color: "hover:text-white hover:bg-[#EA4335] hover:border-[#EA4335]" },
]

function ScrollToTop() {
  const scrollToTop = useCallback(() => {
    const scrollContainer = document.querySelector('[class*="overflow-y-auto"]')
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.5} />
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-3 py-1.5 font-mono text-[10px] text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Back to top
      </span>
    </motion.button>
  )
}

function ContactCTA() {
  const [copied, setCopied] = useState(false)
  const email = "krishnanivja249@gmail.com"

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(email)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        // Clipboard API not available (insecure context, etc.)
        setCopied(false)
      })
  }, [email])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 rounded-md border border-border/50 bg-card/30 px-4 py-3 backdrop-blur-sm"
    >
      <span className="font-mono text-[10px] tracking-widest text-primary uppercase">
        {"["}contact{"]"}
      </span>
      <button
        onClick={handleCopy}
        className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        aria-label="Copy email address"
      >
        <span className="font-mono">{email}</span>
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" strokeWidth={2} />
        ) : (
          <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" strokeWidth={1.5} />
        )}
      </button>
    </motion.div>
  )
}

export function Footer() {
  const text = "Open to collaborations and interesting projects."

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: {
      opacity: 1,
      display: "inline",
      transition: { duration: 0 }
    },
  }

  return (
    <footer id="contact" className="border-t border-border relative" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 md:pt-[5.5rem] md:pb-32">
        <div className="flex flex-col gap-8">

          {/* Top row: Tagline + Scroll to top */}
          <div className="flex items-start justify-between">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="flex flex-col gap-2"
            >
              <span className="font-mono text-[10px] tracking-widest text-primary uppercase font-bold">
                {">"} system.connect()
              </span>

              <div className="flex items-center">
                <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                  {text.split("").map((char, i) => (
                    <motion.span key={i} variants={letterVariants}>
                      {char}
                    </motion.span>
                  ))}

                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: steps(2)
                    }}
                    className="inline-block w-2 h-4 ml-1 bg-primary align-middle shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                  />
                </p>
              </div>
            </motion.div>

            <ScrollToTop />
          </div>

          {/* Middle row: Contact CTA + Socials */}
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <ContactCTA />

            <div className="flex items-center gap-2 sm:gap-3">
              {socialLinks.map((link, i) => (
                <MagneticButton key={link.label} strength={0.4}>
                  <motion.a
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.1,
                      rotate: i % 2 === 0 ? 5 : -5
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-border bg-card/50 backdrop-blur-sm text-muted-foreground transition-all duration-300 shadow-sm ${link.color}`}
                  >
                    <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 group-hover:ring-4 group-hover:ring-primary/10 transition-all duration-500" />

                    <link.icon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-4 flex flex-col items-start gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:gap-4">
            <span className="font-mono text-[10px] text-muted-foreground">
              {`// ${new Date().getFullYear()} Krishna Nivja. All rights reserved.`}
            </span>
            <div className="hidden h-px flex-1 bg-border sm:block" aria-hidden="true" />
            <span className="font-mono text-[10px] text-muted-foreground">
              Designed & Built with precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
