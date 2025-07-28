import { NextResponse } from 'next/server';
import { getSpotifyRealtime } from '../../../../lib/spotify-realtime.js';
import { rateLimit } from '../../../../lib/rate-limiter.js';
import { sanitizeSpotifyData } from '../../../../lib/data-sanitizer.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // Apply rate limiting
    const rateLimitResult = rateLimit(request);
    if (rateLimitResult.blocked) {
      return NextResponse.json(
        { error: rateLimitResult.message },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitResult.remaining,
            'Retry-After': '900' // 15 minutes
          }
        }
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
    const rawResponse = {
      currentTrack: trackInfo.type === 'currently_playing' ? trackInfo : null,
      recentTracks: trackInfo.type === 'recently_played' ? [trackInfo] : [],
      lastUpdated: trackInfo.last_updated || new Date().toISOString(),
      realtime_service: {
        active: trackInfo.polling_active,
        poll_frequency_seconds: trackInfo.poll_frequency_seconds,
        last_poll: trackInfo.last_updated
      }
    };

    // Sanitize data before sending
    const sanitizedResponse = sanitizeSpotifyData(rawResponse);

    return NextResponse.json(sanitizedResponse, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining,
        'Cache-Control': 'public, max-age=30' // Cache for 30 seconds
      }
    });

  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
} 