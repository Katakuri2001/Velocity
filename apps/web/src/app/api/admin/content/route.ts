import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireRole } from '@/lib/auth'

export async function GET() {
  try {
    await requireRole('admin')

    const [content, settings] = await Promise.all([
      db.query('SELECT * FROM homepage_content ORDER BY section_key ASC'),
      db.query('SELECT * FROM showroom_settings ORDER BY key ASC'),
    ])

    return NextResponse.json({
      homepage_content: content.rows,
      showroom_settings: settings.rows,
    })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await requireRole('admin')

    const body = await request.json()
    const { section_key, title, subtitle, content: contentValue, is_active, key, value } = body

    if (section_key) {
      // Update homepage content
      const existing = await db.get('SELECT id FROM homepage_content WHERE section_key = ?', [section_key])
      if (!existing) {
        return NextResponse.json({ error: 'Content section not found' }, { status: 404 })
      }

      await db.run(
        `UPDATE homepage_content SET
          title = COALESCE(?, title),
          subtitle = COALESCE(?, subtitle),
          content = COALESCE(?, content),
          is_active = COALESCE(?, is_active),
          updated_at = datetime('now')
        WHERE section_key = ?`,
        [title, subtitle, contentValue, is_active !== undefined ? (is_active ? 1 : 0) : null, section_key],
      )

      // Audit log
      await db.run(
        'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
        [
          `audit-${Date.now()}`,
          'admin',
          'Updated homepage content',
          'homepage_content',
          section_key,
          `Updated homepage section: ${section_key}`,
        ],
      )
    } else if (key) {
      // Update showroom setting
      await db.run(
        `INSERT INTO showroom_settings (id, key, value, updated_at) VALUES (?, ?, ?, datetime('now'))
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
        [`setting-${key}`, key, value],
      )

      // Audit log
      await db.run(
        'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
        [
          `audit-${Date.now()}`,
          'admin',
          'Updated showroom setting',
          'showroom_setting',
          key,
          `Updated setting: ${key}`,
        ],
      )
    } else {
      return NextResponse.json({ error: 'section_key or key is required' }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: 'Content updated successfully' })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
