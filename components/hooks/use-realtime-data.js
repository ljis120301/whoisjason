'use client';

import { useState, useEffect, useCallback } from 'react';

export function useRealtimeData() {
  const [data, setData] = useState({
    spotify: null,
    discord: null,
    steam: null,
    github: null,
    lastUpdated: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/realtime', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (response.ok) {
        const newData = await response.json();
        setData(newData);
        setError(null);
      } else {
        throw new Error(`HTTP ${response.status}: Failed to fetch real-time data`);
      }
    } catch (error) {
      console.error('Real-time data fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}