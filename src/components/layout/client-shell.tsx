"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { ScrollProgress } from "./scroll-progress"
import { ModeProvider } from "@/hooks/use-mode"

const AIAssistant = dynamic(
  () => import("../blocks/ai-assistant").then((mod) => mod.AIAssistant),
  { ssr: false }
)

export function ClientShell({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <ScrollProgress containerRef={containerRef} />
      <ModeProvider>
        <div
          ref={containerRef}
          className="relative z-10 h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {children}
        </div>
        <AIAssistant />
      </ModeProvider>
    </>
  )
}
