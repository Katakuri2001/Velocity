'use client'

import * as React from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { hasSeenIntro, isVoiceMuted, subscribeVoice, toggleVoiceMuted } from '@/lib/voice'

/**
 * Small speaker toggle in the header. Only appears after the intro has been
 * entered. It mutes and unmutes the welcome voice for this visit.
 */
export function VoiceToggle() {
  const [visible, setVisible] = React.useState(false)
  const [muted, setMuted] = React.useState(false)

  React.useEffect(() => {
    const sync = () => {
      setVisible(hasSeenIntro())
      setMuted(isVoiceMuted())
    }
    sync()
    return subscribeVoice(sync)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={toggleVoiceMuted}
      aria-pressed={muted}
      aria-label={muted ? 'Unmute welcome voice' : 'Mute welcome voice'}
      title={muted ? 'Unmute welcome voice' : 'Mute welcome voice'}
      className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-glassBorder text-secondaryText transition-colors hover:text-primaryText"
    >
      {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
    </button>
  )
}
