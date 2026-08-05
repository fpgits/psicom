import type { Metadata } from 'next'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Precios Terapia Psicológica Caracas | Planes y Servicios',
  description: 'Conoce los precios de terapia psicológica en Caracas con Mariany Rodríguez. Sesiones individuales desde $30, paquetes de 3 sesiones y planes mensuales. Terapia online y presencial.',
  keywords: [
    'precios psicólogo Caracas',
    'cuánto cuesta terapia Caracas',
    'sesión psicología precio Venezuela',
    'terapia online precios Caracas',
    'psicóloga económica Caracas',
    'paquetes terapia Caracas',
  ],
  openGraph: {
    title: 'Precios Terapia Psicológica en Caracas | Mariany Rodríguez',
    description: 'Sesiones de psicología desde $30 en Caracas. Paquetes y planes mensuales disponibles.',
    url: 'https://tubienestarmental.com/servicios',
  },
  alternates: {
    canonical: 'https://tubienestarmental.com/servicios',
  },
}

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: 'Inicio', url: 'https://tubienestarmental.com' },
          { name: 'Servicios y Precios', url: 'https://tubienestarmental.com/servicios' },
        ]} 
      />
      {children}
    </>
  )
}
