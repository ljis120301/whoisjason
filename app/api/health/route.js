import { NextResponse } from 'next/server';
import { getStartupManager } from '../../../lib/startup-manager.js';
import { getSpotifyRealtime } from '../../../lib/spotify-realtime.js';
import { getDiscordGateway } from '../../../lib/discord-gateway.js';
import { getTokenManager } from '../../../lib/token-manager.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const startupManager = getStartupManager();
    const spotifyRealtime = getSpotifyRealtime();
    const discordGateway = getDiscordGateway();
    const tokenManager = getTokenManager();

    // Get service status
    const startupStatus = startupManager.getStatus();
    const spotifyStatus = {
      isPolling: spotifyRealtime.isPolling,
      hasData: !!spotifyRealtime.currentTrack,
      lastUpdated: spotifyRealtime.lastUpdated
    };
    const discordStatus = {
      isConnected: discordGateway.isConnected,
      hasSession: !!discordGateway.sessionId,
      connectionHealth: discordGateway.getConnectionHealth()
    };

    // Check if all services are ready
    const allServicesReady = startupStatus.initialized && 
                           spotifyStatus.isPolling && 
                           discordStatus.isConnected;

    const healthData = {
      timestamp: new Date().toISOString(),
      status: allServicesReady ? 'healthy' : 'initializing',
      services: {
        startup: startupStatus,
        spotify: spotifyStatus,
        discord: discordStatus
      },
      ready: allServicesReady
    };

    return NextResponse.json(healthData, {
      status: allServicesReady ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache',
        'X-Health-Check': 'true'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { 
        timestamp: new Date().toISOString(),
        status: 'error',
        error: error.message,
        ready: false
      },
      { status: 500 }
    );
  }
} 