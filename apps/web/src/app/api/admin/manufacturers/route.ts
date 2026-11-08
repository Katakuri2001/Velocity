import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireRole } from '@/lib/auth'

export async function GET() {
  try {
    await requireRole('admin')

    const manufacturers = await db.query(
      'SELECT * FROM manufacturers ORDER BY name ASC',
    )

    return NextResponse.json({ manufacturers: manufacturers.rows })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch manufacturers' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireRole('admin')

    const body = await request.json()
    const { name, slug, logo_url, description, is_active } = body

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 },
      )
    }

    const manufacturer = await db.run(
      'INSERT INTO manufacturers (id, name, slug, logo_url, description, is_active, vehicle_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 0, datetime(\'now\'), datetime(\'now\')) RETURNING id',
      [name.toLowerCase().replace(/\s+/g, '-'), name, slug, logo_url || null, description || null, is_active ? 1 : 0],
    )

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        'admin',
        'Created manufacturer',
        'manufacturer',
        String(manufacturer.lastInsertRowid || ''),
        `Created manufacturer: ${name}`,
      ],
    )

    return NextResponse.json({
      success: true,
      manufacturerId: manufacturer.lastInsertRowid,
      message: 'Manufacturer created successfully',
    })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to create manufacturer' }, { status: 500 })
  }
}
