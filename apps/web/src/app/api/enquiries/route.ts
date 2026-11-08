import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, vehicle_id, preferred_contact } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const enquiry = await db.run(
      `INSERT INTO enquiries (
        id, vehicle_id, name, email, phone, preferred_contact, message,
        status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')) RETURNING id`,
      [
        `enq-${Date.now()}`,
        vehicle_id || null,
        name,
        email,
        phone || null,
        preferred_contact || null,
        message,
        'new',
      ],
    )

    // Audit log
    await db.run(
      'INSERT INTO audit_logs (id, actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime(\'now\'))',
      [
        `audit-${Date.now()}`,
        email,
        'Created enquiry',
        'enquiry',
        String(enquiry.lastInsertRowid || ''),
        `New enquiry from ${name} (${email})${vehicle_id ? ` for vehicle ${vehicle_id}` : ''}`,
      ],
    )

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully. Our team will contact you shortly.',
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 },
    )
  }
}
