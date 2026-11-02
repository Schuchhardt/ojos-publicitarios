// Todo el texto de la home, en español y en inglés. Las dos versiones tienen la
// misma forma (`ContenidoHome`): si falta un campo en una, TypeScript avisa.
// Cada sección del diseño (PAGINA WEB 2_diseño.pdf) tiene su bloque.

export type Idioma = 'es' | 'en';

export const IDIOMAS: Idioma[] = ['es', 'en'];

/** Ruta del home en cada idioma: el home cambia de idioma en el navegador. */
export const RUTA_HOME: Record<Idioma, string> = { es: '/', en: '/?lang=en' };

export interface Enlace {
  texto: string;
  href: string;
}

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

export interface Item {
  titulo: string;
  descripcion: string;
}

export type IconoMarketing = 'pluma' | 'chat' | 'megafono' | 'lupa' | 'sobre' | 'barras';

export interface ServicioMarketing extends Item {
  icono: IconoMarketing;
}

export interface Cifra {
  valor: string;
  texto: string;
  /** Destaca el número en color de acento. */
  destacada?: boolean;
}

export interface Paso {
  rotulo: string;
  titulo: string;
  descripcion: string;
}

export interface Proyecto {
  nombre: string;
  rotulo: string;
  descripcion: string;
  url: string;
  /** Texto del enlace. Por defecto, el dominio de `url`. */
  enlaceTexto?: string;
  /** Ruta del archivo dentro de src/assets. */
  imagen?: string;
  /** Desde dónde se recorta la imagen en la tarjeta. */
  encuadre?: 'top' | 'center';
}

export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

/** Título partido en una parte normal y otra en color de acento. */
export interface Titulo {
  normal: string;
  acento: string;
}

export interface ContenidoHome {
  meta: { titulo: string; descripcion: string };
  marcaBajada: string;
  nav: Enlace[];
  headerCta: string;
  menu: { abrir: string; cerrar: string };
  idiomaEtiqueta: string;
  hero: {
    titulo: string[];
    tituloAcento: string;
    puntos: string[];
    cta: string;
    nota: string;
    alt: string;
  };
  franja: string[];
  unico: {
    titulo: Titulo;
    texto: string;
    items: Item[];
    delegar: { titulo: string; texto: string; cta: string };
    alt: string;
  };
  web: {
    titulo: Titulo;
    bajada: string;
    servicios: Servicio[];
    enCadaRotulo: string;
    enCada: string[];
  };
  software: {
    rotulo: string;
    titulo: Titulo;
    texto: string;
    modulos: string[];
    cta: string;
    alt: string;
  };
  industrias: { rotulo: string; items: string[] };
  marketing: {
    rotulo: string;
    titulo: string;
    tituloAcento: string;
    texto: string;
    servicios: ServicioMarketing[];
    pie: string;
    alt: string;
  };
  fotos: string[];
  banda: string;
  cifras: Cifra[];
  criterio: {
    rotulo: string;
    titulo: string;
    texto: string;
    nosEncargamosTitulo: string;
    nosEncargamos: string[];
    humanoTitulo: string;
    humano: string[];
  };
  proyectos: { titulo: string; bajada: string; lista: Proyecto[] };
  faq: { rotulo: string; titulo: string; preguntas: Pregunta[] };
  proceso: { titulo: Titulo; bajada: string; pasos: Paso[] };
  contacto: {
    rotulo: string;
    titulo: string;
    tituloAcento: string;
    texto: string;
    cta: string;
    whatsapp: string;
  };
  respuestaPromesa: string;
  whatsappMensaje: string;
  tagline: string;
  solicitud: {
    rotulo: string;
    titulo: string;
    bajada: string;
    error: string;
    exito: string;
    asunto: string;
    nombre: string;
    nombrePh: string;
    email: string;
    emailPh: string;
    telefono: string;
    empresa: string;
    empresaPh: string;
    opcional: string;
    tipo: string;
    tipos: string[];
    idea: string;
    ideaPh: string;
    enviar: string;
    enviando: string;
    cerrar: string;
    errorNombre: string;
    errorEmail: string;
  };
}

