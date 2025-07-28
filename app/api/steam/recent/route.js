import { NextResponse } from 'next/server';
import { isAuthenticated } from "../../../../lib/auth.js";

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

    const steamApiKey = process.env.STEAM_API_KEY;
    const steamId = process.env.STEAM_ID;

    if (!steamApiKey || !steamId) {
      return NextResponse.json(
        { error: 'Missing Steam credentials' },
        { status: 400 }
      );
    }

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

    return NextResponse.json({
      recentGames,
      totalGames,
      playerInfo,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Steam API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Steam data' },
      { status: 500 }
    );
  }
} 