import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck, GraduationCap, Users, Target, ArrowRight } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import AppointmentButton from '@/components/AppointmentButton'
import FaqSection from '@/components/FaqSection'

import { SERVICES } from '@/config/services'
import { PERSON, LOCATION, HOURS_SUMMARY } from '@/config/site'
import type { FaqItem } from '@/lib/schema'

/**
 * Página de la profesional.
 *
 * En una categoría YMYL como salud mental, Google evalúa quién firma el
 * contenido antes que el contenido mismo. Una página dedicada a la persona, con
 * colegiatura verificable y enfoque declarado, es la pieza de E-E-A-T que le
 * faltaba al sitio: la biografía vivía en un bloque de la home y no existía
 * ninguna entidad `Person` a la que enlazar.
 *
 * El schema `Person` se emite globalmente desde el layout (siteGraph) con @id
 * estable, y esta página es su `url` canónica.
 */

export const metadata: Metadata = {
  title: `${PERSON.name} | Psicóloga Clínica en Caracas — F.P.V. ${PERSON.fpvNumber}`,
  description: `Conoce a ${PERSON.name}, psicóloga clínica colegiada en Caracas (F.P.V. ${PERSON.fpvNumber}), con más de ${PERSON.yearsOfExperience} años de experiencia en terapia cognitivo-conductual para niños, adolescentes y adultos.`,
  keywords: [
    'Mariany Rodríguez psicóloga',
    'psicóloga colegiada Caracas',
    'psicóloga cognitivo conductual Caracas',
    'mejor psicóloga en Caracas',
  ],
  alternates: { canonical: '/sobre-mi' },
  openGraph: {
    type: 'profile',
    url: '/sobre-mi',
    title: `${PERSON.name} — Psicóloga clínica en Caracas`,
    description: `Psicóloga clínica colegiada (F.P.V. ${PERSON.fpvNumber}) con más de ${PERSON.yearsOfExperience} años de experiencia.`,
    images: ['/images/og-image.jpg'],
  },
}

