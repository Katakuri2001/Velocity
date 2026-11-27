'use client'

import * as React from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import {
  WELCOME_SCRIPT,
  hasSeenIntro,
  isVoiceMuted,
  markIntroSeen,
  playWelcome,
  setVoiceMuted,
  stopWelcome,
} from '@/lib/voice'

/**
 * First-visit welcome overlay for the homepage.
 * Voice plays only after "Enter Showroom" is tapped — never on load.
 * The "intro seen" flag lives in sessionStorage only.
 */
export function IntroOverlay() {
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [muted, setMuted] = React.useState(false)
  const enterRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    setMounted(true)
    setMuted(isVoiceMuted())

    if (hasSeenIntro()) return

    setOpen(true)
    const focusTimer = window.setTimeout(() => enterRef.current?.focus(), 120)
    return () => window.clearTimeout(focusTimer)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  if (!mounted || !open) return null

  const enter = () => {
    markIntroSeen()
    playWelcome()
    setOpen(false)
  }

  const skip = () => {
    markIntroSeen()
    stopWelcome()
    setOpen(false)
  }

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    setVoiceMuted(next)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Velocity"
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#050505]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-[linear-gradient(to_right,rgba(201,168,106,0.28),rgba(201,168,106,0.07)_55%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-[linear-gradient(to_left,rgba(201,168,106,0.28),rgba(201,168,106,0.07)_55%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-24 opacity-80"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(201,168,106,0.5) 0px, rgba(201,168,106,0.5) 1px, transparent 1px, transparent 16px)',
          maskImage: 'linear-gradient(to right, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, black, transparent)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-24 opacity-80"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(201,168,106,0.5) 0px, rgba(201,168,106,0.5) 1px, transparent 1px, transparent 16px)',
          maskImage: 'linear-gradient(to left, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
        }}
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.42em] text-[#a98f5c] sm:text-sm">VELOCITY</p>

        <h1 className="mt-7 font-display text-[clamp(2.2rem,7vw,4.5rem)] font-normal italic leading-tight text-[#f2efe9]">
          Welcome to Velocity.
        </h1>

        <button
          ref={enterRef}
          type="button"
          onClick={enter}
          className="focus-ring mt-9 rounded-full bg-[#c9a86a] px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-[#1a1206] transition-colors hover:bg-[#dcc08a]"
        >
          Enter Showroom
        </button>

        <p
          className="mt-6 max-w-lg text-sm leading-relaxed text-[#d4d4d8]"
          aria-label="Welcome voice subtitles"
        >
          {WELCOME_SCRIPT}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            aria-pressed={muted}
            aria-label={muted ? 'Unmute welcome voice' : 'Mute welcome voice'}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,106,0.35)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#d4d4d8] transition-colors hover:border-[rgba(201,168,106,0.7)] hover:text-[#f2efe9]"
          >
            {muted ? <VolumeX size={15} aria-hidden="true" /> : <Volume2 size={15} aria-hidden="true" />}
            {muted ? 'Unmute' : 'Mute'}
          </button>

          <button
            type="button"
            onClick={skip}
            className="focus-ring rounded-full border border-[rgba(242,239,233,0.25)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#a6a39c] transition-colors hover:border-[rgba(242,239,233,0.5)] hover:text-[#f2efe9]"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}
