import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
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

    // Get contribution streak data (alternative approach)
    const contributionResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'whoisjason-portfolio'
      },
      next: { revalidate: 3600 }
    });

    let accountAge = null;
    if (contributionResponse.ok) {
      const userData = await contributionResponse.json();
      const createdDate = new Date(userData.created_at);
      const now = new Date();
      const diffTime = Math.abs(now - createdDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      accountAge = Math.floor(diffDays / 365);
    }

    return NextResponse.json({
      commitsThisYear,
      lastCommitDate,
      accountAge,
      year: currentYear
    });

  } catch (error) {
    console.error('GitHub commits API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub commit data' },
      { status: 500 }
    );
  }
} 