/**
 * Generación de datos estructurados (JSON-LD).
 *
 * Dos garantías de diseño:
 *
 *  1. `clean()` elimina recursivamente todo campo vacío antes de renderizar.
 *     Un dato pendiente en src/config/site.ts simplemente no aparece en el
 *     marcado, en lugar de publicarse como placeholder. Esto hace imposible
 *     repetir el bug del '+58-XXX-XXXX' publicado en producción.
 *
 *  2. Un único grafo con `@id` estables. Las entidades se referencian entre sí
 *     ({'@id': ...}) en vez de duplicarse, que era el problema anterior:
 *     LocalBusiness y ProfessionalService describían el mismo negocio dos
 *     veces con datos distintos.
 */

import {
  SITE,
  SITE_URL,
  SCHEMA_ID,
  PERSON,
  CONTACT,
  LOCATION,
  SOCIAL,
  OPENING_HOURS,
  GOOGLE_BUSINESS,
  PLANS,
  CURRENCY,
} from '@/config/site'

type Json = Record<string, unknown>

/** Elimina undefined, null, '' , [] y {} de forma recursiva.
 *  Conserva 0 y false, que son valores legítimos. */
export function clean<T>(value: T): T {
  if (Array.isArray(value)) {
    const arr = value.map(clean).filter((v) => v !== undefined)
    return (arr.length ? arr : undefined) as T
  }
  if (value !== null && typeof value === 'object') {
    const out: Json = {}
    for (const [k, v] of Object.entries(value as Json)) {
      const c = clean(v)
      if (c !== undefined) out[k] = c
    }
    return (Object.keys(out).length ? out : undefined) as T
  }
  if (value === '' || value === null || value === undefined) return undefined as T
  return value
}

