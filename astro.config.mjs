import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio definitivo. Mientras no esté apuntando, Netlify entrega el suyo por
// variable de entorno y los canonical, Open Graph y sitemap salen correctos:
//   DEPLOY_PRIME_URL → deploy previews y ramas
//   URL              → sitio en producción
const DOMINIO = 'https://ojospublicitarios.cl';

export const SITE_URL = process.env.DEPLOY_PRIME_URL || process.env.URL || DOMINIO;

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  build: {
    // Un solo archivo CSS por página: menos peticiones en un sitio de una página.
    inlineStylesheets: 'auto',
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4322,
  },
});
