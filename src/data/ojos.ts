// Home del sitio (diseño "Rediseño Ojos Publicitarios"). Copy en los
// dos idiomas con la misma forma: el selector ES / EN la cambia en el navegador.

export type Idioma = 'es' | 'en';

/** Claves de las imágenes; cada página las resuelve a URLs optimizadas. */
export type ClaveImagen =
  | 'forma'
  | 'software'
  | 'marketing'
  | 'chile'
  | 'mersan'
  | 'energy'
  | 'ko';

export const ARCHIVOS_IMAGEN: Record<ClaveImagen, string> = {
  forma: 'web/forma.jpg',
  software: 'web/software.jpg',
  marketing: 'web/marketing.jpg',
  chile: 'chilecamiones.png',
  mersan: 'proyectos/mersan.jpg',
  energy: 'proyectos/energy.jpg',
  ko: 'proyectos/consultora-ko.jpg',
};

export type Imagenes = Record<ClaveImagen, string>;

interface Item {
  t: string;
  s: string;
  d: string;
}

interface Servicio {
  title: string;
  img: ClaveImagen;
  lead: string;
  tagsLabel: string;
  tags: string[];
  cta: string;
  items: Item[];
}

export interface CopyHome {
  navTag: string;
  navCta: string;
  nav: { l: string; h: string }[];
  heroLoc: string;
  heroAvail: string;
  heroA: string;
  heroB: string;
  heroC: string;
  heroSub: string;
  heroCta: string;
  marquee: string[];
  manLabel: string;
  /** Las palabras entre asteriscos van en cursiva y con acento. */
  manifesto: string;
  svcLabel: string;
  svcTitle: string;
  svcIntro: string;
  open: string;
  close: string;
  services: Servicio[];
  autoLabel: string;
  autoTitleA: string;
  autoTitleB: string;
  autoSub: string;
  autoCta: string;
  auto: { t: string; d: string }[];
  stats: { v: string; l: string }[];
  critLabel: string;
  critA: string;
  critB: string;
  critSub: string;
  critL: string;
  critLi: string[];
  critR: string;
  critRi: string[];
  projLabel: string;
  projTitle: string;
  caseCursor: string;
  projEndA: string;
  projEndB: string;
  procLabel: string;
  procTitle: string;
  procSub: string;
  steps: { k: string; t: string; d: string }[];
  faqLabel: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctLabel: string;
  ctA: string;
  ctB: string;
  ctSub: string;
  ctNote: string;
  fName: string;
  fEmail: string;
  fNeed: string;
  fMsg: string;
  fSend: string;
  fSending: string;
  fError: string;
  needs: string[];
  sentT: string;
  sentD: string;
  footTag: string;
  eyeLabel: string;
}

