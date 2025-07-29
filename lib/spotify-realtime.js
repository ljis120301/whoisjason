import { getTokenManager } from './token-manager.js';

class SpotifyRealtimeService {
  constructor() {
    this.pollInterval = null;
    this.currentTrack = null;
    this.isPolling = false;
    this.pollFrequency = 3000; // Poll every 3 seconds for real-time updates
    this.lastUpdated = null;
    this.errorCount = 0;
    this.maxErrors = 5;
  }

  async start() {
    if (this.isPolling) {
      return;
    }

    this.isPolling = true;
    this.errorCount = 0;

    // Get initial track immediately
    await this.pollCurrentTrack();

    // Start regular polling
    this.pollInterval = setInterval(async () => {
      await this.pollCurrentTrack();
    }, this.pollFrequency);
  }

  async stop() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    this.isPolling = false;
  }

  async pollCurrentTrack() {
    try {
      const tokenManager = getTokenManager();
      const accessToken = await tokenManager.getValidSpotifyToken();

      if (!accessToken) {
        return;
      }

      // Get currently playing track
      const currentResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      let newTrack = null;

      if (currentResponse.status === 200) {
        const currentData = await currentResponse.json();
        if (currentData && currentData.item) {
          newTrack = {
            name: currentData.item.name,
            artist: currentData.item.artists.map(a => a.name).join(', '),
            album: currentData.item.album.name,
            duration_ms: currentData.item.duration_ms,
            progress_ms: currentData.progress_ms,
            is_playing: currentData.is_playing,
            image_url: currentData.item.album.images[0]?.url,
            external_url: currentData.item.external_urls.spotify,
            preview_url: currentData.item.preview_url,
            type: 'currently_playing'
          };
        }
      } else if (currentResponse.status === 204) {
        // No track currently playing
        newTrack = null;
      } else if (currentResponse.status === 401) {
        // Token expired, try to refresh
        const refreshedToken = await tokenManager.refreshSpotifyToken();
        if (refreshedToken) {
          // Don't retry immediately, let next poll cycle use the new token
          return;
        } else {
          this.errorCount++;
        }
      }

      // If no current track, get recently played
      if (!newTrack) {
        const recentResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (recentResponse.ok) {
          const recentData = await recentResponse.json();
          if (recentData.items && recentData.items.length > 0) {
            const track = recentData.items[0].track;
            newTrack = {
              name: track.name,
              artist: track.artists.map(a => a.name).join(', '),
              album: track.album.name,
              duration_ms: track.duration_ms,
              progress_ms: null,
              is_playing: false,
              image_url: track.album.images[0]?.url,
              external_url: track.external_urls.spotify,
              preview_url: track.preview_url,
              played_at: recentData.items[0].played_at,
              type: 'recently_played'
            };
          }
        }
      }

      // Check if track changed
      const trackChanged = this.hasTrackChanged(this.currentTrack, newTrack);
      
      if (trackChanged) {
        this.currentTrack = newTrack;
        this.lastUpdated = new Date().toISOString();
      }

      // Reset error count on successful poll
      this.errorCount = 0;

    } catch (error) {
      this.errorCount++;

      // Stop polling if too many errors
      if (this.errorCount >= this.maxErrors) {
        await this.stop();
      }
    }
  }

  hasTrackChanged(oldTrack, newTrack) {
    // Both null - no change
    if (!oldTrack && !newTrack) return false;
    
    // One null, one not - change
    if (!oldTrack || !newTrack) return true;
    
    // Different tracks
    if (oldTrack.name !== newTrack.name || oldTrack.artist !== newTrack.artist) {
      return true;
    }
    
    // Same track but playing status changed
    if (oldTrack.is_playing !== newTrack.is_playing) {
      return true;
    }
    
    // Same track but significant progress change (more than 30 seconds difference)
    if (oldTrack.progress_ms && newTrack.progress_ms) {
      const progressDiff = Math.abs(oldTrack.progress_ms - newTrack.progress_ms);
      if (progressDiff > 30000) { // 30 seconds
        return true;
      }
    }

    return false;
  }

  getCurrentTrack() {
    return {
      track: this.currentTrack,
      lastUpdated: this.lastUpdated,
      isPolling: this.isPolling,
      pollFrequency: this.pollFrequency
    };
  }

  // Get detailed track info for API responses
  getDetailedTrackInfo() {
    if (!this.currentTrack) {
      return null;
    }

    return {
      ...this.currentTrack,
      last_updated: this.lastUpdated,
      polling_active: this.isPolling,
      poll_frequency_seconds: this.pollFrequency / 1000
    };
  }

  // Force immediate poll (for testing or manual refresh)
  async forcePoll() {
    await this.pollCurrentTrack();
    return this.getCurrentTrack();
  }

  // Update poll frequency
  updatePollFrequency(newFrequency) {
    if (newFrequency < 3000 || newFrequency > 120000) {
      throw new Error('Poll frequency must be between 3 and 120 seconds');
    }

    this.pollFrequency = newFrequency;
    
    if (this.isPolling) {
      // Restart with new frequency
      this.stop();
      setTimeout(() => this.start(), 1000);
    }
  }
}

// Global instance
let spotifyRealtimeInstance = null;

export function getSpotifyRealtime() {
  if (!spotifyRealtimeInstance) {
    spotifyRealtimeInstance = new SpotifyRealtimeService();
  }
  return spotifyRealtimeInstance;
}

export { SpotifyRealtimeService }; 