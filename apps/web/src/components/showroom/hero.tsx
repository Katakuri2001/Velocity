'use client'

import * as React from 'react'
import Link from 'next/link'
import { CinematicReveal } from './cinematic-reveal'

const R2_CAR =
  'https://pub-8c38cfe6583241abbd047c611c9137dc.r2.dev/vehicles/ferrari/ferrari-sf90/primary.png'
const LOCAL_CAR = '/images/previewcars/ferrari-sf90.jpg'

/**
 * Noir editorial hero: one front-on car, thin gold light strips, one headline.
 * No video, no carousel, no gradients, no cropped car.
 */
export function Hero() {
  const [carSrc, setCarSrc] = React.useState(R2_CAR)

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#050505]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-5 w-px bg-[#c9a86a]/30 sm:left-10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-5 w-px bg-[#c9a86a]/30 sm:right-10" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-px w-[70vw] -translate-x-1/2 bg-[#c9a86a]/20" />

      <div className="relative px-5 pb-14 pt-28 sm:px-8 md:pb-20 md:pt-32">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <CinematicReveal>
            <p className="text-[0.7rem] font-manrope uppercase tracking-[0.42em] text-[#c9a86a]">
              The collection
            </p>
          </CinematicReveal>

          <CinematicReveal delay={0.08}>
            <h1 className="mt-6 font-display text-[clamp(3rem,9.5vw,7rem)] font-normal italic leading-[0.98] text-[#f5f0e8]">
              The art of arrival.
            </h1>
          </CinematicReveal>

          <CinematicReveal delay={0.16}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#d4d4d8] sm:text-lg">
              Eleven cars. One standard.
            </p>
          </CinematicReveal>

          <CinematicReveal delay={0.24}>
            <Link
              href="/inventory"
              className="focus-ring mt-9 inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#c9a86a] px-8 py-3 text-xs font-manrope uppercase tracking-[0.22em] text-[#e7dcc4] transition-colors duration-[400ms] hover:bg-[#c9a86a] hover:text-[#050505]"
            >
              Explore collection
            </Link>
          </CinematicReveal>

          <CinematicReveal delay={0.32} className="mt-12 w-full">
            <div className="relative mx-auto w-full max-w-4xl">
              <img
                src={carSrc}
                onError={() => setCarSrc(LOCAL_CAR)}
                alt="Ferrari SF90, front view"
                width={1024}
                height={1024}
                className="mx-auto block h-auto max-h-[44vh] w-auto max-w-full object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
            <p className="mt-5 text-[0.68rem] font-manrope uppercase tracking-[0.34em] text-[#a6a39c]">
              Ferrari SF90
            </p>
          </CinematicReveal>
        </div>
      </div>
    </section>
  )
}
