// Todo el contenido editable del home, en un solo lugar.
// Los textos entre [corchetes] son marcadores del diseño: quedan a la espera
// del dato real y se ven como marcador hasta que se completen.

// ---------------------------------------------------------------------------
// Barra de cifras (bajo el hero)
// ---------------------------------------------------------------------------
export interface Cifra {
  valor: string;
  texto: string;
  /** true = se ve como marcador pendiente, no como dato real. */
  pendiente?: boolean;
  /** Solo para la tarjeta pendiente: rótulo sobre el texto. */
  rotulo?: string;
  /** Destaca el número en color de acento. */
  destacada?: boolean;
}

export const CIFRAS: Cifra[] = [
  {
    valor: '0 %',
    texto: 'De lo que publicamos sale sin que una persona lo revise',
    destacada: true,
  },
  { valor: '$0', texto: 'En suscripciones mensuales: tu sitio y tus herramientas son tuyos' },
  { valor: '1', texto: 'Persona a cargo de tu proyecto, siempre la misma' },
  {
    valor: '< 12 h',
    texto: 'Respondemos cualquier consulta, a cualquier hora y cualquier día',
  },
];

// ---------------------------------------------------------------------------
// Servicios
// ---------------------------------------------------------------------------
export interface Servicio {
  numero: string;
  titulo: string;
  bajada: string;
  descripcion: string;
  puntos: string[];
  cta: string;
  /** Símbolo decorativo de la esquina superior derecha. */
  simbolo?: string;
  /** Tarjeta destacada del set. */
  destacado?: boolean;
  /** Etiqueta del destacado. */
  etiqueta?: string;
}

export const SERVICIOS: Servicio[] = [
  {
    numero: '01',
    titulo: 'Landing page',
    bajada: 'Un objetivo. Toda la atención.',
    descripcion:
      'Una página enfocada en presentar tu oferta y convertir el interés en consultas.',
    puntos: [
      'Ideal para campañas y servicios',
      'Mensaje claro y llamados a la acción',
      'Contacto simple y directo',
    ],
    cta: 'Quiero una landing',
  },
  {
    numero: '02',
    titulo: 'Sitio corporativo',
    bajada: 'Confianza desde el primer clic.',
    descripcion:
      'Un sitio que presenta tu empresa, explica lo que haces y da espacio a tu propuesta de valor.',
    puntos: [
      'Servicios organizados con claridad',
      'Identidad visual consistente',
      'Estructura que acompaña tu crecimiento',
    ],
    cta: 'Quiero mi sitio web',
    destacado: true,
    etiqueta: 'TU MARCA, EN GRANDE',
  },
  {
    numero: '03',
    titulo: 'Ecommerce',
    bajada: 'Tu vitrina, abierta al mundo.',
    descripcion:
      'Una tienda online pensada para mostrar tus productos y hacer más fácil la compra.',
    puntos: [
      'Catálogo fácil de explorar',
      'Carrito y proceso de compra claro',
      'Pagos y envíos según tu operación',
    ],
    cta: 'Quiero mi tienda online',
    simbolo: '+',
  },
];

// ---------------------------------------------------------------------------
// Qué incluye / automatización
// ---------------------------------------------------------------------------
export interface Automatizacion {
  numero: string;
  titulo: string;
  descripcion: string;
}

export const AUTOMATIZACIONES: Automatizacion[] = [
  {
    numero: '01',
    titulo: 'Atención por WhatsApp',
    descripcion:
      'Tus clientes preguntan y reciben respuesta al instante. Cuando hay que decidir algo, la conversación llega a ti.',
  },
  {
    numero: '02',
    titulo: 'Ninguna consulta se pierde',
    descripcion:
      'Quien te escriba recibe respuesta en segundos, a cualquier hora. El seguimiento lo hace una persona del equipo.',
  },
  {
    numero: '03',
    titulo: 'Tus clientes, ordenados',
    descripcion:
      'Cada consulta queda guardada en un solo lugar, con su estado, para que veas de dónde vienen tus ventas.',
  },
  {
    numero: '04',
    titulo: 'Agendamiento de citas',
    descripcion:
      'Tus clientes reservan hora según tu disponibilidad real y reciben el recordatorio antes de llegar.',
  },
  {
    numero: '05',
    titulo: 'Tu tienda al día',
    descripcion:
      'Confirmaciones, estados de envío y avisos de stock salen solos, sin que nadie copie datos a mano.',
  },
  {
    numero: '06',
    titulo: 'Clientes que vuelven',
    descripcion:
      'Correos de seguimiento que mantienen la conversación viva, escritos con tu tono y revisados antes de salir.',
  },
  {
    numero: '07',
    titulo: 'Contenido siempre listo',
    descripcion:
      'Piezas y textos para tus redes, producidos rápido y aprobados por una persona antes de publicarse.',
  },
];

