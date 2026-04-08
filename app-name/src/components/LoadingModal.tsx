'use client'

import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface LoadingModalProps {
  isOpen: boolean
  onClose: () => void
}

const WHATSAPP_URL = 'https://wa.me/584245157059?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n'

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
      const redirectTimer = setTimeout(() => {
        window.location.href = WHATSAPP_URL
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
