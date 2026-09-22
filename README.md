# Ojos Publicitarios — sitio web

Home de una página construida en Astro a partir del diseño propuesto en
`design/Ojos Publicitarios - Home.dc.html`. Sitio 100 % estático: no hay backend,
base de datos ni funciones.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:4322
npm run build    # genera dist/
npm run preview  # sirve dist/
npm run check    # revisa tipos y plantillas
```

Node 22 o superior (Astro exige >= 22.12).

## Deploy en Netlify

`netlify.toml` ya trae todo, así que basta conectar el repositorio
`Schuchhardt/ojos-publicitarios` en Netlify y aceptar lo que detecta:

| Ajuste          | Valor           |
| --------------- | --------------- |
| Build command   | `npm run build` |
| Publish dir     | `dist`          |
| Node            | 22              |

No hay variables de entorno que configurar.

**Dominio.** Mientras no esté conectado el dominio final, Netlify entrega el
suyo y el sitio lo usa solo: `astro.config.mjs` lee `URL` (producción) y
`DEPLOY_PRIME_URL` (deploy previews), así que canonical, Open Graph y sitemap
siempre apuntan a la URL correcta. Al conectar `ojospublicitarios.cl` en Netlify
no hay que tocar código.

**Qué resuelve `netlify.toml`:**

- `/_astro/*` (CSS, JS, fuentes e imágenes, todos versionados por contenido) se
  cachea un año como inmutable; el resto queda con caché corta.
- Cabeceras de seguridad: `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy` y HSTS.

**Qué se optimizó para este deploy:**

- Fuentes servidas desde el propio dominio (`@fontsource-variable`), no desde
  Google Fonts: dos conexiones externas menos y caché inmutable en Netlify.
- Íconos de redes incrustados como SVG (`src/assets/redes/`, de simpleicons.org,
  CC0) en vez de pedirlos a un CDN. La página no hace **ninguna** petición a
  terceros.
- Capturas procesadas por Astro a WebP en tres tamaños (776 kB → 14-52 kB).
- El JS (menú móvil y modal) queda incrustado en el HTML: cero archivos extra.
- `robots.txt` generado en el build con el sitemap del dominio que corresponda,
  y página 404 propia que Netlify sirve sola.

Si más adelante hace falta que el formulario envíe de verdad, Netlify Forms lo
resuelve sin backend: se agrega `data-netlify="true"` al formulario del modal y
las respuestas llegan al panel de Netlify y por correo.

## Dónde se edita cada cosa

| Qué                                        | Archivo                  |
| ------------------------------------------ | ------------------------ |
| Textos de todas las secciones              | `src/data/contenido.ts`  |
| WhatsApp, correo, redes, secciones on/off  | `src/lib/config.ts`      |
| Colores, tipografías, espaciados           | `src/styles/global.css`  |
| Estructura de la página                    | `src/pages/index.astro`  |
| Cada bloque visual                         | `src/components/*.astro` |
| Capturas de proyectos                      | `src/assets/`            |

Cada sección del diseño es un componente con el mismo nombre: `Hero`, `Cifras`,
`Servicios`, `Automatizacion`, `Criterio`, `Proceso`, `Equipo`, `Proyectos`,
`Testimonios`, `Contacto`, `Footer`.

### Secciones que se pueden apagar

En `src/lib/config.ts`, igual que los interruptores del diseño:

- `MOSTRAR_POLITICA_IA` — bloque "Cómo trabajamos".
- `MOSTRAR_EQUIPO` — bloque "Quiénes responden". **Hoy está en `false`**: la
  sección no se renderiza y el enlace desaparece del menú.
- `MOSTRAR_WHATSAPP` — botón e ícono de WhatsApp.
- `MOSTRAR_FORMULARIO_SOLICITUD` — modal "Preparar mi solicitud". En `false`, ese
  botón abre directamente el correo.

El modal arma el mensaje con los datos del formulario y lo abre en WhatsApp o en
el correo del visitante. No envía nada por su cuenta: no hay servidor detrás.

## Pendientes antes de publicar

1. **Datos reales de contacto** en `src/lib/config.ts`: `WHATSAPP_NUMERO`,
   `CONTACTO_EMAIL` y las URL de Instagram, TikTok y Facebook.
2. **Dominio** en `astro.config.mjs` (constante `DOMINIO`), para cuando el sitio
   deje de servirse desde la URL de Netlify.
3. **Marcadores del diseño**, que hoy se ven como tales a propósito:
   - la cuarta cifra del hero (`CIFRAS`, entrada con `pendiente: true`),
   - el segundo proyecto (`PROYECTOS` + captura en `src/assets/`),
   - el tercer testimonio (`TESTIMONIOS`),
   - el equipo (`EQUIPO`), si más adelante se enciende la sección.
   Los contadores `PROYECTOS_PENDIENTES` y `TESTIMONIOS_PENDIENTES` controlan
   cuántas tarjetas vacías quedan a la vista: al completar el contenido, bajarlos.
4. **`public/og-image.jpg`** es un provisorio generado con la paleta de la marca,
   pero con tipografía del sistema. Reemplazarlo por uno hecho en Space Grotesk.

## Estructura

```
src/
├── assets/            capturas e íconos que Astro optimiza y versiona
├── components/        una sección del diseño por componente
├── data/contenido.ts  todo el texto editable
├── layouts/           <head>, fuentes, SEO, JSON-LD
├── lib/               configuración y carga de imágenes
├── pages/             index.astro, 404.astro, robots.txt.ts
└── styles/global.css  tokens del diseño y piezas compartidas
```

`design/` guarda el diseño original y el material del cliente; no entra al build
ni se publica.
