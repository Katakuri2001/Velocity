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

    const manufacturer = await db.get(
      'SELECT * FROM manufacturers WHERE id = ?',
      [id],
    )

    if (!manufacturer) {
      return NextResponse.json({ error: 'Manufacturer not found' }, { status: 404 })
    }

    return NextResponse.json({ manufacturer })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch manufacturer' }, { status: 500 })
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

    const existing = await db.get('SELECT id FROM manufacturers WHERE id = ?', [id])
    if (!existing) {
      return NextResponse.json({ error: 'Manufacturer not found' }, { status: 404 })
    }

    await db.run(
      `UPDATE manufacturers SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        logo_url = COALESCE(?, logo_url),
        description = COALESCE(?, description),
        is_active = COALESCE(?, is_active),
        updated_at = datetime('now')
      WHERE id = ?`,
      [body.name, body.slug, body.logo_url, body.description, body.is_active !== undefined ? (body.is_active ? 1 : 0) : null, id],
    )

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        'admin',
        'Updated manufacturer',
        'manufacturer',
        id,
        `Updated manufacturer: ${id}`,
      ],
    )

    return NextResponse.json({ success: true, message: 'Manufacturer updated successfully' })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to update manufacturer' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireRole('admin')

    const { id } = params

    const existing = await db.get<{ name: string }>('SELECT name FROM manufacturers WHERE id = ?', [id])
    if (!existing) {
      return NextResponse.json({ error: 'Manufacturer not found' }, { status: 404 })
    }

    await db.run('DELETE FROM manufacturers WHERE id = ?', [id])

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        'admin',
        'Deleted manufacturer',
        'manufacturer',
        id,
        `Deleted manufacturer: ${existing.name}`,
      ],
    )

    return NextResponse.json({ success: true, message: 'Manufacturer deleted successfully' })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to delete manufacturer' }, { status: 500 })
  }
}
