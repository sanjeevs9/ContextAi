import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000','http://localhost:5174']; // Add all your allowed origins

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  
  // Validate origin
  const isValidOrigin = origin && allowedOrigins.includes(origin);
  const corsOrigin = isValidOrigin ? origin : allowedOrigins[0];

  console.log('Middleware executing for path:', request.nextUrl.pathname);
  console.log('Request origin:', origin);
  console.log('Request method:', request.method);

  // Handle OPTIONS request for CORS
  if (request.method === 'OPTIONS' || request.method === 'POST') {
    return new NextResponse(null, {
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400', // 24 hours cache for preflight requests
        
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

  const response = NextResponse.next();

  // Set CORS headers for all responses
  response.headers.set('Access-Control-Allow-Origin', corsOrigin);
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  
  // Only set these headers for non-OPTIONS requests
  if (request.method !== 'OPTIONS' && request.method !== 'POST') {
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  }

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
  ],
}