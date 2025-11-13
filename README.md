# Star Wars Character App

A responsive web application that displays Star Wars characters using the Star Wars API (SWAPI). Built with React, Tailwind CSS, and React Testing Library.

## Features

- **Character List**: Browse Star Wars characters with pagination
- **Character Cards**: Beautiful cards with random images and species-based colors
- **Character Details**: Modal view with comprehensive character information including:
  - Name, height, mass, birth year
  - Number of films
  - Date added (formatted as dd-MM-yyyy)
  - Homeworld details (name, terrain, climate, population)
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

The app will open at [http://localhost:5173](http://localhost:5173)

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
  │   └── Error.js               # Error state component
  ├── services/
  │   └── api.js                 # API service functions
  ├── App.js                     # Main app component
  ├── index.js                   # App entry point
  └── index.css                  # Global styles with Tailwind
```

## API Endpoints Used

- Characters: `https://swapi.dev/api/people/?format=json`
- Homeworld: Fetched from character's homeworld URL
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

