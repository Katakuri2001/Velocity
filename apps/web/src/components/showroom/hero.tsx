'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlurText } from './blur-text'
import { FadeContent } from './fade-content'
import { Magnet } from './magnet'

export interface HeroProps {
  eyebrow?: string
  headline: string
  supportText?: string
  primaryCta: string
  secondaryCta: string
}

export function Hero({ eyebrow, headline, supportText, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="page-container grid items-center gap-10 py-10 md:py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
      <div className="lg:col-span-6">
        {eyebrow && (
          <FadeContent>
            <p className="mb-5 text-[0.7rem] font-manrope uppercase tracking-[0.32em] text-accentChampagne">
              {eyebrow}
            </p>
          </FadeContent>
        )}

        <BlurText
          text={headline}
          className="block max-w-xl font-display text-[clamp(2.6rem,7vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.04em] text-primaryText"
        />

        {supportText && (
          <FadeContent delay={0.15} className="mt-6 max-w-lg">
            <p className="text-base leading-relaxed text-secondaryText font-manrope sm:text-lg">
              {supportText}
            </p>
          </FadeContent>
        )}

        <FadeContent delay={0.25} className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Magnet>
            <Link
              href="/inventory"
              className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-accentChampagne px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#241a0c] transition-colors hover:bg-[#e8cfa5] sm:w-auto"
            >
              {primaryCta}
            </Link>
          </Magnet>
          <Magnet strength={0.16}>
            <Link
              href="/contact"
              className="focus-ring inline-flex w-full items-center justify-center rounded-xl border border-glassBorder px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-primaryText transition-colors hover:bg-white/5 sm:w-auto"
            >
              {secondaryCta}
            </Link>
          </Magnet>
        </FadeContent>

        <FadeContent delay={0.35} className="mt-10 flex items-center gap-3 text-xs font-manrope text-secondaryText">
          <span className="h-px w-8 bg-accentChampagne/60" />
          <span>Curated performance · Private collection</span>
        </FadeContent>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative lg:col-span-6"
      >
        <div className="relative h-[300px] overflow-hidden rounded-2xl border border-glassBorder bg-secondaryBg shadow-pavilion sm:h-[420px] lg:h-[560px]">
          <Image
            src="/images/hero/hero-candidate-1.jpg"
            alt="Cinematic sports car hero"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primaryBg/85 via-primaryBg/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
            <div>
              <p className="text-[0.65rem] font-manrope uppercase tracking-[0.28em] text-accentChampagne">
                Featured
              </p>
              <p className="mt-1 font-display text-xl text-primaryText sm:text-2xl">The art of the drive</p>
            </div>
            <span className="hidden rounded-full border border-glassBorder px-3 py-1 text-[0.65rem] uppercase tracking-widest text-secondaryText sm:block">
              01 / 04
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
