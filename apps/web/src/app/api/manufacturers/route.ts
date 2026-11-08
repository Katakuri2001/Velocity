import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const manufacturers = await db.query(
    'SELECT * FROM manufacturers WHERE is_active = 1 ORDER BY name ASC',
  )

  return NextResponse.json({ manufacturers: manufacturers.rows })
}
