import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/site'
import { SERVICES } from '@/config/services'

/**
 * Sitemap.
 *
 * Dos correcciones respecto a la versión anterior:
 *
 *  1. Las URLs usan www, que es el host que realmente responde. Antes listaba
 *     el ápex, que redirige: un sitemap lleno de redirecciones gasta
 *     presupuesto de rastreo y genera avisos en Search Console.
 *
 *  2. `lastModified` es una fecha fija en lugar de `new Date()`. Con la fecha
 *     dinámica, cada despliegue anunciaba que las 10 páginas se habían
 *     modificado, aunque no se hubiera tocado ninguna. Google aprende a
 *     desconfiar de un lastmod que siempre dice "hoy". Actualiza esta constante
 *     cuando cambies contenido de verdad.
 *
 * Se omiten `changeFrequency` y `priority`: Google confirmó hace años que los
 * ignora por completo.
 */

const LAST_UPDATED = new Date('2026-09-03')

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/servicios', '/sobre-mi', '/contacto']

  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: LAST_UPDATED,
    })),
    ...SERVICES.map((service) => ({
      url: `${SITE_URL}/servicios/${service.slug}`,
      lastModified: LAST_UPDATED,
    })),
  ]
}
