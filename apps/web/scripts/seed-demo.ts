/**
 * Demo data seed script.
 * Inserts demo manufacturers, categories, vehicles, images, and specifications
 * into the local database. All vehicles are flagged with is_demo = 1.
 *
 * Usage: npx tsx scripts/seed-demo.ts
 */

import { db } from '../src/lib/db'

const DEMO_MANUFACTURERS = [
  { name: 'Porsche', slug: 'porsche', logo_url: '/images/manufacturers/porsche.svg', description: 'German sports car manufacturer' },
  { name: 'Mercedes-Benz', slug: 'mercedes-benz', logo_url: '/images/manufacturers/mercedes.svg', description: 'German luxury automotive brand' },
  { name: 'BMW', slug: 'bmw', logo_url: '/images/manufacturers/bmw.svg', description: 'German luxury vehicles and motorcycles' },
  { name: 'Ferrari', slug: 'ferrari', logo_url: '/images/manufacturers/ferrari.svg', description: 'Italian luxury sports car manufacturer' },
  { name: 'Lamborghini', slug: 'lamborghini', logo_url: '/images/manufacturers/lamborghini.svg', description: 'Italian luxury sports cars and SUVs' },
  { name: 'Audi', slug: 'audi', logo_url: '/images/manufacturers/audi.svg', description: 'German luxury vehicles' },
  { name: 'Toyota', slug: 'toyota', logo_url: '/images/manufacturers/toyota.svg', description: 'Japanese automotive manufacturer' },
  { name: 'Lexus', slug: 'lexus', logo_url: '/images/manufacturers/lexus.svg', description: 'Japanese luxury vehicle division' },
  { name: 'McLaren', slug: 'mclaren', logo_url: '/images/manufacturers/mclaren.svg', description: 'British luxury sports car manufacturer' },
  { name: 'Land Rover', slug: 'land-rover', logo_url: '/images/manufacturers/land-rover.svg', description: 'British luxury SUV manufacturer' },
]

const DEMO_CATEGORIES = [
  { name: 'Supercars', slug: 'supercars', description: 'High-performance exotic vehicles', sort_order: 1 },
  { name: 'Sports Cars', slug: 'sports-cars', description: 'Driver-focused performance vehicles', sort_order: 2 },
  { name: 'Luxury Sedans', slug: 'luxury-sedans', description: 'Premium executive comfort', sort_order: 3 },
  { name: 'Luxury SUVs', slug: 'luxury-suvs', description: 'Premium sport utility vehicles', sort_order: 4 },
  { name: 'Electric Vehicles', slug: 'electric-vehicles', description: 'Zero-emission electric vehicles', sort_order: 5 },
  { name: 'Hybrid Vehicles', slug: 'hybrid-vehicles', description: 'Hybrid powertrain vehicles', sort_order: 6 },
  { name: 'Classic Cars', slug: 'classic-cars', description: 'Vintage and collector vehicles', sort_order: 7 },
]

