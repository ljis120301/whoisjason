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
  const [loading, setLoading] = useState(false); // Start with false to not block render
  const [error, setError] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      // Only set loading to true after initial render
      if (hasInitialized) {
        setLoading(true);
      }
      
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
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  useEffect(() => {
    // Mark as initialized immediately to allow progressive loading
    setHasInitialized(true);
    
    // Initial fetch - don't block render
    fetchData();

    // Set up polling every 30 seconds for real-time updates (especially Spotify)
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    hasInitialized
  };
}