import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  // Create response with logout confirmation page
  const response = new NextResponse(`
    <html>
      <head>
        <title>Admin Logout</title>
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
          .logout-box {
            background: #2a2a2a;
            border: 2px solid #00ff00;
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
        <div class="logout-box">
          <h2>✅ LOGGED OUT SUCCESSFULLY</h2>
          <p>Your admin session has been cleared.</p>
          <p>You are now logged out and cannot access protected endpoints.</p>
          <a href="/api/admin/auth">Login Again</a>
        </div>
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });

  // Clear the admin session cookie
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Immediately expire
    path: '/'
  });

  return response;

}

export async function POST(request) {
  // Handle POST requests the same way as GET
  return GET(request);
} 