// ---------------------------------------------------------------------------
// Cómo trabajamos (política de IA)
// ---------------------------------------------------------------------------
export const NOS_ENCARGAMOS: string[] = [
  'Que tu sitio esté siempre arriba y actualizado',
  'Respuestas inmediatas, confirmaciones y recordatorios',
  'El registro y orden de cada consulta que llega',
  'La producción de contenido para tus redes',
  'Los reportes que antes armabas a mano',
];

export const NO_LO_DEJA_UNA_MAQUINA: string[] = [
  'Un reclamo o una conversación delicada',
  'Precios, descuentos y compromisos con tus clientes',
  'Publicar algo sin tu aprobación',
  'El diseño y la estrategia de tu marca',
  'Entregar los datos de tu negocio a terceros',
];

// ---------------------------------------------------------------------------
// Proceso
// ---------------------------------------------------------------------------
export interface Paso {
  rotulo: string;
  titulo: string;
  descripcion: string;
}

export const PROCESO: Paso[] = [
  {
    rotulo: '01 — CONVERSAMOS',
    titulo: 'Entendemos tu negocio.',
    descripcion: 'Definimos tus objetivos, tu público y lo que necesitas comunicar.',
  },
  {
    rotulo: '02 — DISEÑAMOS',
    titulo: 'Le damos forma a tu idea.',
    descripcion:
      'Organizamos el contenido y creamos una propuesta visual para revisar contigo.',
  },
  {
    rotulo: '03 — NOS ENCARGAMOS',
    titulo: 'Lo dejamos funcionando.',
    descripcion:
      'Conectamos lo que tiene que responder solo y dejamos por escrito en qué momento entra una persona.',
  },
  {
    rotulo: '04 — LANZAMOS',
    titulo: 'Preparamos el siguiente paso.',
    descripcion: 'Publicamos, te enseñamos a usarlo y acompañamos las primeras semanas.',
  },
];

// ---------------------------------------------------------------------------
// Equipo — mientras no haya foto, se ve el marcador del diseño (800×1000).
// ---------------------------------------------------------------------------
export interface Persona {
  nombre: string;
  rol: string;
  /** Ruta en /public, ej. '/equipo/nombre.jpg'. Vacío = marcador. */
  foto?: string;
}

export const EQUIPO: Persona[] = [
  { nombre: 'Nombre Apellido', rol: 'Rol — qué revisa en tu proyecto' },
  { nombre: 'Nombre Apellido', rol: 'Rol — qué revisa en tu proyecto' },
  { nombre: 'Nombre Apellido', rol: 'Rol — qué revisa en tu proyecto' },
];

// ---------------------------------------------------------------------------
// Proyectos entregados
// ---------------------------------------------------------------------------
export interface Proyecto {
  nombre: string;
  rotulo: string;
  descripcion: string;
  url: string;
  /** Texto del enlace. Por defecto, el dominio de `url`. */
  enlaceTexto?: string;
  /** Ruta del archivo dentro de src/assets. Vacío = tarjeta pendiente. */
  imagen?: string;
  /** Desde dónde se recorta la imagen en la tarjeta. */
  encuadre?: 'top' | 'center';
}

