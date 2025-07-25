import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { username } = params;
    const token = process.env.GITHUB_TOKEN;

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

    return NextResponse.json({
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
      bio: userData.bio,
      location: userData.location,
      company: userData.company
    });

  } catch (error) {
    console.error('GitHub user API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub user data' },
      { status: 500 }
    );
  }
} 