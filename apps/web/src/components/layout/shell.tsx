'use client'

import * as React from 'react'
import { MotionConfig } from 'framer-motion'
import { Navbar } from './navbar'
import { Footer } from './footer'

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
