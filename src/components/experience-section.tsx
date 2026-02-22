"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { experiences } from "@/lib/bio-data"
import { sectionVariants, cardVariantUp } from "@/lib/animations"

interface ExperienceSectionProps {
  index: number
}

export function ExperienceSection({ index }: ExperienceSectionProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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
            <motion.div
              variants={cardVariantUp}
              key={exp.role}
              initial={{ opacity: 1 }}
              whileInView={isMobile ? { borderColor: "hsl(var(--primary) / 0.3)" } : {}}
              viewport={{ margin: "-30% 0px -30% 0px" }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col gap-6 rounded-md border border-border bg-card px-4 py-6 md:p-6 lg:p-8 transition-colors lg:hover:border-primary/30"
            >
              {/* Top row */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <motion.div
                    whileInView={isMobile ? {backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))"} : {}}
                    viewport={{ margin: "-30% 0px -30% 0px" }}
                    transition={{ duration: 0.3 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border bg-secondary text-primary transition-colors lg:group-hover:bg-primary lg:group-hover:text-primary-foreground"
                  >
                    <Briefcase className="h-5 w-5" strokeWidth={1.5} />
                  </motion.div>
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
                  <motion.span
                    key={tag}
                    whileInView={isMobile ? {borderColor: "hsl(var(--primary) / 0.2)", color: "hsl(var(--foreground))"} : {}}
                    viewport={{ margin: "-30% 0px -30% 0px" }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors lg:group-hover:border-primary/20 lg:group-hover:text-foreground"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Index marker */}
              <span className="absolute right-8 top-8 font-mono text-[10px] text-muted-foreground/50">
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
