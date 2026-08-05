'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, Sparkles, ChevronDown } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import LoadingModal from '@/components/LoadingModal'
import { SERVICES } from '@/config/services'
import { PERSON, SITE } from '@/config/site'

/**
 * Cabecera única para todo el sitio.
 *
 * Cambios respecto a la versión anterior:
 *
 *  · Gestiona su propio modal. Antes exigía la prop `onAppointmentClick`, lo
 *    que obligaba a que cada página que la usara fuese un Client Component.
 *    Ahora las páginas nuevas pueden renderizarse enteras en servidor.
 *  · La página /servicios tenía una copia literal de este componente pegada
 *    dentro del archivo. Se elimina: dos cabeceras que hay que mantener
 *    sincronizadas a mano acaban divergiendo siempre.
 *  · Incorpora enlaces a las páginas de especialidad. El enlazado interno es lo
 *    que permite a Google descubrirlas y repartirles autoridad desde la home.
 */
export default function Header({ solid = false }: { solid?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const opaque = solid || isScrolled

  return (
    <>
      <LoadingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          opaque ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logo.png"
                alt={`${SITE.name} — ${PERSON.name}, psicóloga en Caracas`}
                width={40}
                height={40}
                className="transition-transform group-hover:scale-105"
                priority
              />
              <span className="font-serif text-xl font-semibold text-foreground">{SITE.name}</span>
            </Link>

            <ul className="hidden lg:flex items-center gap-7">
              {/* Desplegable en hover y en foco de teclado. Los enlaces están
                  siempre en el DOM, así que son rastreables aunque no se abra. */}
              <li className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors font-medium"
                  aria-haspopup="true"
                >
                  Especialidades
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </button>
                <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200">
                  <ul className="w-64 rounded-2xl border border-border bg-card p-2 shadow-xl">
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/servicios/${s.slug}`}
                          className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                          {s.navLabel}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <Link
                  href="/sobre-mi"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  Sobre mí
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  Precios
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <a
                  href="https://mindful.tubienestarmental.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rainbow-button inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold"
                >
                  <Sparkles className="w-4 h-4" />
                  Mindful
                </a>
              </li>
              <li>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
                >
                  Agendar Cita
                </Button>
              </li>
            </ul>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background border-border overflow-y-auto">
                <nav className="flex flex-col gap-5 mt-8 pb-10">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Especialidades
                  </p>
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/servicios/${s.slug}`}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {s.navLabel}
                    </Link>
                  ))}

                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Consulta
                  </p>
                  <Link href="/sobre-mi" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                    Sobre mí
                  </Link>
                  <Link href="/servicios" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                    Precios y planes
                  </Link>
                  <Link href="/contacto" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                    Contacto
                  </Link>
                  <Link href="/#preguntas-frecuentes" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                    Preguntas frecuentes
                  </Link>

                  <a
                    href="https://mindful.tubienestarmental.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rainbow-button mt-3 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold"
                  >
                    <Sparkles className="w-5 h-5" />
                    Mindful
                  </a>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                  >
                    Agendar Cita
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>
    </>
  )
}
