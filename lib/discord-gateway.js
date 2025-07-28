// Import WebSocket for Node.js environment with error handling
let WebSocket;
try {
  console.log('[DISCORD-DEBUG] Attempting to import WebSocket module...');
  WebSocket = (await import('ws')).default;
  console.log('[DISCORD-DEBUG] ✓ WebSocket module imported successfully');
} catch (error) {
  console.error('[DISCORD-DEBUG] ✗ Failed to import WebSocket module:', error.message);
  console.error('[DISCORD-DEBUG] Stack trace:', error.stack);
  console.warn('WebSocket not available, Discord bot features will be disabled:', error.message);
  WebSocket = null;
}

class DiscordGateway {
  constructor() {
    console.log('[DISCORD-DEBUG] 🚀 Initializing Discord Gateway...');
    
    this.ws = null;
    this.isConnected = false;
    this.heartbeatInterval = null;
    this.sequenceNumber = null;
    this.sessionId = null;
    this.presenceData = {
      status: 'offline',
      lastUpdated: null
    };

    // Debug environment variables
    console.log('[DISCORD-DEBUG] Environment check:');
    console.log('[DISCORD-DEBUG] - WebSocket available:', !!WebSocket);
    console.log('[DISCORD-DEBUG] - DISCORD_BOT_TOKEN present:', !!process.env.DISCORD_BOT_TOKEN);
    console.log('[DISCORD-DEBUG] - DISCORD_BOT_TOKEN length:', process.env.DISCORD_BOT_TOKEN ? process.env.DISCORD_BOT_TOKEN.length : 0);
    console.log('[DISCORD-DEBUG] - DISCORD_USER_ID present:', !!process.env.DISCORD_USER_ID);
    console.log('[DISCORD-DEBUG] - DISCORD_USER_ID value:', process.env.DISCORD_USER_ID || 'undefined');
    console.log('[DISCORD-DEBUG] - NODE_ENV:', process.env.NODE_ENV);
    console.log('[DISCORD-DEBUG] - Container info:', {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      cwd: process.cwd()
    });

    // Only attempt connection if WebSocket is available
    if (WebSocket && process.env.DISCORD_BOT_TOKEN) {
      console.log('[DISCORD-DEBUG] ✓ Prerequisites met, testing connectivity before connection...');
      this.testConnectivityAndConnect();
    } else {
      const reasons = [];
      if (!WebSocket) reasons.push('WebSocket not available');
      if (!process.env.DISCORD_BOT_TOKEN) reasons.push('bot token missing');
      
      console.error('[DISCORD-DEBUG] ✗ Prerequisites not met:', reasons.join(', '));
      console.warn('Discord Gateway disabled: Missing WebSocket or bot token');
    }
  }

