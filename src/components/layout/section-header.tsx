"use client"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  index: number
  title: string
  subtitle?: string
}

export function SectionHeader({ index, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-primary font-bold uppercase">
             {String(index).padStart(2, "0")}
          </span>
          <div className="h-[1px] w-8 bg-primary/30" />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase italic">
             Archive_00{index}
          </span>
        </div>
        <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </div>
      
      {subtitle && (
        <div className="max-w-md">
          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground uppercase tracking-wider">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  )
}
