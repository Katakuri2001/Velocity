/**
 * Favorites localStorage utility.
 * Persists favorited vehicle IDs for guest users across sessions.
 */

const STORAGE_KEY = 'velocity_favorites'

/**
 * Check if localStorage is available (SSR-safe).
 */
function isLocalStorageAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

/**
 * Get all favorited vehicle IDs.
 */
export function getFavorites(): string[] {
  if (!isLocalStorageAvailable()) return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed.filter((id) => typeof id === 'string')
    return []
  } catch {
    return []
  }
}

/**
 * Check if a vehicle is favorited.
 */
export function isFavorite(vehicleId: string): boolean {
  return getFavorites().includes(vehicleId)
}

/**
 * Add a vehicle to favorites.
 */
export function addFavorite(vehicleId: string): string[] {
  if (!isLocalStorageAvailable()) return []
  const current = getFavorites()
  if (current.includes(vehicleId)) return current
  const updated = [...current, vehicleId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

/**
 * Remove a vehicle from favorites.
 */
export function removeFavorite(vehicleId: string): string[] {
  if (!isLocalStorageAvailable()) return []
  const current = getFavorites()
  const updated = current.filter((id) => id !== vehicleId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

/**
 * Toggle a vehicle's favorite status.
 */
export function toggleFavorite(vehicleId: string): { favorites: string[]; isFavorited: boolean } {
  const current = getFavorites()
  if (current.includes(vehicleId)) {
    const updated = removeFavorite(vehicleId)
    return { favorites: updated, isFavorited: false }
  }
  const updated = addFavorite(vehicleId)
  return { favorites: updated, isFavorited: true }
}

/**
 * Get the count of favorited vehicles.
 */
export function getFavoritesCount(): number {
  return getFavorites().length
}

/**
 * Clear all favorites.
 */
export function clearFavorites(): void {
  if (!isLocalStorageAvailable()) return
  localStorage.removeItem(STORAGE_KEY)
}
