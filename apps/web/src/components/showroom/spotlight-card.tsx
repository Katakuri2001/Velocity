'use client'

import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    node.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} onMouseMove={handleMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  )
}