const ABOUT_FAQS: FaqItem[] = [
  {
    question: '¿Cómo verifico que una psicóloga está colegiada en Venezuela?',
    answer:
      'Todo psicólogo en ejercicio legal en Venezuela debe estar inscrito en la Federación de Psicólogos de Venezuela ' +
      `y en el colegio regional correspondiente, y tiene asignado un número de F.P.V. El de ${PERSON.name} es ` +
      `${PERSON.fpvNumber}. Es información que puedes y debes pedir a cualquier profesional antes de iniciar un ` +
      'proceso terapéutico.',
  },
  {
    question: '¿Qué es el enfoque cognitivo-conductual y por qué ese y no otro?',
    answer:
      'La terapia cognitivo-conductual trabaja sobre la relación entre pensamiento, emoción y conducta, con objetivos ' +
      'definidos y ejercicios concretos entre sesiones. Es el enfoque con mayor volumen de evidencia empírica para ' +
      'ansiedad y depresión, y tiene una ventaja práctica: es estructurado y de duración acotada, así que en todo ' +
      'momento sabes en qué punto del proceso estás.',
  },
  {
    question: '¿Atiende a niños, adolescentes y adultos?',
    answer:
      'Sí, a los tres grupos. En el trabajo con niños y adolescentes el proceso incorpora siempre orientación a los ' +
      'padres y, cuando corresponde, coordinación con el colegio, porque buena parte del cambio ocurre en el entorno ' +
      'cotidiano y no solo en la sesión semanal.',
  },
  {
    question: '¿Dónde atiende y en qué horario?',
    answer:
      `La consulta presencial está en ${LOCATION.neighborhood}, municipio ${LOCATION.municipality}, Caracas. También ` +
      `hay atención online para toda Venezuela y para venezolanos en el exterior. El horario es ${HOURS_SUMMARY}.`,
  },
]

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header solid />

      <main>
        <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: 'Inicio', url: '/' },
                { name: 'Sobre mí', url: '/sobre-mi' },
              ]}
            />

            <div className="grid lg:grid-cols-5 gap-12 items-center mt-10">
              <div className="lg:col-span-3 space-y-6">
                <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground leading-tight text-balance">
                  {PERSON.name}, psicóloga clínica en Caracas
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  Colegiada en la Federación de Psicólogos de Venezuela bajo el número{' '}
                  <strong className="text-foreground font-semibold">
                    F.P.V. {PERSON.fpvNumber}
                  </strong>
                  , con más de {PERSON.yearsOfExperience} años acompañando a niños, adolescentes y
                  adultos desde la terapia cognitivo-conductual.
                </p>
                <div className="pt-2">
                  <AppointmentButton>Agendar una consulta</AppointmentButton>
                </div>
              </div>

              <div className="lg:col-span-2">
                <Image
                  src="/images/foto2.jpg"
                  alt={`Retrato de ${PERSON.name}, psicóloga clínica colegiada en Caracas`}
                  width={520}
                  height={520}
                  className="rounded-3xl shadow-xl w-full object-cover aspect-square"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── CREDENCIALES ───────────────────────── */}
        <section className="py-14 border-b border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="sr-only">Credenciales profesionales</h2>
            <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex gap-4">
                <BadgeCheck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-foreground">Colegiatura</dt>
                  <dd className="text-sm text-muted-foreground mt-1">
                    F.P.V. {PERSON.fpvNumber} — Federación de Psicólogos de Venezuela
                  </dd>
                </div>
              </div>

              {PERSON.university && (
                <div className="flex gap-4">
                  <GraduationCap
                    className="w-6 h-6 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-foreground">Formación</dt>
                    <dd className="text-sm text-muted-foreground mt-1">
                      Licenciada en Psicología, {PERSON.university}
                      {PERSON.graduationYear && ` (${PERSON.graduationYear})`}
                    </dd>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Target className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-foreground">Enfoque</dt>
                  <dd className="text-sm text-muted-foreground mt-1">
                    Terapia cognitivo-conductual
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-foreground">Población</dt>
                  <dd className="text-sm text-muted-foreground mt-1">
                    Niños, adolescentes y adultos
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </section>

        {/* ─────────────────────────── BIOGRAFÍA ────────────────────────── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-12">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-5 text-balance">
                Cómo entiendo la terapia
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Mucha gente llega a consulta después de años intentando resolverlo sola, con la
                  sensación de que pedir ayuda es admitir que algo falló. Mi punto de partida es el
                  contrario: consultar a tiempo es lo que evita que un malestar manejable se vuelva
                  un problema que ocupa toda la vida.
                </p>
                <p>
                  Trabajo desde la terapia cognitivo-conductual porque me parece la forma más
                  honesta de plantear un proceso: definimos desde el inicio qué queremos cambiar,
                  cómo vamos a saber que está cambiando y en cuánto tiempo esperamos ver
                  movimiento. No es un espacio para conversar indefinidamente; es un trabajo con
                  dirección.
                </p>
                <p>
                  Eso no significa que sea un proceso frío o mecánico. La estructura es lo que
                  sostiene el trabajo, pero lo que lo hace posible es el vínculo: la confianza de
                  poder decir en voz alta lo que no has dicho en ningún otro sitio.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-5 text-balance">
                En qué me especializo
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Mi práctica se concentra en cinco áreas, además del acompañamiento a familias y de la
                orientación a padres:
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-5 py-3.5 transition-colors hover:bg-secondary"
                    >
                      <span className="font-medium text-foreground text-sm">{s.navLabel}</span>
                      <ArrowRight
                        className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-5 text-balance">
                Atender en Venezuela
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hacer terapia en el país tiene particularidades que no aparecen en los manuales.
                  Buena parte de las consultas están atravesadas por familias partidas entre varios
                  husos horarios, por duelos migratorios que nadie nombra como duelo y por una
                  incertidumbre sostenida que ha dejado de percibirse como excepcional.
                </p>
                <p>
                  Trabajar desde acá, conociendo ese contexto de primera mano, ahorra mucho tiempo
                  de explicación. Y es también la razón por la que atiendo a tantos venezolanos
                  fuera del país: poder hablar en el propio idioma, con alguien que entiende de
                  dónde vienes, cambia el punto de partida del proceso.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FaqSection items={ABOUT_FAQS} title="Preguntas sobre mi práctica profesional" />

        <section className="py-20 lg:py-24 bg-primary">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-6 text-balance">
              ¿Conversamos?
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-9">
              Escríbeme y me cuentas qué te trae. Horario de consulta: {HOURS_SUMMARY}.
            </p>
            <AppointmentButton variant="accent">Agendar mi primera cita</AppointmentButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
