// Contenido de la propuesta para Shiva: lanzamiento de la marca en Chile con
// tienda propia (shivacocina.cl), canal mayorista y redes (@shivacocina.cl).
//
// Los productos, descripciones, certificaciones y fotos salen de la tienda
// argentina (shivacocina.com). Los precios en CLP, los tramos mayoristas y la
// inversión son referenciales: se ajustan acá y la tienda y la propuesta se
// recalculan solas.

export const RUTAS = {
  propuesta: '/propuestas/shiva/',
  tienda: '/propuestas/shiva/tienda/',
};

export const IVA = 0.19;

/** Precio con IVA → neto, redondeado a la decena como se cotiza en Chile. */
export function neto(precioConIva: number): number {
  return Math.round(precioConIva / (1 + IVA) / 10) * 10;
}

export function clp(monto: number): string {
  return `$${Math.round(monto).toLocaleString('es-CL')}`;
}

// ---------------------------------------------------------------------------
// Catálogo
// ---------------------------------------------------------------------------
export type Linea = 'crackers' | 'tostaditas' | 'cookies';

export const LINEAS: { id: Linea; nombre: string }[] = [
  { id: 'crackers', nombre: 'Crackers' },
  { id: 'tostaditas', nombre: 'Tostaditas' },
  { id: 'cookies', nombre: 'Cookies' },
];

export interface Producto {
  id: string;
  linea: Linea;
  nombre: string;
  texto: string;
  /** Precio público en CLP, IVA incluido. Referencial. */
  precio: number;
  imagen: string;
}

/** Precio público de referencia por línea (CLP con IVA, paquete de 100 g). */
const PRECIO: Record<Linea, number> = {
  crackers: 3490,
  tostaditas: 3690,
  cookies: 3990,
};

export const PRODUCTOS: Producto[] = [
  {
    id: 'pimenton',
    linea: 'crackers',
    nombre: 'Pimentón Ahumado',
    texto: 'Pimentón ahumado y chimichurri, con color 100 % natural. El básico para el hummus y la tabla.',
    precio: PRECIO.crackers,
    imagen: 'shiva/productos/crackers-pimenton.webp',
  },
  {
    id: 'mediterraneas',
    linea: 'crackers',
    nombre: 'Mediterráneas',
    texto: 'Aceitunas negras, albahaca, aceite de oliva virgen y un toque de merkén.',
    precio: PRECIO.crackers,
    imagen: 'shiva/productos/crackers-mediterraneas.webp',
  },
  {
    id: 'carbon',
    linea: 'crackers',
    nombre: 'Carbón Vegetal',
    texto: 'Negras por el carbón de cáscara de coco, con ajo y merkén. Las que más llaman la atención en la tabla.',
    precio: PRECIO.crackers,
    imagen: 'shiva/productos/crackers-carbon.webp',
  },
  {
    id: 'semillas',
    linea: 'crackers',
    nombre: 'Mix de Semillas',
    texto: 'Girasol, lino y sésamo integral. Clásicas, crocantes y buenas con todo, dulce o salado.',
    precio: PRECIO.crackers,
    imagen: 'shiva/productos/crackers-semillas.webp',
  },
  {
    id: 'quinoa',
    linea: 'tostaditas',
    nombre: 'Quinoa',
    texto: 'Crocantes, con las semillas a la vista y mucha fibra. La puerta de entrada para quien prueba Shiva.',
    precio: PRECIO.tostaditas,
    imagen: 'shiva/productos/tostaditas-quinoa.webp',
  },
  {
    id: 'sarraceno',
    linea: 'tostaditas',
    nombre: 'Trigo Sarraceno Germinado',
    texto: 'Desarrolladas con Ale Temporini. Proteína vegetal y masa madre, para la palta o la ensalada.',
    precio: PRECIO.tostaditas,
    imagen: 'shiva/productos/tostaditas-sarraceno.webp',
  },
  {
    id: 'jalapeno',
    linea: 'tostaditas',
    nombre: 'Limón y Jalapeño',
    texto: 'El ácido del limón con el picante justo del jalapeño. Para el guacamole y los dips.',
    precio: PRECIO.tostaditas,
    imagen: 'shiva/productos/tostaditas-jalapeno.webp',
  },
  {
    id: 'chocolate',
    linea: 'cookies',
    nombre: 'Chocolate y Naranja',
    texto: 'Cacao y aceite esencial de naranja. Suaves, para el café o la once.',
    precio: PRECIO.cookies,
    imagen: 'shiva/productos/cookies-chocolate.webp',
  },
  {
    id: 'limon',
    linea: 'cookies',
    nombre: 'Limón y Maracuyá',
    texto: 'Pulpa de maracuyá, limón natural y semillas de amapola. Distintas a cualquier otra galleta.',
    precio: PRECIO.cookies,
    imagen: 'shiva/productos/cookies-limon.webp',
  },
];

