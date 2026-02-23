"use client"

import { useEffect, useState, useRef } from "react"
import { motion, Variants, useInView } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Project } from "@/lib/project-data"

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

  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" })
  const isActive = isMobile && isInView

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onClick={() => onClick(project)}
      className={`group relative flex flex-col gap-5 rounded-md border bg-card px-4 py-6 md:p-4 md:py-6 lg:p-8 transition-all duration-300 cursor-pointer lg:hover:border-primary/40 lg:hover:shadow-lg lg:hover:shadow-primary/5 ${isActive ? "border-primary/40 shadow-lg shadow-primary/5" : "border-border shadow-none"}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            project_{String(index + 1).padStart(2, "0")} / brief description
          </span>
          <h3
            className={`text-md md:text-lg font-medium transition-colors duration-300 lg:group-hover:text-primary ${isActive ? "text-primary" : "text-foreground"}`}
          >
            {project.title}
          </h3>
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
          <span
            key={tag}
            className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[10px] transition-colors duration-300 lg:group-hover:border-primary/20 lg:group-hover:text-foreground ${isActive ? "border-primary/20 text-foreground" : "border-border text-muted-foreground"}`}
          >
            {tag}
          </span>
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