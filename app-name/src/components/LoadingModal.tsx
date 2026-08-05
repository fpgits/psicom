'use client'

import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { whatsappUrl } from '@/lib/links'

interface LoadingModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * El número de WhatsApp estaba escrito a mano dentro de este archivo y en
 * ningún otro sitio. Ahora sale de src/config/site.ts, igual que el resto del
 * NAP, para que no pueda quedar desincronizado con el pie, el schema y la
 * página de contacto.
 */
export default function LoadingModal({ isOpen, onClose }: LoadingModalProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isLoading && isOpen) {
      const target = whatsappUrl()
      if (!target) return
      const redirectTimer = setTimeout(() => {
        window.location.href = target
      }, 800)
      return () => clearTimeout(redirectTimer)
    }
  }, [isLoading, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 bg-card">
        <DialogHeader className="text-center">
          <DialogTitle className="font-serif text-2xl text-foreground">
            {isLoading ? 'Verificando disponibilidad' : 'Disponible'}
          </DialogTitle>
          <DialogDescription className="pt-4">
            {isLoading ? (
              <span className="flex flex-col items-center gap-4">
                <span className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="text-muted-foreground">Buscando horarios disponibles...</span>
              </span>
            ) : (
              <span className="flex flex-col items-center gap-4 text-primary">
                <CheckCircle className="w-12 h-12" />
                <span className="font-medium">Redirigiendo a WhatsApp...</span>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
