import JsonLd from './JsonLd'
import { faqGraph, type FaqItem } from '@/lib/schema'

/**
 * Preguntas frecuentes: texto visible + marcado FAQPage desde la MISMA fuente.
 *
 * Antes el FAQ existía solo en JSON-LD y ningún usuario lo veía. Eso desperdicia
 * el activo: los motores de respuesta (ChatGPT, Perplexity, AI Overviews) se
 * apoyan sobre todo en el texto renderizado, y los fragmentos destacados de
 * Google salen del HTML, no del marcado.
 *
 * Al derivar ambos del mismo array es imposible que vuelvan a divergir, que es
 * exactamente lo que había pasado con los precios ($75 en el schema vs $80 en
 * la página).
 *
 * Las respuestas están redactadas para ser autosuficientes: cada una se entiende
 * sin leer el resto de la página, que es la condición para que una IA la cite.
 */
export default function FaqSection({
  items,
  title = 'Preguntas frecuentes',
  subtitle,
  id = 'preguntas-frecuentes',
  includeSchema = true,
}: {
  items: FaqItem[]
  title?: string
  subtitle?: string
  id?: string
  includeSchema?: boolean
}) {
  if (!items.length) return null

  return (
    <section id={id} className="py-20 lg:py-28 bg-background scroll-mt-24">
      {includeSchema && <JsonLd data={faqGraph(items)} />}

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Dudas frecuentes
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3 text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg leading-relaxed mt-6">{subtitle}</p>
          )}
        </div>

        <div className="divide-y divide-border border-t border-b border-border">
          {items.map((item) => (
            <article key={item.question} className="py-7">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3 text-pretty">
                {item.question}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-pretty">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
