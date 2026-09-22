import type { APIRoute } from 'astro';

/**
 * Los rastreadores de los buscadores con IA están permitidos a propósito: el
 * sitio está escrito para que lo citen. Para bloquear alguno, cambiar su Allow
 * por Disallow.
 */
const RASTREADORES_IA = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'meta-externalagent',
];

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  const llms = new URL('llms.txt', site).href;

  const cuerpo = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /propuestas/',
    '',
    '# Buscadores y asistentes con IA',
    ...RASTREADORES_IA.flatMap((agente) => [
      `User-agent: ${agente}`,
      'Allow: /',
      'Disallow: /propuestas/',
      '',
    ]),
    `# Resumen del sitio para modelos: ${llms}`,
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
