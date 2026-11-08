'use client'

import * as React from 'react'
import {
  getComparison,
  addToComparison,
  removeFromComparison,
  toggleComparison,
  getComparisonCount,
  clearComparison,
  canAddToComparison,
} from '@/lib/comparison'

export interface ComparisonContextType {
  comparison: string[]
  count: number
  canAdd: boolean
  isLoaded: boolean
  addToComparison: (vehicleId: string) => void
  removeFromComparison: (vehicleId: string) => void
  toggleComparison: (vehicleId: string) => void
  isCompared: (vehicleId: string) => boolean
  clearComparison: () => void
}

export function useComparison(): ComparisonContextType {
  const [comparison, setComparison] = React.useState<string[]>([])
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    const comp = getComparison()
    setComparison(comp)
    setIsLoaded(true)
  }, [])

  const count = comparison.length
  const canAdd = canAddToComparison()

  const addHandler = React.useCallback((vehicleId: string) => {
    const updated = addToComparison(vehicleId)
    setComparison(updated)
  }, [])

  const removeHandler = React.useCallback((vehicleId: string) => {
    const updated = removeFromComparison(vehicleId)
    setComparison(updated)
  }, [])

  const toggleHandler = React.useCallback((vehicleId: string) => {
    const { comparison: updated } = toggleComparison(vehicleId)
    setComparison(updated)
  }, [])

  const isComparedHandler = React.useCallback((vehicleId: string) => {
    return comparison.includes(vehicleId)
  }, [comparison])

  const clearHandler = React.useCallback(() => {
    clearComparison()
    setComparison([])
  }, [])

  return {
    comparison,
    count,
    canAdd,
    addToComparison: addHandler,
    removeFromComparison: removeHandler,
    toggleComparison: toggleHandler,
    isCompared: isComparedHandler,
    clearComparison: clearHandler,
    isLoaded,
  }
}
