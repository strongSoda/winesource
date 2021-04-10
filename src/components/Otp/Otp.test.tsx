import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Otp from './Otp';

test('renders Otp', () => {
  render(<Otp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
