import React from 'react';

import { render, screen } from '@testing-library/react';

import Otp from './Otp';

test('renders Otp', () => {
  render(<Otp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
