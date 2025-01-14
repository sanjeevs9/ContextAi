import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

const allowedOrigins = [
  'http://localhost:5173',  // Local development frontend
  'http://localhost:3000',  // Local development backend
  'https://context-ai-ochre.vercel.app', // Your deployed backend
  // Add your production frontend URL when you deploy it
];

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') || '';
  
  // For development and testing, log the origin
  console.log('Request origin:', origin);

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      headers: {
        'Access-Control-Allow-Origin': origin,  // Use actual origin instead of '*'
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() });
  
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();

  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Get the user's session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Define public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/signup', '/forgot-password','/api/webhook'];
  
  // If the user is not logged in and trying to access a protected route
  if (!session && !publicRoutes.includes(path)) {
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If the user is logged in and trying to access login/signup pages
  if (session && publicRoutes.includes(path) && path !== '/') {
    const redirectUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const response = NextResponse.next()

  // Set CORS headers for all responses
  response.headers.set('Access-Control-Allow-Origin', origin);  // Use actual origin instead of '*'
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  return response
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