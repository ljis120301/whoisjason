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
      console.log('Startup manager already initialized');
      return;
    }

    console.log('🚀 Starting WhoisJason services initialization...');
    
    try {
      // Initialize Token Manager
      console.log('🔐 Initializing Token Manager...');
      const tokenManager = getTokenManager();
      await tokenManager.init();
      await tokenManager.initializeAllTokens();
      this.services.tokenManager = true;
      console.log('✓ Token Manager initialized');

      // Initialize Discord Gateway
      console.log('💬 Initializing Discord Gateway...');
      const discordGateway = getDiscordGateway();
      // Gateway connection is started in the constructor
      this.services.discordGateway = true;
      console.log('✓ Discord Gateway initialized');

      // Initialize Spotify Real-time Service
      console.log('🎵 Initializing Spotify Real-time Service...');
      const spotifyRealtime = getSpotifyRealtime();
      await spotifyRealtime.start();
      this.services.spotifyRealtime = true;
      console.log('✓ Spotify Real-time Service initialized');

      // Wait a moment for services to connect
      await new Promise(resolve => setTimeout(resolve, 2000));

      this.initialized = true;
      console.log('🎉 All services initialized successfully!');
      this.printStatus();

    } catch (error) {
      console.error('❌ Failed to initialize services:', error);
      throw error;
    }
  }

  printStatus() {
    console.log('\n📊 Service Status:');
    Object.entries(this.services).forEach(([service, status]) => {
      const icon = status ? '✅' : '❌';
      console.log(`${icon} ${service}: ${status ? 'Active' : 'Failed'}`);
    });
    console.log('');
  }

  getStatus() {
    return {
      initialized: this.initialized,
      services: { ...this.services }
    };
  }

  async shutdown() {
    console.log('🛑 Shutting down services...');
    
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

      console.log('✓ All services shut down');
    } catch (error) {
      console.error('Failed to shutdown services:', error);
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

// Auto-initialize when the module is imported
let autoInitPromise = null;

export function autoInitialize() {
  if (!autoInitPromise) {
    autoInitPromise = (async () => {
      try {
        // Skip initialization during build time
        if (process.env.NEXT_PHASE !== 'phase-production-build') {
          // Small delay to ensure environment is ready
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const manager = getStartupManager();
          await manager.initialize();
        } else {
          console.log('Skipping auto-initialization during build');
        }
      } catch (error) {
        console.error('Auto-initialization failed:', error);
      }
    })();
  }
  return autoInitPromise;
}

export { StartupManager }; 