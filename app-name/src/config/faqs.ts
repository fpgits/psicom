import type { FaqItem } from '@/lib/schema'
import { PLANS, PERSON, LOCATION, HOURS_SUMMARY, CONTACT } from './site'

/**
 * Preguntas frecuentes de la home.
 *
 * Criterios de redacción — no son adorno, determinan si te citan:
 *
 *  · Cada respuesta se sostiene sola. Un motor de respuesta extrae el párrafo
 *    completo, sin el contexto de alrededor.
 *  · Primero el dato, después el matiz. La primera frase contesta la pregunta.
 *  · Cifras y lugares concretos (precios, horarios, urbanización) en lugar de
 *    lenguaje promocional. Los hechos verificables son lo que una IA cita.
 *  · Los precios salen de PLANS, nunca escritos a mano, para que no puedan
 *    desincronizarse con la página de tarifas.
 */

const individual = PLANS.find((p) => p.id === 'sesion-individual')!
const paquete = PLANS.find((p) => p.id === 'paquete-3-sesiones')!
const mensual = PLANS.find((p) => p.id === 'plan-mensual')!

const zona = LOCATION.neighborhood
  ? `${LOCATION.neighborhood}, municipio ${LOCATION.municipality}`
  : `municipio ${LOCATION.municipality}`

