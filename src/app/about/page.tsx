import type { Metadata } from "next"
import { Navigation } from "@/components/layout/navigation"
import { AboutContent } from "./about-content"

export const metadata: Metadata = {
  title: "About | VM Portfolio",
  description: "Detailed background, education, philosophy, and journey of Viraj Mavani.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <AboutContent />
      </main>
    </div>
  )
}