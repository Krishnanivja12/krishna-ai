"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ChevronDown } from "lucide-react"

import { projects } from "@/lib/project-data"
import { TopNav } from "@/components/layout/top-nav"
import { Footer } from "@/components/layout/footer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fadeUpVariant, sectionVariants, cardVariantRight, cardVariantLeft } from "@/lib/animations"
import { useProjectModal } from "@/hooks/use-project-modal"
import { ProjectCard } from "@/components/blocks/project-card"
import { ProjectDetailModal } from "@/components/blocks/project-detail-modal"

const modeFilters = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "data", label: "Web Scraping" },
  { id: "game", label: "Game Development" },
]

export function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState("all")
  const { selectedProject, sourceRect, openProject, closeProject } = useProjectModal()

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.mode.includes(activeFilter))

  return (
    <div className="min-h-screen">
      <TopNav />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-16 lg:pt-28">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>

        {/* Page header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="mb-10 flex items-center gap-4"
        >
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            all projects
          </span>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {String(filtered.length).padStart(2, "0")} results
          </span>
        </motion.div>

        {/* Mode filter bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="mb-10 flex items-center gap-2"
        >
          <span className="mr-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            filter
          </span>
          {/* Desktop view */}
          <div className="hidden items-center gap-1 rounded-sm bg-secondary p-0.5 md:flex">
            {modeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-sm px-3 py-1.5 font-mono text-xs transition-all duration-200 ${activeFilter === filter.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Mobile view */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-sm bg-secondary px-3 py-1.5 font-mono text-xs text-primary outline-none transition-colors hover:bg-secondary/80">
                {modeFilters.find((f) => f.id === activeFilter)?.label}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="font-mono text-xs">
                {modeFilters.map((filter) => (
                  <DropdownMenuItem
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={activeFilter === filter.id ? "text-primary focus:text-primary" : ""}>
                    {filter.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Project list (Grid) */}
        <motion.div
          key={activeFilter}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="grid gap-4 md:grid-cols-2">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onClick={openProject}
              variants={index % 2 === 0 ? cardVariantRight : cardVariantLeft}
              limitTags={true}
            />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20">
            <span className="font-mono text-sm text-muted-foreground">
              No projects found for this filter.
            </span>
            <button
              onClick={() => setActiveFilter("all")}
              className="font-mono text-xs text-primary transition-colors hover:text-foreground"
            >
              Clear filter
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* Project Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={closeProject} sourceRect={sourceRect} />
        )}
      </AnimatePresence>
    </div>
  )
}
