import { Navigation } from "@/components/layout/navigation"
import { HeroBento } from "@/components/sections/hero-bento"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { CertificatesSection } from "@/components/sections/certificates-section"
import { ServicesStrip } from "@/components/sections/services-strip"
import { Footer } from "@/components/layout/footer"

export default function Page() {
  return (
    <div className="min-h-screen">
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
