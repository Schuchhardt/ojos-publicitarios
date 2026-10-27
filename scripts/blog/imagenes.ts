// Imágenes de cada nota: la portada se genera con IA (OpenAI) y queda en
// src/assets/blog/; la interna es una foto de Unsplash. Si falta la clave de
// Unsplash, OpenAI genera las dos.
import { writeFile } from 'node:fs/promises';

export interface Imagen {
  /** Archivo escrito dentro de src/assets/blog/ (imágenes propias)… */
  archivo?: string;
  /** …o URL externa (Unsplash exige enlazar la foto desde su servidor). */
  url?: string;
  /** Crédito a mostrar bajo la imagen, si corresponde. */
  credito?: { autor: string; urlAutor: string; urlFuente: string };
}

const MODELO_IMAGEN = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2';

async function generarConOpenAI(prompt: string, archivo: string): Promise<Imagen> {
  const respuesta = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODELO_IMAGEN,
      prompt:
        `${prompt}\n\nEditorial photograph, natural light, realistic, modern small business setting. ` +
        'No text, no letters, no logos, no watermarks, no screens showing readable UI.',
      size: '1536x1024',
      quality: 'medium',
      output_format: 'jpeg',
      output_compression: 85,
      n: 1,
    }),
    signal: AbortSignal.timeout(180_000),
  });
  if (!respuesta.ok) {
    throw new Error(`OpenAI respondió ${respuesta.status}: ${await respuesta.text()}`);
  }
  const { data } = (await respuesta.json()) as { data: { b64_json: string }[] };
  await writeFile(archivo, Buffer.from(data[0].b64_json, 'base64'));
  return { archivo };
}

interface FotoUnsplash {
  urls: { raw: string };
  links: { html: string; download_location: string };
  user: { name: string; links: { html: string } };
}

/** Unsplash pide marcar de dónde viene el tráfico en los links de crédito. */
const UTM = 'utm_source=ojos_publicitarios&utm_medium=referral';

async function buscarEnUnsplash(busqueda: string, semilla: number): Promise<Imagen> {
  const autorizacion = { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` };
  const url = new URL('https://api.unsplash.com/search/photos');
  url.search = new URLSearchParams({
    query: busqueda,
    orientation: 'landscape',
    content_filter: 'high',
    per_page: '15',
  }).toString();
  const respuesta = await fetch(url, { headers: autorizacion, signal: AbortSignal.timeout(20_000) });
  if (!respuesta.ok) {
    throw new Error(`Unsplash respondió ${respuesta.status}: ${await respuesta.text()}`);
  }
  const { results } = (await respuesta.json()) as { results: FotoUnsplash[] };
  if (results.length === 0) throw new Error(`Unsplash no encontró fotos para "${busqueda}".`);

  // Entre las más relevantes, una distinta cada día: así dos notas parecidas
  // no terminan con la misma foto.
  const foto = results[semilla % Math.min(results.length, 8)];

  // Las reglas de la API de Unsplash piden avisar cada vez que se usa una foto.
  await fetch(foto.links.download_location, { headers: autorizacion }).catch(() => {});

  return {
    url: `${foto.urls.raw}&w=1640&q=80&fm=jpg&fit=crop`,
    credito: {
      autor: foto.user.name,
      urlAutor: `${foto.user.links.html}?${UTM}`,
      urlFuente: `https://unsplash.com/?${UTM}`,
    },
  };
}

export async function conseguirImagenes(params: {
  carpeta: string;
  nombre: string;
  promptPortada: string;
  busquedaFoto: string;
  semilla: number;
}): Promise<{ portada?: Imagen; interna: Imagen }> {
  const hayOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hayUnsplash = Boolean(process.env.UNSPLASH_ACCESS_KEY);
  if (!hayOpenAI && !hayUnsplash) {
    throw new Error('Falta OPENAI_API_KEY o UNSPLASH_ACCESS_KEY: sin al menos una no hay imágenes.');
  }

  // La portada tiene que ser un archivo propio (Astro la optimiza y es la
  // imagen al compartir), y las de Unsplash no se pueden descargar y alojar.
  // Sin OpenAI, la nota sale sin portada.
  if (!hayOpenAI) console.warn('Sin OPENAI_API_KEY: la nota va sin portada.');
  const portada = hayOpenAI
    ? await generarConOpenAI(params.promptPortada, `${params.carpeta}/${params.nombre}.jpg`)
    : undefined;

  const interna = hayUnsplash
    ? await buscarEnUnsplash(params.busquedaFoto, params.semilla)
    : await generarConOpenAI(
        `${params.busquedaFoto}. A different scene and angle from: ${params.promptPortada}`,
        `${params.carpeta}/${params.nombre}-2.jpg`
      );

  return { portada, interna };
}