export function producto(id: string): Producto {
  const encontrado = PRODUCTOS.find((p) => p.id === id);
  if (!encontrado) throw new Error(`Producto desconocido: ${id}`);
  return encontrado;
}

// ---------------------------------------------------------------------------
// Venta al público
// ---------------------------------------------------------------------------
export const SUSCRIPCION_DESCUENTO = 0.1;
export const DESPACHO_GRATIS_DESDE = 30000;

export function precioSuscripcion(precio: number): number {
  return Math.round((precio * (1 - SUSCRIPCION_DESCUENTO)) / 10) * 10;
}

export interface Pack {
  id: string;
  nombre: string;
  bajada: string;
  /** id de producto → unidades */
  contenido: Record<string, number>;
  precio: number;
}

// En Chile se dice picoteo, no picada; y la merienda es la once.
export const PACKS: Pack[] = [
  {
    id: 'picoteo',
    nombre: 'Pack Picoteo',
    bajada: 'Para armar la tabla del viernes sin pensar.',
    contenido: { pimenton: 2, mediterraneas: 2, carbon: 2, jalapeno: 2 },
    precio: 25490,
  },
  {
    id: 'descubre',
    nombre: 'Pack Descubre',
    bajada: 'Uno de cada sabor: los nueve, para encontrar tu favorito.',
    contenido: {
      pimenton: 1,
      mediterraneas: 1,
      carbon: 1,
      semillas: 1,
      quinoa: 1,
      sarraceno: 1,
      jalapeno: 1,
      chocolate: 1,
      limon: 1,
    },
    precio: 28990,
  },
  {
    id: 'despensa',
    nombre: 'Pack Despensa',
    bajada: 'Dieciocho paquetes para el mes: picoteo, once y colaciones.',
    contenido: {
      pimenton: 3,
      mediterraneas: 2,
      carbon: 2,
      semillas: 3,
      quinoa: 2,
      sarraceno: 2,
      jalapeno: 2,
      chocolate: 1,
      limon: 1,
    },
    precio: 54990,
  },
];

export function unidadesPack(pack: Pack): number {
  return Object.values(pack.contenido).reduce((total, n) => total + n, 0);
}

export function precioSueltoPack(pack: Pack): number {
  return Object.entries(pack.contenido).reduce(
    (total, [id, n]) => total + producto(id).precio * n,
    0
  );
}

// ---------------------------------------------------------------------------
// Venta mayorista
// ---------------------------------------------------------------------------
/** Unidades por caja: el exhibidor de mesón que recibe la tienda. */
export const UNIDADES_CAJA = 12;
/** Descuento sobre el precio público neto: es el margen que gana la tienda. */
export const MARGEN_TIENDA = 0.35;
/** Pedido mínimo de la tabla mayorista, neto. */
export const PEDIDO_MINIMO = 120000;

export function precioMayoristaUnidad(precio: number): number {
  return Math.round((neto(precio) * (1 - MARGEN_TIENDA)) / 10) * 10;
}

export function precioMayoristaCaja(precio: number): number {
  return precioMayoristaUnidad(precio) * UNIDADES_CAJA;
}

export const TIPOS_NEGOCIO = [
  'Tienda saludable o naturista',
  'Almacén o minimarket',
  'Cafetería o restaurante',
  'Gimnasio o centro deportivo',
  'Distribuidor',
  'Otro',
];

// ---------------------------------------------------------------------------
// Marca
// ---------------------------------------------------------------------------
export const CERTIFICACIONES = [
  { titulo: 'Sin gluten', texto: 'Toda la línea' },
  { titulo: 'Apto vegano', texto: 'Sello ABP' },
  { titulo: 'Kosher Parve', texto: 'Certificado' },
  { titulo: 'Apto APLV', texto: 'Sin proteína de leche' },
  { titulo: 'Fábrica BPM', texto: 'Certificada por IRAM' },
];

