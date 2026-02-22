"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { certificates } from "@/lib/bio-data"
import { useMode } from "@/hooks/use-mode"
import { sectionVariants, cardVariantUp, fadeUpVariant } from "@/lib/animations"

const INITIAL_COUNT = 4

interface CertificatesSectionProps {
  index: number
}

export function CertificatesSection({ index }: CertificatesSectionProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  const { mode } = useMode()
  const [expanded, setExpanded] = useState(false)

  // Filter logic
  const filteredCertificates = certificates.filter((cert) => 
    mode === "generalist" || cert.modes.includes(mode)
  )

  const visible = expanded ? filteredCertificates : filteredCertificates.slice(0, INITIAL_COUNT)
  const hasMore = filteredCertificates.length > (INITIAL_COUNT-1)

  // Calculate empty slots to fill the grid
  const remainder = visible.length % 3
  const emptySlots = remainder === 0 ? 0 : 3 - remainder

  return (
    <section id="certificates" className="border-t border-border" aria-labelledby="certificates-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            certificates
          </span>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <h2 id="certificates-heading" className="sr-only">Certificates</h2>

        <motion.div 
          key={expanded ? "expanded" : "collapsed"}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {visible.map((cert, index) => (
            <motion.div
              variants={cardVariantUp}
              key={cert.title}
              initial={{ opacity: 1 }}
              whileInView={isMobile ? { backgroundColor: "hsl(var(--card))" } : {}}
              viewport={{ margin: "-30% 0px -30% 0px" }}
              transition={{ duration: 0.3 }}
              className={`group flex flex-col gap-2 lg:gap-3 bg-background p-4 md:p-6 transition-colors lg:hover:bg-card ${!expanded && index === 3 ? "lg:hidden" : ""}`}
            >
              <div className="flex items-start justify-between">
                <motion.div
                  whileInView={isMobile ? {backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))"} : {}}
                  viewport={{ margin: "-30% 0px -30% 0px" }}
                  transition={{ duration: 0.3 }}
                  className="flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-secondary text-primary transition-colors lg:group-hover:bg-primary lg:group-hover:text-primary-foreground"
                >
                  <Award className="h-3.5 w-3.5" strokeWidth={1.5} />
                </motion.div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${cert.title} credential`}
                    className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                  </a>
                )}
              </div>

              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-medium leading-tight text-foreground">
                  {cert.title}
                </h3>
                <span className="font-mono text-xs text-primary">
                  {cert.issuer}
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {cert.date}
                </span>
                <div className="flex gap-1">
                  {cert.modes.map((mode) => (
                    <span
                      key={mode}
                      className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
             </motion.div>
          ))}
          {Array.from({ length: emptySlots }).map((_, i) => {
            const showOnMd = visible.length % 2 !== 0 && i === 0
            return (
              <motion.div
                variants={cardVariantUp}
                key={`empty-${i}`}
                className={`hidden bg-background ${showOnMd ? "md:block" : "lg:block"} ${!expanded && visible.length === 4 ? "lg:hidden" : ""}`}
                aria-hidden="true"
              />
            )
          })}
        </motion.div>

        {/* Expand/Collapse button */}
        {hasMore && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className={`mt-6 flex justify-center ${!expanded && filteredCertificates.length === 4 ? "md:hidden lg:flex" : ""}`}>
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="group inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 font-mono text-xs text-muted-foreground transition-all hover:border-primary hover:text-foreground"
              aria-expanded={expanded}
              aria-controls="certificates-grid"
            >
              {expanded ? "Show Less" : `Show All (${filteredCertificates.length})`}
              {expanded ? (
                <ChevronUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}