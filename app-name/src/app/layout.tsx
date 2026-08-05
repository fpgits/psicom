import { Playfair_Display, Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

import JsonLd from '@/components/JsonLd'
import WhatsAppButton from '@/components/WhatsAppButton'
import { siteGraph } from '@/lib/schema'
import { SITE, SITE_URL, PERSON, LOCATION } from '@/config/site'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  /**
   * metadataBase faltaba y es lo que permite a Next resolver rutas relativas
   * de canonical y Open Graph contra el dominio correcto. Sin esto, las URLs
   * absolutas del marcado dependían del host desde el que se sirviera.
   *
   * Todo el sitio apunta a www porque es lo que responde el servidor: el ápex
   * redirige. Antes el canonical señalaba a la versión sin www, es decir, a
   * una URL que redirige — que es justo lo que Google recomienda no hacer.
   */
  metadataBase: new URL(SITE_URL),

  title: 'Psicóloga en Caracas | Mariany Rodríguez — Psicología Clínica',
  description:
    `Psicóloga clínica en Caracas (F.P.V. ${PERSON.fpvNumber}) especializada en ansiedad, depresión, TDAH y autismo. ` +
    `Consulta presencial en ${LOCATION.neighborhood} y terapia online para toda Venezuela.`,

  applicationName: SITE.name,
  authors: [{ name: PERSON.name, url: `${SITE_URL}/sobre-mi` }],
  creator: PERSON.name,
  publisher: SITE.name,
  category: 'Salud mental',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: '/',
    siteName: SITE.name,
    title: 'Psicóloga en Caracas | Mariany Rodríguez',
    description:
      'Psicología clínica en Caracas: ansiedad, depresión, TDAH, autismo y terapia de pareja. Presencial y online.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${PERSON.name}, psicóloga clínica en Caracas`,
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Psicóloga en Caracas | Mariany Rodríguez',
    description: 'Psicología clínica presencial en Caracas y online para toda Venezuela.',
    images: ['/images/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  /**
   * Solo se emite si hay un código real en la configuración.
   * Antes se publicaba la cadena literal 'google-site-verification-code',
   * lo que significaba que Search Console nunca llegó a verificarse.
   */
  ...(SITE.googleSiteVerification
    ? { verification: { google: SITE.googleSiteVerification } }
    : {}),
}

export const viewport: Viewport = {
  themeColor: '#4a7c59',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.lang} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        {/*
          AnimatedSection sirve su contenido con opacity-0 hasta que el
          IntersectionObserver lo revela. Google ejecuta JavaScript y lo resuelve
          bien, pero varios rastreadores de IA no, y un texto servido con
          opacidad cero puede interpretarse como contenido oculto. Esta regla lo
          fuerza visible cuando no hay JavaScript disponible.
        */}
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: '.reveal{opacity:1!important;transform:none!important}' }} />
        </noscript>
        {/* Un único grafo con @id estables, renderizado en servidor.
            Las páginas hijas añaden solo su marcado específico
            (FAQPage, MedicalTherapy, BreadcrumbList) y lo referencian. */}
        <JsonLd data={siteGraph()} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton />

        {SITE.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.googleAnalyticsId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
