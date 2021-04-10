import React, { lazy, Suspense } from 'react';

const LazyOtp = lazy(() => import('./Otp'));

const Otp = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOtp {...props} />
  </Suspense>
);

export default Otp;
