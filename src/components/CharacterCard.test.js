import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import CharacterCard from './CharacterCard';

const mockCharacter = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  species: [],
  url: 'https://swapi.dev/api/people/1/',
};

describe('CharacterCard', () => {
  test('renders character name', () => {
    render(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  test('renders birth year', () => {
    render(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    expect(screen.getByText(/born: 19bby/i)).toBeInTheDocument();
  });

  test('handles click event', () => {
    const handleClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={handleClick} />);
    const card = screen.getByText('Luke Skywalker').closest('div');
    card.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

