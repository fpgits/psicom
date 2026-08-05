/**
 * Inyecta un bloque JSON-LD.
 *
 * Es un Server Component a propósito: los rastreadores de Google y los
 * buscadores de IA leen el HTML servido, y varios de ellos no ejecutan
 * JavaScript. Si esto llevara 'use client' el marcado seguiría llegando al
 * HTML inicial, pero cualquier dato calculado en cliente se perdería.
 */
export default function JsonLd({ data }: { data: unknown }) {
  if (!data) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
