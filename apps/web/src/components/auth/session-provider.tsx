'use client'

import * as React from 'react'

export type SessionContextType = {
  session: { user: { id: string; email: string; role?: { name: string } }; role: { name: string } } | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const SessionContext = React.createContext<SessionContextType | null>(null)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<SessionContextType['session']>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    const loadSession = async () => {
      try {
        const res = await fetch('/api/auth/session')
        if (res.ok) {
          const data = await res.json()
          if (mounted) setSession(data.session || null)
        }
      } catch {
        // ignore
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    loadSession()
    return () => { mounted = false }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) throw new Error('Login failed')
    const data = await res.json()
    setSession(data.session || null)
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setSession(null)
  }

  return (
    <SessionContext.Provider value={{ session, login, logout, isLoading }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = React.useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}
