import type { Metadata } from 'next'
import { MapPin, Phone, Clock, Instagram, Monitor, MessageCircle } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'

import {
  PERSON,
  CONTACT,
  LOCATION,
  SOCIAL,
  OPENING_HOURS,
  HOURS_SUMMARY,
  GOOGLE_BUSINESS,
  SCHEMA_ID,
} from '@/config/site'
import { whatsappUrl, telUrl, mailUrl } from '@/lib/links'
import { clean } from '@/lib/schema'

/**
 * Página de contacto y ubicación.
 *
 * El sitio no tenía ninguna: el teléfono no aparecía en el HTML por ningún
 * lado, y el marcado publicaba un '+58-XXX-XXXX'. Para SEO local, una página
 * con el NAP completo, el horario y el enlace a la ficha de Google Maps es una
 * de las señales con mejor relación esfuerzo/impacto.
 */

export const metadata: Metadata = {
  title: 'Contacto y Ubicación | Psicóloga en Caracas — Mariany Rodríguez',
  description: `Agenda tu cita con ${PERSON.name}, psicóloga clínica en Caracas. Consulta presencial en ${LOCATION.neighborhood} y terapia online. Atención ${HOURS_SUMMARY}.`,
  keywords: [
    'contacto psicóloga Caracas',
    'agendar cita psicólogo Caracas',
    'consulta psicológica Los Chaguaramos',
    'teléfono psicóloga Caracas',
  ],
  alternates: { canonical: '/contacto' },
  openGraph: {
    url: '/contacto',
    title: 'Contacto y ubicación — Psicóloga en Caracas',
    description: `Consulta presencial en ${LOCATION.neighborhood}, Caracas, y terapia online para toda Venezuela.`,
    images: ['/images/og-image.jpg'],
  },
}

export default function ContactoPage() {
  const contactPage = clean({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacto y ubicación',
    url: `${GOOGLE_BUSINESS.mapUrl ? '' : ''}/contacto`,
    mainEntity: { '@id': SCHEMA_ID.business },
  })

  const channels = [
    CONTACT.whatsapp && {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: CONTACT.phone,
      href: whatsappUrl('Hola, vengo de la página web y quisiera agendar una cita'),
      note: 'La vía más rápida. Respuesta en horario de consulta.',
      external: true,
    },
    CONTACT.phone && {
      icon: Phone,
      label: 'Teléfono',
      value: CONTACT.phone,
      href: telUrl(),
      note: 'Llamadas en horario de atención.',
      external: false,
    },
    CONTACT.email && {
      icon: MessageCircle,
      label: 'Email',
      value: CONTACT.email,
      href: mailUrl(),
      note: 'Para consultas administrativas.',
      external: false,
    },
    SOCIAL.instagram && {
      icon: Instagram,
      label: 'Instagram',
      value: '@psicomariany',
      href: SOCIAL.instagram,
      note: 'Contenido sobre salud mental.',
      external: true,
    },
  ].filter(Boolean) as {
    icon: typeof Phone
    label: string
    value: string
    href: string
    note: string
    external: boolean
  }[]

  return (
    <div className="min-h-screen bg-background">
      <Header solid />
      <JsonLd data={contactPage} />

      <main>
        <section className="relative pt-32 pb-14 lg:pt-36 lg:pb-16 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: 'Inicio', url: '/' },
                { name: 'Contacto', url: '/contacto' },
              ]}
            />
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground leading-tight mt-8 mb-6 text-balance">
              Contacto y ubicación
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Consulta presencial en {LOCATION.neighborhood}, municipio {LOCATION.municipality},
              Caracas, y terapia online para toda Venezuela y para venezolanos en el exterior.
            </p>
          </div>
        </section>

        {/* ──────────────────────────── CANALES ─────────────────────────── */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8 text-balance">
              Cómo agendar
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </p>
                    <p className="font-semibold text-foreground mt-0.5 group-hover:text-primary transition-colors">
                      {c.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{c.note}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────── UBICACIÓN Y HORARIO ─────────────────────── */}
        <section className="py-16 lg:py-20 bg-secondary/50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-5 flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                Consulta presencial
              </h2>
              <address className="not-italic text-muted-foreground leading-relaxed space-y-1">
                {LOCATION.streetAddress && <p>{LOCATION.streetAddress}</p>}
                <p className="font-medium text-foreground">{LOCATION.neighborhood}</p>
                <p>Municipio {LOCATION.municipality}</p>
                <p>
                  {LOCATION.city}, {LOCATION.region}
                </p>
                <p>{LOCATION.countryName}</p>
              </address>

              <p className="text-sm text-muted-foreground leading-relaxed mt-5">
                Zona de fácil acceso desde {LOCATION.nearbyAreas.slice(1, 6).join(', ')} y Ciudad
                Universitaria.
              </p>

              <a
                href={GOOGLE_BUSINESS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-background transition-colors"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Ver en Google Maps
              </a>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-5 flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                Horario de atención
              </h2>
              <dl className="space-y-2.5 text-muted-foreground">
                {OPENING_HOURS.map((h) => (
                  <div key={h.label} className="flex justify-between gap-4 border-b border-border pb-2.5">
                    <dt className="font-medium text-foreground">{h.label}</dt>
                    <dd>{h.display}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 pb-2.5">
                  <dt className="font-medium text-foreground">Sábados y domingos</dt>
                  <dd>Cerrado</dd>
                </div>
              </dl>

              <div className="mt-8">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3 flex items-center gap-2.5">
                  <Monitor className="w-5 h-5 text-primary" aria-hidden="true" />
                  Terapia online
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sesiones por videollamada de 60 minutos, con el mismo precio que la modalidad
                  presencial. Disponible en toda Venezuela y para pacientes en el exterior, con los
                  horarios coordinados según la diferencia horaria.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────── AVISO ─────────────────────────────── */}
        <section className="py-14">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-7">
              <h2 className="font-semibold text-foreground mb-2">Si necesitas ayuda urgente</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Esta consulta no es un servicio de emergencias y solo responde en horario de
                atención. Si estás atravesando una crisis, si hay riesgo para tu vida o para la de
                otra persona, acude al servicio de urgencias más cercano o comunícate con alguien de
                confianza que pueda acompañarte en ese momento.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
