import { NextResponse } from 'next/server';
import { isAuthenticated } from '../../../../lib/auth.js';

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

    // If guild ID is provided, get guild member info and presence
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

        // Note: Getting presence requires Gateway connection, so we'll mock some data
        // In a real implementation, you'd need to use Discord Gateway WebSocket
        presence = {
          status: 'online', // This would come from Gateway in real implementation
          activities: [] // This would contain actual activities from Gateway
        };

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