'use client';

import { useState, useEffect } from 'react';

export function useGitHubStats(username) {
  console.log('useGitHubStats called with username:', username);
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

        const userResponse = await fetch(`/api/github/user/${username}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();

        const reposResponse = await fetch(`/api/github/repos/${username}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (!reposResponse.ok) throw new Error('Failed to fetch repos data');
        const reposData = await reposResponse.json();

        const commitsResponse = await fetch(`/api/github/commits/${username}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (!commitsResponse.ok) throw new Error('Failed to fetch commits data');
        const commitsData = await commitsResponse.json();

        setStats({
          commitsThisYear: commitsData.commitsThisYear,
          topRepos: reposData.topRepos,
          totalRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars: reposData.totalStars,
          languages: reposData.languages,
          lastCommitDate: commitsData.lastCommitDate,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('GitHub stats fetch error:', error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchGitHubStats();
  }, [username]);

  return stats;
} 