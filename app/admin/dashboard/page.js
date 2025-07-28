'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Client component for service status to prevent hydration issues
function ServiceStatus() {
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch('/api/system/status', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          setServices(data.services);
          setError(null);
        } else {
          setError(data.error || 'Unknown error');
        }
      } catch (err) {
        setError('Connection error: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
    
    // Auto-refresh every 10 seconds instead of 2 seconds for real-time updates
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-yellow-400">⏳ Loading service status...</div>;
  }

  if (error) {
    return <div className="text-red-400">❌ Failed to load status: {error}</div>;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>🚀 Startup Manager:</span>
        <span className={services?.startup?.initialized ? 'text-green-400' : 'text-red-400'}>
          {services?.startup?.initialized ? '✅ Ready' : '❌ Not Ready'}
        </span>
      </div>
      <div className="flex justify-between">
        <span>🎵 Spotify:</span>
        <span className={services?.spotify?.hasValidToken && services?.spotify?.realtime?.isPolling ? 'text-green-400' : 'text-red-400'}>
          {services?.spotify?.hasValidToken && services?.spotify?.realtime?.isPolling ? '✅ Active' : '❌ Inactive'}
        </span>
      </div>
      <div className="flex justify-between">
        <span>💬 Discord:</span>
        <span className={services?.discord?.isConnected ? 'text-green-400' : 'text-red-400'}>
          {services?.discord?.isConnected ? '✅ Connected' : '❌ Disconnected'}
        </span>
      </div>
      <div className="flex justify-between">
        <span>🎮 Steam:</span>
        <span className={services?.steam?.hasValidCredentials ? 'text-green-400' : 'text-red-400'}>
          {services?.steam?.hasValidCredentials ? '✅ Valid' : '❌ Invalid'}
        </span>
      </div>
    </div>
  );
}

// Client component for environment status
function EnvironmentStatus() {
  const [environment, setEnvironment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch('/api/system/status', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          setEnvironment(data.environment);
        }
      } catch (err) {
        console.error('Failed to fetch environment status:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
    
    // Refresh every 30 seconds (environment variables don't change often)
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-yellow-400">⏳ Loading environment status...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-3 bg-gray-700 rounded">
        <div className="text-sm text-gray-300">Discord Bot Token</div>
        <div className={environment?.discord?.botToken ? 'text-green-400' : 'text-red-400'}>
          {environment?.discord?.botToken ? '✅ Set' : '❌ Missing'}
        </div>
      </div>
      <div className="p-3 bg-gray-700 rounded">
        <div className="text-sm text-gray-300">Discord User ID</div>
        <div className={environment?.discord?.userId ? 'text-green-400' : 'text-red-400'}>
          {environment?.discord?.userId ? '✅ Set' : '❌ Missing'}
        </div>
      </div>
      <div className="p-3 bg-gray-700 rounded">
        <div className="text-sm text-gray-300">Spotify Client ID</div>
        <div className={environment?.spotify?.clientId ? 'text-green-400' : 'text-red-400'}>
          {environment?.spotify?.clientId ? '✅ Set' : '❌ Missing'}
        </div>
      </div>
      <div className="p-3 bg-gray-700 rounded">
        <div className="text-sm text-gray-300">Steam API Key</div>
        <div className={environment?.steam?.apiKey ? 'text-green-400' : 'text-red-400'}>
          {environment?.steam?.apiKey ? '✅ Set' : '❌ Missing'}
        </div>
      </div>
    </div>
  );
}

// Client component for current activity
function CurrentActivity() {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await fetch('/api/system/status', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          setActivity(data.services);
        }
      } catch (err) {
        console.error('Failed to fetch activity:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
    
    // Auto-refresh every 10 seconds instead of 2 seconds for real-time updates
    const interval = setInterval(fetchActivity, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-yellow-400">⏳ Loading current activity...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-700 rounded">
        <h3 className="text-lg font-semibold mb-2">🎵 Current Music</h3>
        <div className="text-sm">
          {activity?.spotify?.realtime?.isPolling ? (
            <div>
              <div className="text-green-400">✅ Spotify service is actively polling for new tracks</div>
              {activity?.spotify?.realtime?.currentTrack ? (
                <div className="mt-2 text-gray-300">
                  <div className="font-semibold">{activity.spotify.realtime.currentTrack.name}</div>
                  <div>by {activity.spotify.realtime.currentTrack.artist}</div>
                  <div className="text-xs mt-1">
                    {activity.spotify.realtime.currentTrack.is_playing ? '▶️ Playing' : '⏸️ Paused'}
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-gray-400">No current track</div>
              )}
            </div>
          ) : (
            <div className="text-red-400">❌ Spotify service is not active</div>
          )}
        </div>
      </div>
      <div className="p-4 bg-gray-700 rounded">
        <h3 className="text-lg font-semibold mb-2">💬 Discord Status</h3>
        <div className="text-sm">
          {activity?.discord?.isConnected ? (
            <div>
              <div className="text-green-400">✅ Connected to Discord Gateway</div>
              <div className="mt-2 text-gray-300">
                Status: {activity.discord.currentStatus || 'offline'}
              </div>
              {activity.discord.lastPresenceUpdate && (
                <div className="text-xs text-gray-400 mt-1">
                  Last update: {new Date(activity.discord.lastPresenceUpdate).toLocaleString()}
                </div>
              )}
            </div>
          ) : (
            <div className="text-red-400">❌ Not connected to Discord</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main dashboard component
export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Check authentication client-side
    async function checkAuth() {
      try {
        const response = await fetch('/api/system/status', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (response.status === 401) {
          router.push('/api/admin/auth');
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/api/admin/auth');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  // Prevent hydration mismatches
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-yellow-400">⏳ Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-gray-800 border-2 border-green-400 p-8 rounded-lg text-center max-w-md">
            <h1 className="text-2xl mb-4">🔒 ACCESS DENIED</h1>
            <p className="mb-4">Authentication required to access admin dashboard.</p>
            <a 
              href="/api/admin/auth" 
              className="bg-green-400 text-gray-900 px-4 py-2 rounded font-bold hover:bg-green-300 transition-colors"
            >
              LOGIN
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">📊 ADMIN DASHBOARD</h1>
              <p className="text-green-300 mt-2">WhoisJason System Control Panel</p>
            </div>
            <div className="flex gap-4">
              <a 
                href="/api/system/status" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors"
                target="_blank"
              >
                RAW STATUS API
              </a>
              <a 
                href="/api/admin/logout" 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors"
              >
                LOGOUT
              </a>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">🚀 SERVICE STATUS</h2>
            <ServiceStatus />
          </div>

          <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">🔧 QUICK ACTIONS</h2>
            <div className="space-y-3">
              <a 
                href="/api/spotify/auth" 
                className="block bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-500 transition-colors"
              >
                🎵 Spotify Authorization
              </a>
              <a 
                href="/api/spotify/force-poll" 
                className="block bg-purple-600 text-white px-4 py-2 rounded text-center hover:bg-purple-500 transition-colors"
              >
                🔄 Force Spotify Poll
              </a>
              <a 
                href="/api/spotify/recent" 
                className="block bg-orange-600 text-white px-4 py-2 rounded text-center hover:bg-orange-500 transition-colors"
              >
                📋 Recent Tracks
              </a>
            </div>
          </div>
        </div>

        {/* Environment Status */}
        <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">⚙️ ENVIRONMENT CONFIG</h2>
          <EnvironmentStatus />
        </div>

        {/* Current Activity */}
        <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">🎯 CURRENT ACTIVITY</h2>
          <CurrentActivity />
        </div>
      </div>
    </div>
  );
} 