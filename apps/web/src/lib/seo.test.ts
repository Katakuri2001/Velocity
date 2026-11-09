import { describe, it, expect } from 'vitest'

import { generateTitle, generateDescription, generateVehicleJsonLd, generateAutoDealerJsonLd } from './seo'

describe('SEO helpers', () => {
  describe('generateTitle', () => {
    it('appends site name by default', () => {
      expect(generateTitle('Home')).toBe('Home | Velocity — Premium Automotive Showroom')
    })

    it('omits suffix when requested', () => {
      expect(generateTitle('Home', false)).toBe('Home')
    })
  })

  describe('generateDescription', () => {
    it('returns provided description', () => {
      expect(generateDescription('Custom description')).toBe('Custom description')
    })

    it('returns default when no description provided', () => {
      expect(generateDescription()).toContain('Discover an exceptional collection')
    })
  })

  describe('generateVehicleJsonLd', () => {
    it('generates valid Vehicle structured data', () => {
      const vehicle = {
        model: '911 Carrera',
        variant: 'S',
        year: 2024,
        manufacturer_id: 'Porsche',
        price: 125000,
        currency: 'USD',
        availability: 'available',
        condition: 'new',
        exterior_color: 'Guards Red',
        transmission: 'Automatic',
        fuel_type: 'Petrol',
        engine_capacity: '3.0',
        horsepower: 473,
        torque: 570,
        acceleration: '3.7s',
        top_speed: '308 km/h',
        drivetrain: 'RWD',
        mileage: 15,
        description: 'A Porsche 911 Carrera S',
        image_url: '/images/vehicles/porsche/911-carrera.jpg',
      }

      const result = generateVehicleJsonLd(vehicle)

      expect(result['@context']).toBe('https://schema.org/')
      expect(result['@type']).toBe('Vehicle')
      expect(result.name).toBe('2024 Porsche 911 Carrera S')
      expect(result.brand.name).toBe('Porsche')
      expect(result.offers.price).toBe('125000')
      expect(result.offers.priceCurrency).toBe('USD')
      expect(result.fuelType).toBe('Petrol')
      expect(result.vehicleTransmission).toBe('Automatic')
      expect(result.accelerationTime).toBe('3.7s')
      expect(result.maxSpeed).toBe('308 km/h')
      expect(result.color).toBe('Guards Red')
      expect(result.driveWheelConfiguration).toBe('RWD')
      expect(result.modelDate).toBe(2024)
    })
  })

  describe('generateAutoDealerJsonLd', () => {
    it('generates valid AutoDealer structured data', () => {
      const result = generateAutoDealerJsonLd()

      expect(result['@context']).toBe('https://schema.org/')
      expect(result['@type']).toBe('AutoDealer')
      expect(result.name).toBe('Velocity — Premium Automotive Showroom')
      expect(result.telephone).toBe('+1 (555) 010-2020')
      expect(result.address.addressLocality).toBe('Luxury City')
      expect(result.aggregateRating?.ratingValue).toBe('4.9')
    })
  })
})
