import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, Info, Clock } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import FaqSection from '@/components/FaqSection'
import JsonLd from '@/components/JsonLd'
import AppointmentButton from '@/components/AppointmentButton'

import { GUIDES, getGuide } from '@/config/guides'
import { getService, MEDICAL_DISCLAIMER } from '@/config/services'
import { articleGraph } from '@/lib/schema'
import { PERSON, HOURS_SUMMARY } from '@/config/site'

/**
 * Página de guía. Generada estáticamente desde src/config/guides.ts.
 *
 * La "respuesta corta" va arriba y visible: es el fragmento que Google usa para
 * los destacados y el que los motores de IA citan. El resto de la página
 * desarrolla la respuesta y enlaza a la especialidad correspondiente, que es la
 * página que convierte.
 */

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuide(params.slug)
  if (!guide) return {}

  const url = `/guias/${guide.slug}`
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    authors: [{ name: PERSON.name, url: '/sobre-mi' }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: guide.metaTitle,
      description: guide.metaDescription,
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      authors: [PERSON.name],
      images: ['/images/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  }
}

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-VE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug)
  if (!guide) notFound()

  const url = `/guias/${guide.slug}`
  const services = guide.relatedServices
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
  const otherGuides = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header solid />

      <JsonLd
        data={articleGraph({
          headline: guide.title,
          description: guide.metaDescription,
          url,
          datePublished: guide.publishedAt,
          dateModified: guide.updatedAt,
        })}
      />

      <main>
        {/* ─────────────────────────── CABECERA ─────────────────────────── */}
        <section className="relative pt-32 pb-12 lg:pt-36 lg:pb-14 bg-secondary/30">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: 'Inicio', url: '/' },
                { name: 'Guías', url: '/guias' },
                { name: guide.title, url },
              ]}
            />

            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground leading-tight mt-8 mb-6 text-balance">
              {guide.title}
            </h1>

            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>
                Por{' '}
                <Link href="/sobre-mi" className="text-primary hover:underline">
                  {PERSON.name}
                </Link>
                , psicóloga clínica · F.P.V. {PERSON.fpvNumber}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {guide.readingMinutes} min de lectura
              </span>
            </p>
          </div>
        </section>

        <article className="py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            {/* ─────────────────────── RESPUESTA CORTA ─────────────────────── */}
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                Respuesta corta
              </p>
              <p className="text-lg text-foreground leading-relaxed text-pretty">{guide.answer}</p>
            </div>

            {/* ─────────────────────────── CONTENIDO ───────────────────────── */}
            <div className="space-y-12 mt-14">
              {guide.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-5 text-balance">
                    {section.heading}
                  </h2>

                  {section.paragraphs?.map((p) => (
                    <p key={p.slice(0, 40)} className="text-muted-foreground leading-relaxed mb-4 text-pretty">
                      {p}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="mt-4 space-y-3.5">
                      {section.bullets.map((b) => (
                        <li key={b.slice(0, 40)} className="flex gap-3.5">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-muted-foreground leading-relaxed text-pretty">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.note && (
                    <aside className="mt-6 flex gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-5">
                      <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{section.note}</p>
                    </aside>
                  )}
                </section>
              ))}
            </div>

            {/* ─────────────── ENLACE A LA ESPECIALIDAD (convierte) ─────────── */}
            {services.length > 0 && (
              <div className="mt-14 rounded-2xl bg-secondary/60 p-7">
                <p className="font-serif text-xl font-semibold text-foreground mb-4">
                  ¿Quieres trabajarlo en consulta?
                </p>
                <ul className="space-y-2.5">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/servicios/${s.slug}`}
                        className="group inline-flex items-center gap-2 font-medium text-primary hover:underline"
                      >
                        {s.h1}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ─────────────────────────── AUTORÍA ─────────────────────────── */}
            <div className="mt-10 rounded-2xl border border-border bg-card p-7">
              <p className="text-sm text-muted-foreground leading-relaxed">{MEDICAL_DISCLAIMER}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                Publicado el <time dateTime={guide.publishedAt}>{formatDate(guide.publishedAt)}</time>
                {guide.updatedAt !== guide.publishedAt && (
                  <>
                    {' '}· Actualizado el{' '}
                    <time dateTime={guide.updatedAt}>{formatDate(guide.updatedAt)}</time>
                  </>
                )}
              </p>
            </div>
          </div>
        </article>

        <FaqSection items={guide.faqs} title="Otras preguntas frecuentes" id="preguntas-frecuentes" />

        {/* ─────────────────────────── MÁS GUÍAS ────────────────────────── */}
        <section className="py-16 lg:py-20 bg-secondary/50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8 text-balance">
              Más guías
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {otherGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guias/${g.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2 text-balance">{g.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{g.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-primary">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-6 text-balance">
              ¿Prefieres conversarlo?
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-9">
              Escríbeme y agendamos una primera sesión, presencial en Caracas u online. Horario de atención:{' '}
              {HOURS_SUMMARY}.
            </p>
            <AppointmentButton variant="accent">Agendar mi cita</AppointmentButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
