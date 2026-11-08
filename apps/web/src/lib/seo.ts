/**
 * SEO helper functions for the Velocity showroom.
 * Generates page titles, descriptions, Open Graph tags, canonical URLs,
 * and JSON-LD structured data (Vehicle, AutoDealer).
 */

const SITE_NAME = 'Velocity — Premium Automotive Showroom'
const SITE_URL = 'https://velocity.showroom'
const SITE_DESCRIPTION =
  'Discover an exceptional collection of automobiles where engineering, performance, and design meet.'

export type JsonLdVehicle = {
  '@context': string
  '@type': string
  name: string
  image: string | string[]
  description: string
  brand: {
    '@type': string
    name: string
  }
  offers: {
    '@type': string
    price: string
    priceCurrency: string
    availability: string
  }
  vehicleIdentificationNumber?: string
  color?: string
  vehicleTransmission?: string
  fuelType?: string
  engineDisplacement?: string
  vehicleEngine?: string
  accelerationTime?: string
  maxSpeed?: string
  driveWheelConfiguration?: string
  numberOfDoors?: number
  numberOfSeats?: number
  modelDate?: number
  productionDate?: number
  mileageFromOdometer?: {
    '@type': string
    value: number
    unitCode: string
  }
}

export type JsonLdAutoDealer = {
  '@context': string
  '@type': string
  name: string
  image: string
  description: string
  telephone: string
  address: {
    '@type': string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  aggregateRating?: {
    '@type': string
    ratingValue: string
    reviewCount: string
  }
}

/**
 * Generate page title with site name suffix.
 */
export function generateTitle(title: string, suffix = true): string {
  return suffix ? `${title} | ${SITE_NAME}` : title
}

/**
 * Generate page description with fallback.
 */
export function generateDescription(desc?: string): string {
  return desc || SITE_DESCRIPTION
}

/**
 * Generate Open Graph image URL.
 */
export function generateOgImage(image?: string): string {
  return image || `${SITE_URL}/images/hero/hero-candidate-1.jpg`
}

/**
 * Generate canonical URL.
 */
export function generateCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`
}

/**
 * Generate JSON-LD structured data for a Vehicle.
 */
export function generateVehicleJsonLd(vehicle: {
  model: string
  variant?: string
  year: number
  manufacturer_id: string
  price: number
  currency: string
  availability: string
  condition: string
  exterior_color?: string
  transmission?: string
  fuel_type?: string
  engine_capacity?: string
  horsepower?: number
  torque?: number
  acceleration?: string
  top_speed?: string
  drivetrain?: string
  mileage?: number
  description?: string
  image_url?: string
}): JsonLdVehicle {
  const name = `${vehicle.year} ${vehicle.manufacturer_id} ${vehicle.model}${
    vehicle.variant ? ` ${vehicle.variant}` : ''
  }`

  return {
    '@context': 'https://schema.org/',
    '@type': 'Vehicle',
    name,
    image: vehicle.image_url
      ? [generateCanonicalUrl(vehicle.image_url)]
      : [`${SITE_URL}/images/hero/hero-candidate-1.jpg`],
    description: vehicle.description || `A ${vehicle.year} ${vehicle.model} by ${vehicle.manufacturer_id}.`,
    brand: {
      '@type': 'Brand',
      name: vehicle.manufacturer_id,
    },
    offers: {
      '@type': 'Offer',
      price: String(vehicle.price),
      priceCurrency: vehicle.currency,
      availability: vehicle.availability === 'available'
        ? 'https://schema.org/InStock'
        : vehicle.availability === 'sold'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/PreOrder',
    },
    vehicleIdentificationNumber: undefined,
    color: vehicle.exterior_color,
    vehicleTransmission: vehicle.transmission,
    fuelType: vehicle.fuel_type,
    engineDisplacement: vehicle.engine_capacity
      ? `${vehicle.engine_capacity}L`
      : undefined,
    vehicleEngine: undefined,
    accelerationTime: vehicle.acceleration,
    maxSpeed: vehicle.top_speed,
    driveWheelConfiguration: vehicle.drivetrain,
    numberOfDoors: undefined,
    numberOfSeats: undefined,
    modelDate: vehicle.year,
    productionDate: vehicle.year,
    mileageFromOdometer: vehicle.mileage
      ? {
          '@type': 'QuantitativeValue',
          value: vehicle.mileage,
          unitCode: 'KMT',
        }
      : undefined,
  }
}

/**
 * Generate JSON-LD structured data for an AutoDealer.
 */
export function generateAutoDealerJsonLd(): JsonLdAutoDealer {
  return {
    '@context': 'https://schema.org/',
    '@type': 'AutoDealer',
    name: SITE_NAME,
    image: `${SITE_URL}/images/backgrounds/showroom.jpg`,
    description: SITE_DESCRIPTION,
    telephone: '+1 (555) 010-2020',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Automotive Boulevard',
      addressLocality: 'Luxury City',
      addressRegion: 'LC',
      postalCode: '10001',
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
    },
  }
}
