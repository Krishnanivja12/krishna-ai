"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCcw, SearchX } from "lucide-react"

import { projects } from "@/lib/project-data"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { fadeUpVariant, sectionVariants, cinematicGrid, cardVariantRight, cardVariantLeft } from "@/lib/animations"
import { useProjectModal } from "@/hooks/use-project-modal"
import { ProjectCard } from "@/components/blocks/project-card"
import { ProjectDetailModal } from "@/components/blocks/project-detail-modal"
import { SectionHeader } from "@/components/layout/section-header"
import { PremiumBackButton } from "@/components/ui/premium-back-button"
import { FilterBar } from "@/components/blocks/filter-bar"
import { MobileFilterHub } from "@/components/blocks/mobile-filter-hub"
import { useIsMobile, useAtTopHighlight } from "@/hooks/use-mobile-view-effect"
import { useNavigationHub } from "@/contexts/navigation-hub-context"

const modeFilters = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "data", label: "Web Scraping" },
  { id: "game", label: "Game Dev" },
]

export function ProjectsPageContent() {
  const { isOpen: isNavHubOpen } = useNavigationHub()
  const [activeFilter, setActiveFilter] = useState("all")
  const { selectedProject, sourceRect, openProject, closeProject } = useProjectModal()
  const isMobile = useIsMobile()
  const scrollThreshold = 25
  const isAtTop = useAtTopHighlight(isMobile, scrollThreshold)

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.mode.includes(activeFilter))

  const filterItems = modeFilters.map(f => ({
    ...f,
    count: f.id === "all" ? projects.length : projects.filter(p => p.mode.includes(f.id)).length
  }))

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-16 lg:pt-28">
        {/* HUD Navigation */}
        <div className="mb-12">
          <PremiumBackButton 
            href="/" 
            text="Return to Dashboard" 
            autoHover={isAtTop}
            isVisible={!isNavHubOpen}
          />
        </div>

        {/* Page header */}
        <SectionHeader 
          index={projects.length} 
          title="Archive // All Projects" 
          subtitle="A comprehensive index of technical implementations, research experiments, and engineering solutions."
        />

        {/* Mode filter bar - Responsive Hub System */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-2 px-1 opacity-50">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              [ filter_system ]
            </span>
            <div className="hidden h-[1px] w-4 bg-border sm:block" />
          </div>
          
          {/* Mobile HUD Selector */}
          <div className="block sm:hidden">
            <MobileFilterHub 
              items={filterItems}
              activeId={activeFilter}
              onChange={setActiveFilter}
            />
          </div>

          {/* Desktop/Tablet Railway Filter */}
          <div className="hidden sm:block">
            <FilterBar 
              items={filterItems}
              activeId={activeFilter}
              onChange={setActiveFilter}
              className="max-w-fit"
            />
          </div>
        </motion.div>

        {/* Project list (Grid) */}
        <motion.div
          key={activeFilter}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={cinematicGrid}
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

        {/* No Result Found Component - Hardened Responsiveness */}
        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[40vh] flex-col items-center justify-center py-12 text-center"
          >
            <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-primary blur-3xl" 
              />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                <SearchX className="h-8 w-8 text-primary/30" strokeWidth={1} />
              </div>
            </div>
            
            <div className="space-y-4 px-6">
              <h3 className="font-mono text-sm tracking-[0.3em] text-foreground uppercase">
                {"> "} STATUS: NO_LOCAL_ARCHIVE
              </h3>
              <p className="mx-auto max-w-[240px] font-mono text-[9px] leading-relaxed text-muted-foreground/60 uppercase tracking-widest">
                No technical implementations match the current mode identifier. Recommendation: System Reset.
              </p>
            </div>

            <button
              onClick={() => setActiveFilter("all")} //TODO: set a default filter as per "Perspective mode" and use it here
              className="mt-10 group relative flex items-center gap-3 overflow-hidden rounded-sm border border-primary/30 bg-primary/5 px-8 py-3 font-mono text-[10px] tracking-widest text-primary uppercase transition-all hover:bg-primary/10 hover:border-primary"
            >
              <RefreshCcw className="h-3.5 w-3.5 transition-transform duration-700 group-hover:rotate-180" />
              <span>[ Reset Filter ]</span>
              
              {/* Corner Glitch lines */}
              <div className="absolute top-0 right-0 h-1 w-1 border-t border-r border-primary/50" />
              <div className="absolute bottom-0 left-0 h-1 w-1 border-b border-l border-primary/50" />
            </button>
          </motion.div>
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
