"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { skillCategories } from "@/lib/bio-data"
import { sectionVariants, cardVariantUp } from "@/lib/animations"

interface SkillsSectionProps {
  index: number
}

export function SkillsSection({ index }: SkillsSectionProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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
            <motion.div
              variants={cardVariantUp}
              key={category.label}
              initial={{ opacity: 1 }}
              whileInView={isMobile ? { backgroundColor: "hsl(var(--card))" } : {}}
              viewport={{ margin: "-30% 0px -30% 0px" }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col gap-5 bg-background p-4 md:p-6 lg:p-8 transition-colors lg:hover:bg-card"
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
                  <motion.span
                    key={skill}
                    initial={false}
                    whileInView={isMobile ? {borderColor: "hsl(var(--primary) / 0.2)", color: "hsl(var(--foreground))"} : {}}
                    viewport={{ margin: "-30% 0px -30% 0px" }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors lg:group-hover:border-primary/20 lg:group-hover:text-foreground"
                  >
                    {skill}
                  </motion.span>                
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
