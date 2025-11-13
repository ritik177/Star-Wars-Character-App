import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import App from './App';

// Mock the API service
vi.mock('./services/api', () => ({
  fetchCharacters: vi.fn(),
}));

import { fetchCharacters } from './services/api';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state initially', () => {
    fetchCharacters.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<App />);
    expect(screen.getByText(/loading characters/i)).toBeInTheDocument();
  });

  test('renders error state when API fails', async () => {
    fetchCharacters.mockRejectedValue(new Error('API Error'));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  test('renders characters when API succeeds', async () => {
    const mockData = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          birth_year: '19BBY',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: [],
          species: [],
          created: '2014-12-09T13:50:51.644000Z',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    };

    fetchCharacters.mockResolvedValue(mockData);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });
});

