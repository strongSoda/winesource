import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import SellerOrders from './SellerOrders';

test('renders SellerOrders', () => {
  render(<SellerOrders />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
