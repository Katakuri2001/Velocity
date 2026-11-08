import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from '@/components/auth/session-provider'
import { Shell } from '@/components/layout/shell'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Velocity — Premium Automotive Showroom',
  description: 'Discover an exceptional collection of automobiles where engineering, performance, and design meet.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.variable} h-full bg-primaryBg text-primaryText`}>
          <Shell>{children}</Shell>
        </body>
      </html>
    </SessionProvider>
  )
}
