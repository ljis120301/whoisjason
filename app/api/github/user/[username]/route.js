import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  return NextResponse.json(
    {
      error: 'Access Denied',
      message: 'Get lost nerd stop tryng to hack my github',
      secure: true
    },
    { status: 403 }
  );
} 