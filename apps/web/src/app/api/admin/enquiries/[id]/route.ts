import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireRole } from '@/lib/auth'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireRole('admin')

    const { id } = params
    const body = await request.json()
    const { status, internal_notes } = body

    const existing = await db.get('SELECT id FROM enquiries WHERE id = ?', [id])
    if (!existing) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
    }

    await db.run(
      `UPDATE enquiries SET
        status = COALESCE(?, status),
        updated_at = datetime('now')
      WHERE id = ?`,
      [status || null, id],
    )

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        'admin',
        'Updated enquiry status',
        'enquiry',
        id,
        `Updated enquiry ${id} status to ${status || 'unchanged'}`,
      ],
    )

    return NextResponse.json({ success: true, message: 'Enquiry updated successfully' })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 })
  }
}
