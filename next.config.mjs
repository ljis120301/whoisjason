/** @type {import('next').NextConfig} */
const nextConfig = {
  // Import startup script when server starts (not during build)
  webpack: (config, { isServer, dev }) => {
    if (isServer && (dev || process.env.NODE_ENV === 'production')) {
      // Only import startup script in development or production, not during build
      import('./app/startup.js');
    }
    return config;
  },
  
  experimental: {
    // Allow top-level await and ES modules
    esmExternals: true,
  },
  
  // Enable source maps for better debugging
  productionBrowserSourceMaps: true,
};

export default nextConfig;
