'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Menu, 
  ArrowRight, 
  Brain, 
  Heart, 
  Users, 
  Calendar,
  MessageCircle,
  CheckCircle,
  Star,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react'
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
import GoogleReviewsLazy from '@/components/GoogleReviewsLazy'

// Loading Modal Component
function LoadingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsLoading(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isLoading && isOpen) {
      const redirectTimer = setTimeout(() => {
        window.location.href = 'https://wa.me/584245157059?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n'
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
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="text-muted-foreground">Buscando horarios disponibles...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-primary">
                <CheckCircle className="w-12 h-12" />
                <span className="font-medium">Redirigiendo a WhatsApp...</span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

// Animated Section Component
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 150)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  )
}

// Service Card Component
function ServiceCard({ icon: Icon, title, description, delay }: { icon: typeof Brain; title: string; description: string; delay: number }) {
  return (
    <AnimatedSection delay={delay}>
      <Card className="group h-full border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-8">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}

// Value Proposition Card
function ValueCard({ icon: Icon, title, description }: { icon: typeof Shield; title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAppointmentClick = () => setIsModalOpen(true)

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#sobre-mi', label: 'Sobre Mi' },
    { href: '#testimonios', label: 'Testimonios' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <LoadingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/images/logo.png" alt="Logo" className="w-10 h-10 transition-transform group-hover:scale-105" />
              <span className="font-serif text-xl font-semibold text-foreground">Tu Bienestar Mental</span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/servicios" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Planes
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
                <Button onClick={handleAppointmentClick} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                  Agendar Cita
                </Button>
              </li>
            </ul>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background border-border">
                <nav className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  ))}
                  <Link href="/servicios" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                    Planes
                  </Link>
                  <a
                    href="https://mindful.tubienestarmental.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rainbow-button inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold"
                  >
                    <Sparkles className="w-5 h-5" />
                    Mindful
                  </a>
                  <Button onClick={handleAppointmentClick} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-2">
                    Agendar Cita
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-secondary/30" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <AnimatedSection delay={1}>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    <span>Psicologia Clinica Especializada</span>
                  </div>
                  
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance">
                    Tu camino hacia el bienestar emocional comienza aqui
                  </h1>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
                    Te acompano en tu proceso de transformacion personal con terapia especializada, 
                    en un espacio seguro donde podras trabajar hacia una vida mas plena y satisfactoria.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" onClick={handleAppointmentClick} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-14 text-base">
                      Agenda tu primera cita
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button size="lg" variant="outline" asChild className="rounded-full px-8 h-14 text-base border-border hover:bg-secondary">
                      <a href="#servicios">Conocer servicios</a>
                    </Button>
                  </div>

                  <div className="flex items-center gap-6 pt-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                          <Heart className="w-4 h-4 text-primary" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">+100 pacientes satisfechos</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={2} className="relative">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
                  <img
                    src="/images/foto1.jpg"
                    alt="Mariany Rodriguez - Psicologa Clinica"
                    className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
                  />
                  
                  {/* Floating Card */}
                  <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-5 border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Horarios Flexibles</p>
                        <p className="text-sm text-muted-foreground">Online y Presencial</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-20 lg:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection delay={1} className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Servicios</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6 text-balance">
                Atencion especializada para tu bienestar
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ofrezco diferentes modalidades de terapia adaptadas a tus necesidades, 
                con un enfoque cognitivo-conductual que te ayudara a alcanzar tus metas personales.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                icon={Brain}
                title="Salud Mental"
                description="Priorizamos tu bienestar mental para un mejor funcionamiento emocional y resolucion de problemas."
                delay={2}
              />
              <ServiceCard
                icon={Heart}
                title="Terapia Individual"
                description="Sesiones personalizadas para abordar tus necesidades especificas y alcanzar tus metas personales."
                delay={3}
              />
              <ServiceCard
                icon={Users}
                title="Terapia de Pareja"
                description="Mejora tu relacion con sesiones disenadas para fortalecer la comunicacion y resolver conflictos."
                delay={4}
              />
              <ServiceCard
                icon={MessageCircle}
                title="Monitoreo Continuo"
                description="Seguimiento semanal de tu progreso via WhatsApp, asegurando atencion constante a tu proceso."
                delay={5}
              />
              <ServiceCard
                icon={Clock}
                title="Horarios Flexibles"
                description="Terapia online adaptada a tu tiempo, ideal si no puedes asistir a sesiones presenciales."
                delay={6}
              />
              <ServiceCard
                icon={Sparkles}
                title="Talleres Grupales"
                description="Participa en sesiones tematicas para desarrollar habilidades y compartir experiencias."
                delay={7}
              />
            </div>

            <AnimatedSection delay={8} className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-border hover:bg-secondary">
                <Link href="/servicios">
                  Ver planes y precios
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre-mi" className="py-20 lg:py-28 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <AnimatedSection delay={1} className="order-2 lg:order-1">
                <img
                  src="/images/foto2.jpg"
                  alt="Mariany Rodriguez"
                  className="rounded-3xl shadow-xl w-full object-cover aspect-square"
                />
              </AnimatedSection>

              <AnimatedSection delay={2} className="order-1 lg:order-2 space-y-8">
                <div>
                  <span className="text-primary font-medium text-sm uppercase tracking-wider">Sobre Mi</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6 text-balance">
                    Hola, soy Mariany Rodriguez
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Soy psicologa clinica con mas de 5 anos de experiencia y fundadora de esta plataforma 
                    dedicada a tu salud mental. Ofrezco atencion especializada a ninos, adolescentes y adultos, 
                    tanto de manera presencial como online.
                  </p>
                  <p>
                    Mi especializacion abarca el tratamiento de TDAH, autismo, ansiedad, depresion y otros 
                    trastornos del estado de animo. Ademas, brindo apoyo integral incluyendo asesoria a 
                    padres para el bienestar y desarrollo de sus hijos.
                  </p>
                  <p>
                    Mi enfoque terapeutico se basa en la terapia cognitivo-conductual, una metodologia 
                    eficaz centrada en modificar los pensamientos para cambiar la conducta.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <ValueCard
                    icon={Shield}
                    title="Espacio Seguro"
                    description="Un ambiente de confianza y confidencialidad total."
                  />
                  <ValueCard
                    icon={Heart}
                    title="Enfoque Personalizado"
                    description="Cada terapia adaptada a tus necesidades unicas."
                  />
                </div>

                <Button size="lg" onClick={handleAppointmentClick} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                  Agenda tu primera consulta
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Review CTA Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection delay={1}>
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJ0WGllZBZKowRsHZJZMOXEwU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <img
                    src="/images/mary.png"
                    alt="Deja tu resena"
                    className="w-full max-w-md mx-auto transition-transform group-hover:scale-105"
                  />
                </a>
              </AnimatedSection>

              <AnimatedSection delay={2} className="text-center lg:text-left">
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6 text-balance">
                  Tu opinion es muy importante
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Solo toma 1 minuto de tu tiempo, pero ayudara e inspirara a otras personas 
                  a iniciar su camino hacia el bienestar mental.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
                  <a
                    href="https://search.google.com/local/writereview?placeid=ChIJ0WGllZBZKowRsHZJZMOXEwU"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dejar mi resena
                    <Star className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="py-20 lg:py-28 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection delay={1} className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonios</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6 text-balance">
                Lo que dicen mis pacientes
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Las experiencias de quienes han confiado en mi para su proceso de bienestar emocional.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={2}>
              <GoogleReviewsLazy />
            </AnimatedSection>
          </div>
        </section>

        {/* Mindful Section */}
        <section className="py-20 lg:py-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection delay={1}>
              <div className="mindful-gradient rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                {/* Rainbow stripes decoration */}
                <div className="absolute top-0 right-0 w-4 h-full rainbow-stripes hidden lg:block" />
                <div className="absolute bottom-0 right-0 w-full h-4 rainbow-stripes lg:hidden" />
                
                {/* Decorative brackets */}
                <div className="absolute top-8 left-8 text-white/20 text-6xl font-light select-none hidden lg:block">{"{"}</div>
                <div className="absolute bottom-8 left-8 text-white/20 text-6xl font-light select-none hidden lg:block">{"}"}</div>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                  <div className="space-y-6 lg:pl-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Diario Emocional</span>
                    </div>
                    
                    <div className="space-y-2">
                      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        TRANSFORMA
                      </h2>
                      <p className="text-2xl md:text-3xl font-bold text-yellow-300">
                        TU
                      </p>
                      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight flex items-center gap-2">
                        <span className="text-white/30">{"{"}</span>
                        BIENESTAR
                        <span className="text-white/30">{"}"}</span>
                      </h2>
                    </div>
                    
                    <p className="text-white/90 text-lg leading-relaxed max-w-md">
                      Una herramienta poderosa para cultivar mindfulness, gestionar emociones y crear habitos positivos cada dia.
                    </p>
                    
                    {/* Feature badges */}
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 rounded-full bg-[#ff6b6b] text-white text-sm font-semibold uppercase">
                        PDF Descargable
                      </span>
                      <span className="px-4 py-2 rounded-full bg-gray-600 text-white text-sm font-semibold">
                        219 Paginas
                      </span>
                      <span className="px-4 py-2 rounded-full bg-white text-gray-800 text-sm font-semibold uppercase">
                        Entrega Inmediata
                      </span>
                    </div>
                    
                    {/* Rainbow Button */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <a
                        href="https://mindful.tubienestarmental.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rainbow-button inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-bold"
                      >
                        <Sparkles className="w-5 h-5" />
                        Mindful
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="relative">
                    {/* Rainbow frame around image */}
                    <div className="absolute -inset-2 rounded-3xl rainbow-stripes opacity-80" />
                    <div className="relative bg-white p-2 rounded-2xl">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BF208F2F3-7706-4561-9C88-D99E307BC0BE%7D-vZedJBoPzMoh9x5e9aoWzPDy0HoFZA.png"
                        alt="Mindful - Diario Emocional"
                        className="rounded-xl w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <AnimatedSection delay={1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6 text-balance">
                Listo para comenzar tu viaje hacia el bienestar emocional?
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                No esperes mas para dar el primer paso hacia una vida mas plena y satisfactoria. 
                Estoy aqui para acompanarte en tu proceso.
              </p>
              <Button size="lg" onClick={handleAppointmentClick} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 h-14 text-base">
                Agenda tu cita ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
              <span className="font-serif text-xl font-semibold text-background">Tu Bienestar Mental</span>
            </div>
            <p className="text-background/60 text-sm">
              © 2024 Tu Bienestar Mental. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
