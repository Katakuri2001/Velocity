'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useComparison } from './use-comparison'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Button } from '@/components/ui/button'

interface ComparisonTrayProps {}

export function ComparisonTray() {
  const { comparison, count, removeFromComparison, clearComparison, isLoaded } = useComparison()

  if (!isLoaded || count === 0) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t glass-border p-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-manrope font-semibold text-primaryText text-sm">
            Comparison ({count}/4)
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => clearComparison()}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {comparison.map((id) => (
            <div
              key={id}
              className="flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border glass-border relative group"
            >
              <div className="absolute inset-0 bg-white/5">
                <SkeletonPlaceholder />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeFromComparison(id)
                }}
                className="absolute top-1 right-1 glass-panel rounded-full p-1 hover:bg-white/30 transition-colors"
              >
                <svg className="w-3 h-3 text-secondaryText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Button size="sm" className="w-full" onClick={() => {}}>
            <Link href="/compare" className="flex items-center justify-center w-full h-full">
              View comparison
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

function SkeletonPlaceholder() {
  return (
    <div className="h-full w-full animate-pulse bg-white/5 rounded-lg" />
  )
}
