"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Send, Sparkles, MessageSquare } from "lucide-react"
import { useAccessibility } from "@/contexts/accessibility-context"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: number
}

const suggestedPrompts = [
  "What are your core skills?",
  "Tell me about your projects",
  "What certifications do you have?",
  "What is your education background?",
]

const botResponses: Record<string, string> = {
  "what are your core skills":
    "I specialize in AI/ML engineering, full-stack development, and data architecture. My expertise spans:\n\n🧠 AI/ML: PyTorch, TensorFlow, Scikit-learn, XGBoost, CNNs, RNNs, LSTMs\n🤖 LLMs & GenAI: LangChain, Hugging Face, RAG Pipelines, LoRA/QLoRA, PEFT, Prompt Engineering\n⚙️ Backend & MLOps: FastAPI, Docker, RESTful APIs, Batch Inference, Model Versioning\n📊 Data & Cloud: Python, SQL, PostgreSQL, Pandas, NumPy, AWS EC2/S3, Git\n\nCheck out the Skills section for the full breakdown with category groupings!",
  "show me your experience":
    "Here's Krishna's professional experience:\n\n💼 AI/ML Engineer @ STEVE'S AI LAB (Apr 2026 - Present)\n   • Built GeoSpatial AI Platform — LangChain RAG, ChromaDB, Google Maps API, OpenStreetMap, 5+ REST APIs\n   • Engineered multi-step retrieval orchestration agent with LangGraph — reduced LLM hallucination by 40%\n   • Containerized with Docker, deployed on AWS EC2 — 99.2% uptime, monitored with Weights & Biases\n   • Fine-tuned LLMs with LoRA/QLoRA (Hugging Face PEFT) and GGUF/GPTQ quantization\n\n💼 Data Science Intern @ TECHIESHUBHDEEP IT SOLUTIONS (Apr 2025 - Jan 2026)\n   • Architected scalable AI APIs with FastAPI — reduced inference latency by 40%\n   • Built ML pipelines with Scikit-learn and XGBoost — improved model accuracy by 25%\n   • Designed CNN/RNN architectures for sentiment analysis and NLP classification\n\n📚 Data Science Trainee @ ALMABETTER (Oct 2024 - Mar 2025)\n   • Delivered data-driven insights and forensic tech solutions for real-world scenarios\n   • Built expertise in EDA, statistical modeling, and applied ML through project-based training\n\nScroll to the Experience section for the full timeline with animations!",
  "tell me about your projects":
    "Krishna has built 7 featured projects spanning AI/ML, voice AI, multi-agent systems, and more — here's a quick overview:\n\n🔍 RAG Document Search System\n   Production-grade retrieval-augmented generation with FAISS vector DB, FastAPI, and LangChain for semantic document search and Q&A.\n\n💪 Fitness Mistral 7B — LLM Fine-Tuning\n   Fine-tuned Mistral 7B Instruct for fitness domain using LoRA/PEFT with 4-bit QLoRA quantization. Achieved BERTScore of 0.89.\n\n📄 Resume Analyzer\n   NLP-based resume screening with skill extraction, TF-IDF matching, and Streamlit frontend. Reduces manual HR screening effort.\n\n📝 LinkedIn Post Generator\n   AI-powered post generation tool with LangChain pipelines supporting professional, storytelling, and technical tones.\n\n🚀 ResearchFlow AI — Multi-Agent Research Assistant\n   Orchestrates 6 specialized AI agents (Search, Writer, Critic, Fact Checker, etc.) on free Groq Cloud LLMs to produce fact-checked research reports.\n\n🎤 Personalized Voice Assistant\n   AI-powered voice assistant with speech recognition, intent classification, and multi-turn conversation for hands-free task execution.\n\n🍵 LeetCode & Chill — DSA Practice Repository\n   Daily LeetCode practice with clean, well-commented Python solutions across Easy/Medium/Hard, covering Arrays, DP, Graphs, and more.\n\nHead to the Projects section for detailed descriptions and GitHub links!",
  "download your resume":
    "You can download Krishna's resume from the Resume button in the navigation bar or the hero section. Both Data Analyst and Full-Stack versions are available — choose the one that matches your interest!",
  "what certifications do you have":
    "Krishna holds 4 professional certifications:\n\n🎓 ChatGPT Prompt Engineering for Developers — DeepLearning.AI (Jul 2025)\n📊 Tata Group - Data Visualisation: Empowering Business with Effective Insights — Forage (Mar 2025)\n📈 Deloitte Australia - Data Analytics Job Simulation — Forage (Mar 2025)\n🖥️ Cisco Verified Data Analytics Essentials — Cisco Networking Academy (Mar 2025)\n\nThe Tata and Deloitte credentials include verifiable certificates. Check the Certificates section on the About page for more details!",
  "what is your education background":
    "Krishna is pursuing a Bachelor of Technology in Artificial Intelligence & Machine Learning at Shri Ram Group of College, Banmore, MP, India.\n\n🎯 Focus: Specialization in AI, ML, NLP & Deep Learning\n💡 Approach: Actively building production-grade ML systems alongside academics — including fine-tuned LLMs, RAG pipelines, and FastAPI deployments.\n\nHe also completed ChatGPT Prompt Engineering for Developers certification from DeepLearning.AI to deepen his LLM application skills.",
}

