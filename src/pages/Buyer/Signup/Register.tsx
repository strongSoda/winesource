import React from 'react';

import { Helmet } from 'react-helmet-async';

import Signup from 'components/Signup';

const Register: React.FC = () => (
  <>
    <Helmet>
      <title>Regsiter</title>
    </Helmet>
    <Signup />
  </>
);
export default Register;
