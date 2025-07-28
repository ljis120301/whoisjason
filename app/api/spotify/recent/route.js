import { NextResponse } from 'next/server';
import { isAuthenticated } from "../../../../lib/auth.js";
import { getSpotifyRealtime } from '../../../../lib/spotify-realtime.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const adminPasscode = process.env.ADMIN_PASSCODE;

    if (!adminPasscode) {
      return NextResponse.json(
        { error: 'Missing ADMIN_PASSCODE in environment variables' },
        { status: 500 }
      );
    }

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

    // Get real-time track data from Spotify service
    const spotifyRealtime = getSpotifyRealtime();
    const trackInfo = spotifyRealtime.getDetailedTrackInfo();

    if (!trackInfo) {
      return NextResponse.json({
        currentTrack: null,
        recentTracks: [],
        lastUpdated: new Date().toISOString(),
        message: 'No track data available',
        realtime_service: {
          active: spotifyRealtime.isPolling,
          poll_frequency_seconds: spotifyRealtime.pollFrequency / 1000
        }
      });
    }

    // Format response based on track type
    const response = {
      currentTrack: trackInfo.type === 'currently_playing' ? trackInfo : null,
      recentTracks: trackInfo.type === 'recently_played' ? [trackInfo] : [],
      lastUpdated: trackInfo.last_updated || new Date().toISOString(),
      realtime_service: {
        active: trackInfo.polling_active,
        poll_frequency_seconds: trackInfo.poll_frequency_seconds,
        last_poll: trackInfo.last_updated
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
} 