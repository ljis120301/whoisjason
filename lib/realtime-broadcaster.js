import { getSpotifyRealtime } from './spotify-realtime.js';
import { getDiscordGateway } from './discord-gateway.js';
import { getTokenManager } from './token-manager.js';

class RealtimeBroadcaster {
  constructor() {
    this.broadcastInterval = null;
    this.currentData = {
      spotify: null,
      discord: null,
      steam: null,
      github: null,
      lastUpdated: null
    };
    this.isBroadcasting = false;
    this.performanceLogs = [];
    this.apiStatus = {
      github: { isWorking: false, lastFetch: null, responseTime: null, error: null },
      spotify: { isWorking: false, lastFetch: null, responseTime: null, error: null },
      discord: { isWorking: false, lastFetch: null, responseTime: null, error: null },
      steam: { isWorking: false, lastFetch: null, responseTime: null, error: null }
    };
    
    // Cache system
    this.cache = {
      github: { data: null, lastFetch: null, ttl: 8 * 60 * 60 * 1000 }, // 8 hours
      discord: { data: null, lastFetch: null, ttl: 2 * 60 * 1000 }, // 2 minutes
      steam: { 
        onlineStatus: { data: null, lastFetch: null, ttl: 10 * 60 * 1000 }, // 10 minutes
        recentGames: { data: null, lastFetch: null, ttl: 24 * 60 * 60 * 1000 } // 24 hours
      }
    };
  }

  // Cache management methods
  isCacheValid(service, subService = null) {
    const cacheKey = subService ? this.cache[service][subService] : this.cache[service];
    if (!cacheKey || !cacheKey.data || !cacheKey.lastFetch) {
      return false;
    }
    
    const now = Date.now();
    const age = now - cacheKey.lastFetch;
    return age < cacheKey.ttl;
  }

  updateCache(service, data, subService = null) {
    if (subService) {
      if (!this.cache[service][subService]) {
        this.cache[service][subService] = { data: null, lastFetch: null, ttl: 0 };
      }
      this.cache[service][subService].data = data;
      this.cache[service][subService].lastFetch = Date.now();
    } else {
      this.cache[service].data = data;
      this.cache[service].lastFetch = Date.now();
    }
  }

  getCachedData(service, subService = null) {
    if (subService) {
      return this.cache[service][subService]?.data || null;
    }
    return this.cache[service]?.data || null;
  }

  logPerformance(service, success, responseTime, error = null, message = '') {
    const log = {
      timestamp: new Date().toLocaleTimeString(),
      service,
      success,
      responseTime,
      error: error?.message || error,
      message: message || (success ? 'Data fetched successfully' : 'Data fetch failed')
    };
    
    this.performanceLogs.unshift(log);
    
    // Keep only last 50 logs
    if (this.performanceLogs.length > 50) {
      this.performanceLogs = this.performanceLogs.slice(0, 50);
    }

    // Update API status
    this.apiStatus[service.toLowerCase()] = {
      isWorking: success,
      lastFetch: success ? new Date().toISOString() : this.apiStatus[service.toLowerCase()]?.lastFetch,
      responseTime,
      error: error?.message || error
    };
  }

