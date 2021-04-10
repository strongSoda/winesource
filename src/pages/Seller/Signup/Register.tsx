import React from 'react';

import { Helmet } from 'react-helmet-async';

import AdminSignup from 'components/AdminSignup';

const Register: React.FC = () => (
  <>
    <Helmet>
      <title>Regsiter | Seller</title>
    </Helmet>
    <AdminSignup />
  </>
);
export default Register;
