'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSession } from '@/components/auth/session-provider'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/ui/glass-panel'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/compare', label: 'Compare' },
  { href: '/favorites', label: 'Favorites' },
]

export function Navbar() {
  const { session } = useSession()

  return (
    <GlassPanel className="sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-xl font-display font-bold text-primaryText tracking-tight">
          VELOCITY
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-secondaryText hover:text-primaryText transition-colors text-sm font-manrope"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="text-xs text-secondaryText font-manrope">{session.user.email}</span>
              <Button variant="ghost" size="sm" className="text-secondaryText hover:text-primaryText" onClick={() => {}}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm">
                <Link href="/login" className="flex items-center justify-center w-full h-full">
                  Sign in
                </Link>
              </Button>
              <Button size="sm">
                <Link href="/signup" className="flex items-center justify-center w-full h-full">
                  Create account
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </GlassPanel>
  )
}
