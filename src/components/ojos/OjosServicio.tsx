import { useEffect, useRef, useState } from 'react';
import { CASOS, HOME_OJOS, rutaCaso, rutaServicio, type Idioma, type Imagenes } from '../../data/ojos';
import { SERVICIOS_OJOS, type PaginaServicio } from '../../data/servicios';
import { Cursor, ICONO, css, pintarCursor, siguienteTema, useAncho, useIdioma, useReveal, useTema } from './comun';
import {
  Cifras,
  Cinta,
  Contacto,
  DatosHero,
  Encabezado,
  MONO,
  Manifiesto,
  Ojo,
  Pie,
  Preguntas,
  Proceso,
  REVEAL,
  ROTULO,
  SERIF,
  useEscena,
} from './secciones';

// Página de un servicio: la historia del video (o de la foto) contada en
// capítulos, con las mismas piezas y animaciones del home.

const TEXTOS: Record<
  Idioma,
  {
    inicio: string;
    servicios: string;
    proyectos: string;
    corto: string;
    historia: string;
    capitulo: string;
    incluye: string;
    extras: string;
    proceso: string;
    casos: string;
    faq: string;
    verCaso: string;
    siguiente: string;
    siguienteCursor: string;
    sonidoOn: string;
    sonidoOff: string;
  }
> = {
  es: {
    inicio: 'Inicio',
    servicios: 'Servicios',
    proyectos: 'Proyectos',
    corto: '(01) En corto',
    historia: '(02) La historia',
    capitulo: 'Capítulo',
    incluye: '(03) Qué hacemos',
    extras: '(04) Siempre incluido',
    proceso: '(05) Proceso',
    casos: '(06) Proyectos',
    faq: '(07) Preguntas',
    verCaso: 'Ver caso',
    siguiente: 'Siguiente servicio',
    siguienteCursor: 'Siguiente',
    sonidoOn: 'Activar sonido',
    sonidoOff: 'Silenciar',
  },
  en: {
    inicio: 'Home',
    servicios: 'Services',
    proyectos: 'Work',
    corto: '(01) In short',
    historia: '(02) The story',
    capitulo: 'Chapter',
    incluye: '(03) What we do',
    extras: '(04) Always included',
    proceso: '(05) Process',
    casos: '(06) Work',
    faq: '(07) Questions',
    verCaso: 'View case',
    siguiente: 'Next service',
    siguienteCursor: 'Next',
    sonidoOn: 'Turn sound on',
    sonidoOff: 'Mute',
  },
};

/**
 * Video vertical en marco de teléfono. Se reproduce en silencio mientras está
 * en pantalla; con movimiento reducido no arranca solo y muestra los controles.
 */
function VideoHistoria({
  video,
  poster,
  alt,
  t,
}: {
  video: NonNullable<PaginaServicio['video']>;
  poster: string;
  alt: string;
  t: (typeof TEXTOS)[Idioma];
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mudo, setMudo] = useState(true);
  const [quieto, setQuieto] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React no deja `muted` en el HTML del servidor: sin esto el navegador no
    // permite el autoplay.
    v.muted = true;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setQuieto(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !mudo;
    setMudo(!mudo);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <div style={css('position:relative;width:100%;height:100%')}>
      <video
        ref={ref}
        src={video.src}
        poster={poster}
        aria-label={alt}
        muted
        loop
        playsInline
        preload="metadata"
        controls={quieto}
        style={css('width:100%;height:100%;object-fit:cover;display:block')}
      />
      {!quieto && (
        <button
          type="button"
          onClick={alternar}
          aria-label={mudo ? t.sonidoOn : t.sonidoOff}
          aria-pressed={!mudo}
          data-cursor=""
          style={css(
            'all:unset;position:absolute;right:16px;bottom:16px;width:48px;height:48px;border-radius:50%;background:rgba(14,13,12,.55);backdrop-filter:blur(8px);color:#f1ede6;display:flex;align-items:center;justify-content:center'
          )}
        >
          <span aria-hidden="true" style={css(`${ICONO}font-weight:300;font-size:24px`)}>
            {mudo ? 'volume_off' : 'volume_up'}
          </span>
        </button>
      )}
    </div>
  );
}

