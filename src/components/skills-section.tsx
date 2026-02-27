"use client"

import { memo, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { skillCategories } from "@/lib/bio-data"
import { sectionVariants, cardVariantUp } from "@/lib/animations"
import { useIsMobile, useAutoHighlight } from "@/hooks/use-mobile-view-effect"
import * as SiIcons from "react-icons/si";
import { LuHash, LuWorkflow, LuDatabaseZap, LuNetwork } from "react-icons/lu";
import { FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { PiFileSql } from "react-icons/pi";

interface SkillsSectionProps {
  index: number
}

const getSkillIcon = (skillName: string) => {
  if (!skillName) return LuHash;
  const name = skillName.toLowerCase().trim();

  // 1. Manual mapping for tricky React Icon names (Si prefix)
  const specialCases: Record<string, any> = {
    // Icons from specific libraries
    "java": FaJava,
    "azure": VscAzure,
    "sql": PiFileSql,
    
    // Frameworks / Web
    "next.js": "SiNextdotjs",
    "node.js": "SiNodedotjs",
    ".net core": "SiDotnet",
    "fastapi": "SiFastapi",
    "tailwind css": "SiTailwindcss",
    // Languages
    "c#": "SiCsharp",
    "c++": "SiCplusplus",
    "typescript": "SiTypescript",
    "javascript": "SiJavascript",
    // Data Science & AI
    "scikit-learn": "SiScikitlearn",
    "hugging face": "SiHuggingface",
    "langchain": "SiLangchain",
    "pytorch": "SiPytorch",
    "tensorflow": "SiTensorflow",
    "pandas": "SiPandas",
    "numpy": "SiNumpy",
    // Data Engineering
    "apache spark": "SiApachespark",
    "airflow": "SiApacheairflow",
    "kafka": "SiApachekafka",
    "gcp": "SiGooglecloud",
    "aws": "SiAmazonwebservices",
    "ci/cd": "SiGithubactions",
    // Database
    "postgresql": "SiPostgresql",
    "mysql": "SiMysql",
    "mongodb": "SiMongodb",
  };

  const lookup = specialCases[name];

  // FIX: If 'lookup' is already a component (function), return it immediately
  if (typeof lookup === "function") return lookup;

  // Try manual map
  if (typeof lookup === "string") {
    const Icon = (SiIcons as any)[lookup];
    if (Icon) return Icon;
  }

  // 2. PascalCase Lookup (e.g., "Python" -> "SiPython")
  const pascalName = `Si${skillName.replace(/[^a-zA-Z0-9]/g, "")}`;
  const SiIcon = (SiIcons as any)[pascalName];
  if (SiIcon) return SiIcon;

  // 3. Fallback to Lucide category icons
  if (name.includes("modeling")) return LuWorkflow;
  if (name.includes("dbt")) return LuDatabaseZap;
  if (name.includes("pipelines")) return LuNetwork;

  return LuHash;
};


export function SkillsSection({ index }: SkillsSectionProps) {
  const isMobile = useIsMobile()

  return (
    <section id="skills" className="border-t border-border" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            skills & technologies
          </span>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <h2 id="skills-heading" className="sr-only">Skills & Technologies</h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <SkillCard key={category.label} category={category} isMobile={isMobile} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({ category, isMobile }: { category: typeof skillCategories[number], isMobile: boolean }) {
  const ref = useRef(null)
  const isAutoActive = useAutoHighlight(ref, isMobile)
  const [isHovered, setIsHovered] = useState(false)
  const isActive = isAutoActive || isHovered

  return (
    <motion.div
      ref={ref}
      variants={cardVariantUp}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className={`relative h-full bg-background lg:hover:z-10 ${isActive ? "z-10" : "z-0"}`}
    >
      {/* The Inner Card: Handles the 3D lift, shadow, and background color */}
      <div className={`group flex flex-col h-full gap-5 p-4 md:p-6 lg:p-8 transition-all duration-500 ease-out lg:hover:bg-card lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:shadow-primary/10 ${isActive
          ? "bg-card -translate-y-1.5 shadow-xl shadow-primary/10"
          : "bg-transparent translate-y-0 shadow-none"
        }`}>

        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest text-primary uppercase">
            {category.label}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {String(category.skills.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <SkillPill key={skill} skill={skill} isActive={isActive} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const SkillPill = memo(({ skill, isActive }: { skill: string, isActive: boolean }) => {
  const Icon = useMemo(() => getSkillIcon(skill), [skill]);

  return (
    <motion.span
      layout
      transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
      className={`inline-flex items-center rounded-sm border px-2 py-1 font-mono text-[11px] lg:text-[12.5px] 
        whitespace-nowrap transition-all duration-300 ${isActive
          ? "border-primary/40 text-foreground bg-primary/5 -translate-y-0.5 shadow-sm"
          : "border-border text-muted-foreground translate-y-0"
        }`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {isActive && (
          <motion.span
            key={`icon-${skill}`}
            initial={{ width: 0, opacity: 0, scale: 0 }}
            animate={{ width: "auto", opacity: 1, scale: 1 }}
            exit={{ width: 0, opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
              opacity: { duration: 0.1 }
            }}
            className="inline-flex items-center justify-center overflow-hidden flex-nowrap"
          >
            <Icon className="mr-1.5 shrink-0 text-primary h-3 w-3 lg:h-3.5 lg:w-3.5"/> 
          </motion.span>
        )}
      </AnimatePresence>
      <span className="relative z-10">{skill}</span>
    </motion.span>
  );
});
SkillPill.displayName = "SkillPill";
