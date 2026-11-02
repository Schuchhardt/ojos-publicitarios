// Investigación de keywords con el autocompletado de Google: son búsquedas que
// la gente hace de verdad, en EE.UU., en inglés y en español. No trae volumen;
// Claude elige entre los candidatos por intención de compra.
import { PREFIJOS, SEMILLAS } from './temas.ts';

export type Idioma = 'es' | 'en';

/** Cuántas semillas se exploran por idioma cada día. Rotan solas día a día. */
const SEMILLAS_POR_DIA = 6;

async function sugerencias(consulta: string, idioma: Idioma): Promise<string[]> {
  const url = new URL('https://suggestqueries.google.com/complete/search');
  url.search = new URLSearchParams({
    client: 'firefox',
    hl: idioma,
    gl: 'us',
    ie: 'utf-8',
    oe: 'utf-8',
    q: consulta,
  }).toString();
  try {
    const respuesta = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!respuesta.ok) return [];
    const [, lista] = (await respuesta.json()) as [string, string[]];
    return Array.isArray(lista) ? lista : [];
  } catch {
    // Una consulta que falla no detiene la investigación: hay muchas más.
    return [];
  }
}

/** Toma `n` semillas a partir de un punto que avanza cada día. */
function semillasDelDia(lista: string[], dia: number, n: number): string[] {
  return Array.from({ length: Math.min(n, lista.length) }, (_, i) => lista[(dia * n + i) % lista.length]);
}

const normalizar = (texto: string) => texto.toLowerCase().trim().replace(/\s+/g, ' ');

// El lector está en EE.UU.: las búsquedas atadas a otro país son ruido.
const OTRO_PAIS =
  /\b(india|uk|united kingdom|london|kenya|south africa|nepal|nigeria|mumbai|delhi|bangalore|saudi|dubai|uae|qatar|pakistan|bangladesh|philippines|malaysia|singapore|australia|canada|ireland|ghana|sri lanka|españa|spain|m[eé]xico|argentina|colombia|per[uú]|chile|venezuela|bolivia|ecuador|guatemala|costa rica|uruguay|paraguay|panam[aá]|honduras|rep[uú]blica dominicana|el salvador|nicaragua)\b/;

/**
 * Candidatos del día por idioma, sin repetidos ni keywords ya usadas en una
 * nota. `dia` es cualquier entero que cambie a diario.
 */
export async function investigarKeywords(
  dia: number,
  yaUsadas: string[]
): Promise<Record<Idioma, string[]>> {
  const usadas = new Set(yaUsadas.map(normalizar));
  const resultado = { es: [] as string[], en: [] as string[] };

  for (const idioma of ['en', 'es'] as const) {
    const vistas = new Set<string>();
    for (const semilla of semillasDelDia(SEMILLAS[idioma], dia, SEMILLAS_POR_DIA)) {
      for (const prefijo of PREFIJOS[idioma]) {
        for (const sugerencia of await sugerencias(`${prefijo}${semilla}`, idioma)) {
          const keyword = normalizar(sugerencia);
          if (usadas.has(keyword) || vistas.has(keyword) || OTRO_PAIS.test(keyword)) continue;
          vistas.add(keyword);
          resultado[idioma].push(keyword);
        }
        // Sin apuro: es un endpoint público y no queremos que nos limite.
        await new Promise((listo) => setTimeout(listo, 250));
      }
    }
  }
  return resultado;
}
