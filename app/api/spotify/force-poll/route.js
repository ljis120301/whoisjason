import { NextResponse } from 'next/server';
import { isAuthenticated } from '../../../../lib/auth.js';
import { getSpotifyRealtime } from '../../../../lib/spotify-realtime.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { 
          error: 'Unauthorized: Session expired or invalid',
          message: 'Please authenticate at /api/admin/auth to access this endpoint',
          loginUrl: '/api/admin/auth'
        },
        { status: 401 }
      );
    }

    const spotifyRealtime = getSpotifyRealtime();
    
    if (!spotifyRealtime.isPolling) {
      return NextResponse.json(
        { error: 'Spotify real-time service is not running' },
        { status: 400 }
      );
    }

    // Force immediate poll
    const result = await spotifyRealtime.forcePoll();

    return NextResponse.json({
      success: true,
      message: 'Forced Spotify poll completed',
      result: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to force Spotify poll', details: error.message },
      { status: 500 }
    );
  }
} 