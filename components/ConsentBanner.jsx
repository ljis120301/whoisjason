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
      <div className="mx-auto max-w-4xl m-4 rounded-lg bg-latte-base dark:bg-frappe-surface0 shadow-lg border border-latte-overlay1 dark:border-frappe-surface1 p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <p className="text-sm text-latte-text dark:text-frappe-text flex-1">
          We use cookies to analyze traffic and serve ads. See our <a href="/privacy-policy" className="underline">Privacy Policy</a> and <a href="/terms" className="underline">Terms</a>.
        </p>
        <div className="flex gap-2 ml-auto">
          <button onClick={rejectAll} className="px-3 py-2 text-sm rounded border border-latte-overlay1 dark:border-frappe-surface2 hover:bg-latte-surface0 dark:hover:bg-frappe-surface1">Reject all</button>
          <button onClick={acceptAll} className="px-3 py-2 text-sm rounded bg-frappe-blue text-white hover:bg-frappe-sapphire">Accept all</button>
        </div>
      </div>
    </div>
  );
}


