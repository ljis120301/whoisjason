// This file is automatically loaded by Next.js when the server starts
import { autoInitialize } from '../lib/startup-manager.js';

// Only run auto-initialization in production or development server, not during build
if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
  // Add a longer delay to ensure environment is ready and services are fully initialized
  setTimeout(async () => {
    try {
      await autoInitialize();
    } catch (error) {
      // Error handling for initialization
    }
  }, 5000); // 5 second delay to ensure everything is ready
} else {
}

const startupConfig = {
  initialized: false,
  environment: process.env.NODE_ENV
};

export default startupConfig; 

// Non-blocking hint: if Tor Browser on clearnet, recommend .onion in console
if (typeof window !== 'undefined') {
  try {
    const host = window.location.hostname;
    const isOnion = /\.onion$/i.test(host);
    const ua = navigator.userAgent || '';
    const isTorBrowser = /TorBrowser/i.test(ua) || (/Firefox/i.test(ua) && /Tor/i.test(ua));
    if (!isOnion && isTorBrowser) {
      // Avoid intrusive UI; policy: console info only here
      console.info('Available over Tor: http://opurtrkxaxldq3ayee7r22j6znxhzf7pysvunracvszqq4jhwf5qfaqd.onion/');
    }
  } catch (_) {}
}