// Detailed project responses for individual project queries
const projectDetails: Record<string, string> = {
  "rag":
    "🔍 RAG Document Search System\n\nA production-grade Retrieval-Augmented Generation system for semantic document search and intelligent question answering.\n\nTech Stack: Python, LangChain, FastAPI, FAISS, HuggingFace, BAAI/bge embeddings\nHighlights:\n• Implements end-to-end RAG pipeline — ingestion, chunking, embedding, retrieval, synthesis\n• Smart chunking strategies balancing size and overlap for optimal context preservation\n• Cosine similarity ranking with FAISS vector DB for fast approximate nearest-neighbor search\n• Asynchronous FastAPI endpoints for scalable document ingestion and query processing\n\n🔗 GitHub: github.com/Krishnanivja12/rag-document-search",
  "mistral":
    "💪 Fitness Mistral 7B — LLM Fine-Tuning\n\nFine-tuned the Mistral 7B Instruct model for the fitness domain using parameter-efficient techniques.\n\nTech Stack: Python, Mistral 7B, LoRA, QLoRA, PEFT, HuggingFace, PyTorch, bitsandbytes\nHighlights:\n• Applied LoRA adapters with 4-bit QLoRA quantization to minimize GPU memory usage\n• Achieved BERTScore of 0.89 — strong semantic alignment with reference fitness guidance\n• Full fine-tuning lifecycle: dataset prep, PEFT config, training, evaluation, model export\n• Fine-tuned on consumer-grade hardware through quantization and parameter-efficient methods\n\n🔗 GitHub: github.com/Krishnanivja12/fitness-mistral-7b",
  "resume analyzer":
    "📄 Resume Analyzer\n\nAn NLP-powered resume screening system that automates candidate-job matching.\n\nTech Stack: Python, NLP, Scikit-learn, Streamlit, Flask, SQLite, Pandas\nHighlights:\n• Extracts skills and experience from resumes using custom NLP pipelines\n• Computes semantic match scores against job descriptions using TF-IDF and cosine similarity\n• Provides actionable skill gap recommendations to reduce manual HR screening\n• Streamlit frontend with Flask backend and SQLite for persistent tracking\n\n🔗 GitHub: github.com/Krishnanivja12/resume-analyzer",
  "linkedin":
    "📝 LinkedIn Post Generator\n\nAn AI-powered tool for generating professional, engagement-optimized LinkedIn posts.\n\nTech Stack: Python, LangChain, LLMs, Prompt Engineering, Streamlit, CrewAI, GenAI\nHighlights:\n• Supports three tones: professional, storytelling, and technical\n• Structured prompt chaining for consistent, high-quality output\n• Customizable hooks, hashtags, and call-to-actions per post\n• Real-time streaming generation with one-click copy functionality\n\n🔗 GitHub: github.com/Krishnanivja12/Linkdin-Post-Genrator",
  "researchflow":
    "🚀 ResearchFlow AI — Multi-Agent Research Assistant\n\nAn open-source multi-agent research assistant that transforms any topic into a polished, fact-checked report in minutes. Orchestrates 6 specialized AI agents powered by free Groq Cloud LLMs.\n\nTech Stack: Python, LangChain, Groq, Streamlit, Multi-Agent, LLM, Web Scraping\nHighlights:\n• 6 agents: Search, Reader, Writer, Critic, Fact Checker, Summarizer\n• Structured data flow with real-time step execution in Streamlit UI\n• Fact-checking engine cross-references every claim against original sources\n• Cost-free operation using Groq Cloud models (Llama 3.2, Mixtral)\n• Downloadable Markdown reports with executive summaries\n\n🔗 GitHub: github.com/Krishnanivja12/ResearchFlow-Ai",
  "voice assistant":
    "🎤 Personalized Voice Assistant\n\nAn AI-powered voice assistant that responds to natural language voice commands, performs tasks, and provides relevant information through natural conversation.\n\nTech Stack: Python, Speech Recognition, NLP, Intent Classification, Audio Processing, Conversational AI\nHighlights:\n• Speech-to-text pipeline with intent classification and action execution\n• Multi-turn conversation with context preservation\n• Custom wake-word detection and noise filtering\n• Hands-free information retrieval and task automation\n\n🔗 GitHub: github.com/Krishnanivja12/Personalized-Voice-Assistant",
  "leetcode":
    "🍵 LeetCode & Chill — DSA Practice Repository\n\nA comprehensive data structures and algorithms practice repository documenting daily LeetCode problem-solving across Easy, Medium, and Hard difficulties.\n\nTech Stack: Python, Data Structures, Algorithms, Problem Solving\nHighlights:\n• Clean, well-commented solutions with time/space complexity analysis\n• Organized by difficulty: Easy, Medium, Hard\n• Covers Arrays, Two Pointers, Sorting, DP, Graphs, and more\n• Consistent 6-step problem-solving framework\n• Weekly schedule: Medium on weekdays, Easy + Hard revisits on Tue/Thu\n\n🔗 GitHub: github.com/Krishnanivja12/LeetCode-and-Chill",
}

