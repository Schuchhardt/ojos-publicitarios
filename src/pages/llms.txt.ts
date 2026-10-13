import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import {
  SERVICIOS,
  AUTOMATIZACIONES,
  PROYECTOS,
  FAQ,
  MODULOS_SOFTWARE,
  INDUSTRIAS,
  SERVICIOS_MARKETING,
} from '../data/contenido';
import { MARCA, RESPUESTA_PROMESA, TIENE_EMAIL, CONTACTO_EMAIL, TIENE_WHATSAPP, WHATSAPP_DISPLAY } from '../lib/config';

/**
 * /llms.txt — resumen del sitio en markdown para asistentes con IA.
 * Se arma con el mismo contenido que ve el visitante: si cambia la página,
 * cambia esto, sin un archivo paralelo que se desactualiza.
 */
export const GET: APIRoute = async ({ site }) => {
  const url = (ruta: string) => new URL(ruta, site).href;
  const notas = (await getCollection('blog')).sort(
    (a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf()
  );

  const lineas = [
    `# ${MARCA}`,
    '',
    '> Estudio creativo y digital chileno. Diseñamos páginas web, sitios corporativos y tiendas online, desarrollamos software a medida y hacemos marketing digital. Trabajamos con negocios de Chile y del extranjero, en español y en inglés.',
    '',
    '## Datos del negocio',
    '',
    `- Tiempo de respuesta: ${RESPUESTA_PROMESA}`,
    '- Sin suscripciones mensuales: el sitio y las herramientas quedan a nombre del cliente.',
    '- Una sola persona a cargo de cada proyecto, de principio a fin.',
    '- Nada se publica ni se responde en nombre del cliente sin que una persona lo revise.',
    ...(TIENE_WHATSAPP ? [`- WhatsApp: ${WHATSAPP_DISPLAY}`] : []),
    ...(TIENE_EMAIL ? [`- Correo: ${CONTACTO_EMAIL}`] : []),
    '',
    '## Diseño web',
    '',
    ...SERVICIOS.map((s) => `- **${s.titulo}** — ${s.bajada} ${s.descripcion}`),
    '',
    '## Desarrollo de software a medida',
    '',
    'Aplicaciones y sistemas a medida para conectar, automatizar y simplificar la operación.',
    '',
    ...MODULOS_SOFTWARE.map((m) => `- ${m}`),
    '',
    `Industrias: ${INDUSTRIAS.join(', ')}.`,
    '',
    '## Marketing digital',
    '',
    ...SERVICIOS_MARKETING.map((s) => `- **${s.titulo}** — ${s.descripcion}`),
    '',
    '## Qué dejamos funcionando solo',
    '',
    ...AUTOMATIZACIONES.map((a) => `- **${a.titulo}** — ${a.descripcion}`),
    '',
    '## Proyectos',
    '',
    ...PROYECTOS.map((p) => `- **${p.nombre}** (${p.rotulo}) — ${p.descripcion} ${p.url}`),
    '',
    '## Preguntas frecuentes',
    '',
    ...FAQ.flatMap((f) => [`### ${f.pregunta}`, '', f.respuesta, '']),
    '## Páginas',
    '',
    `- [Inicio](${url('/')}): servicios, proyectos y contacto.`,
    `- [Blog](${url('/blog/')}): guías sobre diseño web y automatización.`,
    ...notas.map((n) => `- [${n.data.titulo}](${url(`/blog/${n.id}/`)}): ${n.data.descripcion}`),
    '',
  ];

  return new Response(lineas.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
