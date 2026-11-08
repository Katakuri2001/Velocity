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

    const category = await db.get(
      'SELECT * FROM vehicle_categories WHERE id = ?',
      [id],
    )

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json({ category })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 })
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

    const existing = await db.get('SELECT id FROM vehicle_categories WHERE id = ?', [id])
    if (!existing) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    await db.run(
      `UPDATE vehicle_categories SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        image_url = COALESCE(?, image_url),
        description = COALESCE(?, description),
        sort_order = COALESCE(?, sort_order),
        updated_at = datetime('now')
      WHERE id = ?`,
      [body.name, body.slug, body.image_url, body.description, body.sort_order !== undefined ? parseInt(body.sort_order, 10) : null, id],
    )

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        'admin',
        'Updated category',
        'category',
        id,
        `Updated category: ${id}`,
      ],
    )

    return NextResponse.json({ success: true, message: 'Category updated successfully' })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireRole('admin')

    const { id } = params

    const existing = await db.get<{ name: string }>('SELECT name FROM vehicle_categories WHERE id = ?', [id])
    if (!existing) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    await db.run('DELETE FROM vehicle_categories WHERE id = ?', [id])

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        'admin',
        'Deleted category',
        'category',
        id,
        `Deleted category: ${existing.name}`,
      ],
    )

    return NextResponse.json({ success: true, message: 'Category deleted successfully' })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
