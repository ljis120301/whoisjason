import { NextResponse } from 'next/server';
import { isAuthenticated } from '../../../../lib/auth.js';
import { getStartupManager } from '../../../../lib/startup-manager.js';
import { getRealtimeBroadcaster } from '../../../../lib/realtime-broadcaster.js';

export async function GET(request) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const startupManager = getStartupManager();
    const broadcaster = getRealtimeBroadcaster();
    const currentData = broadcaster.getCurrentData();
    const apiStatus = broadcaster.getAPIStatus();
    const performanceMetrics = broadcaster.getPerformanceMetrics();
    const fetchLogs = broadcaster.getPerformanceLogs();
    const cacheInfo = broadcaster.getCacheInfo();

    // Determine actual service status based on working APIs, not startup manager flags
    const services = {
      startup: {
        initialized: startupManager.isInitialized
      },
      spotify: {
        hasValidToken: apiStatus.spotify.isWorking, // Use actual API status
        realtime: {
          isPolling: apiStatus.spotify.isWorking, // Use actual API status
          currentTrack: currentData.spotify?.currentTrack
        }
      },
      discord: {
        isConnected: apiStatus.discord.isWorking, // Use actual API status
        currentStatus: currentData.discord?.presence?.status || 'offline',
        lastPresenceUpdate: currentData.discord?.lastUpdated
      },
      steam: {
        hasValidCredentials: apiStatus.steam.isWorking // Use actual API status
      }
    };

    return NextResponse.json({
      success: true,
      apiStatus,
      performance: performanceMetrics,
      fetchLogs,
      cacheInfo,
      services,
      environment: {
        discord: {
          botToken: !!process.env.DISCORD_BOT_TOKEN,
          userId: !!process.env.DISCORD_USER_ID
        },
        spotify: {
          clientId: !!process.env.SPOTIFY_CLIENT_ID
        },
        steam: {
          apiKey: !!process.env.STEAM_API_KEY
        }
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get system status', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, service } = body;

    if (action === 'clearCache') {
      const broadcaster = getRealtimeBroadcaster();
      
      if (service) {
        broadcaster.clearCache(service);
        return NextResponse.json({
          success: true,
          message: `Cache cleared for ${service}`,
          timestamp: new Date().toISOString()
        });
      } else {
        broadcaster.clearCache();
        return NextResponse.json({
          success: true,
          message: 'All caches cleared',
          timestamp: new Date().toISOString()
        });
      }
    }

    if (action === 'forceRefresh') {
      const broadcaster = getRealtimeBroadcaster();
      
      if (service) {
        broadcaster.clearCache(service);
      } else {
        broadcaster.clearCache();
      }
      
      // Trigger immediate data fetch
      await broadcaster.fetchAllData();
      
      return NextResponse.json({
        success: true,
        message: service ? `Forced refresh for ${service}` : 'Forced refresh for all services',
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to perform action', details: error.message },
      { status: 500 }
    );
  }
}