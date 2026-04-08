// Schema Markup como Server Component - NO usar 'use client'
// Los bots de Google NO ejecutan JavaScript, por eso el schema debe renderizarse en servidor

export function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://tubienestarmental.com',
    name: 'Mariany Rodríguez - Psicóloga Clínica',
    description: 'Psicóloga clínica en Caracas especializada en terapia individual, terapia de pareja, TDAH, autismo, ansiedad y depresión.',
    image: 'https://tubienestarmental.com/images/og-image.jpg',
    url: 'https://tubienestarmental.com',
    telephone: '+58-XXX-XXXX', // Reemplazar con número real
    email: 'contacto@tubienestarmental.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Caracas',
      addressLocality: 'Caracas',
      addressRegion: 'Distrito Capital',
      addressCountry: 'VE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.4806,
      longitude: -66.9036,
    },
    priceRange: '$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/tu-bienestar-mental',
      'https://www.facebook.com/tu-bienestar-mental',
    ],
    serviceArea: {
      '@type': 'City',
      name: 'Caracas',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 10.4806,
        longitude: -66.9036,
      },
      geoRadius: '50000',
    },
    knowsAbout: [
      'Psicología Clínica',
      'Terapia Cognitivo-Conductual',
      'TDAH',
      'Autismo',
      'Ansiedad',
      'Depresión',
      'Terapia de Pareja',
      'Terapia Individual',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Psicología',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sesión Individual de Psicología',
            description: 'Sesión de terapia individual de 60 minutos',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Terapia de Pareja',
            description: 'Sesiones especializadas para parejas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Terapia Online',
            description: 'Sesiones de terapia a través de videollamada',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Dónde puedo encontrar una psicóloga en Caracas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mariany Rodríguez es una psicóloga clínica especializada ubicada en Caracas, Venezuela. Ofrece terapia online y presencial para diversos problemas de salud mental incluyendo ansiedad, depresión, TDAH y autismo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué problemas trata una psicóloga clínica en Caracas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Una psicóloga clínica en Caracas como Mariany Rodríguez trata TDAH, autismo, ansiedad, depresión, terapia de pareja, problemas emocionales, trastornos del estado de ánimo y asesoría a padres.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Hay terapia online disponible con psicólogos en Caracas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, Mariany Rodríguez ofrece sesiones de terapia online desde Caracas adaptadas a tu horario, así como también atención presencial. La terapia online es ideal para personas que no pueden asistir a sesiones presenciales.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto cuesta una sesión con una psicóloga en Caracas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Las sesiones individuales de psicología en Caracas tienen un precio especial de $30 USD. También hay paquetes de 3 sesiones por $75 y planes mensuales por $90 con hasta 4 sesiones incluidas.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProfessionalServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Psicóloga en Caracas - Mariany Rodríguez',
    description: 'Servicios de psicología clínica especializada en Caracas, Venezuela. Terapia individual, terapia de pareja, tratamiento de TDAH, autismo, ansiedad y depresión.',
    url: 'https://tubienestarmental.com',
    logo: 'https://tubienestarmental.com/images/logo.png',
    image: 'https://tubienestarmental.com/images/og-image.jpg',
    priceRange: '$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Caracas',
      addressRegion: 'Distrito Capital',
      addressCountry: 'Venezuela',
    },
    hasMap: 'https://maps.google.com/?q=Caracas,Venezuela',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
