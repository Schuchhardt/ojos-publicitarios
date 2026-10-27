// Claude elige la keyword del día entre los candidatos y escribe la nota en
// inglés y en español, de una sola vez, con salida estructurada.
import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { z } from 'zod';
import { BUYER_PERSONA, ENLACES_INTERNOS, ESTUDIO } from './temas.ts';
import type { Idioma } from './keywords.ts';

// Sonnet escribe casi como Opus a la mitad del precio. BLOG_MODELO lo cambia
// sin tocar código: claude-opus-5-5 (mejor) o claude-haiku-5-5 (más barato).
const MODELO = process.env.BLOG_MODELO || 'claude-sonnet-5-5';

const Version = z.object({
  slug: z.string().describe('URL slug: minúsculas ASCII separadas por guiones, 3 a 7 palabras, con la keyword.'),
  titulo: z.string().describe('Título con la keyword dicha de forma natural. Máximo 65 caracteres.'),
  descripcion: z.string().describe('Meta description, entre 120 y 160 caracteres.'),
  respuestaCorta: z.string().describe('Respuesta directa a la pregunta del título, en 2 o 3 frases que se entiendan solas.'),
  tags: z.array(z.string()).describe('2 o 3 etiquetas cortas, en minúsculas.'),
  faq: z
    .array(z.object({ pregunta: z.string(), respuesta: z.string() }))
    .describe('3 o 4 preguntas reales con respuestas que se entiendan fuera de contexto.'),
  cuerpo: z.string().describe('Artículo en Markdown, sin H1 ni imágenes.'),
  altPortada: z.string().describe('Texto alternativo de la portada.'),
  altInterna: z.string().describe('Texto alternativo de la imagen interna.'),
});

const NotaGenerada = z.object({
  keywordEn: z.string(),
  keywordEs: z.string(),
  motivo: z.string().describe('Por qué esta keyword, en una frase.'),
  promptPortada: z
    .string()
    .describe('Prompt en inglés para generar la portada con IA: escena fotográfica realista, sin texto ni logos.'),
  busquedaFoto: z.string().describe('Búsqueda en inglés de 2 a 4 palabras para una foto de stock de la imagen interna.'),
  en: Version,
  es: Version,
});

export type NotaGenerada = z.infer<typeof NotaGenerada>;

function enlaces(idioma: Idioma): string {
  return Object.entries(ENLACES_INTERNOS[idioma])
    .map(([texto, ruta]) => `- ${texto}: ${ruta}`)
    .join('\n');
}

const SISTEMA = `Eres el editor del blog de Ojos Publicitarios. Cada día eliges una búsqueda real y escribes una nota que la responde mejor que lo que hoy aparece en Google, en inglés y en español.

## Para quién escribes
${BUYER_PERSONA}

## Quiénes somos (no afirmes nada del estudio fuera de esto)
${ESTUDIO}

## Cómo elegir la keyword
- Elige UNA keyword en inglés de la lista de candidatos: la que mejor combine intención de compra (alguien a punto de contratar una web, manejo de redes o una automatización) con una pregunta que podamos responder con autoridad.
- Prefiere preguntas concretas de 3 a 8 palabras antes que términos genéricos de una o dos.
- Elige su equivalente en español de la lista en español; si ninguna calza, escribe la búsqueda en español más natural para el mismo tema.
- Descarta lo que esté atado a un país que no sea EE.UU. o a una herramienta o marca puntual, lo que sea para agencias o freelancers (no para dueños de negocio), y lo que se parezca a una nota ya publicada.

## Cómo escribir
- Dos notas independientes, no una traducción: la de inglés para dueños de negocio en EE.UU. (inglés americano, montos en USD); la de español para dueños de negocio hispanos en EE.UU. y Latinoamérica (español neutro, tuteo, sin modismos de un país).
- Entre 1.000 y 1.500 palabras cada una. Párrafos cortos, listas cuando ordenan, negritas para lo que hay que recordar.
- Los H2 son las preguntas que se hace el lector, en el orden en que se las haría. Nada de H1: el título ya lo es.
- Concreto y útil: pasos, criterios para decidir, errores comunes, qué preguntarle a quien vas a contratar. Que el lector termine sabiendo qué necesita.
- Tono directo y honesto, sin vender humo. Nada de "en el mundo digital de hoy", "en conclusión" ni frases de relleno.
- No inventes estadísticas, estudios, citas, clientes ni casos. Si das rangos de precio, que sean rangos de mercado amplios y dichos como aproximados; nunca precios del estudio.
- Incluye 2 o 3 enlaces internos en Markdown, donde ayuden de verdad, solo de esta lista:
  Inglés:
${enlaces('en')}
  Español:
${enlaces('es')}
- Termina con un último H2 que invite a dar el paso: en inglés, a pedir una cotización del proyecto ("get a quote") y a contactarnos; en español, a cotizar el proyecto y a contactarnos. Ese cierre enlaza a la página de cotizar de su idioma. Breve, sin presión.
- No pongas imágenes en el cuerpo: se agregan después.`;

export async function redactarNota(params: {
  candidatos: Record<Idioma, string[]>;
  publicadas: { titulo: string; keyword?: string }[];
  keywordForzada?: string;
}): Promise<NotaGenerada> {
  const client = new Anthropic();
  const formato = zodOutputFormat(NotaGenerada);

  const publicadas = params.publicadas.length
    ? params.publicadas.map((p) => `- ${p.titulo}${p.keyword ? ` (keyword: ${p.keyword})` : ''}`).join('\n')
    : '(ninguna)';

  const pedido = params.keywordForzada
    ? `Hoy la keyword en inglés es: "${params.keywordForzada}". Elige su equivalente en español.`
    : `Candidatos en inglés (autocompletado de Google, EE.UU.):\n${params.candidatos.en.join('\n')}\n\nCandidatos en español (autocompletado de Google, EE.UU.):\n${params.candidatos.es.join('\n')}`;

  const stream = client.beta.messages.stream({
    model: MODELO,
    max_tokens: 64000,
    // Si el modelo rechaza la nota, la API la reintenta con otro. Haiku no
    // tiene esta opción y la rechaza.
    ...(MODELO.includes('haiku')
      ? {}
      : { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const }),
    thinking: { type: 'adaptive' },
    output_config: { effort: 'high', format: formato },
    system: SISTEMA,
    messages: [
      {
        role: 'user',
        content: `Notas ya publicadas (no repetir el tema):\n${publicadas}\n\n${pedido}`,
      },
    ],
  });
  const mensaje = await stream.finalMessage();

  if (mensaje.stop_reason === 'refusal') {
    throw new Error(`Claude no escribió la nota: ${mensaje.stop_details?.explanation ?? 'sin detalle'}`);
  }
  if (mensaje.stop_reason === 'max_tokens') {
    throw new Error('La nota se cortó por largo (max_tokens).');
  }
  const texto = mensaje.content.flatMap((bloque) => (bloque.type === 'text' ? [bloque.text] : [])).join('');
  const nota = NotaGenerada.parse(JSON.parse(texto));

  console.log(`Claude: ${mensaje.usage.input_tokens} tokens de entrada, ${mensaje.usage.output_tokens} de salida.`);
  return nota;
}
