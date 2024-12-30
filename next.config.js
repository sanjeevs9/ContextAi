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
            value: "script-src 'self';",
          },
        ],
      },
    ];
  },

}

module.exports = nextConfig 