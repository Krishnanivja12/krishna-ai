"use client"

import React from "react"
import { memo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { skillCategories } from "@/lib/bio-data"
import { cinematicReveal, staggerContainer, headerReveal } from "@/lib/animations"
import { useIsMobile, useAutoHighlight } from "@/hooks/use-mobile-view-effect"
import type { IconType } from "react-icons";
import { SiScikitlearn, SiPytorch, SiTensorflow, SiKeras, SiHuggingface, SiLangchain, SiPandas, SiNumpy, SiFastapi, SiStreamlit, SiLinux, SiPostgresql, SiMysql, SiPython, SiGit, SiDocker } from "react-icons/si";
import { LuHash, LuWorkflow, LuDatabaseZap, LuNetwork, LuZap, LuGitBranch, LuServer, LuLayers, LuCpu, LuActivity, LuTreeDeciduous, LuSearch, LuCloud } from "react-icons/lu";
import { TbApi, TbBrandSpeedtest, TbVersions } from "react-icons/tb";
import { MdOutlineModelTraining } from "react-icons/md";
import { FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { PiFileSql } from "react-icons/pi";
import { SectionHeader } from "../layout/section-header"

interface SkillsSectionProps {
  index: number
}

type SkillIcon = IconType;

const iconMap: Record<string, SkillIcon> = {
  // Specific library icons
  "java": FaJava,
  "azure": VscAzure,
  "sql": PiFileSql,

  // Frameworks & Languages
  "python": SiPython,
  "fastapi": SiFastapi,
  "streamlit": SiStreamlit,
  "docker": SiDocker,
  "git": SiGit,
  "linux": SiLinux,

  // Databases
  "postgresql": SiPostgresql,
  "mysql": SiMysql,
  "vector databases": LuDatabaseZap,
  "faiss": LuDatabaseZap,

  // Machine Learning
  "scikit-learn": SiScikitlearn,
  "xgboost": LuTreeDeciduous,
  "random forest": LuTreeDeciduous,
  "feature engineering": LuGitBranch,
  "hyperparameter tuning": LuZap,
  "cross validation": LuActivity,
  "eda": LuActivity,

  // Deep Learning
  "pytorch": SiPytorch,
  "tensorflow": SiTensorflow,
  "keras": SiKeras,
  "cnn": LuCpu,
  "rnn": LuCpu,
  "lstm": LuCpu,
  "transformers": SiHuggingface,
  "attention mechanism": LuCpu,
  "transfer learning": MdOutlineModelTraining,
  "nlp": LuNetwork,
  "mlops": LuWorkflow,

  // LLM & GenAI
  "hugging face": SiHuggingface,
  "rag pipelines": LuNetwork,
  "semantic search": LuActivity,
  "embeddings": LuCpu,
  "prompt engineering": LuZap,
  "lora": MdOutlineModelTraining,
  "qlora": MdOutlineModelTraining,
  "peft": MdOutlineModelTraining,
  "quantization": LuCpu,
  "rlhf": MdOutlineModelTraining,
  "langchain": SiLangchain,
  "crewai": LuWorkflow,

  // Data & Cloud
  "pandas": SiPandas,
  "numpy": SiNumpy,
  "matplotlib": LuActivity,
  "seaborn": LuActivity,
  "aws ec2": LuServer,
  "aws s3": LuCloud,

  // MLOps & Backend
  "restful apis": TbApi,
  "model inference apis": LuServer,
  "batch inference": LuLayers,
  "latency optimization": TbBrandSpeedtest,
  "model versioning": TbVersions,

  // Additional from experience tags
  "data analysis": LuActivity,
  "forensic technology": LuSearch,
}

const getSkillIcon = (skillName: string): SkillIcon => {
  if (!skillName) return LuHash;
  const name = skillName.toLowerCase().trim();

  const icon = iconMap[name];
  if (icon) return icon;

  // Fallback
  return LuHash;
};


export function SkillsSection({ index }: SkillsSectionProps) {
  const isMobile = useIsMobile()

  return (
    <section id="skills" className="border-t border-border" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <SectionHeader 
          index={index} 
          title="Skills & Technologies" 
          subtitle="Expertise across the full stack, with a focus on AI/ML and data-driven architectures."
        />

        <h2 id="skills-heading" className="sr-only">Skills & Technologies</h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
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
      variants={cinematicReveal}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className={`relative h-full bg-background lg:hover:z-10 ${isActive ? "z-10" : "z-0"}`}
    >
      {/* The Inner Card: Handles the 3D lift, shadow, and background color */}
      <div className={`group flex flex-col h-full gap-5 p-4 md:p-6 lg:p-8 transition-all duration-500 ease-out lg:hover:bg-card ${isActive
        ? "bg-card"
        : "bg-transparent"
        }`}>

        <div className="flex items-center justify-between">
          <motion.span variants={headerReveal} className="font-mono text-[10px] tracking-widest text-primary uppercase">
            {category.label}
          </motion.span>
          <motion.span variants={headerReveal} className="font-mono text-[10px] text-muted-foreground">
            {String(category.skills.length).padStart(2, "0")}
          </motion.span>
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

const SkillIconGlyph = memo(({ skill }: { skill: string }) => {
  const icon = getSkillIcon(skill);
  return React.createElement(icon, {
    className: "h-3 w-3 shrink-0 text-primary lg:h-3.5 lg:w-3.5",
    "aria-hidden": true,
  });
});
SkillIconGlyph.displayName = "SkillIconGlyph";

const SkillPill = memo(({ skill, isActive }: { skill: string, isActive: boolean }) => {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-1 font-mono text-[11px] lg:text-[12.5px] 
        whitespace-nowrap transition-all duration-300 ease-out ${isActive
          ? "border-primary/40 text-foreground bg-primary/5 -translate-y-0.5 shadow-sm"
          : "border-border text-muted-foreground translate-y-0"
        }`}
    >
      <span
        className={`inline-flex items-center justify-center overflow-hidden transition-all duration-500 ease-out shrink-0 ${isActive ? "mr-1.5 w-3 opacity-100 lg:w-3.5" : "mr-0 w-0 opacity-0"
          }`}
      >
        <SkillIconGlyph skill={skill} />
      </span>
      <span>{skill}</span>
    </span>
  );
});
SkillPill.displayName = "SkillPill";

