# EAS Build Instructions - Final Implementation

## ⚠️ CRITICAL: Read Before Building

### What This Build Does
- Submits a build to the **EXISTING** project "The Fictionverse"
- Project ID: `21f983d2-2452-4cbe-8472-ebdcc8962bbc`
- Owner: `mortalash2025`
- Does NOT create a new project
- Uses existing EAS project configuration

### Token Configuration
- **Single Source:** `.env.local` file
- **Variable:** `EXPO_TOKEN=n04KaVlIrbxPR6O-W_mnrzXVZrHgUsZBFUM4b1D`
- **Token Purpose:** Authenticate build submission only
- **Token Status:** Active (for build authentication)

### Build Configuration
- **Platform:** Android
- **Profile:** production
- **Build Type:** APK
- **Credentials:** Managed by EAS (auto-generated)
- **Project:** Existing (do not create new)

## How to Build

### Method 1: Using build.sh (Recommended)
```bash
cd /workspace/Thefictionverse
./build.sh
```

### Method 2: Manual Build
```bash
cd /workspace/Thefictionverse
export $(grep -v '^#' .env.local | xargs)
npx eas build --platform android --profile production --non-interactive
```

## What NOT to Do

### ❌ DO NOT:
- Create a new project (`eas init` - project already exists)
- Use `--create-project` flag
- Duplicate token in multiple files
- Hardcode token in eas.json or scripts
- Try to create credentials manually (EAS manages them)
- Modify project ID or owner

### ✅ DO:
- Use `.env.local` as single token source
- Verify token is loaded before building
- Check git status is clean (required for EAS builds)
- Use existing project configuration
- Let EAS manage credentials automatically

## Troubleshooting

### "bearer token is invalid"
**Cause:** Token not loaded or wrong project
**Solution:**
1. Verify token in `.env.local`: `cat .env.local`
2. Check token is loaded: `echo $EXPO_TOKEN`
3. Verify project exists: `cat app.json | grep projectId`

### Project Creation Errors
**Cause:** Attempting to create new project
**Solution:** 
- Do NOT run `eas init`
- Use existing project ID in app.json
- Build command should NOT include project creation flags

### Credentials Errors
**Cause:** Missing or incorrect signing credentials
**Solution:**
- Let EAS auto-generate credentials on first build
- Do NOT create keystore manually
- EAS will handle signing automatically

## Verification Steps

Before building, verify:

1. **Token exists:**
   ```bash
   cat .env.local | grep EXPO_TOKEN
   ```

2. **Project is configured:**
   ```bash
   cat app.json | grep projectId
   ```

3. **Git is clean:**
   ```bash
   git status
   ```

4. **Token loads correctly:**
   ```bash
   export $(grep -v '^#' .env.local | xargs)
   echo $EXPO_TOKEN
   ```

## Expected Build Flow

1. Load token from `.env.local`
2. Verify project exists (Fictionverse)
3. Submit build to EAS
4. EAS auto-generates credentials (first time only)
5. Build server compiles APK
6. APK available for download

## Build Output

After successful build:
- Build URL provided by EAS
- APK download link in EAS dashboard
- Build status available at https://expo.dev

## Project Information

- **Name:** The Fictionverse
- **Slug:** the-fictionverse-
- **Owner:** mortalash2025
- **Project ID:** 21f983d2-2452-4cbe-8472-ebdcc8962bbc
- **Version:** 1.2.0
- **Runtime Version:** 1.2.0

## Support

If build fails:
1. Check this documentation
2. Verify token in `.env.local`
3. Check project ID in `app.json`
4. Ensure git is clean
5. Review EAS build logs