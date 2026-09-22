// Contenido de la propuesta para Pesquera Ludrimar, en los dos idiomas.
// El inglés es el que persigue compradores afuera; el español es el que revisa
// el cliente y el que sirve para el mercado local.

export type Idioma = 'en' | 'es';

export const IDIOMAS: { codigo: Idioma; etiqueta: string; ruta: string }[] = [
  { codigo: 'en', etiqueta: 'EN', ruta: '/propuestas/ludrimar/' },
  { codigo: 'es', etiqueta: 'ES', ruta: '/propuestas/ludrimar/es/' },
];

interface Corte {
  nombre: string;
  bajada: string;
  texto: string;
  imagen: string;
}

interface Etapa {
  paso: string;
  titulo: string;
  texto: string;
}

interface Bloque {
  titulo: string;
  texto: string;
}

interface Especificacion {
  campo: string;
  valor: string;
}

export interface ContenidoLudrimar {
  meta: { titulo: string; descripcion: string };
  nav: { texto: string; href: string }[];
  cta: string;
  hero: {
    epigrafe: string;
    titulo: string[];
    bajada: string;
    ctaPrimario: string;
    ctaSecundario: string;
    pie: string;
  };
  cifras: { valor: string; texto: string }[];
  producto: {
    rotulo: string;
    titulo: string;
    bajada: string;
    cortes: Corte[];
  };
  specs: {
    rotulo: string;
    titulo: string;
    bajada: string;
    cta: string;
    filas: Especificacion[];
  };
  calidad: { rotulo: string; titulo: string; bajada: string; bloques: Bloque[] };
  proceso: { rotulo: string; titulo: string; bajada: string; etapas: Etapa[] };
  otras: { rotulo: string; titulo: string; bajada: string };
  contacto: {
    rotulo: string;
    titulo: string[];
    bajada: string;
    email: string;
    planta: string;
    direccion: string;
    campos: {
      empresa: string;
      pais: string;
      nombre: string;
      correo: string;
      producto: string;
      volumen: string;
      mensaje: string;
    };
    marcadores: {
      empresa: string;
      pais: string;
      nombre: string;
      correo: string;
      volumen: string;
      mensaje: string;
    };
    productos: string[];
    enviar: string;
    nota: string;
    okTitulo: string;
    okTexto: string;
  };
  pie: { descripcion: string; legal: string };
}

const CORTES_IMAGENES = [
  'ludrimar/productos/tubes.jpg',
  'ludrimar/productos/tentacles.jpg',
  'ludrimar/productos/wings.jpg',
  'ludrimar/productos/rings.jpg',
  'ludrimar/productos/strips.jpg',
  'ludrimar/productos/steaks.jpg',
];

