/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so it can be hosted on GitHub Pages / Cloudflare Pages.
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For GitHub Pages project sites the app is served from /<repo>.
  // The Actions workflow sets NEXT_PUBLIC_BASE_PATH="/rega" at build time.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  reactStrictMode: true,
};

module.exports = nextConfig;
