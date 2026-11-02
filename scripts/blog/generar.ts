// Blog automático: investiga keywords, escribe la nota del día en inglés y en
// español con Claude, le consigue imágenes y deja los .md listos en
// src/content/blog/. Lo corre a diario .github/workflows/blog-diario.yml.
//
//   npm run blog:generar                         nota del día
//   npm run blog:generar -- --keyword "..."      con una keyword en inglés elegida a mano
//   npm run blog:generar -- --forzar             aunque ya haya una nota de hoy
import { appendFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { investigarKeywords } from './keywords.ts';
import { redactarNota, type NotaGenerada } from './redactar.ts';
import { conseguirImagenes, type Imagen } from './imagenes.ts';

const CONTENIDO = 'src/content/blog';
const ASSETS = 'src/assets/blog';

const { values: opciones } = parseArgs({
  options: { keyword: { type: 'string' }, forzar: { type: 'boolean', default: false } },
});

interface Publicada {
  titulo: string;
  keyword?: string;
  clave?: string;
}

/** Lee lo justo del frontmatter de cada nota: título, keyword y clave. */
async function notasPublicadas(): Promise<Publicada[]> {
  const archivos = (await readdir(CONTENIDO, { recursive: true })).filter((f) => f.endsWith('.md'));
  return Promise.all(
    archivos.map(async (archivo) => {
      const texto = await readFile(join(CONTENIDO, archivo), 'utf8');
      const campo = (nombre: string) => {
        const valor = texto.match(new RegExp(`^${nombre}:\\s*(.+)$`, 'm'))?.[1].trim();
        // Los valores van entre comillas simples (a mano) o dobles (JSON).
        if (!valor) return undefined;
        return valor.startsWith('"') ? (JSON.parse(valor) as string) : valor.replace(/^'(.*)'$/, '$1');
      };
      return { titulo: campo('titulo') ?? archivo, keyword: campo('keyword'), clave: campo('clave') };
    })
  );
}

function limpiarSlug(slug: string): string {
  return slug
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** Un slug que no pisa ninguna nota existente de esa carpeta. */
function slugLibre(carpeta: string, slug: string): string {
  let candidato = limpiarSlug(slug);
  for (let n = 2; existsSync(join(carpeta, `${candidato}.md`)); n++) candidato = `${limpiarSlug(slug)}-${n}`;
  return candidato;
}

/** La imagen interna va antes del segundo H2, para cortar el texto a un tercio. */
function insertarImagen(cuerpo: string, markdownImagen: string): string {
  const titulos = [...cuerpo.matchAll(/^## /gm)];
  const punto = titulos[1]?.index ?? titulos[0]?.index;
  if (punto === undefined) return `${cuerpo}\n\n${markdownImagen}\n`;
  return `${cuerpo.slice(0, punto)}${markdownImagen}\n\n${cuerpo.slice(punto)}`;
}

function archivoMarkdown(params: {
  version: NotaGenerada['en'];
  idioma: 'es' | 'en';
  keyword: string;
  clave: string;
  fecha: string;
  portada?: Imagen;
  interna: Imagen;
  /** Desde el .md hasta src/assets/blog/. */
  rutaAssets: string;
}): string {
  const { version, idioma } = params;
  const rutaDe = (imagen: Imagen) =>
    imagen.url ?? `${params.rutaAssets}/${imagen.archivo?.split('/').pop()}`;

  // JSON es YAML válido: así no hay que pelear con comillas ni dos puntos.
  const frontmatter = [
    `titulo: ${JSON.stringify(version.titulo)}`,
    `descripcion: ${JSON.stringify(version.descripcion)}`,
    `fecha: ${params.fecha}`,
    `idioma: ${idioma}`,
    `clave: ${JSON.stringify(params.clave)}`,
    `keyword: ${JSON.stringify(params.keyword)}`,
    ...(params.portada
      ? [`imagen: ${JSON.stringify(rutaDe(params.portada))}`, `imagenAlt: ${JSON.stringify(version.altPortada)}`]
      : []),
    `respuestaCorta: ${JSON.stringify(version.respuestaCorta)}`,
    `tags: ${JSON.stringify(version.tags)}`,
    `faq: ${JSON.stringify(version.faq)}`,
  ];

  const credito = params.interna.credito;
  const pie = credito
    ? idioma === 'en'
      ? `\n\n*Photo by [${credito.autor}](${credito.urlAutor}) on [Unsplash](${credito.urlFuente})*`
      : `\n\n*Foto de [${credito.autor}](${credito.urlAutor}) en [Unsplash](${credito.urlFuente})*`
    : '';
  const imagen = `![${version.altInterna.replace(/[[\]]/g, '')}](${rutaDe(params.interna)})${pie}`;

  // El título ya es el H1 de la página: cualquier H1 del cuerpo baja a H2.
  const cuerpo = version.cuerpo.trim().replace(/^# /gm, '## ');
  return `---\n${frontmatter.join('\n')}\n---\n\n${insertarImagen(cuerpo, imagen)}\n`;
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    console.warn('Sin ANTHROPIC_API_KEY: el SDK buscará un perfil de `ant auth login`.');
  }

  const hoy = new Date();
  const fecha = hoy.toISOString().slice(0, 10);
  const clave = fecha;
  const publicadas = await notasPublicadas();

  if (!opciones.forzar && publicadas.some((nota) => nota.clave === clave)) {
    console.log(`Ya hay una nota del ${fecha}. Nada que hacer (usa --forzar para otra).`);
    return;
  }

  const dia = Math.floor(hoy.valueOf() / 86_400_000);
  const yaUsadas = publicadas.flatMap((nota) => (nota.keyword ? [nota.keyword] : []));

  let candidatos = { es: [] as string[], en: [] as string[] };
  if (!opciones.keyword) {
    console.log('Buscando keywords en el autocompletado de Google…');
    candidatos = await investigarKeywords(dia, yaUsadas);
    console.log(`${candidatos.en.length} candidatas en inglés y ${candidatos.es.length} en español.`);
    if (candidatos.en.length === 0) throw new Error('El autocompletado no devolvió keywords en inglés.');
  }

  console.log('Escribiendo la nota con Claude…');
  const nota = await redactarNota({ candidatos, publicadas, keywordForzada: opciones.keyword });
  console.log(`Keyword: "${nota.keywordEn}" / "${nota.keywordEs}". ${nota.motivo}`);

  const carpetaEn = join(CONTENIDO, 'en');
  await mkdir(carpetaEn, { recursive: true });
  await mkdir(ASSETS, { recursive: true });
  const slugEs = slugLibre(CONTENIDO, nota.es.slug);
  const slugEn = slugLibre(carpetaEn, nota.en.slug);

  console.log('Consiguiendo imágenes…');
  const { portada, interna } = await conseguirImagenes({
    carpeta: ASSETS,
    nombre: `${fecha}-${slugEn}`,
    promptPortada: nota.promptPortada,
    busquedaFoto: nota.busquedaFoto,
    semilla: dia,
  });

  const comunes = { clave, fecha, portada, interna };
  const archivoEs = join(CONTENIDO, `${slugEs}.md`);
  const archivoEn = join(carpetaEn, `${slugEn}.md`);
  await writeFile(
    archivoEs,
    archivoMarkdown({ ...comunes, version: nota.es, idioma: 'es', keyword: nota.keywordEs, rutaAssets: '../../assets/blog' })
  );
  await writeFile(
    archivoEn,
    archivoMarkdown({ ...comunes, version: nota.en, idioma: 'en', keyword: nota.keywordEn, rutaAssets: '../../../assets/blog' })
  );

  console.log(`Listo:\n  /blog/${slugEs}/\n  /en/blog/${slugEn}/`);

  // En GitHub Actions, el título va al mensaje del commit.
  if (process.env.GITHUB_OUTPUT) {
    await appendFile(process.env.GITHUB_OUTPUT, `titulo=${nota.en.titulo.replace(/\n/g, ' ')}\n`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
