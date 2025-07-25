'use client';

import { useState, useEffect } from 'react';

export function useEntertainmentStats() {
  const [stats, setStats] = useState({
    spotify: {
      currentTrack: null,
      recentTracks: [],
      loading: true,
      error: null
    },
    steam: {
      recentGames: [],
      totalGames: 0,
      playerInfo: {},
      loading: true,
      error: null
    },
    discord: {
      user: {},
      presence: null,
      sharedGuilds: 0,
      loading: true,
      error: null
    }
  });

  useEffect(() => {
    const fetchAllStats = async () => {
      // Fetch Spotify data
      const fetchSpotify = async () => {
        try {
          const response = await fetch('/api/spotify/recent');
          if (response.ok) {
            const data = await response.json();
            setStats(prev => ({
              ...prev,
              spotify: {
                ...data,
                loading: false,
                error: null
              }
            }));
          } else {
            throw new Error('Failed to fetch Spotify data');
          }
        } catch (error) {
          console.error('Spotify fetch error:', error);
          setStats(prev => ({
            ...prev,
            spotify: {
              currentTrack: null,
              recentTracks: [],
              loading: false,
              error: error.message
            }
          }));
        }
      };

      // Fetch Steam data
      const fetchSteam = async () => {
        try {
          const response = await fetch('/api/steam/recent');
          if (response.ok) {
            const data = await response.json();
            setStats(prev => ({
              ...prev,
              steam: {
                ...data,
                loading: false,
                error: null
              }
            }));
          } else {
            throw new Error('Failed to fetch Steam data');
          }
        } catch (error) {
          console.error('Steam fetch error:', error);
          setStats(prev => ({
            ...prev,
            steam: {
              recentGames: [],
              totalGames: 0,
              playerInfo: {},
              loading: false,
              error: error.message
            }
          }));
        }
      };

      // Fetch Discord data
      const fetchDiscord = async () => {
        try {
          const response = await fetch('/api/discord/status');
          if (response.ok) {
            const data = await response.json();
            setStats(prev => ({
              ...prev,
              discord: {
                ...data,
                loading: false,
                error: null
              }
            }));
          } else {
            throw new Error('Failed to fetch Discord data');
          }
        } catch (error) {
          console.error('Discord fetch error:', error);
          setStats(prev => ({
            ...prev,
            discord: {
              user: {},
              presence: null,
              sharedGuilds: 0,
              loading: false,
              error: error.message
            }
          }));
        }
      };

      // Fetch all data in parallel
      await Promise.all([
        fetchSpotify(),
        fetchSteam(),
        fetchDiscord()
      ]);
    };

    fetchAllStats();
  }, []);

  return stats;
} 