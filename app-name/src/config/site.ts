/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  FUENTE ÚNICA DE VERDAD DEL SITIO
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Todo dato de negocio (teléfono, redes, credenciales, precios…) vive aquí y
 *  solo aquí. Ningún componente debe escribir estos valores a mano.
 *
 *  ⚠️  REGLA IMPORTANTE — no publiques placeholders
 *
 *  Si un dato todavía no lo tienes, DÉJALO COMO CADENA VACÍA ('').
 *  El generador de datos estructurados (src/lib/schema.ts) elimina
 *  automáticamente cualquier campo vacío antes de renderizar, así que el
 *  marcado nunca publicará un "+58-XXX-XXXX" ni un perfil social inexistente.
 *
 *  NUNCA escribas valores de relleno tipo 'XXX', 'pendiente' o 'actualizar':
 *  Google los interpreta como datos reales y son motivo de acción manual.
 */

export const SITE_URL = 'https://www.tubienestarmental.com'

/** IDs estables del grafo de schema.org. No cambiarlos una vez publicados. */
export const SCHEMA_ID = {
  website: `${SITE_URL}/#website`,
  business: `${SITE_URL}/#consulta`,
  person: `${SITE_URL}/#mariany`,
} as const

export const SITE = {
  url: SITE_URL,
  name: 'Tu Bienestar Mental',
  tagline: 'Psicología clínica en Caracas',
  locale: 'es_VE',
  lang: 'es-VE',

  /** Verificación de Google Search Console.
   *  Search Console → Configuración → Verificación de propiedad → Etiqueta HTML.
   *  Pega SOLO el valor del atributo content, no la etiqueta entera. */
  googleSiteVerification: '', // ← TODO

  /** Analítica. Formato 'G-XXXXXXXXXX'. Vacío = no se inyecta script. */
  googleAnalyticsId: '', // ← TODO
} as const

/**
 * La profesional. Alimenta el schema `Person`, que es la señal E-E-A-T más
 * importante en una categoría YMYL como salud mental.
 */
export const PERSON = {
  name: 'Mariany Rodríguez',
  givenName: 'Mariany',
  familyName: 'Rodríguez',
  jobTitle: 'Psicóloga Clínica',
  yearsOfExperience: 5,

  /** Número de colegiatura en la Federación de Psicólogos de Venezuela.
   *  Es la credencial que más pesa en una categoría YMYL. */
  fpvNumber: '16.275',

  /** Universidad donde obtuvo el título de Licenciada en Psicología. */
  university: '', // ← TODO  pendiente
  graduationYear: '', // ← TODO  pendiente, formato '2019'

  /** Formación adicional verificable: postgrados, diplomados, certificaciones.
   *  Deja el array vacío si no hay ninguna que quieras publicar. */
  additionalCredentials: [] as { name: string; issuer: string; year?: string }[],

  languages: ['es'],

  /** Áreas de conocimiento declaradas. Se usan en `knowsAbout`. */
  knowsAbout: [
    'Psicología clínica',
    'Terapia cognitivo-conductual',
    'Trastorno por déficit de atención e hiperactividad (TDAH)',
    'Trastorno del espectro autista',
    'Trastornos de ansiedad',
    'Depresión',
    'Terapia de pareja',
    'Psicología infantil y adolescente',
    'Orientación a padres',
  ],
} as const

/**
 * Contacto. El NAP (nombre-dirección-teléfono) debe ser IDÉNTICO aquí, en tu
 * ficha de Google Business Profile y en cualquier directorio donde te des de
 * alta. Una sola diferencia de formato ya diluye la señal local.
 */
export const CONTACT = {
  /** Formato internacional legible. */
  phone: '+58 424 515 7059',
  /** E.164 sin signos, para enlaces tel: y wa.me */
  phoneE164: '+584245157059',
  /** Solo dígitos, con código de país. */
  whatsapp: '584245157059',
  email: '', // ← TODO  ¿contacto@tubienestarmental.com está activo?
} as const

export const LOCATION = {
  /** Calle o avenida + edificio + piso. Vacío si atiende solo online:
   *  publicar 'Caracas' como streetAddress es un valor inválido. */
  streetAddress: '', // ← TODO  dirección exacta de la consulta
  /** Urbanización o parroquia. */
  neighborhood: 'Los Chaguaramos',
  /** Municipio al que pertenece Los Chaguaramos. */
  municipality: 'Libertador',
  city: 'Caracas',
  region: 'Distrito Capital',
  /** Código ISO 3166-1 alfa-2. NO el nombre del país. */
  countryCode: 'VE',
  countryName: 'Venezuela',
  postalCode: '',

  /** Coordenadas tomadas de la ficha verificada de Google Business Profile
   *  (place_id ChIJ0WGllZBZKowRsHZJZMOXEwU). Coinciden con el punto que Google
   *  ya asocia a la consulta, que es justo lo que conviene: si el marcado y la
   *  ficha señalan el mismo lugar, la señal de proximidad no se contradice. */
  latitude: 10.4811925,
  longitude: -66.8870092,

  /** Radio de servicio en metros para `areaServed`. */
  serviceRadiusMeters: 30000,

  /** Municipios del Área Metropolitana que se declaran como zona atendida. */
  servedMunicipalities: [
    'Libertador',
    'Chacao',
    'Baruta',
    'Sucre',
    'El Hatillo',
  ],

  /** Zonas cercanas a la consulta, para las señales de proximidad local. */
  nearbyAreas: [
    'Los Chaguaramos',
    'Bello Monte',
    'Las Acacias',
    'Santa Mónica',
    'Colinas de Bello Monte',
    'Ciudad Universitaria',
    'Los Rosales',
    'El Valle',
    'Chacaíto',
    'Sabana Grande',
  ],
} as const

