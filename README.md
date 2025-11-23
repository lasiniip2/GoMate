# GoMate 
A mobile app for exploring Sri Lanka's public transportation and tourist destinations. Built with React Native and Expo.

## Features
- User authentication and profile management
- Browse and search destinations
- Find public transport routes
- Save favorite destinations, routes, and schedules
- Dark/light theme support
- View nearby stations and schedules

## Tech Stack
- React Native + Expo
- TypeScript
- Expo Router (file-based routing)
- React Context for state management
- AsyncStorage for local data

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npx expo start
   ```
3. Run on device:
   - Press `a` for Android
   - Press `i` for iOS
   - Scan QR code with Expo Go

## Project Structure
```
app/              # Screens (file-based routing)
components/       # Reusable UI components
context/          # Global state management
services/         # API and business logic
types/            # TypeScript definitions
utils/            # Helper functions
constants/        # Theme and config
```

## Environment Setup
Copy `.env.example` to `.env` and add your configuration.

