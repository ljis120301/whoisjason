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
    
    // Use gateway presence if available and connection is stable
    if (gatewayPresence && connectionHealth.isConnected && connectionHealth.connectionStable) {
      presence = gatewayPresence;
    } else if (gatewayPresence && gatewayPresence.status !== 'offline') {
      // Use cached presence even if connection is unstable
      presence = gatewayPresence;
    } else {
      // Fallback to offline status
      presence = {
        status: 'offline',
        lastUpdated: new Date().toISOString(),
        activities: []
      };
    }

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
    let guildsList = [];
    if (guildsResponse.ok) {
      const guilds = await guildsResponse.json();
      sharedGuilds = guilds.length;
      guildsList = guilds.map(g => ({ id: g.id, name: g.name }));
    }

    const responseData = {
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
      connectionHealth: connectionHealth,
      lastUpdated: new Date().toISOString(),
      ...(debug && {
        debug: {
          ...debugInfo,
          guildsList,
          gatewayConnected: gateway.isConnected,
          sessionId: gateway.sessionId,
          connectionStability: await gateway.testConnectionStability(),
          presenceSource: connectionHealth.isConnected && connectionHealth.connectionStable ? 'gateway' : 'cached'
        }
      })
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Discord API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Discord data' },
      { status: 500 }
    );
  }
} 