import WebSocket from 'ws';

class DiscordGateway {
  constructor() {
    this.ws = null;
    this.heartbeatInterval = null;
    this.sequenceNumber = null;
    this.sessionId = null;
    this.presenceData = {
      status: 'offline',
      activities: [],
      lastUpdated: null
    };
    this.isConnected = false;
  }

  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    const token = process.env.DISCORD_BOT_TOKEN;
    if (!token) {
      console.error('Discord bot token not found');
      return;
    }

    this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

    this.ws.on('open', () => {
      console.log('Connected to Discord Gateway');
    });

    this.ws.on('message', (data) => {
      const message = JSON.parse(data);
      this.handleMessage(message);
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
    });
  }

  handleMessage(message) {
    const { op, d, s, t } = message;

    if (s !== null) {
      this.sequenceNumber = s;
    }

    switch (op) {
      case 10: // Hello
        this.startHeartbeat(d.heartbeat_interval);
        this.identify();
        break;

      case 11: // Heartbeat ACK
        // Heartbeat acknowledged
        break;

      case 0: // Dispatch
        this.handleDispatch(t, d);
        break;

      case 1: // Heartbeat
        this.sendHeartbeat();
        break;

      case 7: // Reconnect
        this.reconnect();
        break;

      case 9: // Invalid Session
        this.sessionId = null;
        setTimeout(() => this.identify(), 2000);
        break;
    }
  }

  handleDispatch(type, data) {
    switch (type) {
      case 'READY':
        this.sessionId = data.session_id;
        this.isConnected = true;
        console.log('Discord Gateway ready');
        break;

      case 'PRESENCE_UPDATE':
        const userId = process.env.DISCORD_USER_ID;
        if (data.user && data.user.id === userId) {
          this.presenceData = {
            status: data.status || 'offline',
            activities: data.activities || [],
            lastUpdated: new Date().toISOString()
          };
          console.log(`Presence updated: ${this.presenceData.status}`);
        }
        break;
    }
  }

  identify() {
    const payload = {
      op: 2,
      d: {
        token: process.env.DISCORD_BOT_TOKEN,
        intents: 513, // GUILDS (1) + GUILD_PRESENCES (512)
        properties: {
          os: 'linux',
          browser: 'whoisjason',
          device: 'whoisjason'
        }
      }
    };

    this.ws.send(JSON.stringify(payload));
  }

  startHeartbeat(interval) {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat();
    }, interval);
  }

  sendHeartbeat() {
    const payload = {
      op: 1,
      d: this.sequenceNumber
    };

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
    }
  }

  reconnect() {
    if (this.ws) {
      this.ws.close();
    }
    this.connect();
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
let gatewayInstance = null;

export function getDiscordGateway() {
  if (!gatewayInstance) {
    gatewayInstance = new DiscordGateway();
    gatewayInstance.connect();
  }
  return gatewayInstance;
}

export { DiscordGateway }; 