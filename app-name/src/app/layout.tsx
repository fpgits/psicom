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
  title: 'Mariany Rodriguez | Psicologia Clinica - Tu Bienestar Mental',
  description: 'Psicologia clinica especializada en TDAH, autismo, ansiedad y depresion. Terapia online y presencial personalizada para tu bienestar emocional en Venezuela.',
  keywords: ['psicologa', 'terapia online', 'salud mental', 'ansiedad', 'depresion', 'TDAH', 'autismo', 'Venezuela', 'psicologia clinica'],
  authors: [{ name: 'Mariany Rodriguez' }],
  creator: 'Tu Bienestar Mental',
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://tubienestarmental.com',
    siteName: 'Tu Bienestar Mental',
    title: 'Mariany Rodriguez | Psicologia Clinica',
    description: 'Psicologia clinica especializada. Terapia online y presencial personalizada para tu bienestar emocional.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mariany Rodriguez | Psicologia Clinica',
    description: 'Psicologia clinica especializada. Terapia online y presencial.',
  },
  robots: {
    index: true,
    follow: true,
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
