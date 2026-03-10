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
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-card">
      <div className="flex items-center border-b border-border px-4 py-2.5">
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          tech_stack
        </span>
      </div>
      <div className="relative flex flex-1 items-center overflow-hidden">
        <div className="flex animate-ticker gap-3 whitespace-nowrap px-4 hover:[animation-play-state:paused]">
          {[...techStack, ...techStack].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="inline-flex items-center rounded-sm border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
{/* 
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 20s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style> */}
    </div>
  )
}
