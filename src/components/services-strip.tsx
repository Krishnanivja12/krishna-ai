"use client"

import { motion } from "framer-motion"
import { Globe, Brain, BarChart3 } from "lucide-react"
import { sectionVariants, cardVariantUp } from "@/lib/animations"
import { useEffect, useState } from "react"

interface ServicesStripProps {
  index: number
}

const services = [
  {
    icon: Globe,
    title: "Web Development",
    tags: ["Scalable", "Fast", "React"],
    description: "Production-grade applications built with modern frameworks and optimized for performance at scale.",
  },
  {
    icon: Brain,
    title: "AI Integration",
    tags: ["LLMs", "Automation", "Scraping"],
    description: "Custom AI solutions from fine-tuned models to intelligent automation pipelines and data extraction.",
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    tags: ["Cleaning", "Visualization", "Insights"],
    description: "Transform raw data into actionable intelligence with rigorous analysis and clear visual storytelling.",
  },
]

export function ServicesStrip({ index }: ServicesStripProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section id="services" className="border-t border-border" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            services
          </span>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <h2 id="services-heading" className="sr-only">Services</h2>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="grid gap-px border border-border bg-border md:grid-cols-3">
          {services.map((service) => (
            <motion.div
              variants={cardVariantUp}
              key={service.title}
              initial={{ opacity: 1 }}
              whileInView={isMobile ? { backgroundColor: "hsl(var(--card))" } : {}}
              viewport={{ margin: "-30% 0px -30% 0px" }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col gap-6 bg-background p-4 lg:p-8 transition-colors lg:hover:bg-card"
            >
              <div className="flex items-start justify-between">
                <service.icon
                  className="h-5 w-5 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {"//"}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-md lg:text-lg font-medium tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="text-xs lg:text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {service.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileInView={isMobile ? {borderColor: "hsl(var(--primary) / 0.3)", color: "hsl(var(--foreground))"} : {}}
                    viewport={{ margin: "-30% 0px -30% 0px" }}
                    transition={{ duration: 0.3 }}
                    className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors lg:group-hover:border-primary/30 lg:group-hover:text-foreground"
                  >
                    {tag}
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