export const HOME_FAQS: FaqItem[] = [
  {
    question: '¿Dónde puedo encontrar un psicólogo en Caracas?',
    answer:
      `${PERSON.name} es psicóloga clínica colegiada (F.P.V. ${PERSON.fpvNumber}) y atiende en ${zona}, Caracas, ` +
      `además de ofrecer terapia online a toda Venezuela y a venezolanos en el exterior. La consulta presencial ` +
      `queda cerca de Ciudad Universitaria, Bello Monte y Las Acacias, con acceso desde el Metro. ` +
      `El horario de atención es ${HOURS_SUMMARY}.`,
  },
  {
    question: '¿Cuánto cuesta una consulta psicológica en Caracas?',
    answer:
      `Una sesión individual de 60 minutos cuesta $${individual.price} (precio regular $${individual.originalPrice}). ` +
      `También hay un paquete de ${paquete.sessions} sesiones por $${paquete.price} y un plan mensual de hasta ` +
      `${mensual.sessions} sesiones por $${mensual.price}. Los tres planes incluyen tanto la modalidad presencial en ` +
      `Caracas como la online, y seguimiento entre sesiones por WhatsApp.`,
  },
  {
    question: '¿Cuál es la diferencia entre un psicólogo y un psiquiatra?',
    answer:
      'El psiquiatra es un médico especializado en salud mental y puede recetar medicación. El psicólogo clínico ' +
      'evalúa, diagnostica y trata a través de psicoterapia, sin recetar fármacos. No son alternativas excluyentes: ' +
      'en cuadros moderados o graves lo habitual es que ambos trabajen en paralelo, y cuando un caso lo requiere ' +
      'se coordina la derivación a psiquiatría.',
  },
  {
    question: '¿Cómo sé si necesito ir al psicólogo?',
    answer:
      'Conviene consultar cuando el malestar se sostiene en el tiempo y empieza a interferir con el sueño, el ' +
      'apetito, el rendimiento en el trabajo o los estudios, o con tus relaciones. También cuando algo que antes ' +
      'manejabas ahora te desborda, cuando repites patrones que reconoces pero no logras cambiar, o tras una pérdida ' +
      'o cambio vital importante. No hace falta estar en crisis para pedir ayuda. Si en algún momento aparecen ideas ' +
      'de hacerte daño, la consulta deja de ser algo que se pospone: busca atención de inmediato.',
  },
  {
    question: '¿La terapia online funciona igual que la presencial?',
    answer:
      'Para la mayoría de los motivos de consulta habituales —ansiedad, depresión, estrés, dificultades de pareja, ' +
      'autoestima— la investigación disponible muestra resultados comparables entre la terapia por videollamada y la ' +
      'presencial. La modalidad online además elimina el traslado, algo relevante en Caracas, y facilita mantener la ' +
      'continuidad. Hay situaciones que sí se benefician del encuentro presencial, y eso se evalúa en la primera sesión.',
  },
  {
    question: '¿Cuántas sesiones voy a necesitar?',
    answer:
      'Depende del motivo de consulta. Un objetivo acotado, como manejar la ansiedad ante una situación concreta, ' +
      'suele trabajarse en entre 8 y 12 sesiones. Procesos que involucran patrones más antiguos o varios frentes a la ' +
      'vez requieren más tiempo. En la terapia cognitivo-conductual los objetivos se definen desde el inicio y se ' +
      'revisan periódicamente, así que en todo momento sabes en qué punto del proceso estás.',
  },
  {
    question: '¿Qué pasa en la primera sesión?',
    answer:
      'La primera sesión es de evaluación. Se dedica a entender qué te trae a consulta, desde cuándo ocurre, qué has ' +
      'intentado hasta ahora y cómo está afectando tu día a día. Al cierre se plantea una hipótesis inicial de trabajo ' +
      'y una propuesta de plan: cada cuánto conviene vernos y qué objetivos concretos perseguimos. No hay que preparar ' +
      'nada previo ni traer un relato ordenado.',
  },
  {
    question: '¿Cuánto dura cada sesión?',
    answer:
      'Cada sesión dura 60 minutos, tanto presencial como online. Entre sesiones hay acompañamiento por WhatsApp para ' +
      'dudas puntuales y para el seguimiento de los ejercicios acordados.',
  },
  {
    question: '¿Qué es la terapia cognitivo-conductual?',
    answer:
      'Es un enfoque psicoterapéutico que parte de la relación entre lo que pensamos, lo que sentimos y lo que hacemos. ' +
      'El trabajo consiste en identificar los patrones de pensamiento y las conductas que sostienen el malestar, y ' +
      'sustituirlos por otros más funcionales mediante ejercicios concretos dentro y fuera de sesión. Es uno de los ' +
      'enfoques con más respaldo empírico para ansiedad, depresión y trastornos relacionados, y se caracteriza por ser ' +
      'estructurado, orientado a objetivos y de duración acotada.',
  },
  {
    question: '¿Atienden niños y adolescentes?',
    answer:
      `Sí. ${PERSON.name} atiende niños, adolescentes y adultos. En el trabajo con menores el proceso incluye siempre ` +
      'orientación a los padres o cuidadores, porque buena parte del cambio ocurre en la dinámica familiar y en el ' +
      'entorno escolar, no solo en la sesión.',
  },
  {
    question: '¿Lo que hablo en la consulta es confidencial?',
    answer:
      'Sí. El contenido de las sesiones está protegido por el secreto profesional que establece el Código de Ética ' +
      'Profesional del Psicólogo de Venezuela. Ese deber tiene excepciones acotadas y previstas en la propia norma, ' +
      'principalmente situaciones de riesgo grave para la vida o la integridad de la persona o de terceros. En el caso ' +
      'de menores de edad, se acuerda desde el inicio qué se comparte con los padres para que el adolescente pueda ' +
      'hablar con libertad.',
  },
  {
    question: '¿Atienden pacientes fuera de Venezuela?',
    answer:
      'Sí. La modalidad online permite atender a venezolanos en el exterior y a pacientes de otros países ' +
      'hispanohablantes. Las sesiones se coordinan según la diferencia horaria y el pago se gestiona en dólares.',
  },
  {
    question: '¿Cómo agendo una primera cita?',
    answer:
      (CONTACT.whatsapp
        ? `Escribiendo por WhatsApp al ${CONTACT.phone}. `
        : 'A través del botón de contacto del sitio. ') +
      `Se responde en horario de consulta, ${HOURS_SUMMARY}. En ese primer contacto se acuerda día, hora y modalidad ` +
      '(presencial en Caracas u online), sin ningún compromiso previo.',
  },
]
