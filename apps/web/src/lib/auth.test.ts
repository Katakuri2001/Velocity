import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock next/headers cookies() to avoid Next.js request scope errors
const mockCookieStore = {
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
}

vi.mock('next/headers', () => ({
  cookies: () => mockCookieStore,
}))

import { getSession } from './auth'
import { db } from './db'

describe('Auth', () => {
  beforeEach(() => {
    mockCookieStore.get.mockReturnValue(undefined)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('getSession returns null without a session cookie', async () => {
    mockCookieStore.get.mockReturnValue(undefined)
    const session = await getSession()
    expect(session).toBeNull()
  })

  it('getSession returns null when user not found', async () => {
    mockCookieStore.get.mockReturnValue({ value: 'nonexistent' })
    const session = await getSession()
    expect(session).toBeNull()
  })
})
