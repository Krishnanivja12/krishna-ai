"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  FileText,
  GraduationCap,
  MapPin,
  Calendar,
  Brain,
  Gamepad2,
  Briefcase,
  Plane,
  School,
  Lightbulb
} from "lucide-react"
import { education } from "@/lib/bio-data"
import { fadeUpVariant, cinematicReveal, staggerContainer } from "@/lib/animations"
import { useIsMobile, useAutoHighlight, useAtTopHighlight } from "@/hooks/use-mobile-view-effect"
import { Footer } from "@/components/layout/footer"
import { SectionHeader } from "@/components/layout/section-header"
import { GlowCard } from "@/components/blocks/glow-card"
import { PremiumBackButton } from "@/components/ui/premium-back-button"
import { useNavigationHub } from "@/contexts/navigation-hub-context"

const intro = {
  title: "I'm an AI/ML Engineer who believes the best models are built by those who never stop questioning the data.",
  paragraphs: [
    "My journey started not with textbooks, but with curiosity — why does this model fail? How can I make it faster? From my first Python scripts to fine-tuning Mistral 7B with LoRA, I've always been driven by the gap between 'it works in a notebook' and 'it works in production'. Pursuing my B.Tech in AI & ML at Shri Ram Group of College gave me the foundation, but real learning happened when I started building — RAG pipelines, FastAPI inference APIs, and domain-specific LLMs.",
    "I don't believe in waiting to graduate before building real things. While still in college, I've reduced NLP inference latency by 40%, improved model accuracy by 25% through feature engineering, and deployed end-to-end ML systems that handle real workloads. My stack isn't just theoretical — it's PyTorch, HuggingFace, LangChain, FAISS, and FastAPI running in Docker on AWS.",
    "Beyond the models, I care deeply about what we build and why. AI without alignment is just noise. Whether I'm implementing RLHF, building semantic search, or optimizing batch inference, my goal is always the same — systems that are accurate, efficient, and genuinely useful. I'm not chasing buzzwords; I'm building the infrastructure that makes intelligent systems reliable."
  ]
}

const journey = [
  {
    icon: Gamepad2,
    title: "The Spark",
    text: "My fascination with AI started with a simple question — can a machine learn to think? That curiosity led me from gaming and automation scripts to exploring machine learning, and eventually to building production-grade AI systems.",
  },
  {
    icon: GraduationCap,
    title: "B.Tech in AI & ML",
    text: "Enrolled in B.Tech in Artificial Intelligence & Machine Learning at Shri Ram Group of College, Banmore. Specializing in NLP, Deep Learning, and LLM systems — building real projects alongside academics from day one.",
  },
  {
    icon: Brain,
    title: "First ML Pipeline",
    text: "Built my first end-to-end ML pipeline — data preprocessing, feature engineering, model training with Scikit-learn and XGBoost, and a FastAPI inference endpoint. That moment of seeing a model serve predictions in real-time was the turning point.",
  },
  {
    icon: Briefcase,
    title: "AI/ML Engineer",
    text: "Joined Steve's AI Lab as an AI/ML Engineer, building a GeoSpatial AI Platform with LangChain RAG pipelines and ChromaDB vector stores. Reduced LLM hallucination by 40% using LangGraph orchestration and fine-tuned LLMs with LoRA/QLoRA.",
  },
  {
    icon: School,
    title: "Data Science Intern",
    text: "Joined Techieshubhdeep IT Solutions as a Data Science Intern. Deployed FastAPI AI APIs, reduced inference latency by 40%, and built CNN/RNN architectures for NLP classification tasks in production environments.",
  },
  {
    icon: Briefcase,
    title: "Data Science Trainee",
    text: "Joined AlmaBetter as a Data Science Trainee, working on EDA, statistical modeling, and data analysis pipelines. Developed strong foundations in Pandas, Matplotlib, and applied ML through intensive project-based training.",
  },
  {
    icon: Lightbulb,
    title: "LLM Fine-Tuning",
    text: "Fine-tuned Mistral 7B using LoRA and QLoRA on domain-specific fitness data, achieving BERTScore of 0.89. This project solidified my expertise in PEFT, quantization, and the full LLM fine-tuning lifecycle.",
  },
  {
    icon: Plane,
    title: "My Philosophy",
    text: "I believe in building before you're ready. The best way to learn AI is to ship AI — RAG pipelines, fine-tuned LLMs, semantic search systems. Every project is a production problem waiting to be solved.",
  },
]

