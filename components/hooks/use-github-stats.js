'use client';

import { useState, useEffect } from 'react';
import { getGitHubData } from '../../app/actions/github-data.js';

export function useGitHubStats(username) {
  const [stats, setStats] = useState({
    commitsThisYear: 0,
    topRepos: [],
    totalRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    languages: [],
    lastCommitDate: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!username) return;

    const fetchGitHubStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true, error: null }));

        // Use server action instead of client-side API calls
        const result = await getGitHubData(username);
        
        if (result.success && result.data) {
          setStats({
            commitsThisYear: result.data.commits.commitsThisYear,
            topRepos: result.data.repos.topRepos,
            totalRepos: result.data.user.public_repos,
            followers: result.data.user.followers,
            following: result.data.user.following,
            totalStars: result.data.repos.totalStars,
            languages: result.data.repos.languages,
            lastCommitDate: result.data.commits.lastCommitDate,
            loading: false,
            error: null
          });
        } else {
          throw new Error(result.error || 'Failed to fetch GitHub data');
        }

      } catch (error) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchGitHubStats();
    
    // Set up polling every 5 minutes (reduced frequency)
    const interval = setInterval(fetchGitHubStats, 300000);

    return () => clearInterval(interval);
  }, [username]);

  return stats;
} 