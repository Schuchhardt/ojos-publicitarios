// Qué busca el blog automático y para quién escribe. Lo que más conviene
// ajustar con el tiempo vive acá: las semillas de búsqueda y el lector.

/** Lector de las notas. Claude elige keywords y escribe pensando en él. */
export const BUYER_PERSONA = `
Dueños y gerentes de pequeñas y medianas empresas, idealmente en Estados Unidos
(también negocios hispanos en EE.UU. y empresas de Latinoamérica), que recién
se están llevando su negocio a lo digital. Hoy no tienen página web o tienen una
vieja, manejan las redes a mano o no las manejan, y hacen a mano tareas
repetitivas (responder las mismas consultas, agendar, cotizar, pasar datos de un
lado a otro). No son técnicos: quieren saber qué necesitan, cuánto les va a
costar más o menos y en quién confiar. Están cerca de contratar a alguien.
`.trim();

/** Lo que se puede decir del estudio. Claude no debe inventar nada fuera de esto. */
export const ESTUDIO = `
Ojos Publicitarios es un estudio creativo y digital chileno que trabaja con
negocios de Chile y del extranjero, en español y en inglés, de forma remota.
- Diseño y desarrollo web: landing pages, sitios corporativos y tiendas online, a medida.
- Software a medida y automatizaciones: atención por WhatsApp, agenda, cotizaciones, integraciones.
- Marketing digital: manejo de redes sociales, contenido, campañas y SEO.
- Sitios web y software sin suscripciones mensuales obligatorias: quedan a nombre del cliente.
  (El manejo de redes sí es un servicio mensual; las cuentas también quedan a nombre del cliente.)
- Responde en menos de 12 horas.
No publica precios: cada proyecto se cotiza.
`.trim();

/** Páginas del sitio a las que una nota puede enlazar, por idioma. */
export const ENLACES_INTERNOS = {
  es: {
    'Diseño web': '/servicios/diseno-web/',
    'Software a medida y automatización': '/servicios/desarrollo-de-software/',
    'Marketing digital y redes sociales': '/servicios/marketing-digital/',
    'Cotizar un proyecto': '/#contacto',
  },
  en: {
    'Web design': '/servicios/diseno-web/?lang=en',
    'Custom software & automation': '/servicios/desarrollo-de-software/?lang=en',
    'Digital marketing & social media': '/servicios/marketing-digital/?lang=en',
    'Get a quote': '/?lang=en#contacto',
  },
} as const;

/**
 * Semillas para el autocompletado de Google. Cada una se expande con
 * prefijos de pregunta, así que conviene que sean cortas y amplias.
 */
export const SEMILLAS = {
  en: [
    'small business website',
    'website for small business',
    'website design cost',
    'social media management for small business',
    'social media marketing for small business',
    'business automation',
    'automate small business',
    'whatsapp business automation',
    'online presence for small business',
    'take my business online',
    'landing page for business',
    'ecommerce website for small business',
    'hire web designer',
    'hire social media manager',
  ],
  es: [
    'página web para negocio',
    'página web para mi empresa',
    'cuánto cuesta una página web',
    'manejo de redes sociales para empresas',
    'community manager para negocio',
    'automatizar mi negocio',
    'automatizar whatsapp negocio',
    'tienda online para mi negocio',
    'marketing digital para pequeñas empresas',
    'digitalizar mi negocio',
  ],
};

/** Prefijos que convierten una semilla en preguntas reales. */
export const PREFIJOS = {
  en: ['', 'how to ', 'how much ', 'best ', 'do i need ', 'what is '],
  es: ['', 'cómo ', 'cuánto ', 'qué ', 'necesito '],
};
