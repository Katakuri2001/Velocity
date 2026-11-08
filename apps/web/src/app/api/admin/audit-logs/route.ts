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

    const logs = await db.query(
      `SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset],
    )

    const countResult = await db.query<{ count: number }>('SELECT COUNT(*) as count FROM audit_logs')
    const total = countResult.rows[0]?.count || 0

    return NextResponse.json({
      audit_logs: logs.rows,
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
    return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 })
  }
}
