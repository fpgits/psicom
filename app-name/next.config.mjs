import crypto from 'crypto'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const nonce = crypto.randomBytes(16).toString('base64')
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'nonce-${nonce}';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob:;
              font-src 'self';
              connect-src 'self';
              frame-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              block-all-mixed-content;
              upgrade-insecure-requests;
            `.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'x-nonce',
            value: nonce
          }
        ]
      }
    ]
  },
  compiler: {
    styledComponents: true,
  },
}

export default nextConfig