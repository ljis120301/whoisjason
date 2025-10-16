'use client';

import { useEffect } from 'react';
import { ADMAVEN_CLIENT } from '@/lib/admaven';

export default function AdSlot({ slotId, format = 'auto', className = '', style }) {
  useEffect(() => {
    if (!slotId) return;
    if (typeof window === 'undefined') return;
    if (typeof window.admaven === 'undefined') return; // script blocked or missing
    try {
      // Initialize Admaven ads
      if (window.admaven && window.admaven.load) {
        window.admaven.load();
      }
    } catch (_) {
      // no-op
    }
  }, [slotId]);

  // Do not render if no slot provided
  if (!slotId) return null;

  const mergedStyle = style || { display: 'block', minHeight: '280px', width: '100%' };

  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <div
        className="admaven-ad"
        style={mergedStyle}
        data-admaven-client={ADMAVEN_CLIENT}
        data-admaven-slot={slotId}
        data-admaven-format={format}
        data-admaven-responsive="true"
      />
    </div>
  );
}


