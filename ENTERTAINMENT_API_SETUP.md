# Entertainment API Setup Guide

This guide will help you set up the Spotify, Steam, and Discord APIs for your neofetch card entertainment section.

## 🎯 What You'll Get

After setup, your neofetch will show live data like:
- 🎵 **Spotify**: "♪ Now: Get Lucky - Daft Punk" or recent tracks
- 🎮 **Steam**: "🎮 Playing: Cyberpunk 2077" or recent games + library size  
- 💬 **Discord**: "💬 Discord: username • online • 12 servers"

The Entertainment/Social section replaces the traditional "Software" section with your real-time activity.

## Required Environment Variables

Add these variables to your environment configuration:

**For local development**: Add to `.env.local` file
**For production**: Add to your hosting platform's environment variables

```bash
# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# Steam API
STEAM_API_KEY=your_steam_api_key
STEAM_ID=your_steam_id_64

# Discord API
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_USER_ID=your_discord_user_id
DISCORD_GUILD_ID=your_discord_guild_id_optional
```

## 🎵 Spotify API Setup

### 1. Create Spotify App
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click **"Create App"**
4. Fill in:
   - **App Name**: `whoisjason-neofetch` (or your preferred name)
   - **App Description**: `Personal portfolio neofetch integration`
   - **Redirect URIs**: Add BOTH of these (click "Add" after each one):
     - `http://127.0.0.1:3001/api/spotify/auth?action=callback` (for development)
     - `https://whoisjason.me/api/spotify/auth?action=callback` (for production)
   - **APIs Used**: Check **Web API**
5. Click **"Save"**

**Important**: 
- Spotify requires `127.0.0.1` (NOT `localhost`) for local development
- You MUST add both URIs now, even before deploying to production
- HTTP is only allowed for `127.0.0.1` - all other domains must use HTTPS

### 2. Get Client ID and Secret
1. In your app dashboard, copy the **Client ID** and **Client Secret**
2. Add them to your environment variables:
   ```bash
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```

### 3. Get Refresh Token

#### For Development (127.0.0.1):
1. **Start your local development server:**
   ```bash
   npm run dev
   ```

2. **Visit the auth endpoint using 127.0.0.1:**
   - Go to: `http://127.0.0.1:3001/api/spotify/auth`
   - **Important**: You MUST use `127.0.0.1:3001`, not `localhost:3001`
   - Click **"Authorize Spotify Access"**

3. **Complete authorization:**
   - You'll be redirected to Spotify to log in and authorize
   - After authorization, you'll be redirected back with your refresh token
   - Copy the refresh token and add it to your `.env.local`:
     ```bash
     SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
     ```

4. **Restart your development server** and test the neofetch

#### For Production:
1. **Deploy your app** to `whoisjason.me` with the Client ID and Secret set

2. **Visit the production auth endpoint:**
   - Go to: `https://whoisjason.me/api/spotify/auth`
   - Click **"Authorize Spotify Access"**

3. **Complete authorization and get the token**
   - Copy the refresh token and add it to your production environment variables
   - Restart your production app

**Note**: You can use the same refresh token for both development and production since it's tied to your Spotify account, not the domain.

## 🎮 Steam API Setup

