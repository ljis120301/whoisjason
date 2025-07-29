'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Client component for real-time API status
function APIStatus() {
  const [apiStatus, setApiStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAPIStatus() {
      try {
        const response = await fetch('/api/admin/system-status', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (response.status === 401) {
          setError('Authentication required');
          return;
        }
        
        const data = await response.json();
        
        if (response.ok) {
          setApiStatus(data);
          setError(null);
        } else {
          setError(data.error || 'Unknown error');
        }
      } catch (err) {
        // Only log errors that aren't authentication related
        if (!err.message.includes('401') && !err.message.includes('Unauthorized')) {
          // console.error('API Status fetch error:', err);
        }
        setError('Connection error: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAPIStatus();
    
    // Auto-refresh every 30 seconds for real-time updates (reduced from 5 seconds)
    const interval = setInterval(fetchAPIStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-yellow-400">⏳ Loading API status...</div>;
  }

  if (error) {
    return <div className="text-red-400">❌ {error}</div>;
  }

  return (
    <div className="space-y-4">
      {/* GitHub API Status */}
      <div className="p-4 bg-gray-700 rounded border-l-4 border-blue-400">
        <h3 className="text-lg font-semibold mb-2">🐙 GitHub API</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-300">Status:</span>
            <span className={apiStatus.github?.isWorking ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
              {apiStatus.github?.isWorking ? '✅ Working' : '❌ Failed'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Last Fetch:</span>
            <span className="text-blue-400 ml-2">
              {apiStatus.github?.lastFetch ? new Date(apiStatus.github.lastFetch).toLocaleTimeString() : 'Never'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Response Time:</span>
            <span className="text-yellow-400 ml-2">
              {apiStatus.github?.responseTime ? `${apiStatus.github.responseTime}ms` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Rate Limit:</span>
            <span className="text-purple-400 ml-2">
              {apiStatus.github?.rateLimit ? `${apiStatus.github.rateLimit.remaining}/${apiStatus.github.rateLimit.limit}` : 'N/A'}
            </span>
          </div>
        </div>
        {apiStatus.github?.error && (
          <div className="mt-2 text-red-400 text-xs">
            Error: {apiStatus.github.error}
          </div>
        )}
      </div>

      {/* Spotify API Status */}
      <div className="p-4 bg-gray-700 rounded border-l-4 border-green-400">
        <h3 className="text-lg font-semibold mb-2">🎵 Spotify API</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-300">Status:</span>
            <span className={apiStatus.spotify?.isWorking ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
              {apiStatus.spotify?.isWorking ? '✅ Working' : '❌ Failed'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Last Fetch:</span>
            <span className="text-blue-400 ml-2">
              {apiStatus.spotify?.lastFetch ? new Date(apiStatus.spotify.lastFetch).toLocaleTimeString() : 'Never'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Response Time:</span>
            <span className="text-yellow-400 ml-2">
              {apiStatus.spotify?.responseTime ? `${apiStatus.spotify.responseTime}ms` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Token Valid:</span>
            <span className={apiStatus.spotify?.hasValidToken ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
              {apiStatus.spotify?.hasValidToken ? '✅ Yes' : '❌ No'}
            </span>
          </div>
        </div>
        {apiStatus.spotify?.currentTrack && (
          <div className="mt-2 p-2 bg-gray-600 rounded text-xs">
            <div className="text-green-400">Current Track:</div>
            <div className="text-gray-300">{apiStatus.spotify.currentTrack.name} - {apiStatus.spotify.currentTrack.artist}</div>
            <div className="text-gray-400">{apiStatus.spotify.currentTrack.is_playing ? '▶️ Playing' : '⏸️ Paused'}</div>
          </div>
        )}
        {apiStatus.spotify?.error && (
          <div className="mt-2 text-red-400 text-xs">
            Error: {apiStatus.spotify.error}
          </div>
        )}
      </div>

      {/* Discord API Status */}
      <div className="p-4 bg-gray-700 rounded border-l-4 border-purple-400">
        <h3 className="text-lg font-semibold mb-2">💬 Discord API</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-300">Status:</span>
            <span className={apiStatus.discord?.isWorking ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
              {apiStatus.discord?.isWorking ? '✅ Working' : '❌ Failed'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Last Fetch:</span>
            <span className="text-blue-400 ml-2">
              {apiStatus.discord?.lastFetch ? new Date(apiStatus.discord.lastFetch).toLocaleTimeString() : 'Never'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Response Time:</span>
            <span className="text-yellow-400 ml-2">
              {apiStatus.discord?.responseTime ? `${apiStatus.discord.responseTime}ms` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Gateway Connected:</span>
            <span className={apiStatus.discord?.isConnected ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
              {apiStatus.discord?.isConnected ? '✅ Yes' : '❌ No'}
            </span>
          </div>
        </div>
        {apiStatus.discord?.presence && (
          <div className="mt-2 p-2 bg-gray-600 rounded text-xs">
            <div className="text-purple-400">Current Status:</div>
            <div className="text-gray-300">{apiStatus.discord.presence.status}</div>
          </div>
        )}
        {apiStatus.discord?.error && (
          <div className="mt-2 text-red-400 text-xs">
            Error: {apiStatus.discord.error}
          </div>
        )}
      </div>

      {/* Steam API Status */}
      <div className="p-4 bg-gray-700 rounded border-l-4 border-orange-400">
        <h3 className="text-lg font-semibold mb-2">🎮 Steam API</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-300">Status:</span>
            <span className={apiStatus.steam?.isWorking ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
              {apiStatus.steam?.isWorking ? '✅ Working' : '❌ Failed'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Last Fetch:</span>
            <span className="text-blue-400 ml-2">
              {apiStatus.steam?.lastFetch ? new Date(apiStatus.steam.lastFetch).toLocaleTimeString() : 'Never'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Response Time:</span>
            <span className="text-yellow-400 ml-2">
              {apiStatus.steam?.responseTime ? `${apiStatus.steam.responseTime}ms` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">API Key Valid:</span>
            <span className={apiStatus.steam?.hasValidCredentials ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
              {apiStatus.steam?.hasValidCredentials ? '✅ Yes' : '❌ No'}
            </span>
          </div>
        </div>
        {apiStatus.steam?.playerInfo && (
          <div className="mt-2 p-2 bg-gray-600 rounded text-xs">
            <div className="text-orange-400">Player Status:</div>
            <div className="text-gray-300">{apiStatus.steam.playerInfo.personaname}</div>
            <div className="text-gray-400">
              {apiStatus.steam.playerInfo.personastate === 0 ? 'Offline' :
               apiStatus.steam.playerInfo.personastate === 1 ? 'Online' :
               apiStatus.steam.playerInfo.personastate === 2 ? 'Busy' :
               apiStatus.steam.playerInfo.personastate === 3 ? 'Away' :
               apiStatus.steam.playerInfo.personastate === 4 ? 'Snooze' :
               apiStatus.steam.playerInfo.personastate === 5 ? 'Looking to trade' :
               apiStatus.steam.playerInfo.personastate === 6 ? 'Looking to play' : 'Unknown'}
            </div>
            {apiStatus.steam.playerInfo.gameextrainfo && (
              <div className="text-gray-300">Playing: {apiStatus.steam.playerInfo.gameextrainfo}</div>
            )}
          </div>
        )}
        {apiStatus.steam?.error && (
          <div className="mt-2 text-red-400 text-xs">
            Error: {apiStatus.steam.error}
          </div>
        )}
      </div>
    </div>
  );
}

// Client component for data fetching logs
function DataFetchingLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await fetch('/api/admin/system-status', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (response.status === 401) {
          setError('Authentication required');
          return;
        }
        
        const data = await response.json();
        
        if (response.ok && data.fetchLogs) {
          setLogs(data.fetchLogs);
          setError(null);
        } else {
          setError(data.error || 'Failed to fetch logs');
        }
      } catch (err) {
        // Only log errors that aren't authentication related
        if (!err.message.includes('401') && !err.message.includes('Unauthorized')) {
          // console.error('Failed to fetch logs:', err);
        }
        setError('Connection error: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
    
    // Refresh every 30 seconds for real-time logs (reduced from 3 seconds)
    const interval = setInterval(fetchLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-yellow-400">⏳ Loading fetch logs...</div>;
  }

  if (error) {
    return <div className="text-red-400">❌ {error}</div>;
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {logs.length === 0 ? (
        <div className="text-gray-400">No fetch logs available</div>
      ) : (
        logs.map((log, index) => (
          <div key={index} className="p-2 bg-gray-700 rounded text-xs font-mono">
            <div className="flex justify-between items-start">
              <span className="text-blue-400">{log.timestamp}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                log.success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {log.success ? 'SUCCESS' : 'FAILED'}
              </span>
            </div>
            <div className="text-gray-300 mt-1">
              <span className="text-yellow-400">{log.service}:</span> {log.message}
            </div>
            {log.responseTime && (
              <div className="text-gray-400 mt-1">
                Response time: {log.responseTime}ms
              </div>
            )}
            {log.error && (
              <div className="text-red-400 mt-1">
                Error: {log.error}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// Client component for performance metrics
function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch('/api/admin/system-status', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (response.status === 401) {
          setError('Authentication required');
          return;
        }
        
        const data = await response.json();
        
        if (response.ok && data.performance) {
          setMetrics(data.performance);
          setError(null);
        } else {
          setError(data.error || 'Failed to fetch metrics');
        }
      } catch (err) {
        // Only log errors that aren't authentication related
        if (!err.message.includes('401') && !err.message.includes('Unauthorized')) {
          // console.error('Failed to fetch metrics:', err);
        }
        setError('Connection error: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
    
    // Refresh every 60 seconds (reduced from 10 seconds)
    const interval = setInterval(fetchMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-yellow-400">⏳ Loading performance metrics...</div>;
  }

  if (error) {
    return <div className="text-red-400">❌ {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-3 bg-gray-700 rounded text-center">
        <div className="text-sm text-gray-300">Avg Response Time</div>
        <div className="text-2xl font-bold text-yellow-400">
          {metrics.avgResponseTime ? `${metrics.avgResponseTime}ms` : 'N/A'}
        </div>
      </div>
      <div className="p-3 bg-gray-700 rounded text-center">
        <div className="text-sm text-gray-300">Success Rate</div>
        <div className="text-2xl font-bold text-green-400">
          {metrics.successRate ? `${metrics.successRate}%` : 'N/A'}
        </div>
      </div>
      <div className="p-3 bg-gray-700 rounded text-center">
        <div className="text-sm text-gray-300">Total Requests</div>
        <div className="text-2xl font-bold text-blue-400">
          {metrics.totalRequests || 'N/A'}
        </div>
      </div>
      <div className="p-3 bg-gray-700 rounded text-center">
        <div className="text-sm text-gray-300">Last Update</div>
        <div className="text-lg font-bold text-purple-400">
          {metrics.lastUpdate ? new Date(metrics.lastUpdate).toLocaleTimeString() : 'N/A'}
        </div>
      </div>
    </div>
  );
}

// Client component for cache status
function CacheStatus() {
  const [cacheInfo, setCacheInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCacheInfo() {
      try {
        const response = await fetch('/api/admin/system-status', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (response.status === 401) {
          setError('Authentication required');
          return;
        }
        
        const data = await response.json();
        
        if (response.ok && data.cacheInfo) {
          setCacheInfo(data.cacheInfo);
          setError(null);
        } else {
          setError(data.error || 'Failed to fetch cache info');
        }
      } catch (err) {
        // Only log errors that aren't authentication related
        if (!err.message.includes('401') && !err.message.includes('Unauthorized')) {
          // console.error('Failed to fetch cache info:', err);
        }
        setError('Connection error: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCacheInfo();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchCacheInfo, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-yellow-400">⏳ Loading cache status...</div>;
  }

  if (error) {
    return <div className="text-red-400">❌ {error}</div>;
  }

  const formatAge = (age) => {
    if (!age) return 'N/A';
    const minutes = Math.floor(age / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${Math.floor(age / 1000)}s`;
  };

  return (
    <div className="space-y-4">
      {/* GitHub Cache Status */}
      <div className="p-4 bg-gray-700 rounded border-l-4 border-blue-400">
        <h3 className="text-lg font-semibold mb-2">🐙 GitHub Cache (8h TTL)</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-300">Status:</span>
            <span className={cacheInfo.github?.isValid ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
              {cacheInfo.github?.isValid ? '✅ Valid' : '❌ Expired'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Age:</span>
            <span className="text-blue-400 ml-2">
              {formatAge(cacheInfo.github?.age)}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Last Fetch:</span>
            <span className="text-yellow-400 ml-2">
              {cacheInfo.github?.lastFetch ? new Date(cacheInfo.github.lastFetch).toLocaleTimeString() : 'Never'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Has Data:</span>
            <span className={cacheInfo.github?.hasData ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
              {cacheInfo.github?.hasData ? '✅ Yes' : '❌ No'}
            </span>
          </div>
        </div>
      </div>

      {/* Discord Cache Status */}
      <div className="p-4 bg-gray-700 rounded border-l-4 border-purple-400">
        <h3 className="text-lg font-semibold mb-2">💬 Discord Cache (2m TTL)</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-300">Status:</span>
            <span className={cacheInfo.discord?.isValid ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
              {cacheInfo.discord?.isValid ? '✅ Valid' : '❌ Expired'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Age:</span>
            <span className="text-blue-400 ml-2">
              {formatAge(cacheInfo.discord?.age)}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Last Fetch:</span>
            <span className="text-yellow-400 ml-2">
              {cacheInfo.discord?.lastFetch ? new Date(cacheInfo.discord.lastFetch).toLocaleTimeString() : 'Never'}
            </span>
          </div>
          <div>
            <span className="text-gray-300">Has Data:</span>
            <span className={cacheInfo.discord?.hasData ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
              {cacheInfo.discord?.hasData ? '✅ Yes' : '❌ No'}
            </span>
          </div>
        </div>
      </div>

      {/* Steam Cache Status */}
      <div className="p-4 bg-gray-700 rounded border-l-4 border-orange-400">
        <h3 className="text-lg font-semibold mb-2">🎮 Steam Cache</h3>
        
        {/* Online Status Cache */}
        <div className="mb-3 p-3 bg-gray-600 rounded">
          <h4 className="text-md font-semibold mb-2 text-orange-300">Online Status (10m TTL)</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-300">Status:</span>
              <span className={cacheInfo.steam?.onlineStatus?.isValid ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
                {cacheInfo.steam?.onlineStatus?.isValid ? '✅ Valid' : '❌ Expired'}
              </span>
            </div>
            <div>
              <span className="text-gray-300">Age:</span>
              <span className="text-blue-400 ml-2">
                {formatAge(cacheInfo.steam?.onlineStatus?.age)}
              </span>
            </div>
            <div>
              <span className="text-gray-300">Last Fetch:</span>
              <span className="text-yellow-400 ml-2">
                {cacheInfo.steam?.onlineStatus?.lastFetch ? new Date(cacheInfo.steam.onlineStatus.lastFetch).toLocaleTimeString() : 'Never'}
              </span>
            </div>
            <div>
              <span className="text-gray-300">Has Data:</span>
              <span className={cacheInfo.steam?.onlineStatus?.hasData ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
                {cacheInfo.steam?.onlineStatus?.hasData ? '✅ Yes' : '❌ No'}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Games Cache */}
        <div className="p-3 bg-gray-600 rounded">
          <h4 className="text-md font-semibold mb-2 text-orange-300">Recent Games (24h TTL)</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-300">Status:</span>
              <span className={cacheInfo.steam?.recentGames?.isValid ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
                {cacheInfo.steam?.recentGames?.isValid ? '✅ Valid' : '❌ Expired'}
              </span>
            </div>
            <div>
              <span className="text-gray-300">Age:</span>
              <span className="text-blue-400 ml-2">
                {formatAge(cacheInfo.steam?.recentGames?.age)}
              </span>
            </div>
            <div>
              <span className="text-gray-300">Last Fetch:</span>
              <span className="text-yellow-400 ml-2">
                {cacheInfo.steam?.recentGames?.lastFetch ? new Date(cacheInfo.steam.recentGames.lastFetch).toLocaleTimeString() : 'Never'}
              </span>
            </div>
            <div>
              <span className="text-gray-300">Has Data:</span>
              <span className={cacheInfo.steam?.recentGames?.hasData ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
                {cacheInfo.steam?.recentGames?.hasData ? '✅ Yes' : '❌ No'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Spotify Status (No Cache) */}
      <div className="p-4 bg-gray-700 rounded border-l-4 border-green-400">
        <h3 className="text-lg font-semibold mb-2">🎵 Spotify (No Cache - Real-time)</h3>
        <div className="text-sm text-gray-300">
          Spotify data is fetched in real-time without caching as requested. This ensures the most up-to-date track information.
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
        const response = await fetch('/api/admin/system-status', {
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
        // Only log errors that aren't authentication related
        if (!error.message.includes('401') && !error.message.includes('Unauthorized')) {
          // console.error('Auth check failed:', error);
        }
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">🔍 API MONITORING DASHBOARD</h1>
              <p className="text-green-300 mt-2">Real-time API status and performance monitoring</p>
            </div>
            <div className="flex gap-4">
              <a 
                href="/api/admin/system-status" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors"
                target="_blank"
              >
                RAW API DATA
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

        {/* Cache Status */}
        <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">💾 CACHE STATUS</h2>
          <CacheStatus />
        </div>

        {/* API Status */}
        <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">📡 API STATUS</h2>
          <APIStatus />
        </div>

        {/* Performance Metrics */}
        <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">📊 PERFORMANCE METRICS</h2>
          <PerformanceMetrics />
        </div>

        {/* Data Fetching Logs */}
        <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">📝 DATA FETCHING LOGS</h2>
          <DataFetchingLogs />
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">⚡ QUICK ACTIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <a 
              href="/api/spotify/auth" 
              className="block bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-500 transition-colors"
            >
              🎵 Spotify Auth
            </a>
            <a 
              href="/api/spotify/force-poll" 
              className="block bg-purple-600 text-white px-4 py-2 rounded text-center hover:bg-purple-500 transition-colors"
            >
              🔄 Force Poll
            </a>
            <a 
              href="/api/spotify/recent" 
              className="block bg-orange-600 text-white px-4 py-2 rounded text-center hover:bg-orange-500 transition-colors"
            >
              📋 Recent Tracks
            </a>
          </div>
          
          {/* Cache Management */}
          <div className="border-t border-gray-600 pt-4">
            <h3 className="text-lg font-semibold mb-3">💾 Cache Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <button 
                onClick={async () => {
                  try {
                    const response = await fetch('/api/admin/system-status', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ action: 'clearCache' })
                    });
                    if (response.ok) {
                      alert('All caches cleared successfully!');
                      window.location.reload();
                    }
                  } catch (error) {
                    alert('Failed to clear caches: ' + error.message);
                  }
                }}
                className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-500 transition-colors"
              >
                🗑️ Clear All Caches
              </button>
              <button 
                onClick={async () => {
                  try {
                    const response = await fetch('/api/admin/system-status', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ action: 'clearCache', service: 'github' })
                    });
                    if (response.ok) {
                      alert('GitHub cache cleared successfully!');
                      window.location.reload();
                    }
                  } catch (error) {
                    alert('Failed to clear GitHub cache: ' + error.message);
                  }
                }}
                className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-500 transition-colors"
              >
                🐙 Clear GitHub Cache
              </button>
              <button 
                onClick={async () => {
                  try {
                    const response = await fetch('/api/admin/system-status', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ action: 'clearCache', service: 'discord' })
                    });
                    if (response.ok) {
                      alert('Discord cache cleared successfully!');
                      window.location.reload();
                    }
                  } catch (error) {
                    alert('Failed to clear Discord cache: ' + error.message);
                  }
                }}
                className="bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-500 transition-colors"
              >
                💬 Clear Discord Cache
              </button>
              <button 
                onClick={async () => {
                  try {
                    const response = await fetch('/api/admin/system-status', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ action: 'clearCache', service: 'steam' })
                    });
                    if (response.ok) {
                      alert('Steam cache cleared successfully!');
                      window.location.reload();
                    }
                  } catch (error) {
                    alert('Failed to clear Steam cache: ' + error.message);
                  }
                }}
                className="bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-500 transition-colors"
              >
                🎮 Clear Steam Cache
              </button>
            </div>
            
            <div className="mt-3">
              <button 
                onClick={async () => {
                  try {
                    const response = await fetch('/api/admin/system-status', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ action: 'forceRefresh' })
                    });
                    if (response.ok) {
                      alert('Forced refresh completed!');
                      window.location.reload();
                    }
                  } catch (error) {
                    alert('Failed to force refresh: ' + error.message);
                  }
                }}
                className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-500 transition-colors"
              >
                🔄 Force Refresh All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 