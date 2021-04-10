import React from 'react';

import { render, screen } from '@testing-library/react';

import Dashboard from './Dashboard';

test('renders Dashboard', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
