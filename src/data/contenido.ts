// Atajos al contenido en español, para lo que no depende del idioma de la
// página: los datos estructurados, /llms.txt y las secciones opcionales.
// El texto de la home, en los dos idiomas, vive en `home.ts`.
import { HOME } from './home';

export type { Cifra, Paso, Pregunta, Proyecto, Servicio } from './home';

const es = HOME.es;

/** Servicios de diseño web. */
export const SERVICIOS = es.web.servicios;
export const AUTOMATIZACIONES = es.unico.items;
export const SERVICIOS_MARKETING = es.marketing.servicios;
export const MODULOS_SOFTWARE = es.software.modulos;
export const INDUSTRIAS = es.industrias.items;
export const PROYECTOS = es.proyectos.lista;
export const FAQ = es.faq.preguntas;

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
