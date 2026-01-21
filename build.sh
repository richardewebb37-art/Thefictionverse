#!/bin/bash

# Build script for TheFictionverse
# This script ensures EXPO_TOKEN is set before building

echo "🔍 Checking for EXPO_TOKEN..."

# Try to load EXPO_TOKEN from various sources
TOKEN_LOADED=false

# Method 1: Check environment variable
if [ -n "$EXPO_TOKEN" ]; then
    echo "✅ EXPO_TOKEN found in environment"
    TOKEN_LOADED=true
fi

# Method 2: Check .env.local file
if [ "$TOKEN_LOADED" = false ] && [ -f ".env.local" ]; then
    echo "📄 Checking .env.local..."
    EXPO_TOKEN=$(grep "^EXPO_TOKEN=" .env.local | cut -d '=' -f2)
    if [ -n "$EXPO_TOKEN" ] && [ "$EXPO_TOKEN" != "your_token_here" ]; then
        echo "✅ EXPO_TOKEN loaded from .env.local"
        export EXPO_TOKEN
        TOKEN_LOADED=true
    fi
fi

# Method 3: Check ../EXPO_TOKEN.txt file
if [ "$TOKEN_LOADED" = false ] && [ -f "../EXPO_TOKEN.txt" ]; then
    echo "📄 Checking ../EXPO_TOKEN.txt..."
    EXPO_TOKEN=$(cat ../EXPO_TOKEN.txt | tr -d '[:space:]')
    if [ -n "$EXPO_TOKEN" ]; then
        echo "✅ EXPO_TOKEN loaded from ../EXPO_TOKEN.txt"
        export EXPO_TOKEN
        TOKEN_LOADED=true
    fi
fi

# Method 4: Check /workspace/EXPO_TOKEN.txt file
if [ "$TOKEN_LOADED" = false ] && [ -f "/workspace/EXPO_TOKEN.txt" ]; then
    echo "📄 Checking /workspace/EXPO_TOKEN.txt..."
    EXPO_TOKEN=$(cat /workspace/EXPO_TOKEN.txt | tr -d '[:space:]')
    if [ -n "$EXPO_TOKEN" ]; then
        echo "✅ EXPO_TOKEN loaded from /workspace/EXPO_TOKEN.txt"
        export EXPO_TOKEN
        TOKEN_LOADED=true
    fi
fi

# If no token found, give clear instructions
if [ "$TOKEN_LOADED" = false ]; then
    echo "❌ EXPO_TOKEN not found"
    echo ""
    echo "📝 Please set EXPO_TOKEN using one of these methods:"
    echo ""
    echo "Method 1: Set environment variable"
    echo "  export EXPO_TOKEN=your_token_here"
    echo ""
    echo "Method 2: Add to .env.local file"
    echo "  echo 'EXPO_TOKEN=your_token_here' >> .env.local"
    echo ""
    echo "Method 3: Create /workspace/EXPO_TOKEN.txt"
    echo "  echo 'your_token_here' > /workspace/EXPO_TOKEN.txt"
    echo ""
    echo "Get your token from: https://expo.dev/accounts/mortalash2025/settings/access-tokens"
    exit 1
fi

echo ""
echo "🏗️  Submitting build to EAS..."

# Submit the build
npx eas build --platform android --profile production

echo ""
echo "✅ Build submitted successfully!"
echo "📱 Check https://expo.dev for build status"