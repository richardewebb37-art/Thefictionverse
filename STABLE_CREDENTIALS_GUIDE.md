# Stable Credential Management Guide

## ⚠️ CRITICAL RULES FOR CODE NINJA

### DO NOT:
- ❌ Regenerate EXPO_TOKEN
- ❌ Regenerate or recreate keystore
- ❌ Move or delete credential files
- ❌ Create backup copies of credentials
- ❌ Try to create a new project
- ❌ Use credentials from anywhere except stable locations
- ❌ Modify .gitignore to exclude credentials

### DO:
- ✅ Use `.credentials/.env` for EXPO_TOKEN (ONLY)
- ✅ Use `android/credentials/fictionverse-keystore.jks` for keystore (ONLY)
- ✅ Use `credentials.json` for EAS credentials configuration (ONLY)
- ✅ Build to existing project only (do not create new)
- ✅ Keep all credential files in their designated locations
- ✅ Use the stable build script (./build.sh)

## Stable Credential Locations

### 1. EXPO_TOKEN
**File:** `.credentials/.env`
**Variable:** `EXPO_TOKEN=nn04KaVlIrbxPR6O-W_mnrzXVZrHgUsZBFUM4b1D`
**Status:** STABLE - Do NOT regenerate

### 2. Android Keystore
**File:** `android/credentials/fictionverse-keystore.jks`
**Password:** `FictionverseKS123`
**Key Alias:** `fictionverse_key`
**Status:** STABLE - Do NOT regenerate

### 3. EAS Credentials Configuration
**File:** `credentials.json`
**Status:** STABLE - Do NOT modify

### 4. Project Information
**File:** `.credentials/credentials-config.json`
**Status:** STABLE - Do NOT modify

## Build Process

### Always Use the Stable Build Script:
```bash
./build.sh
```

### What the Script Does:
1. Loads EXPO_TOKEN from `.credentials/.env` (stable location)
2. Verifies stable keystore exists
3. Checks git is clean
4. Submits build to EAS using stable credentials
5. Prevents credential regeneration

### What the Script Does NOT Do:
- ❌ Regenerate tokens
- ❌ Regenerate keystores
- ❌ Create new projects
- ❌ Move credential files
- ❌ Create backup copies

## Troubleshooting

### "Bearer token is invalid"
**Solution:** 
1. Verify token is in `.credentials/.env`
2. Do NOT regenerate token
3. Check token is loaded correctly
4. Verify project ID is correct

### "Keystore not found"
**Solution:**
1. Check `android/credentials/fictionverse-keystore.jks` exists
2. Do NOT regenerate keystore
3. Verify keystore path in credentials.json
4. Ensure keystore was not moved

### "Working tree is dirty"
**Solution:**
1. Commit all changes
2. Do NOT skip this step
3. EAS requires clean git tree
4. Check with: `git status`

### Credentials Keep Disappearing
**Solution:**
1. Check .gitignore is correct
2. Ensure credentials are in stable locations
3. Do NOT move or regenerate credentials
4. Use stable build script only

## Project Information

- **Name:** The Fictionverse
- **Slug:** the-fictionverse-
- **Owner:** mortalash2025
- **Project ID:** 21f983d2-2452-4cbe-8472-ebdcc8962bbc
- **Version:** 1.2.0
- **Runtime Version:** 1.2.0

## Verification Steps

Before building, verify:

1. **Stable token exists:**
   ```bash
   cat .credentials/.env | grep EXPO_TOKEN
   ```

2. **Stable keystore exists:**
   ```bash
   ls -la android/credentials/fictionverse-keystore.jks
   ```

3. **Credentials configured:**
   ```bash
   cat credentials.json
   ```

4. **Git is clean:**
   ```bash
   git status
   ```

5. **Build script is stable:**
   ```bash
   ./build.sh --help 2>&1 | head -20
   ```

## Important Notes

1. **Single Source of Truth:** All credentials have ONE location
2. **No Regeneration:** Credentials are created once and never changed
3. **No Moving:** Credentials stay in their designated locations
4. **No Backups:** Do not create duplicate credential files
5. **Stable Build Process:** Always use ./build.sh

## If You Must Update Credentials

⚠️ **WARNING:** Only update credentials if absolutely necessary

1. Update the credential file in its stable location
2. Test authentication
3. Verify build works
4. Update documentation
5. Commit changes

Do NOT create new credential files or move existing ones.

## Contact

If you encounter credential issues:
1. Check this guide first
2. Verify stable locations
3. Check git status
4. Review build script output
5. Contact project owner

## Summary

- **Stable credentials** = Consistent builds
- **Single source of truth** = No confusion
- **No regeneration** = No breaking changes
- **Stable locations** = No lost files
- **Stable build script** = Automated, reliable builds