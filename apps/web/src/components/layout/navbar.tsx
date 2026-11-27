'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession } from '@/components/auth/session-provider'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Menu, X } from 'lucide-react'
import { VoiceToggle } from './voice-toggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/compare', label: 'Compare' },
  { href: '/favorites', label: 'Favorites' },
]

export function Navbar() {
  const { session } = useSession()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-50 pt-3">
      <div className="page-container">
        <GlassPanel className="rounded-2xl border-glassBorder bg-primaryBg/90 shadow-pavilion">
          <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-5">
            <Link href="/" className="focus-ring rounded text-base font-display text-lg font-bold tracking-[0.18em] text-primaryText sm:text-xl">
              VELOCITY
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`focus-ring relative rounded-lg px-4 py-2 text-sm font-manrope transition-colors ${
                    isActive(link.href) ? 'text-primaryText' : 'text-secondaryText hover:text-primaryText'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-accentChampagne"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <VoiceToggle />
              {session ? (
                <>
                  <span className="max-w-40 truncate text-xs text-secondaryText">{session.user.email}</span>
                  <button className="focus-ring rounded-lg border border-glassBorder px-3 py-2 text-xs text-secondaryText transition-colors hover:text-primaryText">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="focus-ring rounded-lg border border-glassBorder px-4 py-2 text-sm font-manrope text-primaryText transition-colors hover:bg-white/5"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="focus-ring rounded-lg bg-accentChampagne px-4 py-2 text-sm font-semibold text-[#241a0c] transition-colors hover:bg-[#e8cfa5]"
                  >
                    Create account
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="focus-ring rounded-lg p-2 text-secondaryText transition-colors hover:text-primaryText lg:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {mobileMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-glassBorder lg:hidden"
              >
                <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`focus-ring rounded-lg px-3 py-3 text-sm font-manrope transition-colors ${
                        isActive(link.href)
                          ? 'bg-white/5 text-primaryText'
                          : 'text-secondaryText hover:bg-white/5 hover:text-primaryText'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-3 flex items-center gap-2 border-t border-glassBorder pt-4">
                    <VoiceToggle />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {session ? (
                      <button className="focus-ring col-span-2 rounded-lg border border-glassBorder px-4 py-3 text-sm text-secondaryText">
                        Sign out
                      </button>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                          className="focus-ring rounded-lg border border-glassBorder px-4 py-3 text-center text-sm text-primaryText"
                        >
                          Sign in
                        </Link>
                        <Link
                          href="/signup"
                          onClick={() => setMobileMenuOpen(false)}
                          className="focus-ring rounded-lg bg-accentChampagne px-4 py-3 text-center text-sm font-semibold text-[#241a0c]"
                        >
                          Create account
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassPanel>
      </div>
    </header>
  )
}
