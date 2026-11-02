# Ojos Publicitarios — sitio web

Home de una página construida en Astro a partir del diseño "Rediseño Ojos
Publicitarios" (Claude Design), portado pixel a pixel, con una página por
proyecto en `/proyectos/<slug>/` (Chilecamiones, Mercado Mersan, Energy,
Consultora KO). Español e inglés en la misma URL. Sitio 100 % estático: no hay
backend, base de datos ni funciones.

## Home y proyectos

- Copy de los dos idiomas en `src/data/ojos.ts`, con la misma forma para ambos:
  si a una versión le falta un campo, `npm run check` avisa.
- Componentes React en `src/components/ojos/`; los estilos van en línea, igual
  que en el diseño, con el helper `css()` de `comun.tsx`. El layout es
  `src/layouts/OjosLayout.astro`.
- Paleta oscura o azul al hacer clic en los ojos del hero (`localStorage`,
  `ojos_theme`).
- En pantallas táctiles no hay cursor propio, imagen flotante en servicios ni
  botones con imán.

## Idiomas

- El selector ES / EN cambia el texto en el navegador, sin cambiar de URL, y
  recuerda la elección (`localStorage`, `ojos_lang`).
- Sin elección guardada, un navegador que no está en español ve el sitio en
  inglés. `/?lang=en` y `/?lang=es` fuerzan un idioma.
- El HTML que leen los buscadores es el español. `/en/` ya no existe: redirige
  con 301 a `/?lang=en`.
- El blog tiene una URL por idioma (`/blog/` y `/en/blog/`, enlazadas con
  hreflang) y usa el diseño anterior (`BaseLayout`, `Header`, `Footer`). El 404
  sigue solo en español.

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

No hay variables de entorno que configurar en Netlify. El blog automático usa
secretos de GitHub (ver Blog automático).

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
- Redirecciones 301 de las URLs viejas: `/en/*` → `/?lang=en`, y `/ojos/` y
  `/ojos/proyectos/<slug>/` (la URL de prueba del home) a `/` y
  `/proyectos/<slug>/`.

**Qué se optimizó para este deploy:**

- Home y proyectos: las fuentes del diseño (Bricolage Grotesque, Instrument
  Serif, JetBrains Mono y Material Symbols) vienen de Google Fonts, como en el
  diseño. El blog sirve las suyas desde el propio dominio
  (`@fontsource-variable`).
- Imágenes procesadas por Astro a WebP (`imagenesOjos()` en
  `src/lib/imagenes.ts`).
- `robots.txt` generado en el build con el sitemap del dominio que corresponda,
  y página 404 propia que Netlify sirve sola.

## Formulario de contacto

El formulario de la sección de contacto envía por **Formspree**
(`FORMSPREE_ENDPOINT` en `src/lib/config.ts`): no hay backend ni funciones de
Netlify de por medio.

- Campos: nombre, correo, tipo de proyecto e idea, más el idioma del visitante.
- Trampa anti-spam (`_gotcha`) que Formspree descarta sola.
- Si el envío falla, muestra el error sin perder lo escrito.

Al lado van el botón de WhatsApp y el correo (`CONTACTO_EMAIL`), como otra vía.
El botón "Preparar mi solicitud" del blog lleva a `/#contacto`.

El primer envío real puede pedir confirmar el formulario desde el panel de
Formspree; conviene mandar una prueba después del primer deploy.

## Blog

Notas en Markdown: las en español en `src/content/blog/*.md` (se publican en
`/blog/<archivo>/`) y las en inglés en `src/content/blog/en/*.md`
(`/en/blog/<archivo>/`). La portada del blog, el sitemap y `llms.txt` las toman
solas. Textos fijos de cada idioma (migas, cierre con los botones de cotizar y
contactar) en `src/data/blog.ts`.

```yaml
---
titulo: 'Título de la nota'
descripcion: 'Meta description, entre 120 y 160 caracteres.'
fecha: 2026-09-22
idioma: es                # es (por defecto) o en
clave: '2026-09-22'       # la misma en las dos versiones: las enlaza con hreflang
keyword: 'búsqueda a la que apunta'
imagen: '../../assets/blog/portada.jpg'   # opcional, relativa al .md
imagenAlt: 'Qué se ve en la foto'
respuestaCorta: 'La respuesta directa, en 2 o 3 líneas. Sale destacada arriba.'
tags: ['diseño web']
faq:
  - pregunta: '¿Una pregunta frecuente?'
    respuesta: 'La respuesta, que se entienda fuera de contexto.'
---
```

