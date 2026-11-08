import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Velocity Showroom',
    default: 'Velocity Showroom',
  },
  description:
    'Discover an exceptional collection of automobiles where engineering, performance, and design meet.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Velocity Showroom',
  },
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
