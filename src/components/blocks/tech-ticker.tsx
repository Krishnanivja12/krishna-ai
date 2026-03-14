"use client"

const techStack = [
  "React",
  "Next.js",
  "Python",
  "C#",
  ".NET Core",
  "PyTorch",
  "TypeScript",
  "PostgreSQL",
  "TensorFlow",
  "FastAPI",
  "Docker",
  "AWS",
  "LangChain",
  "Pandas",
]

export function TechTicker() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden"> {/*TODO: Since we removed GlowCard from here we need to add GlowCard somewhere fot the glow effect in bento  {/* Card 4 - Tech Stack Ticker (Small, Bottom Center) */}
      <div className="flex items-center pt-4">
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase opacity-60">
          tech_stack
        </span>
      </div>
      <div className="relative flex flex-1 items-center overflow-hidden">
        <div className="flex animate-ticker gap-3 whitespace-nowrap px-4 hover:[animation-play-state:paused]">
          {[...techStack, ...techStack].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="inline-flex items-center rounded-sm border border-border bg-background/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
