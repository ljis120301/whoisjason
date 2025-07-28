// Import WebSocket for Node.js environment with error handling
let WebSocket;
try {
  WebSocket = (await import('ws')).default;
} catch (error) {
  WebSocket = null;
}

import { getRealtimeBroadcaster } from './realtime-broadcaster.js';

class WebSocketServer {
  constructor() {
    this.wss = null;
    this.isRunning = false;
    this.broadcaster = getRealtimeBroadcaster();
  }

  start(server) {
    if (!WebSocket || this.isRunning) {
      return;
    }

    try {
      this.wss = new WebSocket.Server({ 
        server,
        path: '/api/realtime'
      });

      this.wss.on('connection', (ws, request) => {
        console.log('Client connected to WebSocket');
        
        // Add client to broadcaster
        this.broadcaster.addClient(ws);

        // Send initial data
        const currentData = this.broadcaster.getCurrentData();
        if (currentData.lastUpdated) {
          ws.send(JSON.stringify({
            type: 'data',
            data: currentData
          }));
        }

        // Handle client disconnect
        ws.on('close', () => {
          console.log('Client disconnected from WebSocket');
          this.broadcaster.removeClient(ws);
        });

        // Handle client errors
        ws.on('error', (error) => {
          console.error('WebSocket client error:', error);
          this.broadcaster.removeClient(ws);
        });

        // Handle client messages (if any)
        ws.on('message', (message) => {
          try {
            const data = JSON.parse(message);
            if (data.type === 'ping') {
              ws.send(JSON.stringify({ type: 'pong' }));
            }
          } catch (error) {
            console.error('Error parsing client message:', error);
          }
        });
      });

      this.wss.on('error', (error) => {
        console.error('WebSocket server error:', error);
      });

      this.isRunning = true;
      console.log('WebSocket server started on /api/realtime');

      // Start the broadcaster
      this.broadcaster.start();

    } catch (error) {
      console.error('Failed to start WebSocket server:', error);
    }
  }

  stop() {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
    this.isRunning = false;
    
    // Stop the broadcaster
    this.broadcaster.stop();
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      clientCount: this.wss ? this.wss.clients.size : 0,
      broadcasterStatus: this.broadcaster.isBroadcasting
    };
  }
}

// Global instance
let wsServerInstance = null;

export function getWebSocketServer() {
  if (!wsServerInstance) {
    wsServerInstance = new WebSocketServer();
  }
  return wsServerInstance;
}

export { WebSocketServer };