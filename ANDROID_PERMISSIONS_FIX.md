# Android Permissions Fix - Clean Prebuild Implementation

## Problem
APK was installing successfully but missing critical hardware permissions:
- ❌ Camera
- ❌ Microphone/Audio
- ❌ Media access

Only "Phone" permission was available, causing hardware access failures.

## Root Cause
- Android folder existed while permissions were defined in app.json
- EAS ignores app.json android config when native folders exist
- AndroidManifest.xml was generated without proper permissions

## Solution Applied

### Step 1: Removed Native Folders
```bash
rm -rf android ios
```

### Step 2: Defined Permissions in app.json
```json
{
  "expo": {
    "name": "The Fictionverse",
    "slug": "the-fictionverse-",
    "version": "1.1.0",
    "owner": "mortalash2025",
    "runtimeVersion": "1.1.0",
    "extra": {
      "eas": {
        "projectId": "21f983d2-2452-4cbe-8472-ebdcc8962bbc"
      }
    },
    "android": {
      "package": "com.anonymous.thefictionverse",
      "permissions": [
        "CAMERA",
        "RECORD_AUDIO",
        "READ_MEDIA_IMAGES",
        "READ_MEDIA_VIDEO",
        "READ_MEDIA_AUDIO"
      ]
    },
    "ios": {
      "bundleIdentifier": "com.anonymous.thefictionverse"
    }
  }
}
```

### Step 3: Clean Prebuild
```bash
npx expo prebuild --clean
```

This regenerated:
- AndroidManifest.xml with all permissions
- Gradle configurations
- Native modules

### Step 4: Verified AndroidManifest.xml

✅ All required permissions confirmed present:
- android.permission.CAMERA
- android.permission.RECORD_AUDIO
- android.permission.READ_MEDIA_IMAGES
- android.permission.READ_MEDIA_VIDEO
- android.permission.READ_MEDIA_AUDIO

## Expected Result

After installing the APK on tablet, Settings → App Permissions will show:
- ✅ Camera
- ✅ Microphone
- ✅ Media

Hardware APIs will function correctly with proper permission toggles.

## Important Rules Going Forward

### ❌ DO NOT:
- Manually edit AndroidManifest.xml
- Keep android/ folder between template clones
- Ignore permission warnings
- Assume runtime JS can enable hardware

### ✅ DO:
- Treat app.json as source of truth
- Clean prebuild before major changes
- Rebuild APK after permission edits
- Keep Nexus Forge clone-safe

## Compliance
- ✅ Android 13+ compliant
- ✅ No deprecated storage permissions
- ✅ Tablet-safe permissions
- ✅ Proper Expo SDK 54 configuration

## Final Status
Nexus Forge is now:
- Stable base template
- Hardware-capable
- Game-engine compatible
- Safe for cloning into Fictionverse, ELD, or future apps

---
**Date:** January 20, 2026
**Project:** The Fictionverse
**Version:** 1.1.0