`respuestaCorta` y `faq` no son decoración: son lo que un buscador con IA cita
como respuesta. Conviene que cada una se lea sola, sin el resto del artículo.

### Blog automático

Todos los días a las 12:00 UTC, `.github/workflows/blog-diario.yml` escribe
una nota nueva en inglés y en español, la sube a `main` y Netlify la publica.
El lector es el dueño de una pyme, idealmente en EE.UU., que se está llevando su
negocio a lo digital: necesita página web, manejo de redes o automatizar tareas.

1. **Keywords** (`scripts/blog/keywords.ts`): consulta el autocompletado de
   Google para EE.UU., en inglés y en español, con las semillas de
   `scripts/blog/temas.ts` (6 por idioma al día, rotando) y prefijos de pregunta.
   Descarta las atadas a otro país y las ya usadas en una nota.
2. **Redacción** (`scripts/blog/redactar.ts`): Claude Sonnet 5.5 elige la keyword
   con más intención de compra y escribe las dos versiones —no una traducción—
   con título, descripción, respuesta corta, FAQ, enlaces internos a los
   servicios y un cierre que invita a cotizar y a contactar.
3. **Imágenes** (`scripts/blog/imagenes.ts`): portada generada con OpenAI
   (queda en `src/assets/blog/`) e imagen interna de Unsplash, con crédito al
   fotógrafo. Las reglas de la API de Unsplash exigen enlazar la foto desde su
   servidor, sin descargarla, y avisar cada uso: el script hace las dos cosas.
   Sin clave de Unsplash, OpenAI genera también la interna; sin clave de
   OpenAI, la nota sale sin portada.
4. **Publicación**: si `npm run build` pasa, commit a `main`. Si algo falla no
   se publica nada y GitHub avisa por correo. Una sola nota por día: correrlo
   de nuevo el mismo día no hace nada, salvo con `--forzar`.

**Secretos del repositorio** (Settings → Secrets and variables → Actions):

| Secreto             | Para qué                     | Obligatorio            |
| ------------------- | ---------------------------- | ---------------------- |
| `ANTHROPIC_API_KEY` | Escribir la nota             | Sí                     |
| `OPENAI_API_KEY`      | Portada generada con IA          | Muy recomendable       |
| `UNSPLASH_ACCESS_KEY` | Imagen interna (gratis)          | Opcional               |

Variables opcionales (Settings → Secrets and variables → Actions → Variables):
`BLOG_MODELO` cambia el modelo que escribe (por defecto `claude-sonnet-5-5`,
~US$0,15 por nota; `claude-opus-5-5` escribe algo mejor a ~US$0,30;
`claude-haiku-5-5` cuesta ~US$0,01 pero queda más genérico) y
`OPENAI_IMAGE_MODEL` el de imagen (por defecto `gpt-image-2`).

**Correrlo a mano**: desde la pestaña Actions → "Blog diario" → Run workflow
(se puede fijar la keyword), o en local con las claves exportadas:

```bash
npm run blog:generar                          # nota del día
npm run blog:generar -- --keyword "how much does a small business website cost"
npm run blog:generar -- --forzar              # otra nota aunque ya haya una hoy
```

Para orientar los temas, editar `SEMILLAS`, `BUYER_PERSONA` y `ESTUDIO` en
`scripts/blog/temas.ts`. Lo que está en `ESTUDIO` es lo único que Claude puede
afirmar del estudio: no inventa precios, clientes ni cifras.

## SEO y AEO

Lo que ya está resuelto y no hay que volver a tocar:

- **Metadatos por página**: título, descripción, canonical, Open Graph, Twitter
  e idioma es-CL. Los títulos de las notas no llevan la marca cuando ya son
  largos, para que Google no los corte.
