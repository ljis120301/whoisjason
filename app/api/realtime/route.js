import { NextResponse } from 'next/server';
import { getRealtimeBroadcaster } from '../../../lib/realtime-broadcaster.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  // This endpoint only handles WebSocket upgrades
  // The actual WebSocket handling is done in the WebSocket server
  return NextResponse.json({ 
    message: 'WebSocket endpoint - use WebSocket connection for real-time data' 
  });
}