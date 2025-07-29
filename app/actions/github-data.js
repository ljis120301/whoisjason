'use server';

import { getTokenManager } from '../../lib/token-manager.js';
import { getRealtimeBroadcaster } from '../../lib/realtime-broadcaster.js';

export async function getGitHubData(username) {
  try {
    if (!username) {
      return {
        success: false,
        error: 'Username is required',
        data: null
      };
    }

    // Try to get data from broadcaster cache first
    const broadcaster = getRealtimeBroadcaster();
    const cachedData = broadcaster.getCachedData('github');
    
    if (cachedData && broadcaster.isCacheValid('github')) {
      return {
        success: true,
        data: cachedData,
        source: 'cache'
      };
    }

    // If no valid cache, fetch fresh data
    const tokenManager = getTokenManager();
    const token = await tokenManager.getValidGitHubToken();

    if (!token) {
      return {
        success: false,
        error: 'GitHub token not available',
        data: null
      };
    }

    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'whoisjason-portfolio'
      },
      next: { revalidate: 28800 } // Cache for 8 hours (matching broadcaster)
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub user API responded with status: ${userResponse.status}`);
    }

    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'whoisjason-portfolio'
      },
      next: { revalidate: 28800 } // Cache for 8 hours (matching broadcaster)
    });

    if (!reposResponse.ok) {
      throw new Error(`GitHub repos API responded with status: ${reposResponse.status}`);
    }

    const reposData = await reposResponse.json();

    // Calculate total stars and get top repos
    const topRepos = reposData
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map(repo => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at
      }));

    const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    // Get unique languages
    const languages = [...new Set(reposData
      .filter(repo => repo.language)
      .map(repo => repo.language)
    )].slice(0, 5);

    // Fetch commits data (last year)
    let commitsThisYear = 0;
    let lastCommitDate = null;

    try {
      const currentYear = new Date().getFullYear();
      const startDate = `${currentYear}-01-01`;
      const endDate = `${currentYear}-12-31`;

      const commitsResponse = await fetch(
        `https://api.github.com/search/commits?q=author:${username}+committer-date:${startDate}..${endDate}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.cloak-preview',
            'User-Agent': 'whoisjason-portfolio'
          },
          next: { revalidate: 28800 } // Cache for 8 hours (matching broadcaster)
        }
      );

      if (commitsResponse.ok) {
        const commitsData = await commitsResponse.json();
        commitsThisYear = commitsData.total_count;
        
        if (commitsData.items && commitsData.items.length > 0) {
          lastCommitDate = commitsData.items[0].commit.committer.date;
        }
      }
    } catch (error) {
      // Error handling for commits data fetch
    }

    const sanitizedData = {
      user: {
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        bio: userData.bio,
        location: userData.location,
        company: userData.company,
        commitsThisYear,
        lastCommitDate
      },
      repos: {
        topRepos,
        totalStars,
        languages
      },
      lastUpdated: new Date().toISOString()
    };

    // Update the broadcaster cache with fresh data
    broadcaster.updateCache('github', sanitizedData);

    return {
      success: true,
      data: sanitizedData,
      source: 'api'
    };

  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch GitHub data',
      data: null
    };
  }
}