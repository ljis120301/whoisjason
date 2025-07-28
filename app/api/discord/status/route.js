import { NextResponse } from 'next/server';
import { getDiscordGateway } from '../../../../lib/discord-gateway.js';
import { rateLimit } from '../../../../lib/rate-limiter.js';
import { sanitizeDiscordData } from '../../../../lib/data-sanitizer.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
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

    const botToken = process.env.DISCORD_BOT_TOKEN;
    const userId = process.env.DISCORD_USER_ID;
    const guildId = process.env.DISCORD_GUILD_ID; // Optional: for guild-specific presence

    if (!botToken || !userId) {
      return NextResponse.json(
        { error: 'Missing Discord credentials' },
        { status: 400 }
      );
    }

    // Check if debug mode is requested
    const url = new URL(request.url);
    const debug = url.searchParams.get('debug') === 'true';

    let debugInfo = {};
    if (debug) {
      const gateway = getDiscordGateway();
      if (gateway.verifyBotSetup) {
        debugInfo = await gateway.verifyBotSetup();
      }
    }

    // Get user information
    const userResponse = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error('Failed to fetch Discord user data:', errorText);
      throw new Error('Failed to fetch Discord user data');
    }

    const userData = await userResponse.json();

    let guildMember = null;
    let presence = null;

    // Get real-time presence from Gateway connection
    const gateway = getDiscordGateway();
    const gatewayPresence = gateway.getPresence();
    const connectionHealth = gateway.getConnectionHealth();

    // Handle the presence data structure correctly
    if (gatewayPresence) {
      presence = {
        status: gatewayPresence.status || 'offline',
        activities: gatewayPresence.activities || [],
        client_status: gatewayPresence.client_status || {}
      };
    }

    // Get guild member info if guildId is provided
    if (guildId) {
      try {
        const guildMemberResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
          headers: {
            'Authorization': `Bot ${botToken}`,
            'Content-Type': 'application/json'
          },
          next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (guildMemberResponse.ok) {
          guildMember = await guildMemberResponse.json();
        }
      } catch (error) {
        // Guild member fetch is optional, don't fail the whole request
        console.warn('Failed to fetch guild member data:', error);
      }
    }

    const rawResponse = {
      user: userData,
      presence: presence,
      guildMember: guildMember,
      connection: {
        isConnected: gateway.isConnected,
        lastHeartbeat: connectionHealth.lastHeartbeat,
        latency: connectionHealth.latency,
        sessionId: connectionHealth.sessionId
      },
      debug: debug ? debugInfo : undefined,
      lastUpdated: new Date().toISOString()
    };

    // Sanitize data before sending
    const sanitizedResponse = sanitizeDiscordData(rawResponse);

    return NextResponse.json(sanitizedResponse, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining,
        'Cache-Control': 'public, max-age=60' // Cache for 1 minute
      }
    });

  } catch (error) {
    console.error('Discord API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Discord data' },
      { status: 500 }
    );
  }
} 