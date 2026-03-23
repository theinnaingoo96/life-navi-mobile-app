# Life Navi Mobile App

A comprehensive mobile application for community news and stories, built with **React Native CLI**.

## Features

- **User Authentication**: Secure login and session management.
- **News Feed**: Browse and search news articles with category filtering.
- **Story Submission**: Users can submit their own stories with images and metadata.
- **My Stories**: Track and manage submitted stories (Published, Pending, Drafts, Rejected).
- **Localization Utility**: Custom utility to handle localized content from the API.
- **Smooth Navigation**: Tab and stack navigation for a seamless user experience.

## Tech Stack

- **Framework**: React Native (CLI)
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack, Tab)
- **State Management**: 
  - **Server State**: TanStack Query (React Query)
  - **Local State**: Zustand
- **Styling**: Standard React Native StyleSheet
- **Icons**: Lucide React Native
- **Date Handling**: date-fns
- **Form Handling**: react-hook-form

## Project Structure

```
src/
├── assets/         # App assets (images, icons, etc.)
├── components/     # Reusable UI components (Button, Chip, StoryCard, etc.)
├── constants/      # App constants, colors, and typography
├── hooks/          # Custom hooks (useMyStories, useArticleDetail, etc.)
├── navigation/     # Navigation setup and RootStack definitions
├── screens/        # Screen components (Home, MyStories, StoryDetail, etc.)
├── services/       # API client and services (articleService, authService, etc.)
├── store/          # Global state management (Zustand)
├── types/          # TypeScript definitions and interfaces
└── utils/          # Utility functions (localization, etc.)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) (Follow the CLI instructions for your OS)
- iOS: Xcode and CocoaPods
- Android: Android Studio and SDK

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd life-navi-mobile-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (iOS Only) Install pods:
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

1. Start the Metro Bundler:
   ```bash
   npm start
   ```

2. Run on a specific platform:
   - **iOS**: `npm run ios`
   - **Android**: `npm run android`

## Development

### Environment Variables

The project uses `react-native-dotenv` for environment variables. Ensure you have a `.env` file in the root:

```env
API_BASE_URL=https://your-api.com/api
API_KEY=your-api-key
```

### Type Checking

```bash
npx tsc --noEmit
```

## License

[MIT](LICENSE)
