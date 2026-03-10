import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeProvider } from "@/hooks/use-mode"
import { SITE_METADATA } from "@/lib/site-metadata"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AmbientCursor } from "@/components/ambient-cursor"
import { PremiumBackground } from '@/components/premium-background'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  icons: {
    icon: SITE_METADATA.favicon,
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
		  	<body className="font-sans antialiased" suppressHydrationWarning>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<AmbientCursor />
					<PremiumBackground />
					<ModeProvider>
						<ScrollArea className="h-screen w-full relative z-10">
							{children}
						</ScrollArea>
					</ModeProvider>
				</ThemeProvider>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
  );
}
