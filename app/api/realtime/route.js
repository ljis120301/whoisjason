import { NextResponse } from 'next/server';
import { getRealtimeBroadcaster } from '../../../lib/realtime-broadcaster.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
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
    console.error('Realtime API error:', error);
    return NextResponse.json(
      { error: 'Failed to get real-time data' },
      { status: 500 }
    );
  }
}