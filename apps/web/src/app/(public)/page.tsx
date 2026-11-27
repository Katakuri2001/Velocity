import { Hero } from '@/components/showroom/hero'
import { ShowroomSection } from '@/components/showroom/showroom-section'
import {
  DetailSection,
  FooterCloser,
  IvorySection,
  NumberedCards,
} from '@/components/showroom/cinematic-sections'
import { IntroOverlay } from '@/components/intro/intro-overlay'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'The art of arrival — Velocity Showroom',
  description:
    'Eleven exceptional cars. One showroom. A quiet, curated collection of luxury and performance vehicles.',
  openGraph: {
    title: 'The art of arrival — Velocity Showroom',
    description: 'Eleven exceptional cars. One showroom.',
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
    <>
      <IntroOverlay />
      <Hero />
      <ShowroomSection />
      <DetailSection />
      <IvorySection />
      <NumberedCards />
      <FooterCloser />
    </>
  )
}
