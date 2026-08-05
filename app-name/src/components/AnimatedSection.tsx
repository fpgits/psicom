'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
}

/**
 * Aparición progresiva al entrar en viewport.
 *
 * Detalle relevante para SEO: la versión anterior renderizaba SIEMPRE con
 * `opacity-0`, y solo el IntersectionObserver la volvía visible. Google ejecuta
 * JavaScript y lo resolvía bien, pero varios rastreadores de IA no lo hacen, y
 * contenido servido con opacidad cero puede interpretarse como texto oculto.
 *
 * La clase `reveal` permite que la regla <noscript> del layout fuerce la
 * visibilidad cuando no hay JavaScript disponible, sin renunciar a la animación
 * en navegadores normales.
 */
export default function AnimatedSection({ children, className = '' }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Si el usuario pidió reducir el movimiento, se muestra sin animación.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1, rootMargin: '50px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}
