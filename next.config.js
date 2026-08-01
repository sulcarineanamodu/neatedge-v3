/** @type {import('next').NextConfig} */

// Environment-aware X-Robots-Tag: noindex for preview, index for production
const isPreview =
  process.env.VERCEL_ENV === 'preview' ||
  process.env.NEXT_PUBLIC_APP_ENV === 'staging';
const robotsTagValue = isPreview ? 'noindex, nofollow' : 'index, follow';

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  experimental: {
    useTypeScriptCli: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: robotsTagValue,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; script-src 'self' https: 'unsafe-inline' 'unsafe-eval' cdn.vercel-analytics.com vercel.live; style-src 'self' https: 'unsafe-inline'; img-src 'self' https: data:; font-src 'self' https: data:; connect-src 'self' https: vercel.live api.vercel.com vitals.vercel-analytics.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
