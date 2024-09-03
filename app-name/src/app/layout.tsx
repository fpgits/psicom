import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your App Title',
  description: 'Your app description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === 'development' && (
          <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'unsafe-eval' 'unsafe-inline' *; style-src 'unsafe-inline' *;" />
        )}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}