  async fetchAllData() {
    try {
      // Fetch Spotify data from internal service (no caching as requested)
      const spotifyStart = Date.now();
      let spotifyData = null;
      let spotifyError = null;
      
      try {
        const spotifyRealtime = getSpotifyRealtime();
        
        if (spotifyRealtime.currentTrack) {
          spotifyData = {
            currentTrack: spotifyRealtime.currentTrack,
            lastUpdated: spotifyRealtime.lastUpdated
          };
        }
      } catch (error) {
        spotifyError = error;
      }
      
      const spotifyResponseTime = Date.now() - spotifyStart;
      this.logPerformance('Spotify', !!spotifyData, spotifyResponseTime, spotifyError);

      // Fetch Discord data with intelligent caching
      const discordStart = Date.now();
      let discordData = null;
      let discordError = null;
      
      try {
        // Check cache first
        if (this.isCacheValid('discord')) {
          discordData = this.getCachedData('discord');
          this.logPerformance('Discord', !!discordData, 0, null, 'Data served from cache');
        } else {
          const discordGateway = getDiscordGateway();
          const freshData = discordGateway.getPresence() ? {
            user: { username: 'Jason' },
            presence: discordGateway.getPresence(),
            connection: discordGateway.getConnectionHealth(),
            lastUpdated: new Date().toISOString()
          } : null;
          
          if (freshData) {
            discordData = freshData;
            this.updateCache('discord', freshData);
          }
        }
      } catch (error) {
        discordError = error;
      }
      
      const discordResponseTime = Date.now() - discordStart;
      if (!this.isCacheValid('discord')) {
        this.logPerformance('Discord', !!discordData, discordResponseTime, discordError);
      }

      // Fetch Steam data with intelligent caching
      const steamStart = Date.now();
      let steamData = null;
      let steamError = null;
      
      try {
        const tokenManager = getTokenManager();
        const steamCreds = await tokenManager.getValidSteamCredentials();
        
        if (steamCreds) {
          const { apiKey: steamApiKey, steamId } = steamCreds;
          
          // Check cache for recent games (24 hour cache)
          let recentGames = this.getCachedData('steam', 'recentGames');
          if (!this.isCacheValid('steam', 'recentGames')) {
            try {
              const recentGamesResponse = await fetch(
                `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&format=json&count=5`
              );
              
              if (recentGamesResponse.ok) {
                const recentGamesData = await recentGamesResponse.json();
                
                recentGames = recentGamesData.response?.games?.map(game => ({
                  name: game.name,
                  appid: game.appid,
                  playtime_2weeks: Math.round((game.playtime_2weeks || 0) / 60 * 10) / 10,
                  playtime_forever: Math.round((game.playtime_forever || 0) / 60 * 10) / 10,
                  img_icon_url: game.img_icon_url
                })) || [];
                
                this.updateCache('steam', recentGames, 'recentGames');
              }
            } catch (error) {
              // If recent games fetch fails, use cached data if available
              if (!recentGames) {
                throw error;
              }
            }
          }

          // Check cache for online status (10 minute cache)
          let playerInfo = this.getCachedData('steam', 'onlineStatus');
          if (!this.isCacheValid('steam', 'onlineStatus')) {
            try {
              const playerSummaryResponse = await fetch(
                `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`
              );
              
              if (playerSummaryResponse.ok) {
                const playerData = await playerSummaryResponse.json();
                
                const player = playerData.response?.players?.[0];
                if (player) {
                  playerInfo = {
                    personaname: player.personaname,
                    personastate: player.personastate,
                    gameextrainfo: player.gameextrainfo,
                    gameid: player.gameid
                  };
                  
                  // Enhanced status detection - check for recent activity
                  const hasRecentPlaytime = recentGames.length > 0 && recentGames[0].playtime_2weeks > 0;
                  const isCurrentlyOnline = player.personastate > 0;
                  
                  // If offline but has recent playtime, show as "Recently Online"
                  if (!isCurrentlyOnline && hasRecentPlaytime) {
                    playerInfo.effectiveStatus = 'recently_online';
                    playerInfo.recentGame = recentGames[0];
                  } else {
                    playerInfo.effectiveStatus = 'current';
                  }
                  
                  this.updateCache('steam', playerInfo, 'onlineStatus');
                }
              }
            } catch (error) {
              // If online status fetch fails, use cached data if available
              if (!playerInfo) {
                throw error;
              }
            }
          }

          steamData = {
            recentGames,
            playerInfo,
            lastUpdated: new Date().toISOString()
          };
        } else {
          throw new Error('Steam credentials not available');
        }
      } catch (error) {
        steamError = error;
      }
      
      const steamResponseTime = Date.now() - steamStart;
      this.logPerformance('Steam', !!steamData, steamResponseTime, steamError);

      // Fetch GitHub data with 8-hour caching
      const githubStart = Date.now();
      let githubData = null;
      let githubError = null;
      
      try {
        // Check cache first
        if (this.isCacheValid('github')) {
          githubData = this.getCachedData('github');
          this.logPerformance('GitHub', !!githubData, 0, null, 'Data served from cache');
        } else {
          const tokenManager = getTokenManager();
          const githubToken = await tokenManager.getValidGitHubToken();
          const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
          
          if (!githubToken) {
            throw new Error('GitHub token not available');
          }
          
          if (!username) {
            throw new Error('GitHub username not configured');
          }
          
          // Fetch user data
          const userResponse = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          
          let userData = null;
          if (userResponse.ok) {
            userData = await userResponse.json();
          }

          // Fetch repositories
          const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          
          let reposData = null;
          if (reposResponse.ok) {
            const repos = await reposResponse.json();
            const topRepos = repos.slice(0, 5).map(repo => ({
              name: repo.name,
              description: repo.description,
              language: repo.language,
              stargazers_count: repo.stargazers_count,
              forks_count: repo.forks_count
            }));
            
            reposData = { topRepos };
          }

          // Fetch commits data for this year
          let commitsData = {
            commitsThisYear: 0,
            lastCommitDate: null
          };
          const currentYear = new Date().getFullYear();
          const startDate = `${currentYear}-01-01`;
          
          try {
            // Get commits count for this year
            const commitsResponse = await fetch(
              `https://api.github.com/search/commits?q=author:${username}+committer-date:>=${startDate}`,
              {
                headers: {
                  'Authorization': `Bearer ${githubToken}`,
                  'Accept': 'application/vnd.github.cloak-preview'
                }
              }
            );
            
            if (commitsResponse.ok) {
              const commitsResult = await commitsResponse.json();
              commitsData.commitsThisYear = commitsResult.total_count || 0;
            }
            
            // Get user events to find last commit date
            const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=10`, {
              headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
              }
            });
            
            if (eventsResponse.ok) {
              const events = await eventsResponse.json();
              const pushEvents = events.filter(event => event.type === 'PushEvent');
              if (pushEvents.length > 0) {
                commitsData.lastCommitDate = pushEvents[0].created_at;
              }
            }
          } catch (error) {
            // Error handling for commits/events fetch
          }

          // Merge all GitHub data
          if (userData || reposData || commitsData) {
            githubData = {
              user: {
                ...userData,
                ...commitsData
              },
              repos: {
                topRepos: reposData?.topRepos || []
              },
              lastUpdated: new Date().toISOString()
            };
            
            this.updateCache('github', githubData);
          } else {
            throw new Error('No GitHub data could be fetched');
          }
        }
      } catch (error) {
        githubError = error;
      }
      
      const githubResponseTime = Date.now() - githubStart;
      if (!this.isCacheValid('github')) {
        this.logPerformance('GitHub', !!githubData, githubResponseTime, githubError);
      }

      // Update current data
      this.currentData = {
        spotify: spotifyData,
        discord: discordData,
        steam: steamData,
        github: githubData,
        lastUpdated: new Date().toISOString()
      };

    } catch (error) {
      // Error handling for fetchAllData
    }
  }

  getPerformanceLogs() {
    return this.performanceLogs;
  }

  getAPIStatus() {
    return this.apiStatus;
  }

  getPerformanceMetrics() {
    const logs = this.performanceLogs;
    if (logs.length === 0) {
      return {
        avgResponseTime: null,
        successRate: 0,
        totalRequests: 0,
        lastUpdate: new Date().toISOString()
      };
    }

    const successfulLogs = logs.filter(log => log.success);
    const avgResponseTime = successfulLogs.length > 0 
      ? Math.round(successfulLogs.reduce((sum, log) => sum + (log.responseTime || 0), 0) / successfulLogs.length)
      : null;
    
    const successRate = Math.round((successfulLogs.length / logs.length) * 100);

    return {
      avgResponseTime,
      successRate,
      totalRequests: logs.length,
      lastUpdate: new Date().toISOString()
    };
  }

  start() {
    if (this.isBroadcasting) return;
    
    this.isBroadcasting = true;
    this.broadcastInterval = setInterval(() => {
      this.fetchAllData();
    }, 120000); // Fetch every 2 minutes (reduced from 30 seconds)
    
    // Initial fetch
    this.fetchAllData();
  }

  stop() {
    if (this.broadcastInterval) {
      clearInterval(this.broadcastInterval);
      this.broadcastInterval = null;
    }
    this.isBroadcasting = false;
  }

  getCurrentData() {
    return this.currentData;
  }

  // Cache management methods for external access
  getCacheInfo() {
    return {
      github: {
        hasData: !!this.cache.github.data,
        lastFetch: this.cache.github.lastFetch,
        age: this.cache.github.lastFetch ? Date.now() - this.cache.github.lastFetch : null,
        isValid: this.isCacheValid('github')
      },
      discord: {
        hasData: !!this.cache.discord.data,
        lastFetch: this.cache.discord.lastFetch,
        age: this.cache.discord.lastFetch ? Date.now() - this.cache.discord.lastFetch : null,
        isValid: this.isCacheValid('discord')
      },
      steam: {
        onlineStatus: {
          hasData: !!this.cache.steam.onlineStatus.data,
          lastFetch: this.cache.steam.onlineStatus.lastFetch,
          age: this.cache.steam.onlineStatus.lastFetch ? Date.now() - this.cache.steam.onlineStatus.lastFetch : null,
          isValid: this.isCacheValid('steam', 'onlineStatus')
        },
        recentGames: {
          hasData: !!this.cache.steam.recentGames.data,
          lastFetch: this.cache.steam.recentGames.lastFetch,
          age: this.cache.steam.recentGames.lastFetch ? Date.now() - this.cache.steam.recentGames.lastFetch : null,
          isValid: this.isCacheValid('steam', 'recentGames')
        }
      }
    };
  }

  clearCache(service = null) {
    if (service) {
      if (service === 'steam') {
        this.cache.steam.onlineStatus = { data: null, lastFetch: null, ttl: 10 * 60 * 1000 };
        this.cache.steam.recentGames = { data: null, lastFetch: null, ttl: 24 * 60 * 60 * 1000 };
      } else {
        this.cache[service] = { data: null, lastFetch: null, ttl: this.cache[service].ttl };
      }
    } else {
      // Clear all caches
      this.cache = {
        github: { data: null, lastFetch: null, ttl: 8 * 60 * 60 * 1000 },
        discord: { data: null, lastFetch: null, ttl: 2 * 60 * 1000 },
        steam: { 
          onlineStatus: { data: null, lastFetch: null, ttl: 10 * 60 * 1000 },
          recentGames: { data: null, lastFetch: null, ttl: 24 * 60 * 60 * 1000 }
        }
      };
    }
  }
}

// Singleton instance
let broadcasterInstance = null;

export function getRealtimeBroadcaster() {
  if (!broadcasterInstance) {
    broadcasterInstance = new RealtimeBroadcaster();
  }
  return broadcasterInstance;
}