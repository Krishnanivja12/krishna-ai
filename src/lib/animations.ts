import { Variants, Transition } from "framer-motion"

// ─── Premium Easing Curves ──────────────────────────────────
// Out-expo style for snappy, professional feel
export const easePremium = [0.22, 1, 0.36, 1] as const
// Smooth spring for natural motion
export const easeSmooth = [0.4, 0, 0.2, 1] as const
// Bouncy but subtle
export const easeBounce = [0.34, 1.56, 0.64, 1] as const

// ─── Default Transition Presets ─────────────────────────────
export const fastTransition: Transition = {
  duration: 0.3,
  ease: easePremium,
}

export const mediumTransition: Transition = {
  duration: 0.5,
  ease: easePremium,
}

export const slowTransition: Transition = {
  duration: 0.7,
  ease: easeSmooth,
}

export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
}

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
}

// ─── Page Load Animations ───────────────────────────────────

export const pageEnter: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easePremium },
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easePremium },
  },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easePremium },
  },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easePremium },
  },
}

// ─── Scroll Reveal Animations ───────────────────────────────

export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easePremium,
    },
  },
}

export const staggerReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const cinematicReveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: springTransition,
  },
}

export const cinematicGrid: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easePremium,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
    transition: { duration: 0.4, ease: "easeInOut" },
  },
}

// ─── Header & Text Animations ───────────────────────────────

export const headerReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easePremium },
  },
}

export const lineReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1, ease: "circOut", delay: 0.4 },
  },
}

export const characterReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easePremium },
  },
}

export const characterContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
}

// ─── Card Animations ────────────────────────────────────────

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easePremium,
    },
  },
}

export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0 4px 6px -1px hsla(0 0% 0% / 0.1)",
    transition: { duration: 0.3, ease: easePremium },
  },
  hover: {
    y: -4,
    boxShadow: "0 10px 15px -3px hsla(0 0% 0% / 0.1), 0 4px 6px -4px hsla(0 0% 0% / 0.1)",
    transition: { duration: 0.3, ease: easePremium },
  },
}

// ─── Timeline Animations ────────────────────────────────────

export const timelineLine: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: easeSmooth },
  },
}

export const timelineDot: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: easeBounce },
  },
}

export const timelineCard: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easePremium },
  },
}

// ─── Skills / Pill Animations ───────────────────────────────

export const skillPillReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: i * 0.03,
      ease: easePremium,
    },
  }),
}

// ─── Empty State / No Results Animations ────────────────────

export const emptyStateReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
}

// ─── Backward Compatible Exports ────────────────────────────
// Preserve original names so existing code continues to work

export const fadeUpVariant = fadeUp
export const sectionVariants = staggerReveal
export const cardVariantUp = fadeUp
export const cardVariantDown = fadeDown
export const cardVariantLeft = fadeLeft
export const cardVariantRight = fadeRight
export const headerRevealVariant = headerReveal
export const lineRevealVariant = lineReveal
export const staggerContainer = staggerReveal
