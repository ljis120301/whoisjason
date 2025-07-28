import { NextResponse } from 'next/server';
import { isAuthenticated } from '../../../../lib/auth.js';
import { getDiscordGateway } from '../../../../lib/discord-gateway.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  console.log('[DISCORD-API-DEBUG] 📥 Discord status API endpoint called');
  
  try {
    console.log('[DISCORD-API-DEBUG] 🔐 Checking authentication...');
    // Check authentication
    if (!isAuthenticated(request)) {
      console.log('[DISCORD-API-DEBUG] ❌ Authentication failed');
      return NextResponse.json(
        { 
          error: 'Unauthorized: Session expired or invalid',
          message: 'Please authenticate at /api/admin/auth to access this endpoint',
          loginUrl: '/api/admin/auth'
        },
        { status: 401 }
      );
    }
    console.log('[DISCORD-API-DEBUG] ✓ Authentication successful');

    const botToken = process.env.DISCORD_BOT_TOKEN;
    const userId = process.env.DISCORD_USER_ID;
    const guildId = process.env.DISCORD_GUILD_ID; // Optional: for guild-specific presence

    console.log('[DISCORD-API-DEBUG] 🔍 Environment check:');
    console.log('[DISCORD-API-DEBUG] - Bot token present:', !!botToken);
    console.log('[DISCORD-API-DEBUG] - User ID present:', !!userId);
    console.log('[DISCORD-API-DEBUG] - Guild ID present:', !!guildId);

    if (!botToken || !userId) {
      console.error('[DISCORD-API-DEBUG] ❌ Missing Discord credentials');
      return NextResponse.json(
        { error: 'Missing Discord credentials' },
        { status: 400 }
      );
    }

    console.log('[DISCORD-API-DEBUG] 🌐 Fetching Discord user data...');
    // Get user information
    const userResponse = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    console.log('[DISCORD-API-DEBUG] - User API response status:', userResponse.status);

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error('[DISCORD-API-DEBUG] ❌ Failed to fetch Discord user data:', errorText);
      throw new Error('Failed to fetch Discord user data');
    }

    const userData = await userResponse.json();
    console.log('[DISCORD-API-DEBUG] ✓ User data fetched successfully:', {
      id: userData.id,
      username: userData.username,
      globalName: userData.global_name
    });

    let guildMember = null;
    let presence = null;

    console.log('[DISCORD-API-DEBUG] 👤 Getting real-time presence from Gateway...');
    // Get real-time presence from Gateway connection
    const gateway = getDiscordGateway();
    console.log('[DISCORD-API-DEBUG] - Gateway instance obtained');
    console.log('[DISCORD-API-DEBUG] - Gateway connected:', gateway.isConnected);
    console.log('[DISCORD-API-DEBUG] - Gateway session ID:', gateway.sessionId);
    
    presence = gateway.getPresence();
    console.log('[DISCORD-API-DEBUG] - Presence data:', presence);

    // If guild ID is provided, get guild member info
    if (guildId) {
      console.log('[DISCORD-API-DEBUG] 🏰 Fetching guild member data...');
      try {
        const memberResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
          headers: {
            'Authorization': `Bot ${botToken}`,
            'Content-Type': 'application/json'
          },
          next: { revalidate: 300 }
        });

        console.log('[DISCORD-API-DEBUG] - Guild member API response status:', memberResponse.status);

        if (memberResponse.ok) {
          guildMember = await memberResponse.json();
          console.log('[DISCORD-API-DEBUG] ✓ Guild member data fetched');
        } else {
          console.warn('[DISCORD-API-DEBUG] ⚠️ Failed to fetch guild member data:', memberResponse.status);
        }

      } catch (error) {
        console.error('[DISCORD-API-DEBUG] ❌ Exception fetching guild member data:', error);
        console.warn('Could not fetch guild member data:', error);
      }
    }

    console.log('[DISCORD-API-DEBUG] 🏢 Fetching mutual guilds...');
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
      console.log('[DISCORD-API-DEBUG] ✓ Mutual guilds count:', sharedGuilds);
    } else {
      console.warn('[DISCORD-API-DEBUG] ⚠️ Failed to fetch mutual guilds:', guildsResponse.status);
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
      lastUpdated: new Date().toISOString()
    };

    console.log('[DISCORD-API-DEBUG] ✅ Returning Discord status data successfully');
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('[DISCORD-API-DEBUG] ❌ Discord API error occurred:', error);
    console.error('[DISCORD-API-DEBUG] - Error type:', error.constructor.name);
    console.error('[DISCORD-API-DEBUG] - Error message:', error.message);
    console.error('[DISCORD-API-DEBUG] - Error stack:', error.stack);
    console.error('Discord API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Discord data' },
      { status: 500 }
    );
  }
} 