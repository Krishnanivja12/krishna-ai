"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useAccessibility } from "@/contexts/accessibility-context"

interface Node {
  id: number
  x: number
  y: number
  layer: number
  radius: number
  delay: number
}

interface Connection {
  from: Node
  to: Node
  delay: number
  duration: number
}

interface Particle {
  id: number
  from: Node
  to: Node
  delay: number
  duration: number
}

export function NeuralVisualization() {
  const { reducedMotion } = useAccessibility()
  const [isVisible, setIsVisible] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 400, height: 420 })

  useEffect(() => {
    setIsVisible(true)
    const handleResize = () => {
      setDimensions({
        width: Math.min(400, window.innerWidth * 0.35),
        height: 420,
      })
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Generate neural network nodes arranged in layers
  const { nodes, connections, particles } = useMemo(() => {
    const { width, height } = dimensions
    const layers = 5
    const nodesPerLayer = [3, 4, 5, 4, 3]
    const padding = { top: 50, bottom: 50, left: 40, right: 40 }
    const layerWidth = (width - padding.left - padding.right) / (layers - 1)
    const nodeList: Node[] = []
    let nodeId = 0

    nodesPerLayer.forEach((count, layerIdx) => {
      const x = padding.left + layerIdx * layerWidth
      const layerHeight = height - padding.top - padding.bottom
      const spacing = layerHeight / (count + 1)

      for (let i = 0; i < count; i++) {
        const y = padding.top + spacing * (i + 1)
        nodeList.push({
          id: nodeId++,
          x,
          y,
          layer: layerIdx,
          radius: layerIdx === 0 || layerIdx === layers - 1 ? 6 : 4,
          delay: layerIdx * 0.15 + i * 0.05,
        })
      }
    })

    // Create connections between adjacent layers
    const connectionList: Connection[] = []
    const particleList: Particle[] = []
    let particleId = 0

    for (let layerIdx = 0; layerIdx < layers - 1; layerIdx++) {
      const currentLayerNodes = nodeList.filter((n) => n.layer === layerIdx)
      const nextLayerNodes = nodeList.filter((n) => n.layer === layerIdx + 1)

      currentLayerNodes.forEach((from) => {
        nextLayerNodes.forEach((to) => {
          connectionList.push({
            from,
            to,
            delay: from.delay + to.delay * 0.3,
            duration: 0.8 + Math.random() * 0.4,
          })
          // Particles flow along each connection
          if (particleId < 30) {
            particleList.push({
              id: particleId++,
              from,
              to,
              delay: from.delay + Math.random() * 2,
              duration: 1.5 + Math.random() * 1.5,
            })
          }
        })
      })
    }

    return { nodes: nodeList, connections: connectionList, particles: particleList }
  }, [dimensions])

  if (reducedMotion) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-2xl font-mono text-primary/50">🧠</div>
          <p className="font-mono text-[10px] text-muted-foreground">AI Core Active</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(var(--glow-primary)/0.06),transparent_70%)]" />

      {/* SVG for connections */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsla(var(--glow-primary), 0)" />
            <stop offset="50%" stopColor="hsla(var(--glow-primary), 0.15)" />
            <stop offset="100%" stopColor="hsla(var(--glow-primary), 0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {isVisible &&
          connections.map((conn, i) => (
            <motion.line
              key={`conn-${i}`}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="hsla(var(--glow-primary), 0.08)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0, 0.12, 0.08, 0.15, 0.08],
              }}
              transition={{
                duration: conn.duration,
                delay: conn.delay,
                opacity: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: conn.delay,
                  ease: "easeInOut",
                },
              }}
            />
          ))}
      </svg>

      {/* Animated particles flowing through connections */}
      {isVisible &&
        particles.slice(0, 20).map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute h-1.5 w-1.5 rounded-full bg-glow-primary/40"
            style={{
              filter: "blur(1px)",
              boxShadow: "0 0 6px hsla(var(--glow-primary), 0.3)",
            }}
            initial={{
              x: particle.from.x - 3,
              y: particle.from.y - 3,
              opacity: 0,
            }}
            animate={{
              x: [particle.from.x - 3, particle.to.x - 3],
              y: [particle.from.y - 3, particle.to.y - 3],
              opacity: [0, 0.6, 0.8, 0.6, 0],
              scale: [0.5, 1, 1.2, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: 1 + Math.random(),
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Nodes */}
      {isVisible &&
        nodes.map((node) => (
          <motion.div
            key={`node-${node.id}`}
            className="absolute rounded-full"
            style={{
              width: node.radius * 2 + 4,
              height: node.radius * 2 + 4,
              x: node.x - node.radius - 2,
              y: node.y - node.radius - 2,
              background:
                node.layer === 0 || node.layer === 4
                  ? "hsla(var(--glow-primary), 0.3)"
                  : "hsla(var(--foreground), 0.12)",
              boxShadow:
                node.layer === 0 || node.layer === 4
                  ? "0 0 12px hsla(var(--glow-primary), 0.2)"
                  : "none",
              border: "1px solid hsla(var(--glow-primary), 0.1)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: 1,
              boxShadow:
                node.layer === 0 || node.layer === 4
                  ? [
                      "0 0 8px hsla(var(--glow-primary), 0.15)",
                      "0 0 16px hsla(var(--glow-primary), 0.3)",
                      "0 0 8px hsla(var(--glow-primary), 0.15)",
                    ]
                  : "none",
            }}
            transition={{
              duration: 0.5,
              delay: node.delay,
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {/* Inner glow for input/output nodes */}
            {(node.layer === 0 || node.layer === 4) && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, hsla(var(--glow-primary), 0.4), transparent)",
                  filter: "blur(2px)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: node.delay,
                }}
              />
            )}
          </motion.div>
        ))}

      {/* Center glow overlay */}
      <motion.div
        className="pointer-events-none absolute h-20 w-20 rounded-full"
        style={{
          background: "radial-gradient(circle, hsla(var(--glow-primary), 0.06), transparent)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Status label at bottom */}
      <motion.div
        className="absolute bottom-4 left-4 flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="font-mono text-[8px] tracking-widest text-muted-foreground/40 uppercase">
          neural_active
        </span>
      </motion.div>
    </div>
  )
}
