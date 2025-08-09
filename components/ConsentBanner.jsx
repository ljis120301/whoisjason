'use client';

import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'consent_preferences_v2';

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setShow(true);
      }
    } catch (_) {
      // noop
    }
  }, []);

  const acceptAll = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
      }));
    } catch (_) {}

    try {
      // eslint-disable-next-line no-undef
      gtag('consent', 'update', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });
    } catch (_) {}

    setShow(false);
  }, []);

  const rejectAll = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        ad_storage: 'denied',
        analytics_storage: 'denied',
      }));
    } catch (_) {}

    try {
      // eslint-disable-next-line no-undef
      gtag('consent', 'update', {
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        ad_storage: 'denied',
        analytics_storage: 'denied',
      });
    } catch (_) {}

    setShow(false);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100]">
      <div className="mx-auto max-w-4xl m-4 rounded-lg bg-white shadow-lg border p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <p className="text-sm text-gray-700 flex-1">
          We use cookies to analyze traffic and serve ads. See our <a href="/privacy-policy" className="underline">Privacy Policy</a> and <a href="/terms" className="underline">Terms</a>.
        </p>
        <div className="flex gap-2 ml-auto">
          <button onClick={rejectAll} className="px-3 py-2 text-sm rounded border border-gray-300 hover:bg-gray-50">Reject all</button>
          <button onClick={acceptAll} className="px-3 py-2 text-sm rounded bg-black text-white hover:opacity-90">Accept all</button>
        </div>
      </div>
    </div>
  );
}


