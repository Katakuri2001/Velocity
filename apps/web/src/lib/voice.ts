const SEEN_KEY = 'velocity-intro-seen'
const MUTED_KEY = 'velocity-voice-muted'

export const WELCOME_SCRIPT =
  'Welcome to Velocity. Eleven exceptional cars, one showroom. Step inside.'

type Listener = () => void

const listeners = new Set<Listener>()
let audio: HTMLAudioElement | null = null

function emit(): void {
  listeners.forEach((listener) => listener())
}

function hasWindow(): boolean {
  return typeof window !== 'undefined'
}

/** Subscribe to voice state changes (intro seen flag, mute state). */
export function subscribeVoice(listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function hasSeenIntro(): boolean {
  if (!hasWindow()) return false
  return window.sessionStorage.getItem(SEEN_KEY) === '1'
}

export function markIntroSeen(): void {
  if (!hasWindow()) return
  window.sessionStorage.setItem(SEEN_KEY, '1')
  emit()
}

export function isVoiceMuted(): boolean {
  if (!hasWindow()) return false
  return window.sessionStorage.getItem(MUTED_KEY) === '1'
}

function getAudio(): HTMLAudioElement | null {
  if (!hasWindow()) return null
  if (!audio) {
    audio = new Audio('/audio/welcome.mp3')
    audio.preload = 'auto'
    audio.loop = false
  }
  return audio
}

/**
 * Plays the welcome voice once. Never loops. Returns false when muted.
 * A blocked file or blocked playback stays silent — never throws.
 */
export function playWelcome(): boolean {
  const element = getAudio()
  if (!element || isVoiceMuted()) return false
  try {
    element.currentTime = 0
    const started = element.play()
    if (started && typeof started.catch === 'function') {
      started.catch(() => {
        /* browser or file blocked: enter the showroom silently */
      })
    }
    return true
  } catch {
    return false
  }
}

/** Stops playback and rewinds. Safe to call when nothing ever played. */
export function stopWelcome(): void {
  if (!audio) return
  try {
    audio.pause()
    audio.currentTime = 0
  } catch {
    /* ignore */
  }
}

export function setVoiceMuted(muted: boolean): void {
  if (!hasWindow()) return
  window.sessionStorage.setItem(MUTED_KEY, muted ? '1' : '0')
  if (muted) stopWelcome()
  emit()
}

export function toggleVoiceMuted(): void {
  setVoiceMuted(!isVoiceMuted())
}
