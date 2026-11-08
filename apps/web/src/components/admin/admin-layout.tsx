'use client'

import * as React from 'react'
import { useSession } from '@/components/auth/session-provider'
import { AdminSidebar } from './admin-sidebar'
import { AdminHeader } from './admin-header'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { session } = useSession()

  return (
    <div className="flex flex-col h-screen bg-primaryBg">
      <AdminHeader user={session?.user} />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-secondaryBg p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
