/**
 * Vehicle helper functions.
 * Wraps the DB adapter with typed queries for vehicles.
 */

import { db } from './db'
import type { Vehicle, VehicleImage, VehicleSpecification } from '@/types/database'

export async function getVehicleBySlug(slug: string): Promise<{
  vehicle: Vehicle | null
  images: VehicleImage[]
  specifications: VehicleSpecification[]
}> {
  const vehicle = await db.get<Vehicle>(
    'SELECT * FROM vehicles WHERE slug = ? AND is_demo = 0',
    [slug],
  )
  if (!vehicle) {
    return { vehicle: null, images: [], specifications: [] }
  }

  const images = await db.query<VehicleImage>(
    'SELECT * FROM vehicle_images WHERE vehicle_id = ? ORDER BY sort_order ASC, is_primary DESC',
    [vehicle.id],
  )

  const specifications = await db.query<VehicleSpecification>(
    'SELECT * FROM vehicle_specifications WHERE vehicle_id = ? ORDER BY spec_group ASC, spec_key ASC',
    [vehicle.id],
  )

  return {
    vehicle,
    images: images.rows,
    specifications: specifications.rows,
  }
}

export async function getFilteredVehicles(filters: {
  manufacturer?: string
  category?: string
  availability?: string
  minPrice?: string
  maxPrice?: string
  sort?: string
  page?: number
  limit?: number
}) {
  const conditions: string[] = []
  const params: unknown[] = []

  conditions.push('is_demo = 0')

  if (filters.manufacturer) {
    conditions.push('manufacturer_id = ?')
    params.push(filters.manufacturer)
  }
  if (filters.category) {
    conditions.push('category_id = ?')
    params.push(filters.category)
  }
  if (filters.availability) {
    conditions.push('availability = ?')
    params.push(filters.availability)
  }
  if (filters.minPrice) {
    conditions.push('price >= ?')
    params.push(parseFloat(filters.minPrice))
  }
  if (filters.maxPrice) {
    conditions.push('price <= ?')
    params.push(parseFloat(filters.maxPrice))
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  const countResult = await db.query<{ count: number }>(
    `SELECT COUNT(*) as count FROM vehicles ${whereClause}`,
    params,
  )
  const total = countResult.rows[0]?.count || 0

  let orderBy = 'ORDER BY created_at DESC'
  if (filters.sort === 'price_asc') orderBy = 'ORDER BY price ASC'
  if (filters.sort === 'price_desc') orderBy = 'ORDER BY price DESC'
  if (filters.sort === 'year_desc') orderBy = 'ORDER BY year DESC'
  if (filters.sort === 'mileage_asc') orderBy = 'ORDER BY mileage ASC NULLS FIRST'
  if (filters.sort === 'horsepower_desc') orderBy = 'ORDER BY horsepower DESC NULLS LAST'

  const page = filters.page || 1
  const limit = filters.limit || 12
  const offset = (page - 1) * limit

  const vehicles = await db.query<Vehicle>(
    `SELECT * FROM vehicles ${whereClause} ${orderBy} LIMIT ? OFFSET ?`,
    [...params, limit, offset],
  )

  return {
    vehicles: vehicles.rows,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

export async function getRelatedVehicles(
  vehicleId: string,
  manufacturerId: string,
  categoryId?: string,
  limit = 4,
) {
  const conditions: string[] = ['id != ?', 'is_demo = 0', 'availability = ?']
  const params: unknown[] = [vehicleId, 'available']

  if (manufacturerId) {
    conditions.push('manufacturer_id = ?')
    params.push(manufacturerId)
  }
  if (categoryId) {
    conditions.push('category_id = ?')
    params.push(categoryId)
  }

  const whereClause = `WHERE ${conditions.join(' AND ')}`

  const result = await db.query(
    `SELECT * FROM vehicles ${whereClause} ORDER BY created_at DESC LIMIT ?`,
    [...params, limit],
  )

  return result.rows
}

export async function getAllManufacturers() {
  const result = await db.query(
    'SELECT * FROM manufacturers WHERE is_active = 1 ORDER BY name ASC',
  )
  return result.rows
}

export async function getAllCategories() {
  const result = await db.query(
    'SELECT * FROM vehicle_categories ORDER BY sort_order ASC, name ASC',
  )
  return result.rows
}
