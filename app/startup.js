// This file is automatically loaded by Next.js when the server starts
import { autoInitialize } from '../lib/startup-manager.js';

// Only run auto-initialization in production or development server, not during build
if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
  // Add a small delay to ensure environment is ready
  setTimeout(async () => {
    try {
      await autoInitialize();
    } catch (error) {
    }
  }, 2000); // 2 second delay to ensure everything is ready
} else {
}

const startupConfig = {
  initialized: false,
  environment: process.env.NODE_ENV
};

export default startupConfig; 