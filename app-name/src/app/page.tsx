'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Heart, MessageCircle, Bookmark, ChevronRight, Brain, TrendingUp, Calendar, Smile, Users, Book, Phone, CheckCircle, Star } from 'lucide-react'
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialProps {
  username: string;
  date: string;
  rating: number;
  comment: string;
  imageUrl: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ username, date, rating, comment, imageUrl }) => (
  <Card className="overflow-hidden">
    <CardHeader className="p-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${username}`} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">{username}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className="text-sm">{comment}</p>
    </CardContent>
    <CardFooter className="p-0">
      <img src={imageUrl} alt="Testimonial" className="w-full h-48 object-cover" />
    </CardFooter>
    <CardFooter className="flex justify-between p-4">
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageCircle className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="ghost" size="icon">
        <Bookmark className="h-4 w-4" />
      </Button>
    </CardFooter>
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
      <LoadingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <header className="bg-white shadow-sm sticky top-0 z-10 transition-all duration-500 ease-in-out">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logomariany-Rp7HqXGTljtFbxh8HDvxA9pOvdMy1V.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
              <span className="font-bold text-sm md:text-xl text-[#78AAC3]">Tu Bienestar Mental</span>
            </div>
            <ul className="hidden md:flex items-center space-x-6">
              <li className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
                <Dialog>
                  <DialogTrigger asChild>
                    <a href="#mindful" className="text-gray-600 hover:text-[#78AAC3] transition-colors cursor-pointer">Mindful</a>
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
                <a href="/talleres" className="text-gray-600 hover:text-[#78AAC3] transition-colors">Talleres</a>
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
                  <a href="/talleres" className="text-lg font-medium hover:text-[#78AAC3] transition-colors">Talleres</a>
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
        <FadeInSection>
          <section className="mb-20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-3xl md:text-5xl font-bold text-[#78AAC3] mb-6 transition-all duration-500 ease-in-out">
                  ¡Te ayudo a mejorar tu Bienestar Mental!
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 transition-all duration-500 ease-in-out">
                  Te acompaño en tus procesos para alcanzar una vida más plena y satisfactoria.
                </p>
                <div className="transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                  <Button className="w-full md:w-auto bg-[#EEAB73] hover:bg-[#F5A281] text-white" onClick={handleAppointmentClick}>
                    Agenda tu cita <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/2 transition-all duration-500 ease-in-out">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto1-CDAaVcH7BY9Uornbm9JqkucMLSNeuv.jpg" alt="Mariany trabajando" className="rounded-lg shadow-lg w-full h-auto" />
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <section className="mb-20" id="servicios">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#78AAC3] mb-12">Nuestros Servicios</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="transition-all duration-300 ease-in-out hover:-translate-y-2">
                <Card>
                  <CardHeader>
                    <Brain className="w-12 h-12 text-[#EEAB73] mb-4" />
                    <h3 className="text-xl font-semibold">Mejora tu salud mental</h3>
                  </CardHeader>
                  <CardContent>
                    <p>Prioriza tu bienestar mental para un mejor funcionamiento, resolución de problemas y disfrute del presente.</p>
                  </CardContent>
                </Card>
              </div>
              <div className="transition-all duration-300 ease-in-out hover:-translate-y-2">
                <Card>
                  <CardHeader>
                    <TrendingUp className="w-12 h-12 text-[#F5A281] mb-4" />
                    <h3 className="text-xl font-semibold">Monitoreo personalizado</h3>
                  </CardHeader>
                  <CardContent>
                    <p>Seguimiento semanal de tu progreso vía WhatsApp, asegurando una atención constante a tu proceso.</p>
                  </CardContent>
                </Card>
              </div>
              <div className="transition-all duration-300 ease-in-out hover:-translate-y-2">
                <Card>
                  <CardHeader>
                    <Calendar className="w-12 h-12 text-[#F3CD86] mb-4" />
                    <h3 className="text-xl font-semibold">Horarios flexibles</h3>
                  </CardHeader>
                  <CardContent>
                    <p>Terapia online adaptada a tu tiempo, ideal si no puedes asistir a sesiones presenciales.</p>
                  </CardContent>
                </Card>
              </div>
              <div className="transition-all duration-300 ease-in-out hover:-translate-y-2">
                <Card>
                  <CardHeader>
                    <Smile className="w-12 h-12 text-[#97C8D8] mb-4" />
                    <h3 className="text-xl font-semibold">Terapia individual</h3>
                  </CardHeader>
                  <CardContent>
                    <p>Sesiones personalizadas para abordar tus necesidades específicas y ayudarte a alcanzar tus metas personales.</p>
                  </CardContent>
                </Card>
              </div>
              <div className="transition-all duration-300 ease-in-out hover:-translate-y-2">
                <Card>
                  <CardHeader>
                    <Users className="w-12 h-12 text-[#78AAC3] mb-4" />
                    <h3 className="text-xl font-semibold">Terapia de pareja</h3>
                  </CardHeader>
                  <CardContent>
                    <p>Mejora tu relación con sesiones diseñadas para fortalecer la comunicación y resolver conflictos.</p>
                  </CardContent>
                </Card>
              </div>
              <div className="transition-all duration-300 ease-in-out hover:-translate-y-2">
                <Card>
                  <CardHeader>
                    <Book className="w-12 h-12 text-[#C4DDF5] mb-4" />
                    <h3 className="text-xl font-semibold">Talleres y workshops</h3>
                  </CardHeader>
                  <CardContent>
                    <p>Participa en sesiones grupales temáticas para desarrollar habilidades y compartir experiencias.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <section className="mb-20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 mb-8 md:mb-0 transition-all duration-500 ease-in-out hover:scale-105">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto2-GM5yRav811WTlibsPirS8gWfEQZ3ty.jpg" alt="Mariany sonriendo" className="rounded-lg shadow-lg w-full h-auto" />
              </div>
              <div className="w-full md:w-1/2 md:pl-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#78AAC3] mb-6">¡Hola, soy Mariany!</h2>
                <p className="text-gray-600 mb-4">Soy Psicóloga Clínica y fundadora de Trabajando Tu Bienestar Mental. Con formación en psicoterapia humanista integrativa, terapia de aceptación y compromiso (ACT) y terapia de pareja, estoy aquí para ayudarte en tu camino hacia el bienestar emocional.</p>
                <p className="text-gray-600 mb-6">Mi enfoque se centra en brindar atención psicológica a adolescentes, adultos y parejas, siempre desde la empatía y la objetividad. Mi objetivo es que te sientas cómoda y confiada durante todo el proceso terapéutico.</p>
                <div className="transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                  <Button variant="outline" className="w-full md:w-auto border-[#78AAC3] text-[#78AAC3] hover:bg-[#C4DDF5]">
                    Conoce más sobre mí
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <section className="mb-20" id="testimonios">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#78AAC3] mb-12">Testimonios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Testimonial 
                username="Michelle Walters"
                date="NOVEMBER 3, 2017"
                rating={5}
                comment="I've searched for shoes like these, like, forever!!! Sooooo happy I found them! This great store has a fantastic choice, I'll be coming back again and again! #dreamshoes #lovely #coolstyle"
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/testimonial1-Hy5Ue9Ue5Ue9Ue5Ue9Ue5Ue9Ue5Ue9.jpg"
              />
              <Testimonial 
                username="KC Robbins"
                date="NOVEMBER 5, 2017"
                rating={4}
                comment="Hey, all sweet food lovers! Check out this great donut place – they bake their donuts right there, and they are fresh and soooo yummy! #amysdoughnuts #homersimpson #meltinthemouth"
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/testimonial2-Hy5Ue9Ue5Ue9Ue5Ue9Ue5Ue9Ue5Ue9.jpg"
              />
              <Testimonial 
                username="James Elf"
                date="NOVEMBER 9, 2017"
                rating={5}
                comment="I hate hats, but since I've moved to Toronto, I really have to wear one in winter. I used to think all hats made me look funny, but this one's an exception. And it's stylish, too! #canadianstyle..."
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/testimonial3-Hy5Ue9Ue5Ue9Ue5Ue9Ue5Ue9Ue5Ue9.jpg"
              />
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.8}>
          <section className="mb-20" id="mindful">
            <div className="bg-[#C4DDF5] rounded-lg p-8 flex flex-col md:flex-row items-center justify-between transition-all duration-500 ease-in-out hover:scale-102">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-[#78AAC3] mb-4">Mindful</h2>
                <p className="text-gray-600 mb-6">¡Descubre nuestra nueva experiencia de bienestar emocional!</p>
                <div className="transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full md:w-auto bg-[#EEAB73] hover:bg-[#F5A281] text-white font-bold py-2 px-4 rounded">
                        Próximamente
                      </Button>
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
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <img src="/placeholder.svg?height=300&width=300" alt="Mindful illustration" className="w-full max-w-md h-auto rounded-lg shadow-lg" />
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={1}>
          <section className="mb-20">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#78AAC3] mb-6">¿Listo para comenzar tu viaje hacia el bienestar emocional?</h2>
              <p className="text-lg text-gray-600 mb-8">No esperes más para dar el primer paso hacia una vida más plena y satisfactoria.</p>
              <div className="transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                <Button className="bg-[#EEAB73] hover:bg-[#F5A281] text-white text-lg px-8 py-3" onClick={handleAppointmentClick}>
                  Agenda tu cita ahora
                </Button>
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>

      <footer className="bg-[#78AAC3] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logomariany-Rp7HqXGTljtFbxh8HDvxA9pOvdMy1V.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 mb-2" />
              <p className="text-sm">© 2024 Trabajando Tu Mente</p>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-4">
              <a href="#" className="text-sm hover:underline">Política de privacidad</a>
              <a href="#" className="text-sm hover:underline">Términos de servicio</a>
              <a href="#" className="text-sm hover:underline">Contacto</a>
            </nav>
          </div>
          <div className="mt-6 text-center md:text-left">
            <p className="text-sm">Contáctanos: <Phone className="inline-block w-4 h-4 mr-1" /> +1 234 567 890</p>
          </div>
        </div>
      </footer>
    </div>
  )
}