import type { FaqItem } from '@/lib/schema'
import type { ServiceSection } from './services'
import { PERSON, PLANS, LOCATION } from './site'

/**
 * Guías: artículos que responden preguntas concretas.
 *
 * Por qué existen: las páginas de especialidad responden "¿quién atiende esto y
 * dónde?". Pero la mayoría de búsquedas —y casi todas las preguntas que la gente
 * le hace a ChatGPT, Perplexity o a los AI Overviews de Google— son preguntas:
 * "¿cómo sé si tengo ansiedad?", "¿psicólogo o psiquiatra?". Cada guía es una
 * puerta de entrada nueva y un texto citable por los motores de respuesta.
 *
 * Estructura pensada para ser citada:
 *  · `answer`: respuesta corta y autosuficiente al inicio (2-3 frases). Es lo
 *    que una IA extrae cuando cita la página.
 *  · secciones con encabezados que son, en sí mismos, subpreguntas.
 *  · FAQ con marcado FAQPage.
 *  · autoría y fecha de revisión visibles (E-E-A-T en contenido de salud).
 *
 * ⚠️  Contenido clínico divulgativo firmado por la profesional: debe revisarlo
 *     ella antes de publicarse y cada vez que se modifique. Al revisar, actualiza
 *     `updatedAt`.
 */

export type Guide = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  /** Respuesta directa, 2-3 frases. */
  answer: string
  excerpt: string
  publishedAt: string
  updatedAt: string
  readingMinutes: number
  sections: ServiceSection[]
  faqs: FaqItem[]
  /** Slugs de /servicios/[slug] a los que la guía enlaza. */
  relatedServices: string[]
}

const [individual, paquete, mensual] = PLANS

