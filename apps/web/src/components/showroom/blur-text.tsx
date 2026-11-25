'use client'

import { motion } from 'framer-motion'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
}

export function BlurText({ text, className = '', delay = 0.06 }: BlurTextProps) {
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 12 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: delay * index, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
