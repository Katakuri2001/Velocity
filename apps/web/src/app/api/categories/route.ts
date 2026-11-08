import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const categories = await db.query(
    'SELECT * FROM vehicle_categories ORDER BY sort_order ASC, name ASC',
  )

  return NextResponse.json({ categories: categories.rows })
}
