'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { HeroBackground } from './hero-background'

export interface HeroProps {
  eyebrow?: string
  headline: string
  supportText?: string
  primaryCta: string
  secondaryCta: string
}

const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Hero({ eyebrow, headline, supportText, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative z-10">
      <HeroBackground />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: 'easeOut' }}
          className="max-w-lg"
        >
          {eyebrow && (
            <p className="text-sm font-manrope text-accent-champagne tracking-widest uppercase mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primaryText mb-6 leading-tight">
            {headline}
          </h1>
          {supportText && (
            <p className="text-lg md:text-xl text-secondaryText mb-8 font-manrope leading-relaxed">
              {supportText}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto">
              {primaryCta}
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {secondaryCta}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0.01 : 0.6 }}
          className="mt-12"
        >
          <div className="flex items-center gap-2 text-xs text-secondaryText font-manrope">
            <div className="w-1 h-1 bg-accent-electric-blue rounded-full animate-pulse" />
            <span>Scroll to explore</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
