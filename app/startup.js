// This file is automatically loaded by Next.js when the server starts
import { autoInitialize } from '../lib/startup-manager.js';

// Only run auto-initialization in production or development server, not during build
if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
  console.log('🌟 WhoisJason Portfolio - Auto-initialization starting...');
  
  // Initialize all services automatically
  autoInitialize().catch(error => {
    console.error('Critical startup error:', error);
  });
}

const startupConfig = {
  initialized: false,
  environment: process.env.NODE_ENV
};

export default startupConfig; 