'use client';

import React, { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

export function HyperText({ children, className, duration = 500, charset = DEFAULT_CHARSET }) {
  const original = String(children ?? '');
  const [display, setDisplay] = useState(original);
  const animRef = useRef(0);

  const handleHover = useCallback(() => {
    if (!original) return;
    cancelAnimationFrame(animRef.current);
    const start = performance.now();

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const revealUntil = Math.floor(t * original.length);
      const next = Array.from(original).map((ch, i) => {
        if (ch === ' ') return ' ';
        return i <= revealUntil ? ch : charset[Math.floor(Math.random() * charset.length)];
      }).join('');
      setDisplay(next);
      if (t < 1) animRef.current = requestAnimationFrame(step);
      else setDisplay(original);
    };

    animRef.current = requestAnimationFrame(step);
  }, [original, duration, charset]);

  return (
    <span
      className={cn('relative inline-block align-baseline', className)}
      onMouseEnter={handleHover}
    >
      {display}
    </span>
  );
}

export default HyperText;
