#!/bin/bash
# EAS Build Script - Single Source of Truth for EXPO_TOKEN
# This script loads the token from .env.local and submits the build

set -e  # Exit on error

echo "🔍 Checking for EXPO_TOKEN..."

# Load environment variables from .env.local (SINGLE SOURCE OF TRUTH)
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
  echo "✅ Loaded EXPO_TOKEN from .env.local"
else
  echo "❌ Error: .env.local not found"
  exit 1
fi

# Verify token is set
if [ -z "$EXPO_TOKEN" ]; then
  echo "❌ Error: EXPO_TOKEN is not set in .env.local"
  exit 1
fi

echo "🚀 Starting EAS build for Android (production profile)..."
echo "Project: The Fictionverse"
echo "Build Type: APK"
echo "Token length: ${#EXPO_TOKEN} characters"
echo ""

# Submit build to EAS
npx eas build --platform android --profile production --non-interactive