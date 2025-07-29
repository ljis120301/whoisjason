import { getTokenManager } from './token-manager.js';
import { getDiscordGateway } from './discord-gateway.js';
import { getSpotifyRealtime } from './spotify-realtime.js';

class StartupManager {
  constructor() {
    this.initialized = false;
    this.services = {
      tokenManager: false,
      discordGateway: false,
      spotifyRealtime: false
    };
  }

  async initialize() {
    if (this.initialized) {
      return;
    }
    
    try {
      // Initialize Token Manager first
      const tokenManager = getTokenManager();
      await tokenManager.init();
      await tokenManager.initializeAllTokens();
      this.services.tokenManager = true;

      // Initialize both services independently
      const discordGateway = getDiscordGateway();
      const spotifyRealtime = getSpotifyRealtime();
      
      // Start Spotify first (it's more reliable)
      await spotifyRealtime.start();
      this.services.spotifyRealtime = spotifyRealtime.isPolling;
      
      // Then check Discord connection (with longer timeout)
      const discordConnected = await this.waitForDiscordConnection(discordGateway, 10000);
      this.services.discordGateway = discordConnected;
      
      // Verify both services are working
      await this.verifyServices();

      // Start real-time broadcaster for data fetching
      const { getRealtimeBroadcaster } = await import('./realtime-broadcaster.js');
      const broadcaster = getRealtimeBroadcaster();
      broadcaster.start();

      // Final status check
      await this.updateServiceStatus();

      this.initialized = true;
      this.printStatus();

    } catch (error) {
      throw error;
    }
  }

  // Method to verify both services are working
  async verifyServices() {
    const spotifyRealtime = getSpotifyRealtime();
    const discordGateway = getDiscordGateway();
    
    // Verify Spotify is polling
    if (!spotifyRealtime.isPolling) {
      // Try to restart Spotify
      await spotifyRealtime.start();
      this.services.spotifyRealtime = spotifyRealtime.isPolling;
    }
    
    // Verify Discord is connected - be more lenient
    const discordHealth = discordGateway.getConnectionHealth();
    if (!discordHealth.isConnected) {
      this.services.discordGateway = false;
    } else if (discordHealth.isConnected && discordHealth.sessionId) {
      // If connected and has session, consider it working
      this.services.discordGateway = true;
    }
  }

  // Helper method to wait for Discord connection
  async waitForDiscordConnection(discordGateway, timeout = 10000) {
    const start = Date.now();
    
    while (Date.now() - start < timeout) {
      if (discordGateway.isConnected) {
        // Check if we have a valid session
        const health = discordGateway.getConnectionHealth();
        if (health.sessionId) {
          return true;
        }
      }
      
      // Check every 200ms for faster response
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    return false;
  }

  // Method to update service status dynamically
  async updateServiceStatus() {
    try {
      const tokenManager = getTokenManager();
      const discordGateway = getDiscordGateway();
      const spotifyRealtime = getSpotifyRealtime();

      // Update status based on current state
      this.services.tokenManager = !!tokenManager && tokenManager.initialized;
      
      // More robust Discord status checking
      if (discordGateway) {
        const health = discordGateway.getConnectionHealth();
        this.services.discordGateway = health.isConnected && health.sessionId;
      } else {
        this.services.discordGateway = false;
      }
      
      // More robust Spotify status checking
      if (spotifyRealtime) {
        this.services.spotifyRealtime = spotifyRealtime.isPolling && !!spotifyRealtime.pollInterval;
      } else {
        this.services.spotifyRealtime = false;
      }

    } catch (error) {
      // If there's an error, mark services as failed
      this.services.tokenManager = false;
      this.services.discordGateway = false;
      this.services.spotifyRealtime = false;
    }
  }

  printStatus() {
    Object.entries(this.services).forEach(([service, status]) => {
      const icon = status ? '✅' : '❌';
    });
  }

  getStatus() {
    // Update service status before returning
    try {
      const tokenManager = getTokenManager();
      const discordGateway = getDiscordGateway();
      const spotifyRealtime = getSpotifyRealtime();

      // Get real-time status with improved checking
      const currentStatus = {
        initialized: this.initialized,
        tokenManager: !!tokenManager && tokenManager.initialized,
        discordGateway: false,
        spotifyRealtime: false
      };
      
      // More robust Discord status checking
      if (discordGateway) {
        const health = discordGateway.getConnectionHealth();
        currentStatus.discordGateway = health.isConnected && health.sessionId;
      }
      
      // More robust Spotify status checking
      if (spotifyRealtime) {
        currentStatus.spotifyRealtime = spotifyRealtime.isPolling && !!spotifyRealtime.pollInterval;
      }
      
      // Update our stored status
      this.services.tokenManager = currentStatus.tokenManager;
      this.services.discordGateway = currentStatus.discordGateway;
      this.services.spotifyRealtime = currentStatus.spotifyRealtime;

      return {
        initialized: this.initialized,
        services: this.services
      };
    } catch (error) {
      return {
        initialized: this.initialized,
        services: this.services
      };
    }
  }

  async shutdown() {
    try {
      // Stop token refresh schedules
      const tokenManager = getTokenManager();
      tokenManager.stopRefreshSchedules();

      // Disconnect Discord Gateway
      const discordGateway = getDiscordGateway();
      discordGateway.disconnect();

      // Stop Spotify Real-time Service
      const spotifyRealtime = getSpotifyRealtime();
      await spotifyRealtime.stop();

      this.initialized = false;
      Object.keys(this.services).forEach(service => {
        this.services[service] = false;
      });
    } catch (error) {
    }
  }
}

// Global instance
let startupManagerInstance = null;

export function getStartupManager() {
  if (!startupManagerInstance) {
    startupManagerInstance = new StartupManager();
  }
  return startupManagerInstance;
}

// Auto-initialization function
export async function autoInitialize() {
  const startupManager = getStartupManager();
  
  if (!startupManager.initialized) {
    await startupManager.initialize();
  } else {
    // Refresh status to ensure accuracy
    await startupManager.updateServiceStatus();
  }
  
  return startupManager.getStatus();
}

export { StartupManager }; 