// ---------------------------------------------------------------------------
// Identidad
// ---------------------------------------------------------------------------
export const MARCA = 'Ojos Publicitarios';
export const TAGLINE = 'Diseño con visión. Comunicación con propósito.';
export const ANIO = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Secciones opcionales — equivalen a los toggles del diseño (sc-if).
// Poner en false oculta la sección completa del sitio.
// ---------------------------------------------------------------------------
export const MOSTRAR_POLITICA_IA = true;
export const MOSTRAR_EQUIPO = false;
export const MOSTRAR_WHATSAPP = true;
/**
 * Modal "Preparar mi solicitud": formulario que envía la consulta por Formspree.
 * En false, el botón principal del bloque de contacto lleva a WhatsApp.
 */
export const MOSTRAR_FORMULARIO_SOLICITUD = true;

// ---------------------------------------------------------------------------
// Contacto directo
// ---------------------------------------------------------------------------
/** Teléfono en formato internacional sin signos (para wa.me). '' oculta WhatsApp. */
export const WHATSAPP_NUMERO: string = '56922212128';
/** Cómo se muestra el número en pantalla. */
export const WHATSAPP_DISPLAY = '+56 9 2221 2128';
export const WHATSAPP_MENSAJE = 'Hola, vengo del sitio web y me gustaría conversar sobre mi proyecto.';

/** Endpoint del formulario de contacto (Formspree). */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnpndzjw';

/**
 * Correo de contacto. Mientras esté vacío no se muestra ningún enlace de correo
 * en el sitio: las consultas entran por el formulario y por WhatsApp.
 */
export const CONTACTO_EMAIL: string = ''; // TODO: correo real

export const TIENE_WHATSAPP = MOSTRAR_WHATSAPP && WHATSAPP_NUMERO !== '';
export const TIENE_EMAIL = CONTACTO_EMAIL !== '';

export function whatsappUrl(mensaje: string = WHATSAPP_MENSAJE): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

export function mailtoUrl(asunto = 'Quiero conversar sobre mi proyecto', cuerpo = ''): string {
  const params = new URLSearchParams({ subject: asunto });
  if (cuerpo) params.set('body', cuerpo);
  return `mailto:${CONTACTO_EMAIL}?${params.toString()}`;
}

/** Destino del botón principal cuando el formulario está apagado. */
export function contactoDirectoUrl(): string {
  if (TIENE_WHATSAPP) return whatsappUrl();
  return TIENE_EMAIL ? mailtoUrl() : '#contacto';
}

// ---------------------------------------------------------------------------
// Redes — se muestran en contacto y footer. Dejar la url vacía oculta el ícono.
// ---------------------------------------------------------------------------
export interface Red {
  nombre: string;
  url: string;
  /** slug de simpleicons.org */
  icono: string;
}

// Pegar la URL de cada perfil. Mientras esté vacía, el ícono no se muestra:
// mejor eso que un enlace que lleva a la portada de la red.
export const REDES: Red[] = [
  { nombre: 'WhatsApp', url: TIENE_WHATSAPP ? whatsappUrl() : '', icono: 'whatsapp' },
  { nombre: 'Instagram', url: 'https://www.instagram.com/ojospublicitarios/', icono: 'instagram' },
  { nombre: 'TikTok', url: '', icono: 'tiktok' }, // TODO: perfil real
  { nombre: 'Facebook', url: '', icono: 'facebook' }, // TODO: perfil real
].filter((red) => red.url !== '');

// ---------------------------------------------------------------------------
// Navegación del header
// ---------------------------------------------------------------------------
export const NAV = [
  { texto: 'Diseño web', href: '/#servicios' },
  { texto: 'Qué incluye', href: '/#automatizacion' },
  ...(MOSTRAR_POLITICA_IA ? [{ texto: 'Cómo trabajamos', href: '/#criterio' }] : []),
  ...(MOSTRAR_EQUIPO ? [{ texto: 'Equipo', href: '/#equipo' }] : []),
];
