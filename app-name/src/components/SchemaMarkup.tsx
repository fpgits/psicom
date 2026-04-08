'use client';

import { useEffect } from 'react';

export function SchemaMarkup() {
  useEffect(() => {
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
      sameAs: [
        'https://www.instagram.com/tu-bienestar-mental',
        'https://www.facebook.com/tu-bienestar-mental',
      ],
      serviceArea: {
        '@type': 'City',
        name: 'Caracas',
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
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '47',
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}

export function FaqSchema() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Dónde puedo encontrar una psicóloga en Caracas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mariany Rodríguez es una psicóloga clínica especializada ubicada en Caracas, Venezuela. Ofrezco terapia online y presencial para diversos problemas de salud mental.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué problemas trata una psicóloga clínica?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Como psicóloga clínica, trato TDAH, autismo, ansiedad, depresión, terapia de pareja, problemas emocionales y otros trastornos del estado de ánimo.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Ofrezco terapia online en Caracas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, ofrezco sesiones de terapia online adaptadas a tu horario, así como también atención presencial en Caracas.',
          },
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
