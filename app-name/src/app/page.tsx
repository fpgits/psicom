'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Brain, TrendingUp, Calendar, Smile, Users, Book, Menu, X, Star, Heart, MessageCircle, Bookmark } from 'lucide-react'
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
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
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
      <img src={imageUrl} alt="Testimonio" className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" />
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

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#C4DDF5]">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="Tu Bienestar Mental Logo" className="w-8 h-8 mr-2" />
              <h1 className="text-xl font-semibold text-[#78AAC3]">Tu Bienestar Mental</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Dialog>
                <DialogTrigger asChild>
                  <a className="text-gray-600 hover:text-[#78AAC3] cursor-pointer">Mindful</a>
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
              <a href="#servicios" className="text-gray-600 hover:text-[#78AAC3]">Servicios</a>
              <Dialog>
                <DialogTrigger asChild>
                  <a className="text-gray-600 hover:text-[#78AAC3] cursor-pointer">Talleres</a>
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
              <Button className="bg-[#EEAB73] hover:bg-[#F5A281] text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Agenda tu cita
              </Button>
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="container mx-auto px-4 py-2">
            <Dialog>
              <DialogTrigger asChild>
                <a className="block py-2 text-gray-600 hover:text-[#78AAC3] cursor-pointer">Mindful</a>
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
            <a href="#servicios" className="block py-2 text-gray-600 hover:text-[#78AAC3]">Servicios</a>
            <Dialog>
              <DialogTrigger asChild>
                <a className="block py-2 text-gray-600 hover:text-[#78AAC3] cursor-pointer">Talleres</a>
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
            <Button className="w-full mt-2 bg-[#EEAB73] hover:bg-[#F5A281] text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Agenda tu cita
            </Button>
          </nav>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8">
            <h2 className="text-3xl font-bold text-[#78AAC3] mb-6">Bienvenido a Tu Bienestar Mental</h2>
            <p className="text-lg text-gray-700 mb-4">
              Ofrecemos servicios de psicología y terapia para ayudarte a alcanzar una mejor salud mental y emocional.
              Nuestro equipo de profesionales está aquí para apoyarte en tu camino hacia el bienestar.
            </p>
            <Button className="bg-[#EEAB73] hover:bg-[#F5A281] text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Agenda tu cita
            </Button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img src="/images/foto1.jpg" alt="Psicólogo atendiendo a un paciente" className="rounded-lg shadow-xl w-full h-auto" />
          </div>
        </section>

        <section id="servicios" className="mb-12">
          <h2 className="text-3xl font-bold text-center text-[#78AAC3] mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Brain className="w-12 h-12 text-[#EEAB73] mb-4" />
                <CardTitle>Mejora tu salud mental</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Prioriza tu bienestar mental para un mejor funcionamiento, resolución de problemas y disfrute del presente.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-[#F5A281] mb-4" />
                <CardTitle>Monitoreo personalizado</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Seguimiento semanal de tu progreso vía WhatsApp, asegurando una atención constante a tu proceso.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Calendar className="w-12 h-12 text-[#F3CD86] mb-4" />
                <CardTitle>Horarios flexibles</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Terapia online adaptada a tu tiempo, ideal si no puedes asistir a sesiones presenciales.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Smile className="w-12 h-12 text-[#97C8D8] mb-4" />
                <CardTitle>Terapia individual</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Sesiones personalizadas para abordar tus necesidades específicas y ayudarte a alcanzar tus metas personales.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-[#78AAC3] mb-4" />
                <CardTitle>Terapia de pareja</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Mejora tu relación con sesiones diseñadas para fortalecer la comunicación y resolver conflictos.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Book className="w-12 h-12 text-[#C4DDF5] mb-4" />
                <CardTitle>Talleres y workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Participa en sesiones grupales temáticas para desarrollar habilidades y compartir experiencias.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="testimonios" className="mb-12">
          <h2 className="text-3xl font-bold text-center text-[#78AAC3] mb-12">Testimonios de Pacientes en Venezuela</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              username="María G."
              date="15 de mayo, 2023"
              rating={5}
              comment="Las sesiones online con Mariany han sido una bendición. Desde Maracaibo, he podido recibir ayuda profesional de calidad sin salir de casa. ¡Totalmente recomendada!"
              imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/testimonial1-Hy5Ue9Ue5Ue9Ue5Ue9Ue5Ue9Ue5Ue9.jpg"
            />
            <Testimonial 
              username="Carlos R."
              date="3 de junio, 2023"
              rating={5}
              comment="Como caraqueño, encontrar un psicólogo de confianza era crucial. Mariany no solo es profesional, sino que también crea un ambiente cómodo y seguro. Ha sido de gran ayuda en mi proceso."
              imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/testimonial2-Hy5Ue9Ue5Ue9Ue5Ue9Ue5Ue9Ue5Ue9.jpg"
            />
            <Testimonial 
              username="Ana V."
              date="20 de julio, 2023"
              rating={5}
              comment="Desde Valencia, he estado tomando sesiones online con Mariany. Su enfoque y técnicas han sido fundamentales para manejar mi ansiedad. Gracias por hacer la terapia accesible en todo el país."
              imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/testimonial3-Hy5Ue9Ue5Ue9Ue5Ue9Ue5Ue9Ue5Ue9.jpg"
            />
          </div>
        </section>

        <section id="about" className="mb-12">
          <h2 className="text-2xl font-bold text-[#78AAC3] mb-6">Sobre Nosotros</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <p className="text-lg text-gray-700 mb-4">
                En Tu Bienestar Mental, nos dedicamos a proporcionar atención psicológica de calidad. Nuestro equipo de profesionales altamente calificados está comprometido con tu bienestar emocional y mental.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Ofrecemos un enfoque personalizado para cada cliente, utilizando técnicas probadas y actualizadas en el campo de la psicología.
              </p>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <img src="/images/foto2.jpg" alt="Equipo de psicólogos" className="rounded-lg shadow-xl w-full h-auto" />
            </div>
          </div>
        </section>

        <section id="contact" className="mb-12">
          <h2 className="text-2xl font-bold text-[#78AAC3] mb-6">Contáctanos</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-lg text-gray-700 mb-4">
              Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros para programar una cita o hacer cualquier consulta.
            </p>
            <div className="flex flex-col md:flex-row md:items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#EEAB73] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700">+58 212-555-5555</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#EEAB73] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700">contacto@tubienestarmental.com</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#EEAB73] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-700">Av. Francisco de Miranda, Chacao, Caracas</span>
            </div>
            <Button className="bg-[#EEAB73] hover:bg-[#F5A281] text-white mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Agenda tu cita ahora
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-[#78AAC3] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/images/logo.png" alt="Tu Bienestar Mental Logo" className="w-10 h-10 mb-2" />
              <p>&copy; 2024 Tu Bienestar Mental. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}