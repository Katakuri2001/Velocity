'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeContentProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function FadeContent({ children, className = '', delay = 0, y = 18 }: FadeContentProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
