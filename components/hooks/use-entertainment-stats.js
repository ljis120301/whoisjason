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

  // Keep track of last successful data to prevent data loss during rate limiting
  const [lastSuccessfulData, setLastSuccessfulData] = useState({
    spotify: null,
    steam: null,
    discord: null
  });

  // Keep track of last data hash to detect changes
  const [lastDataHash, setLastDataHash] = useState({
    spotify: null,
    steam: null,
    discord: null
  });

  // Helper function to create a simple hash of data for change detection
  const createDataHash = useCallback((data) => {
    if (!data) return null;
    try {
      // Create a simple hash based on key data fields
      const spotifyHash = data.currentTrack ? 
        `${data.currentTrack.name}-${data.currentTrack.artist}-${data.currentTrack.is_playing}` : 
        'no-track';
      const discordHash = data.presence ? 
        `${data.presence.status}-${data.presence.activities?.length || 0}` : 
        'offline';
      const steamHash = data.playerInfo ? 
        `${data.playerInfo.personastate}-${data.playerInfo.gameextrainfo || 'no-game'}` : 
        'unknown';
      
      return { spotify: spotifyHash, discord: discordHash, steam: steamHash };
    } catch (error) {
      return null;
    }
  }, []);

  const fetchAllStats = useCallback(async () => {
    // Check health first to see if services are ready (with caching)
    try {
      const healthResponse = await fetch('/api/health', {
        cache: 'default',
        headers: {
          'Cache-Control': 'max-age=60' // Cache health check for 1 minute
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
          cache: 'default', // Use browser caching to reduce rate limiting
          headers: {
            'Cache-Control': 'max-age=300' // Cache for 5 minutes
          }
        });
        if (response.ok) {
          const data = await response.json();
          setLastSuccessfulData(prev => ({ ...prev, spotify: data }));
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
        } else if (response.status === 429) {
          // Rate limited - use cached data if available
          if (lastSuccessfulData.spotify) {
            setStats(prev => ({
              ...prev,
              spotify: {
                ...lastSuccessfulData.spotify,
                loading: false,
                error: 'Rate limited - using cached data'
              }
            }));
          } else {
            setStats(prev => ({
              ...prev,
              spotify: {
                currentTrack: null,
                recentTracks: [],
                loading: false,
                error: 'Rate limited - no cached data available'
              }
            }));
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch Spotify data`);
        }
      } catch (error) {
        console.error('Spotify fetch error:', error);
        // Use cached data if available on error
        if (lastSuccessfulData.spotify) {
          setStats(prev => ({
            ...prev,
            spotify: {
              ...lastSuccessfulData.spotify,
              loading: false,
              error: `Error: ${error.message} - using cached data`
            }
          }));
        } else {
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
      }
    };

    // Fetch Steam data
    const fetchSteam = async () => {
      try {
        const response = await fetch('/api/steam/recent', {
          cache: 'default', // Use browser caching to reduce rate limiting
          headers: {
            'Cache-Control': 'max-age=600' // Cache for 10 minutes
          }
        });
        if (response.ok) {
          const data = await response.json();
          setLastSuccessfulData(prev => ({ ...prev, steam: data }));
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
        } else if (response.status === 429) {
          // Rate limited - use cached data if available
          if (lastSuccessfulData.steam) {
            setStats(prev => ({
              ...prev,
              steam: {
                ...lastSuccessfulData.steam,
                loading: false,
                error: 'Rate limited - using cached data'
              }
            }));
          } else {
            setStats(prev => ({
              ...prev,
              steam: {
                recentGames: [],
                totalGames: 0,
                playerInfo: {},
                loading: false,
                error: 'Rate limited - no cached data available'
              }
            }));
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch Steam data`);
        }
      } catch (error) {
        console.error('Steam fetch error:', error);
        // Use cached data if available on error
        if (lastSuccessfulData.steam) {
          setStats(prev => ({
            ...prev,
            steam: {
              ...lastSuccessfulData.steam,
              loading: false,
              error: `Error: ${error.message} - using cached data`
            }
          }));
        } else {
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
      }
    };

    // Fetch Discord data
    const fetchDiscord = async () => {
      try {
        const response = await fetch('/api/discord/status', {
          cache: 'default', // Use browser caching to reduce rate limiting
          headers: {
            'Cache-Control': 'max-age=300' // Cache for 5 minutes
          }
        });
        if (response.ok) {
          const data = await response.json();
          setLastSuccessfulData(prev => ({ ...prev, discord: data }));
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
        } else if (response.status === 429) {
          // Rate limited - use cached data if available
          if (lastSuccessfulData.discord) {
            setStats(prev => ({
              ...prev,
              discord: {
                ...lastSuccessfulData.discord,
                loading: false,
                error: 'Rate limited - using cached data'
              }
            }));
          } else {
            setStats(prev => ({
              ...prev,
              discord: {
                user: {},
                presence: null,
                sharedGuilds: 0,
                loading: false,
                error: 'Rate limited - no cached data available'
              }
            }));
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch Discord data`);
        }
      } catch (error) {
        console.error('Discord fetch error:', error);
        // Use cached data if available on error
        if (lastSuccessfulData.discord) {
          setStats(prev => ({
            ...prev,
            discord: {
              ...lastSuccessfulData.discord,
              loading: false,
              error: `Error: ${error.message} - using cached data`
            }
          }));
        } else {
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
      }
    };

    // Fetch all data in parallel
    await Promise.all([
      fetchSpotify(),
      fetchSteam(),
      fetchDiscord()
    ]);
  }, [lastSuccessfulData]);

  // Individual fetch functions for smart polling
  const fetchSpotifyOnly = useCallback(async () => {
    try {
      const response = await fetch('/api/spotify/recent', {
        cache: 'default',
        headers: {
          'Cache-Control': 'max-age=30' // Shorter cache for real-time updates
        }
      });
      if (response.ok) {
        const data = await response.json();
        const newHash = createDataHash(data);
        
        // Only update if data has actually changed
        if (newHash && newHash.spotify !== lastDataHash.spotify) {
          console.log('Spotify data changed, updating...');
          setLastSuccessfulData(prev => ({ ...prev, spotify: data }));
          setLastDataHash(prev => ({ ...prev, spotify: newHash.spotify }));
          setStats(prev => ({
            ...prev,
            spotify: {
              ...data,
              loading: false,
              error: null
            }
          }));
        }
      } else if (response.status === 429) {
        // Rate limited - use cached data if available
        if (lastSuccessfulData.spotify) {
          setStats(prev => ({
            ...prev,
            spotify: {
              ...lastSuccessfulData.spotify,
              loading: false,
              error: 'Rate limited - using cached data'
            }
          }));
        }
      }
    } catch (error) {
      console.error('Spotify fetch error:', error);
      // Use cached data if available on error
      if (lastSuccessfulData.spotify) {
        setStats(prev => ({
          ...prev,
          spotify: {
            ...lastSuccessfulData.spotify,
            loading: false,
            error: `Error: ${error.message} - using cached data`
          }
        }));
      }
    }
  }, [lastSuccessfulData, lastDataHash, createDataHash]);

  const fetchDiscordOnly = useCallback(async () => {
    try {
      const response = await fetch('/api/discord/status', {
        cache: 'default',
        headers: {
          'Cache-Control': 'max-age=30' // Shorter cache for real-time updates
        }
      });
      if (response.ok) {
        const data = await response.json();
        const newHash = createDataHash(data);
        
        // Only update if data has actually changed
        if (newHash && newHash.discord !== lastDataHash.discord) {
          console.log('Discord data changed, updating...');
          setLastSuccessfulData(prev => ({ ...prev, discord: data }));
          setLastDataHash(prev => ({ ...prev, discord: newHash.discord }));
          setStats(prev => ({
            ...prev,
            discord: {
              ...data,
              loading: false,
              error: null
            }
          }));
        }
      } else if (response.status === 429) {
        // Rate limited - use cached data if available
        if (lastSuccessfulData.discord) {
          setStats(prev => ({
            ...prev,
            discord: {
              ...lastSuccessfulData.discord,
              loading: false,
              error: 'Rate limited - using cached data'
            }
          }));
        }
      }
    } catch (error) {
      console.error('Discord fetch error:', error);
      // Use cached data if available on error
      if (lastSuccessfulData.discord) {
        setStats(prev => ({
          ...prev,
          discord: {
            ...lastSuccessfulData.discord,
            loading: false,
            error: `Error: ${error.message} - using cached data`
          }
        }));
      }
    }
  }, [lastSuccessfulData, lastDataHash, createDataHash]);

  const fetchSteamOnly = useCallback(async () => {
    try {
      const response = await fetch('/api/steam/recent', {
        cache: 'default',
        headers: {
          'Cache-Control': 'max-age=120' // Longer cache for Steam
        }
      });
      if (response.ok) {
        const data = await response.json();
        const newHash = createDataHash(data);
        
        // Only update if data has actually changed
        if (newHash && newHash.steam !== lastDataHash.steam) {
          console.log('Steam data changed, updating...');
          setLastSuccessfulData(prev => ({ ...prev, steam: data }));
          setLastDataHash(prev => ({ ...prev, steam: newHash.steam }));
          setStats(prev => ({
            ...prev,
            steam: {
              ...data,
              loading: false,
              error: null
            }
          }));
        }
      } else if (response.status === 429) {
        // Rate limited - use cached data if available
        if (lastSuccessfulData.steam) {
          setStats(prev => ({
            ...prev,
            steam: {
              ...lastSuccessfulData.steam,
              loading: false,
              error: 'Rate limited - using cached data'
            }
          }));
        }
      }
    } catch (error) {
      console.error('Steam fetch error:', error);
      // Use cached data if available on error
      if (lastSuccessfulData.steam) {
        setStats(prev => ({
          ...prev,
          steam: {
            ...lastSuccessfulData.steam,
            loading: false,
            error: `Error: ${error.message} - using cached data`
          }
        }));
      }
    }
  }, [lastSuccessfulData, lastDataHash, createDataHash]);

  useEffect(() => {
    // Initial fetch
    fetchAllStats();
    
    // Set up smart polling with different intervals for different services
    const spotifyInterval = setInterval(() => {
      // Spotify: Check every 30 seconds for real-time music updates
      fetchSpotifyOnly();
    }, 30000);
    
    const discordInterval = setInterval(() => {
      // Discord: Check every 30 seconds for real-time status updates
      fetchDiscordOnly();
    }, 30000);
    
    const steamInterval = setInterval(() => {
      // Steam: Check every 2 minutes (less frequent since gaming status changes less often)
      fetchSteamOnly();
    }, 120000);
    
    // Also set up a retry for failed requests (but less frequently)
    const retryInterval = setInterval(() => {
      // Check if any service has an error and retry (but not if it's rate limited)
      if ((stats.spotify.error && !stats.spotify.error.includes('Rate limit')) ||
          (stats.steam.error && !stats.steam.error.includes('Rate limit')) ||
          (stats.discord.error && !stats.discord.error.includes('Rate limit'))) {
        console.log('Retrying failed services...');
        fetchAllStats();
      }
    }, 60000); // Retry every 60 seconds if there are non-rate-limit errors
    
    return () => {
      clearInterval(spotifyInterval);
      clearInterval(discordInterval);
      clearInterval(steamInterval);
      clearInterval(retryInterval);
    };
  }, [fetchAllStats, fetchSpotifyOnly, fetchDiscordOnly, fetchSteamOnly, stats.spotify.error, stats.steam.error, stats.discord.error]);

  // Manual refresh function for users who want to force an update
  const manualRefresh = useCallback(() => {
    console.log('Manual refresh triggered');
    fetchAllStats();
  }, [fetchAllStats]);

  return { ...stats, manualRefresh };
} 