import type { FaqItem } from '@/lib/schema'
import { PERSON, HOURS_SUMMARY, LOCATION } from './site'

/**
 * Páginas de especialidad.
 *
 * Por qué existen: el sitio tenía dos páginas y una lista de keywords en la
 * metadata. Esa meta la ignora Google desde 2009. Para posicionar por
 * "terapia para la ansiedad en Caracas" hace falta una página que trate ese
 * tema — no una mención en un array.
 *
 * Cada entrada genera una ruta estática en /servicios/[slug] con su propio
 * title, description, canonical, MedicalTherapy schema, breadcrumb y FAQPage.
 *
 * Aviso sobre el contenido: es material psicoeducativo de divulgación. Describe
 * cuadros clínicos y formas de abordaje en términos generales; no constituye
 * diagnóstico ni sustituye una evaluación profesional individual.
 */

export type ServiceSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  note?: string
}

export type Service = {
  slug: string
  navLabel: string
  icon: 'brain' | 'heart' | 'users' | 'sparkles' | 'shield' | 'monitor'
  metaTitle: string
  metaDescription: string
  keywords: string[]
  h1: string
  serviceType: string
  alternateName?: string
  lead: string
  sections: ServiceSection[]
  faqs: FaqItem[]
  related: string[]
}

const zona = LOCATION.neighborhood
  ? `${LOCATION.neighborhood}, Caracas`
  : 'Caracas'

