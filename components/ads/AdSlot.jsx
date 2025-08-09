'use client';

import { useEffect } from 'react';
import { ADSENSE_CLIENT } from '@/lib/adsense';

export default function AdSlot({ slotId, format = 'auto', className = '', style }) {
  useEffect(() => {
    if (!slotId) return;
    try {
      // Initialize ads queue if needed and request an ad
      // eslint-disable-next-line no-undef
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {
      // no-op
    }
  }, [slotId]);

  // Do not render if no slot provided
  if (!slotId) return null;

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


