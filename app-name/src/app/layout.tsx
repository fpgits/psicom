import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tu Bienestar Mental | Psicóloga Mariany Rodríguez en Venezuela',
  description: 'Mejora tu salud mental con la psicóloga Mariany Rodríguez. Ofrecemos terapia online, individual y de pareja en Venezuela. Especialistas en TDAH, autismo, ansiedad y depresión.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}