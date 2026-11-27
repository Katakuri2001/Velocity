'use client'

import Link from 'next/link'
import { CinematicReveal } from './cinematic-reveal'

const SF90_IMAGE = 'https://pub-8c38cfe6583241abbd047c611c9137dc.r2.dev/vehicles/ferrari/ferrari-sf90/primary.png'

/**
 * Gold-lit tunnel hero: dark stage, thin gold light strips at both edges,
 * one front-on car centred, italic serif headline. No video, no carousel.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050505]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(201,168,106,0.20),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-36 bg-[linear-gradient(to_right,rgba(201,168,106,0.30),rgba(201,168,106,0.06)_55%,transparent)] sm:w-56"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-36 bg-[linear-gradient(to_left,rgba(201,168,106,0.30),rgba(201,168,106,0.06)_55%,transparent)] sm:w-56"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 opacity-90 sm:block"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(201,168,106,0.55) 0px, rgba(201,168,106,0.55) 1px, transparent 1px, transparent 18px)',
          maskImage: 'linear-gradient(to right, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, black, transparent)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 opacity-90 sm:block"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(201,168,106,0.55) 0px, rgba(201,168,106,0.55) 1px, transparent 1px, transparent 18px)',
          maskImage: 'linear-gradient(to left, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
        }}
      />

      <div className="relative px-5 pb-16 pt-24 sm:px-8 md:pb-24 md:pt-28">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <CinematicReveal>
            <p className="text-[0.68rem] font-manrope uppercase tracking-[0.34em] text-[#a98f5c] sm:text-xs">
              The showroom
            </p>
          </CinematicReveal>

          <CinematicReveal delay={0.12}>
            <h1 className="mt-5 font-display text-[clamp(3rem,10vw,7rem)] font-normal italic leading-[0.95] text-[#f2efe9]">
              Step inside.
            </h1>
          </CinematicReveal>

          <CinematicReveal delay={0.24}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#d4d4d8] sm:text-lg">
              Eleven exceptional cars. One showroom.
            </p>
          </CinematicReveal>

          <CinematicReveal delay={0.36}>
            <Link
              href="/inventory"
              className="focus-ring mt-8 inline-flex items-center justify-center rounded-full border border-[rgba(201,168,106,0.5)] px-7 py-3 text-xs font-manrope uppercase tracking-[0.18em] text-[#e7dcc4] transition-colors hover:border-[#c9a86a] hover:text-[#f7f2e7]"
            >
              Explore collection
            </Link>
          </CinematicReveal>

          <CinematicReveal delay={0.48} className="mt-10 w-full">
            <div className="relative mx-auto w-full max-w-3xl">
              <img
                src={SF90_IMAGE}
                alt="Ferrari SF90, front view"
                width={1024}
                height={1024}
                className="mx-auto block h-auto w-full object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
          </CinematicReveal>
        </div>
      </div>
    </section>
  )
}
