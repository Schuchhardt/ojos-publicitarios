// Páginas de servicio en /servicios/<slug>/. Cada una cuenta una historia (la
// misma del video, cuando lo hay) con el diseño del home. Copy en los dos
// idiomas con la misma forma; el SEO de la página va en español.
import type { ClaveImagen, Idioma, SlugServicio } from './ojos';

interface CopyServicio {
  /** Nombre corto: menú, migas y enlaces. */
  nombre: string;
  /** Palabra gigante del hero. */
  palabra: string;
  heroA: string;
  heroB: string;
  heroSub: string;
  heroCta: string;
  marquee: string[];
  /** Las palabras entre asteriscos van en cursiva y con acento. */
  prologo: string;
  /** Respuesta directa, para quien llega con una pregunta (y para los asistentes). */
  corto: { q: string; a: string };
  historiaA: string;
  historiaB: string;
  capitulos: { k: string; t: string; d: string }[];
  mediaAlt: string;
  mockupAlt: string;
  incluyeTitulo: string;
  incluyeSub: string;
  formatos: { t: string; s: string; d: string }[];
  tagsLabel: string;
  tags: string[];
  extrasTitulo: string;
  extras: { t: string; d: string }[];
  stats: { v: string; l: string }[];
  procTitulo: string;
  procSub: string;
  steps: { k: string; t: string; d: string }[];
  casosTitulo: string;
  faqTitulo: string;
  faq: { q: string; a: string }[];
  cta: string;
}

export interface PaginaServicio {
  slug: SlugServicio;
  /** Material Symbols del título y de cada extra, en orden. */
  icono: string;
  iconosExtras: string[];
  /** Foto principal (hero de la historia si no hay video, parallax si lo hay). */
  img: ClaveImagen;
  /** Ilustración de lo que construimos, junto a "qué hacemos". */
  mockup: ClaveImagen;
  video?: { src: string; poster: ClaveImagen; duracion: string; subido: string };
  /** Casos de /proyectos/ relacionados. */
  casos: string[];
  /** Índice en `needs` del formulario que queda marcado. */
  necesidad: number | null;
  seo: { title: string; description: string; tipo: string };
  copy: Record<Idioma, CopyServicio>;
}

