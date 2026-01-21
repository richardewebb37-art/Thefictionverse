#!/bin/bash
# EAS Build Script - Final Implementation
# This script loads the token from .env.local and submits build to EXISTING project

set -e  # Exit on error

echo "=========================================="
echo "EAS Build - The Fictionverse"
echo "=========================================="
echo ""

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

echo ""
echo "=========================================="
echo "Build Configuration"
echo "=========================================="
echo "Project: The Fictionverse"
echo "Owner: mortalash2025"
echo "Project ID: 21f983d2-2452-4cbe-8472-ebdcc8962bbc"
echo "Platform: Android"
echo "Profile: production"
echo "Build Type: APK"
echo "Token length: ${#EXPO_TOKEN} characters"
echo ""
echo "=========================================="
echo "Submitting Build to EAS"
echo "=========================================="
echo ""

# Submit build to EAS (NO project creation - build to existing project only)
npx eas build --platform android --profile production --non-interactive