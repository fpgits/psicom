import { PERSON, SITE_URL, SCHEMA_ID } from './site'
import { clean } from '@/lib/schema'

/**
 * Video de presentación de la profesional.
 *
 * Archivo: 720×1280, H.264, 30 fps, audio normalizado, ≈5 MB (original 47 MB).
 * Si se reemplaza el archivo, cámbiale el nombre: /videos se sirve con caché de
 * una semana y un nombre nuevo evita que alguien vea la versión vieja.
 *
 * Subtítulos: si se añade un archivo .vtt en /public/videos, pon su ruta en
 * `captions` y se cargará automáticamente.
 */
export const PRESENTATION_VIDEO = {
  src: '/videos/presentacion-mariany.mp4',
  poster: '/images/presentacion-poster.jpg',
  captions: '/videos/presentacion-mariany.es.vtt' as string,
  /** Transcripción completa. Generada con Whisper y corregida a mano en el
   *  tramo 5-15 s (audio rápido). ⚠️ Que Mariany la confirme; si cambia algo,
   *  actualizar también el .vtt. */
  transcript:
    'Bienvenidos a mi página web. Mi nombre es Mariany Rodríguez, soy psicóloga federada en Venezuela. ' +
    'Tengo siete años de experiencia laboral. Me especializo en el área de ansiedad, depresión y trastornos ' +
    'del estado de ánimo, así como también he cursado estudios en el área de TDAH y autismo. Atiendo bajo la ' +
    'modalidad presencial y online. Si deseas agendar consulta conmigo, puedes ir al botón de «Precios y ' +
    'planes» y ahí puedes encontrar toda la información.',
  name: `Presentación de ${PERSON.name}, psicóloga clínica en Caracas`,
  description:
    `${PERSON.name}, psicóloga clínica colegiada (F.P.V. ${PERSON.fpvNumber}), se presenta y explica cómo ` +
    `trabaja en consulta presencial en Caracas y online.`,
  uploadDate: '2026-11-02',
  duration: 'PT26S',
  durationLabel: '26 segundos',
}

/** VideoObject: permite que Google muestre el video en resultados y en la
 *  pestaña de videos, y lo vincula a la persona del grafo global. */
export function videoSchema() {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: PRESENTATION_VIDEO.name,
    description: PRESENTATION_VIDEO.description,
    thumbnailUrl: `${SITE_URL}${PRESENTATION_VIDEO.poster}`,
    contentUrl: `${SITE_URL}${PRESENTATION_VIDEO.src}`,
    uploadDate: PRESENTATION_VIDEO.uploadDate,
    duration: PRESENTATION_VIDEO.duration,
    inLanguage: 'es',
    transcript: PRESENTATION_VIDEO.transcript,
    author: { '@id': SCHEMA_ID.person },
    publisher: { '@id': SCHEMA_ID.business },
  })
}
