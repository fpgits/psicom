import { Playfair_Display, Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

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
  title: 'Psicóloga en Caracas | Mariany Rodríguez - Terapia Clínica',
  description: 'Psicóloga clínica en Caracas especializada en TDAH, autismo, ansiedad y depresión. Terapia online y presencial personalizada para tu bienestar emocional en Caracas, Venezuela.',
  keywords: [
    'psicóloga en Caracas',
    'psicólogo en Caracas',
    'terapia en Caracas',
    'psicología clínica Caracas',
    'terapia online Caracas',
    'TDAH Caracas',
    'autismo Caracas',
    'ansiedad Caracas',
    'depresión Caracas',
    'salud mental Caracas',
    'terapia de pareja Caracas',
    'psicólogo Venezuela',
    'terapeuta Caracas',
  ],
  authors: [{ name: 'Mariany Rodríguez' }],
  creator: 'Mariany Rodríguez - Psicóloga Clínica',
  publisher: 'Tu Bienestar Mental',
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://tubienestarmental.com',
    siteName: 'Tu Bienestar Mental - Psicóloga en Caracas',
    title: 'Psicóloga en Caracas | Mariany Rodríguez',
    description: 'Terapia clínica especializada online y presencial en Caracas. TDAH, autismo, ansiedad, depresión y más.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mariany Rodríguez - Psicóloga en Caracas',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psicóloga en Caracas | Mariany Rodríguez',
    description: 'Terapia clínica especializada online y presencial en Caracas, Venezuela.',
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
  alternates: {
    canonical: 'https://tubienestarmental.com',
  },
  verification: {
    google: 'google-site-verification-code', // Reemplazar con código real de Google
  },
}

export const viewport: Viewport = {
  themeColor: '#4a7c59',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://mindful.tubienestarmental.com" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