export const SERVICES: Service[] = [
  /* ─────────────────────────────── ANSIEDAD ─────────────────────────────── */
  {
    slug: 'terapia-ansiedad-caracas',
    navLabel: 'Ansiedad',
    icon: 'brain',
    metaTitle: 'Terapia para la Ansiedad en Caracas | Psicóloga Clínica',
    metaDescription:
      'Tratamiento psicológico de la ansiedad en Caracas, presencial en Los Chaguaramos y online. Crisis de pánico, ansiedad generalizada y fobia social con terapia cognitivo-conductual.',
    keywords: [
      'terapia para la ansiedad en Caracas',
      'psicólogo ansiedad Caracas',
      'tratamiento ataques de pánico Caracas',
      'ansiedad generalizada Venezuela',
      'psicóloga crisis de ansiedad Caracas',
    ],
    h1: 'Terapia para la ansiedad en Caracas',
    serviceType: 'Tratamiento psicológico de los trastornos de ansiedad',
    alternateName: 'Tratamiento de la ansiedad',
    lead:
      `La ansiedad es una respuesta normal ante una amenaza: el problema empieza cuando se activa sin que haya peligro real, ` +
      `se mantiene en el tiempo y condiciona lo que haces. En consulta se trabaja con terapia cognitivo-conductual, ` +
      `el enfoque con mayor respaldo empírico para los trastornos de ansiedad, en modalidad presencial en ${zona} y online.`,
    sections: [
      {
        heading: 'Cómo se manifiesta la ansiedad',
        paragraphs: [
          'La ansiedad rara vez aparece solo como preocupación. Suele expresarse en tres planos a la vez, y es habitual llegar a consulta reconociendo uno solo de ellos —normalmente el físico— sin relacionarlo con el resto.',
        ],
        bullets: [
          'En el cuerpo: taquicardia, opresión en el pecho, falta de aire, tensión muscular sostenida, mareo, molestias digestivas, sudoración, dificultad para conciliar el sueño.',
          'En el pensamiento: anticipación constante de escenarios negativos, rumiación, dificultad para concentrarse, sensación de que algo malo va a pasar sin poder precisar qué.',
          'En la conducta: evitar situaciones o lugares, aplazar decisiones, comprobar las cosas varias veces, buscar que otros te tranquilicen de forma repetida.',
        ],
      },
      {
        heading: 'Cuadros que se atienden',
        bullets: [
          'Trastorno de ansiedad generalizada: preocupación excesiva y difícil de controlar sobre varios ámbitos a la vez.',
          'Crisis de pánico: episodios de miedo intenso de aparición brusca, con síntomas físicos marcados y temor a que se repitan.',
          'Ansiedad social: malestar intenso ante situaciones de exposición o evaluación por parte de otros.',
          'Fobias específicas: miedo desproporcionado a un objeto o situación concreta.',
          'Ansiedad ante la salud: preocupación persistente por padecer una enfermedad grave pese a los resultados médicos.',
          'Ansiedad asociada a contextos de incertidumbre prolongada, migración de familiares o inestabilidad económica.',
        ],
      },
      {
        heading: 'Cuándo conviene consultar',
        paragraphs: [
          'No hace falta llegar a una crisis para pedir ayuda. Conviene consultar cuando la ansiedad lleva semanas sostenida, cuando empieza a decidir por ti —qué evitas, a dónde no vas, qué dejas de intentar— o cuando el descanso, el rendimiento o tus relaciones se están viendo afectados.',
          'También cuando ya identificaste el patrón por tu cuenta pero, aun entendiéndolo, no consigues modificarlo. Esa distancia entre saber y poder es precisamente donde el trabajo terapéutico aporta.',
        ],
      },
      {
        heading: 'Cómo se trabaja en terapia',
        paragraphs: [
          'El proceso es estructurado y tiene objetivos definidos desde las primeras sesiones. No consiste en conversar sin rumbo sobre lo que preocupa.',
        ],
        bullets: [
          'Evaluación inicial: qué dispara la ansiedad, con qué intensidad y frecuencia, qué la mantiene y qué has intentado hasta ahora.',
          'Psicoeducación: entender el mecanismo de la ansiedad reduce el miedo al propio síntoma, que suele ser la mitad del problema.',
          'Reestructuración cognitiva: identificar las interpretaciones automáticas que disparan la respuesta y ponerlas a prueba.',
          'Exposición gradual: acercarse de forma progresiva y planificada a lo que se evita, que es lo que rompe el ciclo de mantenimiento.',
          'Regulación fisiológica: respiración diafragmática y técnicas de desactivación para bajar el nivel basal de activación.',
          'Prevención de recaídas: reconocer las señales tempranas y tener un plan propio antes de terminar el proceso.',
        ],
      },
      {
        heading: 'Qué esperar del proceso',
        paragraphs: [
          'Los cuadros de ansiedad acotados suelen trabajarse en un rango de 8 a 12 sesiones semanales, aunque el número real depende de cuánto tiempo lleve instalado el patrón y de cuántas áreas de la vida abarque. Las primeras mejoras en síntomas físicos y sueño suelen aparecer antes que los cambios en los patrones de pensamiento.',
          'Entre sesiones hay ejercicios concretos. Buena parte del avance ocurre fuera de consulta, y el seguimiento por WhatsApp existe para sostener ese trabajo.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿La ansiedad se cura?',
        answer:
          'La ansiedad es una emoción normal y no se elimina, ni sería deseable. Lo que sí se trata con buenos resultados es el trastorno de ansiedad: la intensidad desproporcionada, la frecuencia y la interferencia en la vida diaria. El objetivo del tratamiento es que la ansiedad vuelva a ser una señal útil y proporcionada, y que dispongas de recursos propios para manejarla cuando reaparezca.',
      },
      {
        question: '¿Necesito medicación para la ansiedad?',
        answer:
          'No siempre. En cuadros leves y moderados la terapia cognitivo-conductual sola muestra buenos resultados. En cuadros severos, o cuando el nivel de activación impide siquiera empezar a trabajar, la combinación con tratamiento farmacológico suele ser lo indicado. Esa decisión corresponde a un médico psiquiatra: el psicólogo clínico no receta, pero sí coordina la derivación cuando el caso lo requiere.',
      },
      {
        question: '¿Cuánto tarda en hacer efecto la terapia para la ansiedad?',
        answer:
          'La mayoría de las personas nota algún cambio en las primeras cuatro a seis sesiones, habitualmente en el sueño y en la intensidad de los síntomas físicos. La consolidación —que el cambio se sostenga sin esfuerzo consciente— toma más tiempo y es la fase que conviene no interrumpir antes de tiempo.',
      },
      {
        question: '¿Se puede tratar la ansiedad por videollamada?',
        answer:
          'Sí. La ansiedad es uno de los motivos de consulta donde la terapia online muestra resultados equiparables a la presencial. Además tiene una ventaja práctica: los ejercicios de exposición se practican directamente en el entorno real de la persona, que es donde después tienen que funcionar.',
      },
    ],
    related: ['terapia-depresion-caracas', 'terapia-online-venezuela', 'terapia-tdah-caracas'],
  },

  /* ────────────────────────────────── TDAH ──────────────────────────────── */
  {
    slug: 'terapia-tdah-caracas',
    navLabel: 'TDAH',
    icon: 'sparkles',
    metaTitle: 'Psicóloga especialista en TDAH en Caracas | Niños y Adultos',
    metaDescription:
      'Evaluación y tratamiento psicológico del TDAH en Caracas, presencial y online. Niños, adolescentes y adultos, con orientación a familias y colegios.',
    keywords: [
      'psicóloga TDAH Caracas',
      'especialista en TDAH Caracas',
      'déficit de atención Caracas',
      'TDAH adultos Venezuela',
      'evaluación TDAH niños Caracas',
    ],
    h1: 'Evaluación y tratamiento del TDAH en Caracas',
    serviceType: 'Evaluación y tratamiento psicológico del TDAH',
    alternateName: 'Trastorno por déficit de atención e hiperactividad',
    lead:
      'El TDAH es un trastorno del neurodesarrollo que afecta la atención sostenida, la regulación del impulso y las ' +
      'funciones ejecutivas: planificar, iniciar, organizar y terminar. No es falta de voluntad ni de inteligencia. ' +
      `Se atiende a niños, adolescentes y adultos, de forma presencial en ${zona} y online.`,
    sections: [
      {
        heading: 'Cómo se presenta según la edad',
        paragraphs: [
          'El TDAH no desaparece al crecer: cambia de forma. Reconocer esas diferencias explica por qué tantos adultos llegan a consulta sin haber sido identificados nunca.',
        ],
        bullets: [
          'En la infancia: dificultad para sostener la atención en tareas largas, olvidos frecuentes, pérdida de materiales, inquietud motora, interrumpir, dificultad para esperar turnos, reportes escolares recurrentes.',
          'En la adolescencia: la inquietud se vuelve interna, aparecen la procrastinación, la desorganización y una caída del rendimiento que contrasta con la capacidad real, además de mayor sensibilidad a la frustración.',
          'En la adultez: dificultad para iniciar tareas poco estimulantes, saltar de un proyecto a otro sin cerrar, impuntualidad crónica, olvidos administrativos, hiperfoco en lo que interesa y agotamiento por el esfuerzo constante de compensar.',
        ],
        note:
          'La presentación predominantemente inatenta —sin hiperactividad visible— es la que más pasa desapercibida, sobre todo en niñas y mujeres, que con frecuencia reciben el diagnóstico ya en la adultez.',
      },
      {
        heading: 'Cómo es el proceso de evaluación',
        bullets: [
          'Entrevista clínica detallada sobre el funcionamiento actual en las distintas áreas de la vida.',
          'Historia del desarrollo: el TDAH requiere que los indicadores estén presentes desde la infancia, aunque no se hayan identificado entonces.',
          'Escalas y pruebas estandarizadas de atención y funciones ejecutivas.',
          'Información de terceros cuando aplica: padres, pareja o reportes escolares, porque la autopercepción sola no basta.',
          'Descarte de otras explicaciones: ansiedad, depresión, alteraciones del sueño y consumo de sustancias pueden producir un perfil de síntomas parecido.',
          'Devolución de resultados por escrito, con la formulación del caso y las recomendaciones concretas.',
        ],
      },
      {
        heading: 'En qué consiste el tratamiento',
        paragraphs: [
          'El abordaje psicológico no busca "corregir" a la persona, sino construir un sistema de funcionamiento compatible con su forma de procesar, y reparar el daño que suelen dejar años de atribuir a la pereza lo que era una dificultad real.',
        ],
        bullets: [
          'Psicoeducación sobre el propio perfil: qué se le da bien al cerebro con TDAH y qué le cuesta, y por qué.',
          'Entrenamiento en funciones ejecutivas: sistemas de organización, gestión del tiempo, fragmentación de tareas y manejo de la procrastinación.',
          'Regulación emocional y tolerancia a la frustración.',
          'Trabajo sobre la autoestima, muy erosionada en quienes crecieron escuchando que no se esforzaban lo suficiente.',
          'Orientación a padres: pautas de crianza, estructura del hogar y comunicación con el colegio.',
          'Coordinación con psiquiatría y con el equipo escolar cuando el caso lo requiere.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿A qué edad se puede evaluar el TDAH?',
        answer:
          'La evaluación formal suele realizarse a partir de los 6 años, cuando las exigencias escolares permiten distinguir entre las conductas propias de la edad y un patrón que se aparta de lo esperado. Antes de esa edad sí se puede trabajar con observación, orientación a los padres e intervención temprana sobre las dificultades concretas.',
      },
      {
        question: '¿El psicólogo puede recetar medicación para el TDAH?',
        answer:
          'No. En Venezuela la prescripción de fármacos corresponde exclusivamente a médicos. El psicólogo clínico realiza la evaluación, el diagnóstico psicológico y el tratamiento no farmacológico, y deriva a psiquiatría cuando la indicación de medicación es pertinente. Ambos abordajes se complementan: la evidencia respalda que el tratamiento combinado suele dar mejores resultados que cualquiera de los dos por separado.',
      },
      {
        question: 'Me diagnosticaron TDAH de adulto, ¿sirve de algo la terapia a esta edad?',
        answer:
          'Sí, y suele tener un impacto alto. En adultos el trabajo se centra en dos frentes: construir estrategias de organización adaptadas a la propia forma de funcionar, y reinterpretar la propia historia. Entender que décadas de dificultades no eran un defecto de carácter tiene un efecto importante sobre la autoestima y sobre la relación con el trabajo y con la pareja.',
      },
      {
        question: '¿Cuántas sesiones dura la evaluación?',
        answer:
          'Entre tres y cinco sesiones, según la edad y la complejidad del caso. Incluye la entrevista clínica, la aplicación de pruebas, la recogida de información de terceros cuando corresponde y una sesión final de devolución de resultados con el informe.',
      },
    ],
    related: ['terapia-autismo-caracas', 'terapia-ansiedad-caracas', 'terapia-online-venezuela'],
  },

  /* ───────────────────────────────── DEPRESIÓN ──────────────────────────── */
  {
    slug: 'terapia-depresion-caracas',
    navLabel: 'Depresión',
    icon: 'heart',
    metaTitle: 'Tratamiento de la Depresión en Caracas | Psicóloga Clínica',
    metaDescription:
      'Terapia psicológica para la depresión en Caracas, presencial y online. Activación conductual y terapia cognitivo-conductual con psicóloga colegiada.',
    keywords: [
      'tratamiento depresión Caracas',
      'psicólogo depresión Caracas',
      'terapia para la tristeza Caracas',
      'ayuda psicológica depresión Venezuela',
    ],
    h1: 'Tratamiento psicológico de la depresión en Caracas',
    serviceType: 'Tratamiento psicológico de la depresión',
    lead:
      'La depresión no es tristeza intensa ni una etapa que se pasa con voluntad. Es un cuadro clínico que altera el ' +
      'estado de ánimo, la energía, el sueño, el apetito y la capacidad de disfrutar, y que tiene tratamiento con ' +
      `resultados sólidos. Atención presencial en ${zona} y online.`,
    sections: [
      {
        heading: 'Señales que conviene no dejar pasar',
        bullets: [
          'Ánimo bajo o irritabilidad la mayor parte del día, durante dos semanas o más.',
          'Pérdida de interés o de placer en actividades que antes resultaban satisfactorias.',
          'Alteraciones del sueño: insomnio, despertares de madrugada o dormir muchas más horas de lo habitual.',
          'Cambios notables en el apetito o en el peso.',
          'Fatiga persistente y sensación de que cualquier tarea cotidiana exige un esfuerzo desproporcionado.',
          'Dificultad para concentrarse, para retener información o para tomar decisiones sencillas.',
          'Sentimientos de culpa, de inutilidad o de ser una carga para los demás.',
          'Aislamiento progresivo de amigos y familia.',
        ],
        note:
          'Si aparecen pensamientos de muerte o de hacerte daño, no esperes a la próxima cita disponible: busca atención de forma inmediata, acude a un servicio de urgencias o dile a alguien de confianza que estás pasando por esto. Es una situación tratable y no tienes que atravesarla en solitario.',
      },
      {
        heading: 'Cómo se aborda en terapia',
        paragraphs: [
          'La depresión sostiene un círculo difícil de romper por cuenta propia: el desánimo lleva a reducir la actividad, y la reducción de la actividad quita las fuentes de refuerzo que sostienen el ánimo. El tratamiento interviene en ese ciclo antes de trabajar sobre el contenido de los pensamientos.',
        ],
        bullets: [
          'Activación conductual: recuperar de forma progresiva y planificada actividades con valor personal, sin esperar a "tener ganas". Es la intervención con mejor evidencia en fases iniciales.',
          'Reestructuración cognitiva: identificar y poner a prueba los pensamientos de inutilidad, culpa y desesperanza que sostienen el cuadro.',
          'Entrenamiento en resolución de problemas para los estresores concretos que estén alimentando la situación.',
          'Regularización del sueño y de las rutinas básicas.',
          'Reconstrucción de la red de apoyo, muy debilitada por el aislamiento.',
          'Prevención de recaídas: identificar señales tempranas y planificar la respuesta.',
        ],
      },
      {
        heading: 'Sobre el contexto venezolano',
        paragraphs: [
          'Buena parte de los cuadros depresivos que llegan a consulta en Caracas están atravesados por duelos migratorios: familias separadas, proyectos interrumpidos, la sensación de vivir en pausa. Nombrar esa dimensión no es un adorno del proceso; distinguir entre lo que corresponde a un duelo por circunstancias reales y lo que corresponde a un cuadro clínico cambia el abordaje.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Cómo distingo la depresión de la tristeza normal?',
        answer:
          'La tristeza es una emoción proporcionada a un hecho concreto, fluctúa a lo largo del día y no impide funcionar. La depresión se sostiene durante semanas, no siempre tiene un desencadenante identificable, se acompaña de alteraciones del sueño, del apetito y de la energía, y sobre todo elimina la capacidad de disfrutar de lo que antes gustaba. El criterio práctico más útil es la interferencia: si el malestar lleva más de dos semanas y te está impidiendo funcionar, conviene consultar.',
      },
      {
        question: '¿Necesito antidepresivos?',
        answer:
          'Depende de la gravedad del cuadro. En depresiones leves y moderadas la psicoterapia sola muestra resultados equivalentes a la medicación, con menor tasa de recaída al terminar. En cuadros graves la combinación suele ser lo indicado. La prescripción corresponde a un psiquiatra; en consulta se evalúa si hay criterios para sugerir esa derivación.',
      },
      {
        question: '¿Y si no tengo energía ni para ir a terapia?',
        answer:
          'Es un síntoma del propio cuadro, no una falta de compromiso, y se toma en cuenta al planificar. En esas fases la modalidad online reduce mucho la barrera de entrada, y los primeros objetivos se fijan deliberadamente pequeños y alcanzables. Empezar sin ganas es lo esperable: las ganas suelen aparecer después de la acción, no antes.',
      },
    ],
    related: ['terapia-ansiedad-caracas', 'terapia-online-venezuela', 'terapia-pareja-caracas'],
  },

  /* ─────────────────────────────────── TEA ──────────────────────────────── */
  {
    slug: 'terapia-autismo-caracas',
    navLabel: 'Autismo',
    icon: 'shield',
    metaTitle: 'Psicóloga especialista en Autismo (TEA) en Caracas',
    metaDescription:
      'Evaluación, acompañamiento y orientación familiar en trastorno del espectro autista en Caracas. Niños, adolescentes y adultos, presencial y online.',
    keywords: [
      'psicóloga autismo Caracas',
      'especialista TEA Caracas',
      'evaluación autismo niños Caracas',
      'autismo adultos Venezuela',
      'orientación familias autismo Caracas',
    ],
    h1: 'Acompañamiento en el espectro autista en Caracas',
    serviceType: 'Evaluación y acompañamiento psicológico en el trastorno del espectro autista',
    alternateName: 'TEA',
    lead:
      'El autismo es una forma distinta de procesar la información social y sensorial, no una enfermedad que haya que ' +
      'curar. El trabajo psicológico se dirige a comprender el perfil de cada persona, desarrollar herramientas que le ' +
      `resulten útiles y acompañar a su familia y a su entorno educativo. Atención presencial en ${zona} y online.`,
    sections: [
      {
        heading: 'Qué se atiende',
        bullets: [
          'Evaluación del perfil de desarrollo cuando existen señales de alerta o dudas de la familia o del colegio.',
          'Desarrollo de habilidades de comunicación e interacción social, respetando la forma propia de vincularse de cada persona.',
          'Regulación emocional y sensorial: identificar los detonantes de la sobrecarga y construir estrategias anticipatorias.',
          'Manejo de la rigidez y de la anticipación ante cambios de rutina.',
          'Orientación a padres, hermanos y cuidadores.',
          'Coordinación con el colegio para las adaptaciones razonables y el trabajo conjunto.',
          'Adultos con diagnóstico tardío: resignificar la propia historia y reducir el desgaste del enmascaramiento sostenido.',
        ],
      },
      {
        heading: 'El enfoque de trabajo',
        paragraphs: [
          'El objetivo no es que la persona parezca neurotípica. Aprender a simular durante años tiene un costo alto y bien documentado: agotamiento, ansiedad y una desconexión de las propias necesidades que factura tarde o temprano.',
          'El trabajo se orienta a dos cosas: ampliar el repertorio de herramientas de la persona en las áreas donde ella misma quiere desenvolverse mejor, y ajustar el entorno —casa, colegio, trabajo— para que deje de exigir un esfuerzo que no debería ser necesario. La familia participa siempre, porque la mayor parte del cambio ocurre en el día a día, no en la sesión.',
        ],
      },
      {
        heading: 'Señales que suelen motivar una consulta',
        bullets: [
          'Retraso o particularidades en el desarrollo del lenguaje y de la comunicación.',
          'Dificultad para la reciprocidad social, el juego compartido o la lectura de señales implícitas.',
          'Intereses muy intensos y focalizados en pocos temas.',
          'Necesidad marcada de rutinas y malestar intenso ante los cambios imprevistos.',
          'Reacciones muy marcadas a estímulos sensoriales: ruidos, texturas, luces, etiquetas de la ropa.',
          'En adultos: agotamiento social persistente, sensación de haber estado siempre actuando un papel, dificultades sostenidas en entornos laborales muy sociales.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿El autismo se cura?',
        answer:
          'No, y ese no es el objetivo del acompañamiento. El autismo es una condición del neurodesarrollo que forma parte de cómo la persona percibe y procesa el mundo. Lo que sí cambia —y mucho— con un buen acompañamiento es la calidad de vida: la capacidad de comunicar necesidades, de regular la sobrecarga sensorial, de sostener vínculos satisfactorios y de desenvolverse en entornos que se hayan ajustado razonablemente.',
      },
      {
        question: '¿A qué edad se puede detectar?',
        answer:
          'Las primeras señales pueden observarse desde los 18 a 24 meses, y la intervención temprana marca una diferencia significativa en el desarrollo posterior. Dicho esto, muchas personas —especialmente mujeres y personas con buen desarrollo del lenguaje— llegan al diagnóstico en la adolescencia o en la adultez, y el acompañamiento sigue siendo valioso en cualquier momento de la vida.',
      },
      {
        question: '¿Trabajan también con la familia?',
        answer:
          'Sí, y no es un complemento opcional. La orientación a padres, hermanos y cuidadores forma parte del proceso: comprender el perfil sensorial y comunicativo de la persona cambia la dinámica cotidiana mucho más de lo que puede lograr una sesión semanal por sí sola. Cuando aplica, también se trabaja con el colegio.',
      },
    ],
    related: ['terapia-tdah-caracas', 'terapia-ansiedad-caracas', 'terapia-online-venezuela'],
  },

  /* ────────────────────────────────── PAREJA ────────────────────────────── */
  {
    slug: 'terapia-pareja-caracas',
    navLabel: 'Pareja',
    icon: 'users',
    metaTitle: 'Terapia de Pareja en Caracas | Psicóloga Clínica',
    metaDescription:
      'Terapia de pareja en Caracas, presencial y online. Comunicación, conflictos recurrentes, crisis de confianza y decisiones sobre el futuro de la relación.',
    keywords: [
      'terapia de pareja Caracas',
      'psicólogo de parejas Caracas',
      'consejería matrimonial Caracas',
      'terapia de pareja online Venezuela',
    ],
    h1: 'Terapia de pareja en Caracas',
    serviceType: 'Terapia de pareja',
    lead:
      'La mayoría de las parejas no llega a consulta por un conflicto puntual, sino por una discusión que lleva años ' +
      'repitiéndose con distintos disfraces. El trabajo consiste en identificar ese ciclo y modificar la forma en que ' +
      `ambos participan en él. Sesiones presenciales en ${zona} y online, útil también cuando uno de los dos está fuera del país.`,
    sections: [
      {
        heading: 'Motivos de consulta habituales',
        bullets: [
          'Discusiones recurrentes que terminan siempre igual, sin resolverse.',
          'Distancia emocional, sensación de convivir como compañeros de piso.',
          'Crisis de confianza tras una infidelidad o un ocultamiento.',
          'Celos e inseguridad que desgastan el vínculo.',
          'Desacuerdos sostenidos sobre la crianza de los hijos.',
          'Diferencias en el deseo sexual o dificultades en la intimidad.',
          'Relaciones a distancia y el desgaste asociado a la migración de uno de los dos.',
          'Decisiones sobre el futuro de la relación, incluida una separación ordenada cuando esa es la conclusión.',
        ],
      },
      {
        heading: 'Cómo se estructura el proceso',
        bullets: [
          'Primera sesión conjunta: qué trae a la pareja a consulta y qué espera cada uno del proceso.',
          'Una sesión individual con cada miembro, para entender la perspectiva de cada quien sin la presión del otro presente.',
          'Devolución conjunta: se plantea el ciclo de interacción identificado y se acuerdan los objetivos de trabajo.',
          'Sesiones conjuntas de trabajo: habilidades de comunicación, gestión del conflicto, reparación de la confianza y acuerdos concretos.',
          'Revisión periódica de lo que sí está cambiando y de lo que no.',
        ],
      },
      {
        heading: 'Qué no es la terapia de pareja',
        paragraphs: [
          'No es un juicio donde alguien determina quién tiene la razón, ni un espacio para convencer al otro con ayuda de una tercera persona. Tampoco garantiza que la pareja continúe: en algunos procesos la conclusión compartida es separarse, y hacerlo con claridad y con el menor daño posible —sobre todo si hay hijos— es también un resultado legítimo del trabajo.',
        ],
        note:
          'Cuando existe violencia física, psicológica o sexual en la relación, la terapia de pareja no es el abordaje indicado y puede aumentar el riesgo. En esos casos el trabajo se plantea de forma individual y con las medidas de protección que correspondan. Si estás en esa situación, dilo en el primer contacto.',
      },
    ],
    faqs: [
      {
        question: '¿Sirve si solo uno de los dos quiere ir a terapia?',
        answer:
          'La terapia de pareja como tal requiere que ambos participen. Ahora bien, un proceso individual sobre la propia forma de vincularse, de comunicar y de poner límites puede modificar de manera significativa la dinámica de la relación, porque cambia uno de los dos lados del ciclo. Es una alternativa válida cuando el otro no quiere o no puede asistir.',
      },
      {
        question: '¿Cuánto dura una terapia de pareja?',
        answer:
          'Los procesos suelen ubicarse entre 10 y 20 sesiones, con frecuencia quincenal en la fase de consolidación. Las crisis puntuales con buena base previa se resuelven más rápido; los patrones de muchos años de antigüedad requieren más tiempo.',
      },
      {
        question: '¿Se puede hacer si vivimos en países distintos?',
        answer:
          'Sí. Es una situación frecuente entre parejas venezolanas y se trabaja mediante videollamada, con ambos conectados desde sus respectivas ubicaciones o juntos en una sola pantalla cuando coinciden. Las sesiones se coordinan según la diferencia horaria.',
      },
    ],
    related: ['terapia-online-venezuela', 'terapia-ansiedad-caracas', 'terapia-depresion-caracas'],
  },

  /* ────────────────────────────────── ONLINE ────────────────────────────── */
  {
    slug: 'terapia-online-venezuela',
    navLabel: 'Terapia online',
    icon: 'monitor',
    metaTitle: 'Terapia Psicológica Online en Venezuela | Psicóloga Colegiada',
    metaDescription:
      'Terapia psicológica online con psicóloga clínica venezolana colegiada. Sesiones por videollamada desde cualquier ciudad de Venezuela o desde el exterior.',
    keywords: [
      'terapia online Venezuela',
      'psicólogo online Venezuela',
      'psicóloga venezolana online',
      'terapia por videollamada Caracas',
      'psicólogo para venezolanos en el exterior',
    ],
    h1: 'Terapia psicológica online en Venezuela y para venezolanos en el exterior',
    serviceType: 'Psicoterapia por videollamada',
    lead:
      `Sesiones de 60 minutos por videollamada con ${PERSON.name}, psicóloga clínica colegiada en Venezuela ` +
      `(F.P.V. ${PERSON.fpvNumber}). Misma metodología y misma duración que la consulta presencial, sin el traslado.`,
    sections: [
      {
        heading: 'Para quién tiene más sentido',
        bullets: [
          'Personas que viven fuera de Caracas y quieren atención en su propio contexto cultural.',
          'Venezolanos en el exterior que prefieren trabajar en su idioma y con alguien que entiende el proceso migratorio desde dentro.',
          'Quienes tienen horarios laborales que hacen inviable el traslado dentro de Caracas.',
          'Madres y padres con hijos pequeños, para quienes salir de casa una hora y media no es una opción realista.',
          'Personas con dificultades de movilidad.',
          'Cuadros de ansiedad o depresión en los que salir de casa es, precisamente, parte de lo que cuesta.',
        ],
      },
      {
        heading: 'Cómo funciona',
        bullets: [
          'Primer contacto por WhatsApp para acordar día, hora y modalidad.',
          'Se envía el enlace de la videollamada antes de cada sesión. No hace falta instalar nada complicado ni crear cuentas.',
          'Sesiones de 60 minutos, igual que en consulta presencial.',
          'Ejercicios y materiales entre sesiones, con seguimiento por WhatsApp.',
          'Pago en dólares por los medios habituales; se confirman en el primer contacto.',
        ],
      },
      {
        heading: 'Qué necesitas de tu lado',
        bullets: [
          'Un espacio donde puedas hablar sin que te escuchen. Es el requisito que más condiciona el proceso: sin privacidad hay temas que no se abren.',
          'Conexión estable. Si la señal falla, se continúa por llamada telefónica y no se pierde la sesión.',
          'Auriculares, que mejoran bastante la calidad de la conversación y la confidencialidad.',
          'Reservar la hora completa sin interrupciones, igual que harías con una consulta presencial.',
        ],
      },
      {
        heading: 'Sobre su efectividad',
        paragraphs: [
          'La terapia por videollamada cuenta con respaldo empírico para la mayoría de motivos de consulta frecuentes —ansiedad, depresión, estrés, autoestima, dificultades de pareja— con resultados comparables a los de la modalidad presencial.',
          'Hay excepciones que conviene decir con claridad: situaciones de riesgo agudo, cuadros que requieren contención presencial inmediata o evaluaciones que exigen la aplicación de pruebas específicas en consulta. Si tu caso es de ese tipo, se plantea desde la primera sesión.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿La terapia online es igual de efectiva que la presencial?',
        answer:
          'Para la mayoría de los motivos de consulta habituales, la evidencia disponible muestra resultados comparables entre ambas modalidades. Lo que más influye en el resultado no es el canal, sino la calidad del vínculo terapéutico y la constancia del proceso. Existen situaciones que sí requieren atención presencial, y eso se evalúa desde la primera sesión.',
      },
      {
        question: 'Vivo en el exterior, ¿puedo tomar terapia con una psicóloga venezolana?',
        answer:
          'Sí. Es uno de los motivos de consulta más frecuentes en modalidad online. Trabajar en el propio idioma y con alguien que conoce de primera mano el contexto de origen ahorra mucho tiempo de explicación y suele ser especialmente relevante en procesos de duelo migratorio. Las sesiones se coordinan según la diferencia horaria.',
      },
      {
        question: '¿Qué pasa si se cae la conexión a mitad de sesión?',
        answer:
          'Se retoma por llamada telefónica y se completa el tiempo restante. Si el corte impide continuar, la sesión se reprograma sin costo adicional.',
      },
      {
        question: '¿Cómo se garantiza la privacidad de las sesiones online?',
        answer:
          'Las sesiones no se graban y se realizan por plataformas de videollamada con cifrado en tránsito. El deber de secreto profesional es idéntico al de la consulta presencial. Del lado del paciente, la recomendación es conectarse desde un espacio privado y con auriculares.',
      },
    ],
    related: ['terapia-ansiedad-caracas', 'terapia-depresion-caracas', 'terapia-pareja-caracas'],
  },
]

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug)

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}

/** Aviso de contenido sanitario. Aparece al pie de cada página de especialidad:
 *  es una señal de responsabilidad editorial que Google valora en YMYL. */
export const MEDICAL_DISCLAIMER =
  `Este contenido tiene fines informativos y divulgativos. No constituye un diagnóstico ni sustituye la evaluación ` +
  `de un profesional de la salud mental. Redactado y revisado por ${PERSON.name}, psicóloga clínica colegiada ` +
  `(F.P.V. ${PERSON.fpvNumber}). Consultas ${HOURS_SUMMARY}.`