const certificateDetails: Record<string, string> = {
  "prompt engineering":
    "🎓 ChatGPT Prompt Engineering for Developers\n   Issuer: DeepLearning.AI | Date: Jul 2025\n   Learned to build LLM-powered apps with best practices in prompt chaining, output parsing, and iterative refinement.",
  "tata":
    "📊 Tata Group - Data Visualisation: Empowering Business with Effective Insights\n   Issuer: Forage | Date: Mar 2025\n   🔗 Verified credential available on the About page.",
  "deloitte":
    "📈 Deloitte Australia - Data Analytics Job Simulation\n   Issuer: Forage | Date: Mar 2025\n   🔗 Verified credential available on the About page.",
  "cisco":
    "🖥️ Cisco Verified Data Analytics Essentials\n   Issuer: Cisco Networking Academy | Date: Mar 2025",
}

// ─── GroqCloud API Configuration ────────────────────────────
// Uses free GroqCloud API with fastest available model
// Get your free API key at https://console.groq.com/keys
const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || ""
const GROQ_MODEL = "llama-3.1-8b-instant" // Fastest Groq model (sub-100ms responses)
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

// ─── Portfolio Context ───────────────────────────────────────
const PORTFOLIO_CONTEXT = `You are a helpful AI assistant for Krishna Nivja's portfolio website.
You answer questions about Krishna's work, skills, experience, projects, and education.

Portfolio Overview:
- Name: Krishna Nivja
- Title: AI/ML Engineer & Full-Stack Developer
- Education: B.Tech in AI & ML at Shri Ram Group of College (pursuing)
- Location: Gwalior, MP, India

Key Skills: Python, PyTorch, TensorFlow, LangChain, FastAPI, RAG, LLM Fine-Tuning (LoRA/QLoRA), Docker, AWS

Experience:
1. AI/ML Engineer @ STEVE'S AI LAB (Apr 2026 - Present)
   - Built GeoSpatial AI Platform with LangChain RAG, ChromaDB, Google Maps API
   - Reduced LLM hallucination by 40% using LangGraph orchestration agent
   - Deployed on AWS EC2 with Docker — 99.2% uptime
   - Fine-tuned LLMs with LoRA/QLoRA, PEFT, GGUF/GPTQ quantization

2. Data Science Intern @ TECHIESHUBHDEEP IT SOLUTIONS (Apr 2025 - Jan 2026)
   - Reduced inference latency by 40% with FastAPI async processing
   - Improved model accuracy by 25% with feature engineering
   - Built CNN/RNN architectures for sentiment analysis

3. Data Science Trainee @ ALMABETTER (Oct 2024 - Mar 2025)
   - EDA, statistical modeling, applied ML

Projects (7):
1. RAG Document Search System - LangChain, FastAPI, FAISS, HuggingFace
2. Fitness Mistral 7B - Fine-tuned with LoRA/QLoRA, BERTScore 0.89
3. Resume Analyzer - NLP, Scikit-learn, Streamlit
4. LinkedIn Post Generator - LangChain, CrewAI, GenAI
5. ResearchFlow AI - 6-agent research assistant on Groq Cloud
6. Personalized Voice Assistant - Speech recognition, intent classification
7. LeetCode & Chill - DSA practice, Python solutions

Certifications: ChatGPT Prompt Engineering (DeepLearning.AI), Tata Data Visualisation (Forage), Deloitte Data Analytics (Forage), Cisco Data Analytics Essentials

Keep responses concise, friendly, and informative. Use bullet points for lists.`

