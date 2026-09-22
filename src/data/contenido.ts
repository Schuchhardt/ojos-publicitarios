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
    valor: '',
    rotulo: 'DATO POR COMPLETAR',
    texto: 'Agregar una métrica real (ej. en cuánto tiempo respondemos una consulta)',
    pendiente: true,
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
  /** Nombre del archivo dentro de src/assets. Vacío = tarjeta pendiente. */
  imagen?: string;
}

export const PROYECTOS: Proyecto[] = [
  {
    nombre: 'Chilecamiones',
    rotulo: 'MARKETPLACE · ENTREGADO',
    descripcion:
      'Plataforma para encontrar el camión correcto: catálogo con buscador por marca y año, fichas de vehículo y consultas que llegan ordenadas al vendedor.',
    url: 'https://chilecamiones.cl',
    imagen: 'chilecamiones.png',
  },
];

/** Tarjetas vacías que quedan a la espera de un proyecto real. */
export const PROYECTOS_PENDIENTES = 1;

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
