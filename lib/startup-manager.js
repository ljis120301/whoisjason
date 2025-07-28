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
    console.log('[STARTUP-DEBUG] 🚀 Starting initialization process...');
    
    if (this.initialized) {
      console.log('[STARTUP-DEBUG] ⚠️ Startup manager already initialized, skipping');
      console.log('Startup manager already initialized');
      return;
    }

    console.log('[STARTUP-DEBUG] 🔍 Environment check before initialization:');
    console.log('[STARTUP-DEBUG] - NODE_ENV:', process.env.NODE_ENV);
    console.log('[STARTUP-DEBUG] - Current working directory:', process.cwd());
    console.log('[STARTUP-DEBUG] - Platform:', process.platform);
    console.log('[STARTUP-DEBUG] - Node version:', process.version);
    console.log('[STARTUP-DEBUG] - Environment variables:');
    console.log('[STARTUP-DEBUG]   - DISCORD_BOT_TOKEN present:', !!process.env.DISCORD_BOT_TOKEN);
    console.log('[STARTUP-DEBUG]   - DISCORD_USER_ID present:', !!process.env.DISCORD_USER_ID);
    console.log('[STARTUP-DEBUG]   - SPOTIFY_CLIENT_ID present:', !!process.env.SPOTIFY_CLIENT_ID);
    console.log('[STARTUP-DEBUG]   - GITHUB_TOKEN present:', !!process.env.GITHUB_TOKEN);

    console.log('🚀 Starting WhoisJason services initialization...');
    
    try {
      // Initialize Token Manager
      console.log('[STARTUP-DEBUG] 🔐 Starting Token Manager initialization...');
      console.log('🔐 Initializing Token Manager...');
      const tokenManager = getTokenManager();
      await tokenManager.init();
      await tokenManager.initializeAllTokens();
      this.services.tokenManager = true;
      console.log('[STARTUP-DEBUG] ✓ Token Manager initialization completed');
      console.log('✓ Token Manager initialized');

      // Initialize Discord Gateway
      console.log('[STARTUP-DEBUG] 💬 Starting Discord Gateway initialization...');
      console.log('💬 Initializing Discord Gateway...');
      const discordGateway = getDiscordGateway();
      console.log('[STARTUP-DEBUG] - Discord Gateway instance created');
      
      // Gateway connection is started in the constructor, but verify it connects
      console.log('[STARTUP-DEBUG] - Waiting 3 seconds for Discord Gateway connection...');
      setTimeout(() => {
        console.log('[STARTUP-DEBUG] - Checking Discord Gateway connection status...');
        console.log('[STARTUP-DEBUG] - Gateway isConnected:', discordGateway.isConnected);
        console.log('[STARTUP-DEBUG] - Gateway sessionId:', discordGateway.sessionId);
        
        if (discordGateway.isConnected) {
          this.services.discordGateway = true;
          console.log('[STARTUP-DEBUG] ✓ Discord Gateway connected successfully');
          console.log('✓ Discord Gateway initialized and connected');
        } else {
          console.error('[STARTUP-DEBUG] ⚠️ Discord Gateway failed to connect within timeout');
          console.warn('⚠️ Discord Gateway initialized but not connected');
          this.services.discordGateway = false;
        }
      }, 3000); // Give it 3 seconds to connect

      // Initialize Spotify Real-time Service
      console.log('[STARTUP-DEBUG] 🎵 Starting Spotify Real-time Service initialization...');
      console.log('🎵 Initializing Spotify Real-time Service...');
      const spotifyRealtime = getSpotifyRealtime();
      await spotifyRealtime.start();
      console.log('[STARTUP-DEBUG] - Spotify service start() called');
      
      // Verify polling actually started
      console.log('[STARTUP-DEBUG] - Checking Spotify polling status...');
      console.log('[STARTUP-DEBUG] - Spotify isPolling:', spotifyRealtime.isPolling);
      
      if (spotifyRealtime.isPolling) {
        this.services.spotifyRealtime = true;
        console.log('[STARTUP-DEBUG] ✓ Spotify Real-time Service polling started');
        console.log('✓ Spotify Real-time Service initialized');
      } else {
        console.error('[STARTUP-DEBUG] ⚠️ Spotify Real-time Service failed to start polling');
        console.warn('⚠️ Spotify Real-time Service started but not polling');
        this.services.spotifyRealtime = false;
      }

      // Wait a moment for services to connect
      console.log('[STARTUP-DEBUG] ⏰ Waiting 2 seconds for all services to stabilize...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      this.initialized = true;
      console.log('[STARTUP-DEBUG] 🎉 All services initialization completed successfully!');
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