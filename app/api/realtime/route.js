import { NextResponse } from 'next/server';
import { getRealtimeBroadcaster } from '../../../lib/realtime-broadcaster.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // SECURITY: Enhanced server-side request validation
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';
    const origin = request.headers.get('origin') || '';
    const secFetchSite = request.headers.get('sec-fetch-site') || '';
    const secFetchMode = request.headers.get('sec-fetch-mode') || '';
    
    // Block browser/client access with enhanced detection
    const isBrowserRequest = 
      userAgent.includes('Mozilla') || 
      userAgent.includes('Chrome') || 
      userAgent.includes('Safari') || 
      userAgent.includes('Firefox') ||
      userAgent.includes('Edge') ||
      userAgent.includes('Opera') ||
      secFetchMode === 'cors' ||
      secFetchSite === 'same-origin' ||
      secFetchSite === 'cross-site';
    
    if (isBrowserRequest) {
      return NextResponse.json(
        { 
          error: 'Access Denied',
          message: 'This endpoint is not accessible from browsers. Use server actions for secure data access.',
          secure: true
        },
        { status: 403 }
      );
    }

    // Allow server-side access (from server actions)
    const broadcaster = getRealtimeBroadcaster();
    
    // Start the broadcaster if not already running
    if (!broadcaster.isBroadcasting) {
      broadcaster.start();
    }

    // Get current data
    const data = broadcaster.getCurrentData();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get real-time data' },
      { status: 500 }
    );
  }
}