  async testConnectivityAndConnect() {
    console.log('[DISCORD-DEBUG] 🌐 Testing network connectivity to Discord services...');
    
    try {
      // Test Discord API connectivity
      console.log('[DISCORD-DEBUG] - Testing Discord API connectivity...');
      const apiResponse = await fetch('https://discord.com/api/v10/gateway', {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('[DISCORD-DEBUG] - Gateway API response status:', apiResponse.status);
      
      if (apiResponse.ok) {
        const gatewayData = await apiResponse.json();
        console.log('[DISCORD-DEBUG] ✓ Discord API reachable');
        console.log('[DISCORD-DEBUG] - Gateway URL from API:', gatewayData.url);
        console.log('[DISCORD-DEBUG] - Session start limit:', gatewayData.session_start_limit);
      } else {
        console.error('[DISCORD-DEBUG] ✗ Discord API returned error:', apiResponse.status);
      }

      // Test general internet connectivity
      console.log('[DISCORD-DEBUG] - Testing general internet connectivity...');
      const internetTest = await fetch('https://httpbin.org/ip', { 
        method: 'GET',
        timeout: 5000 
      });
      
      if (internetTest.ok) {
        const ipData = await internetTest.json();
        console.log('[DISCORD-DEBUG] ✓ Internet connectivity confirmed');
        console.log('[DISCORD-DEBUG] - Container IP:', ipData.origin);
      } else {
        console.error('[DISCORD-DEBUG] ✗ Internet connectivity test failed');
      }

    } catch (error) {
      console.error('[DISCORD-DEBUG] ❌ Connectivity test failed:', error.message);
      console.error('[DISCORD-DEBUG] - Error type:', error.constructor.name);
      console.error('[DISCORD-DEBUG] - Error code:', error.code);
      
      if (error.code === 'ENOTFOUND') {
        console.error('[DISCORD-DEBUG] 🌐 DNS resolution failed - check container network configuration');
      } else if (error.code === 'ECONNREFUSED') {
        console.error('[DISCORD-DEBUG] 🌐 Connection refused - firewall or network policy issue');
      } else if (error.code === 'ETIMEDOUT') {
        console.error('[DISCORD-DEBUG] 🌐 Connection timeout - network latency or blocking');
      }
    }

    // Proceed with WebSocket connection regardless of connectivity test results
    console.log('[DISCORD-DEBUG] 🔌 Proceeding with WebSocket connection attempt...');
    this.connect();
  }

  connect() {
    console.log('[DISCORD-DEBUG] 🔌 Starting connection process...');
    
    if (!WebSocket) {
      console.error('[DISCORD-DEBUG] ✗ WebSocket not available during connect()');
      console.warn('Cannot connect to Discord: WebSocket not available');
      return;
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('[DISCORD-DEBUG] ⚠️ Connection already open, skipping');
      return;
    }

    const token = process.env.DISCORD_BOT_TOKEN;
    if (!token) {
      console.error('[DISCORD-DEBUG] ✗ No bot token found in environment');
      console.error('Discord bot token not found');
      return;
    }

    console.log('[DISCORD-DEBUG] 🌐 Creating WebSocket connection to Discord Gateway...');
    console.log('[DISCORD-DEBUG] - Gateway URL: wss://gateway.discord.gg/?v=10&encoding=json');
    console.log('[DISCORD-DEBUG] - Token (first 10 chars):', token.substring(0, 10) + '...');

    try {
      this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
      console.log('[DISCORD-DEBUG] ✓ WebSocket object created successfully');
    } catch (error) {
      console.error('[DISCORD-DEBUG] ✗ Failed to create WebSocket connection:', error);
      console.error('[DISCORD-DEBUG] Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      console.error('Failed to create WebSocket connection:', error);
      return;
    }

    this.ws.on('open', () => {
      console.log('[DISCORD-DEBUG] 🎉 WebSocket connection opened successfully!');
      console.log('Connected to Discord Gateway');
    });

    this.ws.on('message', (data) => {
      try {
        console.log('[DISCORD-DEBUG] 📨 Received message from Discord Gateway');
        const message = JSON.parse(data);
        console.log('[DISCORD-DEBUG] - Message type:', message.t || 'N/A');
        console.log('[DISCORD-DEBUG] - Opcode:', message.op);
        this.handleMessage(message);
      } catch (error) {
        console.error('[DISCORD-DEBUG] ✗ Error parsing Discord message:', error);
        console.error('[DISCORD-DEBUG] Raw data:', data);
        console.error('Error parsing Discord message:', error);
      }
    });

    this.ws.on('close', (code, reason) => {
      console.log('[DISCORD-DEBUG] 🔌 WebSocket connection closed');
      console.log('[DISCORD-DEBUG] - Close code:', code);
      console.log('[DISCORD-DEBUG] - Close reason:', reason);
      console.log('[DISCORD-DEBUG] - Close code meaning:', this.getCloseCodeMeaning(code));
      console.log(`Discord Gateway closed: ${code} ${reason}`);
      
      this.isConnected = false;
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
        console.log('[DISCORD-DEBUG] - Heartbeat interval cleared');
      }
      
      // Attempt to reconnect after 5 seconds
      console.log('[DISCORD-DEBUG] ⏰ Scheduling reconnection in 5 seconds...');
      setTimeout(() => {
        console.log('[DISCORD-DEBUG] 🔄 Attempting reconnection...');
        this.connect();
      }, 5000);
    });

    this.ws.on('error', (error) => {
      console.error('[DISCORD-DEBUG] ❌ WebSocket error occurred:', error);
      console.error('[DISCORD-DEBUG] Error details:', {
        message: error.message,
        code: error.code,
        errno: error.errno,
        syscall: error.syscall,
        address: error.address,
        port: error.port
      });
      console.error('Discord Gateway error:', error);
      this.isConnected = false;
    });

    console.log('[DISCORD-DEBUG] 🔗 WebSocket event listeners attached, waiting for connection...');
  }

  handleMessage(message) {
    console.log('[DISCORD-DEBUG] 🔄 Processing Discord Gateway message...');
    const { op, d, s, t } = message;
    console.log('[DISCORD-DEBUG] - Opcode:', op);
    console.log('[DISCORD-DEBUG] - Event type:', t);
    console.log('[DISCORD-DEBUG] - Sequence:', s);

    if (s !== null) {
      this.sequenceNumber = s;
      console.log('[DISCORD-DEBUG] - Updated sequence number to:', s);
    }

    switch (op) {
      case 10: // Hello
        console.log('[DISCORD-DEBUG] 📋 Received HELLO from Discord Gateway');
        const heartbeatInterval = d.heartbeat_interval;
        console.log('[DISCORD-DEBUG] - Heartbeat interval:', heartbeatInterval, 'ms');
        this.startHeartbeat(heartbeatInterval);
        this.identify();
        break;

      case 11: // Heartbeat ACK
        console.log('[DISCORD-DEBUG] 💓 Heartbeat acknowledged by Discord');
        break;

      case 0: // Dispatch
        console.log('[DISCORD-DEBUG] 📦 Received DISPATCH event:', t);
        if (t === 'READY') {
          console.log('[DISCORD-DEBUG] 🎉 Discord Gateway READY event received!');
          this.isConnected = true;
          this.sessionId = d.session_id;
          console.log('[DISCORD-DEBUG] - Session ID:', this.sessionId);
          console.log('[DISCORD-DEBUG] - User info:', d.user);
          console.log('[DISCORD-DEBUG] - Guilds count:', d.guilds ? d.guilds.length : 0);
          console.log('Discord Gateway ready');
        } else if (t === 'PRESENCE_UPDATE') {
          console.log('[DISCORD-DEBUG] 👤 Presence update received');
          // Handle presence updates
          if (d.user && d.user.id === process.env.DISCORD_USER_ID) {
            console.log('[DISCORD-DEBUG] - Presence update for target user:', d.user.id);
            console.log('[DISCORD-DEBUG] - Status:', d.status);
            console.log('[DISCORD-DEBUG] - Activities:', d.activities);
            this.presenceData = {
              status: d.status || 'offline',
              lastUpdated: new Date().toISOString(),
              activities: d.activities || []
            };
          } else {
            console.log('[DISCORD-DEBUG] - Presence update for different user, ignoring');
          }
        } else {
          console.log('[DISCORD-DEBUG] - Other dispatch event:', t);
        }
        break;

      case 1: // Heartbeat request
        console.log('[DISCORD-DEBUG] 💗 Heartbeat requested by Discord');
        this.heartbeat();
        break;

      case 7: // Reconnect
        console.log('[DISCORD-DEBUG] 🔄 Discord requested reconnection');
        this.connect();
        break;

      case 9: // Invalid session
        console.log('[DISCORD-DEBUG] ❌ Invalid session, re-identifying');
        this.identify();
        break;

      default:
        console.log('[DISCORD-DEBUG] ❓ Unknown opcode received:', op);
        break;
    }
  }

  identify() {
    console.log('[DISCORD-DEBUG] 🔐 Starting identification process...');
    
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('[DISCORD-DEBUG] ✗ Cannot identify: WebSocket not open');
      console.error('[DISCORD-DEBUG] - WebSocket state:', this.ws ? this.ws.readyState : 'null');
      return;
    }

    const token = process.env.DISCORD_BOT_TOKEN;
    console.log('[DISCORD-DEBUG] - Token available:', !!token);
    console.log('[DISCORD-DEBUG] - Token prefix:', token ? token.substring(0, 10) + '...' : 'none');

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

    console.log('[DISCORD-DEBUG] - Identify payload prepared');
    console.log('[DISCORD-DEBUG] - Intents:', identify.d.intents);
    console.log('[DISCORD-DEBUG] - Properties:', identify.d.properties);

    this.sendMessage(identify, 'identify');
  }

  sendMessage(message, messageType = 'unknown') {
    console.log(`[DISCORD-DEBUG] 📤 Attempting to send ${messageType} message...`);
    
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error(`[DISCORD-DEBUG] ✗ Cannot send ${messageType}: WebSocket not open`);
      return false;
    }

    const messageString = JSON.stringify(message);
    console.log(`[DISCORD-DEBUG] - Message size: ${messageString.length} characters`);

    try {
      this.ws.send(messageString);
      console.log(`[DISCORD-DEBUG] ✓ ${messageType} message sent successfully`);
      return true;
    } catch (error) {
      console.error(`[DISCORD-DEBUG] ✗ Failed to send ${messageType} message:`, error);
      console.error('[DISCORD-DEBUG] Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });

      // Check for specific WebSocket errors
      if (error.message && error.message.includes('bufferUtil.mask is not a function')) {
        console.error('[DISCORD-DEBUG] 🔧 WebSocket buffer utility error detected');
        console.error('[DISCORD-DEBUG] 💡 This may be resolved by installing bufferutil and utf-8-validate packages');
        console.error('[DISCORD-DEBUG] 🔄 Consider restarting the application after installing dependencies');
      }

      console.error(`Failed to send ${messageType} message:`, error);
      return false;
    }
  }

  startHeartbeat(interval) {
    console.log('[DISCORD-DEBUG] 💗 Starting heartbeat system...');
    console.log('[DISCORD-DEBUG] - Interval:', interval, 'ms');
    
    if (this.heartbeatInterval) {
      console.log('[DISCORD-DEBUG] - Clearing existing heartbeat interval');
      clearInterval(this.heartbeatInterval);
    }

    this.heartbeatInterval = setInterval(() => {
      console.log('[DISCORD-DEBUG] 💓 Sending scheduled heartbeat...');
      this.heartbeat();
    }, interval);
    
    console.log('[DISCORD-DEBUG] ✓ Heartbeat system started');
  }

  heartbeat() {
    console.log('[DISCORD-DEBUG] 💗 Preparing heartbeat...');
    
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('[DISCORD-DEBUG] ✗ Cannot send heartbeat: WebSocket not open');
      return;
    }

    const heartbeat = {
      op: 1,
      d: this.sequenceNumber
    };

    console.log('[DISCORD-DEBUG] - Heartbeat sequence:', this.sequenceNumber);

    this.sendMessage(heartbeat, 'heartbeat');
  }

  getPresence() {
    console.log('[DISCORD-DEBUG] 👤 Getting presence data...');
    console.log('[DISCORD-DEBUG] - Current presence:', this.presenceData);
    console.log('[DISCORD-DEBUG] - Is connected:', this.isConnected);
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