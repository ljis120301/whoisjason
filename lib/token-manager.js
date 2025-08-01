import fs from 'fs/promises';
import path from 'path';

const TOKEN_FILE = '/app/data/tokens.json';
const TOKEN_DIR = '/app/data';

class TokenManager {
  constructor() {
    this.tokens = {};
    this.refreshIntervals = {};
  }

  async init() {
    try {
      // Only create directory and load tokens in production environment
      if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
        try {
          // Ensure data directory exists
          await fs.mkdir(TOKEN_DIR, { recursive: true });
          
          // Load existing tokens
          await this.loadTokens();
        } catch (dirError) {
          // In development, use local directory instead of /app
          if (dirError.code === 'EACCES' || dirError.code === 'ENOENT') {
            this.useLocalStorage = true;
          }
        }
      }
      
      // Start automatic refresh schedules
      this.scheduleTokenRefresh();
    } catch (error) {
    }
  }

  async loadTokens() {
    try {
      const data = await fs.readFile(TOKEN_FILE, 'utf8');
      this.tokens = JSON.parse(data);
    } catch (error) {
      if (error.code !== 'ENOENT') {
      }
      // File doesn't exist, start with empty tokens
      this.tokens = {};
    }
  }

  async saveTokens() {
    try {
      // Skip saving during build time or if using local storage fails
      if (process.env.NODE_ENV === 'production' && !this.useLocalStorage) {
        // Ensure directory exists before writing
        await fs.mkdir(TOKEN_DIR, { recursive: true });
        await fs.writeFile(TOKEN_FILE, JSON.stringify(this.tokens, null, 2));
      } else {
      }
    } catch (error) {
    }
  }

  async refreshSpotifyToken() {
    try {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
      // Prioritize environment variable (which may be updated by auto-auth script)
      let refreshToken = process.env.SPOTIFY_REFRESH_TOKEN || this.tokens.spotify?.refresh_token;

      if (!clientId || !clientSecret || !refreshToken) {
        return null;
      }

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      });

      if (!response.ok) {
        throw new Error(`Spotify token refresh failed: ${response.status}`);
      }

      const tokenData = await response.json();
      
      // Update stored tokens
      this.tokens.spotify = {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token || refreshToken, // Use new refresh token if provided
        expires_at: Date.now() + (tokenData.expires_in * 1000),
        updated_at: Date.now()
      };

      await this.saveTokens();
      return this.tokens.spotify;

    } catch (error) {
      return null;
    }
  }

  async getValidSpotifyToken() {
    // Check if we have a valid token
    if (this.tokens.spotify && this.tokens.spotify.expires_at > Date.now() + 300000) { // 5 min buffer
      return this.tokens.spotify.access_token;
    }

    // Token expired or doesn't exist, refresh it
    const refreshedToken = await this.refreshSpotifyToken();
    return refreshedToken?.access_token || null;
  }

  scheduleTokenRefresh() {
    // Refresh Spotify token every 45 minutes (tokens expire in 1 hour)
    this.refreshIntervals.spotify = setInterval(async () => {
      await this.refreshSpotifyToken();
    }, 45 * 60 * 1000);

    // Validate GitHub token every 6 hours
    this.refreshIntervals.github = setInterval(async () => {
      await this.refreshGitHubToken();
    }, 6 * 60 * 60 * 1000);

    // Validate Steam credentials every 12 hours
    this.refreshIntervals.steam = setInterval(async () => {
      await this.authenticateSteamAutomatically();
    }, 12 * 60 * 60 * 1000);
  }

  async authenticateSpotifyAutomatically() {
    try {
      // Check for refresh token (prioritize environment variable)
      if (process.env.SPOTIFY_REFRESH_TOKEN || this.tokens.spotify?.refresh_token) {
        await this.refreshSpotifyToken();
        return true;
      }

      // For automatic auth in personal portfolio, we could implement
      // a pre-authorized flow here if needed
      return false;

    } catch (error) {
      return false;
    }
  }

  async authenticateDiscordAutomatically() {
    try {
      const botToken = process.env.DISCORD_BOT_TOKEN;
      const userId = process.env.DISCORD_USER_ID;

      if (!botToken || !userId) {
        return false;
      }

      // Test the bot token
      const apiUrl = `https://discord.com/api/v10/users/${userId}`;
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bot ${botToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        return true;
      } else {
        const errorText = await response.text();
        return false;
      }

    } catch (error) {
      // Check for specific network errors
      if (error.code === 'ENOTFOUND') {
      } else if (error.code === 'ECONNREFUSED') {
      } else if (error.code === 'ETIMEDOUT') {
      }
      
      return false;
    }
  }

  async authenticateSteamAutomatically() {
    try {
      const apiKey = process.env.STEAM_API_KEY;
      const steamId = process.env.STEAM_ID;

      if (!apiKey || !steamId) {
        return false;
      }

      // Test Steam API with a simple call
      const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.response && data.response.players && data.response.players.length > 0) {
          this.tokens.steam = {
            api_key: apiKey,
            steam_id: steamId,
            validated_at: Date.now(),
            player_name: data.response.players[0].personaname
          };
          await this.saveTokens();
          return true;
        }
      }
      
      return false;

    } catch (error) {
      return false;
    }
  }

  async authenticateGitHubAutomatically() {
    try {
      const token = process.env.GITHUB_TOKEN;
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

      if (!token || !username) {
        return false;
      }

      // Test GitHub API with user info
      const response = await fetch(`https://api.github.com/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'whoisjason-portfolio'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        
        // Check rate limit
        const rateLimit = {
          limit: response.headers.get('X-RateLimit-Limit'),
          remaining: response.headers.get('X-RateLimit-Remaining'),
          reset: response.headers.get('X-RateLimit-Reset')
        };

        this.tokens.github = {
          token: token,
          username: username,
          validated_at: Date.now(),
          user_data: {
            login: userData.login,
            id: userData.id,
            name: userData.name
          },
          rate_limit: rateLimit
        };
        
        await this.saveTokens();
        return true;
      } else {
        return false;
      }

    } catch (error) {
      return false;
    }
  }

  async refreshGitHubToken() {
    // GitHub personal access tokens don't refresh automatically
    // But we can validate and update rate limit info
    return await this.authenticateGitHubAutomatically();
  }

  async getValidGitHubToken() {
    // Check if we have a valid token (validate every 24 hours instead of 6 hours)
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (this.tokens.github && this.tokens.github.validated_at > Date.now() - twentyFourHours) {
      return this.tokens.github.token;
    }

    // If we have a token but it's expired, try to re-validate it
    if (this.tokens.github && this.tokens.github.token) {
      try {
        const refreshed = await this.refreshGitHubToken();
        if (refreshed) {
          return this.tokens.github.token;
        }
      } catch (error) {
        // Return the existing token even if refresh failed
        return this.tokens.github.token;
      }
    }

    // If no token exists, try to authenticate
    const authenticated = await this.authenticateGitHubAutomatically();
    return authenticated ? this.tokens.github.token : null;
  }

  async getValidSteamCredentials() {
    // Check if we have valid credentials (validate every 12 hours)
    const twelveHours = 12 * 60 * 60 * 1000;
    if (this.tokens.steam && this.tokens.steam.validated_at > Date.now() - twelveHours) {
      return {
        apiKey: this.tokens.steam.api_key,
        steamId: this.tokens.steam.steam_id
      };
    }

    // Re-validate the credentials
    const refreshed = await this.authenticateSteamAutomatically();
    return refreshed ? {
      apiKey: this.tokens.steam.api_key,
      steamId: this.tokens.steam.steam_id
    } : null;
  }

  async initializeAllTokens() {
    const results = await Promise.allSettled([
      this.authenticateSpotifyAutomatically(),
      this.authenticateDiscordAutomatically(),
      this.authenticateSteamAutomatically(),
      this.authenticateGitHubAutomatically()
    ]);

    const services = ['Spotify', 'Discord', 'Steam', 'GitHub'];
    results.forEach((result, index) => {
      const service = services[index];
      if (result.status === 'fulfilled' && result.value) {
      } else {
      }
    });

    return results;
  }

  stopRefreshSchedules() {
    Object.values(this.refreshIntervals).forEach(interval => {
      clearInterval(interval);
    });
    this.refreshIntervals = {};
  }
}

// Global instance
let tokenManagerInstance = null;

export function getTokenManager() {
  if (!tokenManagerInstance) {
    tokenManagerInstance = new TokenManager();
  }
  return tokenManagerInstance;
}

export { TokenManager }; 