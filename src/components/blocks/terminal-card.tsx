"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { headerReveal, staggerContainer } from "@/lib/animations"
import { useMode } from "@/hooks/use-mode"
import { useReducedMotion } from "@/hooks/use-mobile-view-effect"

type TerminalLine = { type: string; text: string }

const terminalContent: Record<string, { filename: string; lines: TerminalLine[] }> = {
  generalist: {
    filename: "Ask_Ai.py",
    lines: [
      { type: "comment", text: "# Ask_Ai.py" },
      { type: "import", text: "from openai import OpenAI" },
      { type: "blank", text: "" },
      { type: "code", text: "client = OpenAI(" },
      { type: "code", text: '    api_key="sk-454fasfas54asfasf546asfa"' },
      { type: "code", text: ")" },
      { type: "blank", text: "" },
      { type: "code", text: "response = client.chat.completions.create(" },
      { type: "code", text: '    model="gpt-4o",' },
      { type: "code", text: "    messages=[{" },
      { type: "code", text: '        "role": "user",' },
      { type: "code", text: '        "content": "How to learn coding?"' },
      { type: "code", text: "    }]" },
      { type: "code", text: ")" },
      { type: "blank", text: "" },
      { type: "output", text: ">>> Calling GPT-4o..." },
      { type: "output", text: '"Start with Python, build projects,' },
      { type: "output", text: ' stay consistent, never stop learning."' },
    ],
  },
  "ai-ml": {
    filename: "ask_ai.py",
    lines: [
      { type: "comment", text: "# ask_ai.py" },
      { type: "import", text: "import anthropic" },
      { type: "blank", text: "" },
      { type: "code", text: "client = anthropic.Anthropic(" },
      { type: "code", text: '    api_key="sk-ant-..."' },
      { type: "code", text: ")" },
      { type: "blank", text: "" },
      { type: "code", text: "message = client.messages.create(" },
      { type: "code", text: '    model="claude-3-5-sonnet-20241022",' },
      { type: "code", text: "    max_tokens=1024," },
      { type: "code", text: "    messages=[{" },
      { type: "code", text: '        "role": "user",' },
      { type: "code", text: '        "content": "How to learn coding?"' },
      { type: "code", text: "    }]" },
      { type: "code", text: ")" },
      { type: "blank", text: "" },
      { type: "output", text: ">>> Claude responding..." },
      { type: "output", text: '"Pick one language, build real things,' },
      { type: "output", text: ' read others code, repeat daily."' },
    ],
  },
  fullstack: {
    filename: "api_server.ts",
    lines: [
      { type: "comment", text: "// api_server.ts" },
      { type: "import", text: 'import { NextRequest, NextResponse } from "next/server"' },
      { type: "import", text: 'import { db } from "@/lib/db"' },
      { type: "blank", text: "" },
      { type: "code", text: "export async function GET(req: NextRequest) {" },
      { type: "code", text: "  const { searchParams } = req.nextUrl" },
      { type: "code", text: '  const id = searchParams.get("id")' },
      { type: "blank", text: "" },
      { type: "code", text: "  const data = await db.query(" },
      { type: "code", text: '    "SELECT * FROM users WHERE id = $1",' },
      { type: "code", text: "    [id]" },
      { type: "code", text: "  )" },
      { type: "blank", text: "" },
      { type: "code", text: "  return NextResponse.json(data)" },
      { type: "code", text: "}" },
      { type: "blank", text: "" },
      { type: "output", text: ">>> Server running on :3000" },
      { type: "output", text: ">>> GET /api/users?id=42  200 OK [12ms]" },
    ],
  },
  data: {
    filename: "etl_pipeline.py",
    lines: [
      { type: "comment", text: "# etl_pipeline.py" },
      { type: "import", text: "import pandas as pd" },
      { type: "import", text: "from pyspark.sql import SparkSession" },
      { type: "import", text: "import boto3" },
      { type: "blank", text: "" },
      { type: "code", text: "spark = SparkSession.builder\\" },
      { type: "code", text: '    .appName("ETL Pipeline")\\.getOrCreate()' },
      { type: "blank", text: "" },
      { type: "code", text: "def run_pipeline(source: str):" },
      { type: "code", text: "    df = spark.read.parquet(source)" },
      { type: "code", text: "    df = df.dropDuplicates().na.drop()" },
      { type: "code", text: "    df = transform(df)" },
      { type: "code", text: '    df.write.mode("overwrite").parquet(SINK)' },
      { type: "blank", text: "" },
      { type: "output", text: ">>> Loading 4.2M records from S3..." },
      { type: "output", text: ">>> Dedup complete. 3.98M rows retained." },
      { type: "output", text: ">>> Pipeline finished in 8.3s" },
    ],
  },
}

