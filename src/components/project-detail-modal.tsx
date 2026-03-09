"use client"

import { useMemo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, ExternalLink, Video, X } from "lucide-react"
import { Project } from "@/lib/project-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitHubReadme } from "@/components/github-readme"

interface ProjectDetailModalProps {
  project: Project
  onClose: () => void
  sourceRect?: DOMRect | null
}

export function ProjectDetailModal({ project, onClose, sourceRect }: ProjectDetailModalProps) {

  // Calculate the final modal position (centered)
  const finalRect = useMemo(() => {
    if (typeof window === "undefined") return { top: "5%", left: "2.5%", width: "95%", height: "90%" }
    const vw = window.innerWidth
    const vh = window.innerHeight

    let widthPct = 95, heightPct = 90
    if (vw >= 1024) { widthPct = 75; heightPct = 85 }
    else if (vw >= 768) { widthPct = 85; heightPct = 85 }

    const w = Math.min(vw * widthPct / 100, 1280) // max-w-5xl = 1280px
    const h = vh * heightPct / 100
    const left = (vw - w) / 2
    const top = (vh - h) / 2

    return { top, left, width: w, height: h }
  }, [])

  // Source rect for the initial/exit keyframe
  const fromRect = sourceRect
    ? { top: sourceRect.top, left: sourceRect.left, width: sourceRect.width, height: sourceRect.height }
    : { top: finalRect.top as number, left: finalRect.left as number, width: (finalRect.width as number) * 0.9, height: (finalRect.height as number) * 0.9 }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      />

      {/* Modal — animates from card rect to centered position */}
      <motion.div
        initial={{
          position: "fixed",
          top: fromRect.top,
          left: fromRect.left,
          width: fromRect.width,
          height: fromRect.height,
          opacity: 0.5,
          borderRadius: 8,
        }}
        animate={{
          top: finalRect.top,
          left: finalRect.left,
          width: finalRect.width,
          height: finalRect.height,
          opacity: 1,
          borderRadius: 12,
        }}
        exit={{
          top: fromRect.top,
          left: fromRect.left,
          width: fromRect.width,
          height: fromRect.height,
          opacity: 0,
          borderRadius: 8,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1], // easeOutExpo — smooth deceleration, no bounce
        }}
        className="fixed z-50 overflow-hidden flex flex-col shadow-2xl shadow-black/40"
        style={{ maxWidth: "none" }} // override any Tailwind max-width
      >
        {/* Glass morphism container */}
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          {/* Subtle gradient border effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 p-[1px]">
            <div className="w-full h-full rounded-xl bg-card/95" />
          </div>

          {/* Content — fades in after expansion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.15, // starts fading in when expansion is ~30% done
              ease: "easeOut",
            }}
            className="relative w-full h-full flex flex-col"
          >
            {/* Header / Close */}
            <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-b from-background/50 to-transparent backdrop-blur-sm">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
                className="font-mono text-sm md:text-lg font-medium uppercase tracking-wider text-foreground"
              >
                {project.title}
              </motion.h2>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="relative group rounded-full p-2 text-muted-foreground transition-colors"
              >
                <div className="absolute inset-0 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                <X className="h-5 w-5 relative z-10 group-hover:text-foreground transition-colors" />
              </motion.button>
            </div>

            {/* Scrollable Content — staggered fade-in */}
            <ScrollArea className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                className="p-4 md:p-6 lg:p-8"
              >
                {/* Top Actions */}
                <div className="mb-8 flex flex-wrap gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                    >
                      <Github className="h-4 w-4" />
                      View Source
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8 flex flex-col gap-4">
                  <h3 className="font-mono text-xs md:text-sm uppercase tracking-widest text-primary">Description</h3>
                  {(Array.isArray(project.description) ? project.description : [project.description]).map((paragraph, i) => (
                    <p key={i} className="text-xs md:text-sm leading-relaxed text-muted-foreground text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="mb-4 font-mono text-xs md:text-sm uppercase tracking-widest text-primary">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-sm border px-2.5 py-1 font-mono text-[10px] text-foreground border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Media */}
                {(project.images || project.video) && (
                  <div>
                    <h3 className="mb-4 font-mono text-xs md:text-sm uppercase tracking-widest text-primary">Gallery</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {project.images?.map((img, i) => (
                        <div
                          key={`${project.title}-img-`}
                          className="relative aspect-video overflow-hidden rounded-sm border border-border bg-secondary"
                        >
                          <Image
                            src={img}
                            alt={`${project.title} screenshot ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {project.video && (
                        <div className="relative aspect-video flex items-center justify-center rounded-sm border border-border bg-secondary">
                          <Video className="h-8 w-8 text-muted-foreground" strokeWidth={1} />
                          <span className="sr-only">Video demo available</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* GitHub README */}
                {project.github && (
                  <GitHubReadme githubUrl={project.github} />
                )}
              </motion.div>
            </ScrollArea>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