export const HOME_OJOS: Record<Idioma, CopyHome> = {
  es: {
    navTag: 'Estudio creativo & digital',
    navCta: 'Hablemos ↗',
    nav: [
      { l: 'Servicios', h: '#servicios' },
      { l: 'Proyectos', h: '#proyectos' },
      { l: 'Proceso', h: '#proceso' },
      { l: 'FAQ', h: '#faq' },
    ],
    heroLoc: 'Santiago, Chile',
    heroAvail: 'Respondemos en menos de 12 h',
    heroA: 'Tu negocio,',
    heroB: 'en su mejor versión',
    heroC: 'digital.',
    heroSub:
      'Sitios web, software a medida y marketing digital. Lo dejamos funcionando y todo queda a tu nombre, sin mensualidades.',
    heroCta: 'Quiero mi nueva web',
    marquee: ['Landing pages', 'Sitios corporativos', 'Ecommerce', 'Software a medida', 'Marketing digital', 'Automatizaciones'],
    manLabel: '(01) Manifiesto',
    manifesto:
      'Miramos tu negocio con *otros ojos.* Diseñamos sitios, construimos software y movemos marcas. Después lo dejamos *funcionando solo,* sobre tus propias cuentas, aunque tú no estés.',
    svcLabel: '(02) Servicios',
    svcTitle: 'Tres disciplinas, un mismo equipo.',
    svcIntro: 'Elige por dónde empezar. Cada servicio funciona por separado o conectado con los otros dos.',
    open: 'Abrir',
    close: 'Cerrar',
    services: [
      {
        title: 'Diseño web',
        img: 'forma',
        lead: 'Landing pages, sitios corporativos y tiendas online hechos a la medida de tu marca y tus objetivos.',
        tagsLabel: 'En cada proyecto',
        tags: ['Adaptable a móviles', 'Navegación intuitiva', 'Identidad propia', 'Enfoque comercial'],
        cta: 'Quiero mi sitio web ↗',
        items: [
          { t: 'Landing page', s: 'Un objetivo. Toda la atención.', d: 'Una página enfocada en presentar tu oferta y convertir el interés en consultas.' },
          { t: 'Sitio corporativo', s: 'Confianza desde el primer clic.', d: 'Presenta tu empresa, explica lo que haces y da espacio a tu propuesta de valor.' },
          { t: 'Ecommerce', s: 'Tu vitrina, abierta al mundo.', d: 'Catálogo fácil de explorar, una compra clara y pagos y envíos según tu operación.' },
        ],
      },
      {
        title: 'Software',
        img: 'software',
        lead: 'Ingenieros de software que convierten tu forma de trabajar en aplicaciones y sistemas que conectan, automatizan y simplifican tu operación.',
        tagsLabel: 'Industrias',
        tags: ['Logística', 'Comercio', 'Minería', 'Seguridad', 'Salud'],
        cta: 'Hablemos de tu proyecto ↗',
        items: [
          { t: 'Apps a medida', s: '', d: 'Web y móvil, hechas para cómo trabaja tu equipo.' },
          { t: 'CRM', s: '', d: 'Cada cliente y cada consulta, en un solo lugar.' },
          { t: 'WMS · bodegas', s: '', d: 'Inventario y movimientos de bodega bajo control.' },
          { t: 'TMS · transporte', s: '', d: 'Rutas, despachos y flota coordinados.' },
          { t: 'Gestión y control', s: '', d: 'Paneles a medida, accesos y seguridad de tu operación.' },
        ],
      },
      {
        title: 'Marketing',
        img: 'marketing',
        lead: 'Creatividad y estrategia para hacer crecer tu comunidad, llevar visitas a tu web y transformar el interés en oportunidades.',
        tagsLabel: 'Canales',
        tags: ['Meta', 'Google', 'Instagram', 'Email'],
        cta: 'Quiero hacer crecer mi marca ↗',
        items: [
          { t: 'Diseño creativo', s: '', d: 'Identidad visual y piezas que hacen destacar tu marca.' },
          { t: 'Redes sociales', s: '', d: 'Gestión y comunicación para construir comunidad.' },
          { t: 'Campañas', s: '', d: 'Anuncios en Meta y Google para llegar a tu público.' },
          { t: 'SEO y contenido', s: '', d: 'Más visibilidad en los buscadores.' },
          { t: 'Email y remarketing', s: '', d: 'Retoma el contacto y genera nuevas oportunidades.' },
          { t: 'Analítica', s: '', d: 'Medimos resultados para mejorar tu estrategia.' },
        ],
      },
    ],
    autoLabel: '(03) Automatización',
    autoTitleA: 'Delegas',
    autoTitleB: 'y listo.',
    autoSub: 'Lo dejamos armado sobre tus propias cuentas y nos encargamos de mantenerlo. Tú vuelves a tu negocio.',
    autoCta: 'Quiero delegarlo ↗',
    auto: [
      { t: 'Atención por WhatsApp', d: 'Tus clientes preguntan y reciben respuesta al instante. Cuando hay que decidir algo, la conversación llega a ti.' },
      { t: 'Ninguna consulta se pierde', d: 'Respuesta en segundos, a cualquier hora. El seguimiento lo hace una persona del equipo.' },
      { t: 'Tus clientes, ordenados', d: 'Cada consulta queda en un solo lugar, con su estado, para que veas de dónde vienen tus ventas.' },
      { t: 'Agendamiento de citas', d: 'Reservas según tu disponibilidad real y recordatorio antes de llegar.' },
      { t: 'Tu tienda al día', d: 'Confirmaciones, estados de envío y avisos de stock salen solos.' },
      { t: 'Clientes que vuelven', d: 'Correos de seguimiento con tu tono, revisados antes de salir.' },
      { t: 'Contenido siempre listo', d: 'Piezas y textos para tus redes, aprobados por una persona antes de publicarse.' },
    ],
    stats: [
      { v: '0%', l: 'de lo que publicamos sale sin que una persona lo revise.' },
      { v: '$0', l: 'en suscripciones mensuales. Tu sitio y tus herramientas son tuyos.' },
      { v: '1', l: 'persona a cargo de tu proyecto, siempre la misma.' },
      { v: '<12h', l: 'para responder cualquier consulta, cualquier día.' },
    ],
    critLabel: '(04) Criterio',
    critA: 'Nada sale sin que',
    critB: 'una persona lo revise.',
    critSub:
      'Usamos herramientas para trabajar más rápido, no para reemplazar el criterio. Te decimos qué funciona solo, qué revisamos nosotros y quién responde por cada entrega.',
    critL: 'De esto nos encargamos',
    critLi: [
      'Que tu sitio esté siempre arriba y actualizado',
      'Respuestas inmediatas, confirmaciones y recordatorios',
      'El registro y orden de cada consulta',
      'La producción de contenido para tus redes',
      'Los reportes que antes armabas a mano',
    ],
    critR: 'Esto no lo deja una máquina',
    critRi: [
      'Un reclamo o una conversación delicada',
      'Precios, descuentos y compromisos con tus clientes',
      'Publicar algo sin tu aprobación',
      'El diseño y la estrategia de tu marca',
      'Entregar los datos de tu negocio a terceros',
    ],
    projLabel: '(05) Proyectos',
    projTitle: 'Entregados y en la calle.',
    caseCursor: 'Ver caso',
    projEndA: '¿El próximo',
    projEndB: 'es el tuyo?',
    procLabel: '(06) Proceso',
    procTitle: 'De tu idea a tu próxima web.',
    procSub: 'Un proceso cercano, con decisiones claras y tu negocio en el centro.',
    steps: [
      { k: 'Conversamos', t: 'Entendemos tu negocio.', d: 'Definimos tus objetivos, tu público y lo que necesitas comunicar.' },
      { k: 'Diseñamos', t: 'Le damos forma a tu idea.', d: 'Organizamos el contenido y creamos una propuesta visual para revisar contigo.' },
      { k: 'Construimos', t: 'Lo dejamos funcionando.', d: 'Desarrollamos, conectamos lo que debe responder solo y dejamos por escrito cuándo entra una persona.' },
      { k: 'Lanzamos', t: 'Preparamos el siguiente paso.', d: 'Publicamos, te enseñamos a usarlo y te acompañamos las primeras semanas.' },
    ],
    faqLabel: '(07) Preguntas',
    faqTitle: 'Lo que nos preguntan antes de empezar.',
    faq: [
      { q: '¿Hay que pagar una suscripción mensual?', a: 'No. El sitio y las herramientas quedan a nombre de tu negocio: no cobramos una mensualidad por usar lo que ya es tuyo.' },
      { q: '¿Qué tipo de sitio necesito?', a: 'Una landing page si tienes una sola oferta; un sitio corporativo si presentas varios servicios; un ecommerce si vendes productos y quieres cobrar en línea.' },
      { q: '¿Desarrollan software a medida?', a: 'Sí. CRM, gestión de bodegas (WMS), transporte (TMS), paneles de gestión y apps móviles para logística, comercio, minería, seguridad y salud.' },
      { q: '¿La atención automática reemplaza a una persona?', a: 'No. Automatizamos lo repetitivo: horarios, precios de lista, confirmaciones y agendamiento. Nada se publica ni se responde en tu nombre sin revisión.' },
      { q: '¿Quién queda a cargo de mi proyecto?', a: 'Una sola persona, siempre la misma, de principio a fin. Sin tickets ni respuestas genéricas.' },
      { q: '¿Dónde trabajan?', a: 'Somos un estudio chileno. Trabajamos de forma remota con negocios de todo Chile y del extranjero, en español e inglés.' },
    ],
    ctLabel: '(08) Contacto',
    ctA: 'Que tu próxima visita sea tu',
    ctB: 'próximo cliente.',
    ctSub: 'Cuéntanos qué necesitas. Te respondemos con un plan concreto: qué incluye, de qué nos encargamos y cuánto cuesta.',
    ctNote: 'Respondemos en menos de 12 horas, cualquier día.',
    fName: 'Tu nombre',
    fEmail: 'Tu correo',
    fNeed: '¿Qué necesitas?',
    fMsg: 'Cuéntanos tu idea',
    fSend: 'Enviar solicitud ↗',
    fSending: 'Enviando…',
    fError: 'No pudimos enviarlo. Escríbenos por WhatsApp o al correo.',
    needs: ['Sitio corporativo', 'Landing page', 'Ecommerce', 'Software', 'Marketing digital', 'Automatizaciones', 'Aún no lo sé'],
    sentT: 'Recibimos tu solicitud.',
    sentD: 'Te respondemos en menos de 12 horas.',
    footTag: 'Diseño con visión. Comunicación con propósito.',
    eyeLabel: 'Cambiar color',
  },
  en: {
    navTag: 'Creative & digital studio',
    navCta: "Let's talk ↗",
    nav: [
      { l: 'Services', h: '#servicios' },
      { l: 'Work', h: '#proyectos' },
      { l: 'Process', h: '#proceso' },
      { l: 'FAQ', h: '#faq' },
    ],
    heroLoc: 'Santiago, Chile',
    heroAvail: 'We reply in under 12 h',
    heroA: 'Your business,',
    heroB: 'at its best',
    heroC: 'online.',
    heroSub:
      'Websites, custom software and digital marketing. We leave it running and everything stays in your name, with no monthly fees.',
    heroCta: 'I want a new site',
    marquee: ['Landing pages', 'Corporate sites', 'Ecommerce', 'Custom software', 'Digital marketing', 'Automation'],
    manLabel: '(01) Manifesto',
    manifesto:
      'We look at your business with *different eyes.* We design sites, build software and move brands. Then we leave it *running on its own,* on your own accounts, even when you are away.',
    svcLabel: '(02) Services',
    svcTitle: 'Three disciplines, one team.',
    svcIntro: 'Pick where to start. Each service works on its own or connected to the other two.',
    open: 'Open',
    close: 'Close',
    services: [
      {
        title: 'Web design',
        img: 'forma',
        lead: 'Landing pages, corporate sites and online stores built around your brand and your goals.',
        tagsLabel: 'In every project',
        tags: ['Mobile-first', 'Intuitive navigation', 'Own identity', 'Sales focus'],
        cta: 'I want my website ↗',
        items: [
          { t: 'Landing page', s: 'One goal. Full attention.', d: 'A page focused on presenting your offer and turning interest into enquiries.' },
          { t: 'Corporate site', s: 'Trust from the first click.', d: 'Presents your company, explains what you do and makes room for your value proposition.' },
          { t: 'Ecommerce', s: 'Your storefront, open to the world.', d: 'An easy-to-browse catalog, clear checkout, and payments and shipping that fit your operation.' },
        ],
      },
      {
        title: 'Software',
        img: 'software',
        lead: 'Software engineers who turn the way you work into apps and systems that connect, automate and simplify your operation.',
        tagsLabel: 'Industries',
        tags: ['Logistics', 'Retail', 'Mining', 'Security', 'Health'],
        cta: "Let's talk about your project ↗",
        items: [
          { t: 'Custom apps', s: '', d: 'Web and mobile, built around how your team works.' },
          { t: 'CRM', s: '', d: 'Every client and every enquiry, in one place.' },
          { t: 'WMS · warehouses', s: '', d: 'Inventory and warehouse movements under control.' },
          { t: 'TMS · transport', s: '', d: 'Routes, dispatch and fleet, coordinated.' },
          { t: 'Management & control', s: '', d: 'Custom dashboards, access and security for your operation.' },
        ],
      },
      {
        title: 'Marketing',
        img: 'marketing',
        lead: 'Creativity and strategy to grow your community, drive visits to your site and turn interest into opportunities.',
        tagsLabel: 'Channels',
        tags: ['Meta', 'Google', 'Instagram', 'Email'],
        cta: 'I want to grow my brand ↗',
        items: [
          { t: 'Creative design', s: '', d: 'Visual identity and pieces that make your brand stand out.' },
          { t: 'Social media', s: '', d: 'Management and communication that build community.' },
          { t: 'Campaigns', s: '', d: 'Meta and Google ads that reach your audience.' },
          { t: 'SEO & content', s: '', d: 'More visibility on search engines.' },
          { t: 'Email & remarketing', s: '', d: 'Reconnect and create new opportunities.' },
          { t: 'Analytics', s: '', d: 'We measure results to improve your strategy.' },
        ],
      },
    ],
    autoLabel: '(03) Automation',
    autoTitleA: 'Delegate',
    autoTitleB: 'and done.',
    autoSub: 'We set everything up on your own accounts and take care of maintaining it. You get back to your business.',
    autoCta: 'I want to delegate ↗',
    auto: [
      { t: 'WhatsApp support', d: 'Your clients ask and get answers instantly. When a decision is needed, the conversation comes to you.' },
      { t: 'No enquiry gets lost', d: 'A reply within seconds, any time. Follow-up is done by a person on the team.' },
      { t: 'Your clients, organised', d: 'Every enquiry in one place, with its status, so you can see where sales come from.' },
      { t: 'Appointment booking', d: 'Bookings based on your real availability, with a reminder before they arrive.' },
      { t: 'Your store, up to date', d: 'Confirmations, shipping updates and stock alerts go out on their own.' },
      { t: 'Clients who come back', d: 'Follow-up emails in your voice, reviewed before they go out.' },
      { t: 'Content always ready', d: 'Posts and copy for your socials, approved by a person before publishing.' },
    ],
    stats: [
      { v: '0%', l: 'of what we publish goes out without a person reviewing it.' },
      { v: '$0', l: 'in monthly subscriptions. Your site and tools are yours.' },
      { v: '1', l: 'person in charge of your project, always the same one.' },
      { v: '<12h', l: 'to answer any enquiry, any day.' },
    ],
    critLabel: '(04) Judgement',
    critA: 'Nothing ships until',
    critB: 'a person reviews it.',
    critSub:
      "We use tools to work faster, not to replace judgement. We tell you what runs on its own, what we review, and who's accountable for each delivery.",
    critL: 'We take care of',
    critLi: [
      'Keeping your site always up and current',
      'Instant replies, confirmations and reminders',
      'Logging and organising every enquiry',
      'Producing content for your socials',
      'The reports you used to build by hand',
    ],
    critR: 'Never left to a machine',
    critRi: [
      'A complaint or a sensitive conversation',
      'Prices, discounts and commitments to clients',
      'Publishing anything without your approval',
      'Your brand design and strategy',
      'Handing your business data to third parties',
    ],
    projLabel: '(05) Work',
    projTitle: 'Delivered and out in the world.',
    caseCursor: 'View case',
    projEndA: 'Is the next one',
    projEndB: 'yours?',
    procLabel: '(06) Process',
    procTitle: 'From your idea to your next site.',
    procSub: 'A close process, with clear decisions and your business at the centre.',
    steps: [
      { k: 'We talk', t: 'We understand your business.', d: 'We define your goals, your audience and what you need to communicate.' },
      { k: 'We design', t: 'We shape your idea.', d: 'We organise the content and create a visual proposal to review with you.' },
      { k: 'We build', t: 'We leave it running.', d: 'We develop, connect what should respond on its own, and document when a person steps in.' },
      { k: 'We launch', t: 'We prepare the next step.', d: 'We publish, teach you how to use it and stay with you for the first weeks.' },
    ],
    faqLabel: '(07) Questions',
    faqTitle: 'What people ask before we start.',
    faq: [
      { q: 'Is there a monthly subscription?', a: "No. The site and tools are registered to your business: we don't charge a monthly fee to use what's already yours." },
      { q: 'What kind of site do I need?', a: 'A landing page for a single offer; a corporate site to present several services; an ecommerce if you sell products and want to take payments online.' },
      { q: 'Do you build custom software?', a: 'Yes. CRM, warehouse management (WMS), transport (TMS), dashboards and mobile apps for logistics, retail, mining, security and health.' },
      { q: 'Does automated support replace a person?', a: 'No. We automate the repetitive: hours, list prices, confirmations and booking. Nothing is published or answered in your name without review.' },
      { q: 'Who is in charge of my project?', a: 'One person, always the same, from start to finish. No tickets, no generic replies.' },
      { q: 'Where are you based?', a: "We're a Chilean studio. We work remotely with businesses across Chile and abroad, in Spanish and English." },
    ],
    ctLabel: '(08) Contact',
    ctA: 'Make your next visitor your',
    ctB: 'next client.',
    ctSub: "Tell us what you need. We'll reply with a concrete plan: what's included, what we take care of and what it costs.",
    ctNote: 'We reply in under 12 hours, any day.',
    fName: 'Your name',
    fEmail: 'Your email',
    fNeed: 'What do you need?',
    fMsg: 'Tell us your idea',
    fSend: 'Send request ↗',
    fSending: 'Sending…',
    fError: "We couldn't send it. Reach us on WhatsApp or by email.",
    needs: ['Corporate site', 'Landing page', 'Ecommerce', 'Software', 'Digital marketing', 'Automation', 'Not sure yet'],
    sentT: 'Request received.',
    sentD: "We'll reply in under 12 hours.",
    footTag: 'Design with vision. Communication with purpose.',
    eyeLabel: 'Switch color',
  },
};

