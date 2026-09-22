import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: cambiar al dominio real antes de publicar.
export const SITE_URL = 'https://ojospublicitarios.cl';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