- **Datos estructurados** (JSON-LD), validables en
  [Rich Results Test](https://search.google.com/test/rich-results):
  `ProfessionalService` con catálogo de servicios y datos de contacto, `WebSite`,
  `FAQPage` en la home (de `faq` en `src/data/ojos.ts`) y en cada nota, y `BlogPosting` + `BreadcrumbList` en los
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

| Qué                                        | Archivo                         |
| ------------------------------------------ | ------------------------------- |
| Textos de la home y los casos (ES y EN)    | `src/data/ojos.ts`              |
| Preguntas frecuentes de la home            | `faq` en `src/data/ojos.ts`     |
| WhatsApp, correo, redes, Formspree         | `src/lib/config.ts`             |
| Home                                       | `src/components/ojos/OjosHome.tsx` |
| Página de cada proyecto                    | `src/components/ojos/OjosCaso.tsx` |
| Colores de las dos paletas                 | `src/styles/ojos.css`           |
| Notas del blog                             | `src/content/blog/*.md` (`en/` para inglés) |
| Temas y lector del blog automático         | `scripts/blog/temas.ts`         |
| Header, footer y textos del blog           | `src/components/`, `src/data/home.ts` |
| Fotos de proyectos                         | `src/assets/proyectos/`         |

## Pendientes antes de publicar

1. **Textos de Mersan, Energy y Consultora KO** en `CASOS` (`src/data/ojos.ts`):
   el diseño solo traía el de Chilecamiones; los otros tres hay que revisarlos.
2. **Galería de cada caso**: siguen los tres recuadros rayados del diseño, con
   el rótulo de qué captura va en cada uno (`ph` en `CASOS`).
3. **Perfiles de redes** en `src/lib/config.ts` (`REDES`).
4. **Dominio** en `astro.config.mjs` (constante `DOMINIO`), para cuando el sitio
   deje de servirse desde la URL de Netlify.
5. **`public/og-image.jpg`** es un provisorio; conviene uno con el diseño nuevo.

## Estructura

```
src/
├── assets/            capturas e íconos que Astro optimiza y versiona
├── components/ojos/   home y casos (React)
├── components/        header, footer y piezas del blog y las propuestas
├── content/blog/      las notas, en markdown (en/ para inglés)
├── content.config.ts  el esquema de una nota
├── data/ojos.ts       texto de la home y los casos, en ES y EN
├── data/home.ts       texto del header y footer del blog
├── layouts/           <head>, fuentes, SEO, JSON-LD
├── lib/               configuración, fechas, imágenes y JSON-LD
├── pages/             index, proyectos/, 404, blog/, robots.txt, llms.txt
├── styles/ojos.css    tokens y paletas de la home
└── styles/global.css  estilos del blog
scripts/blog/          blog automático: keywords, redacción e imágenes
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

### Shiva (`/propuestas/shiva/`)

Propuesta de lanzamiento en Chile para Shiva, marca argentina de crackers,
tostaditas y cookies sin gluten (hoy en shivacocina.com). Son dos páginas:

- `/propuestas/shiva/`: la propuesta. Punto de partida, qué cambia en Chile,
  los tres frentes (tienda con blog, canal mayorista y redes @shivacocina.cl),
  sellos “ALTO EN” de la Ley 20.606, lo que tiene que resolver Shiva, hoja de
  ruta, inversión y próximos pasos. No nombra la plataforma de la tienda: el
  stack no es parte de lo que se le vende al cliente.
- `/propuestas/shiva/tienda/`: demo navegable de shivacocina.cl. El selector
  Unidad / Mayorista cambia los precios de todo el catálogo (al público con
  IVA, o neto por caja de 12) y el carro avisa cuánto falta para el despacho
  gratis o para el pedido mínimo. El formulario de cuenta mayorista no envía
  nada.

Todo el contenido vive en `src/data/shiva.ts`: productos, precios en CLP, packs,
margen mayorista, pedido mínimo e inversión. La inversión es un pago único por
la tienda y el canal mayorista, más la mensualidad de redes. La mantención con
blog va aparte, como opcional, y no entra en el total. Los precios de los productos, el margen y el mínimo son
**referenciales**. Al cambiar cualquiera de estos valores ahí, la tienda, la
tabla de precios y el total del trimestre se recalculan solos. Los sellos se
calculan con la ficha nutricional que Shiva publica (`FICHAS_NUTRICIONALES`).

La gráfica es la de Shiva (`src/styles/shiva.css`): negro y hueso del empaque,
Archivo para los titulares, Playfair Display en cursiva para el remate, Readex
Pro para el texto y JetBrains Mono para los rótulos. Las fotos y el logo están
bajados de su tienda argentina en `src/assets/shiva/`.

Lo que falta confirmar con el cliente va en ámbar, con la clase `shiva-pendiente`,
para que en la reunión se vea de inmediato.

## Proyectos

Además de chilecamiones.cl, hay tres trabajos sacados del Instagram del estudio
(Mercado Mersan, Energy y Consultora KO). Cada uno tiene su página y la foto
está descargada en `src/assets/proyectos/`, así no depende de que el CDN de
Instagram siga sirviendo esa URL.

Para agregar otro: bajar la imagen a esa carpeta, sumar su clave en
`ARCHIVOS_IMAGEN` y una entrada en `CASOS` (`src/data/ojos.ts`). La página
`/proyectos/<slug>/` y la tarjeta del home salen solas.
