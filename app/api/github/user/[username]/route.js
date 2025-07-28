import { NextResponse } from 'next/server';
import { getTokenManager } from '../../../../../lib/token-manager.js';
import { rateLimit } from '../../../../../lib/rate-limiter.js';
import { sanitizeGitHubData } from '../../../../../lib/data-sanitizer.js';

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

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'whoisjason-portfolio'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const userData = await response.json();

    const rawResponse = {
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
      bio: userData.bio,
      location: userData.location,
      company: userData.company
    };

    // Sanitize data before sending
    const sanitizedResponse = sanitizeGitHubData(rawResponse);

    return NextResponse.json(sanitizedResponse, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining,
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('GitHub user API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub user data' },
      { status: 500 }
    );
  }
} 