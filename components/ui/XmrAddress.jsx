'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Copy as CopyIcon, Check as CheckIcon } from 'lucide-react';

export default function XmrAddress({ address, className }) {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef(null);

  const copy = async (event) => {
    try {
      await navigator?.clipboard?.writeText?.(address || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}

    try {
      const buttonEl = buttonRef.current;
      if (!buttonEl) return;
      const rect = buttonEl.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = (event?.clientX || rect.left + rect.width / 2) - rect.left;
      const y = (event?.clientY || rect.top + rect.height / 2) - rect.top;
      Object.assign(ripple.style, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: `-${size / 2}px`,
        marginTop: `-${size / 2}px`,
        borderRadius: '9999px',
        backgroundColor: 'currentColor',
        opacity: '0.15',
        transform: 'scale(0)',
        transition: 'transform 500ms ease, opacity 700ms ease',
        pointerEvents: 'none',
      });
      buttonEl.appendChild(ripple);
      // trigger animation
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(2.75)';
        ripple.style.opacity = '0';
      });
      setTimeout(() => {
        try { ripple.remove(); } catch {}
      }, 750);
    } catch {}
  };

  return (
    <div className={className}>
      <div className="text-xs text-muted-foreground">Monero (XMR) address</div>
      <div className="flex items-stretch gap-2 max-w-full">
        <div className="max-w-full overflow-x-auto">
          <div
            role="textbox"
            aria-readonly="true"
            className={cn(
              'inline-block rounded-md border border-border bg-card px-3 py-2 font-mono text-xs md:text-sm text-foreground',
              'whitespace-nowrap cursor-default select-text',
              'focus:outline-none'
            )}
            tabIndex={0}
          >
            {address || ''}
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={copy}
                aria-label="Copy Monero address"
                className="relative overflow-hidden h-auto py-2 pl-2 pr-3"
                ref={buttonRef}
              >
                {copied ? (
                  <span className="inline-flex items-center gap-1">
                    <CheckIcon className="size-4" />
                    Copied
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <CopyIcon className="size-4" />
                    Copy
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy to clipboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}


