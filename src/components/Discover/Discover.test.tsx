import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Discover from './Discover';

test('renders Discover', () => {
  render(<Discover />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
