'use client';

import React, { useEffect, useState } from 'react';
import Preloader from "@/components/Preloader";

const ClientWrapper = React.memo(({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <>{children}</>;
});

ClientWrapper.displayName = 'ClientWrapper';

export default ClientWrapper;
