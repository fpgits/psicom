import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, Clock, Users, Zap } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import AnimatedSection from '@/components/AnimatedSection'
import AppointmentButton from '@/components/AppointmentButton'
import FaqSection from '@/components/FaqSection'
import JsonLd from '@/components/JsonLd'

import { PLANS, CURRENCY, planSavings, HOURS_SUMMARY, LOCATION, SITE_URL } from '@/config/site'
import { SERVICES } from '@/config/services'
import { clean, type FaqItem } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Precios de Terapia Psicológica en Caracas | Planes y Tarifas',
  description:
    'Tarifas de terapia psicológica en Caracas: sesión individual $30, paquete de 3 sesiones $80 y plan mensual $100. Mismo precio presencial y online.',
  keywords: [
    'precios psicólogo Caracas',
    'cuánto cuesta una terapia en Caracas',
    'tarifas psicóloga Caracas',
    'sesión de psicología precio Venezuela',
    'terapia online precios Venezuela',
  ],
  alternates: { canonical: '/servicios' },
  openGraph: {
    url: '/servicios',
    title: 'Precios de terapia psicológica en Caracas',
    description: 'Sesión individual $30, paquete de 3 sesiones $80 y plan mensual $100.',
    images: ['/images/og-image.jpg'],
  },
}

const PLAN_ICONS = {
  'sesion-individual': Zap,
  'paquete-3-sesiones': Users,
  'plan-mensual': Clock,
} as const

/* Los precios del FAQ salen de PLANS, igual que las tarjetas. Antes el schema
   anunciaba $75 y $90 mientras la página cobraba $80 y $100: cualquier motor de
   IA que leyera el marcado citaba precios que no existían. */
const [individual, paquete, mensual] = PLANS

const PRICING_FAQS: FaqItem[] = [
  {
    question: '¿Cuánto cuesta una consulta psicológica en Caracas?',
    answer:
      `Una sesión individual de 60 minutos cuesta $${individual.price} en lugar de $${individual.originalPrice}. ` +
      `El paquete de ${paquete.sessions} sesiones cuesta $${paquete.price} y el plan mensual de hasta ` +
      `${mensual.sessions} sesiones, $${mensual.price}. Todos los precios están expresados en dólares estadounidenses.`,
  },
  {
    question: '¿El precio es el mismo para terapia online y presencial?',
    answer:
      'Sí. Las tarifas son idénticas en ambas modalidades y puedes alternar entre ellas dentro de un mismo plan, ' +
      `según te convenga cada semana. La consulta presencial está en ${LOCATION.neighborhood}, Caracas.`,
  },
  {
    question: '¿Qué incluye el paquete de 3 sesiones?',
    answer:
      `Tres sesiones de 60 minutos por $${paquete.price}, con seguimiento semanal por WhatsApp entre sesiones y ` +
      'material de trabajo para practicar en casa. Es la opción más elegida para trabajar un objetivo concreto sin ' +
      `comprometerse a un proceso largo: supone un ahorro de $${planSavings(paquete)} frente al precio regular.`,
  },
  {
    question: '¿Qué plan me conviene más?',
    answer:
      'Si es tu primera consulta o quieres conocer cómo se trabaja antes de decidir, la sesión individual es el punto ' +
      'de partida natural. Si ya tienes claro un objetivo acotado, el paquete de 3 sesiones mantiene el ritmo ' +
      'terapéutico. El plan mensual está pensado para procesos continuos, donde la frecuencia semanal forma parte del ' +
      'tratamiento. En la primera sesión se define cuál se ajusta mejor a tu caso.',
  },
  {
    question: '¿Cómo agendo y cuándo se confirma la cita?',
    answer:
      `Escribiendo por WhatsApp. Se responde en horario de consulta, ${HOURS_SUMMARY}, y en ese mismo contacto se ` +
      'acuerdan día, hora, modalidad y forma de pago.',
  },
]

