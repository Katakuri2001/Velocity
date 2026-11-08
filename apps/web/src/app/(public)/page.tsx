import { Hero } from '@/components/showroom/hero'

export const dynamic = 'force-dynamic'

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
