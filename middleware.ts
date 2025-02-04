import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') || '';

  // Define allowed origins
  const allowedOrigins = [
    'http://localhost:5174',  // Your frontend development URL
    'https://your-production-domain.com',  // Your production frontend URL
    'chrome-extension://your-extension-id',
    "https://83d6-2401-4900-1f3b-a07-281c-218a-1c56-ebb2.ngrok-free.app"  // Your Chrome extension
  ];

  // Check if the origin is allowed
  const isAllowedOrigin = allowedOrigins.includes(origin) || origin.startsWith('chrome-extension://');

  // Handle preflight requests (OPTIONS)
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      headers: {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() });

  // Refresh session if expired
  await supabase.auth.getSession();

  // Define public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/api/webhook', '/privacy'];

  // Get the user's session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check route access based on session
  const path = request.nextUrl.pathname;

  if (!session && !publicRoutes.includes(path)) {
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (session && publicRoutes.includes(path) && path !== '/') {
    const redirectUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  console.log("hiii")

  const response = NextResponse.next();

  // Set CORS headers for all responses
  response.headers.set('Access-Control-Allow-Origin', isAllowedOrigin ? origin : '');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  console.log(response)
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/api/:path*',
  ]
}