import { NextResponse } from 'next/server';
import { isAuthenticated } from '../../../../lib/auth.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const adminPasscode = process.env.ADMIN_PASSCODE;
  
  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in environment variables' },
      { status: 400 }
    );
  }

  if (!adminPasscode) {
    return NextResponse.json(
      { error: 'Missing ADMIN_PASSCODE in environment variables' },
      { status: 500 }
    );
  }

  // Skip authentication check for OAuth callback - Spotify calls this directly
  if (action !== 'callback' && !isAuthenticated(request)) {
    return new NextResponse(`
      <html>
        <head>
          <title>Authentication Required</title>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: monospace;
              max-width: 500px;
              margin: 100px auto;
              padding: 20px;
              background: #1a1a1a;
              color: #00ff00;
              text-align: center;
            }
            .auth-box {
              background: #2a2a2a;
              border: 2px solid #ff0000;
              padding: 30px;
              border-radius: 10px;
            }
            a {
              background: #00ff00;
              color: #1a1a1a;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin: 10px;
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <div class="auth-box">
            <h2>🔒 AUTHENTICATION REQUIRED</h2>
            <p>Your session has expired or you are not authenticated.</p>
            <p>Please log in to access Spotify authentication.</p>
            <a href="/api/admin/auth">Login as Admin</a>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
      status: 401
    });
  }

  // Get the base URL from the request
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 
                   (host?.includes('127.0.0.1') || host?.includes('localhost') ? 'http' : 'https');
  const baseUrl = `${protocol}://${host}`;
  const redirectUri = `${baseUrl}/api/spotify/auth?action=callback`;

  if (action === 'login') {
    // Redirect to Spotify authorization
    const scope = 'user-read-recently-played user-read-currently-playing';
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('state', 'spotify-auth'); // CSRF protection
    
    return NextResponse.redirect(authUrl.toString());
  }
  
  if (action === 'callback') {
    // Handle the callback from Spotify
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');
    
    if (error) {
             return new NextResponse(`
         <html>
           <head>
             <title>Spotify Auth Error</title>
             <meta charset="UTF-8">
           </head>
           <body style="font-family: monospace; max-width: 600px; margin: 50px auto; padding: 20px;">
             <h1 style="color: #e74c3c;">Authorization Error</h1>
             <p>Spotify authorization failed: <code>${error}</code></p>
             <p><a href="/api/spotify/auth?action=login">Try Again</a></p>
           </body>
         </html>
       `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    if (!code || state !== 'spotify-auth') {
             return new NextResponse(`
         <html>
           <head>
             <title>Spotify Auth Error</title>
             <meta charset="UTF-8">
           </head>
           <body style="font-family: monospace; max-width: 600px; margin: 50px auto; padding: 20px;">
             <h1 style="color: #e74c3c;">Invalid Request</h1>
             <p>No authorization code received or invalid state parameter.</p>
             <p><a href="/api/spotify/auth?action=login">Try Again</a></p>
           </body>
         </html>
       `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    try {
      // Exchange code for tokens
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        },
        body: new URLSearchParams({
          code: code,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code'
        })
      });

      if (!tokenResponse.ok) {
        throw new Error(`Token exchange failed: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json();
      
             return new NextResponse(`
         <html>
           <head>
             <title>Spotify Auth Success</title>
             <meta charset="UTF-8">
           </head>
           <body style="font-family: monospace; max-width: 800px; margin: 50px auto; padding: 20px;">
             <h1 style="color: #1db954;">Success!</h1>
             <h2>Your Spotify Refresh Token:</h2>
             <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; word-break: break-all; margin: 15px 0;">
               <code>${tokenData.refresh_token}</code>
             </div>
             <h3>Next Steps:</h3>
             <ol>
               <li>Copy the refresh token above</li>
               <li>Add it to your environment variables as:</li>
               <li><code>SPOTIFY_REFRESH_TOKEN=${tokenData.refresh_token}</code></li>
               <li>Restart your application</li>
               <li>Your neofetch will now show Spotify activity!</li>
             </ol>
             <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 5px; margin: 20px 0;">
               <strong>Security Note:</strong> Keep this token private and never commit it to version control!
             </div>
             <p><a href="/" style="background: #1db954; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go Home</a></p>
           </body>
         </html>
       `, {
        headers: { 'Content-Type': 'text/html' }
      });
      
    } catch (error) {
      console.error('Token exchange error:', error);
      
             return new NextResponse(`
         <html>
           <head>
             <title>Spotify Auth Error</title>
             <meta charset="UTF-8">
           </head>
           <body style="font-family: monospace; max-width: 600px; margin: 50px auto; padding: 20px;">
             <h1 style="color: #e74c3c;">Token Exchange Failed</h1>
             <p>Error: <code>${error.message}</code></p>
             <p><a href="/api/spotify/auth?action=login">Try Again</a></p>
           </body>
         </html>
       `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
  }
  
  // Default: Show the auth page
     return new NextResponse(`
     <html>
       <head>
         <title>Spotify Authorization</title>
         <meta charset="UTF-8">
       </head>
       <body style="font-family: monospace; max-width: 600px; margin: 50px auto; padding: 20px;">
         <h1>Spotify Authorization</h1>
         <p>This will authorize your application to access your Spotify listening data.</p>
         
         <div style="background: #e8f5e8; border: 1px solid #4caf50; padding: 15px; border-radius: 5px; margin: 20px 0;">
           <strong>Ready to authorize</strong><br/>
           <strong>Client ID:</strong> ${clientId}<br/>
           <strong>Current Redirect URI:</strong> ${redirectUri}
         </div>
         
         <p><a href="/api/spotify/auth?action=login" style="background: #1db954; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px;">
           Authorize Spotify Access
         </a></p>
         
         <h3>What this does:</h3>
         <ol>
           <li>Redirects you to Spotify to authorize access</li>
           <li>Gets your recently played and currently playing tracks</li>
           <li>Returns a refresh token for your environment variables</li>
           <li>Shows the token for you to copy and use</li>
         </ol>
         
         <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 5px; margin: 20px 0;">
           <strong>IMPORTANT:</strong> Make sure you've added <code>${redirectUri}</code> as a redirect URI in your <a href="https://developer.spotify.com/dashboard" target="_blank">Spotify app settings</a>.
         </div>
         
         <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 10px; border-radius: 5px; margin: 20px 0;">
           <strong>For Development AND Production:</strong><br/>
           Add BOTH of these redirect URIs to your Spotify app:<br/>
           <code>http://127.0.0.1:3001/api/spotify/auth?action=callback</code><br/>
           <code>https://whoisjason.me/api/spotify/auth?action=callback</code><br/>
           <small style="color: #666;">Note: Spotify requires 127.0.0.1 (not localhost) for local development</small>
         </div>
       </body>
     </html>
   `, {
    headers: { 'Content-Type': 'text/html' }
  });
} 