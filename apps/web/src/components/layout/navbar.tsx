'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSession } from '@/components/auth/session-provider'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/compare', label: 'Compare' },
  { href: '/favorites', label: 'Favorites' },
]

export function Navbar() {
  const { session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

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
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-secondaryText hover:text-primaryText"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
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

      {mobileMenuOpen && (
        <div className="md:hidden bg-secondaryBg border-t glass-border p-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-manrope text-secondaryText hover:text-primaryText hover:bg-white/5 rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10">
              {session ? (
                <Button variant="ghost" size="sm" className="w-full" onClick={() => {}}>
                  Sign out
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="w-full mb-2">
                    <Link href="/login" className="flex items-center justify-center w-full h-full">
                      Sign in
                    </Link>
                  </Button>
                  <Button size="sm" className="w-full">
                    <Link href="/signup" className="flex items-center justify-center w-full h-full">
                      Create account
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </GlassPanel>
  )
}
