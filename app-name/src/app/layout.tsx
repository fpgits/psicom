import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Mariany Rodriguez | Psicologia Clinica - Tu Bienestar Mental',
  description: 'Psicologia clinica especializada en TDAH, autismo, ansiedad y depresion. Terapia online y presencial personalizada para tu bienestar emocional en Venezuela.',
  keywords: 'psicologa, terapia online, salud mental, ansiedad, depresion, TDAH, autismo, Venezuela',
}

export const viewport = {
  themeColor: '#4a7c59',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
