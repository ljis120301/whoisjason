import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  return NextResponse.json(
    { 
      error: 'Access Denied',
      message: 'GitHub API endpoints are not accessible from clients. Use server actions for secure data access.',
      secure: true
    },
    { status: 403 }
  );
} 