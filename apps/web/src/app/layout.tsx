import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { SessionProvider } from '@/components/auth/session-provider'
import { Shell } from '@/components/layout/shell'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

/** Free Google Font (SIL Open Font License) — elegant serif for display type. */
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Velocity — Premium Automotive Showroom',
    default: 'Velocity — Premium Automotive Showroom',
  },
  description:
    'Discover an exceptional collection of automobiles where engineering, performance, and design meet.',
  keywords: [
    'luxury cars',
    'supercars',
    'sports cars',
    'automotive showroom',
    'Porsche',
    'Mercedes-Benz',
    'BMW',
    'Ferrari',
    'Lamborghini',
    'Audi',
    'Toyota',
    'Lexus',
    'McLaren',
  ],
  authors: [{ name: 'Velocity Showroom' }],
  creator: 'Velocity Showroom',
  publisher: 'Velocity Showroom',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://velocity.showroom',
    siteName: 'Velocity — Premium Automotive Showroom',
    title: 'Velocity — Premium Automotive Showroom',
    description:
      'Discover an exceptional collection of automobiles where engineering, performance, and design meet.',
    images: [
      {
        url: 'https://velocity.showroom/images/hero/hero-candidate-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'Cinematic sports car hero',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velocity — Premium Automotive Showroom',
    description:
      'Discover an exceptional collection of automobiles where engineering, performance, and design meet.',
    images: ['https://velocity.showroom/images/hero/hero-candidate-1.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.variable} ${playfair.variable} h-full bg-ink text-primary`}>
          <Shell>{children}</Shell>
        </body>
      </html>
    </SessionProvider>
  )
}
