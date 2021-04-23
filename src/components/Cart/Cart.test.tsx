import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Cart from './Cart';

test('renders Cart', () => {
  render(<Cart />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