/**
 * Mensajes reales de clientes en Argentina, tal como los publica shivacocina.com.
 * Sin nombres de usuario: son personas, no la marca.
 */
export const RESENAS = [
  {
    texto: 'Gracias por estos productos riquísimos!!!!!! Ya desayunando con las crackers con masa madre ❤️',
    origen: 'Mensaje directo',
  },
  { texto: 'Súper ricassssss, amo las crackers', origen: 'Mensaje directo' },
  {
    texto: 'Hola buen día, hoy compré la Shiva jalapeño y limón, me encantan!!!! Los felicito están geniales 🔥🎉',
    origen: 'Mensaje directo',
  },
];

// ---------------------------------------------------------------------------
// Sellos "ALTO EN" (Ley 20.606), calculados con la ficha nutricional que Shiva
// publica (porción de 30 g). Límites para sólidos, por 100 g.
// ---------------------------------------------------------------------------
export const LIMITES_ALTO_EN = {
  calorias: 275,
  sodio: 400,
  azucares: 10,
  grasasSaturadas: 4,
};

export const FICHAS_NUTRICIONALES = [
  {
    producto: 'Crackers Mix de Semillas',
    porcion: { calorias: 123, sodio: 232, azucares: 0.4, grasasSaturadas: 1 },
  },
  {
    producto: 'Cookies de Chocolate',
    porcion: { calorias: 126, sodio: 79, azucares: 3.3, grasasSaturadas: 3.8 },
  },
];

const PORCION_GRAMOS = 30;

export function selloAltoEn(ficha: (typeof FICHAS_NUTRICIONALES)[number]) {
  const por100 = (valor: number) => (valor * 100) / PORCION_GRAMOS;
  const valores = {
    calorias: por100(ficha.porcion.calorias),
    sodio: por100(ficha.porcion.sodio),
    azucares: por100(ficha.porcion.azucares),
    grasasSaturadas: por100(ficha.porcion.grasasSaturadas),
  };
  const sellos = [
    valores.calorias > LIMITES_ALTO_EN.calorias && 'Calorías',
    valores.sodio > LIMITES_ALTO_EN.sodio && 'Sodio',
    valores.azucares > LIMITES_ALTO_EN.azucares && 'Azúcares',
    valores.grasasSaturadas > LIMITES_ALTO_EN.grasasSaturadas && 'Grasas saturadas',
  ].filter((sello): sello is string => Boolean(sello));
  return { valores, sellos };
}

