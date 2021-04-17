import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Inventory from './Inventory';

test('renders Inventory', () => {
  render(<Inventory />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
