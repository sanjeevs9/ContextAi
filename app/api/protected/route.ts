import { validateAuth } from '@/lib/auth-middleware';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const {session} = await validateAuth();


  console.log({session})
  return NextResponse.json({
    message: 'Hello, authenticated user!',
    user: session?.user
  })
} 