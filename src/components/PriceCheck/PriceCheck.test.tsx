import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import PriceCheck from './PriceCheck';

test('renders PriceCheck', () => {
  render(<PriceCheck />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
