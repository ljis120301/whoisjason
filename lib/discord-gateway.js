// Import WebSocket for Node.js environment with error handling
let WebSocket;
try {
  WebSocket = (await import('ws')).default;
} catch (error) {
  WebSocket = null;
}

class DiscordGateway {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.heartbeatInterval = null;
    this.sequenceNumber = null;
    this.sessionId = null;
    this.fallbackPresenceTimer = null;
    this.presenceCheckTimer = null;
    this.lastHeartbeatAck = null;
    this.heartbeatAckTimeout = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.reconnectDelay = 5000;
    this.presenceData = {
      status: 'offline',
      lastUpdated: null
    };
    this.lastKnownPresence = null; // Cache for reconnection
    this.connectionStable = false; // Track if connection is stable
    this.lastPresenceUpdate = null; // Track last real presence update

    // Only attempt connection if WebSocket is available
    if (WebSocket && process.env.DISCORD_BOT_TOKEN) {
      this.testConnectivityAndConnect();
    } else {
    }
  }

  async testConnectivityAndConnect() {
    try {
      // Test Discord API connectivity
      const apiResponse = await fetch('https://discord.com/api/v10/gateway', {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!apiResponse.ok) {
      }

      // Test general internet connectivity
      const internetTest = await fetch('https://httpbin.org/ip', { 
        method: 'GET',
        timeout: 5000 
      });
      
      if (!internetTest.ok) {
      }

    } catch (error) {
    }

    // Proceed with WebSocket connection
    this.connect();
  }

  connect() {
    if (!WebSocket) {
      return;
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    const token = process.env.DISCORD_BOT_TOKEN;
    if (!token) {
      return;
    }

    try {
      this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
    } catch (error) {
      return;
    }

    this.ws.on('open', () => {
    });

    this.ws.on('message', (data) => {
      try {
        const message = JSON.parse(data);
        this.handleMessage(message);
      } catch (error) {
      }
    });

    this.ws.on('close', (code, reason) => {
      this.isConnected = false;
      this.connectionStable = false;
      
      // Clear all timers
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }
      if (this.heartbeatAckTimeout) {
        clearTimeout(this.heartbeatAckTimeout);
        this.heartbeatAckTimeout = null;
      }
      if (this.fallbackPresenceTimer) {
        clearTimeout(this.fallbackPresenceTimer);
        this.fallbackPresenceTimer = null;
      }
      if (this.presenceCheckTimer) {
        clearInterval(this.presenceCheckTimer);
        this.presenceCheckTimer = null;
      }
      
      // Don't reset presence data on connection loss - keep last known state
      // Only reset if we don't have any cached presence data
      if (!this.lastKnownPresence && this.presenceData.status === 'offline') {
        // Keep the current offline state
      } else if (this.lastKnownPresence) {
        // Restore last known presence to prevent status flicker
        this.presenceData = { ...this.lastKnownPresence };
      }
      
      // Attempt reconnection with exponential backoff
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts), 30000);
        this.reconnectAttempts++;
        
        setTimeout(() => {
          this.connect();
        }, delay);
      } else {
        // Reset attempts after a longer delay
        setTimeout(() => {
          this.reconnectAttempts = 0;
          this.connect();
        }, 60000);
      }
    });

    this.ws.on('error', (error) => {
      this.isConnected = false;
    });
  }

  handleMessage(message) {
    const { op, d, s, t } = message;

    if (s !== null) {
      this.sequenceNumber = s;
    }

    switch (op) {
      case 10: // Hello
        const heartbeatInterval = d.heartbeat_interval;
        this.startHeartbeat(heartbeatInterval);
        this.identify();
        break;

      case 11: // Heartbeat ACK
        this.lastHeartbeatAck = Date.now();
        clearTimeout(this.heartbeatAckTimeout);
        this.heartbeatAckTimeout = null;
        break;

      case 0: // Dispatch
        if (t === 'READY') {
          this.isConnected = true;
          this.sessionId = d.session_id;
          this.reconnectAttempts = 0; // Reset reconnection attempts on successful connection
          
          // Mark connection as stable after a delay
          setTimeout(() => {
            this.connectionStable = true;
          }, 5000);
          
          // Run diagnostics and verification after ready
          setTimeout(async () => {
            const verification = await this.verifyBotSetup();
            
            if (verification.success) {
              // If bot is in guilds, request presence for target user
              setTimeout(() => {
                this.requestPresenceUpdate();
              }, 2000);
            } else {
              if (verification.inviteUrl) {
              }
            }
            
            // Run original diagnostics
            this.diagnosePresenceIssues();
          }, 2000);
        } else if (t === 'PRESENCE_UPDATE') {
          // Handle presence updates
          if (d.user && d.user.id === process.env.DISCORD_USER_ID) {
            const newPresence = {
              status: d.status || 'offline',
              lastUpdated: new Date().toISOString(),
              activities: d.activities || []
            };
            
            // Always update presence data on reconnection or status change
            // Remove the complex logic that was preventing updates
            this.presenceData = newPresence;
            this.lastKnownPresence = newPresence; // Cache for reconnection
            this.lastPresenceUpdate = newPresence.status;
          }
        }
        break;

      case 1: // Heartbeat request
        this.heartbeat();
        break;

      case 7: // Reconnect
        this.connect();
        break;

      case 9: // Invalid session
        this.identify();
        break;

      default:
        break;
    }
  }

  identify() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    const token = process.env.DISCORD_BOT_TOKEN;

    const identify = {
      op: 2,
      d: {
        token: process.env.DISCORD_BOT_TOKEN,
        intents: (1 << 0) | (1 << 8) | (1 << 9), // GUILDS + GUILD_PRESENCES + GUILD_MESSAGES
        properties: {
          $os: 'linux',
          $browser: 'whoisjason-portfolio',
          $device: 'whoisjason-portfolio'
        }
      }
    };

    this.sendMessage(identify, 'identify');
  }

  sendMessage(message, messageType = 'unknown') {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return false;
    }

    const messageString = JSON.stringify(message);

    try {
      this.ws.send(messageString);
      return true;
    } catch (error) {
      return false;
    }
  }

  startHeartbeat(interval) {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    // Set a timeout for heartbeat ACK
    this.heartbeatAckTimeout = setTimeout(() => {
      if (this.lastHeartbeatAck && Date.now() - this.lastHeartbeatAck > interval * 2) {
        // No ACK received, connection might be stale
        this.ws.close(1000, 'Heartbeat timeout');
      }
    }, interval + 5000);

    this.heartbeatInterval = setInterval(() => {
      this.heartbeat();
    }, interval);
  }

  heartbeat() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    const heartbeat = {
      op: 1,
      d: this.sequenceNumber
    };

    this.sendMessage(heartbeat, 'heartbeat');
  }

  getPresence() {
    return this.presenceData;
  }

  getConnectionHealth() {
    return {
      isConnected: this.isConnected,
      connectionStable: this.connectionStable,
      reconnectAttempts: this.reconnectAttempts,
      lastHeartbeatAck: this.lastHeartbeatAck,
      sessionId: this.sessionId,
      sequenceNumber: this.sequenceNumber,
      hasValidPresence: !!this.lastKnownPresence,
      lastPresenceUpdate: this.lastPresenceUpdate,
      timeSinceLastHeartbeat: this.lastHeartbeatAck ? Date.now() - this.lastHeartbeatAck : null,
      presenceDataAge: this.presenceData.lastUpdated ? 
        Date.now() - new Date(this.presenceData.lastUpdated).getTime() : null
    };
  }

  // Method to test connection stability
  async testConnectionStability() {
    const health = this.getConnectionHealth();
    return {
      ...health,
      recommendations: []
    };
  }

  async diagnosePresenceIssues() {
    const issues = [];
    const recommendations = [];
    
    // Check if we're connected
    if (!this.isConnected) {
      issues.push('Discord Gateway not connected');
      recommendations.push('Ensure WebSocket connection is established');
    }
    
    // Check for mutual guilds
    try {
      const botToken = process.env.DISCORD_BOT_TOKEN;
      const guildsResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
        headers: {
          'Authorization': `Bot ${botToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (guildsResponse.ok) {
        const guilds = await guildsResponse.json();
        
        if (guilds.length === 0) {
          issues.push('Bot is not in any Discord servers');
          recommendations.push('Add your bot to a Discord server that you are also a member of');
          recommendations.push('Presence updates require mutual guild membership');
        }
      }
    } catch (error) {
    }
    
    // Check intents
    const currentIntents = (1 << 0) | (1 << 8) | (1 << 9);
    const hasGuilds = !!(currentIntents & (1 << 0));
    const hasPresences = !!(currentIntents & (1 << 8));
    
    if (!hasGuilds) {
      issues.push('Missing GUILDS intent');
      recommendations.push('Enable GUILDS intent in bot configuration');
    }
    
    if (!hasPresences) {
      issues.push('Missing GUILD_PRESENCES intent');
      recommendations.push('Enable GUILD_PRESENCES intent in Discord Developer Portal');
      recommendations.push('GUILD_PRESENCES is a privileged intent requiring approval');
    }
    
    return { issues, recommendations };
  }

  async verifyBotSetup() {
    try {
      const botToken = process.env.DISCORD_BOT_TOKEN;
      if (!botToken) {
        return { success: false, error: 'No bot token' };
      }

      // Check bot user info
      const botUserResponse = await fetch('https://discord.com/api/v10/users/@me', {
        headers: {
          'Authorization': `Bot ${botToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!botUserResponse.ok) {
        const error = await botUserResponse.text();
        return { success: false, error: 'Invalid bot token' };
      }

      const botUser = await botUserResponse.json();

      // Check guild membership
      const guildsResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
        headers: {
          'Authorization': `Bot ${botToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!guildsResponse.ok) {
        const error = await guildsResponse.text();
        return { success: false, error: 'Cannot check guilds' };
      }

      const guilds = await guildsResponse.json();
      
      if (guilds.length > 0) {
        return { 
          success: true, 
          guilds: guilds.length,
          guildList: guilds.map(g => ({ id: g.id, name: g.name }))
        };
      } else {
        return { 
          success: false, 
          error: 'Bot not in any servers',
          inviteUrl: `https://discord.com/api/oauth2/authorize?client_id=${botUser.id}&permissions=268435456&scope=bot`
        };
      }

    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  requestPresenceUpdate() {
    if (!this.isConnected || !this.ws) {
      return;
    }

    const userId = process.env.DISCORD_USER_ID;
    if (!userId) {
      return;
    }

    // Discord doesn't have a direct "request presence" command, but we can:
    // 1. Check if we have any mutual guilds
    // 2. If so, presence updates should come automatically
    // 3. If not, log the issue for user action

    // Set up a presence check timer with better logic
    if (!this.presenceCheckTimer) {
      this.presenceCheckTimer = setInterval(() => {
        if (this.presenceData.lastUpdated) {
          const timeSinceUpdate = Date.now() - new Date(this.presenceData.lastUpdated).getTime();
          
          // If we haven't received a presence update in 2 minutes and we're connected,
          // the connection might be stale
          if (timeSinceUpdate > 120000 && this.connectionStable) {
            // Don't reset presence data, just log for debugging
          }
        } else if (this.connectionStable) {
          // If we're connected but have no presence data, something might be wrong
        }
      }, 60000); // Check every 60 seconds instead of 30
    }
  }

  disconnect() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    if (this.heartbeatAckTimeout) {
      clearTimeout(this.heartbeatAckTimeout);
      this.heartbeatAckTimeout = null;
    }
    if (this.fallbackPresenceTimer) {
      clearTimeout(this.fallbackPresenceTimer);
      this.fallbackPresenceTimer = null;
    }
    if (this.presenceCheckTimer) {
      clearInterval(this.presenceCheckTimer);
      this.presenceCheckTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
    this.reconnectAttempts = 0; // Reset attempts on manual disconnect
  }

  getCloseCodeMeaning(code) {
    const codes = {
      1000: 'Normal Closure',
      1001: 'Going Away',
      1002: 'Protocol Error',
      1003: 'Unsupported Data',
      1005: 'No Status Received',
      1006: 'Abnormal Closure',
      1007: 'Invalid frame payload data',
      1008: 'Policy Violation',
      1009: 'Message Too Big',
      1010: 'Mandatory Extension',
      1011: 'Internal Server Error',
      1015: 'TLS Handshake',
      4000: 'Unknown error',
      4001: 'Unknown opcode',
      4002: 'Decode error',
      4003: 'Not authenticated',
      4004: 'Authentication failed',
      4005: 'Already authenticated',
      4007: 'Invalid seq',
      4008: 'Rate limited',
      4009: 'Session timed out',
      4010: 'Invalid shard',
      4011: 'Sharding required',
      4012: 'Invalid API version',
      4013: 'Invalid intent(s)',
      4014: 'Disallowed intent(s)'
    };
    return codes[code] || `Unknown code: ${code}`;
  }
}

// Global instance
let discordGatewayInstance = null;

export function getDiscordGateway() {
  if (!discordGatewayInstance) {
    discordGatewayInstance = new DiscordGateway();
  }
  return discordGatewayInstance;
}

export { DiscordGateway }; 