const absolute = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`

/** Perfiles sociales verificables + ficha de Google. */
const sameAs = () =>
  [SOCIAL.instagram, SOCIAL.tiktok, SOCIAL.facebook, SOCIAL.linkedin, GOOGLE_BUSINESS.mapUrl].filter(
    Boolean,
  )

const postalAddress = () => ({
  '@type': 'PostalAddress',
  streetAddress: LOCATION.streetAddress,
  addressLocality: LOCATION.city,
  addressRegion: LOCATION.region,
  addressCountry: LOCATION.countryCode,
  postalCode: LOCATION.postalCode,
})

const credentials = () => {
  const list: Json[] = []
  if (PERSON.fpvNumber) {
    list.push({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Colegiatura profesional',
      name: `Federación de Psicólogos de Venezuela — F.P.V. Nº ${PERSON.fpvNumber}`,
      recognizedBy: {
        '@type': 'Organization',
        name: 'Federación de Psicólogos de Venezuela',
        alternateName: 'FPV',
      },
    })
  }
  for (const c of PERSON.additionalCredentials) {
    list.push({
      '@type': 'EducationalOccupationalCredential',
      name: c.name,
      credentialCategory: 'Formación de postgrado',
      recognizedBy: { '@type': 'Organization', name: c.issuer },
      ...(c.year ? { dateCreated: c.year } : {}),
    })
  }
  return list
}

/** La persona: la señal E-E-A-T decisiva en salud mental (YMYL). */
export function personNode() {
  return {
    '@type': 'Person',
    '@id': SCHEMA_ID.person,
    name: PERSON.name,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    jobTitle: PERSON.jobTitle,
    description: `${PERSON.jobTitle} colegiada en Venezuela, con más de ${PERSON.yearsOfExperience} años de experiencia en la atención de niños, adolescentes y adultos en Caracas y en modalidad online.`,
    url: absolute('/sobre-mi'),
    image: absolute('/images/foto1.jpg'),
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    knowsLanguage: PERSON.languages,
    knowsAbout: [...PERSON.knowsAbout],
    hasCredential: credentials(),
    alumniOf: PERSON.university
      ? { '@type': 'CollegeOrUniversity', name: PERSON.university }
      : undefined,
    worksFor: { '@id': SCHEMA_ID.business },
    areaServed: { '@type': 'City', name: LOCATION.city },
    sameAs: sameAs(),
  }
}

/** La consulta como negocio local. `Psychologist` es un subtipo específico de
 *  MedicalBusiness: comunica mucho mejor el rubro que un LocalBusiness genérico. */
export function businessNode() {
  return {
    '@type': 'Psychologist',
    '@id': SCHEMA_ID.business,
    name: `${PERSON.name} — ${PERSON.jobTitle}`,
    alternateName: SITE.name,
    description: `Consulta de psicología clínica en ${LOCATION.neighborhood || LOCATION.city}, Caracas. Terapia individual, de pareja e infantil, presencial y online, con enfoque cognitivo-conductual.`,
    url: SITE_URL,
    logo: absolute('/images/logo.png'),
    image: [absolute('/images/og-image.jpg'), absolute('/images/foto1.jpg')],
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    priceRange: '$$',
    currenciesAccepted: CURRENCY,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: LOCATION.latitude,
      longitude: LOCATION.longitude,
    },
    hasMap: GOOGLE_BUSINESS.mapUrl,
    founder: { '@id': SCHEMA_ID.person },
    employee: { '@id': SCHEMA_ID.person },
    medicalSpecialty: 'Psychiatric',
    availableLanguage: PERSON.languages,
    openingHoursSpecification: OPENING_HOURS.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: [
      { '@type': 'City', name: 'Caracas' },
      ...LOCATION.servedMunicipalities.map((m) => ({
        '@type': 'AdministrativeArea',
        name: `Municipio ${m}`,
      })),
    ],
    knowsAbout: [...PERSON.knowsAbout],
    sameAs: sameAs(),
    makesOffer: PLANS.map((p) => ({
      '@type': 'Offer',
      name: p.title,
      description: p.description,
      price: p.price,
      priceCurrency: CURRENCY,
      availability: 'https://schema.org/InStock',
      url: absolute('/servicios'),
      itemOffered: {
        '@type': 'Service',
        name: p.title,
        serviceType: 'Psicoterapia',
        provider: { '@id': SCHEMA_ID.business },
      },
    })),
    /**
     * Sin `aggregateRating`.
     *
     * Google no admite valoraciones autorreferenciales — un negocio marcando
     * reseñas sobre sí mismo en su propio sitio — y puede sancionarlo como
     * datos estructurados con spam. Las estrellas en los resultados las genera
     * Google desde tu ficha de Business Profile, que es donde sí cuentan.
     */
  }
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SCHEMA_ID.website,
    url: SITE_URL,
    name: SITE.name,
    inLanguage: SITE.lang,
    publisher: { '@id': SCHEMA_ID.business },
  }
}

/** Grafo global: se renderiza una sola vez, en el layout raíz. */
export function siteGraph() {
  return clean({
    '@context': 'https://schema.org',
    '@graph': [websiteNode(), businessNode(), personNode()],
  })
}

export type FaqItem = { question: string; answer: string }

export function faqGraph(items: FaqItem[]) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  })
}

export function breadcrumbGraph(items: { name: string; url: string }[]) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.url),
    })),
  })
}

export function serviceGraph(opts: {
  name: string
  description: string
  url: string
  serviceType: string
  alternateName?: string
}) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: opts.name,
    alternateName: opts.alternateName,
    description: opts.description,
    url: absolute(opts.url),
    provider: { '@id': SCHEMA_ID.business },
    areaServed: [
      { '@type': 'City', name: 'Caracas' },
      { '@type': 'Country', name: LOCATION.countryName },
    ],
    availableLanguage: PERSON.languages,
  })
}

export function articleGraph(opts: { headline: string; description: string; url: string; datePublished: string; dateModified: string }) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: opts.headline,
    description: opts.description,
    url: absolute(opts.url),
    inLanguage: SITE.lang,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { '@id': SCHEMA_ID.person },
    reviewedBy: { '@id': SCHEMA_ID.person },
    publisher: { '@id': SCHEMA_ID.business },
    isPartOf: { '@id': SCHEMA_ID.website },
  })
}
