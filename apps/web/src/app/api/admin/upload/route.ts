import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { requireRole } from '@/lib/auth'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'vehicles')

export async function POST(request: Request) {
  try {
    await requireRole('admin')

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 },
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 },
      )
    }

    // Ensure upload directory exists
    await mkdir(UPLOAD_DIR, { recursive: true })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${safeName}`
    const filePath = join(UPLOAD_DIR, filename)

    await writeFile(filePath, buffer)

    // Audit log
    const { db } = await import('@/lib/db')
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${timestamp}`,
        'admin',
        'Uploaded image',
        'image',
        filename,
        `Uploaded image: ${file.name} (${Math.round(file.size / 1024)}KB)`,
      ],
    )

    return NextResponse.json({
      success: true,
      url: `/uploads/vehicles/${filename}`,
      filename,
      size: file.size,
    })
  } catch (err: any) {
    if (err.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (err.message === 'Insufficient permissions') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
