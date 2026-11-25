import { Hero } from '@/components/showroom/hero'
import { FeaturedCollection } from '@/components/showroom/featured-collection'
import { CategoriesSection } from '@/components/showroom/categories-section'
import type { Vehicle } from '@/types/database'
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

type DisplayVehicle = Vehicle & { image_url?: string }

async function getHomeData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  try {
    const [vehiclesRes, manuRes, catRes] = await Promise.all([
      fetch(`${baseUrl}/api/vehicles?limit=12`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/manufacturers`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/categories`, { cache: 'no-store' }),
    ])
    const [vehData, manuData, catData] = await Promise.all([
      vehiclesRes.json(),
      manuRes.json(),
      catRes.json(),
    ])

    const vehicles: DisplayVehicle[] = vehData.vehicles || []
    const featured = vehicles.filter((v: any) => v.featured === 1)
    const sf90 = vehicles.find((v: any) => v.slug === 'ferrari-sf90')
    const heroVehicle = sf90 || featured[0] || vehicles[0]

    const manufacturerNames: Record<string, string> = (manuData.manufacturers || []).reduce(
      (acc: Record<string, string>, m: { id: string; name: string }) => {
        acc[m.id] = m.name
        return acc
      },
      {},
    )

    return {
      heroVehicle,
      featuredVehicles: (featured.length > 0 ? featured : vehicles).slice(0, 3),
      categories: catData.categories || [],
      manufacturerNames,
    }
  } catch {
    return { heroVehicle: undefined, featuredVehicles: [], categories: [], manufacturerNames: {} }
  }
}

export default async function HomePage() {
  const { heroVehicle, featuredVehicles, categories, manufacturerNames } = await getHomeData()
  const heroName = heroVehicle
    ? `${heroVehicle.year} ${manufacturerNames[heroVehicle.manufacturer_id] || ''} ${heroVehicle.model}`.replace(/\s+/g, ' ').trim()
    : undefined

  return (
    <>
      <Hero
        eyebrow="The art of automotive excellence"
        headline="Beyond the ordinary."
        supportText="A considered collection of exceptional machines. Engineering, performance and design — quietly presented."
        primaryCta="View the collection"
        secondaryCta="Enquire"
        featuredImage={heroVehicle?.image_url}
        featuredName={heroName}
      />
      <FeaturedCollection vehicles={featuredVehicles} manufacturerNames={manufacturerNames} />
      <CategoriesSection categories={categories} />
    </>
  )
}
