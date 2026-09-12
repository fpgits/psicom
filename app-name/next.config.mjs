/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /* No revela la versión de Next en la cabecera X-Powered-By. */
  poweredByHeader: false,

  /* Formatos modernos: AVIF/WebP pesan mucho menos que JP/PNG, así que las
     fotos de la profesional cargan antes. El LCP y el peso de la página son
     factores de Core Web Vitals, y las CWV son señal de ranking. */
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          /* Cabeceras de seguridad estándar. No cambian el contenido, pero son
             buenas prácticas que las auditorías (y en parte los rastreadores)
             valoran, y evitan sniffing de tipos MIME y fugas de referrer. */
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://static.elfsight.com https://universe-static.elfsightcdn.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: https://*.gstatic.com https://lh3.googleusercontent.com https://static.elfsight.com https://universe-static.elfsightcdn.com;
              font-src 'self' https://static.elfsight.com https://fonts.gstatic.com;
              connect-src 'self' https://core.service.elfsight.com https://service-reviews-ultimate.elfsight.com https://static.elfsight.com;
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