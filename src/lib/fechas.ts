const FORMATOS = {
  es: new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
  en: new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
};

/** "22 de septiembre de 2026" o "September 22, 2026". */
export function fechaLarga(fecha: Date, idioma: 'es' | 'en' = 'es'): string {
  return FORMATOS[idioma].format(fecha);
}

/** "2026-09-22", para el atributo datetime de <time>. */
export function fechaISO(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

/** Minutos de lectura a 200 palabras por minuto, mínimo 1. */
export function minutosDeLectura(texto: string): number {
  const palabras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palabras / 200));
}
