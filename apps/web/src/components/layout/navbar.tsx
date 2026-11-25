'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/compare', label: 'Compare' },
  { href: '/favorites', label: 'Favorites' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-ink/95 backdrop-blur-none">
      <div className="page-container">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="focus-ring font-display text-xl font-medium tracking-[0.22em] text-primary transition-colors duration-300 hover:text-gold sm:text-2xl"
          >
            VELOCITY
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`focus-ring relative py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive(link.href) ? 'text-primary' : 'text-muted hover:text-primary'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-gold" aria-hidden="true" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <Link
              href="/inventory/ferrari-sf90#enquiry"
              className="focus-ring border border-hairline px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:border-gold/60 hover:text-gold"
            >
              Enquire
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="focus-ring p-2 text-muted transition-colors hover:text-primary lg:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.25} /> : <Menu size={20} strokeWidth={1.25} />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="overflow-hidden border-t border-hairline lg:hidden"
            >
              <nav className="flex flex-col py-4" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`focus-ring py-3 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                      isActive(link.href) ? 'text-primary' : 'text-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 border-t border-hairline pt-5">
                  <Link
                    href="/inventory/ferrari-sf90#enquiry"
                    onClick={() => setMobileMenuOpen(false)}
                    className="focus-ring inline-block border border-hairline px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-primary"
                  >
                    Enquire
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
