import { NextResponse } from 'next/server';
import { getTokenManager } from '../../../../../lib/token-manager.js';
import { rateLimit } from '../../../../../lib/rate-limiter.js';
import { sanitizeGitHubCommitsData } from '../../../../../lib/data-sanitizer.js';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    // Apply rate limiting
    const rateLimitResult = rateLimit(request);
    if (rateLimitResult.blocked) {
      return NextResponse.json(
        { error: rateLimitResult.message },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitResult.remaining,
            'Retry-After': '900' // 15 minutes
          }
        }
      );
    }

    const { username } = params;
    const tokenManager = getTokenManager();
    const token = await tokenManager.getValidGitHubToken();

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
      const pushEvents = events.filter(event => event.type === 'PushEvent');
      if (pushEvents.length > 0) {
        lastCommitDate = pushEvents[0].created_at;
      }
    }

    const rawResponse = {
      commitsThisYear,
      lastCommitDate
    };

    // Sanitize data before sending
    const sanitizedResponse = sanitizeGitHubCommitsData(rawResponse);

    return NextResponse.json(sanitizedResponse, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining,
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('GitHub commits API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub commits data' },
      { status: 500 }
    );
  }
} 