export const SERVICIOS_OJOS: PaginaServicio[] = [
  {
    slug: 'diseno-web',
    icono: 'web',
    iconosExtras: ['speed', 'smartphone', 'travel_explore', 'chat', 'monitoring', 'key'],
    img: 'web',
    mockup: 'forma',
    video: { src: '/videos/diseno-web.mp4', poster: 'webPoster', duracion: 'PT15S', subido: '2026-10-22' },
    casos: ['chilecamiones'],
    necesidad: null,
    seo: {
      title: 'Diseño de páginas web en Chile: landing, sitio corporativo y ecommerce | Ojos Publicitarios',
      description:
        'Diseñamos páginas web a medida en Chile: landing pages, sitios corporativos y tiendas online rápidas, pensadas para el celular y listas para Google. Quedan a tu nombre, sin mensualidad.',
      tipo: 'Diseño y desarrollo de páginas web',
    },
    copy: {
      es: {
        nombre: 'Diseño web',
        palabra: 'WEB',
        heroA: 'Diseño de páginas web que convierten visitas en',
        heroB: 'clientes.',
        heroSub:
          'Landing pages, sitios corporativos y tiendas online hechos a la medida de tu marca. Rápidos, pensados para el celular y listos para aparecer en Google. Todo queda a tu nombre.',
        heroCta: 'Quiero mi sitio web',
        marquee: ['Landing pages', 'Sitios corporativos', 'Ecommerce', 'SEO', 'Velocidad', 'Diseño a medida'],
        prologo:
          'Antes de escribirte, tu cliente te *busca en Google.* Lo que encuentra decide si te escribe o sigue de largo. Tu sitio es tu *primera conversación.*',
        corto: {
          q: '¿Qué incluye el diseño de una página web?',
          a: 'Diseñamos y desarrollamos tu sitio a medida: estructura, textos, diseño visual, versión para celular, formulario y botón de WhatsApp, SEO técnico y analítica. Puede ser una landing page, un sitio corporativo o una tienda online. Lo publicamos en tu dominio, queda a tu nombre y no cobramos mensualidad por usarlo.',
        },
        historiaA: 'Tu idea merece',
        historiaB: 'su propio sitio.',
        capitulos: [
          {
            k: 'La idea',
            t: 'Todo parte con algo que quieres mostrar.',
            d: 'Un servicio, un producto, una forma distinta de hacer las cosas. Lo tienes claro en la cabeza, pero en internet todavía no existe, o vive solo en un perfil de Instagram.',
          },
          {
            k: 'La búsqueda',
            t: 'Tu cliente te busca y decide en segundos.',
            d: 'Escribe lo que necesita en Google, entra desde el celular y en pocos segundos decide si confía. Un sitio lento, confuso o que no se ve bien en el teléfono lo manda donde la competencia.',
          },
          {
            k: 'El sitio',
            t: 'Lo diseñamos alrededor de tu negocio.',
            d: 'Ordenamos lo que ofreces, escribimos para que se entienda a la primera y diseñamos una identidad propia, sin plantillas genéricas. Carga rápido, se adapta a cualquier pantalla y está preparado para los buscadores.',
          },
          {
            k: 'El primer mensaje',
            t: 'Tu sitio trabaja aunque tú no estés.',
            d: 'Un domingo en la noche llega una consulta por el formulario o por WhatsApp. El sitio queda publicado en tu dominio, a tu nombre, y te enseñamos a actualizarlo.',
          },
        ],
        mediaAlt: 'Emprendedor revisando en su notebook el sitio web de su negocio',
        mockupAlt: 'Sitio web corporativo diseñado por Ojos Publicitarios, en computador y celular',
        incluyeTitulo: 'Tres formatos, un mismo cuidado.',
        incluyeSub: 'Elegimos el formato según lo que vendes y cómo te compran tus clientes.',
        formatos: [
          {
            t: 'Landing page',
            s: 'Un objetivo. Toda la atención.',
            d: 'Una sola página enfocada en una oferta: ideal para lanzar un servicio, una campaña o captar consultas desde anuncios.',
          },
          {
            t: 'Sitio corporativo',
            s: 'Confianza desde el primer clic.',
            d: 'Varias páginas para presentar tu empresa, tus servicios, tus proyectos y tu equipo, con un blog si quieres publicar contenido.',
          },
          {
            t: 'Ecommerce',
            s: 'Tu vitrina, abierta al mundo.',
            d: 'Catálogo fácil de recorrer, carrito, pagos en línea con medios chilenos y envíos configurados según tu operación.',
          },
        ],
        tagsLabel: 'En cada proyecto',
        tags: ['Adaptable a móviles', 'Navegación intuitiva', 'Identidad propia', 'Enfoque comercial'],
        extrasTitulo: 'Incluido en todos los sitios.',
        extras: [
          { t: 'Carga rápida', d: 'Imágenes optimizadas y código liviano: tu sitio abre rápido incluso con mala señal.' },
          { t: 'Pensado para el celular', d: 'Diseñamos primero para el teléfono, que es desde donde llega la mayoría de las visitas.' },
          { t: 'SEO técnico', d: 'Títulos, descripciones, datos estructurados y mapa del sitio para que Google entienda qué ofreces.' },
          { t: 'WhatsApp y formulario', d: 'Cada consulta llega a tu correo o a tu WhatsApp, con los datos ordenados.' },
          { t: 'Analítica', d: 'Sabes cuánta gente entra, desde dónde y qué páginas generan consultas.' },
          { t: 'Todo a tu nombre', d: 'Dominio, hosting y accesos quedan en tus cuentas. Sin mensualidades por usar lo que es tuyo.' },
        ],
        stats: [
          { v: '$0', l: 'en mensualidades por usar tu sitio. Es tuyo.' },
          { v: '100%', l: 'de nuestros sitios se diseñan primero para el celular.' },
          { v: '1', l: 'persona a cargo de tu proyecto, de principio a fin.' },
          { v: '<12h', l: 'para responder cualquier consulta, cualquier día.' },
        ],
        procTitulo: 'De la idea al sitio publicado.',
        procSub: 'Cuatro etapas, con revisiones contigo en cada una.',
        steps: [
          { k: 'Conversamos', t: 'Entendemos tu negocio.', d: 'Definimos qué quieres lograr, a quién le hablas y qué formato necesitas.' },
          { k: 'Diseñamos', t: 'Le damos forma.', d: 'Ordenamos el contenido y te mostramos una propuesta visual para revisarla juntos.' },
          { k: 'Construimos', t: 'Lo hacemos funcionar.', d: 'Desarrollamos el sitio, conectamos formulario, WhatsApp y analítica, y lo probamos en distintos teléfonos.' },
          { k: 'Publicamos', t: 'Lo dejamos en tu dominio.', d: 'Lo publicamos, te enseñamos a editarlo y te acompañamos las primeras semanas.' },
        ],
        casosTitulo: 'Sitios que ya están en la calle.',
        faqTitulo: 'Lo que nos preguntan sobre páginas web.',
        faq: [
          {
            q: '¿Cuánto cuesta una página web?',
            a: 'Depende del formato, la cantidad de páginas y las integraciones. Antes de empezar te enviamos una propuesta con precio cerrado, qué incluye y qué no. No hay mensualidad por usar el sitio.',
          },
          {
            q: '¿Cuánto se demora hacer una página web?',
            a: 'Depende del formato y de cuánto contenido ya tengas: una landing page es lo más rápido y un ecommerce lo que más toma. Al cotizar te damos un calendario por escrito con cada entrega.',
          },
          {
            q: '¿Qué tipo de sitio necesito?',
            a: 'Una landing page si tienes una sola oferta; un sitio corporativo si presentas varios servicios; un ecommerce si vendes productos y quieres cobrar en línea.',
          },
          {
            q: '¿Mi página web va a aparecer en Google?',
            a: 'La dejamos preparada: velocidad, estructura, títulos, datos estructurados y mapa del sitio, y la registramos en Google Search Console. El posicionamiento crece con el tiempo y con contenido; si quieres, lo trabajamos con nuestro servicio de marketing.',
          },
          {
            q: '¿Podré actualizar el sitio yo mismo?',
            a: 'Sí. Te enseñamos a cambiar textos, fotos y productos. Si prefieres no hacerlo, nos encargamos nosotros.',
          },
          {
            q: '¿El dominio y el sitio quedan a mi nombre?',
            a: 'Sí. Dominio, hosting y accesos quedan en cuentas de tu negocio. No cobramos mensualidad por usar lo que ya es tuyo.',
          },
        ],
        cta: 'Quiero mi sitio web ↗',
      },
      en: {
        nombre: 'Web design',
        palabra: 'WEB',
        heroA: 'Web design that turns visitors into',
        heroB: 'clients.',
        heroSub:
          'Landing pages, corporate sites and online stores built around your brand. Fast, mobile-first and ready to show up on Google. Everything stays in your name.',
        heroCta: 'I want my website',
        marquee: ['Landing pages', 'Corporate sites', 'Ecommerce', 'SEO', 'Speed', 'Custom design'],
        prologo:
          'Before they write to you, your client *looks you up on Google.* What they find decides whether they get in touch or move on. Your site is your *first conversation.*',
        corto: {
          q: 'What does website design include?',
          a: 'We design and build your site from scratch: structure, copy, visual design, mobile version, contact form and WhatsApp button, technical SEO and analytics. It can be a landing page, a corporate site or an online store. We publish it on your domain, it stays in your name and there is no monthly fee to use it.',
        },
        historiaA: 'Your idea deserves',
        historiaB: 'its own website.',
        capitulos: [
          {
            k: 'The idea',
            t: 'It all starts with something you want to show.',
            d: 'A service, a product, a different way of doing things. It is clear in your head, but online it does not exist yet, or it only lives on an Instagram profile.',
          },
          {
            k: 'The search',
            t: 'Your client looks you up and decides in seconds.',
            d: 'They type what they need into Google, open your site on their phone and decide within seconds whether to trust you. A slow, confusing site that looks wrong on mobile sends them to the competition.',
          },
          {
            k: 'The site',
            t: 'We design it around your business.',
            d: 'We organise what you offer, write so it is understood at first read and design an identity of your own, no generic templates. It loads fast, adapts to any screen and is ready for search engines.',
          },
          {
            k: 'The first message',
            t: 'Your site works even when you are away.',
            d: 'On a Sunday night an enquiry comes in through the form or on WhatsApp. The site is live on your domain, in your name, and we teach you how to update it.',
          },
        ],
        mediaAlt: 'Business owner reviewing his business website on a laptop',
        mockupAlt: 'Corporate website designed by Ojos Publicitarios, on desktop and mobile',
        incluyeTitulo: 'Three formats, the same care.',
        incluyeSub: 'We choose the format based on what you sell and how your clients buy.',
        formatos: [
          {
            t: 'Landing page',
            s: 'One goal. Full attention.',
            d: 'A single page focused on one offer: ideal to launch a service, a campaign or capture enquiries from ads.',
          },
          {
            t: 'Corporate site',
            s: 'Trust from the first click.',
            d: 'Several pages to present your company, services, projects and team, with a blog if you want to publish content.',
          },
          {
            t: 'Ecommerce',
            s: 'Your storefront, open to the world.',
            d: 'An easy-to-browse catalog, cart, online payments with local providers and shipping set up around your operation.',
          },
        ],
        tagsLabel: 'In every project',
        tags: ['Mobile-first', 'Intuitive navigation', 'Own identity', 'Sales focus'],
        extrasTitulo: 'Included in every site.',
        extras: [
          { t: 'Fast loading', d: 'Optimised images and lightweight code: your site opens fast even on a weak signal.' },
          { t: 'Built for mobile', d: 'We design for the phone first, where most of your visits come from.' },
          { t: 'Technical SEO', d: 'Titles, descriptions, structured data and a sitemap so Google understands what you offer.' },
          { t: 'WhatsApp and form', d: 'Every enquiry reaches your inbox or your WhatsApp, with the details organised.' },
          { t: 'Analytics', d: 'You know how many people visit, where from and which pages bring enquiries.' },
          { t: 'All in your name', d: 'Domain, hosting and access stay in your accounts. No monthly fees to use what is yours.' },
        ],
        stats: [
          { v: '$0', l: 'in monthly fees to use your site. It is yours.' },
          { v: '100%', l: 'of our sites are designed for mobile first.' },
          { v: '1', l: 'person in charge of your project, start to finish.' },
          { v: '<12h', l: 'to answer any enquiry, any day.' },
        ],
        procTitulo: 'From idea to live site.',
        procSub: 'Four stages, with reviews together at each one.',
        steps: [
          { k: 'We talk', t: 'We understand your business.', d: 'We define what you want to achieve, who you talk to and which format you need.' },
          { k: 'We design', t: 'We give it shape.', d: 'We organise the content and show you a visual proposal to review together.' },
          { k: 'We build', t: 'We make it work.', d: 'We develop the site, connect the form, WhatsApp and analytics, and test it on different phones.' },
          { k: 'We launch', t: 'We put it on your domain.', d: 'We publish it, teach you how to edit it and stay with you for the first weeks.' },
        ],
        casosTitulo: 'Sites already out in the world.',
        faqTitulo: 'What people ask about websites.',
        faq: [
          {
            q: 'How much does a website cost?',
            a: 'It depends on the format, the number of pages and the integrations. Before we start we send you a fixed-price proposal with what is and is not included. There is no monthly fee to use the site.',
          },
          {
            q: 'How long does it take to build a website?',
            a: 'It depends on the format and how much content you already have: a landing page is the quickest and an ecommerce takes the longest. With the quote we give you a written schedule with every delivery.',
          },
          {
            q: 'What kind of site do I need?',
            a: 'A landing page for a single offer; a corporate site to present several services; an ecommerce if you sell products and want to take payments online.',
          },
          {
            q: 'Will my website show up on Google?',
            a: 'We leave it ready: speed, structure, titles, structured data and a sitemap, and we register it in Google Search Console. Rankings grow over time and with content; if you want, we work on it with our marketing service.',
          },
          {
            q: 'Can I update the site myself?',
            a: 'Yes. We teach you how to change copy, photos and products. If you prefer not to, we take care of it.',
          },
          {
            q: 'Are the domain and the site in my name?',
            a: 'Yes. Domain, hosting and access are in your business accounts. We do not charge a monthly fee to use what is already yours.',
          },
        ],
        cta: 'I want my website ↗',
      },
    },
  },
  {
    slug: 'desarrollo-de-software',
    icono: 'terminal',
    iconosExtras: ['sync_alt', 'smartphone', 'shield_lock', 'autorenew', 'key', 'support_agent'],
    img: 'app',
    mockup: 'software',
    video: { src: '/videos/software.mp4', poster: 'appPoster', duracion: 'PT15S', subido: '2026-10-22' },
    casos: ['chilecamiones'],
    necesidad: 3,
    seo: {
      title: 'Desarrollo de software a medida en Chile: apps, CRM, WMS y TMS | Ojos Publicitarios',
      description:
        'Desarrollamos software a medida en Chile: apps web y móviles, CRM, sistemas de bodega (WMS), transporte (TMS) y paneles de gestión. El código y los datos quedan a nombre de tu empresa.',
      tipo: 'Desarrollo de software a medida',
    },
    copy: {
      es: {
        nombre: 'Software',
        palabra: 'SOFTWARE',
        heroA: 'Desarrollo de software a medida para que tu operación',
        heroB: 'funcione sola.',
        heroSub:
          'Ingenieros de software que convierten tu forma de trabajar en aplicaciones web y móviles: CRM, bodegas, transporte y paneles de gestión. El código y los datos quedan a tu nombre.',
        heroCta: 'Hablemos de tu proyecto',
        marquee: ['Apps a medida', 'CRM', 'WMS', 'TMS', 'Paneles de gestión', 'Integraciones', 'Apps móviles'],
        prologo:
          'Toda empresa tiene una forma propia de trabajar. Casi siempre vive en *planillas, chats y memoria.* La convertimos en una herramienta que *trabaja contigo.*',
        corto: {
          q: '¿Qué es el desarrollo de software a medida?',
          a: 'Es diseñar y programar una aplicación pensada para cómo trabaja tu empresa, en vez de adaptar tu operación a un programa genérico. Construimos apps web y móviles, CRM, sistemas de bodega (WMS), de transporte (TMS) y paneles de gestión, conectados con las herramientas que ya usas. El código y los datos quedan a nombre de tu empresa.',
        },
        historiaA: 'Tu idea',
        historiaB: 'toma forma.',
        capitulos: [
          {
            k: 'La planilla',
            t: 'Tu operación vive en mil lugares.',
            d: 'Pedidos en un Excel, clientes en WhatsApp, inventario en un cuaderno. Funciona mientras la empresa es chica y las mismas personas se acuerdan de todo.',
          },
          {
            k: 'El cuello de botella',
            t: 'Crecer empieza a doler.',
            d: 'Los datos se copian a mano, se pierden pedidos y nadie sabe en qué estado está cada cosa sin preguntar. Armar un reporte toma horas.',
          },
          {
            k: 'La herramienta',
            t: 'Diseñamos contigo la app que te falta.',
            d: 'Nos sentamos con tu equipo, entendemos el flujo real y lo convertimos en una aplicación web o móvil que conecta lo que hoy está separado.',
          },
          {
            k: 'El día a día',
            t: 'Todo en un lugar, desde el bolsillo.',
            d: 'Tu equipo registra desde el celular, tú ves el estado en un panel y los reportes se arman solos. La app crece cuando crece tu operación.',
          },
        ],
        mediaAlt: 'Persona revisando en su notebook el panel de gestión de su empresa',
        mockupAlt: 'Panel de gestión, CRM, WMS y TMS a medida en computador y celular',
        incluyeTitulo: 'Sistemas hechos a la medida de tu operación.',
        incluyeSub: 'Partimos por el módulo que más te duele y sumamos el resto cuando lo necesites.',
        formatos: [
          {
            t: 'Apps a medida',
            s: 'Web y móvil.',
            d: 'Aplicaciones para iOS, Android y navegador, hechas para cómo trabaja tu equipo en terreno y en la oficina.',
          },
          {
            t: 'CRM',
            s: 'Cada cliente, en un solo lugar.',
            d: 'Contactos, consultas, cotizaciones y seguimiento ordenados, para saber de dónde vienen tus ventas.',
          },
          {
            t: 'WMS · bodegas',
            s: 'Inventario bajo control.',
            d: 'Entradas, salidas, ubicaciones y stock al día, con lectura de códigos desde el celular.',
          },
          {
            t: 'TMS · transporte',
            s: 'Rutas y despachos coordinados.',
            d: 'Planificación de rutas, asignación de flota y seguimiento de entregas, con aviso al cliente.',
          },
          {
            t: 'Gestión y control',
            s: 'Tu operación en un panel.',
            d: 'Indicadores, reportes automáticos, permisos por rol y registro de accesos.',
          },
        ],
        tagsLabel: 'Industrias',
        tags: ['Logística', 'Comercio', 'Minería', 'Seguridad', 'Salud'],
        extrasTitulo: 'Incluido en cada sistema.',
        extras: [
          { t: 'Integraciones', d: 'Conectamos tu facturación, tu tienda online, tus planillas y las herramientas que ya usas.' },
          { t: 'Funciona en terreno', d: 'Apps móviles pensadas para usarse rápido, con una mano y con mala señal.' },
          { t: 'Seguridad y accesos', d: 'Cada persona ve solo lo que le corresponde, con registro de quién hizo qué.' },
          { t: 'Procesos automáticos', d: 'Avisos, reportes y tareas repetitivas corren solos.' },
          { t: 'Código a tu nombre', d: 'El código, la base de datos y las cuentas quedan en tu empresa. Sin licencias por usuario.' },
          { t: 'Acompañamiento', d: 'Capacitamos a tu equipo y seguimos ajustando la herramienta después del lanzamiento.' },
        ],
        stats: [
          { v: '$0', l: 'en licencias por usuario. El software es de tu empresa.' },
          { v: '1', l: 'persona a cargo de tu proyecto, siempre la misma.' },
          { v: '5', l: 'industrias para las que construimos: logística, comercio, minería, seguridad y salud.' },
          { v: '<12h', l: 'para responder cualquier consulta, cualquier día.' },
        ],
        procTitulo: 'Del flujo real a la app funcionando.',
        procSub: 'Entregas por etapas, para que pruebes avances reales en vez de esperar al final.',
        steps: [
          { k: 'Entendemos', t: 'Mapeamos tu operación.', d: 'Conversamos con quienes hacen el trabajo y dibujamos el flujo tal como ocurre hoy.' },
          { k: 'Diseñamos', t: 'Prototipo antes de programar.', d: 'Te mostramos las pantallas para validarlas con tu equipo antes de escribir una línea de código.' },
          { k: 'Construimos', t: 'Por etapas, con entregas.', d: 'Desarrollamos por módulos y conectamos tus sistemas. Cada entrega se prueba con usuarios reales.' },
          { k: 'Lanzamos', t: 'Capacitamos y acompañamos.', d: 'Ponemos la app en marcha, capacitamos al equipo y la ajustamos según el uso real.' },
        ],
        casosTitulo: 'Plataformas que ya están funcionando.',
        faqTitulo: 'Lo que nos preguntan sobre software a medida.',
        faq: [
          {
            q: '¿Cuánto cuesta desarrollar un software a medida?',
            a: 'Depende de los módulos, las integraciones y la cantidad de usuarios. Partimos por lo más urgente y te entregamos una propuesta con precio cerrado por etapa. No cobramos licencias por usuario.',
          },
          {
            q: '¿Por qué software a medida y no un programa genérico?',
            a: 'Un programa genérico te obliga a cambiar tu forma de trabajar y a pagar por funciones que no usas. A medida, la herramienta se adapta a tu operación, se conecta con lo que ya tienes y crece contigo.',
          },
          {
            q: '¿Desarrollan apps móviles?',
            a: 'Sí. Apps para iOS y Android y aplicaciones web que funcionan en cualquier navegador, según dónde las use tu equipo.',
          },
          {
            q: '¿Se puede conectar con los sistemas que ya uso?',
            a: 'Sí. Integramos facturación, tiendas online, planillas, WhatsApp y otros sistemas que permitan conectarse.',
          },
          {
            q: '¿De quién es el código?',
            a: 'De tu empresa. El código, la base de datos y las cuentas quedan a tu nombre.',
          },
          {
            q: '¿Qué pasa después del lanzamiento?',
            a: 'Capacitamos a tu equipo, corregimos lo que aparezca y seguimos sumando funciones cuando las necesites.',
          },
        ],
        cta: 'Hablemos de tu proyecto ↗',
      },
      en: {
        nombre: 'Software',
        palabra: 'SOFTWARE',
        heroA: 'Custom software development so your operation',
        heroB: 'runs on its own.',
        heroSub:
          'Software engineers who turn the way you work into web and mobile apps: CRM, warehouses, transport and management dashboards. The code and the data stay in your name.',
        heroCta: "Let's talk about your project",
        marquee: ['Custom apps', 'CRM', 'WMS', 'TMS', 'Dashboards', 'Integrations', 'Mobile apps'],
        prologo:
          'Every company has its own way of working. It almost always lives in *spreadsheets, chats and memory.* We turn it into a tool that *works with you.*',
        corto: {
          q: 'What is custom software development?',
          a: 'It means designing and building an application around how your company works, instead of bending your operation to fit generic software. We build web and mobile apps, CRM, warehouse (WMS) and transport (TMS) systems and management dashboards, connected to the tools you already use. The code and data belong to your company.',
        },
        historiaA: 'Your idea',
        historiaB: 'takes shape.',
        capitulos: [
          {
            k: 'The spreadsheet',
            t: 'Your operation lives in a thousand places.',
            d: 'Orders in Excel, clients on WhatsApp, inventory in a notebook. It works while the company is small and the same people remember everything.',
          },
          {
            k: 'The bottleneck',
            t: 'Growing starts to hurt.',
            d: 'Data gets copied by hand, orders get lost and nobody knows the status of anything without asking. A report takes hours.',
          },
          {
            k: 'The tool',
            t: 'We design the app you are missing, with you.',
            d: 'We sit down with your team, understand the real flow and turn it into a web or mobile app that connects what is separate today.',
          },
          {
            k: 'Day to day',
            t: 'Everything in one place, in your pocket.',
            d: 'Your team logs from their phones, you see the status on a dashboard and reports build themselves. The app grows as your operation grows.',
          },
        ],
        mediaAlt: 'Person reviewing their company management dashboard on a laptop',
        mockupAlt: 'Custom management dashboard, CRM, WMS and TMS on desktop and mobile',
        incluyeTitulo: 'Systems built around your operation.',
        incluyeSub: 'We start with the module that hurts most and add the rest when you need it.',
        formatos: [
          {
            t: 'Custom apps',
            s: 'Web and mobile.',
            d: 'Apps for iOS, Android and the browser, built around how your team works in the field and in the office.',
          },
          {
            t: 'CRM',
            s: 'Every client, in one place.',
            d: 'Contacts, enquiries, quotes and follow-up organised, so you know where your sales come from.',
          },
          {
            t: 'WMS · warehouses',
            s: 'Inventory under control.',
            d: 'Receipts, dispatches, locations and stock up to date, with barcode scanning from the phone.',
          },
          {
            t: 'TMS · transport',
            s: 'Routes and dispatch, coordinated.',
            d: 'Route planning, fleet assignment and delivery tracking, with notifications to the client.',
          },
          {
            t: 'Management & control',
            s: 'Your operation on one dashboard.',
            d: 'KPIs, automatic reports, role-based permissions and access logs.',
          },
        ],
        tagsLabel: 'Industries',
        tags: ['Logistics', 'Retail', 'Mining', 'Security', 'Health'],
        extrasTitulo: 'Included in every system.',
        extras: [
          { t: 'Integrations', d: 'We connect your invoicing, your online store, your spreadsheets and the tools you already use.' },
          { t: 'Works in the field', d: 'Mobile apps designed to be used quickly, one-handed and on a weak signal.' },
          { t: 'Security & access', d: 'Each person sees only what they should, with a log of who did what.' },
          { t: 'Automated processes', d: 'Alerts, reports and repetitive tasks run on their own.' },
          { t: 'Code in your name', d: 'The code, the database and the accounts belong to your company. No per-user licences.' },
          { t: 'Ongoing support', d: 'We train your team and keep fine-tuning the tool after launch.' },
        ],
        stats: [
          { v: '$0', l: 'in per-user licences. The software belongs to your company.' },
          { v: '1', l: 'person in charge of your project, always the same one.' },
          { v: '5', l: 'industries we build for: logistics, retail, mining, security and health.' },
          { v: '<12h', l: 'to answer any enquiry, any day.' },
        ],
        procTitulo: 'From the real flow to a working app.',
        procSub: 'Delivered in stages, so you test real progress instead of waiting until the end.',
        steps: [
          { k: 'We map', t: 'We map your operation.', d: 'We talk to the people doing the work and draw the flow as it happens today.' },
          { k: 'We design', t: 'Prototype before code.', d: 'We show you the screens to validate with your team before writing a single line of code.' },
          { k: 'We build', t: 'In stages, with deliveries.', d: 'We develop module by module and connect your systems. Every delivery is tested with real users.' },
          { k: 'We launch', t: 'We train and support.', d: 'We roll the app out, train the team and adjust it to real use.' },
        ],
        casosTitulo: 'Platforms already up and running.',
        faqTitulo: 'What people ask about custom software.',
        faq: [
          {
            q: 'How much does custom software cost?',
            a: 'It depends on the modules, the integrations and the number of users. We start with the most urgent part and send you a fixed-price proposal per stage. We do not charge per-user licences.',
          },
          {
            q: 'Why custom software instead of an off-the-shelf product?',
            a: 'Off-the-shelf software forces you to change how you work and to pay for features you do not use. Custom software adapts to your operation, connects to what you already have and grows with you.',
          },
          {
            q: 'Do you build mobile apps?',
            a: 'Yes. iOS and Android apps and web apps that run in any browser, depending on where your team uses them.',
          },
          {
            q: 'Can it connect to the systems I already use?',
            a: 'Yes. We integrate invoicing, online stores, spreadsheets, WhatsApp and other systems that allow connections.',
          },
          {
            q: 'Who owns the code?',
            a: 'Your company does. The code, the database and the accounts are in your name.',
          },
          {
            q: 'What happens after launch?',
            a: 'We train your team, fix whatever comes up and keep adding features when you need them.',
          },
        ],
        cta: "Let's talk about your project ↗",
      },
    },
  },
  {
    slug: 'marketing-digital',
    icono: 'campaign',
    iconosExtras: ['palette', 'calendar_month', 'verified', 'monitoring', 'key', 'edit_note'],
    img: 'mkt',
    mockup: 'marketing',
    casos: ['mercado-mersan', 'energy', 'consultora-ko'],
    necesidad: 4,
    seo: {
      title: 'Agencia de marketing digital en Chile: redes, Meta Ads, Google y SEO | Ojos Publicitarios',
      description:
        'Marketing digital en Chile: identidad de marca, gestión de redes sociales, campañas en Meta y Google, SEO y email. Nada se publica sin tu aprobación y las cuentas quedan a tu nombre.',
      tipo: 'Marketing digital',
    },
    copy: {
      es: {
        nombre: 'Marketing',
        palabra: 'MARKETING',
        heroA: 'Marketing digital para que la gente',
        heroB: 'mire tu marca.',
        heroSub:
          'Identidad visual, redes sociales, campañas en Meta y Google, SEO y email. Creatividad y estrategia para hacer crecer tu comunidad y convertir el interés en ventas.',
        heroCta: 'Quiero hacer crecer mi marca',
        marquee: ['Diseño creativo', 'Redes sociales', 'Meta Ads', 'Google Ads', 'SEO', 'Email marketing', 'Analítica'],
        prologo:
          'Un buen producto no se vende solo. Primero alguien tiene que *detenerse a mirar.* Después, tiene que *acordarse de ti.*',
        corto: {
          q: '¿Qué incluye el servicio de marketing digital?',
          a: 'Definimos la estrategia y producimos lo necesario para que tu marca se vea y venda: identidad visual, contenido y gestión de redes sociales, campañas pagadas en Meta y Google, SEO, email marketing y reportes de resultados. Nada se publica sin tu aprobación y las cuentas quedan a nombre de tu negocio.',
        },
        historiaA: 'Haz que la gente',
        historiaB: 'mire.',
        capitulos: [
          {
            k: 'La marca invisible',
            t: 'Tienes algo bueno, pero nadie lo ve.',
            d: 'Publicas cuando puedes, cada pieza se ve distinta y el presupuesto de anuncios se va en clics que no compran.',
          },
          {
            k: 'La identidad',
            t: 'Primero, una marca que se reconozca.',
            d: 'Definimos cómo se ve y cómo habla tu marca: colores, tipografías, tono y piezas base que se usan en todas partes.',
          },
          {
            k: 'La campaña',
            t: 'Después, piezas que detienen el scroll.',
            d: 'Creamos contenido y campañas para Instagram, Meta y Google con un calendario claro, y cada pieza pasa por tu aprobación antes de salir.',
          },
          {
            k: 'Los números',
            t: 'Al final, lo que importa.',
            d: 'Medimos alcance, visitas, consultas y ventas. Ajustamos lo que no funciona y ponemos más presupuesto en lo que sí.',
          },
        ],
        mediaAlt: 'Diseñadora revisando afiches, paleta de colores y piezas para redes de una campaña de marca',
        mockupAlt: 'Piezas de marca, redes sociales y campañas digitales diseñadas por Ojos Publicitarios',
        incluyeTitulo: 'Creatividad con un objetivo comercial.',
        incluyeSub: 'Puedes partir por un canal o encargarnos toda tu comunicación.',
        formatos: [
          {
            t: 'Diseño creativo',
            s: 'Una marca que se reconoce.',
            d: 'Identidad visual, logotipo, manual de marca y piezas gráficas para digital e impresión.',
          },
          {
            t: 'Redes sociales',
            s: 'Comunidad, no solo seguidores.',
            d: 'Estrategia, calendario, producción de contenido y gestión diaria de tus perfiles.',
          },
          {
            t: 'Campañas',
            s: 'Anuncios que llegan a quien compra.',
            d: 'Campañas en Meta (Instagram y Facebook) y Google, con segmentación y presupuesto bajo control.',
          },
          {
            t: 'SEO y contenido',
            s: 'Que te encuentren cuando te buscan.',
            d: 'Contenido y optimización para aparecer en Google cuando alguien busca lo que vendes.',
          },
          {
            t: 'Email y remarketing',
            s: 'Que vuelvan.',
            d: 'Correos y anuncios para retomar el contacto con quien ya te visitó o te compró.',
          },
          {
            t: 'Analítica',
            s: 'Decisiones con datos.',
            d: 'Reportes claros de qué funciona, cuánto cuesta cada resultado y qué vamos a ajustar.',
          },
        ],
        tagsLabel: 'Canales',
        tags: ['Meta', 'Google', 'Instagram', 'Email'],
        extrasTitulo: 'Incluido en cada plan.',
        extras: [
          { t: 'Identidad coherente', d: 'Todas tus piezas hablan el mismo idioma visual.' },
          { t: 'Calendario claro', d: 'Sabes qué se publica, cuándo y con qué objetivo.' },
          { t: 'Tu aprobación primero', d: 'Nada sale publicado sin que lo revises.' },
          { t: 'Reportes mensuales', d: 'Resultados en simple: alcance, consultas, ventas y costo por resultado.' },
          { t: 'Cuentas a tu nombre', d: 'Perfiles, cuentas publicitarias y audiencias quedan en tu negocio.' },
          { t: 'Contenido siempre listo', d: 'Textos y piezas preparados con anticipación, sin correr a última hora.' },
        ],
        stats: [
          { v: '0%', l: 'de lo que publicamos sale sin tu aprobación.' },
          { v: '1', l: 'persona a cargo de tu marca, siempre la misma.' },
          { v: '100%', l: 'de las cuentas publicitarias quedan a nombre de tu negocio.' },
          { v: '<12h', l: 'para responder cualquier consulta, cualquier día.' },
        ],
        procTitulo: 'De marca invisible a marca que se mira.',
        procSub: 'Un ciclo que se repite cada mes: planificar, crear, medir y mejorar.',
        steps: [
          { k: 'Diagnóstico', t: 'Miramos dónde estás.', d: 'Revisamos tu marca, tus redes, tu competencia y lo que hoy te trae clientes.' },
          { k: 'Estrategia', t: 'Definimos el plan.', d: 'Objetivos, públicos, canales, mensajes y presupuesto, por escrito.' },
          { k: 'Creación', t: 'Producimos y publicamos.', d: 'Diseñamos piezas, escribimos textos y lanzamos campañas, siempre con tu aprobación.' },
          { k: 'Medición', t: 'Medimos y ajustamos.', d: 'Reportamos resultados y movemos el presupuesto hacia lo que funciona.' },
        ],
        casosTitulo: 'Marcas que ya se están mirando.',
        faqTitulo: 'Lo que nos preguntan sobre marketing digital.',
        faq: [
          {
            q: '¿Cuánto cuesta el marketing digital?',
            a: 'Depende de los canales y la cantidad de contenido. Trabajamos con un plan mensual de precio cerrado; el presupuesto de anuncios va aparte y se paga directo a Meta o Google desde tu cuenta.',
          },
          {
            q: '¿En cuánto tiempo se ven resultados?',
            a: 'Las campañas pagadas entregan datos desde los primeros días. Las redes y el SEO construyen resultados con constancia, mes a mes. Te mostramos los números desde el principio.',
          },
          {
            q: '¿Gestionan mis redes sociales?',
            a: 'Sí. Planificamos el calendario, producimos el contenido y lo publicamos. Cada pieza pasa por tu aprobación antes de salir.',
          },
          {
            q: '¿Hacen anuncios en Instagram, Facebook y Google?',
            a: 'Sí. Creamos y optimizamos campañas en Meta (Instagram y Facebook) y en Google Ads, con segmentación según tu público.',
          },
          {
            q: '¿Las cuentas quedan a mi nombre?',
            a: 'Sí. Perfiles, cuentas publicitarias, píxeles y audiencias quedan a nombre de tu negocio.',
          },
          {
            q: '¿Pueden diseñar mi logo e identidad?',
            a: 'Sí. Diseñamos logotipo, paleta, tipografías y piezas base, como hicimos para Consultora KO.',
          },
        ],
        cta: 'Quiero hacer crecer mi marca ↗',
      },
      en: {
        nombre: 'Marketing',
        palabra: 'MARKETING',
        heroA: 'Digital marketing that makes people',
        heroB: 'look at your brand.',
        heroSub:
          'Visual identity, social media, Meta and Google campaigns, SEO and email. Creativity and strategy to grow your community and turn interest into sales.',
        heroCta: 'I want to grow my brand',
        marquee: ['Creative design', 'Social media', 'Meta Ads', 'Google Ads', 'SEO', 'Email marketing', 'Analytics'],
        prologo:
          'A good product does not sell itself. First someone has to *stop and look.* Then they have to *remember you.*',
        corto: {
          q: 'What does the digital marketing service include?',
          a: 'We define the strategy and produce what your brand needs to be seen and to sell: visual identity, social media content and management, paid campaigns on Meta and Google, SEO, email marketing and results reports. Nothing is published without your approval and the accounts stay in your business name.',
        },
        historiaA: 'Make people',
        historiaB: 'look.',
        capitulos: [
          {
            k: 'The invisible brand',
            t: 'You have something good, but nobody sees it.',
            d: 'You post when you can, every piece looks different and the ad budget goes on clicks that never buy.',
          },
          {
            k: 'The identity',
            t: 'First, a brand people recognise.',
            d: 'We define how your brand looks and speaks: colours, typefaces, tone and core pieces used everywhere.',
          },
          {
            k: 'The campaign',
            t: 'Then, pieces that stop the scroll.',
            d: 'We create content and campaigns for Instagram, Meta and Google on a clear calendar, and every piece gets your approval before it goes out.',
          },
          {
            k: 'The numbers',
            t: 'In the end, what matters.',
            d: 'We measure reach, visits, enquiries and sales. We fix what does not work and put more budget behind what does.',
          },
        ],
        mediaAlt: 'Designer reviewing posters, a colour palette and social pieces for a brand campaign',
        mockupAlt: 'Brand pieces, social media and digital campaigns designed by Ojos Publicitarios',
        incluyeTitulo: 'Creativity with a commercial goal.',
        incluyeSub: 'Start with one channel or hand us your whole communication.',
        formatos: [
          {
            t: 'Creative design',
            s: 'A brand people recognise.',
            d: 'Visual identity, logo, brand guidelines and graphic pieces for digital and print.',
          },
          {
            t: 'Social media',
            s: 'Community, not just followers.',
            d: 'Strategy, calendar, content production and day-to-day management of your profiles.',
          },
          {
            t: 'Campaigns',
            s: 'Ads that reach buyers.',
            d: 'Campaigns on Meta (Instagram and Facebook) and Google, with targeting and budget under control.',
          },
          {
            t: 'SEO & content',
            s: 'Be found when they search.',
            d: 'Content and optimisation to show up on Google when someone searches for what you sell.',
          },
          {
            t: 'Email & remarketing',
            s: 'Bring them back.',
            d: 'Emails and ads to reconnect with people who already visited or bought.',
          },
          {
            t: 'Analytics',
            s: 'Decisions based on data.',
            d: 'Clear reports on what works, what each result costs and what we will adjust.',
          },
        ],
        tagsLabel: 'Channels',
        tags: ['Meta', 'Google', 'Instagram', 'Email'],
        extrasTitulo: 'Included in every plan.',
        extras: [
          { t: 'Consistent identity', d: 'All your pieces speak the same visual language.' },
          { t: 'Clear calendar', d: 'You know what goes out, when and why.' },
          { t: 'Your approval first', d: 'Nothing is published until you review it.' },
          { t: 'Monthly reports', d: 'Results in plain terms: reach, enquiries, sales and cost per result.' },
          { t: 'Accounts in your name', d: 'Profiles, ad accounts and audiences belong to your business.' },
          { t: 'Content always ready', d: 'Copy and pieces prepared in advance, no last-minute rush.' },
        ],
        stats: [
          { v: '0%', l: 'of what we publish goes out without your approval.' },
          { v: '1', l: 'person in charge of your brand, always the same one.' },
          { v: '100%', l: 'of ad accounts stay in your business name.' },
          { v: '<12h', l: 'to answer any enquiry, any day.' },
        ],
        procTitulo: 'From invisible brand to a brand people look at.',
        procSub: 'A cycle that repeats every month: plan, create, measure and improve.',
        steps: [
          { k: 'Audit', t: 'We look at where you are.', d: 'We review your brand, your socials, your competition and what brings you clients today.' },
          { k: 'Strategy', t: 'We define the plan.', d: 'Goals, audiences, channels, messages and budget, in writing.' },
          { k: 'Creation', t: 'We produce and publish.', d: 'We design pieces, write copy and launch campaigns, always with your approval.' },
          { k: 'Measurement', t: 'We measure and adjust.', d: 'We report results and move budget toward what works.' },
        ],
        casosTitulo: 'Brands people are already looking at.',
        faqTitulo: 'What people ask about digital marketing.',
        faq: [
          {
            q: 'How much does digital marketing cost?',
            a: 'It depends on the channels and the amount of content. We work on a fixed-price monthly plan; the ad budget is separate and paid directly to Meta or Google from your account.',
          },
          {
            q: 'How soon will I see results?',
            a: 'Paid campaigns deliver data from the first days. Social media and SEO build results with consistency, month after month. We show you the numbers from the start.',
          },
          {
            q: 'Do you manage my social media?',
            a: 'Yes. We plan the calendar, produce the content and publish it. Every piece gets your approval before it goes out.',
          },
          {
            q: 'Do you run ads on Instagram, Facebook and Google?',
            a: 'Yes. We create and optimise campaigns on Meta (Instagram and Facebook) and Google Ads, targeted to your audience.',
          },
          {
            q: 'Are the accounts in my name?',
            a: 'Yes. Profiles, ad accounts, pixels and audiences are in your business name.',
          },
          {
            q: 'Can you design my logo and identity?',
            a: 'Yes. We design the logo, palette, typefaces and core pieces, as we did for Consultora KO.',
          },
        ],
        cta: 'I want to grow my brand ↗',
      },
    },
  },
];

export function servicioPorSlug(slug: string): PaginaServicio | undefined {
  return SERVICIOS_OJOS.find((servicio) => servicio.slug === slug);
}
