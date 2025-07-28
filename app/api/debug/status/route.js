import { NextResponse } from 'next/server';
import { getSpotifyRealtime } from '../../../lib/spotify-realtime.js';
import { getDiscordGateway } from '../../../lib/discord-gateway.js';
import { getTokenManager } from '../../../lib/token-manager.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // Get raw data from all services
    const spotifyRealtime = getSpotifyRealtime();
    const discordGateway = getDiscordGateway();
    const tokenManager = getTokenManager();

    const debugData = {
      timestamp: new Date().toISOString(),
      spotify: {
        isPolling: spotifyRealtime.isPolling,
        currentTrack: spotifyRealtime.currentTrack,
        lastUpdated: spotifyRealtime.lastUpdated,
        pollFrequency: spotifyRealtime.pollFrequency,
        detailedInfo: spotifyRealtime.getDetailedTrackInfo()
      },
      discord: {
        isConnected: discordGateway.isConnected,
        presenceData: discordGateway.getPresence(),
        connectionHealth: discordGateway.getConnectionHealth(),
        sessionId: discordGateway.sessionId
      },
      steam: {
        hasValidCredentials: await tokenManager.getValidSteamCredentials() ? true : false,
        steamTokens: tokenManager.tokens.steam ? {
          hasApiKey: !!tokenManager.tokens.steam.api_key,
          hasSteamId: !!tokenManager.tokens.steam.steam_id,
          validatedAt: tokenManager.tokens.steam.validated_at
        } : null
      },
      github: {
        hasValidToken: await tokenManager.getValidGitHubToken() ? true : false,
        githubTokens: tokenManager.tokens.github ? {
          hasToken: !!tokenManager.tokens.github.token,
          validatedAt: tokenManager.tokens.github.validated_at
        } : null
      }
    };

    return NextResponse.json(debugData);

  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'Failed to get debug data', details: error.message },
      { status: 500 }
    );
  }
} 