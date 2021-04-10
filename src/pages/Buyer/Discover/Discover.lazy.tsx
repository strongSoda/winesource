import React, { lazy, Suspense } from 'react';

const LazyDiscover = lazy(() => import('./Discover'));

const Discovery = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDiscover {...props} />
  </Suspense>
);

export default Discovery;