// ---------------------------------------------------------------------------
// Proyectos: las fotos y los links son los mismos en los dos idiomas.
// ---------------------------------------------------------------------------
const PROYECTOS_BASE = [
  { nombre: 'Chilecamiones', url: 'https://chilecamiones.cl', imagen: 'chilecamiones.png', encuadre: 'top' },
  { nombre: 'Mercado Mersan', url: 'https://www.instagram.com/p/CgwvS3lOpKm/', imagen: 'proyectos/mersan.jpg' },
  { nombre: 'Energy', url: 'https://www.instagram.com/p/Ck8SIgDORtn/', imagen: 'proyectos/energy.jpg' },
  { nombre: 'Consultora KO', url: 'https://www.instagram.com/p/CU72lmCrcb_/', imagen: 'proyectos/consultora-ko.jpg' },
] as const;

function proyectos(
  textos: { rotulo: string; descripcion: string }[],
  verEnInstagram: string
): Proyecto[] {
  return PROYECTOS_BASE.map((base, i) => ({
    ...base,
    ...textos[i],
    enlaceTexto: base.url.includes('instagram.com') ? verEnInstagram : undefined,
  }));
}

// ---------------------------------------------------------------------------
// Español
// ---------------------------------------------------------------------------
const es: ContenidoHome = {
  meta: {
    titulo: 'Diseño web, software a medida y marketing digital en Chile | Ojos Publicitarios',
    descripcion:
      'Estudio creativo y digital chileno: sitios web y tiendas online, software a medida para tu operación y marketing digital que hace crecer tu marca. Te respondemos en 12 h.',
  },
  marcaBajada: 'Estudio creativo & Digital',
  nav: [
    { texto: 'Servicios', href: '#servicios' },
    { texto: 'Proyectos', href: '#proyectos' },
    { texto: 'Cómo trabajamos', href: '#proceso' },
    { texto: 'Preguntas', href: '#faq' },
    { texto: 'Blog', href: '/blog/' },
  ],
  headerCta: 'Hablemos',
  menu: { abrir: 'Abrir menú', cerrar: 'Cerrar menú' },
  idiomaEtiqueta: 'Idioma',
  hero: {
    titulo: ['Tu negocio', 'en su mejor'],
    tituloAcento: 'versión digital',
    puntos: ['Creación de sitios web', 'Desarrollo de software', 'Marketing digital'],
    cta: 'Quiero mi nueva web',
    nota: 'Sin suscripciones mensuales: todo queda a tu nombre.',
    alt: 'Sitio web, app y piezas de marca diseñadas para una inmobiliaria, en computador, celular y tablet',
  },
  franja: [
    'Landing pages',
    'Sitios corporativos',
    'Ecommerce',
    'Diseño a tu medida',
    'Software a medida',
    'Marketing digital',
  ],
  unico: {
    titulo: { normal: 'Tu negocio es único,', acento: 'tu sitio web también.' },
    texto:
      'Diseñamos y desarrollamos landing pages, sitios corporativos y tiendas online a la medida, alineados con tu marca y tus objetivos. Y lo dejamos funcionando solo, aunque tú no estés.',
    items: [
      {
        titulo: 'Atención por WhatsApp',
        descripcion:
          'Tus clientes preguntan y reciben respuesta al instante. Cuando hay que decidir algo, la conversación llega a ti.',
      },
      {
        titulo: 'Ninguna consulta se pierde',
        descripcion:
          'Quien te escriba recibe respuesta en segundos, a cualquier hora. El seguimiento lo hace una persona del equipo.',
      },
      {
        titulo: 'Tus clientes, ordenados',
        descripcion:
          'Cada consulta queda guardada en un solo lugar, con su estado, para que veas de dónde vienen tus ventas.',
      },
      {
        titulo: 'Agendamiento de citas',
        descripcion:
          'Tus clientes reservan hora según tu disponibilidad real y reciben el recordatorio antes de llegar.',
      },
      {
        titulo: 'Tu tienda al día',
        descripcion:
          'Confirmaciones, estados de envío y avisos de stock salen solos, sin que nadie copie datos a mano.',
      },
      {
        titulo: 'Clientes que vuelven',
        descripcion:
          'Correos de seguimiento que mantienen la conversación viva, escritos con tu tono y revisados antes de salir.',
      },
      {
        titulo: 'Contenido siempre listo',
        descripcion:
          'Piezas y textos para tus redes, producidos rápido y aprobados por una persona antes de publicarse.',
      },
    ],
    delegar: {
      titulo: 'Delegas y listo',
      texto:
        'Lo dejamos todo armado sobre tus propias cuentas y nos encargamos de mantenerlo. Tú vuelves a tu negocio.',
      cta: 'Quiero delegarlo',
    },
    alt: 'Sitio web de arquitectura diseñado a medida, en computador y celular',
  },
  web: {
    titulo: { normal: 'Una web a la altura', acento: 'de tu negocio digital' },
    bajada:
      'No todos los negocios necesitan lo mismo. Encontramos el formato que mejor conecta tu marca con su próximo cliente.',
    servicios: [
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
    ],
    enCadaRotulo: 'En cada proyecto',
    enCada: ['Diseño adaptable a móviles', 'Navegación intuitiva', 'Identidad propia', 'Enfoque comercial'],
  },
  software: {
    rotulo: 'DESARROLLO SOFTWARE',
    titulo: { normal: 'Tu forma de trabajar', acento: 'convertida en software' },
    texto:
      'Nuestro equipo de ingenieros de software crea aplicaciones y sistemas a medida para conectar, automatizar y simplificar tu operación.',
    modulos: [
      'Apps a medida',
      'CRM',
      'WMS · bodegas',
      'TMS · transporte',
      'Gestión a medida',
      'Control y seguridad',
    ],
    cta: 'Hablemos de tu proyecto',
    alt: 'Panel de gestión a medida conectado con app móvil, CRM, WMS, TMS y control de seguridad',
  },
  industrias: {
    rotulo: 'TECNOLOGÍA PARA DISTINTAS INDUSTRIAS',
    items: ['Logística', 'Comercio', 'Minería', 'Seguridad', 'Salud'],
  },
  marketing: {
    rotulo: 'MARKETING DIGITAL',
    titulo: 'Diseño que atrae.',
    tituloAcento: 'Comunicación que conecta',
    texto:
      'Unimos creatividad y estrategia para hacer crecer tu comunidad, llevar visitas a tu web y transformar el interés en oportunidades.',
    servicios: [
      {
        icono: 'pluma',
        titulo: 'Diseño creativo',
        descripcion: 'Identidad visual y piezas que hacen destacar tu marca.',
      },
      {
        icono: 'chat',
        titulo: 'Redes sociales',
        descripcion: 'Gestión y comunicación para construir comunidad.',
      },
      {
        icono: 'megafono',
        titulo: 'Campañas publicitarias',
        descripcion: 'Anuncios en Meta y Google para llegar a tu público.',
      },
      {
        icono: 'lupa',
        titulo: 'SEO y contenido web',
        descripcion: 'Mejora tu visibilidad en los buscadores.',
      },
      {
        icono: 'sobre',
        titulo: 'Email y remarketing',
        descripcion: 'Retoma el contacto y genera nuevas oportunidades.',
      },
      {
        icono: 'barras',
        titulo: 'Analítica y optimización',
        descripcion: 'Medimos resultados para mejorar tu estrategia.',
      },
    ],
    pie: 'Tu marca, con una voz y una imagen propias.',
    alt: 'Piezas de campaña y redes sociales diseñadas para una marca, en tablet y celular',
  },
  fotos: [
    'Celular con las apps de redes sociales',
    'Retoque fotográfico de una sesión de producto en un notebook',
    'Diseñador trabajando en propuestas de logotipo',
  ],
  banda: 'Complementamos tu presencia digital con diseño y contenido que hablan el mismo idioma.',
  cifras: [
    {
      valor: '0 %',
      texto: 'De lo que publicamos sale sin que una persona lo revise',
      destacada: true,
    },
    { valor: '$0', texto: 'En suscripciones mensuales: tu sitio y tus herramientas son tuyos' },
    { valor: '1', texto: 'Persona a cargo de tu proyecto, siempre la misma' },
    { valor: '< 12 h', texto: 'Respondemos cualquier consulta, a cualquier hora y cualquier día' },
  ],
  criterio: {
    rotulo: 'TECNOLOGÍA CON CRITERIO',
    titulo: 'Nada sale sin que una persona lo revise.',
    texto:
      'Usamos herramientas para trabajar más rápido, no para reemplazar el criterio. Te decimos qué funciona solo, qué revisamos nosotros y quién responde por cada entrega.',
    nosEncargamosTitulo: 'DE ESTO NOS ENCARGAMOS',
    nosEncargamos: [
      'Que tu sitio esté siempre arriba y actualizado',
      'Respuestas inmediatas, confirmaciones y recordatorios',
      'El registro y orden de cada consulta que llega',
      'La producción de contenido para tus redes',
      'Los reportes que antes armabas a mano',
    ],
    humanoTitulo: 'ESTO NO LO DEJA UNA MÁQUINA',
    humano: [
      'Un reclamo o una conversación delicada',
      'Precios, descuentos y compromisos con tus clientes',
      'Publicar algo sin tu aprobación',
      'El diseño y la estrategia de tu marca',
      'Entregar los datos de tu negocio a terceros',
    ],
  },
  proyectos: {
    titulo: 'Proyectos entregados.',
    bajada: 'Sitios funcionando hoy y marcas que ya están en la calle. Puedes entrar y verlos.',
    lista: proyectos(
      [
        {
          rotulo: 'MARKETPLACE · ENTREGADO',
          descripcion:
            'Plataforma para encontrar el camión correcto: catálogo con buscador por marca y año, fichas de vehículo y consultas que llegan ordenadas al vendedor.',
        },
        {
          rotulo: 'PUBLICIDAD EXTERIOR · 2022',
          descripcion:
            'Fotomontaje publicitario para las bodegas del Mercado Mersan, en la comuna de Lo Espejo.',
        },
        {
          rotulo: 'PACKAGING · 2022',
          descripcion:
            'Diseño de prototipo de envase para una barra de cereal, con fotografía de producto.',
        },
        {
          rotulo: 'IDENTIDAD DE MARCA · 2021',
          descripcion:
            'Logotipo para Consultora KO, asesoría en planificación y gestión comercial.',
        },
      ],
      'Ver en Instagram'
    ),
  },
  faq: {
    rotulo: 'PREGUNTAS FRECUENTES',
    titulo: 'Lo que nos preguntan antes de empezar.',
    preguntas: [
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
        pregunta: '¿Desarrollan software a medida?',
        respuesta:
          'Sí. Nuestro equipo de ingenieros crea aplicaciones y sistemas a medida —CRM, gestión de bodegas (WMS), transporte (TMS), paneles de gestión y apps móviles— para empresas de logística, comercio, minería, seguridad y salud.',
      },
      {
        pregunta: '¿Qué incluye el servicio de marketing digital?',
        respuesta:
          'Diseño creativo e identidad visual, gestión de redes sociales, campañas en Meta y Google, SEO y contenido web, email y remarketing, y analítica para medir y mejorar los resultados. Se puede contratar junto con el sitio o por separado.',
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
          'Somos un estudio creativo y digital chileno y trabajamos con negocios de todo Chile y del extranjero, de forma remota, en español y en inglés.',
      },
    ],
  },
  proceso: {
    titulo: { normal: 'De tu idea a', acento: 'tu próxima web.' },
    bajada: 'Un proceso cercano, con decisiones claras y tu negocio en el centro.',
    pasos: [
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
          'Desarrollamos, conectamos lo que tiene que responder solo y dejamos por escrito cuándo entra una persona.',
      },
      {
        rotulo: '04 — LANZAMOS',
        titulo: 'Preparamos el siguiente paso.',
        descripcion:
          'Revisamos, coordinamos la publicación, te enseñamos a usarlo y acompañamos las primeras semanas.',
      },
    ],
  },
  contacto: {
    rotulo: 'TU PRÓXIMO PROYECTO EMPIEZA AQUÍ',
    titulo: 'Que tu próxima visita sea tu próximo',
    tituloAcento: 'cliente.',
    texto:
      'Cuéntanos qué necesitas. Démosle forma a tu presencia digital: te respondemos con un plan concreto, qué incluye y cuánto cuesta.',
    cta: 'Preparar mi solicitud',
    whatsapp: 'Escribir por WhatsApp',
  },
  respuestaPromesa: 'Te respondemos en menos de 12 horas, cualquier día.',
  whatsappMensaje: 'Hola, vengo del sitio web y me gustaría conversar sobre mi proyecto.',
  tagline: 'Diseño con visión. Comunicación con propósito.',
  solicitud: {
    rotulo: 'CONVERSEMOS SOBRE TU IDEA',
    titulo: 'Tu proyecto, en pocas palabras.',
    bajada:
      'Cuéntanos qué necesitas. Te respondemos con un plan concreto: qué incluye, de qué nos encargamos nosotros y cuánto cuesta.',
    error: 'No pudimos enviar tu solicitud. Vuelve a intentarlo en unos segundos.',
    exito: 'Recibimos tu solicitud.',
    asunto: 'Nueva solicitud — Ojos Publicitarios',
    nombre: 'Tu nombre',
    nombrePh: '¿Cómo te llamas?',
    email: 'Tu correo',
    emailPh: 'Para responderte',
    telefono: 'Teléfono o WhatsApp',
    empresa: 'Empresa o marca',
    empresaPh: 'Nombre de tu negocio',
    opcional: '(opcional)',
    tipo: '¿Qué necesitas?',
    tipos: [
      'Sitio corporativo',
      'Landing page',
      'Ecommerce',
      'Desarrollo de software',
      'Marketing digital',
      'Automatizaciones y atención',
      'Todavía no lo tengo claro',
    ],
    idea: 'Cuéntanos tu idea',
    ideaPh: '¿Qué vendes y qué te gustaría lograr?',
    enviar: 'Enviar solicitud',
    enviando: 'Enviando…',
    cerrar: 'Cerrar',
    errorNombre: 'Escribe tu nombre.',
    errorEmail: 'Revisa tu correo: no parece una dirección válida.',
  },
};

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------
const en: ContenidoHome = {
  meta: {
    titulo: 'Web design, custom software & digital marketing | Ojos Publicitarios',
    descripcion:
      'Creative & digital studio from Chile: websites and online stores, custom software for your operation, and digital marketing that grows your brand. We reply within 12 hours.',
  },
  marcaBajada: 'Creative & Digital Studio',
  nav: [
    { texto: 'Services', href: '#servicios' },
    { texto: 'Work', href: '#proyectos' },
    { texto: 'How we work', href: '#proceso' },
    { texto: 'FAQ', href: '#faq' },
    { texto: 'Blog', href: '/en/blog/' },
  ],
  headerCta: "Let's talk",
  menu: { abrir: 'Open menu', cerrar: 'Close menu' },
  idiomaEtiqueta: 'Language',
  hero: {
    titulo: ['Your business', 'at its best,'],
    tituloAcento: 'gone digital',
    puntos: ['Website design & development', 'Custom software', 'Digital marketing'],
    cta: 'I want my new website',
    nota: 'No monthly subscriptions: everything stays in your name.',
    alt: 'Website, app and brand pieces designed for a real estate company, on desktop, phone and tablet',
  },
  franja: [
    'Landing pages',
    'Corporate websites',
    'Ecommerce',
    'Tailor-made design',
    'Custom software',
    'Digital marketing',
  ],
  unico: {
    titulo: { normal: 'Your business is one of a kind,', acento: 'so is your website.' },
    texto:
      "We design and build tailor-made landing pages, corporate websites and online stores, aligned with your brand and your goals. And we leave them running on their own, even when you're away.",
    items: [
      {
        titulo: 'WhatsApp customer service',
        descripcion:
          'Your customers ask and get an instant answer. When a decision is needed, the conversation comes to you.',
      },
      {
        titulo: 'No inquiry gets lost',
        descripcion:
          'Whoever writes to you gets a reply within seconds, at any hour. Follow-up is handled by a person on our team.',
      },
      {
        titulo: 'Your customers, organized',
        descripcion:
          'Every inquiry is saved in one place, with its status, so you can see where your sales come from.',
      },
      {
        titulo: 'Appointment booking',
        descripcion:
          'Customers book according to your real availability and get a reminder before they arrive.',
      },
      {
        titulo: 'Your store, up to date',
        descripcion:
          'Order confirmations, shipping updates and stock alerts go out on their own, with no manual copying.',
      },
      {
        titulo: 'Customers who come back',
        descripcion:
          'Follow-up emails that keep the conversation going, written in your voice and reviewed before they go out.',
      },
      {
        titulo: 'Content always ready',
        descripcion:
          'Posts and copy for your social media, produced fast and approved by a person before publishing.',
      },
    ],
    delegar: {
      titulo: 'Hand it off, done',
      texto:
        'We set everything up on your own accounts and take care of maintaining it. You get back to your business.',
      cta: 'I want to hand it off',
    },
    alt: 'Tailor-made architecture website, on desktop and phone',
  },
  web: {
    titulo: { normal: 'A website that lives up', acento: 'to your digital business' },
    bajada:
      "Not every business needs the same thing. We find the format that best connects your brand with its next customer.",
    servicios: [
      {
        numero: '01',
        titulo: 'Landing page',
        bajada: 'One goal. All the attention.',
        descripcion: 'A page focused on presenting your offer and turning interest into inquiries.',
        puntos: [
          'Ideal for campaigns and services',
          'Clear message and calls to action',
          'Simple, direct contact',
        ],
        cta: 'I want a landing page',
      },
      {
        numero: '02',
        titulo: 'Corporate website',
        bajada: 'Trust from the first click.',
        descripcion:
          'A site that introduces your company, explains what you do and showcases your value proposition.',
        puntos: [
          'Clearly organized services',
          'Consistent visual identity',
          'A structure that grows with you',
        ],
        cta: 'I want my website',
        destacado: true,
        etiqueta: 'YOUR BRAND, BIG',
      },
      {
        numero: '03',
        titulo: 'Ecommerce',
        bajada: 'Your storefront, open to the world.',
        descripcion: 'An online store designed to showcase your products and make buying easy.',
        puntos: [
          'Easy-to-browse catalog',
          'Clear cart and checkout',
          'Payments and shipping that fit your operation',
        ],
        cta: 'I want my online store',
        simbolo: '+',
      },
    ],
    enCadaRotulo: 'In every project',
    enCada: ['Mobile-friendly design', 'Intuitive navigation', 'Your own identity', 'Sales-driven approach'],
  },
  software: {
    rotulo: 'SOFTWARE DEVELOPMENT',
    titulo: { normal: 'The way you work,', acento: 'turned into software' },
    texto:
      'Our team of software engineers builds custom applications and systems to connect, automate and simplify your operation.',
    modulos: [
      'Custom apps',
      'CRM',
      'WMS · warehouses',
      'TMS · transport',
      'Custom management',
      'Control & security',
    ],
    cta: "Let's talk about your project",
    alt: 'Custom management dashboard connected to a mobile app, CRM, WMS, TMS and security control',
  },
  industrias: {
    rotulo: 'TECHNOLOGY FOR EVERY INDUSTRY',
    items: ['Logistics', 'Retail', 'Mining', 'Security', 'Healthcare'],
  },
  marketing: {
    rotulo: 'DIGITAL MARKETING',
    titulo: 'Design that attracts.',
    tituloAcento: 'Communication that connects',
    texto:
      'We combine creativity and strategy to grow your community, bring visitors to your website and turn interest into opportunities.',
    servicios: [
      {
        icono: 'pluma',
        titulo: 'Creative design',
        descripcion: 'Visual identity and pieces that make your brand stand out.',
      },
      {
        icono: 'chat',
        titulo: 'Social media',
        descripcion: 'Management and communication to build a community.',
      },
      {
        icono: 'megafono',
        titulo: 'Ad campaigns',
        descripcion: 'Meta and Google ads to reach your audience.',
      },
      {
        icono: 'lupa',
        titulo: 'SEO & web content',
        descripcion: 'Improve your visibility on search engines.',
      },
      {
        icono: 'sobre',
        titulo: 'Email & remarketing',
        descripcion: 'Reconnect with contacts and create new opportunities.',
      },
      {
        icono: 'barras',
        titulo: 'Analytics & optimization',
        descripcion: 'We measure results to improve your strategy.',
      },
    ],
    pie: 'Your brand, with a voice and an image of its own.',
    alt: 'Campaign and social media pieces designed for a brand, on tablet and phone',
  },
  fotos: [
    'Phone showing social media apps',
    'Photo retouching of a product shoot on a laptop',
    'Designer working on logo proposals',
  ],
  banda: 'We round out your digital presence with design and content that speak the same language.',
  cifras: [
    { valor: '0 %', texto: 'Of what we publish goes out without a person reviewing it', destacada: true },
    { valor: '$0', texto: 'In monthly subscriptions: your website and tools are yours' },
    { valor: '1', texto: 'Person in charge of your project, always the same one' },
    { valor: '< 12 h', texto: 'To answer any inquiry, at any time, any day' },
  ],
  criterio: {
    rotulo: 'TECHNOLOGY WITH JUDGMENT',
    titulo: 'Nothing goes out without a person reviewing it.',
    texto:
      "We use tools to work faster, not to replace judgment. We tell you what runs on its own, what we review ourselves and who's accountable for each delivery.",
    nosEncargamosTitulo: 'WHAT WE TAKE CARE OF',
    nosEncargamos: [
      'Keeping your website up and updated',
      'Instant replies, confirmations and reminders',
      'Logging and organizing every inquiry',
      'Producing content for your social media',
      'The reports you used to build by hand',
    ],
    humanoTitulo: 'WHAT WE NEVER LEAVE TO A MACHINE',
    humano: [
      'A complaint or a sensitive conversation',
      'Prices, discounts and commitments to your customers',
      'Publishing anything without your approval',
      "Your brand's design and strategy",
      "Sharing your business's data with third parties",
    ],
  },
  proyectos: {
    titulo: 'Delivered projects.',
    bajada: 'Websites running today and brands already out in the street. Go ahead and take a look.',
    lista: proyectos(
      [
        {
          rotulo: 'MARKETPLACE · DELIVERED',
          descripcion:
            'A platform to find the right truck: catalog with search by make and year, vehicle pages and inquiries that reach the seller already organized.',
        },
        {
          rotulo: 'OUTDOOR ADVERTISING · 2022',
          descripcion: 'Advertising photomontage for the Mercado Mersan warehouses in Lo Espejo, Santiago.',
        },
        {
          rotulo: 'PACKAGING · 2022',
          descripcion: 'Packaging prototype design for a cereal bar, with product photography.',
        },
        {
          rotulo: 'BRAND IDENTITY · 2021',
          descripcion: 'Logo for Consultora KO, a commercial planning and management consultancy.',
        },
      ],
      'View on Instagram'
    ),
  },
  faq: {
    rotulo: 'FAQ',
    titulo: 'What people ask us before getting started.',
    preguntas: [
      {
        pregunta: 'How fast do you reply to an inquiry?',
        respuesta:
          'In under 12 hours, any day of the week, at any time. A person on our team replies, not an automated message.',
      },
      {
        pregunta: 'Is there a monthly subscription?',
        respuesta:
          "No. At Ojos Publicitarios your website and tools are registered in your business's name: we don't charge a monthly fee to let you use what's already yours.",
      },
      {
        pregunta: 'What kind of website does my business need?',
        respuesta:
          'A landing page if you have a single offer and want to receive inquiries; a corporate website if you need to present several services and build trust; an ecommerce store if you sell products and want to take payments online.',
      },
      {
        pregunta: 'Do you build custom software?',
        respuesta:
          'Yes. Our engineering team builds custom applications and systems —CRM, warehouse management (WMS), transport management (TMS), dashboards and mobile apps— for companies in logistics, retail, mining, security and healthcare.',
      },
      {
        pregunta: 'What does your digital marketing service include?',
        respuesta:
          'Creative design and visual identity, social media management, Meta and Google ad campaigns, SEO and web content, email and remarketing, and analytics to measure and improve results. You can hire it together with your website or on its own.',
      },
      {
        pregunta: "What if my business has nothing yet, no website and no social media?",
        respuesta:
          "That's where we start. We define which format best connects your brand with its next customer and build the minimum that works, instead of everything at once.",
      },
      {
        pregunta: 'Does automated customer service replace a person?',
        respuesta:
          'No. We automate what repeats and has a single right answer: opening hours, list prices, confirmations and bookings. Nothing is published or answered on your behalf without a person reviewing it.',
      },
      {
        pregunta: 'Who is in charge of my project?',
        respuesta:
          'One person, always the same one, from start to finish. No tickets or generic answers: you know who to write to and who reviewed your website.',
      },
      {
        pregunta: 'Where are you based?',
        respuesta:
          "We're a creative and digital studio from Chile, working remotely with businesses in Chile and abroad, in Spanish and English.",
      },
    ],
  },
  proceso: {
    titulo: { normal: 'From your idea to', acento: 'your next website.' },
    bajada: 'A close-knit process, with clear decisions and your business at the center.',
    pasos: [
      {
        rotulo: '01 — WE TALK',
        titulo: 'We get to know your business.',
        descripcion: 'We define your goals, your audience and what you need to communicate.',
      },
      {
        rotulo: '02 — WE DESIGN',
        titulo: 'We give shape to your idea.',
        descripcion: 'We organize the content and create a visual proposal to review together.',
      },
      {
        rotulo: '03 — WE BUILD',
        titulo: 'We leave it up and running.',
        descripcion:
          'We develop it, connect whatever should run on its own and put in writing when a person steps in.',
      },
      {
        rotulo: '04 — WE LAUNCH',
        titulo: 'We prepare the next step.',
        descripcion:
          'We review, coordinate the launch, show you how to use it and stay with you for the first weeks.',
      },
    ],
  },
  contacto: {
    rotulo: 'YOUR NEXT PROJECT STARTS HERE',
    titulo: 'Turn your next visitor into your next',
    tituloAcento: 'customer.',
    texto:
      "Tell us what you need and let's shape your digital presence: we'll reply with a concrete plan, what it includes and what it costs.",
    cta: 'Start my request',
    whatsapp: 'Message us on WhatsApp',
  },
  respuestaPromesa: 'We reply in under 12 hours, any day.',
  whatsappMensaje: "Hi, I found you on your website and I'd like to talk about my project.",
  tagline: 'Design with vision. Communication with purpose.',
  solicitud: {
    rotulo: "LET'S TALK ABOUT YOUR IDEA",
    titulo: 'Your project, in a few words.',
    bajada:
      "Tell us what you need. We'll reply with a concrete plan: what it includes, what we take care of and what it costs.",
    error: "We couldn't send your request. Please try again in a few seconds.",
    exito: 'We got your request.',
    asunto: 'New request (EN) — Ojos Publicitarios',
    nombre: 'Your name',
    nombrePh: "What's your name?",
    email: 'Your email',
    emailPh: 'So we can reply',
    telefono: 'Phone or WhatsApp',
    empresa: 'Company or brand',
    empresaPh: 'Your business name',
    opcional: '(optional)',
    tipo: 'What do you need?',
    tipos: [
      'Corporate website',
      'Landing page',
      'Ecommerce',
      'Custom software',
      'Digital marketing',
      'Automation & customer service',
      "I'm not sure yet",
    ],
    idea: 'Tell us your idea',
    ideaPh: 'What do you sell and what would you like to achieve?',
    enviar: 'Send request',
    enviando: 'Sending…',
    cerrar: 'Close',
    errorNombre: 'Please enter your name.',
    errorEmail: "Check your email: it doesn't look like a valid address.",
  },
};

export const HOME: Record<Idioma, ContenidoHome> = { es, en };
