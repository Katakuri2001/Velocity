/**
 * Comparison localStorage utility.
 * Persists compared vehicle IDs (max 4) for guest users across sessions.
 */

const STORAGE_KEY = 'velocity_comparison'
const MAX_COMPARISON = 4

function isLocalStorageAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getComparison(): string[] {
  if (!isLocalStorageAvailable()) return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed.filter((id) => typeof id === 'string').slice(0, MAX_COMPARISON)
    return []
  } catch {
    return []
  }
}

export function isCompared(vehicleId: string): boolean {
  return getComparison().includes(vehicleId)
}

export function getComparisonCount(): number {
  return getComparison().length
}

export function canAddToComparison(): boolean {
  return getComparison().length < MAX_COMPARISON
}

export function addToComparison(vehicleId: string): string[] {
  if (!isLocalStorageAvailable()) return []
  const current = getComparison()
  if (current.includes(vehicleId)) return current
  if (current.length >= MAX_COMPARISON) return current
  const updated = [...current, vehicleId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export function removeFromComparison(vehicleId: string): string[] {
  if (!isLocalStorageAvailable()) return []
  const current = getComparison()
  const updated = current.filter((id) => id !== vehicleId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export function toggleComparison(vehicleId: string): { comparison: string[]; isCompared: boolean; added: boolean } {
  const current = getComparison()
  if (current.includes(vehicleId)) {
    const updated = removeFromComparison(vehicleId)
    return { comparison: updated, isCompared: false, added: false }
  }
  if (current.length >= MAX_COMPARISON) {
    return { comparison: current, isCompared: false, added: false }
  }
  const updated = addToComparison(vehicleId)
  return { comparison: updated, isCompared: true, added: true }
}

export function clearComparison(): void {
  if (!isLocalStorageAvailable()) return
  localStorage.removeItem(STORAGE_KEY)
}
