'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Brain, TrendingUp, Calendar, Smile, Users, Book, Menu, X, Star, Heart, MessageCircle, Bookmark, ChevronRight, Phone, CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Head from 'next/head'

interface TestimonialProps {
  number: number;
  date: string;
  rating: number;
  comment: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ number, date, rating, comment }) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
    <CardHeader className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-300">{number}</span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className="text-sm mb-4">{comment}</p>
    </CardContent>
  </Card>
)

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {children}
    </div>
  )
}

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

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
        router.push('http://wa.link/w18uvj')
      }, 1000)

      return () => clearTimeout(redirectTimer)
    }
  }, [isLoading, isOpen, router])

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

export default function Component() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAppointmentClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <div className="bg-gradient-to-b from-[#C4DDF5] to-white min-h-screen">
      <Head>
        <title>Tu Bienestar Mental | Psicóloga Mariany Rodríguez en Venezuela</title>
        <meta name="description" content="Mejora tu salud mental con la psicóloga Mariany Rodríguez. Ofrecemos terapia online, individual y de pareja en Venezuela. Especialistas en TDAH, autismo, ansiedad y depresión." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "PsychologicalTreatment",
              "name": "Tu Bienestar Mental",
              "provider": {
                "@type": "Person",
                "name": "Mariany Rodríguez",
                "jobTitle": "Psicóloga Clínica"
              },
              "areaServed": "Venezuela",
              "serviceType": "Terapia online, individual y de pareja"
            }
          `}
        </script>
      </Head>
      <LoadingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <header className="bg-white shadow-sm sticky top-0 z-10 transition-all duration-500 ease-in-out">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
              <img src="/images/logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
              <span className="font-bold text-sm md:text-xl text-[#78AAC3]">Tu Bienestar Mental</span>
            </div>
            <ul className="hidden md:flex items-center space-x-6">
              <li className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
                <Dialog>
                  <DialogTrigger asChild>
                    <a className="text-gray-600 hover:text-[#78AAC3] transition-colors cursor-pointer">Mindful</a>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>¡Próximamente!</DialogTitle>
                      <DialogDescription>
                        Estamos trabajando en algo emocionante. ¡Mantente atento para más novedades!
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
                <a href="/servicios" className="text-gray-600 hover:text-[#78AAC3] transition-colors">Servicios</a>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
                <Dialog>
                  <DialogTrigger asChild>
                    <a className="text-gray-600 hover:text-[#78AAC3] transition-colors cursor-pointer">Talleres</a>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>¡Próximamente!</DialogTitle>
                      <DialogDescription>
                        Estamos preparando talleres emocionantes. ¡Vuelve pronto para más información!
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <a className="text-lg font-medium hover:text-[#78AAC3] transition-colors cursor-pointer">Mindful</a>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>¡Próximamente!</DialogTitle>
                        <DialogDescription>
                          Estamos trabajando en algo emocionante. ¡Mantente atento para más novedades!
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <a href="/servicios" className="text-lg font-medium hover:text-[#78AAC3] transition-colors">Servicios</a>
                  <Dialog>
                    <DialogTrigger asChild>
                      <a className="text-lg font-medium hover:text-[#78AAC3] transition-colors cursor-pointer">Talleres</a>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>¡Próximamente!</DialogTitle>
                        <DialogDescription>
                          Estamos preparando talleres emocionantes. ¡Vuelve pronto para más información!
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
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
        {/* ... (rest of the main content remains unchanged) ... */}
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