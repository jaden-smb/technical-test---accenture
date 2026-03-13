# Technical Test - Accenture by Santiago Montoya
This is a task manager built with Ionic and Angular, designed to be deployed on Android and iOS using Cordova. It allows users to create, edit, delete, and complete tasks, organize them by color-coded categories, view detailed task information, and includes a dark mode toggle and a settings page for basic configuration.

## Installation

### Prerequisites

- Node.js 18+
- npm 9+
- Ionic CLI: `npm install -g @ionic/cli`
- Cordova CLI: `npm install -g cordova`
- For Android: Android SDK + Android Studio
- For iOS: Xcode (macOS only)

### Setup

```bash
git clone https://github.com/jaden-smb/technical-test---accenture.git
cd technical-test---accenture

# Install dependencies
npm install

## Running the App

```bash
# Start development server
npm run start

# Run E2E tests (headless)
npm run e2e

# Open Cypress test runner
npm run e2e:open

# Run unit tests
npm run test

# Lint
npm run lint
```

## Building for Mobile

### Android

```bash
# Add Android platform
ionic cordova platform add android

# Build for Android (production)
npm run android
# or
ionic cordova build android --prod

# Run on device/emulator
npm run android:run
```

### iOS (macOS only)

```bash
# Add iOS platform
ionic cordova platform add ios

# Build for iOS (production)
npm run ios
# or
ionic cordova build ios --prod

# Run on device/simulator
npm run ios:run
```

## Feature Flag Implementation

The app uses **Firebase Remote Config** to control feature visibility at runtime.

### How It Works

1. **`FeatureFlagService`** (`src/app/core/services/feature-flag.service.ts`) initializes during app startup via `provideAppInitializer`
2. It fetches remote config values from Firebase and exposes them as RxJS observables
3. Components subscribe to `categoriesEnabled$` to show/hide category-related UI

### Feature: `enable_task_categories`

`true`: Category selector visible in task form, category filter visible in task list, categories page accessible from settings.

`false`: All category-related UI is completely hidden.

### Fallback Behavior

If Firebase is unavailable (offline, misconfigured), the app defaults to `enable_task_categories = true` so all features remain accessible.
