'use client';

import { useState, useEffect, useCallback } from 'react';
import { getRealtimeData } from '../../app/actions/realtime-data.js';

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
      // Use server action only - no client-side API fallback
      const result = await getRealtimeData();
      
      if (result.success && result.data) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling every 30 seconds for real-time updates (especially Spotify)
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