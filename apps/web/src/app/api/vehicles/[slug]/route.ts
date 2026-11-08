import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params

  const vehicle = await db.get<{ id: string; slug: string }>(
    'SELECT * FROM vehicles WHERE slug = ? AND is_demo = 0',
    [slug],
  )

  if (!vehicle) {
    return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
  }

  const images = await db.query(
    'SELECT * FROM vehicle_images WHERE vehicle_id = ? ORDER BY sort_order ASC, is_primary DESC',
    [vehicle.id],
  )

  const specifications = await db.query(
    'SELECT * FROM vehicle_specifications WHERE vehicle_id = ? ORDER BY spec_group ASC, spec_key ASC',
    [vehicle.id],
  )

  return NextResponse.json({
    vehicle,
    images: images.rows,
    specifications: specifications.rows,
  })
}
