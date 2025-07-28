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

    const currentYear = new Date().getFullYear();
    const startOfYear = `${currentYear}-01-01`;
    const endOfYear = `${currentYear}-12-31`;

    // Get commits this year using search API
    const commitsResponse = await fetch(
      `https://api.github.com/search/commits?q=author:${username}+committer-date:${startOfYear}..${endOfYear}&per_page=1`,
      {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'whoisjason-portfolio'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    let commitsThisYear = 0;
    if (commitsResponse.ok) {
      const commitsData = await commitsResponse.json();
      commitsThisYear = commitsData.total_count;
    }

    // Get recent activity to find last commit date
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'whoisjason-portfolio'
      },
      next: { revalidate: 1800 } // Cache for 30 minutes
    });

    let lastCommitDate = null;
    if (eventsResponse.ok) {
      const events = await eventsResponse.json();
      
      // Find the most recent push event
      const pushEvents = events.filter(event => event.type === 'PushEvent');
      if (pushEvents.length > 0) {
        lastCommitDate = pushEvents[0].created_at;
      }
    }

    return NextResponse.json({
      commitsThisYear,
      lastCommitDate,
      username,
      year: currentYear
    });

  } catch (error) {
    console.error('GitHub commits API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub commits data' },
      { status: 500 }
    );
  }
} 