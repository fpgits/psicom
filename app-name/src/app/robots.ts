import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/site'

/**
 * robots.txt generado por Next.js.
 *
 * ⚠️  Sustituye a public/robots.txt, que se eliminó a propósito: si existieran
 * los dos, el estático de public/ ganaría en silencio y este archivo no tendría
 * ningún efecto. Es una trampa clásica.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  QUÉ CAMBIÓ Y POR QUÉ
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * El archivo anterior bloqueaba GPTBot, ChatGPT-User y CCBot. Los tres tipos de
 * rastreador de IA no son lo mismo, y meterlos en el mismo saco costaba
 * visibilidad sin ganar nada a cambio:
 *
 *  · Entrenamiento (GPTBot, ClaudeBot, CCBot): alimentan el modelo. Bloquearlos
 *    no te quita presencia en las respuestas, pero tampoco te da ninguna.
 *  · Búsqueda y citación (OAI-SearchBot, PerplexityBot, Claude-SearchBot):
 *    indexan para que la IA te cite CON ENLACE. Bloquearlos es renunciar a
 *    aparecer en las respuestas.
 *  · A petición del usuario (ChatGPT-User, Claude-User, Perplexity-User): entran
 *    cuando alguien pregunta algo concreto. Bloquear ChatGPT-User significaba
 *    que, si alguien le pedía a ChatGPT una psicóloga en Caracas, este sitio
 *    quedaba fuera por diseño.
 *
 * También se retiró `Disallow: /*?*`, que bloqueaba cualquier URL con
 * parámetros. Para un sitio de estas dimensiones no aportaba nada y habría
 * excluido las URLs de campaña con ?utm_source= en cuanto se usaran.
 */

/** Rastreadores de IA con acceso explícito. */
const AI_CRAWLERS = [
  // OpenAI
  'GPTBot', // entrenamiento
  'OAI-SearchBot', // búsqueda en ChatGPT — cita con enlace
  'ChatGPT-User', // el usuario pregunta y ChatGPT visita la página
  // Anthropic
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google (Gemini y AI Overviews)
  'Google-Extended',
  // Microsoft / Copilot
  'Bingbot',
  // Common Crawl: alimenta a buena parte de los modelos abiertos
  'CCBot',
  // Apple, Meta
  'Applebot',
  'Applebot-Extended',
  'meta-externalagent',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
