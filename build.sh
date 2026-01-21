#!/bin/bash
# Stable Build Script - The Fictionverse
# This script uses stable credentials and prevents regeneration

set -e  # Exit on error

echo "=========================================="
echo "EAS Build - The Fictionverse"
echo "Stable Credential Management"
echo "=========================================="
echo ""

# CREDENTIAL MANAGEMENT - STABLE SOURCE OF TRUTH
CREDENTIALS_DIR=".credentials"

# Load token from stable location (.credentials/.env)
if [ -f "$CREDENTIALS_DIR/.env" ]; then
  export $(grep -v '^#' "$CREDENTIALS_DIR/.env" | xargs)
  echo "✅ Loaded EXPO_TOKEN from $CREDENTIALS_DIR/.env (STABLE)"
else
  echo "❌ Error: $CREDENTIALS_DIR/.env not found"
  echo "   This is the STABLE credential location - DO NOT regenerate"
  exit 1
fi

# Verify token is set
if [ -z "$EXPO_TOKEN" ]; then
  echo "❌ Error: EXPO_TOKEN not set in stable credentials"
  exit 1
fi

echo ""
echo "=========================================="
echo "Build Configuration (STABLE)"
echo "=========================================="
echo "Project: The Fictionverse"
echo "Owner: mortalash2025"
echo "Project ID: 21f983d2-2452-4cbe-8472-ebdcc8962bbc"
echo "Platform: Android"
echo "Profile: production"
echo "Build Type: APK"
echo "Credentials Source: local (STABLE)"
echo "Token length: ${#EXPO_TOKEN} characters"
echo ""

# Verify stable keystore exists
if [ ! -f "android/credentials/fictionverse-keystore.jks" ]; then
  echo "❌ Error: Stable keystore not found"
  echo "   Location: android/credentials/fictionverse-keystore.jks"
  echo "   DO NOT regenerate - use existing stable keystore"
  exit 1
fi

echo "✅ Stable keystore found: android/credentials/fictionverse-keystore.jks"
echo ""

# Verify git is clean (EAS requirement)
if ! git diff-index --quiet HEAD --; then
  echo "❌ Error: Git working tree is dirty"
  echo "   Commit all changes before building"
  echo "   DO NOT skip this step"
  exit 1
fi

echo "✅ Git working tree is clean"
echo ""
echo "=========================================="
echo "Submitting Build to EAS"
echo "=========================================="
echo "Using STABLE credentials (no regeneration)"
echo "Project: The Fictionverse (EXISTING - do not create new)"
echo ""

# Submit build to EAS
# Note: Using --non-interactive to prevent credential regeneration prompts
# Credentials are already stable and configured
npx eas build --platform android --profile production --non-interactive

echo ""
echo "=========================================="
echo "Build Submitted Successfully"
echo "=========================================="
echo "Credentials used: STABLE (not regenerated)"
echo "Project: The Fictionverse (existing)"
echo "Check https://expo.dev for build status"
echo "=========================================="