const TYPE_COLORS: Record<string, string> = {
  comment: "text-muted-foreground",
  import: "text-primary",
  output: "text-emerald-400",
  code: "text-foreground",
}

const TYPE_DELAYS: Record<string, number> = {
  comment: 50,
  import: 80,
  code: 40,
  output: 120,
  blank: 20,
}

export function TerminalCard() {
  const { mode } = useMode()
  const reducedMotion = useReducedMotion()
  const content = terminalContent[mode] ?? terminalContent.generalist
  const [visibleLines, setVisibleLines] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [hasInitialized, setHasInitialized] = useState(false)
  const [cycleCount, setCycleCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const getLineColor = useCallback((type: string) => TYPE_COLORS[type] ?? TYPE_COLORS.code, [])

  const typeNextLine = useCallback(() => {
    if (visibleLines >= content.lines.length) {
      setIsTyping(false)
      setTimeout(() => {
        setCycleCount(c => c + 1)
        setVisibleLines(0)
        setIsTyping(true)
      }, reducedMotion ? 500 : 2000)
      return
    }

    const line = content.lines[visibleLines]
    const delay = reducedMotion ? 10 : (TYPE_DELAYS[line.type] ?? 50)
    
    setTimeout(() => {
      setVisibleLines((prev) => prev + 1)
    }, delay)
  }, [visibleLines, content.lines, reducedMotion])

  // Initialize on mount - handle reduced motion
  useEffect(() => {
    if (reducedMotion) {
      setTimeout(() => {
        setVisibleLines(content.lines.length)
        setHasInitialized(true)
      }, 0)
      return
    }
    
    if (!hasInitialized) {
      setTimeout(() => {
        setHasInitialized(true)
        setIsTyping(true)
      }, 0)
    }
  }, [reducedMotion, content.lines.length, hasInitialized])

  // Main typing loop
  useEffect(() => {
    if (reducedMotion || !isTyping) return
    
    const interval = setInterval(typeNextLine, reducedMotion ? 10 : 80)
    return () => clearInterval(interval)
  }, [typeNextLine, reducedMotion, isTyping])

  // Cursor blink
  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(interval)
  }, [reducedMotion])

  // Auto-scroll to bottom when new lines appear
  useEffect(() => {
    if (containerRef.current && visibleLines > 0) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [visibleLines])

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="flex h-full flex-col overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <motion.span
            variants={headerReveal}
            className="h-2.5 w-2.5 rounded-full bg-red-500/70"
            aria-hidden="true"
          />
          <motion.span
            variants={headerReveal}
            className="h-2.5 w-2.5 rounded-full bg-yellow-500/70"
            aria-hidden="true"
          />
          <motion.span
            variants={headerReveal}
            className="h-2.5 w-2.5 rounded-full bg-emerald-500/70"
            aria-hidden="true"
          />
        </div>
        <motion.span
          variants={headerReveal}
          className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase"
        >
          {content.filename}
        </motion.span>
        <motion.span
          className="ml-auto flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span>CONNECTED</span>
        </motion.span>
      </div>
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden p-4"
        aria-label={`Terminal showing ${content.filename}`}
        role="region"
        aria-live="polite"
        tabIndex={0}
      >
        <pre className="font-mono text-[11.5px] lg:text-xs leading-relaxed">
          <AnimatePresence>
            {content.lines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.15, ease: "easeOut" }}
                className={`${getLineColor(line.type)} transition-opacity duration-200`}
              >
                {line.text || "\u00A0"}
              </motion.div>
            ))}
          </AnimatePresence>
          {(isTyping || cycleCount > 0) && (
            <span className="inline-block h-3.5 w-1.5 align-bottom" aria-hidden="true">
              <motion.span
                className="inline-block h-full w-full bg-primary"
                animate={{ opacity: cursorVisible ? 1 : 0 }}
                transition={{ duration: 0.01, repeat: Infinity, repeatType: "reverse" }}
                style={{ animationDuration: "530ms" }}
              />
            </span>
          )}
        </pre>
      </div>
      <motion.div
        className="border-t border-border/50 px-4 py-1.5 flex items-center justify-between text-[9px] font-mono text-muted-foreground/60"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <span>LINE {visibleLines}/{content.lines.length}</span>
        <span>{mode.toUpperCase()}</span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[8px] border border-border">Ctrl+C</kbd>
          <span className="text-muted-foreground/40">INTERRUPT</span>
        </span>
      </motion.div>
    </motion.div>
  )
}