'use client'

import Image from 'next/image'
import { CinematicReveal } from './cinematic-reveal'

const SHOWROOM_IMAGE = '/images/previewcars/porsche-911-gt3.jpg'

/** Glass showroom strip: one framed local image, flat dark stage, no gradients. */
export function ShowroomSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <CinematicReveal>
          <p className="text-[0.7rem] font-manrope uppercase tracking-[0.42em] text-[#c9a86a]">
            The showroom floor
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,5vw,3.6rem)] font-normal italic leading-[1.08] text-[#f5f0e8]">
            Daylight, indoors.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#a6a39c] sm:text-base">
            Glass on three sides, a polished floor, and eleven cars waiting under the
            lights. The building stays quiet so the cars can speak.
          </p>
        </CinematicReveal>

        <CinematicReveal delay={0.16} className="mt-10">
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a]">
            <Image
              src={SHOWROOM_IMAGE}
              alt="Porsche 911 GT3 in the showroom"
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover object-center"
            />
          </div>
          <div className="mx-auto mt-6 h-px w-24 bg-[#c9a86a]/60" aria-hidden="true" />
        </CinematicReveal>
      </div>
    </section>
  )
}
