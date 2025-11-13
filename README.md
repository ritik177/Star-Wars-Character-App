# Star Wars Character App

A responsive web application that displays Star Wars characters using the Star Wars API (SWAPI). Built with React, Vite, Tailwind CSS, and features mock authentication with JWT token management.

## Features

- **Authentication**: Mock login/logout system with JWT tokens and automatic token refresh
- **Character List**: Browse Star Wars characters with pagination
- **Search**: Real-time search by character name (case-insensitive partial matching)
- **Filters**: Filter characters by homeworld, film, or species
- **Combined Search & Filters**: Use search and filters together for precise results
- **Character Cards**: Beautiful cards with random images and species-based colors
- **Character Details**: Modal view with comprehensive character information including:
  - Name, height, mass, birth year
  - Number of films
  - Date added (formatted as dd-MM-yyyy)
  - Homeworld details (name, terrain, climate, population)
- **Active Filters Indicator**: Visual badges showing active search and filters
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Loading & Error States**: Graceful handling of API loading and errors

## Tech Stack

- React 18 (functional components with hooks)
- Vite 5 (build tool and dev server)
- Tailwind CSS 3
- Vitest (testing framework)
- React Testing Library
- SWAPI (Star Wars API)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will open at [https://star-wars-character-app-seven.vercel.app/](https://star-wars-character-app-seven.vercel.app/)

## Authentication & Login

The app uses mock authentication with JWT tokens. To access the application:

1. **Login Page**: When you first open the app, you'll see the login page
2. **Demo Credentials**:
   - **Username**: `admin`
   - **Password**: `password123`
3. **Login Process**:
   - Enter the credentials and click "Login"
   - The app will generate a mock JWT token and store it in localStorage
   - You'll be redirected to the main character browsing interface
4. **Token Management**:
   - Tokens are automatically refreshed when they expire in less than 5 minutes
   - Token refresh runs silently in the background every minute
   - If token refresh fails, you'll be automatically logged out
5. **Logout**:
   - Click the "Logout" button in the header to sign out
   - All authentication data will be cleared

## Available Scripts

- `npm run dev` - Runs the app in development mode with Vite
- `npm run build` - Builds the app for production (outputs to `dist/`)
- `npm run preview` - Preview the production build locally
- `npm test` - Runs tests with Vitest
- `npm run test:ui` - Runs tests with Vitest UI

## Project Structure

```
src/
  ├── components/
  │   ├── CharacterCard.js       # Character card component
  │   ├── CharacterDetails.js    # Character details modal
  │   ├── Pagination.js          # Pagination controls
  │   ├── Loading.js             # Loading state component
  │   ├── Error.js               # Error state component
  │   ├── Search.js               # Search input component
  │   ├── Filters.js              # Filter dropdowns component
  │   ├── ActiveFilters.js        # Active filters indicator
  │   ├── Login.js                # Login page component
  │   ├── LogoutButton.js         # Logout button with user avatar
  │   └── Footer.js               # Footer component
  ├── services/
  │   ├── api.js                  # API service functions
  │   └── auth.js                 # Authentication service (mock JWT)
  ├── App.js                      # Main app component
  ├── index.js                    # App entry point
  └── index.css                   # Global styles with Tailwind
```

## Usage

### Searching Characters
- Use the search bar at the top to search for characters by name
- Search is case-insensitive and supports partial matching
- Example: Typing "luke" will find "Luke Skywalker"

### Filtering Characters
- Use the filter dropdowns to filter by:
  - **Homeworld**: Filter by character's home planet
  - **Film**: Filter by characters appearing in specific films
  - **Species**: Filter by character species
- Multiple filters can be combined
- Filters work together with search for precise results

### Active Filters
- Active search and filters are displayed as badges
- Click the × on any badge to remove that filter
- Use "Clear All" to reset both search and filters
- Result count shows how many characters match your criteria

### Character Details
- Click on any character card to view detailed information
- Modal displays comprehensive character data including homeworld details

## API Endpoints Used

- Characters: `https://swapi.dev/api/people/?format=json`
- Homeworld: Fetched from character's homeworld URL
- Films: Fetched from character's film URLs
- Species: Fetched from character's species URLs
- Images: Random images from Picsum Photos (seeded by character name)

## Testing

Run tests with:
```bash
npm test
```

Tests are written using React Testing Library and cover:
- App component (loading, error, and success states)
- CharacterCard component
- Pagination component

## Authentication Details

The app implements a mock authentication system:

- **Mock JWT Tokens**: Tokens are generated locally (not real JWT)
- **Token Storage**: Tokens stored in browser localStorage
- **Token Expiry**: Access tokens expire in 1 hour, refresh tokens in 24 hours
- **Automatic Refresh**: Tokens are automatically refreshed before expiry
- **No Backend Required**: All authentication logic is client-side only

## Theme & Design

- **Color Scheme**: Black background with cyan accents
- **Star Wars Logo**: Featured in the navigation header
- **Responsive**: Fully responsive design for all screen sizes
- **Dark Mode**: Optimized for dark theme viewing

