---
title: MABULIG AR Biodiversity — Mobile Prototype
version: 2.0.0
status: refined
last_updated: 2026-06-22
agent_notes: |
  This file is the complete plan for the mobile prototype.
  The web prototype has its own separate PLAN.md in ../web-app-3d-model-integration-demo/PLAN.md
  
  This mobile app is a WebView wrapper — it loads the deployed web prototype
  inside a React Native container. It does NOT contain native AR logic in this phase.
  
  An AI agent implementing this plan should:
  1. Read all sections top-to-bottom before writing any code.
  2. Follow tasks in order.
  3. Use the code snippets verbatim; they are copy-paste ready.
  4. DEPENDENCY: The web prototype must be deployed to Vercel before this runs.
  5. Replace VERCEL_URL placeholder with the actual deployed URL from the web team.
tags: [react-native, expo, webview, augmented-reality, biodiversity]
---

# MABULIG AR Biodiversity — Mobile Prototype

## Project Goal

Develop a mobile prototype demonstrating how a 3D biodiversity model web app
can be wrapped in a React Native container for iOS and Android deployment.

### Objectives

- Load the deployed web prototype in a `react-native-webview`
- Display the 3D viewer, metadata, and AR modal on mobile devices
- Respect safe areas (notches, home indicators)
- Provide a foundation for future native AR integration (ARCore / ARKit)

---

## Technology Stack

| Layer | Choice |
|-------|--------|
| Framework | React Native (Expo) |
| Web Consumer | `react-native-webview` |
| Deployment | Expo Go (development); EAS Build / App Store / Play Store (production) |
| Content Source | Next.js web prototype (deployed to Vercel) |

---

## Architecture

```
Web Prototype (Vercel)
      │
      ▼
HTTP GET https://your-prototype.vercel.app
      │
      ▼
react-native-webview
      │
      ▼
SafeAreaView (mobile app container)
      │
 ┌────┴────┐
 ▼         ▼
 iOS      Android

── Future Extension ──────────────────────
Native AR (ARCore / ARKit)
      │
      ▼
Live camera + 3D model overlays
```

---

## Prerequisites

**Before starting this task:**
1. The web prototype must be deployed to Vercel.
2. Copy the production URL (e.g., `https://mabulig-web.vercel.app`).
3. Replace the `VERCEL_URL` placeholder in `App.tsx` with the actual URL.

---

## Mobile Prototype Setup

### Task 1 — Initialize Expo project

```bash
npx create-expo-app .
```

Done when: `npx expo start` launches the Expo development server.

---

### Task 2 — Install `react-native-webview`

```bash
npx expo install react-native-webview
```

Done when: `npm ls react-native-webview` shows the package installed.

---

### Task 3 — Create `App.tsx`

Replace the default `App.tsx` with the implementation below.

#### Implementation: `App.tsx`

```tsx
import { SafeAreaView, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

// IMPORTANT: Replace this with the actual Vercel URL from the web team
const VERCEL_URL = 'https://your-prototype.vercel.app'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: VERCEL_URL }}
        style={styles.webview}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
})
```

**Acceptance criteria:**
- [ ] App launches without errors on iOS Simulator or Android Emulator
- [ ] Web app loads inside the WebView
- [ ] SafeAreaView prevents content from being obscured by notches/home indicators

Done when: Full web prototype renders in the mobile simulator with all
features (3D viewer, metadata, AR modal) working.

---

## Configuration

### Update `app.json` for production metadata

> **Agent note:** These settings are optional but recommended for production builds.

```json
{
  "expo": {
    "name": "MABULIG Biodiversity",
    "slug": "mabulig-biodiversity",
    "version": "1.0.0",
    "assetBundlePatterns": ["**/*"],
    "platforms": ["ios", "android"],
    "plugins": [],
    "ios": {
      "supportsTabletMode": true,
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "versionCode": 1
    }
  }
}
```

---

## Testing

### Local Testing (Expo Go)

```bash
npx expo start
```

Scan the QR code with Expo Go (iOS or Android).

### iOS Simulator

```bash
npx expo start --ios
```

### Android Emulator

```bash
npx expo start --android
```

---

## Production Build & Deployment

### Build for iOS (requires macOS + Apple Developer account)

```bash
eas build --platform ios
```

### Build for Android

```bash
eas build --platform android
```

### Submit to App Store / Play Store

```bash
eas submit --platform ios
eas submit --platform android
```

> **Agent note:** `eas` requires authentication via `eas login`. See https://docs.expo.dev/build/setup/ for setup.

---

## Deliverables

- [x] Prototype plan (this file)
- [ ] React Native + Expo project
- [ ] `App.tsx` with `react-native-webview` configured
- [ ] Tested on iOS Simulator and Android Emulator
- [ ] Production build configuration (`app.json`)

---

## Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | App launches without runtime errors |
| 2 | Web prototype loads and renders in the WebView |
| 3 | Safe areas respected (no content obscured by notches) |
| 4 | All web features work: 3D viewer, rotate, zoom, metadata, AR modal |
| 5 | Responsive layout adapts to mobile viewport |
| 6 | Ready for future ARCore / ARKit native integration |

---

## AR Integration Roadmap

| Phase | Title | Status | Notes |
|-------|-------|--------|-------|
| 1 | Interactive 3D Models (Web) | ✅ Web prototype complete | Responsive web app deployed to Vercel |
| 2 | Mobile WebView Wrapper | 🔄 Current phase | Load web app in React Native container |
| 3 | WebXR Integration (Optional) | Planned | Browser-based AR on mobile web |
| 4 | Native ARCore / ARKit | Planned | Replace WebView with native AR camera overlay |
| 5 | Location-Based Biodiversity Learning | Planned | Geolocation + biodiversity data integration |

---

## Dependency: Web Prototype URL

**This mobile app requires the web prototype to be deployed.**

Before building and testing this app:
1. Complete all tasks in `../web-app-3d-model-integration-demo/PLAN.md`
2. Deploy the web app to Vercel
3. Copy the production URL (e.g., `https://mabulig-web.vercel.app`)
4. Update the `VERCEL_URL` constant in `App.tsx`
5. Test in the simulator to confirm the web app loads

If the web URL changes, update `App.tsx` and rebuild the mobile app.

---

## Next Steps

1. Wait for the web team to deploy to Vercel and provide the production URL.
2. Update `VERCEL_URL` in `App.tsx` with that URL.
3. Run `npx expo start --ios` or `npx expo start --android` to test.
4. Build and submit to App Store / Play Store when ready for production.

---

## Troubleshooting

### WebView shows a blank screen

- Verify `VERCEL_URL` is correct and the web app is deployed.
- Check network connectivity in the simulator.
- Use the Expo Go app's "Recent" tab to see errors.

### Content obscured by notch or home indicator

- `SafeAreaView` should handle this automatically. If not, add explicit padding:

```tsx
<SafeAreaView style={[styles.container, { paddingTop: 20, paddingBottom: 20 }]}>
```

### App crashes on launch

- Check Expo logs: `npx expo start` displays detailed error messages.
- Ensure `react-native-webview` is installed: `npx expo install react-native-webview`

