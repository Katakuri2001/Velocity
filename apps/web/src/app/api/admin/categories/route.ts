import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireRole } from '@/lib/auth'

export async function GET() {
  try {
    await requireRole('admin')

    const categories = await db.query(
      'SELECT * FROM vehicle_categories ORDER BY sort_order ASC, name ASC',
    )

    return NextResponse.json({ categories: categories.rows })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireRole('admin')

    const body = await request.json()
    const { name, slug, image_url, description, sort_order } = body

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 },
      )
    }

    const category = await db.run(
      'INSERT INTO vehicle_categories (id, name, slug, image_url, description, sort_order, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\')) RETURNING id',
      [name.toLowerCase().replace(/\s+/g, '-'), name, slug, image_url || null, description || null, sort_order || 0],
    )

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        'admin',
        'Created category',
        'category',
        String(category.lastInsertRowid || ''),
        `Created category: ${name}`,
      ],
    )

    return NextResponse.json({
      success: true,
      categoryId: category.lastInsertRowid,
      message: 'Category created successfully',
    })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