// ---------------------------------------------------------------------------
// Propuesta
// ---------------------------------------------------------------------------
export const PROPUESTA = {
  fecha: '20 de octubre de 2026',

  localizacion: [
    { argentina: 'Comprá, armá tu combo', chile: 'Compra, arma tu pack', nota: 'Tuteo chileno en toda la tienda y las redes.' },
    { argentina: 'Combo Picada', chile: 'Pack Picoteo', nota: 'La tabla en Chile se llama picoteo.' },
    { argentina: 'La merienda', chile: 'La once', nota: 'El momento dulce del día tiene otro nombre.' },
    { argentina: 'ARS, 3 cuotas sin interés', chile: 'CLP con IVA, Webpay y Mercado Pago', nota: 'Redcompra y tarjetas por Webpay.' },
    { argentina: 'Envío por código postal', chile: 'Despacho por comuna', nota: 'Santiago en 24–48 h, regiones por courier.' },
    { argentina: 'Mayoristas por WhatsApp', chile: 'Cuenta mayorista con factura', nota: 'Precio neto, RUT y factura electrónica.' },
    { argentina: 'Octógonos “EXCESO EN”', chile: 'Sellos “ALTO EN” del Minsal', nota: 'Otra ley, otros límites, otro rótulo.' },
  ],

  frentes: [
    {
      numero: '01',
      titulo: 'Tienda shivacocina.cl',
      bajada: 'Venta al público, con la identidad de Shiva y hablada en chileno.',
      items: [
        'Tienda con diseño propio sobre la gráfica de Shiva, pensada primero para el celular.',
        'Catálogo de los nueve sabores y tres packs, con ficha completa: ingredientes, tabla nutricional y sellos.',
        'Pagos con Webpay (tarjetas y Redcompra), Mercado Pago y transferencia.',
        'Despacho por comuna: Santiago y regiones, con despacho gratis desde un monto.',
        'Suscripción con 10 % de descuento, cada 30 o 60 días.',
        'Blog con recetas y guías, optimizado para Google y para los buscadores con IA (SEO y AEO).',
        'Medición de visitas y ventas, y catálogo conectado a Meta para anuncios.',
      ],
    },
    {
      numero: '02',
      titulo: 'Canal mayorista',
      bajada: 'Para que una tienda pueda comprar sola, sin esperar una cotización.',
      items: [
        'Registro de tiendas con RUT desde la misma web, con aprobación de Shiva.',
        'Precios netos por caja que solo ven las cuentas aprobadas, con pedido mínimo.',
        'Factura electrónica conectada al sistema de facturación del importador.',
        'Ficha comercial en PDF: formatos, precios, margen sugerido y condiciones.',
        'Lista inicial de 60 puntos de venta objetivo en Santiago y un kit de primer contacto.',
      ],
    },
    {
      numero: '03',
      titulo: 'Redes y creadores',
      bajada: '@shivacocina.cl en Instagram y TikTok, y los creadores de contenido que hablan de Shiva.',
      items: [
        'Cuentas nuevas con biografía, destacadas y link directo a la tienda.',
        'Campaña de lanzamiento en tres etapas: expectativa, apertura y ritmo.',
        '12 publicaciones al mes (reels y carruseles) e historias tres veces por semana.',
        'Respuesta a comentarios y mensajes en días hábiles.',
        'Gestión de 8 a 10 creadores de contenido chilenos (sin gluten, vegano y picoteo): selección, brief, envío de producto y seguimiento de lo que publican y venden.',
        'Campañas en Meta Ads (la pauta va aparte) e informe mensual.',
      ],
    },
  ],


  flujoMayorista: [
    { titulo: 'Se registra', texto: 'La tienda llena el formulario con su RUT, giro y comuna.' },
    { titulo: 'Shiva aprueba', texto: 'Se revisa en 24 h hábiles y la cuenta queda en la tabla mayorista.' },
    { titulo: 'Ve precios netos', texto: 'Al iniciar sesión ve el precio por caja y el pedido mínimo.' },
    { titulo: 'Paga y recibe factura', texto: 'Transferencia o Webpay, con factura electrónica.' },
    { titulo: 'Recompra', texto: 'Repite el pedido desde su historial, sin escribir a nadie.' },
  ],

  etapasRedes: [
    {
      tiempo: 'Semanas −4 a −1',
      titulo: 'Expectativa',
      items: [
        'Cuenta nueva: “Shiva viene a Chile”.',
        'Lista de espera con descuento de bienvenida.',
        'Producto a creadores y a las primeras tiendas.',
        'Anuncio de los primeros puntos de venta.',
      ],
    },
    {
      tiempo: 'Semanas 0 a 2',
      titulo: 'Apertura',
      items: [
        'Tienda abierta y código de bienvenida.',
        'Contenido de creadores, cada uno con su código.',
        'Degustaciones en las primeras tiendas.',
        'Pauta en Meta a Santiago, 25 a 45 años.',
      ],
    },
    {
      tiempo: 'Mes 2 en adelante',
      titulo: 'Ritmo',
      items: [
        'Calendario mensual por pilares.',
        'Cada tienda nueva es una publicación.',
        'Remarketing a quien visitó la tienda.',
        'Empuje a la suscripción.',
      ],
    },
  ],

  pilares: [
    { titulo: 'Picoteo y once', texto: 'Recetas y tablas con Shiva, en los momentos en que se come en Chile.' },
    { titulo: 'Sin gluten de verdad', texto: 'Certificaciones, masa madre y la fábrica BPM: confianza para celíacos y veganos.' },
    { titulo: 'Dónde comprar', texto: 'Cada punto de venta nuevo se publica. Las redes empujan el canal mayorista.' },
    { titulo: 'Ya traían merkén', texto: 'Las Mediterráneas y las de Carbón Vegetal llevan merkén. Un gancho chileno que la marca ya tiene.' },
  ],

  pendientes: [
    {
      titulo: 'Importador en Chile',
      texto:
        'Una empresa con RUT e inicio de actividades en el SII que importa, factura y responde ante la autoridad sanitaria. Puede ser una sociedad de Shiva o un distribuidor.',
    },
    {
      titulo: 'Permisos sanitarios',
      texto:
        'Por cada partida: Certificado de Destinación Aduanera (CDA) y autorización de uso y disposición de la SEREMI de Salud.',
    },
    {
      titulo: 'Etiqueta chilena',
      texto:
        'Rótulo en español con los datos del importador y los sellos “ALTO EN” que correspondan, según el Reglamento Sanitario de los Alimentos.',
    },
    {
      titulo: 'Stock en Santiago',
      texto:
        'Bodega propia o un servicio de fulfillment para despachar en 24–48 h. La importación es por partida, no pedido a pedido.',
    },
    {
      titulo: 'Precios en CLP',
      texto:
        'Costo puesto en Santiago (producto, flete e internación), IVA del 19 % y margen de cada canal. Los de esta propuesta son de referencia.',
    },
    {
      titulo: 'Dominio y cuentas',
      texto:
        'shivacocina.cl figuraba libre en NIC Chile el 20 de octubre de 2026. Conviene inscribirlo y reservar @shivacocina.cl en Instagram y TikTok ya.',
    },
  ],

  hojaDeRuta: [
    {
      semanas: 'Semanas 1–2',
      titulo: 'Definiciones',
      texto: 'Kickoff, precios en CLP, tabla mayorista, dominio y cuentas. Diseño de la tienda.',
    },
    {
      semanas: 'Semanas 3–5',
      titulo: 'Construcción',
      texto: 'Tienda, catálogo, pagos, despacho y cuenta mayorista. Contenido de expectativa y selección de creadores.',
    },
    {
      semanas: 'Semanas 5–7',
      titulo: 'Expectativa',
      texto: 'Instagram y TikTok activos, lista de espera, muestras a tiendas y creadores, compras de prueba.',
    },
    {
      semanas: 'Semana 8',
      titulo: 'Lanzamiento',
      texto: 'Tienda abierta, código de bienvenida, pauta y degustaciones en los primeros puntos de venta.',
    },
    {
      semanas: 'Mes 3 en adelante',
      titulo: 'Ritmo',
      texto: 'Redes y blog cada mes, campañas por temporada y nuevos puntos de venta.',
    },
  ],

  // Valores en CLP, más IVA. Se ajustan acá y los totales se recalculan.
  inversion: {
    unicos: [
      {
        concepto: 'Tienda shivacocina.cl + canal mayorista',
        detalle: 'Diseño, catálogo, pagos, despacho, cuenta mayorista, suscripción, medición y capacitación.',
        monto: 1890000,
      },
    ],
    mensuales: [
      {
        concepto: 'Redes @shivacocina.cl + creadores de contenido',
        detalle:
          'Campaña de lanzamiento, 12 publicaciones al mes, historias, comunidad, gestión de creadores de contenido, pauta e informe.',
        monto: 590000,
        mesesMinimos: 3,
      },
      {
        concepto: 'Mantención y blog',
        detalle:
          'Mantención y cambios en la página, y el blog optimizado para Google y para los buscadores con IA (SEO y AEO).',
        monto: 150000,
      },
    ] as { concepto: string; detalle: string; monto: number; mesesMinimos?: number }[],
    /** Meses que suma el total de referencia. */
    mesesTotal: 3,
    terceros: [
      'Comisiones de Webpay y Mercado Pago por cada venta.',
      'Dominio .cl en NIC Chile.',
      'Pauta en Meta: sugerimos partir con $300.000 al mes.',
      'Producto para creadores, degustaciones y despachos de muestras.',
    ],
    pago: '50 % al iniciar y 50 % al lanzamiento. Las mensualidades se facturan mes a mes.',
  },

  medicion: [
    {
      area: 'Tienda y blog',
      metricas: ['Conversión y ticket promedio', 'Pedidos con suscripción', 'Recompra a 60 días', 'Visitas desde Google y buscadores con IA'],
    },
    { area: 'Mayoristas', metricas: ['Tiendas activas', 'Pedido promedio', 'Recompra mensual', 'Comunas cubiertas'] },
    { area: 'Redes', metricas: ['Seguidores en Chile', 'Guardados y compartidos', 'Costo por compra', 'Ventas por creador'] },
  ],

  pasos: [
    'Revisar esta propuesta y ajustar el alcance.',
    'Inscribir shivacocina.cl y reservar @shivacocina.cl en Instagram y TikTok.',
    'Definir importador, bodega y precios en CLP.',
    'Kickoff: arranca la semana 1 de la hoja de ruta.',
  ],
};
