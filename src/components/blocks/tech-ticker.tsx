"use client"

import { useRef, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile-view-effect"

const techStack = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Hugging Face",
  "LangChain",
  "LangGraph",
  "FastAPI",
  "RAG Pipelines",
  "LoRA / QLoRA",
  "PEFT",
  "FAISS",
  "ChromaDB",
  "Pinecone",
  "Weaviate",
  "Transformers",
  "Scikit-learn",
  "XGBoost",
  "LightGBM",
  "MLflow",
  "Weights & Biases",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP Vertex AI",
  "Pandas",
  "Polars",
  "NumPy",
  "CrewAI",
  "AutoGen",
  "Streamlit",
  "Gradio",
  "vLLM",
  "Ollama",
  "ONNX",
  "TensorRT",
]

export function TechTicker() {
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll animation for desktop only
  useEffect(() => {
    if (isMobile || !containerRef.current) return

    const container = containerRef.current
    let animationId: number
    let startTime: number

    const duration = 60000 // 60 seconds for full cycle (slower, more subtle)
    const scrollWidth = container.scrollWidth / 2 // Half because we duplicate items

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = (timestamp - startTime) % duration
      const progress = elapsed / duration
      container.scrollLeft = progress * scrollWidth
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId)
    }
    const handleMouseLeave = () => {
      startTime = Date.now() - (Date.now() % duration)
      animationId = requestAnimationFrame(animate)
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isMobile])

  const handleTouchStart = () => {}
  const handleTouchEnd = () => {}

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex items-center pt-4">
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase opacity-60">
          tech_stack
        </span>
      </div>
      <div className="relative flex flex-1 items-center overflow-hidden">
        <div
          ref={containerRef}
          className={`flex gap-3 whitespace-nowrap px-4 ${isMobile ? "overflow-x-auto scroll-smooth snap-x snap-mandatory" : "overflow-hidden"}`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: isMobile ? "x mandatory" : undefined,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Technology stack"
        >
          {[...techStack, ...techStack].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className={`inline-flex items-center rounded-sm border border-border bg-card/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-foreground ${isMobile ? "snap-start flex-shrink-0" : ""}`}
            >
              {tech}
            </span>
          ))}
        </div>
        {/* Gradient fade edges for desktop */}
        {!isMobile && (
          <>
            <div className="absolute left-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute right-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" aria-hidden="true" />
          </>
        )}
      </div>
    </div>
  )
}
