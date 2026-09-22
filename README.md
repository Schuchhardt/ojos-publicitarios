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

## Formulario de contacto

El modal "Preparar mi solicitud" envía por **Formspree**
(`FORMSPREE_ENDPOINT` en `src/lib/config.ts`), igual que en patio-riquelme: no
hay backend ni funciones de Netlify de por medio.

- Campos: nombre y correo obligatorios; teléfono, empresa, tipo de proyecto e
  idea opcionales.
- Valida antes de enviar y no toca la red si falta algo.
- Trampa anti-spam (`_gotcha`) que Formspree descarta sola.
- Si el envío falla, muestra el error sin perder lo escrito.

El formulario es el **único** camino del modal: no abre el correo ni WhatsApp.
El botón "Escribir por WhatsApp" del bloque de contacto y los íconos de redes
son otra vía, en paralelo, y se controlan con `MOSTRAR_WHATSAPP`.

El primer envío real puede pedir confirmar el formulario desde el panel de
Formspree; conviene mandar una prueba después del primer deploy.

## Blog

Tres notas estáticas en `src/content/blog/*.md`, con Markdown y frontmatter. Para
agregar otra basta crear un archivo nuevo: la portada del blog, el sitemap y
`llms.txt` la toman solos.

```yaml
---
titulo: 'Título de la nota'
descripcion: 'Meta description, entre 120 y 160 caracteres.'
fecha: 2026-09-22
respuestaCorta: 'La respuesta directa, en 2 o 3 líneas. Sale destacada arriba.'
tags: ['diseño web']
faq:
  - pregunta: '¿Una pregunta frecuente?'
    respuesta: 'La respuesta, que se entienda fuera de contexto.'
---
```

`respuestaCorta` y `faq` no son decoración: son lo que un buscador con IA cita
como respuesta. Conviene que cada una se lea sola, sin el resto del artículo.

## SEO y AEO

Lo que ya está resuelto y no hay que volver a tocar:

- **Metadatos por página**: título, descripción, canonical, Open Graph, Twitter
  y `hreflang` es-CL. Los títulos de las notas no llevan la marca cuando ya son
  largos, para que Google no los corte.
- **Datos estructurados** (JSON-LD), validables en
  [Rich Results Test](https://search.google.com/test/rich-results):
  `ProfessionalService` con catálogo de servicios y datos de contacto, `WebSite`,
  `FAQPage` en la home y en cada nota, y `BlogPosting` + `BreadcrumbList` en los
  artículos. Todo cuelga de un mismo `@id`, así Google entiende que es un solo
  negocio.
- **`/robots.txt`** permite explícitamente a los rastreadores de los buscadores
  con IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended y otros). Para
  bloquear alguno, cambiar su `Allow` por `Disallow` en `src/pages/robots.txt.ts`.
- **`/llms.txt`** es un resumen del sitio en markdown para asistentes con IA:
  servicios, cifras, proyectos, preguntas frecuentes y links. Se genera del mismo
  contenido que ve el visitante, así que no se desactualiza.
- **`/sitemap-index.xml`** se arma solo e incluye las notas nuevas.

Lo que más mueve la aguja de ahora en adelante es contenido: cada pregunta real
que te hagan por WhatsApp y respondas bien es una nota posible.

## Dónde se edita cada cosa

| Qué                                        | Archivo                  |
| ------------------------------------------ | ------------------------ |
| Textos de todas las secciones              | `src/data/contenido.ts`  |
| WhatsApp, correo, redes, secciones on/off  | `src/lib/config.ts`      |
| Colores, tipografías, espaciados           | `src/styles/global.css`  |
| Estructura de la página                    | `src/pages/index.astro`  |
| Cada bloque visual                         | `src/components/*.astro` |
| Preguntas frecuentes de la home            | `FAQ` en `src/data/contenido.ts` |
| Notas del blog                             | `src/content/blog/*.md`  |
| Capturas y fotos de proyectos              | `src/assets/`            |
| Logo del header y footer                   | `src/assets/logo-ojos-publicitarios.png` |

Cada sección del diseño es un componente con el mismo nombre: `Hero`, `Cifras`,
`Servicios`, `Automatizacion`, `Criterio`, `Proceso`, `Equipo`, `Proyectos`,
`Testimonios`, `Contacto`, `Footer`.

