import React from 'react';

import { Helmet } from 'react-helmet-async';

import AdminLogin from 'components/AdminLogin';

const Signin: React.FC = () => (
  <>
    <Helmet>
      <title>Regsiter | Seller</title>
    </Helmet>
    <AdminLogin />
  </>
);
export default Signin;
