#!/bin/bash

# Script to persistently set EXPO_TOKEN
# This saves the token to multiple locations so other agents can find it

if [ -z "$1" ]; then
    echo "Usage: ./set-token.sh <your_expo_token>"
    echo ""
    echo "This script saves your EXPO_TOKEN to multiple locations for persistence."
    exit 1
fi

TOKEN="$1"

echo "💾 Saving EXPO_TOKEN to multiple locations..."

# Save to .env.local
if [ -f ".env.local" ]; then
    # Update existing EXPO_TOKEN line
    sed -i "s/^EXPO_TOKEN=.*/EXPO_TOKEN=$TOKEN/" .env.local
    echo "✅ Saved to .env.local"
else
    echo "EXPO_TOKEN=$TOKEN" > .env.local
    echo "✅ Created .env.local"
fi

# Save to ../EXPO_TOKEN.txt
echo "$TOKEN" > ../EXPO_TOKEN.txt
echo "✅ Saved to ../EXPO_TOKEN.txt"

# Save to /workspace/EXPO_TOKEN.txt
echo "$TOKEN" > /workspace/EXPO_TOKEN.txt
echo "✅ Saved to /workspace/EXPO_TOKEN.txt"

# Set for current session
export EXPO_TOKEN="$TOKEN"
echo "✅ Set for current session"

echo ""
echo "🎉 EXPO_TOKEN saved to 3 locations:"
echo "   - .env.local"
echo "   - ../EXPO_TOKEN.txt"
echo "   - /workspace/EXPO_TOKEN.txt"
echo ""
echo "Other agents and sessions can now find the token automatically."
echo ""
echo "To build, run:"
echo "  ./build.sh"