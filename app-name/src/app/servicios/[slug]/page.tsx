import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, Info, MapPin, Clock } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import FaqSection from '@/components/FaqSection'
import JsonLd from '@/components/JsonLd'
import AppointmentButton from '@/components/AppointmentButton'

import { SERVICES, getService, MEDICAL_DISCLAIMER } from '@/config/services'
import { serviceGraph, articleGraph } from '@/lib/schema'
import { PERSON, LOCATION, HOURS_SUMMARY } from '@/config/site'

/**
 * Páginas de especialidad, generadas estáticamente desde src/config/services.ts.
 *
 * Antes el sitio tenía dos páginas indexables y una lista de keywords en la
 * metadata. Para posicionar por "terapia para la ansiedad en Caracas" hace
 * falta una página sobre ese tema, no una palabra en un array que Google ignora
 * desde 2009.
 */

/** Fecha de última revisión editorial del contenido clínico.
 *  Actualízala cuando revises los textos: las páginas de salud con fecha de
 *  revisión visible y marcada transmiten mantenimiento activo, algo que pesa en
 *  categorías YMYL y que los motores de respuesta usan para priorizar fuentes. */
const REVIEWED_AT = '2026-08-04'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug)
  if (!service) return {}

  const url = `/servicios/${service.slug}`
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: service.metaTitle,
      description: service.metaDescription,
      images: ['/images/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
    },
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)
  if (!service) notFound()

  const url = `/servicios/${service.slug}`
  const related = service.related
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <div className="min-h-screen bg-background">
      <Header solid />

      <JsonLd
        data={serviceGraph({
          name: service.h1,
          alternateName: service.alternateName,
          description: service.metaDescription,
          url,
          serviceType: service.serviceType,
        })}
      />
      <JsonLd
        data={articleGraph({
          headline: service.h1,
          description: service.metaDescription,
          url,
          datePublished: REVIEWED_AT,
          dateModified: REVIEWED_AT,
        })}
      />

      <main>
        {/* ─────────────────────────── CABECERA ─────────────────────────── */}
        <section className="relative pt-32 pb-14 lg:pt-36 lg:pb-16 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: 'Inicio', url: '/' },
                { name: 'Especialidades', url: '/servicios' },
                { name: service.navLabel, url },
              ]}
            />

            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground leading-tight mt-8 mb-6 text-balance">
              {service.h1}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {service.lead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                {LOCATION.neighborhood}, Caracas · y online
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
                Sesiones de 60 minutos
              </span>
            </div>

            <div className="mt-9">
              <AppointmentButton>Agendar una consulta</AppointmentButton>
            </div>
          </div>
        </section>

        {/* ─────────────────────────── CONTENIDO ────────────────────────── */}
        <article className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="space-y-14">
              {service.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-6 text-balance">
                    {section.heading}
                  </h2>

                  {section.paragraphs?.map((p) => (
                    <p key={p.slice(0, 40)} className="text-muted-foreground leading-relaxed mb-4 text-pretty">
                      {p}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="mt-5 space-y-3.5">
                      {section.bullets.map((b) => (
                        <li key={b.slice(0, 40)} className="flex gap-3.5">
                          <Check
                            className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span className="text-muted-foreground leading-relaxed text-pretty">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.note && (
                    <aside className="mt-6 flex gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-5">
                      <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                        {section.note}
                      </p>
                    </aside>
                  )}
                </section>
              ))}
            </div>

            {/* Bloque de autoría: quién firma el contenido y cuándo se revisó.
                Es la señal E-E-A-T que Google espera en contenido de salud. */}
            <div className="mt-16 rounded-2xl border border-border bg-card p-7">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {MEDICAL_DISCLAIMER}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Última revisión:{' '}
                <time dateTime={REVIEWED_AT}>
                  {new Date(REVIEWED_AT).toLocaleDateString('es-VE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>{' '}
                · <Link href="/sobre-mi" className="text-primary hover:underline">Sobre {PERSON.givenName}</Link>
              </p>
            </div>
          </div>
        </article>

        {/* ────────────────────────────── FAQ ───────────────────────────── */}
        <FaqSection
          items={service.faqs}
          title={`Preguntas frecuentes sobre ${service.navLabel.toLowerCase()}`}
          id="preguntas-frecuentes"
        />

        {/* ───────────────────────── RELACIONADOS ───────────────────────── */}
        {related.length > 0 && (
          <section className="py-16 lg:py-20 bg-secondary/50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8 text-balance">
                Otras áreas de consulta
              </h2>
              <div className="grid gap-5 md:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/servicios/${r.slug}`}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {r.navLabel}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {r.metaDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Ver
                      <ArrowRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ──────────────────────────── CTA ─────────────────────────────── */}
        <section className="py-20 lg:py-24 bg-primary">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-6 text-balance">
              ¿Quieres conversarlo en consulta?
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-9">
              Escríbeme y agendamos una primera sesión, presencial en Caracas u online. Horario de
              atención: {HOURS_SUMMARY}.
            </p>
            <AppointmentButton variant="accent">Agendar mi cita</AppointmentButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
