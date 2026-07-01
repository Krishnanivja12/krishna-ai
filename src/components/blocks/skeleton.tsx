"use client"

import { createContext, useContext, useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAccessibility } from "@/contexts/accessibility-context"

interface SkeletonProps {
  className?: string
}

function SkeletonPulse({ className = "" }: SkeletonProps) {
  const { reducedMotion } = useAccessibility()

  if (reducedMotion) {
    return <div className={`bg-muted/50 rounded-md ${className}`} />
  }

  return (
    <motion.div
      className={`bg-muted/50 rounded-md ${className}`}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  )
}

// ─── Hero Section Skeleton ────────────────────────────
export function HeroSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 md:pt-36 lg:pt-40 lg:pb-24">
      {/* Section label */}
      <div className="mb-8 flex items-center gap-4">
        <SkeletonPulse className="h-3 w-16" />
        <SkeletonPulse className="h-px flex-1" />
        <SkeletonPulse className="h-3 w-6" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:grid-rows-[1fr_auto]">
        {/* Main intro card */}
        <div className="sm:col-span-2 md:col-span-2 rounded-md border border-border bg-card/40 backdrop-blur-md p-6 md:p-8 lg:p-10">
          <SkeletonPulse className="h-3 w-40 mb-6" />
          <SkeletonPulse className="h-10 w-3/4 mb-3" />
          <SkeletonPulse className="h-10 w-1/2 mb-4" />
          <SkeletonPulse className="h-4 w-full mb-2" />
          <SkeletonPulse className="h-4 w-5/6 mb-6" />
          <div className="flex gap-2 mb-6">
            <SkeletonPulse className="h-6 w-28" />
            <SkeletonPulse className="h-6 w-24" />
            <SkeletonPulse className="h-6 w-20" />
            <SkeletonPulse className="h-6 w-32" />
          </div>
          <div className="flex gap-3">
            <SkeletonPulse className="h-10 w-32" />
            <SkeletonPulse className="h-10 w-28" />
          </div>
        </div>

        {/* Right card */}
        <div className="hidden md:flex md:col-span-1 md:row-span-2 rounded-md border border-border bg-card/40 min-h-[440px]" />

        {/* Status */}
        <div className="rounded-md border border-border bg-card/40 p-5">
          <div className="flex items-center gap-4">
            <SkeletonPulse className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-1">
              <SkeletonPulse className="h-3 w-24" />
              <SkeletonPulse className="h-4 w-44" />
            </div>
          </div>
        </div>

        {/* Tech ticker */}
        <div className="rounded-md border border-border bg-card/40 p-4 min-h-[72px]" />
      </div>
    </div>
  )
}

// ─── Section Header Skeleton ─────────────────────────
export function SectionHeaderSkeleton() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <SkeletonPulse className="h-3 w-12" />
        <SkeletonPulse className="h-px flex-1" />
        <SkeletonPulse className="h-3 w-6" />
      </div>
      <SkeletonPulse className="h-8 w-64 mb-3" />
      <SkeletonPulse className="h-4 w-96" />
    </div>
  )
}

// ─── About Section Skeleton ──────────────────────────
export function AboutSkeleton() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <SectionHeaderSkeleton />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-md border border-border bg-card/40 p-4 md:p-8">
            <SkeletonPulse className="h-3 w-24 mb-6" />
            <SkeletonPulse className="h-4 w-full mb-3" />
            <SkeletonPulse className="h-4 w-full mb-3" />
            <SkeletonPulse className="h-4 w-5/6 mb-3" />
            <SkeletonPulse className="h-4 w-full mb-3" />
            <SkeletonPulse className="h-4 w-4/5" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-md border border-border bg-card/40 p-4 md:p-8">
              <SkeletonPulse className="h-10 w-10 mb-4" />
              <SkeletonPulse className="h-5 w-3/4 mb-2" />
              <SkeletonPulse className="h-4 w-1/2 mb-3" />
              <SkeletonPulse className="h-4 w-full mb-3" />
              <SkeletonPulse className="h-4 w-5/6 mb-4" />
              <div className="flex gap-4">
                <SkeletonPulse className="h-3 w-24" />
                <SkeletonPulse className="h-3 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Skills Section Skeleton ─────────────────────────
