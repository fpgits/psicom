'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { 
  Menu, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Star,
  Clock,
  Users,
  Zap
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

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

// Pricing Card Component
function PricingCard({ 
  title, 
  price, 
  originalPrice, 
  features, 
  isPopular = false, 
  highlight,
  icon: Icon,
  onSelect 
}: { 
  title: string
  price: string
  originalPrice: string
  features: string[]
  isPopular?: boolean
  highlight?: string
  icon: typeof Clock
  onSelect: () => void 
}) {
  return (
    <Card className={`relative h-full border-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isPopular ? 'bg-primary text-primary-foreground shadow-xl scale-105' : 'bg-card shadow-lg'}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">
            <Star className="w-4 h-4" />
            Mas Popular
          </span>
        </div>
      )}
      
      <CardHeader className="text-center pt-8 pb-4">
        <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${isPopular ? 'bg-primary-foreground/20' : 'bg-secondary'}`}>
          <Icon className={`w-7 h-7 ${isPopular ? 'text-primary-foreground' : 'text-primary'}`} />
        </div>
        <h3 className={`font-serif text-xl font-semibold ${isPopular ? 'text-primary-foreground' : 'text-foreground'}`}>
          {title}
        </h3>
        {highlight && (
          <span className={`inline-block mt-2 text-sm font-medium ${isPopular ? 'text-primary-foreground/80' : 'text-accent'}`}>
            {highlight}
          </span>
        )}
      </CardHeader>
      
      <CardContent className="text-center pb-6">
        <div className="mb-6">
          <span className={`text-lg line-through ${isPopular ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
            ${originalPrice}
          </span>
          <div className={`text-4xl font-bold mt-1 ${isPopular ? 'text-primary-foreground' : 'text-foreground'}`}>
            ${price}
          </div>
        </div>
        
        <ul className="space-y-3 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isPopular ? 'text-primary-foreground' : 'text-primary'}`} />
              <span className={`text-sm ${isPopular ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pb-8">
        <Button 
          onClick={onSelect} 
          className={`w-full rounded-full h-12 font-medium ${isPopular ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
        >
          Comenzar ahora
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ServiciosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAppointmentClick = () => setIsModalOpen(true)

  const navLinks = [
    { href: '/#servicios', label: 'Servicios' },
    { href: '/#sobre-mi', label: 'Sobre Mi' },
    { href: '/#testimonios', label: 'Testimonios' },
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
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/servicios" className="text-foreground font-medium">
                  Planes
                </Link>
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
                    <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/servicios" className="text-lg font-medium text-primary">
                    Planes
                  </Link>
                  <Button onClick={handleAppointmentClick} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-4">
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
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-secondary/30" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <AnimatedSection delay={1} className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Ofertas especiales disponibles</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6 text-balance">
                Planes disenados para tu bienestar
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Elige el plan que mejor se adapte a tus necesidades. Todos incluyen atencion 
                personalizada y seguimiento continuo de tu progreso.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-6 items-stretch">
              <AnimatedSection delay={2}>
                <PricingCard
                  title="Sesion Individual"
                  price="30"
                  originalPrice="40"
                  icon={Zap}
                  highlight="Precio especial"
                  features={[
                    "Una sesion de 60 minutos",
                    "Online o presencial",
                    "Ideal para consultas puntuales",
                    "Sin compromiso a largo plazo",
                    "Seguimiento post-sesion"
                  ]}
                  onSelect={handleAppointmentClick}
                />
              </AnimatedSection>

              <AnimatedSection delay={3}>
                <PricingCard
                  title="Paquete 3 Sesiones"
                  price="75"
                  originalPrice="90"
                  icon={Users}
                  isPopular
                  features={[
                    "3 sesiones de 60 minutos",
                    "Ahorra $15 en total",
                    "Perfecto para problemas especificos",
                    "Mantiene el ritmo terapeutico",
                    "Seguimiento semanal via WhatsApp",
                    "Recursos adicionales incluidos"
                  ]}
                  onSelect={handleAppointmentClick}
                />
              </AnimatedSection>

              <AnimatedSection delay={4}>
                <PricingCard
                  title="Plan Mensual"
                  price="90"
                  originalPrice="120"
                  icon={Clock}
                  highlight="Mejor valor"
                  features={[
                    "Hasta 4 sesiones al mes",
                    "Ahorra $30 en total",
                    "Maxima flexibilidad horaria",
                    "Ideal para terapia continua",
                    "Seguimiento diario si es necesario",
                    "Prioridad en agenda"
                  ]}
                  onSelect={handleAppointmentClick}
                />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection delay={1} className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6 text-balance">
                Todos los planes incluyen
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={2}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Espacio Seguro", description: "Confidencialidad total en cada sesion" },
                  { title: "Atencion Personalizada", description: "Terapia adaptada a tus necesidades" },
                  { title: "Flexibilidad Total", description: "Elige entre online o presencial" },
                  { title: "Seguimiento Continuo", description: "Apoyo entre sesiones via WhatsApp" }
                ].map((item, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 text-center shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <AnimatedSection delay={1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6 text-balance">
                Tienes dudas sobre que plan elegir?
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                Contactame y con gusto te ayudare a encontrar la opcion perfecta para ti. 
                Tu bienestar es mi prioridad.
              </p>
              <Button size="lg" onClick={handleAppointmentClick} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 h-14 text-base">
                Hablar con Mariany
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
