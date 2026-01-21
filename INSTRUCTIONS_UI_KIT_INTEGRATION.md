# UI Kit Integration Instructions

## Overview
Download and integrate UI kit assets from Google Drive into The Fictionverse project.

## Google Drive Link
**Please provide the Google Drive link here:**

```
[LINK WILL BE INSERTED HERE]
```

**Make sure the link is set to "Anyone with the link can view/download"**

## Instructions for Code Ninja

### 1. Download the Files
- Download the entire folder from the provided Google Drive link
- Verify the link is publicly accessible (anyone with link can view/download)

### 2. File Placement
- Place the entire folder into: `src/assets/ui-kit/`
- Maintain the original folder structure from the download

### 3. What These Files Are
**[Please specify what type of files these are:]**
- Are they images?
- Are they SVGs?
- Are they React Native component files?
- Are they fonts?
- Are they a complete UI kit (buttons, cards, profiles, icons, etc.)?

### 4. Folder Structure
Create or maintain this structure:

```
src/
  assets/
    ui-kit/
      [Specify subfolder structure here]
```

Example structure:
```
src/
  assets/
    ui-kit/
      buttons/
      cards/
      profiles/
      icons/
      fonts/
```

### 5. Integration Instructions
**[Please provide specific integration instructions:]**

Example integration tasks:
- Replace placeholder components in HomeScreen with UI kit components
- Replace placeholder components in ProfileScreen with UI kit components
- Replace placeholder components in SettingsScreen with UI kit components
- Keep EngineStatusBar intact
- Keep Bottom Tabs intact
- Keep all engine logic (EngineContext, EngineDataProvider) intact
- Do not alter navigation structure

### 6. What NOT to Modify
- ❌ Do NOT alter engine logic (EngineStatusBar, EngineContext, EngineDataProvider)
- ❌ Do NOT modify navigation structure (Bottom Tabs)
- ❌ Do NOT change authentication or state management
- ❌ Do NOT modify existing screen names or routing

### 7. Testing Requirements
- [ ] Verify all UI kit components render correctly
- [ ] Test navigation between screens
- [ ] Verify engine data still displays correctly
- [ ] Test responsive layouts
- [ ] Check for any TypeScript errors
- [ ] Run expo doctor to check for issues

## Example Full Instruction Template

**Replace the placeholders below with your specific instructions:**

```
Download the shared Google Drive folder here:
[INSERT GOOGLE DRIVE LINK HERE]

Place the entire folder into the project at src/assets/ui-kit/

Folder structure should be:
src/
  assets/
    ui-kit/
      [INSERT YOUR FOLDER STRUCTURE HERE]

These are [INSERT FILE TYPE - e.g., React Native UI kit components], including [LIST CONTENTS - e.g., profiles, buttons, cards, icons].

Integration tasks:
- Replace placeholder components in [LIST SCREENS] with corresponding UI kit components
- Keep all engine logic (EngineStatusBar, Bottom Tabs, EngineContext) intact
- Do not alter navigation
- [INSERT ANY ADDITIONAL INSTRUCTIONS]
```

## Before Providing to Code Ninja

Please complete these sections:

1. ✅ **Google Drive Link:** [INSERT LINK]
2. ✅ **File Type:** [What type of files are these?]
3. ✅ **Folder Structure:** [What should the structure be?]
4. ✅ **Integration Tasks:** [What screens/components should be replaced?]
5. ✅ **What to Keep Intact:** [What should NOT be modified?]

## Notes

- Ensure the Google Drive link is publicly accessible
- The download should preserve the original folder structure
- Test thoroughly after integration
- Commit changes with clear message describing UI kit integration