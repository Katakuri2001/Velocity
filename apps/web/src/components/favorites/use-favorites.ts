'use client'

import * as React from 'react'
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  getFavoritesCount,
  clearFavorites,
  isFavorite,
} from '@/lib/favorites'

export interface FavoritesContextType {
  favorites: string[]
  count: number
  isLoaded: boolean
  addFavorite: (vehicleId: string) => void
  removeFavorite: (vehicleId: string) => void
  toggleFavorite: (vehicleId: string) => void
  isFavorited: (vehicleId: string) => boolean
  clearFavorites: () => void
}

export function useFavorites(): FavoritesContextType {
  const [favorites, setFavorites] = React.useState<string[]>([])
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    const favs = getFavorites()
    setFavorites(favs)
    setIsLoaded(true)
  }, [])

  const count = favorites.length

  const addFavoriteHandler = React.useCallback((vehicleId: string) => {
    const updated = addFavorite(vehicleId)
    setFavorites(updated)
  }, [])

  const removeFavoriteHandler = React.useCallback((vehicleId: string) => {
    const updated = removeFavorite(vehicleId)
    setFavorites(updated)
  }, [])

  const toggleFavoriteHandler = React.useCallback((vehicleId: string) => {
    const { favorites: updated } = toggleFavorite(vehicleId)
    setFavorites(updated)
  }, [])

  const isFavoritedHandler = React.useCallback((vehicleId: string) => {
    return favorites.includes(vehicleId)
  }, [favorites])

  const clearFavoritesHandler = React.useCallback(() => {
    clearFavorites()
    setFavorites([])
  }, [])

  return {
    favorites,
    count,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    toggleFavorite: toggleFavoriteHandler,
    isFavorited: isFavoritedHandler,
    clearFavorites: clearFavoritesHandler,
    isLoaded,
  }
}
