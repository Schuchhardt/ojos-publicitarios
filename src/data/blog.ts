import { getCollection, type CollectionEntry } from 'astro:content';
import type { Idioma } from './home';

export type Nota = CollectionEntry<'blog'>;

/** Dónde vive el blog de cada idioma. */
export const RUTA_BLOG: Record<Idioma, string> = { es: '/blog/', en: '/en/blog/' };

/** Slug de la URL: las notas en inglés tienen id `en/<slug>`. */
export function slugNota(nota: Nota): string {
  return nota.id.replace(/^en\//, '');
}

export function rutaNota(nota: Nota): string {
  return `${RUTA_BLOG[nota.data.idioma]}${slugNota(nota)}/`;
}

/** Notas de un idioma, de la más nueva a la más antigua. */
export async function notasDe(idioma: Idioma): Promise<Nota[]> {
  return (await getCollection('blog', (nota) => nota.data.idioma === idioma)).sort(
    (a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf()
  );
}

/** Ruta de la nota en cada idioma en que existe, para los hreflang. */
export async function alternosDe(nota: Nota): Promise<Partial<Record<Idioma, string>>> {
  const alternos: Partial<Record<Idioma, string>> = { [nota.data.idioma]: rutaNota(nota) };
  if (!nota.data.clave) return alternos;
  const pares = await getCollection(
    'blog',
    (otra) => otra.data.clave === nota.data.clave && otra.data.idioma !== nota.data.idioma
  );
  for (const par of pares) alternos[par.data.idioma] = rutaNota(par);
  return alternos;
}

export interface TextosBlog {
  inicio: string;
  blog: string;
  migasEtiqueta: string;
  listado: {
    titulo: string;
    descripcion: string;
    rotulo: string;
    h1: string[];
    bajada: string;
    leer: string;
  };
  minLectura: string;
  enCorto: string;
  faq: string;
  cierre: { titulo: string; texto: string; cotizar: string; contactar: string };
  volver: string;
}

export const TEXTOS_BLOG: Record<Idioma, TextosBlog> = {
  es: {
    inicio: 'Inicio',
    blog: 'Blog',
    migasEtiqueta: 'Ruta de navegación',
    listado: {
      titulo: 'Blog — Guías de diseño web y automatización | Ojos Publicitarios',
      descripcion:
        'Guías claras para decidir qué sitio web necesita tu negocio, cómo manejar sus redes y qué conviene automatizar. Escritas para pymes y emprendedores.',
      rotulo: 'NOTAS DEL ESTUDIO',
      h1: ['Lo que nos preguntan,', 'respondido en largo.'],
      bajada:
        'Guías para decidir qué necesita tu negocio antes de encargar una web o automatizar la atención. Sin tecnicismos y sin vender humo.',
      leer: 'Leer la nota',
    },
    minLectura: 'min de lectura',
    enCorto: 'EN CORTO',
    faq: 'Preguntas frecuentes',
    cierre: {
      titulo: '¿Listo para llevar tu negocio a digital?',
      texto:
        'Cuéntanos qué necesitas —página web, redes sociales o automatizar tareas— y te respondemos con una cotización concreta: qué incluye, de qué nos encargamos y cuánto cuesta.',
      cotizar: 'Cotizar mi proyecto',
      contactar: 'Contáctanos por WhatsApp',
    },
    volver: '← Todas las notas',
  },
  en: {
    inicio: 'Home',
    blog: 'Blog',
    migasEtiqueta: 'Breadcrumb',
    listado: {
      titulo: 'Blog — Websites, social media & automation for small business | Ojos Publicitarios',
      descripcion:
        'Plain-English guides for businesses going digital: what website you need, how to handle social media, and which tasks are worth automating.',
      rotulo: 'STUDIO NOTES',
      h1: ['Going digital,', 'explained without the jargon.'],
      bajada:
        'Guides to help you decide what your business needs before you pay for a website, hire social media help or automate anything.',
      leer: 'Read the article',
    },
    minLectura: 'min read',
    enCorto: 'THE SHORT ANSWER',
    faq: 'Frequently asked questions',
    cierre: {
      titulo: 'Ready to take your business online?',
      texto:
        "Tell us what you need —a website, social media management or automating busywork— and we'll reply with a clear quote: what's included, what we handle and what it costs.",
      cotizar: 'Get a free quote',
      contactar: 'Contact us',
    },
    volver: '← All articles',
  },
};