export function AboutContent() {
  const { isOpen: isNavHubOpen } = useNavigationHub()
  const [skipAnimation] = useState(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("has-seen-about-animation") === "true"
  })
  const [isTypingComplete, setIsTypingComplete] = useState(skipAnimation)
  const [loadingDots, setLoadingDots] = useState("")
  const isMobile = useIsMobile()
  const scrollThreshold = 25
  const isAtTop = useAtTopHighlight(isMobile, scrollThreshold)
  const text = "> initiating background check"

  useEffect(() => {
    if (!skipAnimation) {
      localStorage.setItem("has-seen-about-animation", "true")
    }
  }, [skipAnimation])

  useEffect(() => {
    if (!isTypingComplete) return;

    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 200)

    return () => clearInterval(interval)
  }, [isTypingComplete])

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 lg:pt-28">
        <div className="mb-12">
          <PremiumBackButton
            href="/"
            text="Back to Terminal"
            autoHover={isAtTop}
            isVisible={!isNavHubOpen}
          />
        </div>

        <SectionHeader
          index={1}
          title="Profile // About Me"
          subtitle="A deep scan of my technical journey, core philosophy, and the path that led me to AI Engineering."
        />

        {!skipAnimation && (
          <div className="mt-2 mb-8 font-mono text-xs md:text-sm text-muted-foreground min-h-[24px]">
            <span>
              {text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.03, delay: i * 0.02 }}
                  onAnimationComplete={() => {
                    if (i === text.length - 1) setIsTypingComplete(true)
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <span>{loadingDots}</span>
            </span>
          </div>
        )}

        {isTypingComplete && (
          <>
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariant}
              className="mb-16 grid gap-4 grid-cols-1 lg:grid-cols-4"
            >
              <GlowCard
                as={motion.div}
                variants={cinematicReveal}
                className="rounded-md border border-border glass-premium-bg lg:col-span-3 p-4 md:p-8 lg:p-10"
              >
                <div className="flex flex-col h-full">
                  <span className="mb-4 inline-block font-mono text-[10px] tracking-widest text-primary uppercase">
                    who I am
                  </span>
                  <h1 className="mb-6 text-balance font-medium leading-tight tracking-tight text-foreground text-md md:text-2xl lg:text-3xl">
                    {intro.title}
                  </h1>
                  <div className="flex max-w-full flex-col gap-4 text-justify">
                    {intro.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-xs md:text-base leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-8">
                    <a
                      href="https://drive.google.com/file/d/1h40zzVDslnCjAXULsbALwfbYnqm-3bEK/view?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 rounded-sm border border-border bg-card/40 px-5 py-2.5 font-mono text-xs text-muted-foreground transition-all hover:border-primary hover:text-foreground"
                    >
                      <FileText className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
                      View Resume
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </GlowCard>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:flex-col">
                <GlowCard
                  as={motion.div}
                  variants={cinematicReveal}
                  className="flex flex-col justify-center gap-4 rounded-md border border-border glass-premium-bg p-4 md:p-8 lg:p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      Status
                    </span>
                  </div>
                  <p className="text-sm font-medium">Available for Freelance & Full-time opportunities</p>
                </GlowCard>

                <GlowCard
                  as={motion.div}
                  variants={cinematicReveal}
                  className="flex flex-col justify-center gap-4 rounded-md border border-border glass-premium-bg p-4 md:p-8 lg:p-6"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Location</span>
                    <p className="text-sm">Banmore, MP, India</p>
                  </div>
                </GlowCard>
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="mb-16"
            >
              <SectionHeader
                index={2}
                title="The Journey"
                subtitle="The sequential evolution of my technical mindset and professional focus."
              />

              <div className="flex flex-wrap justify-center gap-4">
                {journey.map((item) => (
                  <JourneyCard key={item.title} item={item} isMobile={isMobile} />
                ))}
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="mb-16"
            >
              <SectionHeader
                index={3}
                title="Academic Foundation"
                subtitle="Formal research and specialized training in Artificial Intelligence and Computer Science."
              />

              <div className="flex flex-col gap-4">
                {education.map((edu) => (
                  <EducationCard key={edu.degree} edu={edu} isMobile={isMobile} />
                ))}
              </div>
            </motion.section>
          </>
        )}
      </div>
      {isTypingComplete && <Footer />}
    </>
  )
}

function JourneyCard({ item, isMobile }: { item: typeof journey[number], isMobile: boolean }) {
  const ref = useRef(null)
  const isAutoActive = useAutoHighlight(ref, isMobile)
  const isActive = isAutoActive

  return (
    <div ref={ref}>
    <GlowCard
      as={motion.div}
      variants={cinematicReveal}
      enableTilt={!isMobile}
      className={`group flex w-full flex-col gap-4 rounded-md border glass-premium-bg p-4 md:p-6 transition-all duration-300 md:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.67rem)]`}
    >
      <div className={`flex h-9 w-9 items-center justify-center rounded-sm border transition-colors duration-300 lg:group-hover:bg-primary lg:group-hover:text-primary-foreground ${isActive ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-primary border-border"}`}>
        <item.icon className="h-4 w-4" strokeWidth={1.5} />
      </div>
      <h3 className="font-mono text-sm font-medium text-foreground">{item.title}</h3>
      <p className="text-xs leading-relaxed text-muted-foreground text-justify">{item.text}</p>
    </GlowCard>
    </div>
  )
}

function EducationCard({ edu, isMobile }: { edu: typeof education[number], isMobile: boolean }) {
  const ref = useRef(null)
  const isAutoActive = useAutoHighlight(ref, isMobile)
  const isActive = isAutoActive

  return (
    <div ref={ref}>
    <GlowCard
      as={motion.div}
      variants={cinematicReveal}
      enableTilt={!isMobile}
      className={`group rounded-md border glass-premium-bg p-4 md:p-8 transition-all duration-300`}
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border transition-colors duration-300 lg:group-hover:bg-primary lg:group-hover:text-primary-foreground ${isActive ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-primary border-border"}`}>
            <GraduationCap className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-foreground">
              {edu.degree}
            </h3>
            <span className="font-mono text-xs text-primary">
              {edu.school}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
            <MapPin className="h-3 w-3" strokeWidth={1.5} />
            {edu.location}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
            <Calendar className="h-3 w-3" strokeWidth={1.5} />
            {edu.period}
          </span>
        </div>
      </div>

      <p className="mb-4 font-mono text-xs text-primary">
        {edu.focus}
      </p>

      <ul className="flex flex-col gap-2">
        {edu.highlights?.map((h) => (
          <li key={h} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground text-justify">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>
    </GlowCard>
    </div>
  )
}