export const PROYECTOS: Proyecto[] = [
  {
    nombre: 'Chilecamiones',
    rotulo: 'MARKETPLACE · ENTREGADO',
    descripcion:
      'Plataforma para encontrar el camión correcto: catálogo con buscador por marca y año, fichas de vehículo y consultas que llegan ordenadas al vendedor.',
    url: 'https://chilecamiones.cl',
    imagen: 'chilecamiones.png',
    encuadre: 'top',
  },
  {
    nombre: 'Mercado Mersan',
    rotulo: 'PUBLICIDAD EXTERIOR · 2022',
    descripcion:
      'Fotomontaje publicitario para las bodegas del Mercado Mersan, en la comuna de Lo Espejo.',
    url: 'https://www.instagram.com/p/CgwvS3lOpKm/',
    enlaceTexto: 'Ver en Instagram',
    imagen: 'proyectos/mersan.jpg',
  },
  {
    nombre: 'Energy',
    rotulo: 'PACKAGING · 2022',
    descripcion:
      'Diseño de prototipo de envase para una barra de cereal, con fotografía de producto.',
    url: 'https://www.instagram.com/p/Ck8SIgDORtn/',
    enlaceTexto: 'Ver en Instagram',
    imagen: 'proyectos/energy.jpg',
  },
  {
    nombre: 'Consultora KO',
    rotulo: 'IDENTIDAD DE MARCA · 2021',
    descripcion:
      'Logotipo para Consultora KO, asesoría en planificación y gestión comercial.',
    url: 'https://www.instagram.com/p/CU72lmCrcb_/',
    enlaceTexto: 'Ver en Instagram',
    imagen: 'proyectos/consultora-ko.jpg',
  },
];

/** Tarjetas vacías que quedan a la espera de un proyecto real. */
export const PROYECTOS_PENDIENTES = 0;

// ---------------------------------------------------------------------------
// Testimonios
// ---------------------------------------------------------------------------
export interface Testimonio {
  cita: string;
  nombre: string;
  cargo: string;
}

export const TESTIMONIOS: Testimonio[] = [
  {
    cita: 'Testimonio del cliente: qué problema tenía antes y qué cambió después.',
    nombre: 'Nombre del cliente',
    cargo: 'Cargo, empresa',
  },
  {
    cita:
      'Testimonio sobre la atención: con quién habló, cómo respondieron, qué tan claro fue el proceso.',
    nombre: 'Nombre del cliente',
    cargo: 'Cargo, empresa',
  },
];

export const TESTIMONIOS_PENDIENTES = 1;

// ---------------------------------------------------------------------------
// Opciones del formulario de solicitud
// ---------------------------------------------------------------------------
export const TIPOS_DE_PROYECTO = [
  'Sitio corporativo',
  'Landing page',
  'Ecommerce',
  'Automatizaciones y atención',
  'Todavía no lo tengo claro',
];

// ---------------------------------------------------------------------------
// Preguntas frecuentes de la home.
// Cada respuesta se lee sola, fuera de contexto: así la citan los buscadores
// con IA y así se ve en el resultado enriquecido de Google.
// ---------------------------------------------------------------------------
export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

export const FAQ: Pregunta[] = [
  {
    pregunta: '¿Cuánto se demoran en responder una consulta?',
    respuesta:
      'Menos de 12 horas, cualquier día de la semana y a cualquier hora. Responde una persona del equipo, no un mensaje automático.',
  },
  {
    pregunta: '¿Hay que pagar una suscripción mensual?',
    respuesta:
      'No. En Ojos Publicitarios el sitio y las herramientas quedan a nombre de tu negocio: no cobramos una mensualidad por dejarte usar lo que ya es tuyo.',
  },
  {
    pregunta: '¿Qué tipo de sitio necesito para mi negocio?',
    respuesta:
      'Una landing page si tienes una sola oferta y quieres recibir consultas; un sitio corporativo si necesitas presentar varios servicios y generar confianza; un ecommerce si vendes productos y quieres cobrar en línea.',
  },
  {
    pregunta: '¿Qué pasa si mi negocio no tiene nada, ni sitio ni redes?',
    respuesta:
      'Empezamos por ahí. Definimos qué formato conecta mejor tu marca con su próximo cliente y armamos lo mínimo que funciona, en vez de todo a la vez.',
  },
  {
    pregunta: '¿La atención automática reemplaza a una persona?',
    respuesta:
      'No. Automatizamos lo que se repite y tiene una sola respuesta correcta: horarios, precios de lista, confirmaciones y agendamiento. Nada se publica ni se responde en tu nombre sin que una persona lo revise.',
  },
  {
    pregunta: '¿Quién queda a cargo de mi proyecto?',
    respuesta:
      'Una sola persona, siempre la misma, de principio a fin. No hay tickets ni respuestas genéricas: sabes a quién escribirle y quién revisó tu sitio.',
  },
  {
    pregunta: '¿Dónde trabajan?',
    respuesta:
      'Somos un estudio creativo y digital chileno y trabajamos con negocios de todo Chile, de forma remota y por WhatsApp.',
  },
];
