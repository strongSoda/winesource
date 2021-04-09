import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import AdminLogin from './AdminLogin';

test('renders AdminLogin', () => {
  render(<AdminLogin />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
