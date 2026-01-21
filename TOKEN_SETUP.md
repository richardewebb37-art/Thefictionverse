# EXPO_TOKEN Setup Guide

## ⚠️ IMPORTANT: Single Source of Truth

The EXPO_TOKEN is stored in **ONE LOCATION ONLY**:
- **File:** `/workspace/Thefictionverse/.env.local`
- **Format:** `EXPO_TOKEN=LuwnbjRL_UdR6nBPdiUCw1XLgbpcv_OxhWT4nmY2`

## Do NOT:
- ❌ Store the token in multiple files
- ❌ Hardcode the token in scripts
- ❌ Create separate token files
- ❌ Add token to environment variables in eas.json

## Do:
- ✅ Use `.env.local` as the ONLY source
- ✅ Source `.env.local` before running EAS commands
- ✅ Use the `build.sh` script which handles token loading

## How to Submit a Build

### Option 1: Using build.sh (Recommended)
```bash
cd /workspace/Thefictionverse
./build.sh
```

### Option 2: Manual Build
```bash
cd /workspace/Thefictionverse
export $(grep -v '^#' .env.local | xargs)
npx eas build --platform android --profile production --non-interactive
```

## Token Information
- **Account:** mortalash2025
- **Purpose:** EAS build authentication only
- **Status:** Active (not expired)
- **Location:** .env.local (single source of truth)

## Build Configuration
- **Profile:** production
- **Platform:** Android
- **Build Type:** APK
- **Credentials:** Managed by EAS (auto-generated)

## Troubleshooting

### "bearer token is invalid"
This means the token wasn't loaded properly. Make sure you:
1. Are in the `/workspace/Thefictionverse` directory
2. Have sourced `.env.local` before running EAS commands
3. Are not using hardcoded tokens elsewhere

### Credentials Issues
EAS will automatically generate and manage credentials:
- Keystore is auto-generated on first build
- No need for local keystore files
- EAS stores credentials securely

### Build Fails
Check:
1. Token is loaded: `echo $EXPO_TOKEN`
2. Verify authentication: `npx eas whoami`
3. Check git status: `git status` (must be clean for EAS builds)