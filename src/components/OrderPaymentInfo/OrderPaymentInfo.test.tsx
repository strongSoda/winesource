import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import OrderPaymentInfo from './OrderPaymentInfo';

test('renders OrderPaymentInfo', () => {
  render(<OrderPaymentInfo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
