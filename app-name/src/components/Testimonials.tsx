import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/config/site'

/**
 * Testimonios en texto plano.
 *
 * Por qué existe: las reseñas del sitio viven en un widget de Elfsight que se
 * carga por JavaScript dentro de un contenedor de terceros. Ese contenido nunca
 * cuenta como contenido propio para Google, y los rastreadores de IA no lo ven
 * en absoluto. Toda la prueba social del sitio era, a efectos de SEO, invisible.
 *
 * Deliberadamente SIN marcado `Review`. Google no admite reseñas
 * autorreferenciales —el negocio publicando valoraciones sobre sí mismo en su
 * propio dominio— y marcarlas puede acarrear una acción manual. Como texto
 * visible sí aportan: son contenido indexable y material citable para los
 * motores de respuesta. Las estrellas de los resultados de búsqueda las genera
 * Google desde la ficha de Business Profile.
 *
 * Rellena TESTIMONIALS en src/config/site.ts copiando reseñas REALES de tu
 * perfil de Google. Si el array está vacío, la sección no se renderiza.
 */
export default function Testimonials() {
  if (!TESTIMONIALS.length) return null

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
      {TESTIMONIALS.map((t) => (
        <figure
          key={`${t.author}-${t.date}`}
          className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm"
        >
          <Quote className="w-7 h-7 text-primary/25 mb-4" aria-hidden="true" />
          <blockquote className="flex-1 text-muted-foreground leading-relaxed text-pretty">
            {t.text}
          </blockquote>
          <figcaption className="mt-5 pt-5 border-t border-border">
            <div className="flex items-center gap-1 mb-1.5" aria-label={`${t.rating} de 5 estrellas`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" aria-hidden="true" />
              ))}
            </div>
            <p className="font-medium text-foreground text-sm">{t.author}</p>
            <p className="text-xs text-muted-foreground">
              Reseña publicada en Google ·{' '}
              <time dateTime={t.date}>
                {new Date(t.date).toLocaleDateString('es-VE', { year: 'numeric', month: 'long' })}
              </time>
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
