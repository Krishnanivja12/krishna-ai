"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
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
import { BentoGallery } from "@/components/sections/bento-gallery"
import { fadeUpVariant, sectionVariants, cardVariantRight, cinematicReveal, staggerContainer, headerReveal } from "@/lib/animations"
import { useIsMobile, useAutoHighlight } from "@/hooks/use-mobile-view-effect"
import { Footer } from "@/components/layout/footer"
import { SectionHeader } from "@/components/layout/section-header"
import { GlowCard } from "@/components/blocks/glow-card"

const intro = {
  title: "I'm a Full Stack AI Engineer who believes that the best code is written by those who never stop being students.",
  paragraphs: [
    "My journey didn't start with complex neural networks; it started back in India with a simple curiosity about how I could make a computer do the work for me. From those first automation scripts to completing my Master’s in AI at Western University, I’ve always been driven by the transition from 'how does this work?' to 'how can I make this better?'. Moving to Canada to specialize in AI allowed me to take my professional full-stack foundations and ground them in the deep, theoretical research that defines the next generation of software.",
    "I don't believe in being a 'master' of everything, because in this field, the moment you stop learning, you fall behind. My real expertise isn't just in a specific stack like .NET or React—it’s in the ability to pick up any tool, documentation, or research paper and turn it into a working solution. Whether I’m familiar with a technology or seeing it for the first time, I have the discipline to learn it, implement it, and ship it. To me, a technical challenge isn't a wall; it's just a new topic to master before the next deployment.",
    "Beyond the terminal, I’m deeply focused on the responsibility we have as engineers. My research into the 'Ethical Dilemmas in AI' taught me that intelligence without alignment is a liability. I’m not interested in building tech for the sake of buzzwords; I want to build systems that are genuinely useful, secure, and aligned with human values. Whether I'm processing millions of records with 99.9% uptime or fine-tuning a model, my goal is to ensure that the final product is as ethically sound as it is technically precise."
  ]
}

const journey = [
  {
    icon: Gamepad2,
    title: "The Spark",
    text: "My fascination with technology ignited in high school, fueled by gaming and building custom computers. I realized I didn't just want to use software; I wanted to understand the machine behind the magic. This curiosity drove me to choose Computer Engineering.",
  },
  {
    icon: GraduationCap,
    title: "Engineering Foundation",
    text: "During my Bachelor's at Atmiya University, I built my technical bedrock. The highlight was my final term internship, where I first experienced the gap between academic theory and production-grade software, solidifying my desire to build for the real world.",
  },
  {
    icon: Plane,
    title: "The Canadian Goal",
    text: "I set my sights on a Master's degree in Canada. I knew that to work on the cutting edge of AI and Tech, I needed a global education and exposure to advanced research environments that only a top-tier institution or school would provide.",
  },
  {
    icon: Briefcase,
    title: "The Industry Gap",
    text: "While preparing for my Master's, I worked as a Full Stack Developer & Web Scraper at Dexoc Solutions. I mastered the .NET ecosystem and data extraction at scale, working until I received acceptance letters from the University of Regina, Wilfrid Laurier, and Western University.",
  },
  {
    icon: School,
    title: "The Western Choice",
    text: "I chose Western University (Ranked Top 1% Globally) for its research excellence. Stepping onto campus in London, Ontario was a defining moment—it was the start of my transition from a software engineer to an AI researcher.",
  },
  {
    icon: Brain,
    title: "AI Specialization",
    text: "Graduating with an MS in CS & AI Specialization was a transformation. Working on projects like Taxi Fare Prediction and Tomato Disease Detection, I merged my 'Full Stack' background with 'AI' to officially begin my journey as an AI Engineer.",
  },
  {
    icon: Lightbulb,
    title: "My Philosophy",
    text: "I believe in the 'Student for Life' mindset. Best practices aren't static; they evolve. My philosophy is to continuously learn, strictly follow coding standards, and synthesize every piece of knowledge—from full stack to deep learning—to build systems that last.",
  },
]

export function AboutContent() {
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [loadingDots, setLoadingDots] = useState("")
  const isMobile = useIsMobile()
  const text = "> initiating background check"
  const [skipAnimation, setSkipAnimation] = useState(false)

  useEffect(() => {
    // Check if user has seen animation before
    const hasSeen = localStorage.getItem("has-seen-about-animation")
    if (hasSeen) {
      setSkipAnimation(true)
      setIsTypingComplete(true)
    } else {
      // Mark as seen for next time
      localStorage.setItem("has-seen-about-animation", "true")
    }
  }, [])

  useEffect(() => {
    if (!isTypingComplete) return;

    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 200) // faster delay

    return () => clearInterval(interval)
  }, [isTypingComplete])

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 lg:pt-28">
        {/* Back link */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Terminal
        </Link>

        {/* Page header */}
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
                  transition={{ duration: 0.03, delay: i * 0.02 }} // faster typing
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

        {/* Content */}
        {isTypingComplete && (
          <>
            {/* Gallery */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariant}
            >
              <BentoGallery />
            </motion.div>

            {/* Intro section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariant}
              className="mb-16 grid gap-4 grid-cols-1 lg:grid-cols-4"
            >
              {/* Left Block: Intro Content */}
              <GlowCard 
                as={motion.div}
                variants={cinematicReveal}
                className="rounded-md border border-border bg-card/40 backdrop-blur-md lg:col-span-3 p-4 md:p-8 lg:p-10"
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
                </div>
              </GlowCard>

              {/* Right Block: Status & Location Cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:flex-col">
                {/* Card 2: Status */}
                <GlowCard 
                  as={motion.div}
                  variants={cinematicReveal}
                  className="flex flex-col justify-center gap-4 rounded-md border border-border bg-card/40 backdrop-blur-md p-4 md:p-8 lg:p-6"
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

                {/* Card 3: Location */}
                <GlowCard 
                  as={motion.div}
                  variants={cinematicReveal}
                  className="flex flex-col justify-center gap-4 rounded-md border border-border bg-card/40 backdrop-blur-md p-4 md:p-8 lg:p-6"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Location</span>
                    <p className="text-sm">London, ON, Canada</p>
                  </div>
                </GlowCard>
              </div>
            </motion.section>

            {/* Journey / Philosophy */}
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

            {/* Education (detailed) */}
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
    <GlowCard
      ref={ref}
      as={motion.div}
      variants={cinematicReveal}
      className={`group flex w-full flex-col gap-4 rounded-md border bg-card/40 backdrop-blur-md p-4 md:p-6 transition-all duration-300 md:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.67rem)]`}
    >
      <div className={`flex h-9 w-9 items-center justify-center rounded-sm border transition-colors duration-300 lg:group-hover:bg-primary lg:group-hover:text-primary-foreground ${isActive ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-primary border-border"}`}>
        <item.icon className="h-4 w-4" strokeWidth={1.5} />
      </div>
      <h3 className="font-mono text-sm font-medium text-foreground">{item.title}</h3>
      <p className="text-xs leading-relaxed text-muted-foreground text-justify">{item.text}</p>
    </GlowCard>
  )
}

function EducationCard({ edu, isMobile }: { edu: typeof education[number], isMobile: boolean }) {
  const ref = useRef(null)
  const isAutoActive = useAutoHighlight(ref, isMobile)
  const isActive = isAutoActive

  return (
    <GlowCard
      ref={ref}
      as={motion.div}
      variants={cinematicReveal}
      className={`group rounded-md border bg-card/40 backdrop-blur-md p-4 md:p-8 transition-all duration-300`}
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
  )
}