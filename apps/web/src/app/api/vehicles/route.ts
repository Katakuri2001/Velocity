import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const manufacturer = searchParams.get('manufacturer') || undefined
  const category = searchParams.get('category') || undefined
  const availability = searchParams.get('availability') || undefined
  const minPrice = searchParams.get('minPrice') || undefined
  const maxPrice = searchParams.get('maxPrice') || undefined
  const sort = searchParams.get('sort') || 'latest'
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '12', 10)

  // Build WHERE clause
  const conditions: string[] = []
  const params: unknown[] = []

  // Only non-demo vehicles by default
  conditions.push('is_demo = 0')

  if (manufacturer) {
    conditions.push(`manufacturer_id = ?`)
    params.push(manufacturer)
  }
  if (category) {
    conditions.push(`category_id = ?`)
    params.push(category)
  }
  if (availability) {
    conditions.push(`availability = ?`)
    params.push(availability)
  }
  if (minPrice) {
    conditions.push(`price >= ?`)
    params.push(parseFloat(minPrice))
  }
  if (maxPrice) {
    conditions.push(`price <= ?`)
    params.push(parseFloat(maxPrice))
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  // Count total
  const countResult = await db.query<{ count: number }>(
    `SELECT COUNT(*) as count FROM vehicles ${whereClause}`,
    params,
  )
  const total = countResult.rows[0]?.count || 0

  // Sort
  let orderBy = 'ORDER BY created_at DESC'
  if (sort === 'price_asc') orderBy = 'ORDER BY price ASC'
  if (sort === 'price_desc') orderBy = 'ORDER BY price DESC'
  if (sort === 'year_desc') orderBy = 'ORDER BY year DESC'
  if (sort === 'mileage_asc') orderBy = 'ORDER BY mileage ASC NULLS FIRST'
  if (sort === 'horsepower_desc') orderBy = 'ORDER BY horsepower DESC NULLS LAST'

  const offset = (page - 1) * limit

  const vehicles = await db.query(
    `SELECT * FROM vehicles ${whereClause} ${orderBy} LIMIT ? OFFSET ?`,
    [...params, limit, offset],
  )

  return NextResponse.json({
    vehicles: vehicles.rows,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  })
}
