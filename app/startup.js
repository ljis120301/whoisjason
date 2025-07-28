// This file is automatically loaded by Next.js when the server starts
import { autoInitialize } from '../lib/startup-manager.js';

// Only run auto-initialization in production or development server, not during build
if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
  console.log('🌟 WhoisJason Portfolio - Auto-initialization starting...');
  
  // Add a small delay to ensure environment is ready
  setTimeout(async () => {
    try {
      console.log('🚀 Triggering service initialization...');
      await autoInitialize();
      console.log('✅ Service initialization completed successfully');
    } catch (error) {
      console.error('❌ Critical startup error:', error);
      console.error('Stack trace:', error.stack);
    }
  }, 2000); // 2 second delay to ensure everything is ready
} else {
  console.log('⏩ Skipping auto-initialization (build phase or client-side)');
}

const startupConfig = {
  initialized: false,
  environment: process.env.NODE_ENV
};

export default startupConfig; 