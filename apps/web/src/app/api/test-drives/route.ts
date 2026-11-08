import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, vehicle_id, preferred_date, preferred_time } = body

    // Validation
    if (!name || !email || !phone || !preferred_date || !preferred_time) {
      return NextResponse.json(
        { error: 'Name, email, phone, preferred date, and preferred time are required' },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const insertResult = await db.run(
      `INSERT INTO test_drive_requests (
        id, vehicle_id, name, email, phone, preferred_date, preferred_time,
        status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')) RETURNING id`,
      [
        `tdr-${Date.now()}`,
        vehicle_id || null,
        name,
        email,
        phone,
        preferred_date,
        preferred_time,
        'pending',
      ],
    )

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        email,
        'Created test drive request',
        'test_drive_request',
        String(insertResult.lastInsertRowid || ''),
        `Test drive request from ${name} (${email}) for ${preferred_date} at ${preferred_time}${vehicle_id ? ` for vehicle ${vehicle_id}` : ''}`,
      ],
    )

    return NextResponse.json({
      success: true,
      message: 'Test drive request submitted successfully. We will confirm your appointment shortly.',
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit test drive request. Please try again.' },
      { status: 500 },
    )
  }
}
