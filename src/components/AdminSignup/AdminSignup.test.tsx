import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import AdminSignup from './AdminSignup';

test('renders AdminSignup', () => {
  render(<AdminSignup />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
