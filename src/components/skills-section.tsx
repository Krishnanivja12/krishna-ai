"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { skillCategories } from "@/lib/bio-data"
import { sectionVariants, cardVariantUp } from "@/lib/animations"
import { useIsMobile, useAutoHighlight } from "@/hooks/use-mobile-view-effect"

interface SkillsSectionProps {
  index: number
}

export function SkillsSection({ index }: SkillsSectionProps) {
  const isMobile = useIsMobile()

  return (
    <section id="skills" className="border-t border-border" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            skills & technologies
          </span>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <h2 id="skills-heading" className="sr-only">Skills & Technologies</h2>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <SkillCard key={category.label} category={category} isMobile={isMobile} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({ category, isMobile }: { category: typeof skillCategories[number], isMobile: boolean }) {
  const ref = useRef(null)
  const isActive = useAutoHighlight(ref, isMobile)

  return (
    <motion.div
      ref={ref}
      variants={cardVariantUp}
      className={`group flex flex-col gap-5 p-4 md:p-6 lg:p-8 transition-colors duration-300 lg:hover:bg-card ${isActive ? "bg-card" : "bg-background"}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-widest text-primary uppercase">
          {category.label}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {String(category.skills.length).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className={`inline-flex items-center rounded-sm border px-2.5 py-1 font-mono text-[11px] transition-colors duration-300 lg:group-hover:border-primary/20 lg:group-hover:text-foreground ${isActive ? "border-primary/20 text-foreground" : "border-border text-muted-foreground"}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}