// This file is automatically loaded by Next.js when the server starts
import { autoInitialize } from '../lib/startup-manager.js';

// Only run auto-initialization in production or development server, not during build
if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
  // Add a longer delay to ensure environment is ready and services are fully initialized
  setTimeout(async () => {
    try {
      console.log('🚀 Starting WhoisJason service initialization...');
      await autoInitialize();
      console.log('✅ WhoisJason services initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize WhoisJason services:', error);
    }
  }, 5000); // 5 second delay to ensure everything is ready
} else {
}

const startupConfig = {
  initialized: false,
  environment: process.env.NODE_ENV
};

export default startupConfig; 