'use client'

import * as React from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
