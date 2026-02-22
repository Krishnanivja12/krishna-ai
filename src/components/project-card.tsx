"use client"

import { motion, Variants } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Project } from "@/lib/project-data"
import { useEffect, useState } from "react"

interface ProjectCardProps {
  project: Project
  index: number
  onClick: (project: Project) => void
  variants?: Variants
  limitTags?: boolean
}

export function ProjectCard({ project, index, onClick, variants, limitTags = false }: ProjectCardProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  const tagsToShow = limitTags ? project.tags.slice(0, 5) : project.tags
  const remainingTags = limitTags ? project.tags.length - 5 : 0

  return (
    <motion.div
      variants={variants}
      onClick={() => onClick(project)}
      initial={{ opacity: 1 }}
      whileInView={isMobile ? {borderColor: "hsl(var(--primary) / 0.4)", boxShadow: "0 10px 15px -3px hsl(var(--primary) / 0.05), 0 4px 6px -4px hsl(var(--primary) / 0.05)"} : {}}
      viewport={{ margin: "-30% 0px -30% 0px" }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col gap-5 rounded-md border border-border bg-card px-4 py-6 md:p-4 md:py-6 lg:p-8 transition-all lg:hover:border-primary/40 lg:hover:shadow-lg lg:hover:shadow-primary/5 cursor-pointer"    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            project_{String(index + 1).padStart(2, "0")} / brief description
          </span>
          <motion.h3
            whileInView={isMobile ? { color: "hsl(var(--primary))" } : {}}
            viewport={{ margin: "-30% 0px -30% 0px" }}
            transition={{ duration: 0.3 }}
            className="text-md md:text-lg font-medium text-foreground lg:group-hover:text-primary transition-colors"
          >
            {project.title}
          </motion.h3>
        </div>
        <div className="flex items-center gap-2">
          {project.github && (
            <div onClick={(e) => e.stopPropagation()}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub repository`}
                  className="flex h-8 w-8 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  <Github className="h-4 w-4" strokeWidth={1.5} />
                </a>
            </div>
          )}
          {project.live && (
            <div onClick={(e) => e.stopPropagation()}>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="flex h-8 w-8 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                </a>
            </div>
          )}
        </div>
      </div>

      {/* Brief Description */}
      <p className="text-xs md:text-sm leading-relaxed text-muted-foreground text-justify">
        {project.brief}
      </p>

      {/* Tags */}
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {tagsToShow.map((tag) => (
          <motion.span
            key={tag}
            whileInView={isMobile ? {
              borderColor: "hsl(var(--primary) / 0.2)",
              color: "hsl(var(--foreground))"
            } : {}}
            viewport={{ margin: "-30% 0px -30% 0px" }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors lg:group-hover:border-primary/20 lg:group-hover:text-foreground"
          >
            {tag}
          </motion.span>
        ))}
        {remainingTags > 0 && (
            <span className="inline-flex items-center rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground group-hover:border-primary/20 group-hover:text-foreground">
                +{remainingTags}
            </span>
        )}
      </div>
    </motion.div>
  )
}
