'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

interface CountUpProps {
  to: number
  from?: number
  delay?: number
  className?: string
}

/**
 * Numeric count-up (React Bits "CountUp", adapted for this codebase).
 * With prefers-reduced-motion, the final number renders instantly.
 */
export function CountUp({ to, from = 0, delay = 0, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const motionValue = useMotionValue(from)
  const spring = useSpring(motionValue, { damping: 30, stiffness: 90 })
  const inView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    if (ref.current) ref.current.textContent = String(from)
  }, [from])

  useEffect(() => {
    if (reduceMotion) {
      if (ref.current) ref.current.textContent = String(to)
      return
    }
    if (!inView) return
    const timer = window.setTimeout(() => motionValue.set(to), delay * 1000)
    return () => window.clearTimeout(timer)
  }, [inView, reduceMotion, to, from, delay, motionValue])

  useEffect(() => {
    if (reduceMotion) return
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = String(Math.round(latest))
    })
    return () => unsubscribe()
  }, [spring, reduceMotion])

  return <span ref={ref} className={className} />
}
