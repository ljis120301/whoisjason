// Authentication utilities for admin endpoints

/**
 * Generate a secure session token
 */
export function generateSessionToken(passcode) {
  const timestamp = Date.now();
  const data = `${passcode}:${timestamp}:${process.env.SPOTIFY_CLIENT_SECRET}`;
  return Buffer.from(data).toString('base64');
}

/**
 * Verify session token
 */
export function verifySessionToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [passcode, timestamp, secret] = decoded.split(':');
    
    // Check if token is less than 24 hours old
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (tokenAge > maxAge) {
      return false;
    }
    
    // Verify the secret matches
    if (secret !== process.env.SPOTIFY_CLIENT_SECRET) {
      return false;
    }
    
    // Verify passcode matches
    if (passcode !== process.env.ADMIN_PASSCODE) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Check if request has valid admin authentication
 * Returns true if authenticated, false otherwise
 */
export function isAuthenticated(request) {
  const sessionToken = request.cookies.get('admin_session')?.value;
  return sessionToken && verifySessionToken(sessionToken);
}

/**
 * Middleware to check authentication and return error response if not authenticated
 * Returns null if authenticated, or NextResponse with error if not
 */
export function requireAuth(request) {
  if (!isAuthenticated(request)) {
    return {
      error: 'Unauthorized: Session expired or invalid',
      message: 'Please authenticate at /api/admin/auth to access this endpoint',
      loginUrl: '/api/admin/auth'
    };
  }
  return null;
} 