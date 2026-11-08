import { NextResponse } from 'next/server'
import { signIn } from '@/lib/auth'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const result = await signIn(email, password)
  return NextResponse.json(result)
}
