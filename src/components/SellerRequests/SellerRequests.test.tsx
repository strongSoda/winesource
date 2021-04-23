import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import SellerRequests from './SellerRequests';

test('renders SellerRequests', () => {
  render(<SellerRequests />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
