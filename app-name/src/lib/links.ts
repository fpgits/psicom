import { CONTACT } from '@/config/site'

/**
 * Constructor de enlaces de WhatsApp.
 *
 * Se centraliza aquí porque el número estaba escrito a mano dentro de
 * LoadingModal.tsx y en ningún otro sitio: si cambiaba, había que acordarse de
 * ese archivo. Ahora sale de la configuración, igual que el resto del NAP.
 */
export function whatsappUrl(message?: string) {
  if (!CONTACT.whatsapp) return ''
  const text = message ?? 'Hola, vengo de la página web y quisiera más información'
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
}

export const telUrl = () => (CONTACT.phoneE164 ? `tel:${CONTACT.phoneE164}` : '')
export const mailUrl = () => (CONTACT.email ? `mailto:${CONTACT.email}` : '')
