/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Allow top-level await and ES modules
    esmExternals: true,
  },
  
  // Enable source maps for better debugging
  productionBrowserSourceMaps: true,
};

export default nextConfig;
