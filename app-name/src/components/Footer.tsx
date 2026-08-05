import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Instagram, Star } from 'lucide-react'

import { SERVICES } from '@/config/services'
import {
  SITE,
  PERSON,
  CONTACT,
  LOCATION,
  SOCIAL,
  OPENING_HOURS,
  GOOGLE_BUSINESS,
} from '@/config/site'
import { whatsappUrl, telUrl, mailUrl } from '@/lib/links'

/**
 * Pie de página con el NAP completo.
 *
 * El anterior tenía logo, nombre y copyright: nada más. El footer es uno de los
 * lugares donde Google espera encontrar nombre, dirección y teléfono, y al
 * repetirse en todas las páginas refuerza la señal local en todo el sitio.
 *
 * El NAP de aquí debe coincidir EXACTAMENTE con el de tu ficha de Google
 * Business Profile y con el de cualquier directorio donde te registres. Una
 * diferencia de formato ya diluye la señal.
 */
export default function Footer() {
  const year = new Date().getFullYear()
  const zona = [LOCATION.neighborhood, LOCATION.municipality && `Municipio ${LOCATION.municipality}`]
    .filter(Boolean)
    .join(', ')

  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Identidad + NAP */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo.png"
                alt={`${SITE.name} — ${PERSON.name}, psicóloga clínica en Caracas`}
                width={40}
                height={40}
              />
              <span className="font-serif text-xl font-semibold text-background">{SITE.name}</span>
            </div>

            <p className="text-sm leading-relaxed mb-5">
              {PERSON.name}, {PERSON.jobTitle.toLowerCase()} colegiada
              {PERSON.fpvNumber && ` (F.P.V. ${PERSON.fpvNumber})`}. Atención presencial en Caracas y
              terapia online para toda Venezuela.
            </p>

            <address className="not-italic space-y-3 text-sm">
              {zona && (
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-background/50" aria-hidden="true" />
                  <span>
                    {LOCATION.streetAddress && (
                      <>
                        {LOCATION.streetAddress}
                        <br />
                      </>
                    )}
                    {zona}
                    <br />
                    {LOCATION.city}, {LOCATION.region}, {LOCATION.countryName}
                  </span>
                </p>
              )}

              {CONTACT.phone && (
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 flex-shrink-0 text-background/50" aria-hidden="true" />
                  <a href={telUrl()} className="hover:text-background transition-colors">
                    {CONTACT.phone}
                  </a>
                </p>
              )}

              {CONTACT.email && (
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 flex-shrink-0 text-background/50" aria-hidden="true" />
                  <a href={mailUrl()} className="hover:text-background transition-colors">
                    {CONTACT.email}
                  </a>
                </p>
              )}

              <p className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-background/50" aria-hidden="true" />
                <span>
                  {OPENING_HOURS.map((h) => (
                    <span key={h.label} className="block">
                      {h.label}: {h.display}
                    </span>
                  ))}
                </span>
              </p>
            </address>
          </div>

          {/* Especialidades — enlazado interno hacia las landings */}
          <nav aria-labelledby="footer-especialidades">
            <h2
              id="footer-especialidades"
              className="font-semibold text-background mb-4 text-sm uppercase tracking-wider"
            >
              Especialidades
            </h2>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="hover:text-background transition-colors"
                  >
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Navegación */}
          <nav aria-labelledby="footer-consulta">
            <h2
              id="footer-consulta"
              className="font-semibold text-background mb-4 text-sm uppercase tracking-wider"
            >
              La consulta
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/sobre-mi" className="hover:text-background transition-colors">
                  Sobre Mariany
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-background transition-colors">
                  Precios y planes
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-background transition-colors">
                  Contacto y ubicación
                </Link>
              </li>
              <li>
                <Link
                  href="/#preguntas-frecuentes"
                  className="hover:text-background transition-colors"
                >
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <a
                  href={GOOGLE_BUSINESS.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background transition-colors"
                >
                  Ver en Google Maps
                </a>
              </li>
            </ul>
          </nav>

          {/* Contacto directo */}
          <div>
            <h2 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">
              Agenda tu cita
            </h2>

            {CONTACT.whatsapp && (
              <a
                href={whatsappUrl('Hola, vengo de la página web y quisiera agendar una cita')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Escribir por WhatsApp
              </a>
            )}

            <a
              href={GOOGLE_BUSINESS.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 w-full rounded-full border border-background/25 px-6 py-3 text-sm font-medium hover:bg-background/10 transition-colors"
            >
              <Star className="w-4 h-4" aria-hidden="true" />
              Dejar una reseña
            </a>

            {(SOCIAL.instagram || SOCIAL.tiktok) && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-wider text-background/50 mb-3">Sígueme</p>
                <div className="flex items-center gap-3">
                  {SOCIAL.instagram && (
                    <a
                      href={SOCIAL.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram de Mariany Rodríguez"
                      className="rounded-full border border-background/25 p-2.5 hover:bg-background/10 transition-colors"
                    >
                      <Instagram className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                  {SOCIAL.tiktok && (
                    <a
                      href={SOCIAL.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok de Mariany Rodríguez"
                      className="rounded-full border border-background/25 p-2.5 hover:bg-background/10 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Zonas atendidas: señal local secundaria, sin caer en listados de spam */}
        {LOCATION.nearbyAreas.length > 0 && (
          <p className="mt-12 pt-8 border-t border-background/15 text-xs leading-relaxed text-background/55">
            <span className="font-medium text-background/70">Zonas de atención presencial:</span>{' '}
            consulta ubicada en {LOCATION.neighborhood}, con acceso desde{' '}
            {LOCATION.nearbyAreas.slice(1).join(', ')}. Terapia online disponible en todo el
            territorio venezolano y para venezolanos residentes en el exterior.
          </p>
        )}

        <div className="mt-8 pt-8 border-t border-background/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-background/55">
          <p>
            © {year} {SITE.name}. {PERSON.name}
            {PERSON.fpvNumber && `, F.P.V. ${PERSON.fpvNumber}`}. Todos los derechos reservados.
          </p>
          <p>
            La información de este sitio es divulgativa y no sustituye una consulta profesional.
          </p>
        </div>
      </div>
    </footer>
  )
}
