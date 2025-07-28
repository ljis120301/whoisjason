import { getSpotifyRealtime } from './spotify-realtime.js';
import { getDiscordGateway } from './discord-gateway.js';
import { getTokenManager } from './token-manager.js';

class RealtimeBroadcaster {
  constructor() {
    this.clients = new Set();
    this.broadcastInterval = null;
    this.currentData = {
      spotify: null,
      discord: null,
      steam: null,
      github: null,
      lastUpdated: null
    };
    this.isBroadcasting = false;
  }

  addClient(client) {
    this.clients.add(client);
    // Send current data immediately to new client
    if (this.currentData.lastUpdated) {
      client.send(JSON.stringify({
        type: 'data',
        data: this.currentData
      }));
    }
  }

  removeClient(client) {
    this.clients.delete(client);
  }

  async fetchAllData() {
    try {
      // Fetch Spotify data from internal service
      const spotifyRealtime = getSpotifyRealtime();
      const spotifyData = spotifyRealtime.currentTrack ? {
        currentTrack: spotifyRealtime.currentTrack,
        lastUpdated: spotifyRealtime.lastUpdated
      } : null;

      // Fetch Discord data from internal service
      const discordGateway = getDiscordGateway();
      const discordData = discordGateway.getPresence() ? {
        user: { username: 'Jason' },
        presence: discordGateway.getPresence(),
        connection: discordGateway.getConnectionHealth(),
        lastUpdated: new Date().toISOString()
      } : null;

      // Fetch Steam data (server-side only)
      let steamData = null;
      try {
        const tokenManager = getTokenManager();
        const steamCreds = await tokenManager.getValidSteamCredentials();
        
        if (steamCreds) {
          const { apiKey: steamApiKey, steamId } = steamCreds;
          
          // Get recently played games
          const recentGamesResponse = await fetch(
            `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&format=json&count=5`
          );
          
          let recentGames = [];
          if (recentGamesResponse.ok) {
            const recentGamesData = await recentGamesResponse.json();
            recentGames = recentGamesData.response?.games?.map(game => ({
              name: game.name,
              appid: game.appid,
              playtime_2weeks: Math.round((game.playtime_2weeks || 0) / 60 * 10) / 10,
              playtime_forever: Math.round((game.playtime_forever || 0) / 60 * 10) / 10,
              img_icon_url: game.img_icon_url
            })) || [];
          }

          // Get player summary
          const playerSummaryResponse = await fetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`
          );
          
          let playerInfo = {};
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
            }
          }

          steamData = {
            recentGames,
            playerInfo,
            lastUpdated: new Date().toISOString()
          };
        }
      } catch (error) {
        console.warn('Steam data fetch failed:', error.message);
      }

      // Fetch GitHub data (server-side only)
      let githubData = null;
      try {
        const tokenManager = getTokenManager();
        const githubToken = await tokenManager.getValidGitHubToken();
        const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
        
        if (githubToken && username) {
          // Fetch user data
          const userResponse = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'whoisjason-portfolio'
            }
          });
          
          let userData = null;
          if (userResponse.ok) {
            userData = await userResponse.json();
          }

          // Fetch repos data
          const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'whoisjason-portfolio'
            }
          });
          
          let reposData = null;
          if (reposResponse.ok) {
            const repos = await reposResponse.json();
            const publicRepos = repos.filter(repo => !repo.fork && !repo.private);
            const totalStars = publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            const topRepos = publicRepos
              .sort((a, b) => b.stargazers_count - a.stargazers_count)
              .slice(0, 5)
              .map(repo => ({
                name: repo.name,
                description: repo.description,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language,
                updated_at: repo.updated_at,
                html_url: repo.html_url
              }));
            
            reposData = {
              topRepos,
              totalStars,
              totalRepos: publicRepos.length
            };
          }

          if (userData || reposData) {
            githubData = {
              user: userData,
              repos: reposData,
              lastUpdated: new Date().toISOString()
            };
          }
        }
      } catch (error) {
        console.warn('GitHub data fetch failed:', error.message);
      }

      // Update current data
      this.currentData = {
        spotify: spotifyData,
        discord: discordData,
        steam: steamData,
        github: githubData,
        lastUpdated: new Date().toISOString()
      };

      return this.currentData;
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      return this.currentData;
    }
  }

  broadcast(data) {
    const message = JSON.stringify({
      type: 'data',
      data: data
    });

    this.clients.forEach(client => {
      try {
        if (client.readyState === 1) { // WebSocket.OPEN
          client.send(message);
        } else {
          this.removeClient(client);
        }
      } catch (error) {
        console.error('Error broadcasting to client:', error);
        this.removeClient(client);
      }
    });
  }

  start() {
    if (this.isBroadcasting) return;
    
    this.isBroadcasting = true;
    
    // Initial fetch
    this.fetchAllData().then(data => {
      this.broadcast(data);
    });

    // Set up periodic broadcasting
    this.broadcastInterval = setInterval(async () => {
      const data = await this.fetchAllData();
      this.broadcast(data);
    }, 30000); // Broadcast every 30 seconds
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
}

// Global instance
let broadcasterInstance = null;

export function getRealtimeBroadcaster() {
  if (!broadcasterInstance) {
    broadcasterInstance = new RealtimeBroadcaster();
  }
  return broadcasterInstance;
}

export { RealtimeBroadcaster };