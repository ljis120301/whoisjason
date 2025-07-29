'use server';

import { getRealtimeBroadcaster } from '../../lib/realtime-broadcaster.js';
import { autoInitialize } from '../../lib/startup-manager.js';
import { getSpotifyRealtime } from '../../lib/spotify-realtime.js';

export async function getRealtimeData() {
  try {
    // Ensure services are initialized first
    await autoInitialize();
    
    const broadcaster = getRealtimeBroadcaster();
    
    // Start the broadcaster if not already running
    if (!broadcaster.isBroadcasting) {
      broadcaster.start();
    }

    // Get current data directly from the broadcaster
    let data = broadcaster.getCurrentData();
    
    // Always fetch fresh Spotify data for real-time updates
    // For other services, only fetch if no data exists yet
    if (!data.lastUpdated) {
      await broadcaster.fetchAllData();
      data = broadcaster.getCurrentData();
    } else {
      // Force fresh Spotify data fetch while keeping other services cached
      const spotifyRealtime = getSpotifyRealtime();
      if (spotifyRealtime.currentTrack) {
        data.spotify = {
          currentTrack: spotifyRealtime.currentTrack,
          lastUpdated: spotifyRealtime.lastUpdated
        };
      }
    }

    // Return sanitized data
    const sanitizedData = {
      success: true,
      data: {
        spotify: data.spotify ? {
          currentTrack: data.spotify.currentTrack ? {
            name: data.spotify.currentTrack.name,
            artist: data.spotify.currentTrack.artist,
            is_playing: data.spotify.currentTrack.is_playing,
            album: data.spotify.currentTrack.album
          } : null,
          lastUpdated: data.spotify.lastUpdated
        } : null,
        discord: data.discord ? {
          user: { username: data.discord.user?.username || 'Jason' },
          presence: {
            status: data.discord.presence?.status || 'offline'
          },
          lastUpdated: data.discord.lastUpdated
        } : null,
        steam: data.steam ? {
          playerInfo: {
            personaname: data.steam.playerInfo?.personaname,
            personastate: data.steam.playerInfo?.personastate,
            gameextrainfo: data.steam.playerInfo?.gameextrainfo,
            effectiveStatus: data.steam.playerInfo?.effectiveStatus,
            recentGame: data.steam.playerInfo?.recentGame
          },
          recentGames: data.steam.recentGames?.map(game => ({
            name: game.name,
            appid: game.appid,
            playtime_2weeks: game.playtime_2weeks,
            playtime_forever: game.playtime_forever,
            img_icon_url: game.img_icon_url
          })) || [],
          lastUpdated: data.steam.lastUpdated
        } : null,
        github: data.github ? {
          user: {
            commitsThisYear: data.github.user?.commitsThisYear,
            followers: data.github.user?.followers,
            following: data.github.user?.following
          },
          repos: data.github.repos ? {
            topRepos: data.github.repos.topRepos?.map(repo => ({
              name: repo.name,
              description: repo.description,
              language: repo.language
            })) || []
          } : null,
          lastUpdated: data.github.lastUpdated
        } : null,
        lastUpdated: data.lastUpdated
      }
    };
    
    return sanitizedData;
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch real-time data',
      data: {
        spotify: null,
        discord: null,
        steam: null,
        github: null,
        lastUpdated: null
      }
    };
  }
}