import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireRole } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    await requireRole('admin')

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = (page - 1) * limit

    const vehicles = await db.query(
      `SELECT * FROM vehicles ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset],
    )

    const countResult = await db.query<{ count: number }>(
      'SELECT COUNT(*) as count FROM vehicles',
    )
    const total = countResult.rows[0]?.count || 0

    return NextResponse.json({
      vehicles: vehicles.rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireRole('admin')

    const body = await request.json()
    const {
      manufacturer_id, category_id, model, variant, slug, year, condition,
      price, currency, mileage, transmission, fuel_type, engine_capacity,
      horsepower, torque, acceleration, top_speed, drivetrain,
      exterior_color, interior_color, description, availability,
      featured, new_arrival, stock_number, is_demo,
    } = body

    if (!manufacturer_id || !model || !slug || !year || !price) {
      return NextResponse.json(
        { error: 'Manufacturer, model, slug, year, and price are required' },
        { status: 400 },
      )
    }

    const vehicle = await db.run(
      `INSERT INTO vehicles (
        id, manufacturer_id, category_id, model, variant, slug, year, condition,
        price, currency, mileage, transmission, fuel_type, engine_capacity,
        horsepower, torque, acceleration, top_speed, drivetrain,
        exterior_color, interior_color, description, availability,
        featured, new_arrival, stock_number, is_demo, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')) RETURNING id`,
      [
        `veh-${Date.now()}`,
        manufacturer_id,
        category_id || null,
        model,
        variant || null,
        slug,
        parseInt(year, 10),
        condition || 'used',
        parseFloat(price),
        currency || 'USD',
        mileage ? parseInt(mileage, 10) : null,
        transmission || null,
        fuel_type || null,
        engine_capacity || null,
        horsepower ? parseInt(horsepower, 10) : null,
        torque ? parseInt(torque, 10) : null,
        acceleration || null,
        top_speed || null,
        drivetrain || null,
        exterior_color || null,
        interior_color || null,
        description || null,
        availability || 'available',
        featured ? 1 : 0,
        new_arrival ? 1 : 0,
        stock_number || null,
        is_demo ? 1 : 0,
      ],
    )

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        'admin',
        'Created vehicle',
        'vehicle',
        String(vehicle.lastInsertRowid || ''),
        `Created vehicle: ${model} ${variant || ''} (${year})`,
      ],
    )

    return NextResponse.json({
      success: true,
      vehicleId: vehicle.lastInsertRowid,
      message: 'Vehicle created successfully',
    })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 })
  }
}
