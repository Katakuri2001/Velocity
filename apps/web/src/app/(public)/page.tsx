import { Hero } from '@/components/showroom/hero'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Beyond the Ordinary — Premium Automotive Showroom',
  description:
    'Discover an exceptional collection of automobiles where engineering, performance, and design meet. Explore our curated collection of luxury vehicles from Porsche, Mercedes-Benz, BMW, Ferrari, Lamborghini, and more.',
  openGraph: {
    title: 'Beyond the Ordinary — Premium Automotive Showroom',
    description:
      'Discover an exceptional collection of automobiles where engineering, performance, and design meet.',
    type: 'website',
    images: [
      {
        url: 'https://velocity.showroom/images/hero/hero-candidate-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'Cinematic sports car hero',
      },
    ],
  },
}

export default function HomePage() {
  return (
    <Hero
      eyebrow="THE ART OF AUTOMOTIVE EXCELLENCE"
      headline="BEYOND THE ORDINARY."
      supportText="Discover an exceptional collection of automobiles, where engineering, performance, and design meet."
      primaryCta="EXPLORE COLLECTION"
      secondaryCta="DISCOVER OUR SHOWROOM"
    />
  )
}
