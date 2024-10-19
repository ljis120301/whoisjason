'use client';

import { useEffect, useState } from 'react';
import Preloader from "@/components/Preloader";

export default function ClientWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <>{children}</>;
}

