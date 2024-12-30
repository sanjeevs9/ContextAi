import { validateAuth } from '@/lib/auth-middleware';
import { NextResponse } from 'next/server';

export async function GET() {
  const {session} = await validateAuth();


  console.log({session})
  return NextResponse.json({
    message: 'Hello, authenticated user!',
    user: session?.user
  })
} 