const DEMO_VEHICLES = [
  {
    manufacturer: 'Porsche',
    category: 'Sports Cars',
    model: '911 Carrera',
    variant: 'S',
    year: 2024,
    condition: 'new',
    price: 125000,
    mileage: 15,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    engine_capacity: '3.0',
    horsepower: 473,
    torque: 570,
    acceleration: '3.7s',
    top_speed: '308 km/h',
    drivetrain: 'RWD',
    exterior_color: 'Guards Red',
    interior_color: 'Black',
    availability: 'available',
    stock_number: 'PC-2024-001',
  },
  {
    manufacturer: 'Mercedes-Benz',
    category: 'Luxury Sedans',
    model: 'S-Class',
    variant: 'S580',
    year: 2024,
    condition: 'new',
    price: 118000,
    mileage: 8,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    engine_capacity: '4.0',
    horsepower: 496,
    torque: 700,
    acceleration: '4.4s',
    top_speed: '250 km/h',
    drivetrain: 'AWD',
    exterior_color: 'Selenite Grey',
    interior_color: 'Black',
    availability: 'available',
    stock_number: 'MB-2024-002',
  },
  {
    manufacturer: 'BMW',
    category: 'Sports Cars',
    model: 'M4',
    variant: 'Competition',
    year: 2024,
    condition: 'new',
    price: 85000,
    mileage: 12,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    engine_capacity: '3.0',
    horsepower: 503,
    torque: 650,
    acceleration: '3.8s',
    top_speed: '290 km/h',
    drivetrain: 'AWD',
    exterior_color: 'Frozen Brilliant White',
    interior_color: 'Black',
    availability: 'available',
    stock_number: 'BMW-2024-003',
  },
  {
    manufacturer: 'Ferrari',
    category: 'Supercars',
    model: 'SF90',
    variant: 'Stradale',
    year: 2024,
    condition: 'new',
    price: 650000,
    mileage: 3,
    transmission: 'Automatic',
    fuel_type: 'Hybrid',
    engine_capacity: '4.0',
    horsepower: 986,
    torque: 800,
    acceleration: '2.5s',
    top_speed: '340 km/h',
    drivetrain: 'AWD',
    exterior_color: 'Rosso Corsa',
    interior_color: 'Black',
    availability: 'available',
    stock_number: 'FR-2024-004',
  },
  {
    manufacturer: 'Lamborghini',
    category: 'Supercars',
    model: 'Huracán',
    variant: 'EVO Spyder',
    year: 2023,
    condition: 'used',
    price: 285000,
    mileage: 8500,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    engine_capacity: '5.2',
    horsepower: 640,
    torque: 600,
    acceleration: '3.1s',
    top_speed: '324 km/h',
    drivetrain: 'AWD',
    exterior_color: 'Giallo Orion',
    interior_color: 'Black',
    availability: 'available',
    stock_number: 'LB-2023-005',
  },
  {
    manufacturer: 'Audi',
    category: 'Luxury Sedans',
    model: 'RS7',
    variant: 'Performance',
    year: 2024,
    condition: 'new',
    price: 142000,
    mileage: 5,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    engine_capacity: '4.0',
    horsepower: 621,
    torque: 850,
    acceleration: '3.5s',
    top_speed: '305 km/h',
    drivetrain: 'AWD',
    exterior_color: 'Nardo Grey',
    interior_color: 'Black',
    availability: 'available',
    stock_number: 'AU-2024-006',
  },
  {
    manufacturer: 'Toyota',
    category: 'Luxury SUVs',
    model: 'Land Cruiser',
    variant: 'First Edition',
    year: 2024,
    condition: 'new',
    price: 95000,
    mileage: 10,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    engine_capacity: '3.4',
    horsepower: 409,
    torque: 649,
    acceleration: '6.2s',
    top_speed: '180 km/h',
    drivetrain: '4WD',
    exterior_color: 'Ice Cap',
    interior_color: 'Black',
    availability: 'available',
    stock_number: 'TO-2024-007',
  },
  {
    manufacturer: 'Lexus',
    category: 'Luxury SUVs',
    model: 'LX',
    variant: '600',
    year: 2024,
    condition: 'new',
    price: 110000,
    mileage: 7,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    engine_capacity: '3.5',
    horsepower: 416,
    torque: 650,
    acceleration: '6.1s',
    top_speed: '210 km/h',
    drivetrain: '4WD',
    exterior_color: 'Sonic Copper',
    interior_color: 'Black',
    availability: 'available',
    stock_number: 'LX-2024-008',
  },
  {
    manufacturer: 'McLaren',
    category: 'Supercars',
    model: '750S',
    variant: 'Coupe',
    year: 2024,
    condition: 'new',
    price: 320000,
    mileage: 2,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    engine_capacity: '4.0',
    horsepower: 740,
    torque: 770,
    acceleration: '2.8s',
    top_speed: '332 km/h',
    drivetrain: 'RWD',
    exterior_color: 'Volcano Blue',
    interior_color: 'Black',
    availability: 'available',
    stock_number: 'MC-2024-009',
  },
  {
    manufacturer: 'Land Rover',
    category: 'Luxury SUVs',
    model: 'Range Rover',
    variant: 'Autobiography',
    year: 2024,
    condition: 'new',
    price: 175000,
    mileage: 4,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    engine_capacity: '4.4',
    horsepower: 523,
    torque: 750,
    acceleration: '5.4s',
    top_speed: '240 km/h',
    drivetrain: 'AWD',
    exterior_color: 'Santorini Black',
    interior_color: 'Ebony',
    availability: 'available',
    stock_number: 'LR-2024-010',
  },
]

