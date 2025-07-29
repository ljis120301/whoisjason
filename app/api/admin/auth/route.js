import { NextResponse } from 'next/server';
import { generateSessionToken, verifySessionToken } from '../../../../lib/auth.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  // Show login form
  return new NextResponse(`
    <html>
      <head>
        <title>Admin Authentication</title>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: monospace;
            max-width: 400px;
            margin: 100px auto;
            padding: 20px;
            background: #1a1a1a;
            color: #00ff00;
          }
          .auth-box {
            background: #2a2a2a;
            border: 2px solid #00ff00;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
          }
          input {
            background: #1a1a1a;
            border: 1px solid #00ff00;
            color: #00ff00;
            padding: 10px;
            font-family: monospace;
            font-size: 16px;
            text-align: center;
            width: 150px;
            margin: 15px 0;
          }
          button {
            background: #00ff00;
            color: #1a1a1a;
            border: none;
            padding: 10px 20px;
            font-family: monospace;
            font-weight: bold;
            cursor: pointer;
            margin-left: 10px;
          }
          .error {
            color: #ff0000;
            margin: 10px 0;
          }
          .success {
            color: #00ff00;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="auth-box">
          <h2>🔒 ADMIN LOGIN</h2>
          <p>Enter 6-digit admin passcode:</p>
          <form method="post" action="/api/admin/auth">
            <input type="password" 
                   name="passcode" 
                   placeholder="000000" 
                   maxlength="6" 
                   pattern="[0-9]{6}"
                   required 
                   autofocus />
            <br/>
            <button type="submit">LOGIN</button>
          </form>
          <div style="margin-top: 20px; font-size: 12px; color: #666;">
            Session expires after 24 hours
          </div>
        </div>
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}

export async function POST(request) {
  const adminPasscode = process.env.ADMIN_PASSCODE;
  
  if (!adminPasscode) {
    return NextResponse.json(
      { error: 'Missing ADMIN_PASSCODE in environment variables' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const passcode = formData.get('passcode');

    if (!passcode || passcode !== adminPasscode) {
      return new NextResponse(`
        <html>
          <head>
            <title>Admin Authentication</title>
            <meta charset="UTF-8">
            <style>
              body {
                font-family: monospace;
                max-width: 400px;
                margin: 100px auto;
                padding: 20px;
                background: #1a1a1a;
                color: #00ff00;
              }
              .auth-box {
                background: #2a2a2a;
                border: 2px solid #00ff00;
                padding: 30px;
                border-radius: 10px;
                text-align: center;
              }
              input {
                background: #1a1a1a;
                border: 1px solid #00ff00;
                color: #00ff00;
                padding: 10px;
                font-family: monospace;
                font-size: 16px;
                text-align: center;
                width: 150px;
                margin: 15px 0;
              }
              button {
                background: #00ff00;
                color: #1a1a1a;
                border: none;
                padding: 10px 20px;
                font-family: monospace;
                font-weight: bold;
                cursor: pointer;
                margin-left: 10px;
              }
              .error {
                color: #ff0000;
                margin: 10px 0;
              }
            </style>
          </head>
          <body>
            <div class="auth-box">
              <h2>🔒 ADMIN LOGIN</h2>
              <p>Enter 6-digit admin passcode:</p>
              <div class="error">❌ Invalid passcode</div>
              <form method="post" action="/api/admin/auth">
                <input type="password" 
                       name="passcode" 
                       placeholder="000000" 
                       maxlength="6" 
                       pattern="[0-9]{6}"
                       required 
                       autofocus />
                <br/>
                <button type="submit">LOGIN</button>
              </form>
            </div>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
        status: 401
      });
    }

    // Generate secure session token
    const sessionToken = generateSessionToken(passcode);
    
    // Create response with success page
    const response = new NextResponse(`
      <html>
        <head>
          <title>Admin Authentication Success</title>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: monospace;
              max-width: 600px;
              margin: 100px auto;
              padding: 20px;
              background: #1a1a1a;
              color: #00ff00;
            }
            .success-box {
              background: #2a2a2a;
              border: 2px solid #00ff00;
              padding: 30px;
              border-radius: 10px;
              text-align: center;
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
          <div class="success-box">
            <h2>✅ AUTHENTICATION SUCCESSFUL</h2>
            <p>You are now logged in as admin.</p>
            <p>Session expires in 24 hours.</p>
                         <div style="margin: 20px 0;">
               <a href="/api/spotify/auth">Spotify Authorization</a>
               <a href="/api/spotify/recent">Recent Tracks</a>
               <a href="/api/admin/logout" style="background: #ff4444;">Logout</a>
             </div>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });

    // Set secure HTTP-only cookie
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

 