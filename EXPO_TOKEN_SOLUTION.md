# EXPO_TOKEN Persistence Solution

## Problem
The EXPO_TOKEN kept disappearing between sessions because:
1. Each command runs in a fresh environment
2. Environment variables don't persist
3. No centralized storage for the token
4. Other agents couldn't find where the token was stored

## Solution
Created a multi-location storage system that saves the EXPO_TOKEN in 3 places:

### Storage Locations
1. **`.env.local`** - Project-specific (gitignored for security)
2. **`../EXPO_TOKEN.txt`** - Workspace root
3. **`/workspace/EXPO_TOKEN.txt`** - Absolute path (works from anywhere)

### New Scripts

#### `set-token.sh` - Save Token Once, Use Everywhere
```bash
./set-token.sh <your_expo_token>
```

This script:
- Saves token to `.env.local`
- Saves token to `../EXPO_TOKEN.txt`
- Saves token to `/workspace/EXPO_TOKEN.txt`
- Sets token for current session
- Provides confirmation message

#### `build.sh` - Smart Token Detection
```bash
./build.sh
```

This script automatically:
- Checks environment variable
- Checks `.env.local` file
- Checks `../EXPO_TOKEN.txt` file
- Checks `/workspace/EXPO_TOKEN.txt` file
- Uses first valid token found
- Provides clear error if none found

## How to Use

### First Time Setup (One Time Only)

**Step 1:** Get your token from:
https://expo.dev/accounts/mortalash2025/settings/access-tokens

**Step 2:** Run the set-token script:
```bash
cd /workspace/Thefictionverse
./set-token.sh <paste_your_token_here>
```

**Step 3:** Verify it was saved:
```bash
cat /workspace/EXPO_TOKEN.txt
cat .env.local | grep EXPO_TOKEN
```

### Building (Any Time)

Just run:
```bash
./build.sh
```

The build script will automatically find and use your token.

## Benefits

✅ **Persistent Storage** - Token saved in 3 locations
✅ **Agent-Friendly** - Other agents can find the token
✅ **Session-Independent** - Works across different sessions
✅ **Automatic Detection** - Build script finds token automatically
✅ **Clear Error Messages** - Tells you exactly what to do if missing
✅ **Security** - `.env.local` is gitignored, tokens not in repo

## File Structure

```
/workspace/
├── EXPO_TOKEN.txt              <- Token here (workspace root)
├── Thefictionverse/
│   ├── .env.local              <- Token here (gitignored)
│   ├── build.sh                <- Finds token automatically
│   ├── set-token.sh            <- Saves token to all locations
│   └── EXPO_TOKEN_SOLUTION.md  <- This file
```

## Troubleshooting

### Build script says "EXPO_TOKEN not found"

Run:
```bash
cat /workspace/EXPO_TOKEN.txt
```

If it says "PASTE YOUR EXPO_TOKEN HERE", then you need to:
1. Get your token from Expo dashboard
2. Run: `./set-token.sh <your_token>`

### Token is invalid/expired

1. Go to: https://expo.dev/accounts/mortalash2025/settings/access-tokens
2. Revoke the old token
3. Create a new token
4. Run: `./set-token.sh <new_token>`

### Different agent can't find token

The agent should:
1. Check `/workspace/EXPO_TOKEN.txt` first
2. Or run: `export $(cat /workspace/EXPO_TOKEN.txt)`
3. Or use `./build.sh` which finds it automatically

## Security Notes

✅ `.env.local` is in `.gitignore` - won't be committed
✅ `../EXPO_TOKEN.txt` is not tracked by git
✅ `/workspace/EXPO_TOKEN.txt` is workspace-only
✅ Tokens can be revoked anytime from Expo dashboard
✅ No tokens in version control

## For Other Agents

If you're another agent working on this project:

**To find the EXPO_TOKEN:**
```bash
cat /workspace/EXPO_TOKEN.txt
```

**To use it:**
```bash
export EXPO_TOKEN=$(cat /workspace/EXPO_TOKEN.txt)
# Now you can use EAS commands
```

**To build:**
```bash
cd /workspace/Thefictionverse
./build.sh
```

## Verification

After setting up, verify everything works:

```bash
# 1. Check token files exist
ls -la /workspace/EXPO_TOKEN.txt
ls -la /workspace/Thefictionverse/.env.local

# 2. Verify token is saved
cat /workspace/EXPO_TOKEN.txt
grep EXPO_TOKEN /workspace/Thefictionverse/.env.local

# 3. Test EAS authentication
export EXPO_TOKEN=$(cat /workspace/EXPO_TOKEN.txt)
eas whoami

# 4. Try building
cd /workspace/Thefictionverse
./build.sh
```

## Summary

This solution ensures:
1. ✅ Token is saved once and persists forever
2. ✅ Any agent can find the token
3. ✅ Works across all sessions
4. ✅ Clear error messages if missing
5. ✅ Security maintained (tokens not in git)
6. ✅ Easy to update if token changes

**No more regenerating tokens!**