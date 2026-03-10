"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { projects } from "@/lib/project-data"
import Link from "next/link"
import { useMode } from "@/hooks/use-mode"
import { sectionVariants, fadeUpVariant, cardVariantRight, cardVariantLeft } from "@/lib/animations"
import { useProjectModal } from "@/hooks/use-project-modal"
import { ProjectCard } from "@/components/blocks/project-card"
import { ProjectDetailModal } from "@/components/blocks/project-detail-modal"
import { useAutoHighlight, useIsMobile } from "@/hooks/use-mobile-view-effect"
import { useRef } from "react"

interface ProjectsSectionProps {
  index: number
}

export function ProjectsSection({ index }: ProjectsSectionProps) {
  const { mode } = useMode()
  const { selectedProject, sourceRect, openProject, closeProject } = useProjectModal()
  const isMobile = useIsMobile()
  const viewAllRef = useRef<HTMLDivElement | null>(null)
  const isViewAllActive = useAutoHighlight(viewAllRef, isMobile)

  const filteredProjects = projects.filter((project) =>
    mode === "generalist" || project.mode.includes(mode)
  )

  return (
    <section id="projects" className="border-t border-border" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            projects
          </span>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <h2 id="projects-heading" className="sr-only">Projects</h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="grid gap-4 md:grid-cols-2">
          {filteredProjects.slice(0, 4).map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onClick={openProject}
              variants={index % 2 === 0 ? cardVariantRight : cardVariantLeft}
            />
          ))}
        </motion.div>

        {filteredProjects.length > 4 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="mt-8 flex justify-center"
            ref={viewAllRef}>
            <Link
              href="/projects"
              className={`group inline-flex items-center gap-3 rounded-sm border border-border px-6 py-3 font-mono text-sm text-muted-foreground transition-all hover:border-primary hover:text-foreground hover:gap-4 ${isViewAllActive ? "border-primary text-foreground gap-4" : ""}`}
            >
              View All {mode === "generalist" ? "" : mode} Projects
              <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${isViewAllActive ? "translate-x-0.5" : ""}`} aria-hidden="true" />
            </Link>
          </motion.div>
        )}

        {/* Project Detail Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailModal project={selectedProject} onClose={closeProject} sourceRect={sourceRect} />
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
