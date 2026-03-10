import { TopNav } from "@/components/top-nav"
import { HeroBento } from "@/components/hero-bento"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { CertificatesSection } from "@/components/certificates-section"
import { ServicesStrip } from "@/components/services-strip"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen">
      <TopNav />
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
