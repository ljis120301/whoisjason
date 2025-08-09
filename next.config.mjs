/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Allow top-level await and ES modules
    esmExternals: true,
  },
  
  // Enable source maps for better debugging
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pagead2.googlesyndication.com' },
      { protocol: 'https', hostname: 'googleads.g.doubleclick.net' },
    ],
  },
};

export default nextConfig;
