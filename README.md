# GoMate - Sri Lanka Transport App

GoMate is a comprehensive transport and travel application for exploring Sri Lanka, helping users find destinations, plan routes, and discover the beauty of Sri Lanka.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator / Android Emulator / Expo Go app

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

### Environment Setup

Copy `.env.example` to `.env` and configure your API keys:

```bash
cp .env.example .env
```

## Project Structure

- `/app` - Application screens and navigation
  - `/(auth)` - Authentication screens (login, signup)
  - `/(main)` - Main app screens
    - `/(tabs)` - Bottom tab navigation screens
- `/components` - Reusable UI components
- `/services` - API and data services
- `/context` - React context providers
- `/types` - TypeScript type definitions
- `/utils` - Helper functions and utilities
- `/constants` - App constants and theme configuration
- `/hooks` - Custom React hooks

## Features

- **Destination Discovery**: Explore popular Sri Lankan destinations
- **Route Planning**: Find and save transport routes
- **Favourites**: Save favorite destinations, routes, and schedules
- **User Authentication**: Secure login and profile management
- **Theme Support**: Light and dark mode
- **Search**: Find destinations across Sri Lanka

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

