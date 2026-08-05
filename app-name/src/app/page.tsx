import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Brain,
  Heart,
  Users,
  Shield,
  Sparkles,
  Monitor,
  Star,
  BadgeCheck,
  Clock,
  MapPin,
  MessageCircle,
} from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import AppointmentButton from '@/components/AppointmentButton'
import FaqSection from '@/components/FaqSection'
import GoogleReviews from '@/components/GoogleReviewsLazy'
import Testimonials from '@/components/Testimonials'

import { SERVICES } from '@/config/services'
import { HOME_FAQS } from '@/config/faqs'
import { PERSON, LOCATION, HOURS_SUMMARY, GOOGLE_BUSINESS } from '@/config/site'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const ICONS = {
  brain: Brain,
  heart: Heart,
  users: Users,
  sparkles: Sparkles,
  shield: Shield,
  monitor: Monitor,
} as const

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* ───────────────────────────── HERO ───────────────────────────── */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-secondary/30" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <AnimatedSection>
                <div className="space-y-7">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                    <span>Psicóloga colegiada · F.P.V. {PERSON.fpvNumber}</span>
                  </div>

                  {/*
                    El H1 anterior era "Tu camino hacia el bienestar emocional
                    comienza aquí": sin "psicóloga" y sin "Caracas". El title sí
                    llevaba las keywords, pero el H1 es la segunda señal on-page
                    más fuerte y estaba desaprovechado.
                  */}
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance">
                    Psicóloga en Caracas: tu camino hacia el bienestar emocional
                  </h1>

                  <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
                    Si estás buscando un psicólogo en Caracas para ti o para alguien de tu familia,
                    soy {PERSON.name}, psicóloga clínica con más de {PERSON.yearsOfExperience} años
                    de experiencia. Atiendo de forma presencial en {LOCATION.neighborhood} y online
                    para toda Venezuela, con enfoque cognitivo-conductual.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <AppointmentButton>Agenda tu primera cita</AppointmentButton>
                    <Link
                      href="#especialidades"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 h-14 text-base font-medium hover:bg-secondary transition-colors"
                    >
                      Ver especialidades
                    </Link>
                  </div>

                  <a
                    href="#testimonios"
                    className="flex items-center gap-6 pt-3 group cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center group-hover:scale-110 transition-transform"
                        >
                          <Heart className="w-4 h-4 text-primary" aria-hidden="true" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1" aria-hidden="true">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        Lee las reseñas de mis pacientes
                      </p>
                    </div>
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection className="relative">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
                  <Image
                    src="/images/foto1.jpg"
                    alt={`${PERSON.name}, psicóloga clínica en Caracas especializada en ansiedad, depresión, TDAH y autismo`}
                    width={600}
                    height={750}
                    className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-5 border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {LOCATION.neighborhood}, Caracas
                        </p>
                        <p className="text-sm text-muted-foreground">Presencial y online</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ─────────────────────── FRANJA DE CONFIANZA ──────────────────── */}
        <section className="border-y border-border bg-card/50 py-8" aria-label="Datos de la consulta">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { icon: BadgeCheck, term: 'Colegiatura', desc: `F.P.V. ${PERSON.fpvNumber}` },
                { icon: Clock, term: 'Experiencia', desc: `Más de ${PERSON.yearsOfExperience} años` },
                { icon: Monitor, term: 'Modalidad', desc: 'Presencial y online' },
                { icon: MessageCircle, term: 'Seguimiento', desc: 'Entre sesiones por WhatsApp' },
              ].map(({ icon: Icon, term, desc }) => (
                <div key={term} className="flex flex-col items-center gap-2">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{term}</dt>
                  <dd className="font-semibold text-foreground text-sm">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ───────────────────────── ESPECIALIDADES ─────────────────────── */}
        <section id="especialidades" className="py-20 lg:py-28 bg-background scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Especialidades
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6 text-balance">
                En qué puedo acompañarte
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Cada motivo de consulta tiene su propio abordaje. Entra en el que te interese para
                ver cómo se trabaja, qué señales conviene atender y qué esperar del proceso.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service) => {
                const Icon = ICONS[service.icon]
                return (
                  <AnimatedSection key={service.slug}>
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary">
                        <Icon
                          className="w-7 h-7 text-primary transition-colors group-hover:text-primary-foreground"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                        {service.navLabel}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                        {service.lead.split('. ').slice(0, 2).join('. ')}.
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        Ver más
                        <ArrowRight
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </AnimatedSection>
                )
              })}
            </div>

            <AnimatedSection className="text-center mt-12">
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 font-medium hover:bg-secondary transition-colors"
              >
                Ver planes y precios
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* ───────────────────────────── SOBRE MÍ ───────────────────────── */}
        <section id="sobre-mi" className="py-20 lg:py-28 bg-secondary/50 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <AnimatedSection className="order-2 lg:order-1">
                <Image
                  src="/images/foto2.jpg"
                  alt={`${PERSON.name} en consulta — psicóloga en Caracas con enfoque cognitivo-conductual`}
                  width={600}
                  height={600}
                  className="rounded-3xl shadow-xl w-full object-cover aspect-square"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </AnimatedSection>

              <AnimatedSection className="order-1 lg:order-2 space-y-7">
                <div>
                  <span className="text-primary font-medium text-sm uppercase tracking-wider">
                    Sobre mí
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6 text-balance">
                    Hola, soy {PERSON.name}
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Soy psicóloga clínica colegiada en la Federación de Psicólogos de Venezuela
                    (F.P.V. {PERSON.fpvNumber}), con más de {PERSON.yearsOfExperience} años de
                    experiencia atendiendo a niños, adolescentes y adultos.
                  </p>
                  <p>
                    Mi trabajo se centra en el tratamiento de la ansiedad, la depresión, el TDAH y
                    el espectro autista, además de la terapia de pareja y la orientación a padres.
                    Atiendo de forma presencial en {LOCATION.neighborhood}, Caracas, y online para
                    toda Venezuela y para venezolanos en el exterior.
                  </p>
                  <p>
                    Trabajo desde la terapia cognitivo-conductual: un enfoque estructurado, con
                    objetivos definidos desde el inicio y con ejercicios concretos entre sesiones.
                    Vas a saber en todo momento en qué punto del proceso estás y hacia dónde vamos.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 pt-2">
                  {[
                    {
                      icon: Shield,
                      title: 'Espacio confidencial',
                      desc: 'Protegido por el secreto profesional del Código de Ética del Psicólogo.',
                    },
                    {
                      icon: Heart,
                      title: 'Enfoque personalizado',
                      desc: 'El plan de trabajo se ajusta a tu motivo de consulta y a tu ritmo.',
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <AppointmentButton>Agenda tu primera consulta</AppointmentButton>
                  <Link
                    href="/sobre-mi"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 h-14 text-base font-medium hover:bg-background transition-colors"
                  >
                    Conocer mi formación
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ──────────────────────── CÓMO EMPEZAR ────────────────────────── */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                El proceso
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 text-balance">
                Cómo empezar tu terapia
              </h2>
            </AnimatedSection>

            <ol className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Escribe por WhatsApp',
                  desc: `Cuéntame brevemente qué te trae a consulta. Respondo en horario de atención, ${HOURS_SUMMARY}.`,
                },
                {
                  step: '02',
                  title: 'Agendamos la primera sesión',
                  desc: 'Elegimos día, hora y modalidad: presencial en Caracas u online. No hace falta preparar nada.',
                },
                {
                  step: '03',
                  title: 'Definimos el plan',
                  desc: 'La primera sesión es de evaluación. Al cierre planteamos objetivos concretos y frecuencia de trabajo.',
                },
              ].map((item) => (
                <AnimatedSection key={item.step}>
                  <li className="relative rounded-2xl border border-border bg-card p-8 h-full">
                    <span className="font-serif text-4xl font-semibold text-primary/20">
                      {item.step}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mt-3 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                  </li>
                </AnimatedSection>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────────────────── TESTIMONIOS ────────────────────────── */}
        <section id="testimonios" className="py-20 lg:py-28 bg-secondary/50 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Testimonios
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6 text-balance">
                Lo que dicen mis pacientes
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Las experiencias de quienes han confiado en mí para su proceso de bienestar
                emocional.
              </p>
            </AnimatedSection>

            {/* Testimonios en texto plano: indexables por Google y legibles por
                los buscadores de IA, a diferencia del widget embebido. */}
            <Testimonials />

            <AnimatedSection>
              <GoogleReviews />
            </AnimatedSection>
          </div>
        </section>

        {/* ─────────────────────── CTA DE RESEÑA ────────────────────────── */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <a
                  href={GOOGLE_BUSINESS.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Image
                    src="/images/mary.png"
                    alt={`Deja tu reseña sobre ${PERSON.name}, psicóloga en Caracas`}
                    width={400}
                    height={400}
                    className="w-full max-w-md mx-auto transition-transform group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </a>
              </AnimatedSection>

              <AnimatedSection className="text-center lg:text-left">
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6 text-balance">
                  Tu opinión es muy importante
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Solo toma un minuto, pero ayudará e inspirará a otras personas a iniciar su camino
                  hacia el bienestar mental.
                </p>
                <a
                  href={GOOGLE_BUSINESS.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  Dejar mi reseña en Google
                  <Star className="w-5 h-5" aria-hidden="true" />
                </a>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ───────────────────────────── MINDFUL ────────────────────────── */}
        <section className="py-20 lg:py-28 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <AnimatedSection>
              <div className="mindful-gradient rounded-3xl p-10 lg:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-3 h-full rainbow-stripes" />
                <div className="absolute top-0 left-0 w-3 h-full rainbow-stripes" />

                <div className="text-center space-y-8 relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>Diario Emocional</span>
                  </div>

                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Transforma tu bienestar
                  </h2>

                  <p className="text-white/90 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
                    Una herramienta para cultivar mindfulness, gestionar emociones y crear hábitos
                    positivos cada día. Un diario emocional diseñado para acompañarte entre sesión y
                    sesión.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3">
                    {['PDF descargable', '219 páginas', 'Entrega inmediata'].map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <a
                      href="https://mindful.tubienestarmental.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rainbow-button inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-bold"
                    >
                      <Sparkles className="w-5 h-5" aria-hidden="true" />
                      Descubre Mindful
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ─────────────────────────────── FAQ ──────────────────────────── */}
        <FaqSection
          items={HOME_FAQS}
          title="Preguntas frecuentes sobre la consulta psicológica en Caracas"
          subtitle="Las dudas que con más frecuencia me plantean antes de la primera sesión."
        />

        {/* ────────────────────────── CTA FINAL ─────────────────────────── */}
        <section className="py-20 lg:py-28 bg-primary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6 text-balance">
                ¿Listo para dar el primer paso?
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                Escríbeme y conversamos sobre qué necesitas. Sin compromiso, en horario de consulta:{' '}
                {HOURS_SUMMARY}.
              </p>
              <AppointmentButton variant="accent">Agenda tu cita ahora</AppointmentButton>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
