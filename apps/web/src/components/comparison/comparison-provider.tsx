'use client'

import * as React from 'react'
import { useComparison, ComparisonContextType } from './use-comparison'

const ComparisonContext = React.createContext<ComparisonContextType | null>(null)

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const comparison = useComparison()

  return (
    <ComparisonContext.Provider value={comparison}>
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparisonContext(): ComparisonContextType {
  const ctx = React.useContext(ComparisonContext)
  if (!ctx) throw new Error('useComparisonContext must be used within ComparisonProvider')
  return ctx
}
