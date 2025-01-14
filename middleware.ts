import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

const allowedOrigins = [
  'http://localhost:5173',
  'https://context-ai-ochre.vercel.app',
  'http://localhost:5174',
  'https://fd6a-2401-4900-1cab-d405-981-11ab-c754-a555.ngrok-free.app'
];

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  
  console.log('Middleware executing for path:', request.nextUrl.pathname);
  console.log('Request origin:', origin);
  console.log('Request method:', request.method);

  // If no origin, use default response
  if (!origin) {
    const response = NextResponse.next();
    return response;
  }

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const response = NextResponse.next();
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',  // Match all API routes
  ]
};