// ---------------------------------------------------------------------------
// Casos: una página por proyecto en /proyectos/<slug>/.
// ---------------------------------------------------------------------------

interface CopyCaso {
  cat: string;
  /** Descripción corta: tarjeta del home y meta description. */
  desc: string;
  introA: string;
  introB: string;
  meta: { k: string; v: string }[];
  blocks: { k: string; t: string; d: string }[];
  features: { t: string; d: string }[];
  ph: [string, string, string];
}

export interface Caso {
  slug: string;
  title: string;
  img: ClaveImagen;
  /** Enlace de cierre: el sitio en línea o la publicación en Instagram. */
  visit: { href: string; label: string };
  copy: Record<Idioma, CopyCaso>;
}

export const CASOS: Caso[] = [
  {
    slug: 'chilecamiones',
    title: 'Chilecamiones',
    img: 'chile',
    visit: { href: 'https://chilecamiones.cl', label: 'chilecamiones.cl' },
    copy: {
      es: {
        cat: 'Marketplace · Entregado',
        desc: 'Plataforma para encontrar el camión correcto: buscador por marca y año, fichas de vehículo y consultas ordenadas para el vendedor.',
        introA: 'Una plataforma para encontrar',
        introB: 'el camión correcto.',
        meta: [
          { k: 'Cliente', v: 'Chilecamiones' },
          { k: 'Servicios', v: 'Diseño web, desarrollo' },
          { k: 'Formato', v: 'Marketplace' },
          { k: 'Estado', v: 'En línea' },
        ],
        blocks: [
          { k: 'El desafío', t: 'Muchos vehículos, pocas formas de encontrarlos.', d: 'Comprar un camión exige comparar marca, año y especificaciones. El sitio tenía que ordenar ese catálogo y conectar al comprador con el vendedor sin fricción.' },
          { k: 'Lo que hicimos', t: 'Un catálogo que se recorre solo.', d: 'Diseñamos y desarrollamos un marketplace con buscador, fichas detalladas por vehículo y un flujo de consultas que llega ordenado al vendedor.' },
        ],
        features: [
          { t: 'Buscador por marca y año', d: 'Filtros directos para llegar al vehículo correcto en pocos pasos.' },
          { t: 'Fichas de vehículo', d: 'Fotos, especificaciones y precio en una página clara, también en móvil.' },
          { t: 'Consultas ordenadas', d: 'Cada interesado llega al vendedor con el vehículo y sus datos ya identificados.' },
        ],
        ph: ['captura — buscador', 'captura — ficha en móvil', 'captura — panel de consultas'],
      },
      en: {
        cat: 'Marketplace · Delivered',
        desc: 'A platform to find the right truck: search by make and year, vehicle pages and enquiries delivered organised to the seller.',
        introA: 'A platform to find',
        introB: 'the right truck.',
        meta: [
          { k: 'Client', v: 'Chilecamiones' },
          { k: 'Services', v: 'Web design, development' },
          { k: 'Format', v: 'Marketplace' },
          { k: 'Status', v: 'Live' },
        ],
        blocks: [
          { k: 'The challenge', t: 'Many vehicles, few ways to find them.', d: 'Buying a truck means comparing make, year and specs. The site had to organise that catalog and connect buyer and seller without friction.' },
          { k: 'What we did', t: 'A catalog that browses itself.', d: 'We designed and built a marketplace with search, detailed vehicle pages and an enquiry flow that reaches the seller already organised.' },
        ],
        features: [
          { t: 'Search by make and year', d: 'Direct filters to reach the right vehicle in a few steps.' },
          { t: 'Vehicle pages', d: 'Photos, specs and price on one clear page, on mobile too.' },
          { t: 'Organised enquiries', d: 'Every lead reaches the seller with the vehicle and their details already identified.' },
        ],
        ph: ['screenshot — search', 'screenshot — mobile page', 'screenshot — enquiries panel'],
      },
    },
  },
  {
    slug: 'mercado-mersan',
    title: 'Mercado Mersan',
    img: 'mersan',
    visit: { href: 'https://www.instagram.com/p/CgwvS3lOpKm/', label: 'Instagram' },
    copy: {
      es: {
        cat: 'Publicidad exterior · 2022',
        desc: 'Fotomontaje publicitario para las bodegas del Mercado Mersan, en Lo Espejo.',
        introA: 'Una fachada que se lee',
        introB: 'desde la calle.',
        meta: [
          { k: 'Cliente', v: 'Mercado Mersan' },
          { k: 'Servicios', v: 'Diseño gráfico, fotomontaje' },
          { k: 'Formato', v: 'Publicidad exterior' },
          { k: 'Año', v: '2022' },
        ],
        blocks: [
          { k: 'El desafío', t: 'Una pieza que se entienda de un vistazo.', d: 'Las bodegas del Mercado Mersan, en Lo Espejo, necesitaban publicidad que se leyera a la distancia y en movimiento, sin perder la identidad del mercado.' },
          { k: 'Lo que hicimos', t: 'El resultado, antes de imprimir.', d: 'Diseñamos la pieza y la montamos sobre fotografías de las bodegas, para revisar escala, lectura y color en su lugar real antes de producirla.' },
        ],
        features: [
          { t: 'Lectura a distancia', d: 'Mensaje corto y jerarquía clara para entenderse desde la calle.' },
          { t: 'Montaje sobre el lugar', d: 'La pieza vista sobre las bodegas, con su escala y su entorno.' },
          { t: 'Decisión sin sorpresas', d: 'El cliente aprobó el resultado final antes de invertir en la producción.' },
        ],
        ph: ['fotomontaje — fachada', 'detalle — mensaje', 'vista — desde la calle'],
      },
      en: {
        cat: 'Outdoor advertising · 2022',
        desc: 'Advertising photomontage for the Mercado Mersan warehouses in Lo Espejo.',
        introA: 'A façade you can read',
        introB: 'from the street.',
        meta: [
          { k: 'Client', v: 'Mercado Mersan' },
          { k: 'Services', v: 'Graphic design, photomontage' },
          { k: 'Format', v: 'Outdoor advertising' },
          { k: 'Year', v: '2022' },
        ],
        blocks: [
          { k: 'The challenge', t: 'A piece understood at a glance.', d: 'The Mercado Mersan warehouses in Lo Espejo needed advertising that reads from a distance and on the move, without losing the market’s identity.' },
          { k: 'What we did', t: 'The result, before printing.', d: 'We designed the piece and composited it onto photos of the warehouses, to check scale, legibility and colour in its real place before production.' },
        ],
        features: [
          { t: 'Legible from afar', d: 'A short message and a clear hierarchy, readable from the street.' },
          { t: 'Composited on site', d: 'The piece seen on the warehouses, at its real scale and surroundings.' },
          { t: 'No surprises', d: 'The client approved the final result before investing in production.' },
        ],
        ph: ['photomontage — façade', 'detail — message', 'view — from the street'],
      },
    },
  },
  {
    slug: 'energy',
    title: 'Energy',
    img: 'energy',
    visit: { href: 'https://www.instagram.com/p/Ck8SIgDORtn/', label: 'Instagram' },
    copy: {
      es: {
        cat: 'Packaging · 2022',
        desc: 'Prototipo de envase para una barra de cereal, con fotografía de producto.',
        introA: 'Un envase pensado para',
        introB: 'destacar en la góndola.',
        meta: [
          { k: 'Cliente', v: 'Energy' },
          { k: 'Servicios', v: 'Packaging, fotografía' },
          { k: 'Formato', v: 'Prototipo de envase' },
          { k: 'Año', v: '2022' },
        ],
        blocks: [
          { k: 'El desafío', t: 'Una barra de cereal entre muchas.', d: 'En el pasillo de snacks todo compite por la misma mirada. El envase tenía que contar qué es el producto y transmitir su energía en segundos.' },
          { k: 'Lo que hicimos', t: 'Del prototipo a la foto.', d: 'Diseñamos el prototipo del envase y lo fotografiamos como producto terminado, listo para presentar la marca.' },
        ],
        features: [
          { t: 'Diseño de envase', d: 'Gráfica, jerarquía y color pensados para destacar en la góndola.' },
          { t: 'Prototipo', d: 'El envase armado para evaluarlo en la mano, no solo en pantalla.' },
          { t: 'Fotografía de producto', d: 'Imágenes para presentar la marca en redes y catálogos.' },
        ],
        ph: ['envase — frente', 'envase — detalle', 'fotografía — producto'],
      },
      en: {
        cat: 'Packaging · 2022',
        desc: 'Packaging prototype for a cereal bar, with product photography.',
        introA: 'Packaging designed to',
        introB: 'stand out on the shelf.',
        meta: [
          { k: 'Client', v: 'Energy' },
          { k: 'Services', v: 'Packaging, photography' },
          { k: 'Format', v: 'Packaging prototype' },
          { k: 'Year', v: '2022' },
        ],
        blocks: [
          { k: 'The challenge', t: 'One cereal bar among many.', d: 'In the snack aisle everything competes for the same glance. The pack had to say what the product is and convey its energy in seconds.' },
          { k: 'What we did', t: 'From prototype to photo.', d: 'We designed the packaging prototype and photographed it as a finished product, ready to present the brand.' },
        ],
        features: [
          { t: 'Packaging design', d: 'Graphics, hierarchy and colour designed to stand out on the shelf.' },
          { t: 'Prototype', d: 'The pack built to be judged in the hand, not just on screen.' },
          { t: 'Product photography', d: 'Images to present the brand on social media and in catalogs.' },
        ],
        ph: ['pack — front', 'pack — detail', 'photography — product'],
      },
    },
  },
  {
    slug: 'consultora-ko',
    title: 'Consultora KO',
    img: 'ko',
    visit: { href: 'https://www.instagram.com/p/CU72lmCrcb_/', label: 'Instagram' },
    copy: {
      es: {
        cat: 'Identidad · 2021',
        desc: 'Logotipo para una asesoría en planificación y gestión comercial.',
        introA: 'Una marca para',
        introB: 'una asesoría comercial.',
        meta: [
          { k: 'Cliente', v: 'Consultora KO' },
          { k: 'Servicios', v: 'Identidad de marca' },
          { k: 'Formato', v: 'Logotipo' },
          { k: 'Año', v: '2021' },
        ],
        blocks: [
          { k: 'El desafío', t: 'Confianza antes de la primera reunión.', d: 'Una consultora en planificación y gestión comercial vende criterio. Su marca tenía que transmitir orden y seriedad desde el primer contacto.' },
          { k: 'Lo que hicimos', t: 'Un logotipo simple y firme.', d: 'Diseñamos un logotipo claro, que funciona en documentos, presentaciones y redes sin perder carácter.' },
        ],
        features: [
          { t: 'Logotipo', d: 'Una marca legible, reconocible y fácil de recordar.' },
          { t: 'Uso en distintos formatos', d: 'Funciona en grande y en pequeño, sobre fondos claros y oscuros.' },
          { t: 'Lista para usar', d: 'Para propuestas, presentaciones y perfiles en redes.' },
        ],
        ph: ['logotipo — versión principal', 'logotipo — sobre fondo oscuro', 'aplicación — presentación'],
      },
      en: {
        cat: 'Identity · 2021',
        desc: 'Logo for a commercial planning and management consultancy.',
        introA: 'A brand for',
        introB: 'a commercial consultancy.',
        meta: [
          { k: 'Client', v: 'Consultora KO' },
          { k: 'Services', v: 'Brand identity' },
          { k: 'Format', v: 'Logo' },
          { k: 'Year', v: '2021' },
        ],
        blocks: [
          { k: 'The challenge', t: 'Trust before the first meeting.', d: 'A commercial planning and management consultancy sells judgement. Its brand had to convey order and seriousness from the first contact.' },
          { k: 'What we did', t: 'A simple, solid logo.', d: 'We designed a clear logo that works on documents, presentations and social media without losing character.' },
        ],
        features: [
          { t: 'Logo', d: 'A legible, recognisable and memorable mark.' },
          { t: 'Works in every format', d: 'Holds up large and small, on light and dark backgrounds.' },
          { t: 'Ready to use', d: 'For proposals, presentations and social profiles.' },
        ],
        ph: ['logo — main version', 'logo — on dark background', 'application — presentation'],
      },
    },
  },
];

export function rutaCaso(slug: string): string {
  return `/proyectos/${slug}/`;
}
