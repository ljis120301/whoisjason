'use client';

import { useState, useEffect, useCallback } from 'react';

export function useRealtimeData() {
  const [data, setData] = useState({
    spotify: null,
    discord: null,
    steam: null,
    github: null,
    lastUpdated: null
  });
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [error, setError] = useState(null);
  const [ws, setWs] = useState(null);

  const connect = useCallback(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      return; // Already connected
    }

    try {
      // Determine WebSocket URL
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/realtime`;
      
      const websocket = new WebSocket(wsUrl);
      
      websocket.onopen = () => {
        console.log('WebSocket connected');
        setConnectionStatus('connected');
        setError(null);
      };

      websocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'data') {
            setData(message.data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      websocket.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setConnectionStatus('disconnected');
        
        // Attempt to reconnect after a delay
        setTimeout(() => {
          if (connectionStatus !== 'connecting') {
            connect();
          }
        }, 5000);
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
        setError('WebSocket connection failed');
      };

      setWs(websocket);
      setConnectionStatus('connecting');

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionStatus('error');
      setError('Failed to create WebSocket connection');
    }
  }, [ws, connectionStatus]);

  const disconnect = useCallback(() => {
    if (ws) {
      ws.close();
      setWs(null);
      setConnectionStatus('disconnected');
    }
  }, [ws]);

  useEffect(() => {
    connect();

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // Keep connection alive with ping
  useEffect(() => {
    if (connectionStatus === 'connected' && ws) {
      const pingInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping' }));
        }
      }, 30000); // Ping every 30 seconds

      return () => clearInterval(pingInterval);
    }
  }, [connectionStatus, ws]);

  return {
    data,
    connectionStatus,
    error,
    reconnect: connect,
    disconnect
  };
}