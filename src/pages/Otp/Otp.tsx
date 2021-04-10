import React from 'react';
import Otp from 'components/Otp';

import { Helmet } from 'react-helmet';

const VerifyOtp: React.FC = () => (
  <>
    <Helmet>
      <title>Verify Otp</title>
    </Helmet>
    <div data-testid="Otp">
      <Otp/>
    </div>
  </>
);

export default VerifyOtp;
