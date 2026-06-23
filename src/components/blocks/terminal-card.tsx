"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { headerReveal, staggerContainer } from "@/lib/animations"
import { useMode } from "@/hooks/use-mode"

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
      { type: "output", text: '>>> "Start with Python, build projects,' },
      { type: "output", text: '>>>  stay consistent, never stop learning."' },
    ],
  },
  "ai-ml": {
    filename: "ask_ai.py",
    lines: [
      { type: "comment", text: "# ask_ai.py" },
      { type: "import", text: "import anthropic" },
      { type: "blank", text: "" },
      { type: "code", text: "client = anthropic.Anthropic(" },
      { type: "code", text: '    api_key="sk-ant-••••••••••••••••"' },
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
      { type: "output", text: '>>> "Pick one language, build real things,' },
      { type: "output", text: '>>>  read others code, repeat daily."' },
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
      { type: "output", text: ">>> Pipeline finished in 8.3s ✓" },
    ],
  },
}

export function TerminalCard() {
  const { mode } = useMode()
  const content = terminalContent[mode] ?? terminalContent.generalist
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= content.lines.length) return 0
        return prev + 1
      })
    }, 200)
    return () => clearInterval(interval)
  }, [content.lines.length])

  const getLineColor = (type: string) => {
    switch (type) {
      case "comment": return "text-muted-foreground"
      case "import":  return "text-primary"
      case "output":  return "text-emerald-400"
      default:        return "text-foreground"
    }
  }

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
          <motion.span variants={headerReveal} className="h-2.5 w-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
          <motion.span variants={headerReveal} className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
          <motion.span variants={headerReveal} className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" aria-hidden="true" />
        </div>
        <motion.span variants={headerReveal} className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {content.filename}
        </motion.span>
      </div>
      <div className="flex-1 overflow-hidden p-4" aria-label={`Terminal showing ${content.filename}`}>
        <pre className="font-mono text-[11.5px] lg:text-xs leading-relaxed">
          {content.lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={`${getLineColor(line.type)} transition-opacity duration-200`}>
              {line.text || "\u00A0"}
            </div>
          ))}
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-primary" aria-hidden="true" />
        </pre>
      </div>
    </motion.div>
  )
}
