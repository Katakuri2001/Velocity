import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

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

import { getFavorites, addFavorite, removeFavorite, toggleFavorite, getFavoritesCount } from './favorites'

describe('Favorites localStorage utility', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  describe('getFavorites', () => {
    it('returns empty array when no favorites stored', () => {
      expect(getFavorites()).toEqual([])
    })

    it('returns stored favorites', () => {
      addFavorite('veh_1')
      addFavorite('veh_2')
      expect(getFavorites()).toEqual(['veh_1', 'veh_2'])
    })
  })

  describe('addFavorite', () => {
    it('adds a new favorite', () => {
      const result = addFavorite('veh_1')
      expect(result).toEqual(['veh_1'])
      expect(getFavorites()).toEqual(['veh_1'])
    })

    it('does not add duplicate', () => {
      addFavorite('veh_1')
      const result = addFavorite('veh_1')
      expect(result).toEqual(['veh_1'])
      expect(getFavorites().length).toBe(1)
    })
  })

  describe('removeFavorite', () => {
    it('removes a favorite', () => {
      addFavorite('veh_1')
      addFavorite('veh_2')
      const result = removeFavorite('veh_1')
      expect(result).toEqual(['veh_2'])
    })

    it('does nothing if favorite does not exist', () => {
      const result = removeFavorite('veh_nonexistent')
      expect(result).toEqual([])
    })
  })

  describe('toggleFavorite', () => {
    it('adds when not favorited', () => {
      const { favorites, isFavorited } = toggleFavorite('veh_1')
      expect(favorites).toEqual(['veh_1'])
      expect(isFavorited).toBe(true)
    })

    it('removes when already favorited', () => {
      addFavorite('veh_1')
      const { favorites, isFavorited } = toggleFavorite('veh_1')
      expect(favorites).toEqual([])
      expect(isFavorited).toBe(false)
    })
  })

  describe('getFavoritesCount', () => {
    it('returns count of favorites', () => {
      addFavorite('veh_1')
      addFavorite('veh_2')
      expect(getFavoritesCount()).toBe(2)
    })
  })
})
