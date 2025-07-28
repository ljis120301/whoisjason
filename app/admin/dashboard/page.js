import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAuthenticated } from '../../../lib/auth.js';

// Server component that handles authentication and renders dashboard
export default async function AdminDashboard() {
  // Get cookies on server side
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('admin_session');
  
  // Check authentication server-side
  if (!sessionToken) {
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
            <div id="service-status" className="space-y-2">
              <div className="text-yellow-400">⏳ Loading service status...</div>
            </div>
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
          <div id="env-status" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-yellow-400">⏳ Loading environment status...</div>
          </div>
        </div>

        {/* Current Activity */}
        <div className="bg-gray-800 border-2 border-green-400 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">🎯 CURRENT ACTIVITY</h2>
          <div id="current-activity" className="space-y-4">
            <div className="text-yellow-400">⏳ Loading current activity...</div>
          </div>
        </div>
      </div>

      {/* Auto-refresh script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          async function updateDashboard() {
            try {
              const response = await fetch('/api/system/status');
              const data = await response.json();
              
              if (response.ok) {
                updateServiceStatus(data.services);
                updateEnvironmentStatus(data.environment);
                updateCurrentActivity(data.services);
              } else {
                document.getElementById('service-status').innerHTML = 
                  '<div class="text-red-400">❌ Failed to load status: ' + (data.error || 'Unknown error') + '</div>';
              }
            } catch (error) {
              document.getElementById('service-status').innerHTML = 
                '<div class="text-red-400">❌ Connection error: ' + error.message + '</div>';
            }
          }
          
          function updateServiceStatus(services) {
            const statusEl = document.getElementById('service-status');
            let html = '';
            
            // Startup status
            html += '<div class="flex justify-between"><span>🚀 Startup Manager:</span><span class="' + 
              (services.startup?.initialized ? 'text-green-400">✅ Ready' : 'text-red-400">❌ Not Ready') + '</span></div>';
            
            // Spotify status
            html += '<div class="flex justify-between"><span>🎵 Spotify:</span><span class="' + 
              (services.spotify?.hasValidToken && services.spotify?.realtime?.isPolling ? 'text-green-400">✅ Active' : 'text-red-400">❌ Inactive') + '</span></div>';
            
            // Discord status
            html += '<div class="flex justify-between"><span>💬 Discord:</span><span class="' + 
              (services.discord?.isConnected ? 'text-green-400">✅ Connected' : 'text-red-400">❌ Disconnected') + '</span></div>';
            
            // Steam status
            html += '<div class="flex justify-between"><span>🎮 Steam:</span><span class="' + 
              (services.steam?.hasValidCredentials ? 'text-green-400">✅ Valid' : 'text-red-400">❌ Invalid') + '</span></div>';
            
            // GitHub status
            html += '<div class="flex justify-between"><span>📦 GitHub:</span><span class="' + 
              (services.github?.hasValidToken ? 'text-green-400">✅ Valid' : 'text-red-400">❌ Invalid') + '</span></div>';
            
            statusEl.innerHTML = html;
          }
          
          function updateEnvironmentStatus(env) {
            const envEl = document.getElementById('env-status');
            let html = '';
            
            const services = ['spotify', 'discord', 'github', 'steam'];
            services.forEach(service => {
              html += '<div class="bg-gray-700 p-3 rounded"><h3 class="font-bold text-' + service + '-400 mb-2">' + 
                service.toUpperCase() + '</h3>';
              
              Object.entries(env[service] || {}).forEach(([key, value]) => {
                html += '<div class="text-sm flex justify-between"><span>' + key + ':</span><span class="' + 
                  (value ? 'text-green-400">✅' : 'text-red-400">❌') + '</span></div>';
              });
              
              html += '</div>';
            });
            
            envEl.innerHTML = html;
          }
          
          function updateCurrentActivity(services) {
            const activityEl = document.getElementById('current-activity');
            let html = '';
            
            // Current Spotify track
            if (services.spotify?.realtime?.currentTrack) {
              const track = services.spotify.realtime.currentTrack;
              html += '<div class="bg-gray-700 p-4 rounded">';
              html += '<h3 class="text-green-400 font-bold mb-2">🎵 Now Playing</h3>';
              html += '<div><strong>' + track.name + '</strong></div>';
              html += '<div class="text-green-300">by ' + track.artist + '</div>';
              html += '<div class="text-sm text-gray-400 mt-2">' + (track.is_playing ? '▶️ Playing' : '⏸️ Paused') + '</div>';
              html += '</div>';
            }
            
            // Discord status
            if (services.discord?.currentStatus) {
              html += '<div class="bg-gray-700 p-4 rounded">';
              html += '<h3 class="text-blue-400 font-bold mb-2">💬 Discord Status</h3>';
              html += '<div>' + services.discord.currentStatus + '</div>';
              html += '</div>';
            }
            
            if (!html) {
              html = '<div class="text-gray-400">No current activity detected</div>';
            }
            
            activityEl.innerHTML = html;
          }
          
          // Initial load and set up auto-refresh
          updateDashboard();
          setInterval(updateDashboard, 30000); // Refresh every 30 seconds
        `
      }} />
    </div>
  );
} 