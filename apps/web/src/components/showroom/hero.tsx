'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FadeContent } from './fade-content'

export interface HeroProps {
  eyebrow?: string
  headline: string
  supportText?: string
  primaryCta: string
  secondaryCta: string
  featuredImage?: string
  featuredName?: string
}

export function Hero({
  eyebrow,
  headline,
  supportText,
  primaryCta,
  secondaryCta,
  featuredImage,
  featuredName,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(255,255,255,0.035),transparent_60%)]" aria-hidden="true" />

      <div className="page-container relative grid min-h-[calc(100vh-4rem)] items-center gap-16 py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-6">
          {eyebrow && (
            <FadeContent>
              <p className="eyebrow">{eyebrow}</p>
            </FadeContent>
          )}

          <FadeContent delay={0.08}>
            <h1 className="mt-7 max-w-2xl font-display text-[clamp(2.75rem,5vw,4rem)] font-normal leading-[1.03] tracking-[-0.03em] text-primary">
              {headline}
            </h1>
          </FadeContent>

          {supportText && (
            <FadeContent delay={0.16} className="mt-7 max-w-lg">
              <p className="text-base leading-relaxed text-muted sm:text-lg">{supportText}</p>
            </FadeContent>
          )}

          <FadeContent delay={0.24} className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              href="/inventory"
              className="focus-ring inline-flex items-center border border-gold px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:border-goldHover hover:text-goldHover"
            >
              {primaryCta}
            </Link>
            <Link
              href="/inventory/ferrari-sf90#enquiry"
              className="focus-ring border-b border-hairline pb-1 text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:border-gold hover:text-primary"
            >
              {secondaryCta}
            </Link>
          </FadeContent>

          <FadeContent delay={0.32} className="mt-14 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-muted/70">
            <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
            <span>Curated performance · Private collection</span>
          </FadeContent>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: 'easeOut' }}
          className="lg:col-span-6"
        >
          <div className="relative aspect-[5/4] w-full border border-hairline bg-surface sm:aspect-[4/3] lg:aspect-auto lg:h-[620px]">
            {featuredImage ? (
              <Image
                src={featuredImage}
                alt={featuredName || 'Featured vehicle'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center p-6 sm:p-10"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
                Featured vehicle on enquiry
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between border-t border-hairline bg-ink/70 px-5 py-4 sm:px-7">
              <div>
                <p className="eyebrow">Featured</p>
                <p className="mt-1 font-display text-xl text-primary sm:text-2xl">
                  {featuredName || 'The art of the drive'}
                </p>
              </div>
              <span className="hidden text-[11px] uppercase tracking-[0.2em] text-muted/70 sm:block">
                Velocity collection
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
