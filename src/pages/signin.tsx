import React from 'react';
import Login from 'components/Login';

import { Helmet } from 'react-helmet-async';

const Signin: React.FC = () => (
  <>
    <Helmet>
      <title>Regsiter</title>
    </Helmet>
    <Login />
  </>
);
export default Signin;
