'use client'

import { CinematicReveal } from './cinematic-reveal'
import { CountUp } from './count-up'

const DETAIL_IMAGE =
  'https://pub-8c38cfe6583241abbd047c611c9137dc.r2.dev/vehicles/mclaren/mclaren-750s/primary.png'

/** Dark detail close-up: one Meter render cropped to a bodywork and wheel area. */
export function DetailSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <CinematicReveal>
          <p className="text-[0.68rem] font-manrope uppercase tracking-[0.34em] text-[#a98f5c]">
            In detail
          </p>
          <h2 className="mt-4 max-w-3xl font-manrope text-[clamp(1.8rem,5vw,3.4rem)] font-bold leading-[1.08] text-[#f2efe9]">
            Every icon in one place.
          </h2>
        </CinematicReveal>

        <CinematicReveal delay={0.08}>
          <div className="relative mt-10 aspect-[16/5] w-full overflow-hidden rounded-2xl border border-[rgba(201,168,106,0.22)]">
            <img
              src={DETAIL_IMAGE}
              alt="Close view of bodywork and wheel from a Meter studio render"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: '50% 57%' }}
              loading="lazy"
              decoding="async"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.75),rgba(5,5,5,0.05)_55%)]"
            />
          </div>
        </CinematicReveal>

        <CinematicReveal delay={0.16}>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-[#a6a39c] sm:text-base">
            Wheels, lines, and reflections, held close. Every car in the showroom is
            photographed to the same standard, so a detail is never a compromise.
          </p>
        </CinematicReveal>
      </div>
    </section>
  )
}

/** Ivory editorial break: one large italic serif statement per block. */
export function IvorySection() {
  return (
    <section className="bg-[#f5f0e8] px-5 py-20 text-[#111111] sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <CinematicReveal>
          <div className="border-t border-[#111111]/20 pt-10 md:pt-14">
            <h2 className="max-w-3xl font-display text-[clamp(2rem,5.5vw,3.9rem)] font-normal italic leading-[1.06] text-[#111111]">
              Quiet power. Unmistakable presence.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#3d3a35] sm:text-base">
              Eleven cars chosen for the way they hold a room when the engine is off.
              Nothing loud. Nothing borrowed.
            </p>
          </div>
        </CinematicReveal>

        <CinematicReveal delay={0.08}>
          <div className="mt-14 border-t border-[#111111]/20 pt-10 md:mt-20 md:pt-14">
            <h2 className="max-w-3xl font-display text-[clamp(2rem,5.5vw,3.9rem)] font-normal italic leading-[1.06] text-[#111111]">
              Almost invisible. Always present.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#3d3a35] sm:text-base">
              The showroom stays out of the way. The cars do the talking, and the
              numbers wait until you ask for them.
            </p>
          </div>
        </CinematicReveal>

        <CinematicReveal delay={0.16}>
          <div className="mt-14 border-t border-[#111111]/20 pt-10 md:mt-20 md:pt-14">
            <h2 className="max-w-3xl font-display text-[clamp(2rem,5.5vw,3.9rem)] font-normal italic leading-[1.06] text-[#111111]">
              Electric by nature. Unforgettable by design.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#3d3a35] sm:text-base">
              Silent where it matters and unmistakable everywhere else. The
              charge is the only thing you never hear.
            </p>
          </div>
        </CinematicReveal>
      </div>
    </section>
  )
}

const FACTS = [
  { index: '01', number: 11, label: 'Vehicles in the collection' },
  { index: '02', number: 3, label: 'Cars with full specifications' },
  { index: '03', number: 1, label: 'Showroom, one shared floor' },
]

/** Numbered feature cards: pale cards on ivory, true numbers only. */
export function NumberedCards() {
  return (
    <section className="bg-[#f5f0e8] px-5 pb-20 text-[#111111] sm:px-8 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {FACTS.map((fact, i) => (
          <CinematicReveal key={fact.index} delay={i * 0.08}>
            <article className="h-full rounded-xl border border-[#111111]/10 bg-[#fbf8f2] p-7">
              <span className="block h-[3px] w-10 bg-[#c9a86a]" aria-hidden="true" />
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

/** Final element of the page: a huge muted-gold wordmark on dark. */
export function FooterCloser() {
  return (
    <section className="border-t border-[rgba(201,168,106,0.18)] bg-[#050505] px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-7xl text-center">
        <CinematicReveal>
          <p className="mx-auto break-words font-display text-[clamp(2.6rem,13vw,10rem)] font-bold leading-none tracking-[0.18em] text-[#a98f5c] sm:tracking-[0.3em]">
            VELOCITY
          </p>
          <p className="mt-7 text-[0.68rem] font-manrope uppercase tracking-[0.4em] text-[#a6a39c]">
            Step inside
          </p>
        </CinematicReveal>
      </div>
    </section>
  )
}
