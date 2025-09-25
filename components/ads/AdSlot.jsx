'use client';

import { useEffect, useMemo } from 'react';
import { ADSENSE_CLIENT } from '@/lib/adsense';

export default function AdSlot({ slotId, format = 'auto', className = '', style }) {
  const isOnionHost = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /\.onion$/i.test(window.location.hostname);
  }, []);

  useEffect(() => {
    if (!slotId) return;
    if (isOnionHost) return; // never initialize ads on onion
    if (typeof window === 'undefined') return;
    if (typeof window.adsbygoogle === 'undefined') return; // script blocked or missing
    try {
      // Initialize ads queue if needed and request an ad
      // eslint-disable-next-line no-undef
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {
      // no-op
    }
  }, [slotId, isOnionHost]);

  // Do not render if no slot provided
  if (!slotId || isOnionHost) return null;

  const mergedStyle = style || { display: 'block', minHeight: '280px', width: '100%' };

  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={mergedStyle}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}


