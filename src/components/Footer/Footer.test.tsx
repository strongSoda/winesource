import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Footer from './Footer';

test('renders Footer', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
