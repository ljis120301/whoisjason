// Import WebSocket for Node.js environment with error handling
let WebSocket;
try {
  WebSocket = (await import('ws')).default;
} catch (error) {
  console.warn('WebSocket not available, Discord bot features will be disabled:', error.message);
  WebSocket = null;
}

class DiscordGateway {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.heartbeatInterval = null;
    this.sequenceNumber = null;
    this.sessionId = null;
    this.presenceData = {
      status: 'offline',
      lastUpdated: null
    };

    // Only attempt connection if WebSocket is available
    if (WebSocket && process.env.DISCORD_BOT_TOKEN) {
      this.connect();
    } else {
      console.warn('Discord Gateway disabled: Missing WebSocket or bot token');
    }
  }

  connect() {
    if (!WebSocket) {
      console.warn('Cannot connect to Discord: WebSocket not available');
      return;
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    const token = process.env.DISCORD_BOT_TOKEN;
    if (!token) {
      console.error('Discord bot token not found');
      return;
    }

    try {
      this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      return;
    }

    this.ws.on('open', () => {
      console.log('Connected to Discord Gateway');
    });

    this.ws.on('message', (data) => {
      try {
        const message = JSON.parse(data);
        this.handleMessage(message);
      } catch (error) {
        console.error('Error parsing Discord message:', error);
      }
    });

    this.ws.on('close', (code, reason) => {
      console.log(`Discord Gateway closed: ${code} ${reason}`);
      this.isConnected = false;
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connect(), 5000);
    });

    this.ws.on('error', (error) => {
      console.error('Discord Gateway error:', error);
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
        // Heartbeat acknowledged
        break;

      case 0: // Dispatch
        if (t === 'READY') {
          this.isConnected = true;
          this.sessionId = d.session_id;
          console.log('Discord Gateway ready');
        } else if (t === 'PRESENCE_UPDATE') {
          // Handle presence updates
          if (d.user && d.user.id === process.env.DISCORD_USER_ID) {
            this.presenceData = {
              status: d.status || 'offline',
              lastUpdated: new Date().toISOString(),
              activities: d.activities || []
            };
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
    }
  }

  startHeartbeat(interval) {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    
    this.heartbeatInterval = setInterval(() => {
      this.heartbeat();
    }, interval);
  }

  identify() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    const identify = {
      op: 2,
      d: {
        token: process.env.DISCORD_BOT_TOKEN,
        intents: 1 << 8 | 1 << 12, // GUILD_MESSAGES + GUILD_MESSAGE_REACTIONS
        properties: {
          $os: 'linux',
          $browser: 'whoisjason-portfolio',
          $device: 'whoisjason-portfolio'
        }
      }
    };

    try {
      this.ws.send(JSON.stringify(identify));
    } catch (error) {
      console.error('Failed to send identify message:', error);
    }
  }

  heartbeat() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    try {
      this.ws.send(JSON.stringify({
        op: 1,
        d: this.sequenceNumber
      }));
    } catch (error) {
      console.error('Failed to send heartbeat:', error);
    }
  }

  getPresence() {
    return this.presenceData;
  }

  disconnect() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
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