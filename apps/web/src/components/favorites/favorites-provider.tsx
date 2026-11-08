'use client'

import * as React from 'react'
import { useFavorites, FavoritesContextType } from './use-favorites'

const FavoritesContext = React.createContext<FavoritesContextType | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const favorites = useFavorites()

  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavoritesContext(): FavoritesContextType {
  const ctx = React.useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavoritesContext must be used within FavoritesProvider')
  return ctx
}
