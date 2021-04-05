import React from 'react';

import { useLocation } from 'react-router-dom';

/**
 * Useful hook for logging the page views to analytics such as Google Analytics
 */
function usePageViews() {
  const location = useLocation();
  React.useEffect(() => {
    // ga.send(['pageview', location.pathname]);
    console.log(`react-router location changed: ${location.pathname}`);
  }, [location]);
}

export default usePageViews;
