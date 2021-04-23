import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Product from './Product';

test('renders Product', () => {
  render(<Product />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
