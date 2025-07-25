import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      return NextResponse.json(
        { error: 'Missing Spotify credentials' },
        { status: 400 }
      );
    }

    // Get access token using refresh token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to refresh Spotify token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get currently playing track
    const currentResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    let currentTrack = null;
    if (currentResponse.ok && currentResponse.status !== 204) {
      const currentData = await currentResponse.json();
      if (currentData && currentData.item) {
        currentTrack = {
          name: currentData.item.name,
          artist: currentData.item.artists[0]?.name,
          is_playing: currentData.is_playing
        };
      }
    }

    // Get recently played tracks
    const recentResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    let recentTracks = [];
    if (recentResponse.ok) {
      const recentData = await recentResponse.json();
      recentTracks = recentData.items?.map(item => ({
        name: item.track.name,
        artist: item.track.artists[0]?.name,
        played_at: item.played_at
      })) || [];
    }

    return NextResponse.json({
      currentTrack,
      recentTracks,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
} 