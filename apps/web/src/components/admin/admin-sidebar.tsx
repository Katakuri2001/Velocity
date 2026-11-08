'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/vehicles', label: 'Vehicles', icon: '🚗' },
  { href: '/admin/manufacturers', label: 'Manufacturers', icon: '🏭' },
  { href: '/admin/categories', label: 'Categories', icon: '📂' },
  { href: '/admin/enquiries', label: 'Enquiries', icon: '✉️' },
  { href: '/admin/test-drives', label: 'Test Drives', icon: '📅' },
  { href: '/admin/content', label: 'Content', icon: '📝' },
  { href: '/admin/audit-logs', label: 'Audit Log', icon: '📋' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 bg-secondaryBg border-r glass-border flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xl">🏎️</span>
          <span className="font-display font-bold text-primaryText text-lg">VELOCITY</span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-manrope transition-colors ${
                  isActive
                    ? 'bg-accent-electric-blue text-primaryBg'
                    : 'text-secondaryText hover:bg-white/5 hover:text-primaryText'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-6 border-t glass-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-xs">A</span>
          </div>
          <div>
            <p className="text-xs font-manrope font-medium text-primaryText">Admin User</p>
            <p className="text-xs text-secondaryText">administrator</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