export const CONTENIDO: Record<Idioma, ContenidoLudrimar> = {
  en: {
    meta: {
      titulo: 'Pesquera Ludrimar Ltda — Chilean Humboldt squid, processed to spec',
      descripcion:
        'Humboldt squid (Dosidicus gigas) from Chile: tubes, tentacles, wings, rings and strips processed to buyer specification. Sernapesca PAC, SENASA validated.',
    },
    nav: [
      { texto: 'Squid', href: '#squid' },
      { texto: 'Specifications', href: '#specs' },
      { texto: 'Quality', href: '#quality' },
      { texto: 'Process', href: '#process' },
      { texto: 'Contact', href: '#contact' },
    ],
    cta: 'Request a quote',
    hero: {
      epigrafe: 'Humboldt squid · Dosidicus gigas · Chile',
      titulo: ['Chilean squid,', 'cut to your spec,', 'shipped worldwide.'],
      bajada:
        'Fifteen years handling, processing and cold-storing seafood for the white fish and salmon industry. Today that plant works for one species: Humboldt squid, processed to the specification your line runs on.',
      ctaPrimario: 'Request a quote',
      ctaSecundario: 'See specifications',
      pie: 'Sernapesca PAC · SENASA validated production and processes · Export authorizations in place',
    },
    cifras: [
      { valor: '15+', texto: 'Years processing and cold-storing seafood in Chile' },
      {
        valor: 'PAC',
        texto: 'Quality Assurance Programme under Sernapesca, the Chilean fisheries authority',
      },
      { valor: 'SENASA', texto: 'Production and process validation' },
      {
        valor: 'Worldwide',
        texto: 'Shipping to Asia, Europe and North America, with the paperwork each market requires',
      },
    ],
    producto: {
      rotulo: 'The product',
      titulo: 'One species. Every cut your line needs.',
      bajada:
        'Humboldt squid is abundant, consistent and firm enough to travel. We clean, cut and grade it in our own plant, so what lands in your factory is already the format you work with.',
      cortes: [
        {
          nombre: 'Tubes',
          bajada: 'Cleaned mantle',
          texto: 'Skin-on or skin-off, graded by weight. The base cut for rings and strips.',
          imagen: CORTES_IMAGENES[0],
        },
        {
          nombre: 'Tentacles',
          bajada: 'Whole or cut',
          texto: 'Cleaned and graded, ready for the fryer or the retail tray.',
          imagen: CORTES_IMAGENES[1],
        },
        {
          nombre: 'Wings',
          bajada: 'Fins',
          texto: 'Trimmed and graded. Firm texture, strong yield for value-added lines.',
          imagen: CORTES_IMAGENES[2],
        },
        {
          nombre: 'Rings',
          bajada: 'Cut to width',
          texto: 'Cut to the width your line needs, IQF so they separate in the bag.',
          imagen: CORTES_IMAGENES[3],
        },
        {
          nombre: 'Strips',
          bajada: 'Cut to length',
          texto: 'Uniform strips for breaded, marinated and ready-meal producers.',
          imagen: CORTES_IMAGENES[4],
        },
        {
          nombre: 'Steaks',
          bajada: 'Tenderized',
          texto: 'Portioned and tenderized to spec, for foodservice and retail.',
          imagen: CORTES_IMAGENES[5],
        },
      ],
    },
    specs: {
      rotulo: 'Specifications',
      titulo: 'The sheet your buyer asks for.',
      bajada:
        'Everything a purchasing team needs before the first call, on the page instead of in a PDF they have to request. Grades and packing are set with each buyer.',
      cta: 'Ask for the full spec sheet',
      filas: [
        { campo: 'Species', valor: 'Humboldt squid — Dosidicus gigas' },
        { campo: 'Catch area', valor: 'FAO 87 — Southeast Pacific, Chile' },
        { campo: 'Presentation', valor: 'IQF, block frozen or interleaved' },
        { campo: 'Packing', valor: '10 kg inner bags in 20 kg master cartons' },
        { campo: 'Size grades', valor: 'Tubes 100/200, 200/400 and 400 g up · rings 8 to 12 mm' },
        { campo: 'Glazing', valor: '10% standard, adjustable from 5% to 20%' },
        { campo: 'Storage', valor: '−18 °C or below' },
        { campo: 'Shelf life', valor: '24 months frozen' },
        { campo: 'Container load', valor: 'About 25 t per 40 ft reefer' },
      ],
    },
    calidad: {
      rotulo: 'Quality and compliance',
      titulo: 'Cleared to ship, on paper.',
      bajada:
        'Ludrimar works under a quality assurance plan built on Sernapesca regulations. Every dispatch carries the authorizations the destination market requires.',
      bloques: [
        {
          titulo: 'Sernapesca PAC',
          texto:
            "Quality Assurance Programme of Chile's National Fisheries and Aquaculture Service, the authority that certifies seafood exports.",
        },
        {
          titulo: 'SENASA validation',
          texto: 'Production and processes validated for export.',
        },
        {
          titulo: 'Cold chain',
          texto:
            'Own cold storage: the product stays under our control from reception to the container door.',
        },
        {
          titulo: 'Traceability',
          texto: 'Every lot recorded from reception to dispatch, with documentation per shipment.',
        },
        {
          titulo: 'Trained workforce',
          texto:
            'A large specialised workforce, hired and trained locally. Handling quality is a people problem before it is a machine problem.',
        },
        {
          titulo: 'Certifications',
          texto:
            'HACCP plan across the line, BRCGS Food Safety, and the registrations required to ship into the European Union, the United States and China.',
        },
      ],
    },
    proceso: {
      rotulo: 'How it works',
      titulo: 'From reception to container.',
      bajada:
        'One plant, one team and one chain of custody. No intermediaries between the raw material and the paperwork your customs broker receives.',
      etapas: [
        {
          paso: '01',
          titulo: 'Reception',
          texto:
            'Raw material is received, checked and chilled on arrival. Every lot is recorded from the moment it enters the plant.',
        },
        {
          paso: '02',
          titulo: 'Processing',
          texto:
            'Cleaning, cutting and grading to the specification agreed with the buyer, by a trained workforce.',
        },
        {
          paso: '03',
          titulo: 'Freezing and storage',
          texto: 'Frozen and held in our own cold storage until the container is booked.',
        },
        {
          paso: '04',
          titulo: 'Documentation and dispatch',
          texto:
            'Health certificates and export paperwork issued under the Sernapesca programme, then loaded for shipment.',
        },
      ],
    },
    otras: {
      rotulo: 'Also available',
      titulo: 'White fish and salmon.',
      bajada:
        'The company was built handling, processing and storing white fish and salmon, and that capacity is still here. Squid is where we specialise; it is not all we can run.',
    },
    contacto: {
      rotulo: 'Talk to us',
      titulo: ['Tell us what you buy.', "We'll tell you what we can ship."],
      bajada:
        'Send the cut, the volume and the market. You get an answer from the people who run the plant, not a generic reply.',
      email: 'Email',
      planta: 'Plant',
      direccion: 'Puerto Montt, Chile',
      campos: {
        empresa: 'Company',
        pais: 'Country',
        nombre: 'Contact name',
        correo: 'Email',
        producto: 'Product',
        volumen: 'Volume per month',
        mensaje: 'Message',
      },
      marcadores: {
        empresa: 'Your company',
        pais: 'Destination market',
        nombre: 'Who we should reply to',
        correo: 'name@company.com',
        volumen: 'e.g. 2 containers',
        mensaje: 'Specification, incoterm, target price…',
      },
      productos: [
        'Squid tubes',
        'Squid tentacles',
        'Squid wings',
        'Rings or strips',
        'White fish',
        'Salmon',
        'Not sure yet',
      ],
      enviar: 'Send enquiry',
      nota: 'Demo: en el sitio publicado esta consulta llega al correo de Ludrimar.',
      okTitulo: 'Thank you — we have your enquiry.',
      okTexto: 'Someone from the plant will get back to you.',
    },
    pie: {
      descripcion:
        'Pesquera Ludrimar Ltda — handling, processing and cold storage of seafood. Chile.',
      legal: '© 2026 Pesquera Ludrimar Ltda',
    },
  },

  es: {
    meta: {
      titulo: 'Pesquera Ludrimar Ltda — Jibia chilena procesada a pedido',
      descripcion:
        'Jibia (Dosidicus gigas) desde Chile: tubos, tentáculos, aletas, anillos y tiras procesados según la especificación del comprador. PAC Sernapesca, validación SENASA.',
    },
    nav: [
      { texto: 'Jibia', href: '#squid' },
      { texto: 'Ficha técnica', href: '#specs' },
      { texto: 'Calidad', href: '#quality' },
      { texto: 'Proceso', href: '#process' },
      { texto: 'Contacto', href: '#contact' },
    ],
    cta: 'Pedir cotización',
    hero: {
      epigrafe: 'Jibia · Dosidicus gigas · Chile',
      titulo: ['Jibia chilena,', 'procesada a tu medida,', 'despachada al mundo.'],
      bajada:
        'Quince años manipulando, procesando y almacenando productos del mar para la industria de la pesca blanca y el salmón. Hoy esa planta trabaja para una especie: jibia, procesada según la especificación con la que corre tu línea.',
      ctaPrimario: 'Pedir cotización',
      ctaSecundario: 'Ver ficha técnica',
      pie: 'PAC Sernapesca · Producción y procesos validados por SENASA · Autorizaciones de exportación vigentes',
    },
    cifras: [
      { valor: '15+', texto: 'Años procesando y almacenando productos del mar en Chile' },
      {
        valor: 'PAC',
        texto: 'Programa de Aseguramiento de Calidad de Sernapesca',
      },
      { valor: 'SENASA', texto: 'Validación de producción y procesos' },
      {
        valor: 'Al mundo',
        texto: 'Despachos a Asia, Europa y Norteamérica, con los papeles que pide cada mercado',
      },
    ],
    producto: {
      rotulo: 'El producto',
      titulo: 'Una especie. Todos los cortes que tu línea necesita.',
      bajada:
        'La jibia es abundante, pareja y lo bastante firme para viajar. La limpiamos, cortamos y calibramos en planta propia, así que lo que llega a tu fábrica ya viene en el formato con el que trabajas.',
      cortes: [
        {
          nombre: 'Tubos',
          bajada: 'Manto limpio',
          texto: 'Con o sin piel, calibrado por peso. Es la base de los anillos y las tiras.',
          imagen: CORTES_IMAGENES[0],
        },
        {
          nombre: 'Tentáculos',
          bajada: 'Enteros o cortados',
          texto: 'Limpios y calibrados, listos para freidora o para bandeja de retail.',
          imagen: CORTES_IMAGENES[1],
        },
        {
          nombre: 'Aletas',
          bajada: 'Alas',
          texto: 'Recortadas y calibradas. Textura firme y buen rendimiento para valor agregado.',
          imagen: CORTES_IMAGENES[2],
        },
        {
          nombre: 'Anillos',
          bajada: 'Cortados a ancho',
          texto: 'Al ancho que necesita tu línea, IQF para que se separen dentro de la bolsa.',
          imagen: CORTES_IMAGENES[3],
        },
        {
          nombre: 'Tiras',
          bajada: 'Cortadas a largo',
          texto: 'Tiras parejas para apanados, marinados y platos preparados.',
          imagen: CORTES_IMAGENES[4],
        },
        {
          nombre: 'Filetes',
          bajada: 'Tiernizados',
          texto: 'Porcionados y tiernizados a pedido, para food service y retail.',
          imagen: CORTES_IMAGENES[5],
        },
      ],
    },
    specs: {
      rotulo: 'Ficha técnica',
      titulo: 'La ficha que te va a pedir el comprador.',
      bajada:
        'Todo lo que revisa un área de compras antes de la primera llamada, en la página y no en un PDF que hay que solicitar. Calibres y empaque se definen con cada comprador.',
      cta: 'Pedir la ficha completa',
      filas: [
        { campo: 'Especie', valor: 'Jibia — Dosidicus gigas' },
        { campo: 'Zona de captura', valor: 'FAO 87 — Pacífico Sudeste, Chile' },
        { campo: 'Presentación', valor: 'IQF, bloque o interfoliado' },
        { campo: 'Empaque', valor: 'Bolsas de 10 kg en caja máster de 20 kg' },
        { campo: 'Calibres', valor: 'Tubos 100/200, 200/400 y 400 g arriba · anillos de 8 a 12 mm' },
        { campo: 'Glaseado', valor: '10% estándar, ajustable de 5% a 20%' },
        { campo: 'Almacenaje', valor: '−18 °C o menos' },
        { campo: 'Vida útil', valor: '24 meses congelado' },
        { campo: 'Carga', valor: 'Unas 25 t por contenedor reefer de 40 pies' },
      ],
    },
    calidad: {
      rotulo: 'Calidad y cumplimiento',
      titulo: 'Con los papeles en regla.',
      bajada:
        'Ludrimar trabaja con un plan de aseguramiento de calidad basado en las normativas de Sernapesca. Cada despacho sale con las autorizaciones que exige el mercado de destino.',
      bloques: [
        {
          titulo: 'PAC Sernapesca',
          texto:
            'Programa de Aseguramiento de Calidad del Servicio Nacional de Pesca y Acuicultura, la autoridad que certifica las exportaciones del rubro.',
        },
        {
          titulo: 'Validación SENASA',
          texto: 'Producción y procesos validados para exportación.',
        },
        {
          titulo: 'Cadena de frío',
          texto:
            'Almacenamiento propio: el producto no sale de nuestro control entre la recepción y la puerta del contenedor.',
        },
        {
          titulo: 'Trazabilidad',
          texto: 'Cada lote registrado desde la recepción hasta el despacho, con documentación por embarque.',
        },
        {
          titulo: 'Mano de obra especializada',
          texto:
            'Un alto número de trabajadores contratados y formados localmente. La calidad de la manipulación es un tema de personas antes que de máquinas.',
        },
        {
          titulo: 'Certificaciones',
          texto:
            'Plan HACCP en toda la línea, BRCGS Food Safety y los registros para despachar a la Unión Europea, Estados Unidos y China.',
        },
      ],
    },
    proceso: {
      rotulo: 'Cómo funciona',
      titulo: 'De la recepción al contenedor.',
      bajada:
        'Una planta, un equipo y una sola cadena de custodia. Sin intermediarios entre la materia prima y los papeles que recibe tu agente de aduana.',
      etapas: [
        {
          paso: '01',
          titulo: 'Recepción',
          texto:
            'La materia prima se recibe, se revisa y se enfría al llegar. Cada lote queda registrado desde que entra a planta.',
        },
        {
          paso: '02',
          titulo: 'Proceso',
          texto:
            'Limpieza, corte y calibrado según la especificación acordada con el comprador, con mano de obra capacitada.',
        },
        {
          paso: '03',
          titulo: 'Congelado y almacenaje',
          texto: 'Congelado y mantenido en cámara propia hasta que se reserva el contenedor.',
        },
        {
          paso: '04',
          titulo: 'Documentación y despacho',
          texto:
            'Certificados sanitarios y documentación de exportación emitidos bajo el programa de Sernapesca, y carga para embarque.',
        },
      ],
    },
    otras: {
      rotulo: 'También disponible',
      titulo: 'Pesca blanca y salmón.',
      bajada:
        'La empresa se construyó manipulando, procesando y almacenando pesca blanca y salmón, y esa capacidad sigue intacta. La jibia es la especialización, no el límite.',
    },
    contacto: {
      rotulo: 'Conversemos',
      titulo: ['Cuéntanos qué compras.', 'Te decimos qué podemos despachar.'],
      bajada:
        'Manda el corte, el volumen y el mercado de destino. Responde quien maneja la planta, no un correo genérico.',
      email: 'Correo',
      planta: 'Planta',
      direccion: 'Puerto Montt, Chile',
      campos: {
        empresa: 'Empresa',
        pais: 'País',
        nombre: 'Nombre de contacto',
        correo: 'Correo',
        producto: 'Producto',
        volumen: 'Volumen mensual',
        mensaje: 'Mensaje',
      },
      marcadores: {
        empresa: 'Tu empresa',
        pais: 'Mercado de destino',
        nombre: '¿A quién le respondemos?',
        correo: 'nombre@empresa.com',
        volumen: 'ej. 2 contenedores',
        mensaje: 'Especificación, incoterm, precio objetivo…',
      },
      productos: [
        'Tubos de jibia',
        'Tentáculos de jibia',
        'Aletas de jibia',
        'Anillos o tiras',
        'Pesca blanca',
        'Salmón',
        'Aún no lo tengo claro',
      ],
      enviar: 'Enviar consulta',
      nota: 'Demo: en el sitio publicado esta consulta llega al correo de Ludrimar.',
      okTitulo: 'Gracias, recibimos tu consulta.',
      okTexto: 'Te responde alguien de la planta.',
    },
    pie: {
      descripcion:
        'Pesquera Ludrimar Ltda — manipulación, proceso y almacenamiento de productos del mar. Chile.',
      legal: '© 2026 Pesquera Ludrimar Ltda',
    },
  },
};