### 1. Get Steam API Key
1. Go to [Steam Web API Key](https://steamcommunity.com/dev/apikey)
2. Log in with your Steam account
3. Fill in:
   - **Domain Name**: `localhost` (or your domain)
   - Agree to terms
4. Click **"Register"**
5. Copy your API key to `.env.local`:
   ```bash
   STEAM_API_KEY=26F421254A5EE0747FCEF6D6A5F35773
   ```

### 2. Get Your Steam ID
1. Go to [SteamID Finder](https://steamidfinder.com/)
2. Enter your Steam profile URL or username
3. Copy the **steamID64** number
4. Add to `.env.local`:
   ```bash
   STEAM_ID=76561198186653099
   ```

**Alternative method:**
1. Go to your Steam profile
2. Right-click → "Copy Page URL"
3. If URL is like `steamcommunity.com/id/username`, use the SteamID finder
4. If URL is like `steamcommunity.com/profiles/76561198XXXXXXXXX`, the number after `/profiles/` is your Steam ID

## 💬 Discord API Setup

### 1. Create Discord Application
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"**
3. Name it: `whoisjason-neofetch`
4. Click **"Create"**

### 2. Create Bot
1. In your application, go to **"Bot"** section
2. Click **"Add Bot"**
3. Under **Token**, click **"Copy"**
4. Add to `.env.local`:
   ```bash
   DISCORD_BOT_TOKEN=ffffff

### 3. Get Your Discord User ID
1. Enable Developer Mode in Discord:
   - Settings → Advanced → Developer Mode (toggle on)
2. Right-click your username/avatar
3. Click **"Copy User ID"**
4. Add to `.env.local`:
   ```bash
   DISCORD_USER_ID=ffff
   ```

### 4. Get Guild ID (Optional)
If you want server-specific presence:
1. Right-click your server name
2. Click **"Copy Server ID"**
3. Add to `.env.local`:
   ```bash
   DISCORD_GUILD_ID=your_guild_id_here
   ```

### 5. Invite Bot to Server (Optional)
1. In Discord Developer Portal, go to **OAuth2** → **URL Generator**
2. Select scopes: `bot`
3. Select permissions: `Read Messages/View Channels`
4. Copy generated URL and visit it
5. Select your server and authorize

## 🔧 Testing Your Setup

### Local Development
After adding all environment variables, restart your development server:

```bash
npm run dev
```

**Important for Spotify**: Access your local app using `http://127.0.0.1:3001` instead of `localhost:3001` to ensure Spotify authentication works correctly.

### Production/Remote Server
Make sure your environment variables are set on your hosting platform:

**Vercel**: Add variables in your Vercel dashboard under Settings → Environment Variables
**Netlify**: Add variables in your Netlify dashboard under Site settings → Environment variables  
**Railway/Docker**: Set environment variables in your deployment configuration

### Expected Results
The neofetch card should now show:
- 🎵 Currently playing or recent Spotify tracks
- 🎮 Currently playing or recent Steam games
- 💬 Discord username and online status

### First-Time Setup
1. **For development**: Visit `http://127.0.0.1:3001/api/spotify/auth` to get your Spotify refresh token
2. **For production**: Visit `https://whoisjason.me/api/spotify/auth` to get your Spotify refresh token
3. Add the token to your environment variables
4. Restart your application
5. Check your neofetch card for live data

## 🚨 Troubleshooting

### Spotify Issues
- **"Missing Spotify credentials"**: Check your environment variables have all three Spotify variables
- **"Failed to refresh token"**: Your refresh token may have expired, visit `/api/spotify/auth` to regenerate it
- **"Invalid redirect URI"**: Most common causes:
  - Using `localhost` instead of `127.0.0.1` for development
  - Missing the exact redirect URI in your Spotify app settings
  - For development: Must be `http://127.0.0.1:3001/api/spotify/auth?action=callback`
  - For production: Must be `https://whoisjason.me/api/spotify/auth?action=callback`
- **No music showing**: Make sure you've played music recently on Spotify
- **Can't access 127.0.0.1**: Make sure your development server is running and try refreshing

### Steam Issues
- **"Missing Steam credentials"**: Check API key and Steam ID are correct
- **No games showing**: Your Steam profile must be public for recent games to show
- **Wrong Steam ID**: Make sure you're using the 64-bit Steam ID, not the shorter version

### Discord Issues
- **"Missing Discord credentials"**: Check bot token and user ID are correct
- **No status showing**: Discord presence requires Gateway connection (basic implementation shows offline)
- **Bot not responding**: Make sure bot is added to at least one server you're in

## 🔒 Security Notes

- Never commit your `.env.local` file to version control
- Keep your API keys private and use secure environment variable storage
- The Spotify auth endpoint (`/api/spotify/auth`) can be used multiple times to regenerate tokens
- Regularly rotate your tokens if needed
- For production, use your hosting platform's secure environment variable system
- Consider restricting access to the auth endpoint after initial setup (though it requires your Spotify login)

## 📝 Optional: Fallback Data

If APIs are unavailable, the component will show:
- Spotify: "Music unavailable" or fallback message
- Steam: "Library unavailable" or games count
- Discord: "Status unavailable" or basic info

The neofetch will still work without these APIs configured, showing fallback messages instead. 