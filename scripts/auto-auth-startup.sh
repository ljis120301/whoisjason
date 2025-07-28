#!/bin/bash

echo "🔐 WhoisJason Auto-Authentication Startup Script"
echo "================================================"

# Function to check if a URL is accessible
check_url() {
    local url="$1"
    local max_attempts=5
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s --max-time 10 "$url" > /dev/null 2>&1; then
            return 0
        fi
        echo "Attempt $attempt failed, retrying in 2 seconds..."
        sleep 2
        ((attempt++))
    done
    return 1
}

# Function to automatically refresh Spotify token if we have credentials
refresh_spotify_token() {
    echo "🎵 Attempting Spotify token refresh..."
    
    if [ -z "$SPOTIFY_CLIENT_ID" ] || [ -z "$SPOTIFY_CLIENT_SECRET" ] || [ -z "$SPOTIFY_REFRESH_TOKEN" ]; then
        echo "⚠️  Missing Spotify credentials - skipping automatic refresh"
        return 1
    fi
    
    # Create base64 encoded auth header
    local auth_header=$(echo -n "$SPOTIFY_CLIENT_ID:$SPOTIFY_CLIENT_SECRET" | base64)
    
    # Make token refresh request
    local response=$(curl -s -X POST "https://accounts.spotify.com/api/token" \
        -H "Authorization: Basic $auth_header" \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -d "grant_type=refresh_token&refresh_token=$SPOTIFY_REFRESH_TOKEN")
    
    # Check if request was successful
    if echo "$response" | grep -q "access_token"; then
        echo "✅ Spotify token refresh successful"
        
        # Extract tokens from response
        local access_token=$(echo "$response" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
        local new_refresh_token=$(echo "$response" | grep -o '"refresh_token":"[^"]*"' | cut -d'"' -f4)
        
        # Save tokens to persistent storage
        mkdir -p /app/data
        echo "{
  \"spotify\": {
    \"access_token\": \"$access_token\",
    \"refresh_token\": \"${new_refresh_token:-$SPOTIFY_REFRESH_TOKEN}\",
    \"expires_at\": $(($(date +%s000) + 3600000)),
    \"updated_at\": $(date +%s000)
  }
}" > /app/data/tokens.json
        
        echo "💾 Tokens saved to persistent storage"
        return 0
    else
        echo "❌ Spotify token refresh failed: $response"
        return 1
    fi
}

# Function to validate Discord bot token
validate_discord_token() {
    echo "💬 Validating Discord bot token..."
    
    if [ -z "$DISCORD_BOT_TOKEN" ] || [ -z "$DISCORD_USER_ID" ]; then
        echo "⚠️  Missing Discord credentials - skipping validation"
        return 1
    fi
    
    local response=$(curl -s -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
        "https://discord.com/api/v10/users/$DISCORD_USER_ID")
    
    if echo "$response" | grep -q '"username"'; then
        echo "✅ Discord bot token is valid"
        return 0
    else
        echo "❌ Discord bot token validation failed: $response"
        return 1
    fi
}

# Function to validate Steam API credentials
validate_steam_api() {
    echo "🎮 Validating Steam API credentials..."
    
    if [ -z "$STEAM_API_KEY" ] || [ -z "$STEAM_ID" ]; then
        echo "⚠️  Missing Steam credentials - skipping validation"
        return 1
    fi
    
    local response=$(curl -s "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=$STEAM_API_KEY&steamids=$STEAM_ID")
    
    if echo "$response" | grep -q '"personaname"'; then
        local username=$(echo "$response" | grep -o '"personaname":"[^"]*"' | cut -d'"' -f4)
        echo "✅ Steam API is valid (User: $username)"
        return 0
    else
        echo "❌ Steam API validation failed: $response"
        return 1
    fi
}

# Function to validate GitHub token
validate_github_token() {
    echo "🐙 Validating GitHub token..."
    
    if [ -z "$GITHUB_TOKEN" ]; then
        echo "⚠️  Missing GitHub token - skipping validation"
        return 1
    fi
    
    local response=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "User-Agent: whoisjason-portfolio" \
        "https://api.github.com/user")
    
    if echo "$response" | grep -q '"login"'; then
        local username=$(echo "$response" | grep -o '"login":"[^"]*"' | cut -d'"' -f4)
        local remaining=$(curl -s -I -H "Authorization: Bearer $GITHUB_TOKEN" \
            "https://api.github.com/user" | grep -i "x-ratelimit-remaining" | cut -d' ' -f2 | tr -d '\r')
        echo "✅ GitHub token is valid (User: $username, Rate limit remaining: $remaining)"
        return 0
    else
        echo "❌ GitHub token validation failed: $response"
        return 1
    fi
}

# Function to test API endpoints after server starts
test_api_endpoints() {
    echo "🧪 Testing API endpoints..."
    
    # Wait for server to be ready
    echo "⏳ Waiting for server to start..."
    if ! check_url "http://localhost:3001/api/admin/auth"; then
        echo "⚠️  Server not ready, skipping API tests"
        return 1
    fi
    
    echo "✅ Server is ready"
    
    # Test authentication endpoint
    if check_url "http://localhost:3001/api/admin/auth"; then
        echo "✅ Authentication endpoint is accessible"
    else
        echo "❌ Authentication endpoint failed"
    fi
    
    return 0
}

# Main execution
echo "🚀 Starting comprehensive API authentication process..."

# Create data directory for persistent storage
mkdir -p /app/data

# Store results for summary
spotify_result=1
discord_result=1
steam_result=1
github_result=1

# Run authentication steps for all APIs
echo "🎵 === SPOTIFY AUTHENTICATION ==="
refresh_spotify_token
spotify_result=$?

echo ""
echo "💬 === DISCORD AUTHENTICATION ==="
validate_discord_token
discord_result=$?

echo ""
echo "🎮 === STEAM AUTHENTICATION ==="
validate_steam_api
steam_result=$?

echo ""
echo "🐙 === GITHUB AUTHENTICATION ==="
validate_github_token
github_result=$?

echo ""
echo "🎯 COMPREHENSIVE AUTO-AUTHENTICATION COMPLETE!"
echo "================================================"
echo "📝 Authentication Summary:"
echo "   🎵 Spotify: $([ $spotify_result -eq 0 ] && echo '✅ Ready & Auto-refreshing' || echo '⚠️  Manual setup needed')"
echo "   💬 Discord: $([ $discord_result -eq 0 ] && echo '✅ Ready & Real-time' || echo '⚠️  Manual setup needed')"
echo "   🎮 Steam:   $([ $steam_result -eq 0 ] && echo '✅ Ready & Validated' || echo '⚠️  Manual setup needed')"
echo "   🐙 GitHub:  $([ $github_result -eq 0 ] && echo '✅ Ready & Validated' || echo '⚠️  Manual setup needed')"
echo ""

# Calculate overall status
total_ready=$(($([ $spotify_result -eq 0 ] && echo 1 || echo 0) + $([ $discord_result -eq 0 ] && echo 1 || echo 0) + $([ $steam_result -eq 0 ] && echo 1 || echo 0) + $([ $github_result -eq 0 ] && echo 1 || echo 0)))

if [ $total_ready -eq 4 ]; then
    echo "🟢 ALL APIS READY! Your portfolio is fully connected."
elif [ $total_ready -ge 2 ]; then
    echo "🟡 $total_ready/4 APIs ready. Portfolio partially connected."
else
    echo "🔴 Only $total_ready/4 APIs ready. Check configurations."
fi

echo ""
echo "🌐 Server will now start with authenticated APIs"
echo "📊 Monitor status at: /admin/dashboard"
echo "================================================" 