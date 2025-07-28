import { NextResponse } from 'next/server';
import { isAuthenticated } from '../../../../../lib/auth.js';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { 
          error: 'Unauthorized: Session expired or invalid',
          message: 'Please authenticate at /api/admin/auth to access this endpoint',
          loginUrl: '/api/admin/auth'
        },
        { status: 401 }
      );
    }

    const { username } = params;
    const token = process.env.GITHUB_TOKEN;

    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'whoisjason-portfolio'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!reposResponse.ok) {
      throw new Error(`GitHub API responded with status: ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();

    // Filter out forks and get public repos only
    const publicRepos = repos.filter(repo => !repo.fork && !repo.private);

    // Calculate total stars
    const totalStars = publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    // Get top 5 repositories by stars
    const topRepos = publicRepos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updated_at: repo.updated_at,
        html_url: repo.html_url
      }));

    // Get languages (count by frequency)
    const languageCounts = {};
    publicRepos.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    // Sort languages by frequency and get top 5
    const languages = Object.entries(languageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([language, count]) => ({ language, count }));

    return NextResponse.json({
      topRepos,
      totalStars,
      languages,
      totalPublicRepos: publicRepos.length
    });

  } catch (error) {
    console.error('GitHub repos API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repository data' },
      { status: 500 }
    );
  }
} 