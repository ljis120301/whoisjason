import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Block all client access to API endpoints containing personal data
  const protectedEndpoints = [
    '/api/realtime',
    '/api/spotify',
    '/api/discord', 
    '/api/steam',
    '/api/github',
    '/api/system',
    '/api/debug'
  ];

  // Allow admin endpoints (these have their own authentication)
  const adminEndpoints = [
    '/api/admin/auth',
    '/api/admin/system-status'
  ];

  // Allow public endpoints (contact, health, etc.)
  const publicEndpoints = [
    '/api/contact',
    '/api/health',
    '/api/public'
  ];

  // Check if this is a protected endpoint
  const isProtectedEndpoint = protectedEndpoints.some(endpoint => 
    pathname.startsWith(endpoint)
  );

  // Check if this is an admin endpoint
  const isAdminEndpoint = adminEndpoints.some(endpoint => 
    pathname.startsWith(endpoint)
  );

  // Check if this is a public endpoint
  const isPublicEndpoint = publicEndpoints.some(endpoint => 
    pathname.startsWith(endpoint)
  );

  if (isProtectedEndpoint) {
    return NextResponse.json(
      { 
        error: 'Access Denied',
        message: 'API endpoints containing personal data are not accessible from clients. Use server actions for secure data access.',
        secure: true
      },
      { status: 403 }
    );
  }

  // Allow admin endpoints, public endpoints, and other endpoints
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*'
};