import { CONTACTO_EMAIL, MARCA, TIENE_EMAIL, TIENE_WHATSAPP, WHATSAPP_DISPLAY } from './config';

/** Identificador estable del negocio: todo lo demás lo referencia. */
export function idNegocio(site: URL | undefined): string {
  return new URL('/#negocio', site).href;
}

export function faqJsonLd(preguntas: { pregunta: string; respuesta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((item) => ({
      '@type': 'Question',
      name: item.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: item.respuesta },
    })),
  };
}

export function migasJsonLd(items: { nombre: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nombre,
      item: item.url,
    })),
  };
}

interface Articulo {
  titulo: string;
  descripcion: string;
  url: string;
  imagen: string;
  fecha: Date;
  actualizado?: Date;
  autor: string;
  site: URL | undefined;
}

export function articuloJsonLd(a: Articulo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.titulo,
    description: a.descripcion,
    image: a.imagen,
    datePublished: a.fecha.toISOString(),
    dateModified: (a.actualizado ?? a.fecha).toISOString(),
    inLanguage: 'es-CL',
    author: { '@type': 'Organization', name: a.autor, '@id': idNegocio(a.site) },
    publisher: { '@id': idNegocio(a.site) },
    mainEntityOfPage: { '@type': 'WebPage', '@id': a.url },
  };
}

/** Datos del negocio, compartidos por todas las páginas. */
export function negocioJsonLd(site: URL | undefined) {
  const contacto: Record<string, unknown>[] = [];
  if (TIENE_WHATSAPP) {
    contacto.push({
      '@type': 'ContactPoint',
      contactType: 'ventas',
      telephone: WHATSAPP_DISPLAY,
      availableLanguage: ['es'],
    });
  }
  if (TIENE_EMAIL) {
    contacto.push({ '@type': 'ContactPoint', contactType: 'ventas', email: CONTACTO_EMAIL });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': idNegocio(site),
    name: MARCA,
    url: site?.toString(),
    ...(contacto.length > 0 ? { contactPoint: contacto } : {}),
  };
}
