import type { Metadata } from "next"
import { Navigation } from "@/components/layout/navigation"
import { AboutContent } from "./about-content"

export const metadata: Metadata = {
  title: "About | KN Portfolio",
  description: "Detailed background, education, philosophy, and journey of Krishna Nivja.",
}

export default function AboutPage() {
  return (
    <div className="shell-enter min-h-screen">
      <Navigation />
      <main>
        <AboutContent />
      </main>
    </div>
  )
}
