"use client"

import dynamic from "next/dynamic"

const AmbientCursor = dynamic(
  () => import("@/components/layout/ambient-cursor").then((mod) => mod.AmbientCursor),
  { ssr: false }
)

const PremiumBackground = dynamic(
  () => import("@/components/layout/premium-background").then((mod) => mod.PremiumBackground),
  { ssr: false }
)

const AccessibilityMenu = dynamic(
  () => import("@/components/blocks/accessibility-menu").then((mod) => mod.AccessibilityMenu),
  { ssr: false }
)

export function ChromeEffects() {
  return (
    <>
      <AmbientCursor />
      <PremiumBackground />
      <AccessibilityMenu />
    </>
  )
}
