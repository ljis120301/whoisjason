import { NextResponse } from 'next/server';
import { isAuthenticated } from '../../../../lib/auth.js';
import { getStartupManager } from '../../../../lib/startup-manager.js';
import { getTokenManager } from '../../../../lib/token-manager.js';
import { getDiscordGateway } from '../../../../lib/discord-gateway.js';
import { getSpotifyRealtime } from '../../../../lib/spotify-realtime.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
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

    // Get startup manager status
    const startupManager = getStartupManager();
    const startupStatus = startupManager.getStatus();

    // Get token manager status
    const tokenManager = getTokenManager();
    let spotifyTokenStatus = null;
    try {
      const spotifyToken = await tokenManager.getValidSpotifyToken();
      spotifyTokenStatus = {
        hasValidToken: !!spotifyToken,
        tokenExpiry: tokenManager.tokens.spotify?.expires_at || null,
        lastRefresh: tokenManager.tokens.spotify?.updated_at || null
      };
    } catch (error) {
      spotifyTokenStatus = {
        hasValidToken: false,
        error: error.message
      };
    }

    // Get Spotify real-time service status
    const spotifyRealtime = getSpotifyRealtime();
    const spotifyRealtimeStatus = {
      isPolling: spotifyRealtime.isPolling,
      pollFrequency: spotifyRealtime.pollFrequency,
      lastTrackUpdate: spotifyRealtime.lastUpdated,
      currentTrack: spotifyRealtime.currentTrack ? {
        name: spotifyRealtime.currentTrack.name,
        artist: spotifyRealtime.currentTrack.artist,
        is_playing: spotifyRealtime.currentTrack.is_playing
      } : null
    };

    // Get Discord Gateway status
    const discordGateway = getDiscordGateway();
    const discordStatus = {
      isConnected: discordGateway.isConnected,
      lastPresenceUpdate: discordGateway.presenceData.lastUpdated,
      currentStatus: discordGateway.presenceData.status
    };

    // Get Steam API status
    let steamStatus = null;
    try {
      const steamCreds = await tokenManager.getValidSteamCredentials();
      steamStatus = {
        hasValidCredentials: !!steamCreds,
        lastValidation: tokenManager.tokens.steam?.validated_at || null,
        playerName: tokenManager.tokens.steam?.player_name || null
      };
    } catch (error) {
      steamStatus = {
        hasValidCredentials: false,
        error: error.message
      };
    }

    // Get GitHub API status
    let githubStatus = null;
    try {
      const githubToken = await tokenManager.getValidGitHubToken();
      githubStatus = {
        hasValidToken: !!githubToken,
        lastValidation: tokenManager.tokens.github?.validated_at || null,
        username: tokenManager.tokens.github?.user_data?.login || null,
        rateLimit: tokenManager.tokens.github?.rate_limit || null
      };
    } catch (error) {
      githubStatus = {
        hasValidToken: false,
        error: error.message
      };
    }

    // Check environment variables
    const envStatus = {
      spotify: {
        clientId: !!process.env.SPOTIFY_CLIENT_ID,
        clientSecret: !!process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken: !!process.env.SPOTIFY_REFRESH_TOKEN
      },
      discord: {
        botToken: !!process.env.DISCORD_BOT_TOKEN,
        userId: !!process.env.DISCORD_USER_ID,
        guildId: !!process.env.DISCORD_GUILD_ID
      },
      github: {
        token: !!process.env.GITHUB_TOKEN,
        username: !!process.env.NEXT_PUBLIC_GITHUB_USERNAME
      },
      steam: {
        apiKey: !!process.env.STEAM_API_KEY,
        steamId: !!process.env.STEAM_ID
      }
    };

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      services: {
        startup: startupStatus,
        spotify: {
          ...spotifyTokenStatus,
          realtime: spotifyRealtimeStatus
        },
        discord: discordStatus,
        steam: steamStatus,
        github: githubStatus
      },
      environment: envStatus,
      health: {
        allServicesReady: startupStatus.initialized && 
                         spotifyTokenStatus.hasValidToken && 
                         spotifyRealtimeStatus.isPolling &&
                         discordStatus.isConnected &&
                         steamStatus.hasValidCredentials &&
                         githubStatus.hasValidToken,
        readyServices: [
          spotifyTokenStatus.hasValidToken && spotifyRealtimeStatus.isPolling,
          discordStatus.isConnected,
          steamStatus.hasValidCredentials,
          githubStatus.hasValidToken
        ].filter(Boolean).length,
        totalServices: 4
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get system status' },
      { status: 500 }
    );
  }
} 