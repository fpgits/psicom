/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: `
                default-src 'self';
                script-src 'self' 'unsafe-eval';
                style-src 'self' 'unsafe-inline';
                img-src 'self' data:;
              `.replace(/\s{2,}/g, ' ').trim()
            }
          ]
        }
      ]
    },
    // Add any other Next.js config options here
  }
  
  export default nextConfig