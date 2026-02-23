"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { experiences } from "@/lib/bio-data"
import { sectionVariants, cardVariantUp } from "@/lib/animations"
import { useIsMobile, useAutoHighlight } from "@/hooks/use-mobile-view-effect"

interface ExperienceSectionProps {
  index: number
}

export function ExperienceSection({ index }: ExperienceSectionProps) {
  const isMobile = useIsMobile()

  return (
    <section id="experience" className="border-t border-border" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            work experience
          </span>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <h2 id="experience-heading" className="sr-only">Work Experience</h2>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="flex flex-col gap-4">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.role} exp={exp} index={index} isMobile={isMobile} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ExperienceCard({ exp, index, isMobile }: { exp: typeof experiences[number], index: number, isMobile: boolean }) {
  const ref = useRef(null)
  const isActive = useAutoHighlight(ref, isMobile)

  return (
    <motion.div
      ref={ref}
      variants={cardVariantUp}
      className={`group relative flex flex-col gap-6 rounded-md border bg-card px-4 py-6 md:p-6 lg:p-8 transition-colors duration-300 lg:hover:border-primary/30 ${isActive ? "border-primary/30" : "border-border"}`}
    >
      {/* Top row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border transition-colors duration-300 lg:group-hover:bg-primary lg:group-hover:text-primary-foreground ${isActive ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-primary border-border"}`}
          >
            <Briefcase className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-foreground">{exp.role}</h3>
            <span className="font-mono text-xs text-primary">{exp.company}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:text-right">
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
            <MapPin className="h-3 w-3" strokeWidth={1.5} />
            {exp.location}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
            <Calendar className="h-3 w-3" strokeWidth={1.5} />
            {exp.period}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs md:text-sm leading-relaxed text-muted-foreground text-justify">
        {exp.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[10px] transition-colors duration-300 lg:group-hover:border-primary/20 lg:group-hover:text-foreground ${isActive ? "border-primary/20 text-foreground" : "border-border text-muted-foreground"}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Index marker */}
      <span className="absolute right-8 top-8 font-mono text-[10px] text-muted-foreground/50">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  )
}