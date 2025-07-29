import { NextResponse } from 'next/server';
import { getStartupManager } from '../../../../lib/startup-manager.js';
import { getSpotifyRealtime } from '../../../../lib/spotify-realtime.js';
import { getDiscordGateway } from '../../../../lib/discord-gateway.js';
import { getTokenManager } from '../../../../lib/token-manager.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const startupManager = getStartupManager();
    const spotifyRealtime = getSpotifyRealtime();
    const discordGateway = getDiscordGateway();
    const tokenManager = getTokenManager();

    // Get raw service status
    const startupStatus = startupManager.getStatus();
    const spotifyStatus = {
      isPolling: spotifyRealtime.isPolling,
      pollFrequency: spotifyRealtime.pollFrequency,
      lastUpdated: spotifyRealtime.lastUpdated,
      currentTrack: spotifyRealtime.currentTrack,
      hasData: !!spotifyRealtime.currentTrack,
      detailedInfo: spotifyRealtime.getDetailedTrackInfo()
    };
    
    const discordStatus = {
      isConnected: discordGateway.isConnected,
      sessionId: discordGateway.sessionId,
      connectionHealth: discordGateway.getConnectionHealth(),
      presence: discordGateway.getPresence(),
      hasData: !!discordGateway.getPresence()
    };

    // Check token manager status
    let tokenStatus = {};
    try {
      const spotifyToken = await tokenManager.getValidSpotifyToken();
      const steamCreds = await tokenManager.getValidSteamCredentials();
      const githubToken = await tokenManager.getValidGitHubToken();
      
      tokenStatus = {
        spotify: { hasValidToken: !!spotifyToken },
        steam: { hasValidCredentials: !!steamCreds },
        github: { hasValidToken: !!githubToken }
      };
    } catch (error) {
      tokenStatus = { error: error.message };
    }

    const debugData = {
      timestamp: new Date().toISOString(),
      startup: startupStatus,
      spotify: spotifyStatus,
      discord: discordStatus,
      tokens: tokenStatus,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasSpotifyCreds: !!(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET),
        hasDiscordCreds: !!(process.env.DISCORD_BOT_TOKEN && process.env.DISCORD_USER_ID),
        hasSteamCreds: !!(process.env.STEAM_API_KEY && process.env.STEAM_ID),
        hasGitHubCreds: !!process.env.GITHUB_TOKEN
      }
    };

    return NextResponse.json(debugData, {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Debug-Endpoint': 'true'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { 
        timestamp: new Date().toISOString(),
        error: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
} 