export default function OjosServicio({ slug, imagenes }: { slug: string; imagenes: Imagenes }) {
  const [idioma, setIdioma] = useIdioma();
  const [tema, setTema] = useTema();
  const { wide, twoCol, narrow, coarse } = useAncho(
    (w) => ({ wide: w > 900, twoCol: w >= 1080, narrow: w < 640, coarse: matchMedia('(pointer: coarse)').matches }),
    { wide: true, twoCol: false, narrow: false, coarse: false }
  );
  useReveal();
  useEscena(tema, coarse);

  const i = SERVICIOS_OJOS.findIndex((s) => s.slug === slug);
  const servicio = SERVICIOS_OJOS[i];
  const siguiente = SERVICIOS_OJOS[(i + 1) % SERVICIOS_OJOS.length];
  const c = servicio.copy[idioma];
  const t = TEXTOS[idioma];
  const home = HOME_OJOS[idioma];
  const casos = servicio.casos.flatMap((s) => CASOS.filter((caso) => caso.slug === s)).map((caso) => ({ ...caso, ...caso.copy[idioma] }));
  const stickyPos = twoCol ? 'sticky' : 'relative';

  const nav = [
    ...SERVICIOS_OJOS.map((s) => ({ l: s.copy[idioma].nombre, h: rutaServicio(s.slug), actual: s.slug === servicio.slug })),
    { l: t.proyectos, h: '/#proyectos' },
  ];

  const cambiarTema = () => {
    const nuevo = siguienteTema(tema);
    setTema(nuevo);
    pintarCursor('dropper', nuevo);
  };

  // La palabra del hero ocupa el ancho: más letras, letra más chica.
  const tamPalabra = Math.min(27, 92 / (0.58 * c.palabra.length + 0.9)).toFixed(1);

  const media = servicio.video ? (
    <div
      style={css(
        `aspect-ratio:9/16;${twoCol ? 'height:min(76svh,720px);width:auto' : 'width:min(100%,380px)'};max-width:100%;margin:0 auto;border-radius:22px;overflow:hidden;background:var(--card)`
      )}
    >
      <VideoHistoria video={servicio.video} poster={imagenes[servicio.video.poster]} alt={c.mediaAlt} t={t} />
    </div>
  ) : (
    <div style={css('aspect-ratio:4/5;border-radius:10px;overflow:hidden;background:var(--card)')}>
      <img src={imagenes[servicio.img]} alt={c.mediaAlt} style={css('width:100%;height:100%;object-fit:cover;display:block')} />
    </div>
  );

  return (
    <>
      <Cursor />

      <Encabezado idioma={idioma} elegir={setIdioma} nav={nav} inicio="/" contacto="#contacto" narrow={narrow} wide={wide} />

      <main>
        <section
          id="top"
          style={css(
            'position:relative;min-height:100svh;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(28px,5vh,40px);padding:clamp(84px,12vh,104px) clamp(16px,3vw,44px) 32px;overflow:hidden'
          )}
        >
          <div style={css('display:flex;flex-direction:column;gap:14px')}>
            <DatosHero idioma={idioma} />
            <nav
              aria-label="Breadcrumb"
              style={css(`display:flex;gap:10px;flex-wrap:wrap;${MONO}font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)`)}
            >
              <a href="/" data-cursor="">
                {t.inicio}
              </a>
              <span aria-hidden="true">/</span>
              <a href="/#servicios" data-cursor="">
                {t.servicios}
              </a>
              <span aria-hidden="true">/</span>
              <span aria-current="page" style={css('color:var(--accent)')}>
                {c.nombre}
              </span>
            </nav>
          </div>

          <div
            data-hero-word=""
            style={css(
              `display:flex;align-items:center;justify-content:space-between;gap:.1em;font-size:clamp(56px,${tamPalabra}vw,560px);font-weight:800;font-stretch:75%;letter-spacing:-.05em;line-height:.78;will-change:transform`
            )}
          >
            <Ojo alClic={cambiarTema} etiqueta={home.eyeLabel} />
            <span aria-hidden="true" style={css('line-height:.74;white-space:nowrap')}>
              {c.palabra}
            </span>
          </div>

          <div
            style={css(
              'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:32px 64px;align-items:end'
            )}
          >
            <h1 style={css('margin:0;font-size:clamp(34px,4.2vw,72px);font-weight:400;line-height:1;letter-spacing:-.035em;text-wrap:balance')}>
              {c.heroA} <span style={css(`${SERIF}color:var(--accent)`)}>{c.heroB}</span>
            </h1>
            <div style={css('display:flex;align-items:flex-end;justify-content:space-between;gap:28px;flex-wrap:wrap')}>
              <p style={css('margin:0;flex:1 1 240px;max-width:40ch;font-size:16px;line-height:1.5;color:var(--soft);text-wrap:pretty')}>
                {c.heroSub}
              </p>
              <a
                href="#contacto"
                data-magnet=""
                data-cursor="↗"
                style={css(
                  'flex:none;width:clamp(112px,30vw,136px);height:clamp(112px,30vw,136px);border-radius:50%;background:var(--accent);color:var(--bg);display:flex;align-items:center;justify-content:center;text-align:center;padding:16px;font-size:15px;font-weight:600;line-height:1.15'
                )}
              >
                {c.heroCta}
              </a>
            </div>
          </div>
        </section>

        <Cinta items={c.marquee} />

        <Manifiesto label={t.corto} texto={c.prologo} clave={`${slug}-${idioma}`}>
          <div
            style={css(
              'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:24px 80px;margin-top:clamp(64px,10vh,120px);padding-top:40px;border-top:1px solid var(--line)'
            )}
          >
            <h2 style={css('margin:0;font-size:clamp(28px,2.6vw,44px);font-weight:600;line-height:1.05;letter-spacing:-.03em;text-wrap:balance')}>
              {c.corto.q}
            </h2>
            <p style={css('margin:0;max-width:60ch;font-size:clamp(18px,1.4vw,21px);line-height:1.55;color:var(--soft)')}>{c.corto.a}</p>
          </div>
        </Manifiesto>

        <section id="historia" style={css('padding:clamp(40px,8vh,100px) clamp(16px,3vw,44px) clamp(80px,12vh,140px)')}>
          <div style={css(`${ROTULO}margin-bottom:24px`)}>{t.historia}</div>
          <h2
            data-reveal=""
            style={css(`margin:0 0 clamp(56px,9vh,104px);font-size:clamp(52px,8vw,140px);font-weight:700;font-stretch:78%;line-height:.92;letter-spacing:-.05em;${REVEAL()}`)}
          >
            {c.historiaA} <span style={css(`${SERIF}font-weight:400;font-stretch:100%;color:var(--accent)`)}>{c.historiaB}</span>
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:56px 80px;align-items:start')}>
            <div style={css(`position:${stickyPos};top:${twoCol ? '96px' : 'auto'}`)}>{media}</div>
            <div data-process="" style={css('position:relative;padding-left:40px')}>
              <div aria-hidden="true" style={css('position:absolute;left:0;top:0;bottom:0;width:1px;background:var(--line)')} />
              <div
                data-pline=""
                aria-hidden="true"
                style={css('position:absolute;left:0;top:0;bottom:0;width:1px;background:var(--accent);transform:scaleY(0);transform-origin:top')}
              />
              {c.capitulos.map((cap, j) => (
                <article
                  key={j}
                  data-reveal=""
                  style={css(`padding:0 0 clamp(72px,14vh,160px);display:flex;flex-direction:column;gap:16px;${REVEAL()}`)}
                >
                  <span style={css(`${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)`)}>
                    {`${t.capitulo} 0${j + 1} — ${cap.k}`}
                  </span>
                  <h3 style={css('margin:0;font-size:clamp(32px,3.4vw,58px);font-weight:600;line-height:1;letter-spacing:-.035em;text-wrap:balance')}>
                    {cap.t}
                  </h3>
                  <p style={css('margin:0;font-size:clamp(17px,1.3vw,20px);line-height:1.55;color:var(--soft);max-width:48ch')}>{cap.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {servicio.video && (
          <section style={css('padding:0 clamp(16px,3vw,44px)')}>
            <div
              data-parallax-wrap=""
              style={css('border-radius:10px;overflow:hidden;aspect-ratio:16/9;min-height:260px;max-width:100%;background:var(--card)')}
            >
              <img
                data-parallax=""
                src={imagenes[servicio.img]}
                alt={c.mediaAlt}
                loading="lazy"
                style={css('width:100%;height:120%;object-fit:cover;display:block;will-change:transform')}
              />
            </div>
          </section>
        )}

        <section id="que-hacemos" style={css('padding:clamp(100px,16vh,200px) 0 clamp(80px,12vh,140px)')}>
          <div
            style={css(
              'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr));gap:24px 64px;align-items:end;padding:0 clamp(16px,3vw,44px) 56px'
            )}
          >
            <div>
              <div style={css(`${ROTULO}margin-bottom:24px`)}>{t.incluye}</div>
              <h2
                data-reveal=""
                style={css(`margin:0;font-size:clamp(40px,5vw,84px);font-weight:600;line-height:.95;letter-spacing:-.04em;${REVEAL()}text-wrap:balance`)}
              >
                {c.incluyeTitulo}
              </h2>
            </div>
            <p style={css('margin:0;max-width:46ch;font-size:18px;line-height:1.5;color:var(--soft);justify-self:end')}>{c.incluyeSub}</p>
          </div>
          <div
            style={css(
              'border-top:1px solid var(--line);padding:clamp(40px,5vw,72px) clamp(16px,3vw,44px) 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:48px 64px'
            )}
          >
            <div style={css(`position:${stickyPos};top:${twoCol ? '96px' : 'auto'};align-self:start;display:flex;flex-direction:column;gap:32px`)}>
              <div style={css('border-radius:6px;overflow:hidden;aspect-ratio:16/10;background:var(--card)')}>
                <img
                  src={imagenes[servicio.mockup]}
                  alt={c.mockupAlt}
                  loading="lazy"
                  className="oj-zoom"
                  style={css('width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)')}
                />
              </div>
              <div style={css('display:flex;flex-direction:column;gap:14px')}>
                <span style={css(`${MONO}font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)`)}>{c.tagsLabel}</span>
                <div style={css('display:flex;flex-wrap:wrap;gap:8px')}>
                  {c.tags.map((tg) => (
                    <span key={tg} style={css('padding:8px 14px;border:1px solid var(--line2);border-radius:999px;font-size:14px')}>
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div style={css('display:flex;flex-direction:column')}>
              {c.formatos.map((it, j) => (
                <div
                  key={j}
                  data-reveal=""
                  style={css(`display:grid;grid-template-columns:32px minmax(0,1fr);gap:12px;padding:28px 0;border-top:1px solid var(--line);${REVEAL(0.9)}`)}
                >
                  <span style={css(`${MONO}font-size:12px;color:var(--accent);padding-top:10px`)}>{'0' + (j + 1)}</span>
                  <div style={css('display:flex;flex-direction:column;gap:6px')}>
                    <h3 style={css('margin:0;font-size:clamp(26px,2.4vw,38px);font-weight:600;letter-spacing:-.025em')}>{it.t}</h3>
                    <span style={css(`${SERIF}font-size:22px;color:var(--accent)`)}>{it.s}</span>
                    <p style={css('margin:0;font-size:17px;line-height:1.5;color:var(--soft);max-width:52ch')}>{it.d}</p>
                  </div>
                </div>
              ))}
              <a
                href="#contacto"
                data-cursor=""
                style={css('align-self:flex-start;margin-top:24px;font-size:18px;font-weight:600;border-bottom:1px solid currentColor;padding-bottom:4px')}
              >
                {c.cta}
              </a>
            </div>
          </div>
        </section>

        <section
          style={css(
            'padding:clamp(80px,12vh,140px) clamp(16px,3vw,44px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:56px 80px;align-items:start'
          )}
        >
          <div style={css(`position:${stickyPos};top:${twoCol ? '120px' : 'auto'};display:flex;flex-direction:column;gap:28px`)}>
            <div style={css(ROTULO)}>{t.extras}</div>
            <h2 style={css('margin:0;font-size:clamp(48px,6.4vw,116px);font-weight:700;font-stretch:78%;line-height:.95;letter-spacing:-.05em;text-wrap:balance')}>
              {c.extrasTitulo}
            </h2>
          </div>
          <div style={css('display:flex;flex-direction:column')}>
            {c.extras.map((a, j) => (
              <div
                key={j}
                data-reveal=""
                style={css(`display:grid;grid-template-columns:48px minmax(0,1fr);gap:20px;padding:28px 0;border-top:1px solid var(--line);${REVEAL(0.9)}`)}
              >
                <span
                  style={css(
                    'width:48px;height:48px;border-radius:50%;border:1px solid var(--line2);display:flex;align-items:center;justify-content:center;color:var(--accent)'
                  )}
                >
                  <span aria-hidden="true" style={css(`${ICONO}font-weight:300;font-size:24px`)}>{servicio.iconosExtras[j]}</span>
                </span>
                <div style={css('display:flex;flex-direction:column;gap:8px')}>
                  <h3 style={css('margin:0;font-size:clamp(24px,2.2vw,34px);font-weight:600;letter-spacing:-.025em')}>{a.t}</h3>
                  <p style={css('margin:0;font-size:17px;line-height:1.5;color:var(--soft);max-width:50ch')}>{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Cifras stats={c.stats} />

        <Proceso label={t.proceso} titulo={c.procTitulo} sub={c.procSub} steps={c.steps} sticky={twoCol} />

        {casos.length > 0 && (
          <section id="proyectos" style={css('padding:0 clamp(16px,3vw,44px) clamp(100px,16vh,200px)')}>
            <div style={css(`${ROTULO}margin-bottom:24px`)}>{t.casos}</div>
            <h2 style={css('margin:0 0 56px;font-size:clamp(40px,5vw,88px);font-weight:600;line-height:.95;letter-spacing:-.04em;text-wrap:balance')}>
              {c.casosTitulo}
            </h2>
            <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(20px,2.5vw,40px)')}>
              {casos.map((p) => (
                <a key={p.slug} href={rutaCaso(p.slug)} data-cursor={t.verCaso} style={css('display:flex;flex-direction:column;gap:18px;color:var(--ink)')}>
                  <div style={css('aspect-ratio:16/10;overflow:hidden;border-radius:6px;background:var(--card)')}>
                    <img
                      src={imagenes[p.img]}
                      alt={p.title}
                      loading="lazy"
                      className="oj-zoom"
                      style={css('width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)')}
                    />
                  </div>
                  <div style={css('display:flex;justify-content:space-between;gap:24px;align-items:baseline;flex-wrap:wrap')}>
                    <h3 style={css('margin:0;font-size:clamp(28px,2.6vw,44px);font-weight:600;letter-spacing:-.035em')}>{p.title}</h3>
                    <span style={css(`${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)`)}>{p.cat}</span>
                  </div>
                  <p style={css('margin:0;font-size:16px;line-height:1.5;color:var(--soft);max-width:56ch')}>{p.desc}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        <Preguntas label={t.faq} titulo={c.faqTitulo} faq={c.faq} />

        <a
          href={rutaServicio(siguiente.slug)}
          data-cursor={t.siguienteCursor}
          style={css(
            'display:block;border-top:1px solid var(--line);padding:clamp(56px,9vh,104px) clamp(16px,3vw,44px) clamp(72px,11vh,128px);color:var(--ink);overflow:hidden'
          )}
        >
          <span style={css(`display:block;${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:24px`)}>
            {t.siguiente}
          </span>
          <span
            style={css(
              'display:flex;align-items:center;gap:.2em;font-size:clamp(52px,11vw,220px);font-weight:800;font-stretch:75%;letter-spacing:-.055em;line-height:.85'
            )}
          >
            <span aria-hidden="true" style={css(`${ICONO}font-weight:200;font-size:.55em;letter-spacing:0;flex:none`)}>
              {siguiente.icono}
            </span>
            {siguiente.copy[idioma].nombre} →
          </span>
        </a>

        <Contacto idioma={idioma} necesidadInicial={servicio.necesidad} />
      </main>

      <Pie idioma={idioma} />
    </>
  );
}
