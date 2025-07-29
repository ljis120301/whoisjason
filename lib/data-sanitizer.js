// Data sanitization utilities to remove sensitive information

export function sanitizeSpotifyData(data) {
  if (!data) return null;
  
  // Return the data as-is for now, since the frontend needs the structure
  // We'll only remove truly sensitive fields if needed
  return {
    currentTrack: data.currentTrack ? {
      name: data.currentTrack.name,
      artist: data.currentTrack.artist,
      is_playing: data.currentTrack.is_playing,
      // Keep album for display purposes
      album: data.currentTrack.album,
      // Keep duration for progress tracking
      duration_ms: data.currentTrack.duration_ms,
      progress_ms: data.currentTrack.progress_ms,
      // Remove sensitive URLs
      // image_url: data.currentTrack.image_url,
      // external_url: data.currentTrack.external_url,
      // preview_url: data.currentTrack.preview_url,
      type: data.currentTrack.type
    } : null,
    recentTracks: data.recentTracks ? data.recentTracks.map(track => ({
      name: track.name,
      artist: track.artist,
      album: track.album,
      is_playing: track.is_playing,
      // Remove sensitive URLs
      // image_url: track.image_url,
      // external_url: track.external_url,
      // preview_url: track.preview_url,
      type: track.type
    })) : [],
    lastUpdated: data.lastUpdated,
    realtime_service: {
      active: data.realtime_service?.active || false,
      poll_frequency_seconds: data.realtime_service?.poll_frequency_seconds
    }
  };
}

export function sanitizeSteamData(data) {
  if (!data) return null;
  
  return {
    recentGames: data.recentGames ? data.recentGames.map(game => ({
      name: game.name,
      playtime_2weeks: game.playtime_2weeks,
      playtime_forever: game.playtime_forever,
      // Keep appid for reference but remove img_icon_url
      appid: game.appid,
      // img_icon_url: game.img_icon_url,
    })) : [],
    totalGames: data.totalGames,
    playerInfo: data.playerInfo ? {
      personaname: data.playerInfo.personaname,
      personastate: data.playerInfo.personastate,
      gameextrainfo: data.playerInfo.gameextrainfo,
      effectiveStatus: data.playerInfo.effectiveStatus,
      recentGame: data.playerInfo.recentGame,
      // Remove gameid for privacy
      // gameid: data.playerInfo.gameid,
    } : {},
    lastUpdated: data.lastUpdated
  };
}

export function sanitizeDiscordData(data) {
  if (!data) return null;
  
  return {
    user: data.user ? {
      username: data.user.username,
      // Keep some fields for display but remove sensitive ones
      id: data.user.id, // Keep for reference
      // discriminator: data.user.discriminator,
      // avatar: data.user.avatar,
    } : {},
    presence: data.presence ? {
      status: data.presence.status,
      activities: data.presence.activities ? data.presence.activities.map(activity => ({
        name: activity.name,
        type: activity.type,
        // Keep some activity details for display
        details: activity.details,
        state: activity.state,
        // Remove sensitive activity details
        // application_id: activity.application_id,
        // session_id: activity.session_id,
      })) : [],
      client_status: data.presence.client_status || {}
    } : null,
    connection: {
      isConnected: data.connection?.isConnected || false,
      // Keep some connection info for debugging
      latency: data.connection?.latency,
      // Remove session details
      // sessionId: data.connection?.sessionId,
    },
    lastUpdated: data.lastUpdated
  };
}

export function sanitizeGitHubData(data) {
  if (!data) return null;
  
  return {
    public_repos: data.public_repos,
    followers: data.followers,
    following: data.following,
    // Keep some fields for display
    bio: data.bio,
    location: data.location,
    company: data.company,
    // Remove timestamps for privacy
    // created_at: data.created_at,
    // updated_at: data.updated_at,
  };
}

export function sanitizeGitHubReposData(data) {
  if (!data) return null;
  
  return {
    topRepos: data.topRepos ? data.topRepos.map(repo => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stars,
      forks: repo.forks,
      language: repo.language,
      // Keep html_url for linking but remove updated_at
      html_url: repo.html_url,
      // updated_at: repo.updated_at,
    })) : [],
    totalStars: data.totalStars,
    languages: data.languages,
    totalRepos: data.totalRepos
  };
}

export function sanitizeGitHubCommitsData(data) {
  if (!data) return null;
  
  return {
    commitsThisYear: data.commitsThisYear,
    // Keep lastCommitDate for display
    lastCommitDate: data.lastCommitDate,
  };
} 