import React from 'react';

import { OtpWrapper } from './Otp.styles';

declare interface IOtpProps {}

const OTP: React.FC = (props: IOtpProps) => (
  <OtpWrapper data-testid="Otp">
    <span>Otp Component</span>
  </OtpWrapper>
);

export default OTP;
