#!/bin/bash

# Build script for TheFictionverse
# This script ensures EXPO_TOKEN is set before building

echo "🔍 Checking for EXPO_TOKEN..."

# Check if EXPO_TOKEN is in environment
if [ -z "$EXPO_TOKEN" ]; then
    echo "❌ EXPO_TOKEN not found in environment"
    echo "📝 Please set it with: export EXPO_TOKEN=your_token_here"
    echo ""
    echo "Or add it to .env.local file"
    exit 1
fi

echo "✅ EXPO_TOKEN found"
echo ""
echo "🏗️  Submitting build to EAS..."

# Submit the build
npx eas build --platform android --profile production

echo ""
echo "✅ Build submitted successfully!"
echo "📱 Check https://expo.dev for build status"