async function getGroqReply(message: string, history: { role: string; content: string }[]): Promise<string | null> {
  if (!GROQ_API_KEY) return null

  try {
    const messages = [
      { role: "system", content: PORTFOLIO_CONTEXT },
      ...history.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: message }
    ]

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        max_tokens: 512,
        temperature: 0.7,
        stream: false
      })
    })

    if (!response.ok) return null

    const data = await response.json()
    return data.choices?.[0]?.message?.content || null
  } catch {
    return null
  }
}

function getLocalReply(message: string): string {
  const lower = message.toLowerCase().trim()

  // Check for certificate-specific queries
  if (lower.includes("prompt engineering") || (lower.includes("deeplearning") && lower.includes("cert")))
    return certificateDetails["prompt engineering"]
  if ((lower.includes("tata") || lower.includes("forage")) && (lower.includes("cert") || lower.includes("data visualisation")))
    return certificateDetails["tata"]
  if (lower.includes("deloitte") && lower.includes("cert"))
    return certificateDetails["deloitte"]
  if (lower.includes("cisco") && lower.includes("cert"))
    return certificateDetails["cisco"]

  // Check for specific project names (MUST come before broad "project" keyword)
  if (lower.includes("rag") || lower.includes("document search") ||
      (lower.includes("document") && lower.includes("search") && lower.includes("qa")))
    return projectDetails["rag"]
  if (lower.includes("mistral") || lower.includes("fitness") ||
      lower.includes("qlora") || lower.includes("lora"))
    return projectDetails["mistral"]
  if (lower.includes("resume analyzer") || (lower.includes("resume") && (lower.includes("analyz") || lower.includes("screen") || lower.includes("match") || lower.includes("nlp"))))
    return projectDetails["resume analyzer"]
  if (lower.includes("linkedin") || lower.includes("post generator") || lower.includes("content generation") || lower.includes("linkedin post"))
    return projectDetails["linkedin"]
  if (lower.includes("researchflow") || lower.includes("research flow") || lower.includes("researchmind") || lower.includes("multi-agent") || (lower.includes("research") && lower.includes("assistant")))
    return projectDetails["researchflow"]
  if (lower.includes("voice assistant") || lower.includes("voice command") || lower.includes("speech") || lower.includes("personalized voice"))
    return projectDetails["voice assistant"]
  if (lower.includes("leetcode") || lower.includes("dsa") || lower.includes("data structure") || lower.includes("algorithm") || lower.includes("chill"))
    return projectDetails["leetcode"]

  // Check for direct matches against botResponses keys
  for (const [key, reply] of Object.entries(botResponses)) {
    if (lower.includes(key)) return reply
  }

  // Check for certificates keyword
  if (lower.includes("cert") || lower.includes("credential") || lower.includes("badge"))
    return botResponses["what certifications do you have"]

  // Check for education keyword
  if (lower.includes("education") || lower.includes("college") || lower.includes("degree") || lower.includes("b.tech") || lower.includes("university") || lower.includes("academic"))
    return botResponses["what is your education background"]

  // Check for about keywords
  if (lower.includes("about") || lower.includes("who is") || lower.includes("background") || lower.includes("bio")) {
    return "Krishna Nivja is an AI/ML Engineer and Full-Stack Developer dedicated to building intelligent systems that bridge the gap between research and production. He specializes in NLP, LLM fine-tuning (LoRA/QLoRA), RAG pipelines, and deploying low-latency inference APIs. His engineering philosophy emphasizes clean code, scalable architectures, and solving real-world problems. He is currently pursuing a B.Tech in AI & ML."
  }

  // Check for keyword-based routing
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack"))
    return botResponses["what are your core skills"]
  if (lower.includes("experience") || lower.includes("work") || lower.includes("job") || lower.includes("intern"))
    return botResponses["show me your experience"]
  if (lower.includes("project"))
    return botResponses["tell me about your projects"]
  if (lower.includes("resume") || lower.includes("cv") || lower.includes("download"))
    return botResponses["download your resume"]

  return "That's a great question! Feel free to explore the sections above — my Skills, Experience, Projects, and About pages cover everything in detail. Or try one of the suggested prompts below!"
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => [{
    role: "assistant",
    content: "Hey there! 👋 I'm Krishna's AI assistant. Ask me anything about his work, skills, or experience.",
    timestamp: Date.now(),
  }])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { reducedMotion } = useAccessibility()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })
  }, [reducedMotion])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleSend = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const userMessage: Message = {
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      // Try GroqCloud API first (only if API key is configured)
      const groqReply = await getGroqReply(trimmed, messages.map(m => ({ role: m.role, content: m.content })))
      
      // Add a minimum typing delay for natural feel
      const elapsed = Date.now() - userMessage.timestamp
      const minDelay = 400
      if (elapsed < minDelay) {
        await new Promise(r => setTimeout(r, minDelay - elapsed))
      }

      const reply = groqReply || getLocalReply(trimmed)
      const assistantMessage: Message = {
        role: "assistant",
        content: reply,
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsTyping(false)
    }
  }, [isTyping, messages])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSend(input)
      }
    },
    [input, handleSend]
  )

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:border-primary/40 transition-all duration-300"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="h-6 w-6" strokeWidth={1.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden"
            style={{ maxHeight: "min(600px, calc(100vh - 8rem))" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">AI Assistant</span>
                <span className="font-mono text-[10px] text-muted-foreground">Powered by portfolio data</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.timestamp}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted/50 text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-muted/50 px-4 py-3">
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      className="h-2 w-2 rounded-full bg-muted-foreground/40"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="h-2 w-2 rounded-full bg-muted-foreground/40"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                      className="h-2 w-2 rounded-full bg-muted-foreground/40"
                    />
                  </div>
                </motion.div>
              )}

              {/* Suggested prompts (only show before first user message) */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {isTyping ? null : suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
                    >
                      <MessageSquare className="h-3 w-3" strokeWidth={1.5} />
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border px-4 py-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary/40 transition-colors duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={() => handleSend(input)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim() || isTyping}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" strokeWidth={1.5} />
                </motion.button>
              </div>
              <p className="mt-1.5 text-center font-mono text-[9px] text-muted-foreground/40">
                This AI responds based on Krishna&apos;s portfolio data
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
