# Stable Credentials Directory

## ⚠️ CRITICAL: DO NOT MODIFY OR DELETE FILES IN THIS DIRECTORY

This directory contains all stable credentials for The Fictionverse project.

## Files in This Directory

- `.env` - EXPO_TOKEN (single source of truth)
- `keystore-info.json` - Android keystore credentials
- `credentials-config.json` - EAS credentials configuration

## Rules

1. **DO NOT** modify these files
2. **DO NOT** delete these files
3. **DO NOT** create backup copies elsewhere
4. **DO NOT** regenerate tokens or keystores
5. **ALWAYS** use these files as the single source of truth
6. **NEVER** overwrite or move these files

## Credential Information

### EXPO_TOKEN
- Location: `.env`
- Variable: `EXPO_TOKEN=nn04KaVlIrbxPR6O-W_mnrzXVZrHgUsZBFUM4b1D`
- Purpose: EAS build authentication
- Status: Active (do not regenerate)

### Android Keystore
- Location: `android/credentials/fictionverse-keystore.jks`
- Password: `FictionverseKS123`
- Key Alias: `fictionverse_key`
- Status: Created and stable (do not regenerate)

### Project Information
- Name: The Fictionverse
- Slug: the-fictionverse-
- Owner: mortalash2025
- Project ID: 21f983d2-2452-4cbe-8472-ebdcc8962bbc

## Build Process

Always use the stable build script:
```bash
./build.sh
```

This script automatically loads credentials from this directory.