### Secciones que se pueden apagar

En `src/lib/config.ts`, igual que los interruptores del diseño:

- `MOSTRAR_POLITICA_IA` — bloque "Cómo trabajamos".
- `MOSTRAR_EQUIPO` — bloque "Quiénes responden". **Hoy está en `false`**: la
  sección no se renderiza y el enlace desaparece del menú.
- `MOSTRAR_TESTIMONIOS` — bloque de citas de clientes. **Hoy está en `false`**:
  no hay testimonios reales todavía y es preferible no mostrarlo antes que
  publicar "Nombre del cliente". Al cargar citas en `TESTIMONIOS`, encenderlo.
- `MOSTRAR_WHATSAPP` — botón e ícono de WhatsApp, en paralelo al formulario.
- `MOSTRAR_FAQ` — bloque de preguntas frecuentes de la home. Apagarlo también
  saca el `FAQPage` de los datos estructurados, así que conviene dejarlo.

## Pendientes antes de publicar

1. **Perfiles de redes** en `src/lib/config.ts` (`REDES`): Instagram, TikTok y
   Facebook están vacíos, así que esos íconos no se muestran. Al pegar la URL
   aparecen solos en contacto y footer.
2. **`CONTACTO_EMAIL`** está vacío a propósito: mientras no haya una casilla
   real, el sitio no muestra ningún correo y todo entra por el formulario y por
   WhatsApp.
3. **Dominio** en `astro.config.mjs` (constante `DOMINIO`), para cuando el sitio
   deje de servirse desde la URL de Netlify.
4. **Testimonios reales**: pedir dos o tres citas a clientes, cargarlas en
   `TESTIMONIOS` y poner `MOSTRAR_TESTIMONIOS` en `true`.
5. **Equipo**: si se enciende `MOSTRAR_EQUIPO`, completar `EQUIPO` con nombres,
   roles y retratos verticales (800×1000) en `public/equipo/`.
6. **`public/og-image.jpg`** es un provisorio generado con la paleta de la marca,
   pero con tipografía del sistema. Reemplazarlo por uno hecho en Space Grotesk.

## Estructura

```
src/
├── assets/            capturas e íconos que Astro optimiza y versiona
├── components/        una sección del diseño por componente
├── content/blog/      las notas, en markdown
├── content.config.ts  el esquema de una nota
├── data/contenido.ts  todo el texto editable de la home
├── layouts/           <head>, fuentes, SEO, JSON-LD
├── lib/               configuración, fechas, imágenes y JSON-LD
├── pages/             index, 404, blog/, robots.txt, llms.txt
└── styles/global.css  tokens del diseño y piezas compartidas
```

`design/` guarda el diseño original y el material del cliente; no entra al build
ni se publica.

## Propuestas a clientes

`/propuestas/` es un índice privado de demos navegables, una por cliente. Las
páginas usan `PropuestaLayout`, que las marca `noindex, nofollow`; además quedan
fuera del sitemap (filtro en `astro.config.mjs`) y bloqueadas en `robots.txt`,
también para los rastreadores de IA. Se comparten por link, no se indexan.

La primera es `/propuestas/ludrimar/`: landing en inglés para Pesquera Ludrimar
Ltda, exportadores de jibia. Tiene su propia paleta y tipografías —es la marca
del cliente, no la nuestra— en `src/styles/ludrimar.css`, y el logo entregado
vive recortado en `src/assets/ludrimar/` en cuatro versiones (color, blanco,
solo la marca y lockup horizontal).

Los datos que faltan van marcados en ámbar con la clase `lud-pendiente`, para
que en la reunión se vea de inmediato qué falta confirmar.

## Proyectos de la sección "Proyectos entregados"

Además de chilecamiones.cl, hay tres trabajos sacados del Instagram del estudio
(Mercado Mersan, Energy y Consultora KO). Cada tarjeta enlaza a su publicación y
la foto está descargada en `src/assets/proyectos/`, así no depende de que el CDN
de Instagram siga sirviendo esa URL.

Para agregar otro: bajar la imagen a esa carpeta y sumar una entrada en
`PROYECTOS` con `url` (el post), `enlaceTexto: 'Ver en Instagram'` y el nombre
del archivo.
