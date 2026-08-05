'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LoadingModal from '@/components/LoadingModal'

/**
 * CTA de agendar cita, autocontenido.
 *
 * Encapsula el estado del modal para que las páginas que lo usan puedan seguir
 * siendo Server Components. Antes, cualquier página con este botón tenía que
 * llevar 'use client' entera solo por un useState, lo que arrastraba todo el
 * contenido al bundle del cliente sin necesidad.
 *
 * Nota: este botón no es un enlace rastreable a propósito, porque conserva el
 * flujo de "verificando disponibilidad" previo a WhatsApp. Las vías de contacto
 * indexables (enlaces reales a wa.me y tel:) están en el pie, en el botón
 * flotante y en la página de contacto.
 */
export default function AppointmentButton({
  children = 'Agenda tu cita',
  className = '',
  variant = 'primary',
  size = 'lg',
  showArrow = true,
}: {
  children?: React.ReactNode
  className?: string
  variant?: 'primary' | 'accent' | 'outline'
  size?: 'default' | 'lg'
  showArrow?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)

  const styles = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    accent: 'bg-accent hover:bg-accent/90 text-accent-foreground',
    outline: 'border border-border bg-transparent hover:bg-secondary text-foreground',
  }[variant]

  return (
    <>
      <LoadingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Button
        size={size}
        onClick={() => setIsOpen(true)}
        className={`rounded-full px-8 ${size === 'lg' ? 'h-14 text-base' : ''} ${styles} ${className}`}
      >
        {children}
        {showArrow && <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />}
      </Button>
    </>
  )
}
