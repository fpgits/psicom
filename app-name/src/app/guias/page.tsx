import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import AppointmentButton from '@/components/AppointmentButton'

import { GUIDES } from '@/config/guides'
import { PERSON, SITE_URL } from '@/config/site'
import { clean } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Guías de Psicología | Respuestas de una Psicóloga Clínica en Caracas',
  description: `Guías claras sobre ansiedad, TDAH, terapia y cómo elegir psicólogo, escritas por ${PERSON.name}, psicóloga clínica colegiada en Caracas (F.P.V. ${PERSON.fpvNumber}).`,
  alternates: { canonical: '/guias' },
  openGraph: {
    url: '/guias',
    title: 'Guías de psicología — Tu Bienestar Mental',
    description: 'Respuestas claras a las dudas más frecuentes sobre salud mental y terapia.',
    images: ['/images/og-image.jpg'],
  },
}

export default function GuiasPage() {
  const list = clean({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Guías de psicología',
    itemListElement: GUIDES.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/guias/${g.slug}`,
      name: g.title,
    })),
  })

  return (
    <div className="min-h-screen bg-background">
      <Header solid />
      <JsonLd data={list} />

      <main>
        <section className="relative pt-32 pb-14 lg:pt-36 lg:pb-16 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: 'Inicio', url: '/' },
                { name: 'Guías', url: '/guias' },
              ]}
            />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mt-8 mb-6 text-balance">
              Guías de psicología
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Respuestas claras a las dudas que más se repiten antes de empezar terapia, escritas y
              revisadas por {PERSON.name}, psicóloga clínica colegiada (F.P.V. {PERSON.fpvNumber}).
            </p>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 grid gap-6 md:grid-cols-2">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/guias/${g.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="font-serif text-xl font-semibold text-foreground mb-3 text-balance">{g.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1">{g.excerpt}</p>
                <span className="mt-5 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {g.readingMinutes} min
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                    Leer
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-primary">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-6 text-balance">
              ¿Tu duda no está aquí?
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-9">
              Escríbeme y lo conversamos. Sin compromiso.
            </p>
            <AppointmentButton variant="accent">Escribir por WhatsApp</AppointmentButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