export const GUIDES: Guide[] = [
  /* ───────────────────────────── PRECIOS ──────────────────────────────── */
  {
    slug: 'cuanto-cuesta-un-psicologo-en-venezuela',
    title: '¿Cuánto cuesta ir al psicólogo en Venezuela?',
    metaTitle: '¿Cuánto Cuesta un Psicólogo en Venezuela? Precios y Qué Influye',
    metaDescription:
      'Qué determina el precio de una consulta psicológica en Venezuela, cuánto cuesta una sesión en Caracas y cómo comparar opciones sin fijarte solo en la tarifa.',
    keywords: [
      'cuánto cuesta un psicólogo en Venezuela',
      'precio consulta psicológica Caracas',
      'cuánto cobra un psicólogo en Caracas',
      'precio terapia psicológica Venezuela',
    ],
    answer:
      `El precio de una consulta psicológica en Venezuela varía según la formación del profesional, la duración ` +
      `de la sesión, la modalidad y la zona, y suele cobrarse en dólares. En la consulta de ${PERSON.name} en Caracas, ` +
      `una sesión individual de 60 minutos cuesta $${individual.price}, con paquetes de ${paquete.sessions} sesiones ` +
      `por $${paquete.price} y un plan mensual de hasta ${mensual.sessions} sesiones por $${mensual.price}.`,
    excerpt:
      'Qué hace que una consulta cueste más o menos, cuánto cuesta una sesión en Caracas y cómo comparar sin fijarte solo en el precio.',
    publishedAt: '2026-11-01',
    updatedAt: '2026-11-01',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Qué influye en el precio de una consulta',
        bullets: [
          'Formación y experiencia del profesional: los años de práctica clínica y la formación de postgrado suelen reflejarse en la tarifa.',
          'Duración de la sesión: hay consultas de 45, 50 o 60 minutos. Al comparar precios, compara también el tiempo.',
          'Tipo de servicio: una evaluación psicológica con pruebas estandarizadas o un informe escrito no cuesta lo mismo que una sesión de terapia.',
          'Modalidad: algunas consultas cobran distinto la sesión online y la presencial; otras mantienen el mismo precio.',
          'Paquetes y planes: muchas consultas ofrecen un precio menor por sesión cuando se contratan varias.',
        ],
      },
      {
        heading: 'Cuánto cuesta en esta consulta',
        paragraphs: [
          `Las tarifas son las mismas para la modalidad presencial en ${LOCATION.neighborhood}, Caracas, y para la terapia online. Todas las sesiones duran 60 minutos e incluyen seguimiento entre sesiones por WhatsApp.`,
        ],
        bullets: [
          `Sesión individual: $${individual.price} (precio regular $${individual.originalPrice}).`,
          `Paquete de ${paquete.sessions} sesiones: $${paquete.price} (precio regular $${paquete.originalPrice}).`,
          `Plan mensual, hasta ${mensual.sessions} sesiones: $${mensual.price} (precio regular $${mensual.originalPrice}).`,
        ],
      },
      {
        heading: 'Cuántas sesiones hacen falta, y por qué importa para el presupuesto',
        paragraphs: [
          'El costo real de una terapia no es el precio de una sesión, sino el del proceso completo. Un objetivo acotado puede trabajarse en un número limitado de sesiones; un patrón que lleva años instalado necesita más tiempo.',
          'Por eso conviene preguntar en la primera consulta cuál es el plan de trabajo previsto y cada cuánto se revisan los objetivos. Un enfoque estructurado, como la terapia cognitivo-conductual, permite estimar la duración con más claridad desde el inicio.',
        ],
      },
      {
        heading: 'Cómo comparar sin fijarte solo en el precio',
        bullets: [
          'Verifica que el profesional esté colegiado en la Federación de Psicólogos de Venezuela y pide su número de F.P.V.',
          'Pregunta qué enfoque terapéutico utiliza y si tiene experiencia con tu motivo de consulta concreto.',
          'Confirma qué incluye el precio: duración, seguimiento entre sesiones, materiales.',
          'Desconfía de promesas de resultados garantizados en un número fijo de sesiones.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿La terapia online es más barata que la presencial?',
        answer:
          'Depende de la consulta. En esta, el precio es el mismo en ambas modalidades: la duración, el método y el seguimiento son idénticos, así que no hay diferencia de tarifa.',
      },
      {
        question: '¿En qué moneda se paga la consulta?',
        answer:
          'Las tarifas están expresadas en dólares estadounidenses. Los medios de pago disponibles se confirman en el primer contacto por WhatsApp.',
      },
      {
        question: '¿Conviene más pagar por sesión o un paquete?',
        answer:
          `Si es tu primera consulta, la sesión individual permite conocer cómo se trabaja antes de comprometerte. Si ya tienes un objetivo claro, el paquete de ${paquete.sessions} sesiones o el plan mensual reducen el precio por sesión y ayudan a mantener la constancia, que es una de las variables que más influye en el resultado.`,
      },
    ],
    relatedServices: ['terapia-online-venezuela', 'terapia-ansiedad-caracas'],
  },

  /* ──────────────────────── PSICÓLOGO O PSIQUIATRA ────────────────────── */
  {
    slug: 'psicologo-o-psiquiatra',
    title: '¿Psicólogo o psiquiatra? Diferencias y a cuál acudir',
    metaTitle: '¿Psicólogo o Psiquiatra? Diferencias y Cuándo Ir a Cada Uno',
    metaDescription:
      'Diferencias entre psicólogo y psiquiatra en Venezuela: formación, qué tratan, quién receta medicación y cómo decidir a cuál acudir primero.',
    keywords: [
      'diferencia entre psicólogo y psiquiatra',
      'psicólogo o psiquiatra a cuál ir',
      'el psicólogo puede recetar',
      'psiquiatra o psicólogo para ansiedad',
    ],
    answer:
      'El psiquiatra es un médico especializado en salud mental y puede recetar medicación; el psicólogo clínico evalúa y trata mediante psicoterapia, sin recetar fármacos. No son opciones excluyentes: en muchos cuadros moderados o graves trabajan en paralelo, y un psicólogo deriva a psiquiatría cuando el caso lo requiere.',
    excerpt:
      'Qué hace cada uno, quién puede recetar medicación y cómo decidir por dónde empezar.',
    publishedAt: '2026-11-01',
    updatedAt: '2026-11-01',
    readingMinutes: 4,
    sections: [
      {
        heading: 'Qué hace un psicólogo clínico',
        paragraphs: [
          'El psicólogo clínico es licenciado en Psicología con formación en evaluación y tratamiento de problemas emocionales y de conducta. Su herramienta es la psicoterapia: un proceso estructurado para entender qué mantiene el malestar y desarrollar recursos para modificarlo.',
          'En Venezuela debe estar colegiado en la Federación de Psicólogos de Venezuela. Puede realizar evaluaciones, emitir diagnósticos psicológicos y llevar el tratamiento, pero no prescribe medicación.',
        ],
      },
      {
        heading: 'Qué hace un psiquiatra',
        paragraphs: [
          'El psiquiatra es médico, con especialización en psiquiatría. Evalúa los trastornos mentales también desde el punto de vista médico, descarta causas orgánicas y es quien puede indicar y ajustar tratamiento farmacológico.',
        ],
      },
      {
        heading: 'Cuándo empezar por un psicólogo',
        bullets: [
          'Ansiedad, estrés o preocupación que interfiere en tu día a día pero te permite seguir funcionando.',
          'Tristeza o desánimo sostenido sin ideas de hacerte daño.',
          'Dificultades de pareja, de crianza o en la relación con otros.',
          'Duelos, cambios vitales, procesos migratorios.',
          'Dudas sobre TDAH o autismo que requieren evaluación psicológica.',
        ],
      },
      {
        heading: 'Cuándo conviene la valoración de un psiquiatra',
        bullets: [
          'Síntomas tan intensos que impiden dormir, comer o realizar actividades básicas.',
          'Episodios de euforia, desconexión de la realidad o percepciones extrañas.',
          'Consumo de sustancias difícil de controlar.',
          'Cuando la psicoterapia sola no está siendo suficiente y el psicólogo recomienda una evaluación para valorar medicación.',
        ],
        note:
          'Si aparecen ideas de hacerte daño o de quitarte la vida, no esperes a una cita: acude a un servicio de urgencias o pide ayuda inmediata a alguien de confianza.',
      },
      {
        heading: 'Trabajar con ambos a la vez',
        paragraphs: [
          'En la depresión moderada o grave y en varios trastornos de ansiedad, la combinación de psicoterapia y medicación suele dar mejores resultados que cualquiera de las dos por separado. En esos casos el psicólogo y el psiquiatra coordinan el tratamiento, cada uno desde su competencia.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Un psicólogo puede recetar medicamentos en Venezuela?',
        answer:
          'No. En Venezuela la prescripción de fármacos corresponde a médicos. El psicólogo clínico evalúa y trata con psicoterapia y, cuando el caso lo requiere, deriva a psiquiatría.',
      },
      {
        question: '¿Si voy al psicólogo me van a mandar medicación?',
        answer:
          'No necesariamente. Muchos cuadros leves y moderados se tratan solo con psicoterapia. Si en algún momento la medicación pudiera ayudar, el psicólogo lo plantea y recomienda una valoración psiquiátrica; la decisión final es tuya y del médico.',
      },
      {
        question: '¿Necesito una referencia médica para ir al psicólogo?',
        answer:
          'No. Puedes pedir una consulta directamente. En la primera sesión se evalúa tu caso y, si hace falta una valoración médica o psiquiátrica, se te indica.',
      },
    ],
    relatedServices: ['terapia-depresion-caracas', 'terapia-ansiedad-caracas'],
  },

  /* ───────────────────────────── ANSIEDAD ─────────────────────────────── */
  {
    slug: 'como-saber-si-tengo-ansiedad',
    title: '¿Cómo saber si tengo ansiedad? Señales y cuándo consultar',
    metaTitle: '¿Cómo Saber si Tengo Ansiedad? Señales y Cuándo Consultar',
    metaDescription:
      'Señales físicas, mentales y de conducta de la ansiedad, en qué se diferencia del estrés normal y cuándo conviene consultar con un psicólogo.',
    keywords: [
      'cómo saber si tengo ansiedad',
      'síntomas de ansiedad',
      'señales de ansiedad',
      'ansiedad o estrés diferencia',
    ],
    answer:
      'La ansiedad se convierte en un problema cuando aparece sin un peligro real, se mantiene durante semanas y empieza a condicionar lo que haces: lo que evitas, cómo duermes o cómo rindes. Suele manifestarse a la vez en el cuerpo, en el pensamiento y en la conducta. Si se sostiene en el tiempo e interfiere con tu vida, conviene una evaluación profesional.',
    excerpt:
      'Las señales en el cuerpo, la mente y la conducta, la diferencia con el estrés y cuándo pedir ayuda.',
    publishedAt: '2026-11-01',
    updatedAt: '2026-11-01',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Señales en el cuerpo',
        bullets: [
          'Palpitaciones, opresión en el pecho o sensación de falta de aire.',
          'Tensión muscular sostenida, sobre todo en cuello, mandíbula y espalda.',
          'Molestias digestivas, náuseas o cambios en el apetito.',
          'Dificultad para conciliar el sueño o despertares frecuentes.',
          'Mareo, sudoración, temblor o cansancio sin causa clara.',
        ],
        note:
          'Varios de estos síntomas también pueden deberse a causas médicas. Si es la primera vez que aparecen, sobre todo el dolor en el pecho o la falta de aire, consulta primero con un médico.',
      },
      {
        heading: 'Señales en el pensamiento',
        bullets: [
          'Anticipar constantemente que algo malo va a pasar.',
          'Darle vueltas a lo mismo sin llegar a una conclusión.',
          'Dificultad para concentrarte o sensación de mente en blanco.',
          'Necesidad de tenerlo todo bajo control o de estar seguro antes de actuar.',
        ],
      },
      {
        heading: 'Señales en la conducta',
        bullets: [
          'Evitar lugares, personas o situaciones por miedo a sentirte mal.',
          'Aplazar decisiones o tareas.',
          'Comprobar varias veces las cosas o buscar que otros te tranquilicen.',
          'Irritabilidad o reacciones desproporcionadas.',
        ],
      },
      {
        heading: '¿Ansiedad o estrés?',
        paragraphs: [
          'El estrés suele tener una causa identificable —una entrega, una mudanza, un problema económico— y baja cuando esa situación se resuelve. La ansiedad problemática tiende a mantenerse aunque la causa desaparezca, a extenderse a otros ámbitos o a aparecer sin un motivo claro.',
          'Ambos comparten síntomas, y un estrés prolongado puede derivar en un cuadro de ansiedad. Lo que marca la diferencia no es un síntoma aislado, sino la duración, la intensidad y cuánto interfiere en tu vida.',
        ],
      },
      {
        heading: 'Cuándo consultar',
        paragraphs: [
          'Conviene consultar cuando el malestar lleva semanas, cuando empiezas a organizar tu vida alrededor de evitarlo, o cuando el sueño, el trabajo, los estudios o tus relaciones se están viendo afectados. No hace falta llegar a una crisis de pánico para pedir ayuda.',
          'La terapia cognitivo-conductual es el enfoque con mayor respaldo empírico para los trastornos de ansiedad, y los resultados suelen notarse en las primeras semanas de trabajo.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Una crisis de pánico puede ser peligrosa?',
        answer:
          'Una crisis de pánico es muy intensa y desagradable, pero por sí misma no es peligrosa. Aun así, si es la primera vez que la tienes o hay dolor en el pecho, conviene descartar causas médicas. Una vez descartadas, la ansiedad y el pánico tienen un tratamiento psicológico eficaz.',
      },
      {
        question: '¿La ansiedad se quita sola?',
        answer:
          'A veces disminuye cuando pasa la situación que la provocó. Pero cuando se mantiene, la evitación tiende a reforzarla: cuanto más se evita lo que da miedo, más miedo da. Por eso la ansiedad sostenida suele necesitar un abordaje activo.',
      },
      {
        question: '¿Hay algún test para saber si tengo ansiedad?',
        answer:
          'Existen cuestionarios de cribado que ayudan a orientarse, pero no sustituyen una evaluación. El diagnóstico lo hace un profesional teniendo en cuenta la historia, la duración y el impacto de los síntomas.',
      },
    ],
    relatedServices: ['terapia-ansiedad-caracas', 'terapia-online-venezuela'],
  },

  /* ───────────────────────────── TDAH ADULTOS ─────────────────────────── */
  {
    slug: 'tdah-en-adultos',
    title: 'TDAH en adultos: señales y diagnóstico tardío',
    metaTitle: 'TDAH en Adultos: Señales, Diagnóstico Tardío y Tratamiento',
    metaDescription:
      'Cómo se manifiesta el TDAH en adultos, por qué muchas personas reciben el diagnóstico tarde y cómo es la evaluación y el tratamiento psicológico.',
    keywords: [
      'TDAH en adultos',
      'síntomas TDAH adultos',
      'diagnóstico TDAH adulto Caracas',
      'cómo saber si tengo TDAH',
    ],
    answer:
      'El TDAH no aparece en la adultez: es un trastorno del neurodesarrollo que está presente desde la infancia, pero muchas personas reciben el diagnóstico de adultas porque de niñas compensaron o se las etiquetó como distraídas. En adultos suele verse más como desorganización, procrastinación, olvidos e inquietud interna que como hiperactividad visible.',
    excerpt:
      'Cómo se ve el TDAH en la vida adulta, por qué se diagnostica tarde y en qué consiste la evaluación.',
    publishedAt: '2026-11-01',
    updatedAt: '2026-11-01',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Cómo se manifiesta en la vida adulta',
        bullets: [
          'Dificultad para empezar tareas aunque sean importantes, y tendencia a dejarlas para el último momento.',
          'Olvidos frecuentes de citas, pagos u objetos.',
          'Desorganización del tiempo: subestimar cuánto tarda algo.',
          'Dificultad para mantener la atención en lo que no resulta interesante, e hiperconcentración en lo que sí.',
          'Inquietud interna, impaciencia, interrumpir a otros.',
          'Cambios de humor rápidos y sensibilidad a la crítica.',
        ],
      },
      {
        heading: 'Por qué tantos adultos lo descubren tarde',
        paragraphs: [
          'Muchas personas, sobre todo mujeres, no tuvieron la hiperactividad visible que hace que un niño llame la atención en clase. Compensaron con esfuerzo, con inteligencia o con estructuras externas —los padres, el colegio— que dejaron de existir al llegar a la universidad, al trabajo o a la crianza.',
          'Es frecuente que el motivo de consulta inicial sea ansiedad, agotamiento o baja autoestima, y que el TDAH aparezca al revisar la historia completa.',
        ],
      },
      {
        heading: 'Cómo es la evaluación',
        bullets: [
          'Entrevista clínica detallada sobre la vida actual y la infancia.',
          'Cuestionarios estandarizados y, cuando es posible, información de personas cercanas.',
          'Descarte de otros cuadros que pueden parecerse, como ansiedad, depresión o problemas de sueño.',
          'Devolución de resultados y propuesta de plan.',
        ],
      },
      {
        heading: 'Qué ayuda',
        paragraphs: [
          'El tratamiento psicológico se centra en estrategias concretas para las funciones ejecutivas: planificación, gestión del tiempo, sistemas externos de recordatorio y regulación emocional. También en revisar la historia de autocrítica que suele acompañar a quien vivió años sin saber por qué le costaba lo que a otros parecía fácil.',
          'En algunos casos la medicación es parte del tratamiento; esa indicación corresponde a un psiquiatra, y se coordina cuando hace falta.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Se puede tener TDAH sin haber sido hiperactivo de niño?',
        answer:
          'Sí. Existe una presentación predominantemente inatenta, sin hiperactividad visible. Es la que con más frecuencia pasa desapercibida en la infancia y se diagnostica en la adultez.',
      },
      {
        question: '¿Todos nos distraemos, cómo sé si es TDAH?',
        answer:
          'La diferencia está en la intensidad, la persistencia desde la infancia y el impacto: cuando la distracción y la desorganización afectan de forma sostenida el trabajo, los estudios o las relaciones, a pesar del esfuerzo, conviene una evaluación.',
      },
      {
        question: '¿La evaluación de TDAH se puede hacer online?',
        answer:
          'Buena parte sí: la entrevista clínica y los cuestionarios pueden realizarse por videollamada. Algunas pruebas concretas pueden requerir sesión presencial; se define al inicio según el caso.',
      },
    ],
    relatedServices: ['terapia-tdah-caracas', 'terapia-ansiedad-caracas'],
  },

  /* ─────────────────────────── ELEGIR PSICÓLOGO ───────────────────────── */
  {
    slug: 'como-elegir-psicologo-en-caracas',
    title: 'Cómo elegir un buen psicólogo en Caracas',
    metaTitle: 'Cómo Elegir un Buen Psicólogo en Caracas: Qué Revisar',
    metaDescription:
      'Qué revisar antes de elegir psicólogo en Caracas o en Venezuela: colegiatura, enfoque, experiencia en tu motivo de consulta, modalidad y señales de alerta.',
    keywords: [
      'cómo elegir un psicólogo',
      'buen psicólogo en Caracas',
      'psicólogo colegiado Venezuela',
      'recomendación psicólogo Caracas',
    ],
    answer:
      'Para elegir psicólogo en Caracas, verifica primero que esté colegiado en la Federación de Psicólogos de Venezuela (tiene un número de F.P.V.), luego que tenga experiencia en tu motivo de consulta y que te explique con claridad su enfoque y su plan de trabajo. La comodidad con la persona también importa: el vínculo terapéutico es uno de los factores que más influye en el resultado.',
    excerpt:
      'Credenciales, enfoque, experiencia y señales de alerta: qué revisar antes de empezar.',
    publishedAt: '2026-11-01',
    updatedAt: '2026-11-01',
    readingMinutes: 4,
    sections: [
      {
        heading: '1. Que esté colegiado',
        paragraphs: [
          'En Venezuela, todo psicólogo en ejercicio debe estar inscrito en la Federación de Psicólogos de Venezuela y tener asignado un número de F.P.V. Es un dato que puedes y debes pedir. Un profesional serio lo comparte sin problema.',
        ],
      },
      {
        heading: '2. Que tenga experiencia en lo que te pasa',
        paragraphs: [
          'No es lo mismo tratar ansiedad que acompañar a una familia con un niño en el espectro autista o hacer terapia de pareja. Pregunta directamente si trabaja con tu motivo de consulta y desde hace cuánto.',
        ],
      },
      {
        heading: '3. Que te explique su enfoque',
        paragraphs: [
          'Hay distintos enfoques terapéuticos. Lo importante es que el profesional pueda explicarte cómo trabaja, qué se hace en las sesiones y cómo se van a medir los avances. La terapia cognitivo-conductual, por ejemplo, define objetivos desde el inicio y los revisa periódicamente.',
        ],
      },
      {
        heading: '4. Que la modalidad te resulte sostenible',
        paragraphs: [
          'La constancia influye mucho en el resultado. Elige una consulta cuyo horario, ubicación o modalidad puedas mantener. En Caracas, la terapia online evita traslados y facilita no interrumpir el proceso.',
        ],
      },
      {
        heading: 'Señales de alerta',
        bullets: [
          'No puede o no quiere darte su número de colegiatura.',
          'Promete resultados garantizados o "curas" en una cantidad fija de sesiones.',
          'Te desaconseja de forma tajante cualquier valoración médica o psiquiátrica cuando el caso podría requerirla.',
          'No respeta la confidencialidad o comenta casos de otros pacientes de forma identificable.',
          'Después de varias sesiones no tienes claro en qué estás trabajando.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Cómo verifico el número de F.P.V. de un psicólogo?',
        answer:
          'Pídeselo directamente. Puedes contrastarlo con el colegio de psicólogos de tu región o con la Federación de Psicólogos de Venezuela.',
      },
      {
        question: '¿Qué pasa si no me siento cómodo con el psicólogo?',
        answer:
          'Puedes decirlo y, si no mejora, cambiar de profesional. Sentirte escuchado y con confianza es parte de lo que hace que la terapia funcione; no es un capricho.',
      },
      {
        question: '¿Es mejor un psicólogo presencial u online?',
        answer:
          'Para la mayoría de los motivos de consulta los resultados son comparables. La mejor opción es la que puedas sostener en el tiempo. Algunas situaciones concretas sí se benefician de la atención presencial.',
      },
    ],
    relatedServices: ['terapia-online-venezuela', 'psicologia-infantil-adolescente-caracas'],
  },

  /* ─────────────────────────── PRIMERA SESIÓN ─────────────────────────── */
  {
    slug: 'que-pasa-en-la-primera-sesion-con-el-psicologo',
    title: '¿Qué pasa en la primera sesión con el psicólogo?',
    metaTitle: '¿Qué Pasa en la Primera Sesión con el Psicólogo? Guía Práctica',
    metaDescription:
      'Cómo es la primera consulta con un psicólogo, qué preguntas te van a hacer, qué no hace falta preparar y qué deberías saber al terminar.',
    keywords: [
      'primera sesión con el psicólogo',
      'qué esperar de la primera consulta psicológica',
      'qué preguntan en la primera sesión de terapia',
      'nervios primera vez psicólogo',
    ],
    answer:
      'La primera sesión con el psicólogo es de evaluación: se dedica a entender qué te trae, desde cuándo ocurre, qué has intentado y cómo afecta tu día a día. No hace falta preparar nada ni contar las cosas en orden. Al terminar deberías tener una idea inicial de cómo se va a trabajar y con qué frecuencia.',
    excerpt:
      'Qué te van a preguntar, qué no hace falta preparar y con qué deberías salir de la primera consulta.',
    publishedAt: '2026-11-01',
    updatedAt: '2026-11-01',
    readingMinutes: 4,
    sections: [
      {
        heading: 'Antes de la sesión',
        paragraphs: [
          'Es normal sentir nervios o no saber por dónde empezar. No hace falta traer un relato ordenado ni tener claro "qué tienes". Si te ayuda, puedes anotar dos o tres cosas que quieras mencionar, pero no es necesario.',
          'Si la sesión es online, busca un lugar donde puedas hablar sin que te escuchen y, si puedes, usa auriculares.',
        ],
      },
      {
        heading: 'Qué se hace en la primera consulta',
        bullets: [
          'Hablar sobre el motivo de consulta: qué te pasa y por qué ahora.',
          'Revisar cuándo empezó, cómo ha evolucionado y en qué situaciones aparece.',
          'Conocer un poco de tu historia, tu entorno y tus recursos.',
          'Explicarte cómo funciona la terapia, la confidencialidad y sus límites.',
          'Resolver tus dudas sobre el proceso.',
        ],
      },
      {
        heading: 'Con qué deberías salir',
        bullets: [
          'Una primera lectura de lo que está ocurriendo.',
          'Una propuesta de objetivos y de frecuencia de sesiones.',
          'Claridad sobre cómo se va a trabajar y qué se espera de ti entre sesiones.',
        ],
      },
      {
        heading: 'Si se trata de un niño o un adolescente',
        paragraphs: [
          'Con niños, la primera entrevista suele ser con los padres, para conocer la historia del desarrollo y el motivo de consulta antes de conocer al niño. Con adolescentes se combina un espacio con la familia y otro a solas con ellos, y se explica desde el principio qué se comparte con los padres.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Tengo que contar todo en la primera sesión?',
        answer:
          'No. Cuentas lo que quieras y puedas. El ritmo lo marcas tú, y hay temas que se abren solo cuando hay más confianza.',
      },
      {
        question: '¿Y si lloro en la sesión?',
        answer:
          'Es completamente normal y no pasa nada. La consulta es un espacio pensado precisamente para poder expresar lo que en otros lugares cuesta.',
      },
      {
        question: '¿Cuánto dura la primera sesión?',
        answer:
          'En esta consulta, 60 minutos, igual que el resto de sesiones, tanto presencial como online.',
      },
    ],
    relatedServices: ['terapia-ansiedad-caracas', 'psicologia-infantil-adolescente-caracas'],
  },
]

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug)
}
