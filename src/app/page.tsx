"use client"

import dynamic from "next/dynamic"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { HeroSkeleton, AboutSkeleton, SkillsSkeleton, ExperienceSkeleton, ProjectsSkeleton, CertificatesSkeleton, ServicesSkeleton } from "@/components/blocks/skeleton"

const HeroBento = dynamic(() => import("@/components/sections/hero-bento").then(m => ({ default: m.HeroBento })), {
  ssr: false,
  loading: () => <HeroSkeleton />
})
const AboutSection = dynamic(() => import("@/components/sections/about-section").then(m => ({ default: m.AboutSection })), {
  ssr: false,
  loading: () => <AboutSkeleton />
})
const SkillsSection = dynamic(() => import("@/components/sections/skills-section").then(m => ({ default: m.SkillsSection })), {
  ssr: false,
  loading: () => <SkillsSkeleton />
})
const ExperienceSection = dynamic(() => import("@/components/sections/experience-section").then(m => ({ default: m.ExperienceSection })), {
  ssr: false,
  loading: () => <ExperienceSkeleton />
})
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section").then(m => ({ default: m.ProjectsSection })), {
  ssr: false,
  loading: () => <ProjectsSkeleton />
})
const CertificatesSection = dynamic(() => import("@/components/sections/certificates-section").then(m => ({ default: m.CertificatesSection })), {
  ssr: false,
  loading: () => <CertificatesSkeleton />
})
const ServicesStrip = dynamic(() => import("@/components/sections/services-strip").then(m => ({ default: m.ServicesStrip })), {
  ssr: false,
  loading: () => <ServicesSkeleton />
})

export default function Page() {
  return (
    <div className="shell-enter min-h-screen">
      <Navigation />
      <main>
        <HeroBento index={1} />
        <AboutSection index={2} />
        <SkillsSection index={3} />
        <ExperienceSection index={4} />
        <ProjectsSection index={5} />
        <CertificatesSection index={6} />
        <ServicesStrip index={7} />
      </main>
      <Footer />
    </div>
  )
}
