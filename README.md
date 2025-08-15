# RN Movie UI

A React Native application for browsing movies, built with Expo and Appwrite (Backend as a Service).

## Features

- **Authentication:** Secure user login.
- **Movie Browsing:** View lists of trending and the latest movies.
- **Search:** Find movies by title.
- **Saved Movies:** Users can save their favorite movies.
- **Profile:** View user profile.

## Screenshots

-- ** 7 screenshots: https://github.com/keosophon/rn_movie_ui/wiki

## Technologies Used

- **React Native:** A framework for building native apps using React.
- **Expo:** A platform for making universal React applications.
- **Appwrite:** Backend server for authentication and data.
- **TypeScript:** A typed superset of JavaScript.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Expo Router:** File-based routing for React Native.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/keosophon/rn-movie-ui.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd rn_movie_ui
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
4. **Set up Appwrite:**
   - Create an Appwrite project.
   - Create a `.env` file in the root of the project and add your Appwrite configuration:
     ```
   EXPO_PUBLIC_MOVIE_API_KEY=...
EXPO_PUBLIC_APPWRITE_PROJECT_ID = ...
EXPO_PUBLIC_APPWRITE_ENDPOINT=...
EXPO_PUBLIC_DATABASE_ID = ...
EXPO_PUBLIC_MOVIE_COLLECTION_ID = ...
EXPO_PUBLIC_FAVORITE_COLLECTION_ID = ...
     ```

### Running the App

- **Start the development server:**
  ```bash
  npm start
  ```
  or
  ```bash
  yarn start
  ```
- **Run on Android:**
  ```bash
  npm run android


## Project Structure

```
rn_movie_ui/
├── app/                  # Main application code, structured with Expo Router
│   ├── (auth)/           # Authentication-related screens
│   ├── (tabs)/           # Main app screens after login
│   ├── components/       # Reusable components
│   └── ...
├── assets/               # Images, fonts, and other static assets
├── constants/            # Constant values used throughout the app
├── services/             # Services for API calls, Appwrite, etc.
├── tailwind.config.js    # Tailwind CSS configuration
└── ...
```
