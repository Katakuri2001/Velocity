'use client'

import * as React from 'react'
import { CinematicReveal } from './cinematic-reveal'
import { CountUp } from './count-up'

const DETAIL_IMAGE =
  'https://pub-8c38cfe6583241abbd047c611c9137dc.r2.dev/vehicles/mclaren/mclaren-750s/primary.png'
const LOCAL_DETAIL = '/images/previewcars/mclaren-750s.jpg'

/** Dark detail close-up. One existing render, cropped with object-position only. */
export function DetailSection() {
  const [src, setSrc] = React.useState(DETAIL_IMAGE)

  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <CinematicReveal>
          <p className="text-[0.7rem] font-manrope uppercase tracking-[0.42em] text-[#c9a86a]">
            In detail
          </p>
          <h2 className="mt-5 max-w-3xl font-manrope text-[clamp(1.9rem,5vw,3.4rem)] font-bold leading-[1.08] text-[#f5f0e8]">
            Held in detail.
          </h2>
        </CinematicReveal>

        <CinematicReveal delay={0.08}>
          <div className="relative mt-10 aspect-[16/6] w-full overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a]">
            <img
              src={src}
              onError={() => setSrc(LOCAL_DETAIL)}
              alt="Close view of bodywork and wheel from a studio render"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: '50% 57%' }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </CinematicReveal>

        <CinematicReveal delay={0.16}>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-[#a6a39c] sm:text-base">
            Lines, surfaces, and reflection, held close. Every car here is photographed to
            the same standard, so a detail is never a compromise.
          </p>
        </CinematicReveal>
      </div>
    </section>
  )
}

/** Ivory editorial break: one short serif statement per block. */
export function IvorySection() {
  const statements = [
    {
      title: 'Presence without noise.',
      body: 'A car should hold a room before it ever moves. Nothing here needs to raise its voice.',
    },
    {
      title: 'Nothing borrowed. Nothing loud.',
      body: 'Each arrival is chosen for the way it carries itself. No borrowed styling, no borrowed attention.',
    },
    {
      title: 'Quiet, then undeniable.',
      body: 'The showroom stays out of the way. The cars do the talking, and the numbers wait until you ask.',
    },
  ]

  return (
    <section className="bg-[#f5f0e8] px-5 py-20 text-[#111111] sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        {statements.map((item, index) => (
          <CinematicReveal key={item.title} delay={index * 0.08}>
            <div className={`border-t border-[#111111]/20 pt-10 md:pt-14 ${index > 0 ? 'mt-14 md:mt-20' : ''}`}>
              <h2 className="max-w-3xl font-display text-[clamp(2rem,5.5vw,3.9rem)] font-normal italic leading-[1.08] text-[#111111]">
                {item.title}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#3d3a35] sm:text-base">{item.body}</p>
            </div>
          </CinematicReveal>
        ))}
      </div>
    </section>
  )
}

/** True numbers only: 11 vehicles, 4 categories, 1 showroom on this branch. */
const FACTS = [
  { index: '01', number: 11, label: 'Cars in the collection' },
  { index: '02', number: 4, label: 'Curated categories' },
  { index: '03', number: 1, label: 'One showroom floor' },
]

export function NumberedCards() {
  return (
    <section className="bg-[#f5f0e8] px-5 pb-20 text-[#111111] sm:px-8 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {FACTS.map((fact, i) => (
          <CinematicReveal key={fact.index} delay={i * 0.08}>
            <article className="h-full rounded-xl border border-[#111111]/15 bg-[#fbf8f2] p-7">
              <span className="block h-px w-10 bg-[#111111]" aria-hidden="true" />
              <p className="mt-6 text-xs font-manrope uppercase tracking-[0.28em] text-[#3d3a35]">
                {fact.index}
              </p>
              <p className="mt-3 font-display text-5xl font-normal italic leading-none text-[#111111]">
                <CountUp to={fact.number} delay={0.16 + i * 0.08} />
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#3d3a35]">{fact.label}</p>
            </article>
          </CinematicReveal>
        ))}
      </div>
    </section>
  )
}

/** Final element: an oversized ivory wordmark on black, with one gold foil rule. */
export function FooterCloser() {
  return (
    <section className="border-t border-[#262626] bg-[#050505] px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-7xl text-center">
        <CinematicReveal>
          <div className="mx-auto h-px w-24 bg-[#c9a86a]/70" aria-hidden="true" />
          <p className="mt-10 break-words font-display text-[clamp(2.6rem,13vw,10rem)] font-bold italic leading-none tracking-[0.14em] text-[#f5f0e8] sm:tracking-[0.2em]">
            VELOCITY
          </p>
          <p className="mt-8 text-[0.68rem] font-manrope uppercase tracking-[0.4em] text-[#a6a39c]">
            Eleven cars. One standard.
          </p>
        </CinematicReveal>
      </div>
    </section>
  )
}
