'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Play, RotateCcw } from 'lucide-react'
import AppointmentButton from '@/components/AppointmentButton'

/**
 * Video de presentación de la psicóloga (formato vertical, hablado a cámara).
 *
 * Buenas prácticas aplicadas:
 *
 *  · Fachada: al cargar la página solo se descarga la portada (next/image la
 *    sirve en AVIF/WebP, decenas de KB). El MP4 (≈5 MB) no se pide hasta que la
 *    persona pulsa reproducir, así que no penaliza el LCP ni el peso inicial.
 *  · Sin autoplay: es un video hablado; reproducirlo mudo perdería el mensaje y
 *    con sonido sería intrusivo. La portada muestra su cara y la duración, que
 *    es lo que invita a darle play.
 *  · CTA al terminar: quien ve el video completo está en el punto de mayor
 *    intención; justo ahí aparece el botón de agendar.
 *  · Subtítulos opcionales: si existe `captions` (archivo .vtt), se cargan como
 *    pista de subtítulos. Mejoran accesibilidad y permiten verlo sin sonido.
 */
export default function VideoPresentacion({
  src,
  poster,
  title,
  alt,
  durationLabel,
  captions,
  priority = false,
}: {
  src: string
  poster: string
  title: string
  alt: string
  durationLabel: string
  captions?: string
  priority?: boolean
}) {
  const [state, setState] = useState<'idle' | 'playing' | 'ended'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)

  const replay = () => {
    setState('playing')
    const v = videoRef.current
    if (v) {
      v.currentTime = 0
      void v.play()
    }
  }

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-secondary shadow-2xl">
      {state === 'idle' ? (
        <button
          type="button"
          onClick={() => setState('playing')}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Reproducir video: ${title} (${durationLabel})`}
        >
          <Image
            src={poster}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 80vw, 420px"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 h-8 w-8 fill-primary text-primary" aria-hidden="true" />
          </span>
          <span className="absolute bottom-6 left-0 right-0 px-4 text-center text-white drop-shadow">
            <span className="block font-serif text-xl font-semibold">Conóceme</span>
            <span className="block text-sm opacity-90">Video de {durationLabel}</span>
          </span>
        </button>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            title={title}
            controls
            autoPlay
            playsInline
            preload="auto"
            onEnded={() => setState('ended')}
            onPlay={() => setState('playing')}
            className="absolute inset-0 h-full w-full object-cover"
          >
            {captions && (
              <track kind="captions" src={captions} srcLang="es" label="Español" default />
            )}
          </video>

          {state === 'ended' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/60 px-6 text-center backdrop-blur-[2px]">
              <p className="font-serif text-2xl font-semibold text-white text-balance">
                ¿Damos el primer paso?
              </p>
              <AppointmentButton variant="accent">Agendar mi primera cita</AppointmentButton>
              <button
                type="button"
                onClick={replay}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Ver de nuevo
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
