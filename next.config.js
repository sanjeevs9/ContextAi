/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ⚠️ Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://js.stripe.com",
              "connect-src 'self' https://api.stripe.com https://r.stripe.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
              "img-src 'self' https://*.stripe.com",
              "style-src 'self' 'unsafe-inline'",
            ].join('; ')
          }
        ]
      }
    ]
  }
};

module.exports = nextConfig; 