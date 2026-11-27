/**
 * Intro background music: one quiet, non-looping cue under the welcome voice.
 * Source: Pixabay — "Cinematic Piano - Cinematic Piano Music" by leberch.
 * Trimmed to 12s with a short fade in and a clean fade out.
 * Free Pixabay Content License, no attribution required.
 */
const MUSIC_SRC = '/audio/intro-music.mp3'
const TARGET_VOLUME = 0.12 // roughly -18 dB: voice stays the lead
const FADE_IN_MS = 800
const FADE_OUT_START = 9000
const TOTAL_MS = 12000

let element: HTMLAudioElement | null = null
let frame = 0
let playing = false

function getElement(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  if (!element) {
    element = new Audio(MUSIC_SRC)
    element.preload = 'auto'
    element.loop = false
  }
  return element
}

/** Starts the cue once. Browser-blocked audio simply stays silent. */
export function playIntroMusic(): void {
  if (typeof window === 'undefined' || playing) return
  const audio = getElement()
  if (!audio) return

  try {
    audio.currentTime = 0
    audio.volume = 0
    const started = audio.play()
    if (started && typeof started.catch === 'function') {
      started.catch(() => {
        playing = false
        /* autoplay or file blocked: enter silently */
      })
    }
    playing = true
    const begin = window.performance.now()
    const tick = () => {
      const elapsed = window.performance.now() - begin
      let volume = TARGET_VOLUME
      if (elapsed < FADE_IN_MS) volume = TARGET_VOLUME * (elapsed / FADE_IN_MS)
      else if (elapsed > FADE_OUT_START) {
        volume = TARGET_VOLUME * Math.max(0, 1 - (elapsed - FADE_OUT_START) / (TOTAL_MS - FADE_OUT_START))
      }
      audio.volume = Math.min(1, Math.max(0, volume))
      if (elapsed < TOTAL_MS) frame = window.requestAnimationFrame(tick)
      else stopIntroMusic()
    }
    frame = window.requestAnimationFrame(tick)
  } catch {
    playing = false
  }
}

/** Stops the cue and clears the fade. Safe to call when nothing played. */
export function stopIntroMusic(): void {
  if (frame && typeof window !== 'undefined') window.cancelAnimationFrame(frame)
  frame = 0
  playing = false
  if (!element) return
  try {
    element.pause()
    element.currentTime = 0
    element.volume = 0
  } catch {
    /* ignore */
  }
}
