/** Validación mínima del formulario de contacto, compartida entre campos. */

export function nombreValido(valor: string): boolean {
  return valor.trim().length >= 2;
}

export function emailValido(valor: string): boolean {
  const v = valor.trim();
  // Suficiente para atajar errores de tipeo; la validación real la hace el envío.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

export interface Campo {
  el: HTMLInputElement | HTMLTextAreaElement | null;
  ok: boolean;
  mensaje: string;
}

/** Devuelve el primer campo que falla, para enfocarlo y explicar por qué. */
export function primerError(campos: Campo[]): Campo | undefined {
  for (const campo of campos) {
    campo.el?.removeAttribute('aria-invalid');
  }
  const fallo = campos.find((campo) => !campo.ok);
  fallo?.el?.setAttribute('aria-invalid', 'true');
  return fallo;
}
