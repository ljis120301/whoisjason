import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow WebSocket endpoint
  if (pathname === '/api/realtime') {
    return NextResponse.next();
  }

  // Allow admin authentication
  if (pathname === '/api/admin/auth') {
    return NextResponse.next();
  }

  // Allow health check (but with rate limiting)
  if (pathname === '/api/health') {
    return NextResponse.next();
  }

  // Block all other API endpoints
  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { 
        error: 'Access Denied',
        message: 'API endpoints are not accessible from clients. Use WebSocket connection for real-time data.',
        websocketUrl: '/api/realtime'
      },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*'
};