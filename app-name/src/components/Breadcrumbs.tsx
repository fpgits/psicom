import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import JsonLd from './JsonLd'
import { breadcrumbGraph } from '@/lib/schema'

/**
 * Migas de pan visibles + BreadcrumbList schema desde la misma fuente.
 *
 * Antes el breadcrumb existía solo en JSON-LD. Google pide que el marcado
 * refleje contenido realmente presente en la página; además, las migas visibles
 * son enlaces internos que reparten autoridad hacia las páginas superiores.
 */
export default function Breadcrumbs({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  if (items.length < 2) return null
  const last = items[items.length - 1]

  return (
    <>
      <JsonLd data={breadcrumbGraph(items)} />
      <nav aria-label="Ruta de navegación" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          {items.slice(0, -1).map((item) => (
            <li key={item.url} className="flex items-center gap-1.5">
              <Link href={item.url} className="hover:text-foreground transition-colors">
                {item.name}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            </li>
          ))}
          <li className="text-foreground font-medium" aria-current="page">
            {last.name}
          </li>
        </ol>
      </nav>
    </>
  )
}
