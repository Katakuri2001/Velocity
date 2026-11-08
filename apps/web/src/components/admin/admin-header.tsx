'use client'

import * as React from 'react'
import Link from 'next/link'

interface AdminHeaderProps {
  user: { email?: string } | null | undefined
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="glass-panel border-b glass-border px-6 py-4 flex items-center justify-between z-30 sticky top-0">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard" className="font-display font-bold text-primaryText text-lg">
          VELOCITY Admin
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xs font-manrope text-secondaryText hover:text-primaryText transition-colors">
          View showroom
        </Link>
        <button className="px-3 py-2 rounded-md text-xs font-manrope text-secondaryText bg-white/5 border glass-border hover:text-primaryText hover:bg-white/10 transition-colors">
          Sign out
        </button>
      </div>
    </header>
  )
}
