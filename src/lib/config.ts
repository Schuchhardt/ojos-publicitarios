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
export const MOSTRAR_EQUIPO = true;
export const MOSTRAR_WHATSAPP = true;
/**
 * Modal "Preparar mi solicitud": formulario que arma el mensaje y lo abre en
 * WhatsApp o en el correo. No envía nada por su cuenta ni necesita backend.
 * En false, el botón principal del bloque de contacto apunta al correo.
 */
export const MOSTRAR_FORMULARIO_SOLICITUD = true;

// ---------------------------------------------------------------------------
// Contacto directo
// ---------------------------------------------------------------------------
/** Teléfono en formato internacional sin signos (para wa.me). '' oculta WhatsApp. */
export const WHATSAPP_NUMERO = '56900000000'; // TODO: número real
export const WHATSAPP_MENSAJE = 'Hola, vengo del sitio web y me gustaría conversar sobre mi proyecto.';
export const CONTACTO_EMAIL = 'contacto@ojospublicitarios.cl'; // TODO: correo real

export const TIENE_WHATSAPP = MOSTRAR_WHATSAPP && WHATSAPP_NUMERO !== '';

export function whatsappUrl(mensaje: string = WHATSAPP_MENSAJE): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

export function mailtoUrl(asunto = 'Quiero conversar sobre mi proyecto', cuerpo = ''): string {
  const params = new URLSearchParams({ subject: asunto });
  if (cuerpo) params.set('body', cuerpo);
  return `mailto:${CONTACTO_EMAIL}?${params.toString()}`;
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

export const REDES: Red[] = [
  { nombre: 'WhatsApp', url: TIENE_WHATSAPP ? whatsappUrl() : '', icono: 'whatsapp' },
  { nombre: 'Instagram', url: 'https://instagram.com/', icono: 'instagram' }, // TODO: perfil real
  { nombre: 'TikTok', url: 'https://tiktok.com/', icono: 'tiktok' }, // TODO: perfil real
  { nombre: 'Facebook', url: 'https://facebook.com/', icono: 'facebook' }, // TODO: perfil real
].filter((red) => red.url !== '');

// ---------------------------------------------------------------------------
// Navegación del header
// ---------------------------------------------------------------------------
export const NAV = [
  { texto: 'Diseño web', href: '#servicios' },
  { texto: 'Qué incluye', href: '#automatizacion' },
  ...(MOSTRAR_POLITICA_IA ? [{ texto: 'Cómo trabajamos', href: '#criterio' }] : []),
  ...(MOSTRAR_EQUIPO ? [{ texto: 'Equipo', href: '#equipo' }] : []),
];