/**
 * Google Business Profile. El place_id ya lo tenías en el enlace de reseñas
 * del sitio, así que estos tres enlaces son reales y funcionan hoy.
 *
 * Para "psicólogo caracas" el bloque de mapas ocupa la primera pantalla de
 * resultados, y ese bloque se gana en la ficha, no en el código.
 */
export const GOOGLE_BUSINESS = {
  placeId: 'ChIJ0WGllZBZKowRsHZJZMOXEwU',
  get mapUrl() {
    return `https://www.google.com/maps/place/?q=place_id:${this.placeId}`
  },
  get reviewUrl() {
    return `https://search.google.com/local/writereview?placeid=${this.placeId}`
  },
} as const

/** Perfiles sociales. Solo URLs que existan y estén activas: `sameAs` con
 *  enlaces rotos es peor que no tener `sameAs`. */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/psicomariany/',
  tiktok: 'https://www.tiktok.com/@psicomariany',
  facebook: '',
  linkedin: '',
} as const

/**
 * Horario de atención. Formato 24h.
 * `days` usa los valores de schema.org (Monday…Sunday).
 */
export const OPENING_HOURS = [
  {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    label: 'Lunes a viernes',
    opens: '09:30',
    closes: '17:00',
    display: '9:30 a. m. – 5:00 p. m.',
  },
] as const

/** Resumen del horario en una frase, para textos y para el FAQ. */
export const HOURS_SUMMARY = 'lunes a viernes, de 9:30 a. m. a 5:00 p. m.'

/**
 * Planes. Estos valores alimentan a la vez la página de precios, el schema
 * `Offer` y las respuestas del FAQ, de modo que no puedan volver a
 * desincronizarse como pasaba antes ($75/$90 en el schema vs $80/$100 en la
 * página).
 */
export const CURRENCY = 'USD'

export const PLANS = [
  {
    id: 'sesion-individual',
    title: 'Sesión Individual',
    price: 30,
    originalPrice: 40,
    sessions: 1,
    highlight: 'Precio especial',
    popular: false,
    description: 'Una sesión de psicología clínica de 60 minutos, online o presencial en Caracas.',
    features: [
      'Una sesión de 60 minutos',
      'Modalidad online o presencial',
      'Ideal para consultas puntuales',
      'Sin compromiso a largo plazo',
      'Seguimiento posterior a la sesión',
    ],
  },
  {
    id: 'paquete-3-sesiones',
    title: 'Paquete 3 Sesiones',
    price: 80,
    originalPrice: 90,
    sessions: 3,
    highlight: '',
    popular: true,
    description: 'Tres sesiones de 60 minutos con seguimiento semanal, para trabajar un objetivo concreto.',
    features: [
      '3 sesiones de 60 minutos',
      'Perfecto para trabajar un objetivo concreto',
      'Mantiene el ritmo terapéutico',
      'Seguimiento semanal por WhatsApp',
      'Recursos y ejercicios entre sesiones',
    ],
  },
  {
    id: 'plan-mensual',
    title: 'Plan Mensual',
    price: 100,
    originalPrice: 120,
    sessions: 4,
    highlight: 'Mejor valor',
    popular: false,
    description: 'Hasta cuatro sesiones al mes con prioridad de agenda, para procesos terapéuticos continuos.',
    features: [
      'Hasta 4 sesiones al mes',
      'Máxima flexibilidad de horarios',
      'Ideal para terapia continua',
      'Acompañamiento entre sesiones',
      'Prioridad en la agenda',
    ],
  },
] as const

/** Ahorro real de cada plan, calculado — no escrito a mano. */
export function planSavings(plan: (typeof PLANS)[number]) {
  return plan.originalPrice - plan.price
}

/**
 * Testimonios en texto plano.
 *
 * Los reales viven hoy en un widget de Elfsight que carga con `ssr: false`:
 * su contenido es un iframe de terceros, así que ni Google ni los buscadores
 * de IA lo leen nunca. Copiar aquí 4-6 reseñas reales de tu ficha de Google
 * (nombre de pila + inicial basta) las convierte en contenido indexable tuyo.
 *
 * ⚠️  Solo reseñas auténticas que ya existan en tu perfil de Google. Inventar
 * testimonios es publicidad engañosa y motivo de penalización.
 *
 * Mientras el array esté vacío, la sección no se renderiza y el widget en vivo
 * sigue funcionando como está.
 */
export const TESTIMONIALS = [] as {
  author: string
  text: string
  /** Formato 'AAAA-MM-DD' */
  date: string
  rating: 1 | 2 | 3 | 4 | 5
}[]
