"use client"

import { useEffect, useState } from "react"

const terminalLines = [
  { type: "comment", text: "# data_pipeline.py" },
  { type: "import", text: "import torch" },
  { type: "import", text: "from transformers import AutoModel" },
  { type: "blank", text: "" },
  { type: "code", text: 'model = AutoModel.from_pretrained("bert-base")' },
  { type: "code", text: "tokenizer = AutoTokenizer.from_pretrained()" },
  { type: "blank", text: "" },
  { type: "code", text: "def process_batch(data, batch_size=32):" },
  { type: "code", text: '    """Process data in parallel batches"""' },
  { type: "code", text: "    results = []" },
  { type: "code", text: "    for batch in chunk(data, batch_size):" },
  { type: "code", text: "        embeddings = model.encode(batch)" },
  { type: "code", text: "        results.extend(embeddings)" },
  { type: "code", text: "    return torch.stack(results)" },
  { type: "blank", text: "" },
  { type: "output", text: ">>> Processing 10,000 records..." },
  { type: "output", text: ">>> Batch 1/312 complete [0.3s]" },
  { type: "output", text: ">>> Pipeline finished. Accuracy: 97.3%" },
]

export function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) {
          return 0
        }
        return prev + 1
      })
    }, 300)
    return () => clearInterval(interval)
  }, [])

  const getLineColor = (type: string) => {
    switch (type) {
      case "comment":
        return "text-muted-foreground"
      case "import":
        return "text-primary"
      case "output":
        return "text-emerald-400"
      default:
        return "text-foreground"
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" aria-hidden="true" />
        </div>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          data_pipeline.py
        </span>
      </div>
      <div className="flex-1 overflow-hidden p-4" aria-label="Terminal animation showing a Python data pipeline script">
        <pre className="font-mono text-[11.5px] lg:text-xs leading-relaxed">
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <div key={`${line.text}-${i}`} className={`${getLineColor(line.type)} transition-opacity duration-200`}>
              {line.text || "\u00A0"}
            </div>
          ))}
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-primary" aria-hidden="true" />
        </pre>
      </div>
    </div>
  )
}
