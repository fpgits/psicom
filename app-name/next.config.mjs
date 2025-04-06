/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://static.elfsight.com https://universe-static.elfsightcdn.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: https:;
              font-src 'self' https:;
              connect-src 'self' https://core.service.elfsight.com;
              frame-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              block-all-mixed-content;
              upgrade-insecure-requests;
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ]
  },
}

export default nextConfig