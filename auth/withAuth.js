import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getJwt } from '/auth'

const withAuth = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check if the user is authenticated
      const isAuthenticated = getJwt();

      if (isAuthenticated === null) {
        // Redirect to login page if not authenticated
        router.replace('/login');
      }
    }, []);

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  return EnhancedComponent;
};

export default withAuth;

