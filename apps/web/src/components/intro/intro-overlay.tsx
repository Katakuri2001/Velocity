'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  WELCOME_SCRIPT,
  hasSeenIntro,
  isVoiceMuted,
  markIntroSeen,
  playWelcome,
  setVoiceMuted,
  stopWelcome,
} from '@/lib/voice'
import { playIntroMusic, stopIntroMusic } from '@/lib/intro-music'

const WORD = 'VELOCITY'
const R2_CAR =
  'https://pub-8c38cfe6583241abbd047c611c9137dc.r2.dev/vehicles/ferrari/ferrari-sf90/primary.png'
const LOCAL_CAR = '/images/previewcars/ferrari-sf90.jpg'

type Phase = 'welcome' | 'reveal'

/**
 * First-visit welcome. One primary action: Enter Showroom.
 * On tap: letter-by-letter wordmark, a thin gold foil sweep, then the car.
 * Voice and music start only after the tap; Skip works at any moment.
 */
export function IntroOverlay() {
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [phase, setPhase] = React.useState<Phase>('welcome')
  const [muted, setMuted] = React.useState(false)
  const [carSrc, setCarSrc] = React.useState(R2_CAR)
  const enterRef = React.useRef<HTMLButtonElement>(null)
  const mutedRef = React.useRef(false)

  React.useEffect(() => {
    setMounted(true)
    setMuted(isVoiceMuted())
    mutedRef.current = isVoiceMuted()
    if (hasSeenIntro()) return
    setOpen(true)
    const timer = window.setTimeout(() => enterRef.current?.focus(), 120)
    return () => window.clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const close = React.useCallback(() => {
    setOpen(false)
  }, [])

  const skip = React.useCallback(() => {
    stopWelcome()
    stopIntroMusic()
    markIntroSeen()
    close()
  }, [close])

  const finish = React.useCallback(() => {
    if (!mutedRef.current) playWelcome()
    markIntroSeen()
    close()
  }, [close])

  React.useEffect(() => {
    if (!open || phase !== 'reveal') return
    const duration = reduceMotion ? 80 : 2200
    const timer = window.setTimeout(finish, duration)
    return () => window.clearTimeout(timer)
  }, [phase, reduceMotion, finish, open])

  React.useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') skip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, skip])

  if (!mounted || !open) return null

  const enter = () => {
    if (!mutedRef.current) playIntroMusic()
    setPhase('reveal')
  }

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    mutedRef.current = next
    setVoiceMuted(next)
    if (next) {
      stopWelcome()
      stopIntroMusic()
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Velocity"
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#050505]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#c9a86a]/70" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#c9a86a]/25" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-5 w-px bg-[#c9a86a]/20 sm:left-10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-5 w-px bg-[#c9a86a]/20 sm:right-10" />

      {phase === 'welcome' ? (
        <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center sm:px-12">
          <p className="text-[0.7rem] font-manrope uppercase tracking-[0.5em] text-[#c9a86a]">Velocity</p>
          <h1 className="mt-8 font-display text-[clamp(2.4rem,7vw,5rem)] font-normal italic leading-[1.05] text-[#f5f0e8]">
            Welcome to Velocity.
          </h1>
          <div className="mt-10 h-px w-16 bg-[#c9a86a]" aria-hidden="true" />
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-[#d4d4d8] sm:text-base">{WELCOME_SCRIPT}</p>

          <button
            ref={enterRef}
            type="button"
            onClick={enter}
            className="focus-ring mt-10 min-h-[48px] rounded-full border border-[#c9a86a] px-10 py-3 text-xs font-manrope uppercase tracking-[0.22em] text-[#e7dcc4] transition-colors duration-[400ms] hover:bg-[#c9a86a] hover:text-[#050505]"
          >
            Enter Showroom
          </button>

          <div className="mt-9 flex items-center justify-center">
            <button
              type="button"
              onClick={toggleMute}
              aria-pressed={muted}
              aria-label={muted ? 'Unmute voice and music' : 'Mute voice and music'}
              className="focus-ring min-h-[44px] rounded-full border border-[#262626] px-5 text-[0.7rem] uppercase tracking-[0.18em] text-[#a6a39c] transition-colors hover:border-[#c9a86a]/60 hover:text-[#f5f0e8]"
            >
              {muted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center" aria-live="polite">
          <div className="flex flex-wrap justify-center" aria-label="Velocity">
            {WORD.split('').map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: reduceMotion ? 0 : index * 0.06, ease: 'easeOut' }}
                className="font-display text-[clamp(2.6rem,12vw,8rem)] font-normal italic leading-none tracking-[0.12em] text-[#c9a86a]"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.8, delay: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'left center' }}
            className="mt-7 h-px w-[min(78vw,720px)] bg-[#c9a86a]"
          />

          <motion.img
            src={carSrc}
            onError={() => setCarSrc(LOCAL_CAR)}
            alt="Ferrari SF90, front view"
            width={1024}
            height={1024}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.9, delay: reduceMotion ? 0 : 1, ease: 'easeOut' }}
            className="mt-8 max-h-[38vh] w-auto max-w-full object-contain"
          />
        </div>
      )}

      <button
        type="button"
        onClick={skip}
        className="focus-ring absolute bottom-6 right-6 min-h-[44px] rounded-full border border-[#262626] px-5 text-[0.7rem] uppercase tracking-[0.18em] text-[#a6a39c] transition-colors hover:border-[#f5f0e8]/40 hover:text-[#f5f0e8] sm:bottom-10 sm:right-10"
      >
        Skip
      </button>
    </div>
  )
}