async function seed() {
  console.log('Seeding demo data...')

  // Insert manufacturers
  const manufacturerIds: Record<string, string> = {}
  for (const m of DEMO_MANUFACTURERS) {
    const result = await db.run(
      'INSERT INTO manufacturers (id, name, slug, logo_url, description, is_active) VALUES (?, ?, ?, ?, ?, ?) RETURNING id',
      [m.name.toLowerCase().replace(/\s+/g, '-'), m.name, m.slug, m.logo_url, m.description, 1],
    )
    manufacturerIds[m.name] = String(result.lastInsertRowid || '')
    console.log(`  Manufacturer: ${m.name}`)
  }

  // Insert categories
  const categoryIds: Record<string, string> = {}
  for (const c of DEMO_CATEGORIES) {
    const result = await db.run(
      'INSERT INTO vehicle_categories (id, name, slug, description, sort_order) VALUES (?, ?, ?, ?, ?) RETURNING id',
      [c.name.toLowerCase().replace(/\s+/g, '-'), c.name, c.slug, c.description, c.sort_order],
    )
    categoryIds[c.name] = String(result.lastInsertRowid || '')
    console.log(`  Category: ${c.name}`)
  }

  // Insert vehicles
  for (const v of DEMO_VEHICLES) {
    const manuId = manufacturerIds[v.manufacturer]
    const catId = categoryIds[v.category]
    const slug = `${v.manufacturer.toLowerCase().replace(/\s+/g, '-')}-${v.model.toLowerCase().replace(/\s+/g, '-')}-${v.year}`

    const result = await db.run(
      `INSERT INTO vehicles (
        id, manufacturer_id, category_id, model, variant, slug, year, condition,
        price, currency, mileage, transmission, fuel_type, engine_capacity,
        horsepower, torque, acceleration, top_speed, drivetrain,
        exterior_color, interior_color, description, availability,
        featured, new_arrival, stock_number, is_demo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
      [
        `veh-${slug}`,
        manuId,
        catId,
        v.model,
        v.variant,
        slug,
        v.year,
        v.condition,
        v.price,
        'USD',
        v.mileage,
        v.transmission,
        v.fuel_type,
        v.engine_capacity,
        v.horsepower,
        v.torque,
        v.acceleration,
        v.top_speed,
        v.drivetrain,
        v.exterior_color,
        v.interior_color,
        `Demo vehicle: ${v.manufacturer} ${v.model} ${v.variant || ''}`.trim(),
        v.availability,
        0,
        1,
        v.stock_number,
        1,
      ],
    )
    const vehicleId = String(result.lastInsertRowid || '')
    console.log(`  Vehicle: ${v.manufacturer} ${v.model} (${v.year})`)

    // Insert vehicle images
    await db.run(
      'INSERT INTO vehicle_images (id, vehicle_id, url, alt, sort_order, is_primary) VALUES (?, ?, ?, ?, ?, ?)',
      [`img-${vehicleId}-1`, vehicleId, `/images/vehicles/${v.manufacturer.toLowerCase()}/${slug}-front.webp`, `${v.manufacturer} ${v.model} front view`, 1, 1],
    )
    await db.run(
      'INSERT INTO vehicle_images (id, vehicle_id, url, alt, sort_order, is_primary) VALUES (?, ?, ?, ?, ?, ?)',
      [`img-${vehicleId}-2`, vehicleId, `/images/vehicles/${v.manufacturer.toLowerCase()}/${slug}-side.webp`, `${v.manufacturer} ${v.model} side view`, 2, 0],
    )
    await db.run(
      'INSERT INTO vehicle_images (id, vehicle_id, url, alt, sort_order, is_primary) VALUES (?, ?, ?, ?, ?, ?)',
      [`img-${vehicleId}-3`, vehicleId, `/images/vehicles/${v.manufacturer.toLowerCase()}/${slug}-rear.webp`, `${v.manufacturer} ${v.model} rear view`, 3, 0],
    )
    await db.run(
      'INSERT INTO vehicle_images (id, vehicle_id, url, alt, sort_order, is_primary) VALUES (?, ?, ?, ?, ?, ?)',
      [`img-${vehicleId}-4`, vehicleId, `/images/vehicles/${v.manufacturer.toLowerCase()}/${slug}-interior.webp`, `${v.manufacturer} ${v.model} interior`, 4, 0],
    )

    // Insert specifications
    const specs = [
      { group: 'Engine', key: 'Configuration', value: 'V-configuration' },
      { group: 'Engine', key: 'Cylinders', value: '6' },
      { group: 'Performance', key: '0-100 km/h', value: v.acceleration },
      { group: 'Performance', key: 'Top speed', value: v.top_speed },
      { group: 'Transmission', key: 'Gears', value: '8' },
      { group: 'Vehicle', key: 'Seats', value: '4' },
      { group: 'Vehicle', key: 'Doors', value: '2' },
      { group: 'Dimensions', key: 'Length', value: '4500 mm' },
      { group: 'Dimensions', key: 'Width', value: '1900 mm' },
      { group: 'Dimensions', key: 'Height', value: '1300 mm' },
      { group: 'Other', key: 'Kerb weight', value: '1500 kg' },
    ]

    for (const spec of specs) {
      await db.run(
        'INSERT INTO vehicle_specifications (id, vehicle_id, spec_group, spec_key, spec_value) VALUES (?, ?, ?, ?, ?)',
        [`spec-${vehicleId}-${spec.group}-${spec.key}`, vehicleId, spec.group, spec.key, spec.value],
      )
    }
  }

  console.log('Demo data seeded successfully!')
  console.log(`Total vehicles: ${DEMO_VEHICLES.length} (all flagged as demo)`)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
