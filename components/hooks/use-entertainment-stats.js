'use client';

import { useState, useEffect, useCallback } from 'react';

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

  const fetchAllStats = useCallback(async () => {
    // Check health first to see if services are ready
    try {
      const healthResponse = await fetch('/api/health', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (healthResponse.status === 503) {
        // Services are still initializing, keep loading state
        setStats(prev => ({
          ...prev,
          spotify: { ...prev.spotify, loading: true, error: 'Service initializing...' },
          steam: { ...prev.steam, loading: true, error: 'Service initializing...' },
          discord: { ...prev.discord, loading: true, error: 'Service initializing...' }
        }));
        return;
      }
    } catch (error) {
      console.error('Health check failed:', error);
    }

    // Fetch Spotify data
    const fetchSpotify = async () => {
      try {
        const response = await fetch('/api/spotify/recent', {
          cache: 'no-store', // Prevent caching for real-time updates
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
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
        } else if (response.status === 503) {
          // Service is initializing, keep loading state and retry
          setStats(prev => ({
            ...prev,
            spotify: {
              currentTrack: null,
              recentTracks: [],
              loading: true,
              error: 'Service initializing...'
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
        const response = await fetch('/api/steam/recent', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
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
        } else if (response.status === 503) {
          // Service is initializing, keep loading state and retry
          setStats(prev => ({
            ...prev,
            steam: {
              recentGames: [],
              totalGames: 0,
              playerInfo: {},
              loading: true,
              error: 'Service initializing...'
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
        const response = await fetch('/api/discord/status', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
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
        } else if (response.status === 503) {
          // Service is initializing, keep loading state and retry
          setStats(prev => ({
            ...prev,
            discord: {
              user: {},
              presence: null,
              sharedGuilds: 0,
              loading: true,
              error: 'Service initializing...'
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
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchAllStats();
    
    // Set up auto-refresh every 10 seconds for more frequent updates
    const interval = setInterval(fetchAllStats, 10000);
    
    return () => clearInterval(interval);
  }, [fetchAllStats]);

  return stats;
} 