import { describe, it, expect, beforeEach } from 'vitest'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

import { getComparison, addToComparison, removeFromComparison, toggleComparison, getComparisonCount, canAddToComparison } from './comparison'

describe('Comparison localStorage utility', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  describe('getComparison', () => {
    it('returns empty array when no comparisons stored', () => {
      expect(getComparison()).toEqual([])
    })

    it('returns stored comparisons', () => {
      addToComparison('veh_1')
      addToComparison('veh_2')
      expect(getComparison()).toEqual(['veh_1', 'veh_2'])
    })
  })

  describe('addToComparison', () => {
    it('adds a new comparison', () => {
      const result = addToComparison('veh_1')
      expect(result).toEqual(['veh_1'])
      expect(getComparison()).toEqual(['veh_1'])
    })

    it('does not add duplicate', () => {
      addToComparison('veh_1')
      const result = addToComparison('veh_1')
      expect(result).toEqual(['veh_1'])
    })

    it('does not add when at max of 4', () => {
      addToComparison('veh_1')
      addToComparison('veh_2')
      addToComparison('veh_3')
      addToComparison('veh_4')
      const result = addToComparison('veh_5')
      expect(result).toEqual(['veh_1', 'veh_2', 'veh_3', 'veh_4'])
      expect(getComparisonCount()).toBe(4)
    })
  })

  describe('removeFromComparison', () => {
    it('removes a comparison', () => {
      addToComparison('veh_1')
      addToComparison('veh_2')
      const result = removeFromComparison('veh_1')
      expect(result).toEqual(['veh_2'])
    })
  })

  describe('toggleComparison', () => {
    it('adds when not compared', () => {
      const { comparison, isCompared, added } = toggleComparison('veh_1')
      expect(comparison).toEqual(['veh_1'])
      expect(isCompared).toBe(true)
      expect(added).toBe(true)
    })

    it('removes when already compared', () => {
      addToComparison('veh_1')
      const { comparison, isCompared, added } = toggleComparison('veh_1')
      expect(comparison).toEqual([])
      expect(isCompared).toBe(false)
      expect(added).toBe(false)
    })

    it('does not add when at max of 4 and not already compared', () => {
      addToComparison('veh_1')
      addToComparison('veh_2')
      addToComparison('veh_3')
      addToComparison('veh_4')
      const { comparison, added } = toggleComparison('veh_5')
      expect(comparison).toEqual(['veh_1', 'veh_2', 'veh_3', 'veh_4'])
      expect(added).toBe(false)
    })
  })

  describe('canAddToComparison', () => {
    it('returns true when under max', () => {
      addToComparison('veh_1')
      expect(canAddToComparison()).toBe(true)
    })

    it('returns false when at max', () => {
      addToComparison('veh_1')
      addToComparison('veh_2')
      addToComparison('veh_3')
      addToComparison('veh_4')
      expect(canAddToComparison()).toBe(false)
    })
  })
})
