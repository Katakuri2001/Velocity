'use client'

import Image from 'next/image'
import heroShowroom from '../../../../../public/images/hero/hero-candidate-1.jpg'
import { CinematicReveal } from './cinematic-reveal'

/**
 * Bright glass showroom strip on the dark site: the existing 1920 hero image
 * as a framed backdrop with a polished-floor reflection under it (mirrored,
 * blurred, gradient-faded). The single red accent of the site is the SF90 in
 * the hero — this section stays dark and gold.
 */
export function ShowroomSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-20 sm:px-8 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,106,0.10),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <CinematicReveal>
          <p className="text-[0.68rem] font-manrope uppercase tracking-[0.34em] text-[#a98f5c]">
            The showroom floor
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,3.6rem)] font-normal italic leading-[1.08] text-[#f2efe9]">
            Daylight, indoors.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#a6a39c] sm:text-base">
            Glass on three sides, a polished floor, and eleven cars waiting under
            the lights. The building stays quiet so the cars can speak.
          </p>
        </CinematicReveal>

        <CinematicReveal delay={0.16} className="mt-10">
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl border border-[rgba(201,168,106,0.22)]">
            <Image
              src={heroShowroom}
              alt="Glass showroom interior with polished floor"
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover object-center"
              priority={false}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.55),rgba(5,5,5,0.05)_35%,rgba(5,5,5,0.45)_85%,rgba(5,5,5,0.85))]"
            />
          </div>

          {/* polished-floor reflection: mirrored strip, blurred, fading out */}
          <div
            aria-hidden="true"
            className="relative h-16 w-full overflow-hidden sm:h-24"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)',
            }}
          >
            <Image
              src={heroShowroom}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              className="scale-y-[-1] object-cover object-bottom opacity-45 blur-[3px]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.35),rgba(5,5,5,0.9))]" />
          </div>
        </CinematicReveal>
      </div>
    </section>
  )
}
