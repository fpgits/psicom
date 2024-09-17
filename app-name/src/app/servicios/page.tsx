'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, ChevronRight, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRedirect: () => void;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onClose, onRedirect }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isLoading && isOpen) {
      const redirectTimer = setTimeout(() => {
        onRedirect()
      }, 1000)

      return () => clearTimeout(redirectTimer)
    }
  }, [isLoading, isOpen, onRedirect])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLoading ? 'Verificando disponibilidad' : 'Disponible!'}</DialogTitle>
          <DialogDescription>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-2">Verificando si hay disponibilidad de cita</span>
              </div>
            ) : (
              <div className="flex items-center justify-center text-green-500">
                <CheckCircle className="w-8 h-8 mr-2" />
                <span>Cita disponible! Redirigiendo...</span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default function ServiciosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProximamenteModalOpen, setIsProximamenteModalOpen] = useState(false)
  const router = useRouter()

  const handleAppointmentClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsModalOpen(true)
  }, [])

  const handleRedirect = useCallback(() => {
    window.location.href = 'https://wa.me/584245157059?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n'
  }, [])

  const handleProximamenteClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsProximamenteModalOpen(true)
  }, [])

  return (
    <div className="bg-gradient-to-b from-[#C4DDF5] to-white min-h-screen">
      <LoadingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRedirect={handleRedirect}
      />
      <Dialog open={isProximamenteModalOpen} onOpenChange={setIsProximamenteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Próximamente</DialogTitle>
            <DialogDescription>
              Esta sección estará disponible pronto. ¡Gracias por tu paciencia!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <header className="bg-white shadow-sm sticky top-0 z-10 transition-all duration-500 ease-in-out">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-4 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
              <img src="/images/logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
              <span className="font-bold text-sm md:text-xl text-[#78AAC3]">Tu Bienestar Mental</span>
            </Link>
            <ul className="hidden md:flex items-center space-x-6">
              <li className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
                <a href="#" onClick={handleProximamenteClick} className="text-gray-600 hover:text-[#78AAC3] transition-colors">Mindful</a>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
                <Link href="/servicios" className="text-gray-600 hover:text-[#78AAC3] transition-colors">Servicios</Link>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
                <a href="#" onClick={handleProximamenteClick} className="text-gray-600 hover:text-[#78AAC3] transition-colors">Talleres</a>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                <Button className="bg-[#EEAB73] hover:bg-[#F5A281] text-white" onClick={handleAppointmentClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Agenda tu cita
                </Button>
              </li>
            </ul>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-6">
                  <a href="#" onClick={handleProximamenteClick} className="text-lg font-medium hover:text-[#78AAC3] transition-colors">Mindful</a>
                  <Link href="/servicios" className="text-lg font-medium hover:text-[#78AAC3] transition-colors">Servicios</Link>
                  <a href="#" onClick={handleProximamenteClick} className="text-lg font-medium hover:text-[#78AAC3] transition-colors">Talleres</a>
                  <Button className="bg-[#EEAB73] hover:bg-[#F5A281] text-white mt-4" onClick={handleAppointmentClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    Agenda tu cita
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#78AAC3] mb-6 text-center">Mis Servicios</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 text-center">
            Ofrezco una variedad de planes diseñados para adaptarse a tus necesidades y presupuesto.
          </p>
        </section>

        <section className="mb-20" id="servicios">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="transition-all duration-300 ease-in-out hover:-translate-y-2">
              <Card className="flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#EEAB73] text-white px-4 py-1 rounded-bl-lg transform rotate-12 translate-x-4 -translate-y-2">
                  ¡Oferta!
                </div>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-center">Plan Mensual</h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold line-through text-gray-400">$85</span>
                    <p className="text-3xl font-bold text-[#78AAC3]">$65</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#EEAB73]" />
                      <span>Hasta 4 sesiones durante un mes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#EEAB73]" />
                      <span>Flexibilidad en la programación</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#EEAB73]" />
                      <span>Ideal para terapia continua</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#EEAB73] hover:bg-[#F5A281] text-white" onClick={handleAppointmentClick}>
                    Comenzar ahora
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="transition-all duration-300 ease-in-out hover:-translate-y-2">
              <Card className="flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#F5A281] text-white px-4 py-1 rounded-bl-lg transform rotate-12 translate-x-4 -translate-y-2">
                  ¡Descuento!
                </div>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-center">Paquete de 3 sesiones</h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold line-through text-gray-400">$60</span>
                    <p className="text-3xl font-bold text-[#78AAC3]">$50</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#F5A281]" />
                      <span>3 sesiones a un precio reducido</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#F5A281]" />
                      <span>Perfecto para abordar problemas específicos</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#F5A281]" />
                      <span>Mantén el ritmo con un enfoque dirigido</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#F5A281] hover:bg-[#EEAB73] text-white" onClick={handleAppointmentClick}>
                    Elegir este plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="transition-all duration-300 ease-in-out hover:-translate-y-2">
              <Card className="flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#C4DDF5] text-white px-4 py-1 rounded-bl-lg transform rotate-12 translate-x-4 -translate-y-2">
                  ¡Ahorra!
                </div>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-center">Sesión individual - Online o Presencial</h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold line-through text-gray-400">$30</span>
                    <p className="text-3xl font-bold text-[#78AAC3]">$20</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#C4DDF5]" />
                      <span>Una sesión de terapia de 60 minutos</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#C4DDF5]" />
                      <span>Ideal para consultas puntuales</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#C4DDF5]" />
                      <span>Sin compromiso a largo plazo</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#C4DDF5] hover:bg-[#78AAC3] text-white" onClick={handleAppointmentClick}>
                    Reservar sesión
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#78AAC3] mb-6">¿Listo para comenzar tu viaje hacia el bienestar emocional?</h2>
            <p className="text-lg text-gray-600 mb-8">No esperes más para dar el primer paso hacia una vida más plena y satisfactoria.</p>
            <div className="transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
              <Button className="bg-[#EEAB73] hover:bg-[#F5A281] text-white text-lg px-8 py-3" onClick={handleAppointmentClick}>
                Agenda tu cita ahora <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#78AAC3] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/images/logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 mb-2" />
              <p className="text-sm">© 2024 Trabajando Tu Mente</p>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-4">
              <a href="#" className="text-sm hover:underline">Política de privacidad</a>
              <a href="#" className="text-sm hover:underline">Términos de servicio</a>
              <a href="#" className="text-sm hover:underline">Contacto</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}