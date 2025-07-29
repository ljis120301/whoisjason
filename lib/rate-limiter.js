import { NextResponse } from 'next/server';

// In-memory store for rate limiting (in production, use Redis)
const rateLimitStore = new Map();

class RateLimiter {
  constructor() {
    this.windowMs = 15 * 60 * 1000; // 15 minutes
    this.maxRequests = 500; // Increased from 300 to 500 requests per 15 minutes per IP
  }

  getClientIdentifier(request) {
    // Get IP address from various headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    
    const clientId = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
    
    return clientId;
  }

  isRateLimited(clientId) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    if (!rateLimitStore.has(clientId)) {
      rateLimitStore.set(clientId, []);
    }
    
    const requests = rateLimitStore.get(clientId);
    
    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => timestamp > windowStart);
    rateLimitStore.set(clientId, validRequests);
    
    // Check if limit exceeded
    if (validRequests.length >= this.maxRequests) {
      return true;
    }
    
    // Add current request
    validRequests.push(now);
    return false;
  }

  getRemainingRequests(clientId) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    if (!rateLimitStore.has(clientId)) {
      return this.maxRequests;
    }
    
    const requests = rateLimitStore.get(clientId);
    const validRequests = requests.filter(timestamp => timestamp > windowStart);
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }
}

const rateLimiter = new RateLimiter();

export function rateLimit(request) {
  const clientId = rateLimiter.getClientIdentifier(request);
  
  if (rateLimiter.isRateLimited(clientId)) {
    return {
      blocked: true,
      message: 'Rate limit exceeded. Please try again later.',
      remaining: 0
    };
  }
  
  const remaining = rateLimiter.getRemainingRequests(clientId);
  
  return {
    blocked: false,
    remaining: remaining
  };
}

export { rateLimiter }; 