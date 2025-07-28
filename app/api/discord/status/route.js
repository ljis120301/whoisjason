import { NextResponse } from 'next/server';
import { isAuthenticated } from '../../../../lib/auth.js';
import { getDiscordGateway } from '../../../../lib/discord-gateway.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
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

    const botToken = process.env.DISCORD_BOT_TOKEN;
    const userId = process.env.DISCORD_USER_ID;
    const guildId = process.env.DISCORD_GUILD_ID; // Optional: for guild-specific presence

    if (!botToken || !userId) {
      return NextResponse.json(
        { error: 'Missing Discord credentials' },
        { status: 400 }
      );
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
      throw new Error('Failed to fetch Discord user data');
    }

    const userData = await userResponse.json();

    let guildMember = null;
    let presence = null;

    // Get real-time presence from Gateway connection
    const gateway = getDiscordGateway();
    presence = gateway.getPresence();

    // If guild ID is provided, get guild member info
    if (guildId) {
      try {
        const memberResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
          headers: {
            'Authorization': `Bot ${botToken}`,
            'Content-Type': 'application/json'
          },
          next: { revalidate: 300 }
        });

        if (memberResponse.ok) {
          guildMember = await memberResponse.json();
        }

      } catch (error) {
        console.warn('Could not fetch guild member data:', error);
      }
    }

    // Get mutual guilds (servers the bot and user share)
    const guildsResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 1800 }
    });

    let sharedGuilds = 0;
    if (guildsResponse.ok) {
      const guilds = await guildsResponse.json();
      sharedGuilds = guilds.length;
    }

    return NextResponse.json({
      user: {
        id: userData.id,
        username: userData.username,
        globalName: userData.global_name,
        discriminator: userData.discriminator,
        avatar: userData.avatar,
        bot: userData.bot,
        createdAt: userData.id ? new Date((parseInt(userData.id) / 4194304) + 1420070400000) : null
      },
      guildMember,
      presence,
      sharedGuilds,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Discord API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Discord data' },
      { status: 500 }
    );
  }
} 