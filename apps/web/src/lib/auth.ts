/**
 * Session-based authentication skeleton.
 * Local implementation for development.
 * Production: swap to Cloudflare-compatible auth — same exported functions.
 */

import { cookies } from 'next/headers'
import { db } from './db'
import type { User, Role } from '@/types/database'

const SESSION_COOKIE = 'velocity_session'

export type Session = {
  user: User
  role: Role
} | null

/**
 * Parse a simple session cookie: "userId:signature"
 * In production this would be a signed JWT.
 */
function parseSessionCookie(cookie: string | undefined): { userId: string } | null {
  if (!cookie) return null
  const parts = cookie.split(':')
  if (parts.length < 1) return null
  return { userId: parts[0] }
}

export async function getSession(): Promise<Session> {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value
  const parsed = parseSessionCookie(sessionCookie)
  if (!parsed) return null

  try {
    const user = await db.get<User>(
      'SELECT * FROM users WHERE id = ? AND is_active = 1',
      [parsed.userId],
    )
    if (!user) return null

    const role = await db.get<Role>('SELECT * FROM roles WHERE id = ?', [user.role_id])
    if (!role) return null

    return { user, role }
  } catch {
    return null
  }
}

export async function signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await db.get<User>('SELECT * FROM users WHERE email = ? AND is_active = 1', [email])
    if (!user) {
      return { success: false, error: 'Invalid credentials' }
    }

    // In production, verify password hash with bcrypt/argon2
    const passwordMatches = password === user.password_hash
    if (!passwordMatches) {
      return { success: false, error: 'Invalid credentials' }
    }

    const role = await db.get<Role>('SELECT * FROM roles WHERE id = ?', [user.role_id])
    if (!role) {
      return { success: false, error: 'Account error' }
    }

    // Set session cookie
    const cookieStore = cookies()
    cookieStore.set(SESSION_COOKIE, `${user.id}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: false, error: 'Session cookie set in middleware context only' }
  } catch {
    return { success: false, error: 'Authentication error' }
  }
}

export async function signOut(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function requireAuth(): Promise<Session> {
  const session = await getSession()
  if (!session) {
    throw new Error('Authentication required')
  }
  return session
}

export async function requireRole(allowedRole: string): Promise<Session> {
  const session = await requireAuth()
  if (!session || session.role.name !== allowedRole) {
    throw new Error('Insufficient permissions')
  }
  return session
}
