import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GenreFinder from './App';

describe('GenreFinder', () => {
  it('renders loading state initially', () => {
    render(<GenreFinder />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});