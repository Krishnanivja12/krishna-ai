"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, MapPin, Calendar } from "lucide-react"
import { aboutContent, education } from "@/lib/bio-data"
import { useMode } from "@/hooks/use-mode"
import { sectionVariants, cardVariantLeft, cardVariantRight } from "@/lib/animations"

interface AboutSectionProps {
  index: number
}

export function AboutSection({ index }: AboutSectionProps) {
  const { mode } = useMode()
  const activeBio = aboutContent[mode] || aboutContent.generalist
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section id="about" className="border-t border-border" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            about & education
          </span>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <h2 id="about-heading" className="sr-only">About & Education</h2>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="grid gap-8 lg:grid-cols-2 items-stretch">
          {/* About text */}
          <motion.div variants={cardVariantRight} className="flex flex-col gap-6 rounded-md border border-border bg-card p-4 md:p-8 h-full">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-widest text-primary uppercase">
                {mode === "generalist" ? "about_me" : `about_${mode.replace("-", "_")}`}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {"//"}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {activeBio.map((paragraph, i) => (
                <p 
                  key={i} 
                  className="text-xs md:text-base leading-relaxed text-muted-foreground text-justify"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={sectionVariants} className="flex flex-col gap-4">
            {education.map((edu) => (
              <EducationCard key={edu.degree} edu={edu} isMobile={isMobile} />
            ))}
          </motion.div>
        </motion.div>

        {/* Debugging Overlay: Visualizes the center 40% active zone (30% from top, 30% from bottom) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center">
            <div className="absolute top-[30%] w-full border-t-2 border-red-500/50"><span className="bg-red-500/50 text-white text-[10px] px-1">Top Boundary</span></div>
            <div className="absolute top-[70%] w-full border-t-2 border-red-500/50"><span className="bg-red-500/50 text-white text-[10px] px-1">Bottom Boundary</span></div>
          </div>
        )}
      </div>
    </section>
  )
}

function EducationCard({ edu, isMobile }: { edu: typeof education[number], isMobile: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" })
  const isActive = isMobile && isInView

  return (
    <motion.div
      ref={ref}
      variants={cardVariantLeft}
      className={`group flex flex-col gap-4 rounded-md border bg-card px-4 py-6 md:p-8 transition-colors duration-300 lg:hover:border-primary/30 ${isActive ? "border-primary/30" : "border-border"}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border transition-colors duration-300 lg:group-hover:bg-primary lg:group-hover:text-primary-foreground ${isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
          <GraduationCap className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium leading-tight text-foreground">
            {edu.degree}
          </h3>
          <span className="font-mono text-xs text-primary">
            {edu.school}
          </span>
        </div>
      </div>

      <p className="font-mono text-[11px] text-foreground">
        {edu.focus}
      </p>

      <p className="text-xs md:text-sm leading-relaxed text-muted-foreground italic border-l-2 border-primary/20 pl-4">
        {edu.description}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <MapPin className="h-3 w-3" strokeWidth={1.5} />
          {edu.location}
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <Calendar className="h-3 w-3" strokeWidth={1.5} />
          {edu.period}
        </div>
      </div>
    </motion.div>
  )
}