export default function ServiciosPage() {
  /* ItemList de servicios con sus precios reales: da a Google y a los motores
     de respuesta una lectura estructurada del catálogo, que esta página no
     tenía pese a ser la que concentra las búsquedas de "precio". */
  const offerList = clean({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Planes de terapia psicológica en Caracas',
    itemListElement: PLANS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: p.title,
        description: p.description,
        serviceType: 'Psicoterapia',
        url: `${SITE_URL}/servicios`,
        offers: {
          '@type': 'Offer',
          price: p.price,
          priceCurrency: CURRENCY,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  })

  return (
    <div className="min-h-screen bg-background">
      <Header solid />
      <JsonLd data={offerList} />

      <main>
        <section className="relative pt-32 pb-14 lg:pt-36 lg:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-secondary/30" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
            <Breadcrumbs
              items={[
                { name: 'Inicio', url: '/' },
                { name: 'Precios y planes', url: '/servicios' },
              ]}
            />

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mt-8 mb-6 text-balance">
              Precios de terapia psicológica en Caracas
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Tarifas en dólares, iguales para la modalidad presencial en {LOCATION.neighborhood} y
              para la terapia online. Todos los planes incluyen sesiones de 60 minutos y seguimiento
              entre consultas por WhatsApp.
            </p>
          </div>
        </section>

        {/* ────────────────────────── PLANES ────────────────────────────── */}
        <section className="py-14 lg:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-6 items-stretch">
              {PLANS.map((plan) => {
                const Icon = PLAN_ICONS[plan.id]
                const savings = planSavings(plan)
                return (
                  <AnimatedSection key={plan.id}>
                    <div
                      className={`relative flex h-full flex-col rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                        plan.popular
                          ? 'bg-primary text-primary-foreground shadow-xl lg:scale-105'
                          : 'bg-card shadow-lg'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium whitespace-nowrap">
                            <Star className="w-4 h-4" aria-hidden="true" />
                            Más elegido
                          </span>
                        </div>
                      )}

                      <div className="text-center pt-10 px-6">
                        <div
                          className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                            plan.popular ? 'bg-primary-foreground/20' : 'bg-secondary'
                          }`}
                        >
                          <Icon
                            className={`w-7 h-7 ${
                              plan.popular ? 'text-primary-foreground' : 'text-primary'
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                        <h2
                          className={`font-serif text-xl font-semibold ${
                            plan.popular ? 'text-primary-foreground' : 'text-foreground'
                          }`}
                        >
                          {plan.title}
                        </h2>
                        {plan.highlight && (
                          <span
                            className={`inline-block mt-2 text-sm font-medium ${
                              plan.popular ? 'text-primary-foreground/80' : 'text-accent'
                            }`}
                          >
                            {plan.highlight}
                          </span>
                        )}
                      </div>

                      <div className="text-center px-6 pt-6 pb-6">
                        <span
                          className={`text-lg line-through ${
                            plan.popular ? 'text-primary-foreground/60' : 'text-muted-foreground'
                          }`}
                        >
                          ${plan.originalPrice}
                        </span>
                        <p
                          className={`text-4xl font-bold mt-1 ${
                            plan.popular ? 'text-primary-foreground' : 'text-foreground'
                          }`}
                        >
                          ${plan.price}
                          <span className="text-base font-normal opacity-70"> {CURRENCY}</span>
                        </p>
                        {/* Ahorro calculado, no escrito a mano: las etiquetas
                            anteriores decían "$15" y "$30" cuando los descuentos
                            reales eran de $10 y $20. */}
                        <p
                          className={`text-sm mt-2 ${
                            plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'
                          }`}
                        >
                          Ahorras ${savings}
                        </p>
                      </div>

                      <ul className="space-y-3 text-left px-7 flex-1">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle
                              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                plan.popular ? 'text-primary-foreground' : 'text-primary'
                              }`}
                              aria-hidden="true"
                            />
                            <span
                              className={`text-sm ${
                                plan.popular
                                  ? 'text-primary-foreground/90'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="p-7 pt-8">
                        <AppointmentButton
                          size="default"
                          variant={plan.popular ? 'accent' : 'primary'}
                          className="w-full h-12"
                        >
                          Comenzar ahora
                        </AppointmentButton>
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─────────────────────────── INCLUIDO ─────────────────────────── */}
        <section className="py-16 lg:py-20 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground text-balance">
                Todos los planes incluyen
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Espacio confidencial', description: 'Secreto profesional en cada sesión' },
                { title: 'Atención personalizada', description: 'Plan de trabajo ajustado a tu caso' },
                { title: 'Flexibilidad total', description: 'Alterna entre online y presencial' },
                { title: 'Seguimiento continuo', description: 'Acompañamiento entre sesiones' },
              ].map((item) => (
                <div key={item.title} className="bg-card rounded-2xl p-6 text-center shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────── ENLACES A ESPECIALIDADES ───────────────── */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3 text-balance">
              ¿En qué quieres trabajar?
            </h2>
            <p className="text-muted-foreground mb-8">
              Cada área tiene su propio abordaje. Estos son los motivos de consulta que atiendo.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:bg-secondary"
                >
                  <span className="font-medium text-foreground">{s.navLabel}</span>
                  <ArrowRight
                    className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FaqSection items={PRICING_FAQS} title="Preguntas frecuentes sobre precios y planes" />

        <section className="py-20 lg:py-24 bg-primary">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-6 text-balance">
              ¿Tienes dudas sobre qué plan elegir?
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-9">
              Escríbeme y lo vemos juntos. Sin compromiso.
            </p>
            <AppointmentButton variant="accent">Hablar con Mariany</AppointmentButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