export function SkillsSkeleton() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <SectionHeaderSkeleton />
        <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-background p-4 md:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-5">
                <SkeletonPulse className="h-3 w-32" />
                <SkeletonPulse className="h-3 w-6" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((j) => (
                  <SkeletonPulse key={j} className="h-6 w-20" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Experience Section Skeleton ─────────────────────
export function ExperienceSkeleton() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <SectionHeaderSkeleton />
        <div className="flex flex-col gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-md border border-border bg-card/40 p-4 md:p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-4">
                <SkeletonPulse className="h-10 w-10 shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <SkeletonPulse className="h-5 w-48" />
                  <SkeletonPulse className="h-4 w-36" />
                </div>
                <div className="flex gap-4">
                  <SkeletonPulse className="h-3 w-20" />
                  <SkeletonPulse className="h-3 w-28" />
                </div>
              </div>
              <SkeletonPulse className="h-4 w-full mb-2" />
              <SkeletonPulse className="h-4 w-5/6 mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((j) => (
                  <SkeletonPulse key={j} className="h-5 w-16" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Projects Section Skeleton ───────────────────────
export function ProjectsSkeleton() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <SectionHeaderSkeleton />
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-md border border-border bg-card/40 p-4 md:p-6 lg:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col gap-2">
                  <SkeletonPulse className="h-3 w-24" />
                  <SkeletonPulse className="h-5 w-48" />
                </div>
                <SkeletonPulse className="h-8 w-8" />
              </div>
              <SkeletonPulse className="h-4 w-full mb-2" />
              <SkeletonPulse className="h-4 w-full mb-2" />
              <SkeletonPulse className="h-4 w-3/4 mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((j) => (
                  <SkeletonPulse key={j} className="h-5 w-16" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Certificates Section Skeleton ───────────────────
export function CertificatesSkeleton() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <SectionHeaderSkeleton />
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-background p-4 md:p-6">
              <SkeletonPulse className="h-8 w-8 mb-3" />
              <SkeletonPulse className="h-4 w-3/4 mb-1" />
              <SkeletonPulse className="h-3 w-1/2 mb-4" />
              <div className="flex items-center justify-between">
                <SkeletonPulse className="h-3 w-16" />
                <SkeletonPulse className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Skeleton Context ────────────────────────────────
// Shows skeletons on initial mount, then reveals real content after hydration
// Uses sessionStorage to skip on subsequent SPA navigations

interface SkeletonContextValue {
  ready: boolean
}

const SkeletonContext = createContext<SkeletonContextValue>({ ready: false })

export function SkeletonProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const skippedRef = useRef(false)

  useEffect(() => {
    // Skip skeleton on subsequent SPA navigations within same session
    if (sessionStorage.getItem("portfolio:hydrated")) {
      skippedRef.current = true
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => setReady(true), 0)
      return
    }

    // Show skeleton for 1 frame, then reveal content
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        sessionStorage.setItem("portfolio:hydrated", "true")
        setReady(true)
      })
    })
  }, [])

  const value = useMemo(() => ({ ready }), [ready])

  return (
    <SkeletonContext.Provider value={value}>
      {children}
    </SkeletonContext.Provider>
  )
}

const SKELETON_COMPONENTS: Record<string, React.ComponentType> = {
  hero: HeroSkeleton,
  about: AboutSkeleton,
  skills: SkillsSkeleton,
  experience: ExperienceSkeleton,
  projects: ProjectsSkeleton,
  certificates: CertificatesSkeleton,
  services: ServicesSkeleton,
}

export function SkeletonSection({
  children,
  skeleton,
}: {
  children: React.ReactNode
  skeleton: string
}) {
  const { ready } = useContext(SkeletonContext)
  const SkeletonComponent = SKELETON_COMPONENTS[skeleton]

  return (
    <AnimatePresence mode="wait">
      {!ready && SkeletonComponent ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <SkeletonComponent />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Services Strip Skeleton ─────────────────────────
export function ServicesSkeleton() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <SectionHeaderSkeleton />
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background p-6 md:p-8">
              <SkeletonPulse className="h-10 w-10 mb-4" />
              <SkeletonPulse className="h-5 w-40 mb-2" />
              <SkeletonPulse className="h-4 w-full mb-2" />
              <SkeletonPulse className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Home Page Skeleton (Full-page loading) ──────────
export function PageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Navigation skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md px-4 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <SkeletonPulse className="h-6 w-24" />
          <div className="flex gap-6">
            <SkeletonPulse className="h-4 w-16" />
            <SkeletonPulse className="h-4 w-16" />
            <SkeletonPulse className="h-4 w-16" />
            <SkeletonPulse className="h-4 w-16" />
          </div>
        </div>
      </div>

      <HeroSkeleton />
      <AboutSkeleton />
      <ExperienceSkeleton />
      <SkillsSkeleton />
      <ProjectsSkeleton />
      <CertificatesSkeleton />
    </div>
  )
}
