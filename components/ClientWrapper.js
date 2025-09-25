'use client';

import React, { useEffect, useState } from 'react';
import Preloader from "@/components/Preloader";
import { toast } from "@/components/hooks/use-toast";

const ClientWrapper = React.memo(({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Capture unhandled errors and promise rejections
    const onError = (event) => {
      // Prevent Next.js error overlay hard-crashing UX
      try {
        toast({
          title: 'Something went wrong',
          description: 'A non-critical error occurred. We disabled the problematic feature so you can keep browsing.',
        });
      } catch (_) {}
    };
    const onRejection = (event) => {
      try {
        toast({
          title: 'Background error',
          description: 'A script failed to load due to privacy settings/network. The site should still work.',
        });
      } catch (_) {}
    };
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <>{children}</>;
});

ClientWrapper.displayName = 'ClientWrapper';

export default ClientWrapper;
