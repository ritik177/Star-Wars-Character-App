import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  test('renders current page number', () => {
    render(
      <Pagination
        currentPage={1}
        hasNext={true}
        hasPrevious={false}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );
    expect(screen.getByText('Page 1')).toBeInTheDocument();
  });

  test('disables previous button when hasPrevious is false', () => {
    render(
      <Pagination
        currentPage={1}
        hasNext={true}
        hasPrevious={false}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  test('disables next button when hasNext is false', () => {
    render(
      <Pagination
        currentPage={1}
        hasNext={false}
        hasPrevious={true}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });
});

