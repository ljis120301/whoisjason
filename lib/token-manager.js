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
            console.warn('Using local token storage for development');
            this.useLocalStorage = true;
          }
        }
      }
      
      // Start automatic refresh schedules
      this.scheduleTokenRefresh();
      
      console.log('Token manager initialized');
    } catch (error) {
      console.error('Failed to initialize token manager:', error);
    }
  }

  async loadTokens() {
    try {
      const data = await fs.readFile(TOKEN_FILE, 'utf8');
      this.tokens = JSON.parse(data);
      console.log('Loaded persisted tokens');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error('Failed to load tokens:', error);
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
        console.log('Tokens saved to disk');
      } else {
        console.log('Token save skipped (build time or local development)');
      }
    } catch (error) {
      console.error('Failed to save tokens:', error);
    }
  }

  async refreshSpotifyToken() {
    try {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
      // Prioritize environment variable (which may be updated by auto-auth script)
      let refreshToken = process.env.SPOTIFY_REFRESH_TOKEN || this.tokens.spotify?.refresh_token;

      if (!clientId || !clientSecret || !refreshToken) {
        console.warn('Missing Spotify credentials for token refresh');
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
      console.log('Spotify token refreshed successfully');
      return this.tokens.spotify;

    } catch (error) {
      console.error('Failed to refresh Spotify token:', error);
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

    console.log('Token refresh schedules started for all APIs');
  }

  async authenticateSpotifyAutomatically() {
    try {
      // Check for refresh token (prioritize environment variable)
      if (process.env.SPOTIFY_REFRESH_TOKEN || this.tokens.spotify?.refresh_token) {
        console.log('Spotify refresh token available, refreshing access token');
        await this.refreshSpotifyToken();
        return true;
      }

      // For automatic auth in personal portfolio, we could implement
      // a pre-authorized flow here if needed
      console.warn('No Spotify refresh token available for automatic authentication');
      return false;

    } catch (error) {
      console.error('Spotify automatic authentication failed:', error);
      return false;
    }
  }

  async authenticateDiscordAutomatically() {
    try {
      const botToken = process.env.DISCORD_BOT_TOKEN;
      const userId = process.env.DISCORD_USER_ID;

      if (!botToken || !userId) {
        console.warn('Missing Discord credentials');
        return false;
      }

      // Test the bot token
      const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
        headers: {
          'Authorization': `Bot ${botToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Discord bot token validated successfully');
        return true;
      } else {
        console.error('Discord bot token validation failed:', response.status);
        return false;
      }

    } catch (error) {
      console.error('Discord automatic authentication failed:', error);
      return false;
    }
  }

  async authenticateSteamAutomatically() {
    try {
      const apiKey = process.env.STEAM_API_KEY;
      const steamId = process.env.STEAM_ID;

      if (!apiKey || !steamId) {
        console.warn('Missing Steam credentials');
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
          console.log('Steam API validated successfully');
          return true;
        }
      }
      
      console.error('Steam API validation failed:', response.status);
      return false;

    } catch (error) {
      console.error('Steam automatic authentication failed:', error);
      return false;
    }
  }

  async authenticateGitHubAutomatically() {
    try {
      const token = process.env.GITHUB_TOKEN;
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

      if (!token || !username) {
        console.warn('Missing GitHub credentials');
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
        console.log('GitHub API validated successfully');
        return true;
      } else {
        console.error('GitHub API validation failed:', response.status);
        return false;
      }

    } catch (error) {
      console.error('GitHub automatic authentication failed:', error);
      return false;
    }
  }

  async refreshGitHubToken() {
    // GitHub personal access tokens don't refresh automatically
    // But we can validate and update rate limit info
    return await this.authenticateGitHubAutomatically();
  }

  async getValidGitHubToken() {
    // Check if we have a valid token (validate every 6 hours)
    const sixHours = 6 * 60 * 60 * 1000;
    if (this.tokens.github && this.tokens.github.validated_at > Date.now() - sixHours) {
      return this.tokens.github.token;
    }

    // Re-validate the token
    const refreshed = await this.refreshGitHubToken();
    return refreshed ? this.tokens.github.token : null;
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
    console.log('Initializing all API tokens...');
    
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
        console.log(`✓ ${service} authentication successful`);
      } else {
        console.log(`✗ ${service} authentication failed`);
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