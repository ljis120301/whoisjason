'use client';

import { useEffect, useState } from 'react';

export default function DynamicSEO() {
  const [lastUpdated, setLastUpdated] = useState('');
  
  useEffect(() => {
    // Get current date formatted for display
    const now = new Date();
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    setLastUpdated(now.toLocaleDateString('en-US', options));
  }, []);
  
  // This component doesn't render anything visible
  // It just adds SEO-friendly meta information
  return (
    <div className="hidden">
      <span data-seo="last-updated">Portfolio last updated: {lastUpdated}</span>
      <span data-seo="generated-time">Page generated at: {new Date().toISOString()}</span>
    </div>
  );
} 