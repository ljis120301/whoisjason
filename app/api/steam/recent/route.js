import { NextResponse } from 'next/server';
import { getTokenManager } from '../../../../lib/token-manager.js';
import { rateLimit } from '../../../../lib/rate-limiter.js';
import { sanitizeSteamData } from '../../../../lib/data-sanitizer.js';

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

    // Get valid Steam credentials from token manager
    const tokenManager = getTokenManager();
    const steamCreds = await tokenManager.getValidSteamCredentials();

    if (!steamCreds) {
      return NextResponse.json(
        { 
          error: 'Failed to get valid Steam credentials. Please check Steam API configuration.',
          message: 'Steam service is initializing, please try again in a few seconds'
        },
        { status: 503 } // Service Unavailable
      );
    }

    const { apiKey: steamApiKey, steamId } = steamCreds;

    // Get recently played games
    const recentGamesResponse = await fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&format=json&count=5`,
      {
        next: { revalidate: 1800 } // Cache for 30 minutes
      }
    );

    if (!recentGamesResponse.ok) {
      throw new Error('Failed to fetch recent games from Steam');
    }

    const recentGamesData = await recentGamesResponse.json();
    const recentGames = recentGamesData.response?.games?.map(game => ({
      name: game.name,
      appid: game.appid,
      playtime_2weeks: Math.round((game.playtime_2weeks || 0) / 60 * 10) / 10, // Convert to hours
      playtime_forever: Math.round((game.playtime_forever || 0) / 60 * 10) / 10, // Convert to hours
      img_icon_url: game.img_icon_url
    })) || [];

    // Get owned games count
    const ownedGamesResponse = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&format=json&include_appinfo=false`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    let totalGames = 0;
    if (ownedGamesResponse.ok) {
      const ownedGamesData = await ownedGamesResponse.json();
      totalGames = ownedGamesData.response?.game_count || 0;
    }

    // Get player summary for Steam level and status
    const playerSummaryResponse = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`,
      {
        next: { revalidate: 600 } // Cache for 10 minutes
      }
    );

    let playerInfo = {};
    if (playerSummaryResponse.ok) {
      const playerData = await playerSummaryResponse.json();
      const player = playerData.response?.players?.[0];
      if (player) {
        playerInfo = {
          personaname: player.personaname,
          personastate: player.personastate, // 0=Offline, 1=Online, 2=Busy, 3=Away, 4=Snooze, 5=Looking to trade, 6=Looking to play
          gameextrainfo: player.gameextrainfo, // Currently playing game
          gameid: player.gameid
        };
      }
    }

    const rawResponse = {
      recentGames,
      totalGames,
      playerInfo,
      lastUpdated: new Date().toISOString()
    };

    // Sanitize data before sending
    const sanitizedResponse = sanitizeSteamData(rawResponse);

    return NextResponse.json(sanitizedResponse, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining,
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });

  } catch (error) {
    console.error('Steam API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Steam data' },
      { status: 500 }
    );
  }
} 