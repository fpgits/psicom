'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
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
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoadingModal from '@/components/LoadingModal'
import AnimatedSection from '@/components/AnimatedSection'

// Lazy load heavy components
const GoogleReviewsLazy = dynamic(() => import('@/components/GoogleReviewsLazy'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  ),
  ssr: false
})

// Service Card Component
function ServiceCard({ icon: Icon, title, description }: { icon: typeof Brain; title: string; description: string }) {
  return (
    <AnimatedSection>
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

  const handleAppointmentClick = () => setIsModalOpen(true)

  return (
    <div className="min-h-screen bg-background">
      <LoadingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onAppointmentClick={handleAppointmentClick} activePage="home" />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-secondary/30" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <AnimatedSection>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    <span>Psicología Clínica Especializada</span>
                  </div>
                  
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance">
                    Tu camino hacia el bienestar emocional comienza aquí
                  </h1>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
                    Te acompaño en tu proceso de transformación personal con terapia especializada, 
                    en un espacio seguro donde podrás trabajar hacia una vida más plena y satisfactoria.
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

                  <a href="#testimonios" className="flex items-center gap-6 pt-4 group cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center group-hover:scale-110 transition-transform">
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
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">+100 pacientes satisfechos</p>
                    </div>
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection className="relative">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
                  <Image
                    src="/images/foto1.jpg"
                    alt="Psicóloga en Caracas - Mariany Rodríguez, especialista en ansiedad, depresión y TDAH"
                    width={600}
                    height={750}
                    className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
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
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Servicios</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6 text-balance">
                Atención especializada para tu bienestar
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ofrezco diferentes modalidades de terapia adaptadas a tus necesidades, 
                con un enfoque cognitivo-conductual que te ayudará a alcanzar tus metas personales.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                icon={Brain}
                title="Salud Mental"
                description="Priorizamos tu bienestar mental para un mejor funcionamiento emocional y resolución de problemas."
              />
              <ServiceCard
                icon={Heart}
                title="Terapia Individual"
                description="Sesiones personalizadas para abordar tus necesidades específicas y alcanzar tus metas personales."
              />
              <ServiceCard
                icon={Users}
                title="Terapia de Pareja"
                description="Mejora tu relación con sesiones diseñadas para fortalecer la comunicación y resolver conflictos."
              />
              <ServiceCard
                icon={MessageCircle}
                title="Monitoreo Continuo"
                description="Seguimiento semanal de tu progreso vía WhatsApp, asegurando atención constante a tu proceso."
              />
              <ServiceCard
                icon={Clock}
                title="Horarios Flexibles"
                description="Terapia online adaptada a tu tiempo, ideal si no puedes asistir a sesiones presenciales."
              />
              <ServiceCard
                icon={Sparkles}
                title="Talleres Grupales"
                description="Participa en sesiones temáticas para desarrollar habilidades y compartir experiencias."
              />
            </div>

            <AnimatedSection className="text-center mt-12">
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
              <AnimatedSection className="order-2 lg:order-1">
                <Image
                  src="/images/foto2.jpg"
                  alt="Mariany Rodríguez - Psicóloga en Caracas especializada en terapia cognitivo-conductual"
                  width={600}
                  height={600}
                  className="rounded-3xl shadow-xl w-full object-cover aspect-square"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </AnimatedSection>

              <AnimatedSection className="order-1 lg:order-2 space-y-8">
                <div>
                  <span className="text-primary font-medium text-sm uppercase tracking-wider">Sobre Mí</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6 text-balance">
                    Hola, soy Mariany Rodríguez
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Soy psicóloga clínica con más de 5 años de experiencia y fundadora de esta plataforma 
                    dedicada a tu salud mental. Ofrezco atención especializada a niños, adolescentes y adultos, 
                    tanto de manera presencial como online.
                  </p>
                  <p>
                    Mi especialización abarca el tratamiento de TDAH, autismo, ansiedad, depresión y otros 
                    trastornos del estado de ánimo. Además, brindo apoyo integral incluyendo asesoría a 
                    padres para el bienestar y desarrollo de sus hijos.
                  </p>
                  <p>
                    Mi enfoque terapéutico se basa en la terapia cognitivo-conductual, una metodología 
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
                    description="Cada terapia adaptada a tus necesidades únicas."
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
              <AnimatedSection>
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJ0WGllZBZKowRsHZJZMOXEwU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Image
                    src="/images/mary.png"
                    alt="Deja tu reseña para psicóloga en Caracas - Mariany Rodríguez"
                    width={400}
                    height={400}
                    className="w-full max-w-md mx-auto transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </a>
              </AnimatedSection>

              <AnimatedSection className="text-center lg:text-left">
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6 text-balance">
                  Tu opinión es muy importante
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Solo toma 1 minuto de tu tiempo, pero ayudará e inspirará a otras personas 
                  a iniciar su camino hacia el bienestar mental.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
                  <a
                    href="https://search.google.com/local/writereview?placeid=ChIJ0WGllZBZKowRsHZJZMOXEwU"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dejar mi reseña
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
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonios</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6 text-balance">
                Lo que dicen mis pacientes
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Las experiencias de quienes han confiado en mí para su proceso de bienestar emocional.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <GoogleReviewsLazy />
            </AnimatedSection>
          </div>
        </section>

        {/* Mindful Section */}
        <section className="py-20 lg:py-28 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <AnimatedSection>
              <div className="mindful-gradient rounded-3xl p-10 lg:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-3 h-full rainbow-stripes" />
                <div className="absolute top-0 left-0 w-3 h-full rainbow-stripes" />
                
                <div className="text-center space-y-8 relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Diario Emocional</span>
                  </div>
                  
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Transforma tu Bienestar
                  </h2>
                  
                  <p className="text-white/90 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
                    Una herramienta poderosa para cultivar mindfulness, gestionar emociones y crear hábitos positivos cada día. Descubre tu diario emocional diseñado para acompañarte en tu camino hacia el bienestar mental.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                      PDF Descargable
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                      219 Páginas
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                      Entrega Inmediata
                    </span>
                  </div>
                  
                  <div className="pt-4">
                    <a
                      href="https://mindful.tubienestarmental.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rainbow-button inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-bold"
                    >
                      <Sparkles className="w-5 h-5" />
                      Descubre Mindful
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6 text-balance">
                ¿Listo para comenzar tu viaje hacia el bienestar emocional?
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                No esperes más para dar el primer paso hacia una vida más plena y satisfactoria. 
                Estoy aquí para acompañarte en tu proceso.
              </p>
              <Button size="lg" onClick={handleAppointmentClick} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 h-14 text-base">
                Agenda tu cita ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
