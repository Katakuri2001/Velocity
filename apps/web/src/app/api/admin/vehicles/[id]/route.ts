import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireRole } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireRole('admin')

    const { id } = params

    const vehicle = await db.get(
      'SELECT * FROM vehicles WHERE id = ?',
      [id],
    )

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    }

    const images = await db.query(
      'SELECT * FROM vehicle_images WHERE vehicle_id = ? ORDER BY sort_order ASC, is_primary DESC',
      [id],
    )

    const specifications = await db.query(
      'SELECT * FROM vehicle_specifications WHERE vehicle_id = ? ORDER BY spec_group ASC, spec_key ASC',
      [id],
    )

    return NextResponse.json({
      vehicle,
      images: images.rows,
      specifications: specifications.rows,
    })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch vehicle' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireRole('admin')

    const { id } = params
    const body = await request.json()

    const existing = await db.get<{ id: string; model: string; year: number }>('SELECT id, model, year FROM vehicles WHERE id = ?', [id])
    if (!existing) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    }

    await db.run(
      `UPDATE vehicles SET
        manufacturer_id = COALESCE(?, manufacturer_id),
        category_id = COALESCE(?, category_id),
        model = COALESCE(?, model),
        variant = COALESCE(?, variant),
        year = COALESCE(?, year),
        condition = COALESCE(?, condition),
        price = COALESCE(?, price),
        currency = COALESCE(?, currency),
        mileage = COALESCE(?, mileage),
        transmission = COALESCE(?, transmission),
        fuel_type = COALESCE(?, fuel_type),
        engine_capacity = COALESCE(?, engine_capacity),
        horsepower = COALESCE(?, horsepower),
        torque = COALESCE(?, torque),
        acceleration = COALESCE(?, acceleration),
        top_speed = COALESCE(?, top_speed),
        drivetrain = COALESCE(?, drivetrain),
        exterior_color = COALESCE(?, exterior_color),
        interior_color = COALESCE(?, interior_color),
        description = COALESCE(?, description),
        availability = COALESCE(?, availability),
        featured = COALESCE(?, featured),
        new_arrival = COALESCE(?, new_arrival),
        stock_number = COALESCE(?, stock_number),
        is_demo = COALESCE(?, is_demo),
        updated_at = datetime('now')
      WHERE id = ?`,
      [
        body.manufacturer_id,
        body.category_id,
        body.model,
        body.variant,
        body.year !== undefined ? parseInt(body.year, 10) : null,
        body.condition,
        body.price !== undefined ? parseFloat(body.price) : null,
        body.currency,
        body.mileage !== undefined ? parseInt(body.mileage, 10) : null,
        body.transmission,
        body.fuel_type,
        body.engine_capacity,
        body.horsepower !== undefined ? parseInt(body.horsepower, 10) : null,
        body.torque !== undefined ? parseInt(body.torque, 10) : null,
        body.acceleration,
        body.top_speed,
        body.drivetrain,
        body.exterior_color,
        body.interior_color,
        body.description,
        body.availability,
        body.featured !== undefined ? (body.featured ? 1 : 0) : null,
        body.new_arrival !== undefined ? (body.new_arrival ? 1 : 0) : null,
        body.stock_number,
        body.is_demo !== undefined ? (body.is_demo ? 1 : 0) : null,
        id,
      ],
    )

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        'admin',
        'Updated vehicle',
        'vehicle',
        id,
        `Updated vehicle: ${id}`,
      ],
    )

    return NextResponse.json({ success: true, message: 'Vehicle updated successfully' })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireRole('admin')

    const { id } = params

    const existing = await db.get<{ model: string; year: number }>('SELECT model, year FROM vehicles WHERE id = ?', [id])
    if (!existing) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    }

    await db.run('DELETE FROM vehicles WHERE id = ?', [id])

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        'admin',
        'Deleted vehicle',
        'vehicle',
        id,
        `Deleted vehicle: ${existing.model} (${existing.year})`,
      ],
    )

    return NextResponse.json({ success: true, message: 'Vehicle deleted successfully' })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 })
  }
}
