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
              img-src 'self' data: blob: https://*.gstatic.com https://lh3.googleusercontent.com https://static.elfsight.com https://universe-static.elfsightcdn.com;
              font-src 'self' https://static.elfsight.com https://fonts.gstatic.com;
              connect-src 'self' https://core.service.elfsight.com https://service-reviews-ultimate.elfsight.com;
              frame-src 'self' https://apps.elfsight.com;
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