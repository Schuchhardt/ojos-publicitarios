import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import { CASOS, HOME_OJOS, rutaCaso, type Imagenes } from '../../data/ojos';
import { ANIO, CONTACTO_EMAIL, FORMSPREE_ENDPOINT, REDES, whatsappUrl } from '../../lib/config';
import {
  Cursor,
  ICONO,
  SelectorIdioma,
  css,
  pintarCursor,
  useAncho,
  useAnimacion,
  useIdioma,
  useReveal,
  useTema,
} from './comun';

const MONO = "font-family:'JetBrains Mono',monospace;";
const ROTULO = `${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);`;
const SERIF = "font-family:'Instrument Serif',serif;font-style:italic;";
const REVEAL = (s = 1) =>
  `opacity:0;transform:translateY(40px);transition:opacity ${s}s cubic-bezier(.2,.8,.2,1),transform ${s}s cubic-bezier(.2,.8,.2,1);`;

const ICONOS_SERVICIO = ['web', 'terminal', 'campaign'];
const ICONOS_AUTO = ['chat', 'notifications_active', 'contacts', 'calendar_month', 'inventory_2', 'autorenew', 'edit_note'];
const ICONOS_PASO = ['forum', 'draw', 'build', 'rocket_launch'];
const INSTAGRAM = REDES.find((red) => red.icono === 'instagram')?.url;

type EstadoEnvio = 'listo' | 'enviando' | 'enviado' | 'error';

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function Ojo({ alClic, etiqueta }: { alClic: () => void; etiqueta: string }) {
  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={etiqueta}
      onClick={alClic}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), alClic())}
      data-cursor="dropper"
      style={css(
        'position:relative;display:inline-block;width:.74em;height:.74em;border-radius:50%;background:var(--eye);overflow:hidden;flex:none;transition:background .5s'
      )}
    >
      <span
        data-pupil=""
        style={css(
          'position:absolute;left:29%;top:29%;width:42%;height:42%;border-radius:50%;background:var(--pupil);box-shadow:inset 0 0 0 .05em var(--accent);will-change:transform'
        )}
      >
        <span style={css('position:absolute;left:20%;top:20%;width:20%;height:20%;border-radius:50%;background:var(--hl)')} />
      </span>
      <span
        data-lid=""
        style={css('position:absolute;inset:0;background:var(--bg);transform:scaleY(0);transform-origin:top;transition:transform .11s ease-in')}
      />
    </span>
  );
}

export default function OjosHome({ imagenes }: { imagenes: Imagenes }) {
  const [idioma, setIdioma] = useIdioma();
  const [tema, setTema] = useTema();
  const [abierto, setAbierto] = useState<number | null>(null);
  const [encima, setEncima] = useState(-1);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(0);
  const [necesidad, setNecesidad] = useState<number | null>(null);
  const [envio, setEnvio] = useState<EstadoEnvio>('listo');
  const { wide, twoCol, narrow, coarse } = useAncho(
    (w) => ({ wide: w > 900, twoCol: w >= 1080, narrow: w < 640, coarse: matchMedia('(pointer: coarse)').matches }),
    { wide: true, twoCol: false, narrow: false, coarse: false }
  );
  const t = HOME_OJOS[idioma];
  useReveal();

  // Parpadeo cada tanto y con cada clic; reloj en hora de Santiago.
  useEffect(() => {
    const parpadear = () =>
      document.querySelectorAll<HTMLElement>('[data-lid]').forEach((parpado) => {
        parpado.style.transform = 'scaleY(1)';
        setTimeout(() => (parpado.style.transform = 'scaleY(0)'), 150);
      });
    const reloj = () => {
      const el = document.querySelector('[data-clock]');
      if (el)
        el.textContent = new Date().toLocaleTimeString('es-CL', {
          timeZone: 'America/Santiago',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
    };
    const intervaloOjos = setInterval(parpadear, 4200);
    const intervaloReloj = setInterval(reloj, 1000);
    reloj();
    document.addEventListener('click', parpadear);
    return () => {
      clearInterval(intervaloOjos);
      clearInterval(intervaloReloj);
      document.removeEventListener('click', parpadear);
    };
  }, []);

  const anim = useRef({ f: { x: 0, y: 0 }, lastY: 0, vel: 0, mx: 0, iniciado: false });
  const tactil = useRef(coarse);
  tactil.current = coarse;
  useAnimacion(
    (m) => {
      const a = anim.current;
      const H = innerHeight;
      const W = innerWidth;
      if (!a.iniciado) {
        a.f = { ...m };
        a.lastY = scrollY;
        a.iniciado = true;
      }

      const f = a.f;
      f.x += (m.x - f.x) * 0.1;
      f.y += (m.y - f.y) * 0.1;
      const flotante = document.querySelector<HTMLElement>('[data-float]');
      if (flotante)
        flotante.style.transform = `translate(${f.x}px,${f.y}px) translate(-50%,-50%) rotate(${clamp((m.x - f.x) * 0.06, -10, 10)}deg)`;

      document.querySelectorAll<HTMLElement>('[data-pupil]').forEach((p) => {
        const r = p.parentElement!.getBoundingClientRect();
        const dx = m.x - (r.left + r.width / 2);
        const dy = m.y - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / (W * 0.35)) * r.width * 0.27;
        p.style.transform = `translate(${(dx / d) * k}px,${(dy / d) * k}px)`;
      });

      const y = scrollY;
      const v = y - a.lastY;
      a.lastY = y;
      a.vel += (v - a.vel) * 0.12;

      const palabra = document.querySelector<HTMLElement>('[data-hero-word]');
      if (palabra && y < H * 1.5) {
        palabra.style.transform = `translateY(${-y * 0.18}px) scale(${1 - clamp(y / H, 0, 1) * 0.06})`;
        palabra.style.opacity = String(clamp(1 - y / (H * 0.7), 0, 1));
      }

      const cinta = document.querySelector<HTMLElement>('[data-marquee]');
      if (cinta) {
        const mitad = cinta.scrollWidth / 2;
        a.mx -= 1 + Math.abs(a.vel) * 0.35;
        if (mitad > 0 && a.mx < -mitad) a.mx += mitad;
        cinta.style.transform = `translateX(${a.mx}px) skewX(${clamp(-a.vel * 0.25, -14, 14)}deg)`;
      }

      const manifiesto = document.querySelector('[data-words]');
      if (manifiesto) {
        const r = manifiesto.getBoundingClientRect();
        const p = clamp((H * 0.85 - r.top) / (r.height * 0.9), 0, 1);
        const spans = manifiesto.querySelectorAll<HTMLElement>('[data-word]');
        spans.forEach((s, i) => {
          const o = i / spans.length < p ? '1' : '0.14';
          if (s.style.opacity !== o) s.style.opacity = o;
        });
      }

      const hs = document.querySelector<HTMLElement>('[data-hscroll]');
      const pista = document.querySelector<HTMLElement>('[data-htrack]');
      if (hs && pista) {
        const dist = Math.max(0, pista.scrollWidth - W);
        const alto = dist + H + H * 0.2;
        if (Math.abs(hs.offsetHeight - alto) > 4) hs.style.height = alto + 'px';
        const p = clamp(-hs.getBoundingClientRect().top / Math.max(1, hs.offsetHeight - H), 0, 1);
        pista.style.transform = `translateX(${-p * dist}px)`;
        const barra = document.querySelector<HTMLElement>('[data-hbar]');
        if (barra) barra.style.transform = `scaleX(${p})`;
      }

      const proceso = document.querySelector('[data-process]');
      const linea = document.querySelector<HTMLElement>('[data-pline]');
      if (proceso && linea) {
        const r = proceso.getBoundingClientRect();
        linea.style.transform = `scaleY(${clamp((H * 0.6 - r.top) / r.height, 0, 1)})`;
      }

      // En pantallas táctiles no hay mouse que seguir: el botón se corría hacia
      // el último toque y quedaba descentrado al hacer scroll.
      if (tactil.current) return;
      document.querySelectorAll<HTMLElement & { _x?: number; _y?: number }>('[data-magnet]').forEach((el) => {
        el._x = el._x || 0;
        el._y = el._y || 0;
        const r = el.getBoundingClientRect();
        const dx = m.x - (r.left + r.width / 2 - el._x);
        const dy = m.y - (r.top + r.height / 2 - el._y);
        const cerca = Math.hypot(dx, dy) < r.width * 1.1;
        el._x += ((cerca ? dx * 0.35 : 0) - el._x) * 0.15;
        el._y += ((cerca ? dy * 0.35 : 0) - el._y) * 0.15;
        el.style.transform = `translate(${el._x}px,${el._y}px)`;
      });
    },
    tema,
    1 / 3
  );

  const cambiarTema = () => {
    const nuevo = tema === 'dark' ? 'blue' : 'dark';
    setTema(nuevo);
    pintarCursor('dropper', nuevo);
  };

  // Manifiesto palabra por palabra; lo que va entre asteriscos, en cursiva.
  const palabras: { w: string; em: boolean }[] = [];
  let enfasis = false;
  for (const crudo of t.manifesto.split(' ')) {
    let w = crudo;
    if (w.startsWith('*')) {
      enfasis = true;
      w = w.slice(1);
    }
    const cierra = w.includes('*');
    palabras.push({ w: w.replace('*', ''), em: enfasis });
    if (cierra) enfasis = false;
  }

  const proyectos = CASOS.map((caso) => ({ ...caso, ...caso.copy[idioma] }));
  const stickyPos = twoCol ? 'sticky' : 'relative';
  const svcCols = narrow ? 'minmax(0,1fr) auto' : 'minmax(48px,140px) minmax(0,1fr) auto';
  const ctaPad = narrow ? '8px 12px' : '10px 16px';
  const floatOp = encima >= 0 && abierto !== encima && !coarse && wide ? 1 : 0;
  const floatImg = imagenes[t.services[Math.max(0, encima)].img];

  const enviar = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    datos.set('tipo', necesidad === null ? '' : t.needs[necesidad]);
    setEnvio('enviando');
    try {
      const respuesta = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: datos,
        headers: { Accept: 'application/json' },
      });
      setEnvio(respuesta.ok ? 'enviado' : 'error');
    } catch {
      setEnvio('error');
    }
  };

  const campo = 'all:unset;box-sizing:border-box;padding:14px 0;border-bottom:1px solid var(--bg);font-size:20px;font-family:inherit';

  return (
    <>
      <Cursor />

      <div
        data-float=""
        aria-hidden="true"
        style={css(
          `position:fixed;left:0;top:0;width:clamp(220px,24vw,360px);aspect-ratio:4/3;pointer-events:none;z-index:60;overflow:hidden;border-radius:4px;opacity:${floatOp};transition:opacity .35s ease;will-change:transform`
        )}
      >
        <img src={floatImg} alt="" style={css('width:100%;height:100%;object-fit:cover;display:block')} />
      </div>

      <header
        style={css(
          'position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px clamp(16px,3vw,44px);mix-blend-mode:difference;color:#f1ede6'
        )}
      >
        <a href="#top" data-cursor="" style={css('display:flex;align-items:baseline;gap:12px;color:#f1ede6')}>
          <span style={css('font-weight:800;font-size:22px;letter-spacing:-0.03em;font-stretch:80%')}>OJOS®</span>
          {!narrow && (
            <span style={css(`${MONO}font-size:11px;letter-spacing:.08em;text-transform:uppercase;opacity:.75`)}>{t.navTag}</span>
          )}
        </a>
        {wide && (
          <nav style={css(`display:flex;gap:32px;${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase`)}>
            {t.nav.map((n) => (
              <a key={n.h} href={n.h} data-cursor="" style={css('color:#f1ede6')}>
                {n.l}
              </a>
            ))}
          </nav>
        )}
        <div style={css('display:flex;align-items:center;gap:18px')}>
          <SelectorIdioma idioma={idioma} elegir={setIdioma} />
          <a
            href="#contacto"
            data-cursor=""
            style={css(
              `${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;padding:${ctaPad};border:1px solid #f1ede6;border-radius:999px;color:#f1ede6`
            )}
          >
            {t.navCta}
          </a>
        </div>
      </header>

      <main>
        <section
          id="top"
          style={css(
            'position:relative;min-height:100svh;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(28px,5vh,40px);padding:clamp(84px,12vh,104px) clamp(16px,3vw,44px) 32px;overflow:hidden'
          )}
        >
          <div
            style={css(
              `display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px 12px;${MONO}font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)`
            )}
          >
            <span style={css('display:flex;align-items:center;gap:8px')}>
              <span aria-hidden="true" style={css(`${ICONO}font-weight:300;font-size:16px;flex:none;text-transform:none;letter-spacing:0;`)}>
                location_on
              </span>
              {t.heroLoc}
            </span>
            <span style={css('display:flex;align-items:center;gap:8px')}>
              <span aria-hidden="true" style={css(`${ICONO}font-weight:300;font-size:16px;flex:none;text-transform:none;letter-spacing:0;`)}>
                schedule
              </span>
              <span data-clock="" /> CLT
            </span>
            <span style={css('display:flex;align-items:center;gap:10px')}>
              <span
                aria-hidden="true"
                style={css(
                  `${ICONO}font-weight:300;font-size:16px;flex:none;text-transform:none;letter-spacing:0;color:var(--accent);font-variation-settings:'FILL' 1`
                )}
              >
                bolt
              </span>
              {t.heroAvail}
            </span>
          </div>

          <div
            data-hero-word=""
            aria-label="OJOS"
            style={css(
              'display:flex;align-items:center;justify-content:space-between;font-size:clamp(96px,27vw,560px);font-weight:800;font-stretch:75%;letter-spacing:-.05em;line-height:.78;will-change:transform'
            )}
          >
            <Ojo alClic={cambiarTema} etiqueta={t.eyeLabel} />
            <span aria-hidden="true" style={css('line-height:.74')}>J</span>
            <Ojo alClic={cambiarTema} etiqueta={t.eyeLabel} />
            <span aria-hidden="true" style={css('line-height:.74')}>S</span>
          </div>

          <div
            style={css(
              'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:32px 64px;align-items:end'
            )}
          >
            <h1 style={css('margin:0;font-size:clamp(34px,4.6vw,80px);font-weight:400;line-height:1;letter-spacing:-.035em;text-wrap:balance')}>
              {t.heroA} <span style={css(`${SERIF}color:var(--accent)`)}>{t.heroB}</span> {t.heroC}
            </h1>
            <div style={css('display:flex;align-items:flex-end;justify-content:space-between;gap:28px;flex-wrap:wrap')}>
              <p style={css('margin:0;flex:1 1 240px;max-width:38ch;font-size:16px;line-height:1.5;color:var(--soft);text-wrap:pretty')}>
                {t.heroSub}
              </p>
              <a
                href="#contacto"
                data-magnet=""
                data-cursor="↗"
                style={css(
                  'flex:none;width:clamp(112px,30vw,136px);height:clamp(112px,30vw,136px);border-radius:50%;background:var(--accent);color:var(--bg);display:flex;align-items:center;justify-content:center;text-align:center;padding:16px;font-size:15px;font-weight:600;line-height:1.15'
                )}
              >
                {t.heroCta}
              </a>
            </div>
          </div>
        </section>

        <div aria-hidden="true" style={css('border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:26px 0;overflow:hidden')}>
          <div data-marquee="" style={css('display:flex;width:max-content;align-items:center;will-change:transform')}>
            {[...t.marquee, ...t.marquee].map((m, i) => (
              <span
                key={i}
                style={css(
                  `display:flex;align-items:center;gap:40px;padding-right:40px;${SERIF}font-size:clamp(36px,6.4vw,104px);line-height:1;white-space:nowrap`
                )}
              >
                {m}
                <span style={css("font-family:'Bricolage Grotesque',sans-serif;font-style:normal;color:var(--accent);font-size:.6em")}>✳</span>
              </span>
            ))}
          </div>
        </div>

        <section data-words="" style={css('padding:clamp(96px,22vh,240px) clamp(16px,3vw,44px)')}>
          <div style={css(`${ROTULO}margin-bottom:40px`)}>{t.manLabel}</div>
          <p style={css('margin:0;max-width:1500px;font-size:clamp(30px,5.4vw,96px);font-weight:500;line-height:1.12;letter-spacing:-.035em')}>
            {palabras.map((p, i) => (
              <span key={`${idioma}-${i}`} data-word="" style={css('display:inline-block;margin-right:.22em;opacity:.14;transition:opacity .35s ease')}>
                {p.em ? (
                  <span style={css(`${SERIF}font-weight:400;color:var(--accent)`)}>{p.w}</span>
                ) : (
                  p.w
                )}
              </span>
            ))}
          </p>
        </section>

        <section id="servicios" style={css('padding-bottom:clamp(80px,14vh,160px)')}>
          <div
            style={css(
              'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr));gap:24px 64px;align-items:end;padding:0 clamp(16px,3vw,44px) 56px'
            )}
          >
            <div>
              <div style={css(`${ROTULO}margin-bottom:24px`)}>{t.svcLabel}</div>
              <h2
                data-reveal=""
                style={css(`margin:0;font-size:clamp(40px,5vw,84px);font-weight:600;line-height:.95;letter-spacing:-.04em;${REVEAL()}text-wrap:balance`)}
              >
                {t.svcTitle}
              </h2>
            </div>
            <p style={css('margin:0;max-width:46ch;font-size:18px;line-height:1.5;color:var(--soft);justify-self:end')}>{t.svcIntro}</p>
          </div>
          <div style={css('border-bottom:1px solid var(--line)')}>
            {t.services.map((s, i) => {
              const esta = abierto === i;
              return (
                <div key={i} style={css('border-top:1px solid var(--line)')}>
                  <button
                    type="button"
                    className="oj-svc"
                    aria-expanded={esta}
                    onClick={() => setAbierto(esta ? null : i)}
                    onMouseEnter={() => setEncima(i)}
                    onMouseLeave={() => setEncima(-1)}
                    data-cursor={esta ? t.close : t.open}
                    style={css(
                      `all:unset;box-sizing:border-box;width:100%;display:grid;grid-template-columns:${svcCols};align-items:center;gap:16px 24px;padding:clamp(22px,3vw,44px) clamp(16px,3vw,44px);color:var(--ink);transition:background .45s cubic-bezier(.2,.8,.2,1),color .45s`
                    )}
                  >
                    <span style={css(`display:${narrow ? 'none' : 'block'};${MONO}font-size:13px;letter-spacing:.06em`)}>{'0' + (i + 1)}</span>
                    <span
                      style={css(
                        'display:flex;align-items:center;gap:.22em;min-width:0;font-size:clamp(42px,8.6vw,158px);font-weight:700;font-stretch:78%;letter-spacing:-.045em;line-height:.88'
                      )}
                    >
                      <span aria-hidden="true" style={css(`${ICONO}font-weight:200;font-size:.55em;letter-spacing:0;flex:none`)}>
                        {ICONOS_SERVICIO[i]}
                      </span>
                      <span>{s.title}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      style={css(
                        `${ICONO}font-weight:200;font-size:clamp(36px,3.6vw,60px);transform:rotate(${esta ? 45 : 0}deg);transition:transform .5s cubic-bezier(.2,.8,.2,1)`
                      )}
                    >
                      add
                    </span>
                  </button>
                  {esta && (
                    <div
                      style={css(
                        'padding:8px clamp(16px,3vw,44px) clamp(48px,6vw,88px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:48px 64px'
                      )}
                    >
                      <div style={css('display:flex;flex-direction:column;gap:32px')}>
                        <p style={css('margin:0;font-size:clamp(22px,2vw,30px);line-height:1.25;letter-spacing:-.015em;text-wrap:pretty')}>{s.lead}</p>
                        <div style={css('border-radius:6px;overflow:hidden;aspect-ratio:16/10;background:var(--card)')}>
                          <img src={imagenes[s.img]} alt={s.title} style={css('width:100%;height:100%;object-fit:cover;display:block')} />
                        </div>
                        <div style={css('display:flex;flex-direction:column;gap:14px')}>
                          <span style={css(`${MONO}font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)`)}>{s.tagsLabel}</span>
                          <div style={css('display:flex;flex-wrap:wrap;gap:8px')}>
                            {s.tags.map((tg) => (
                              <span key={tg} style={css('padding:8px 14px;border:1px solid var(--line2);border-radius:999px;font-size:14px')}>
                                {tg}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div style={css('display:flex;flex-direction:column')}>
                        {s.items.map((it, j) => (
                          <div key={j} style={css('display:grid;grid-template-columns:32px minmax(0,1fr);gap:12px;padding:24px 0;border-top:1px solid var(--line)')}>
                            <span style={css(`${MONO}font-size:12px;color:var(--accent);padding-top:8px`)}>{'0' + (j + 1)}</span>
                            <div style={css('display:flex;flex-direction:column;gap:6px')}>
                              <h3 style={css('margin:0;font-size:clamp(24px,2.2vw,32px);font-weight:600;letter-spacing:-.025em')}>{it.t}</h3>
                              <span style={css(`${SERIF}font-size:22px;color:var(--accent)`)}>{it.s}</span>
                              <p style={css('margin:0;font-size:16px;line-height:1.5;color:var(--soft);max-width:52ch')}>{it.d}</p>
                            </div>
                          </div>
                        ))}
                        <a
                          href="#contacto"
                          data-cursor=""
                          style={css('align-self:flex-start;margin-top:24px;font-size:18px;font-weight:600;border-bottom:1px solid currentColor;padding-bottom:4px')}
                        >
                          {s.cta}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section
          style={css(
            'padding:clamp(80px,12vh,140px) clamp(16px,3vw,44px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:56px 80px;align-items:start'
          )}
        >
          <div style={css(`position:${stickyPos};top:120px;display:flex;flex-direction:column;gap:28px`)}>
            <div style={css(ROTULO)}>{t.autoLabel}</div>
            <h2 style={css('margin:0;font-size:clamp(52px,8vw,140px);font-weight:700;font-stretch:78%;line-height:.98;letter-spacing:-.05em')}>
              {t.autoTitleA}
              <br />
              <span style={css(`${SERIF}font-weight:400;font-stretch:100%;color:var(--accent)`)}>{t.autoTitleB}</span>
            </h2>
            <p style={css('margin:0;max-width:40ch;font-size:18px;line-height:1.5;color:var(--soft)')}>{t.autoSub}</p>
            <a
              href="#contacto"
              data-cursor=""
              style={css('align-self:flex-start;font-size:18px;font-weight:600;border-bottom:1px solid currentColor;padding-bottom:4px')}
            >
              {t.autoCta}
            </a>
          </div>
          <div style={css('display:flex;flex-direction:column')}>
            {t.auto.map((a, i) => (
              <div
                key={i}
                data-reveal=""
                style={css(`display:grid;grid-template-columns:48px minmax(0,1fr);gap:20px;padding:28px 0;border-top:1px solid var(--line);${REVEAL(0.9)}`)}
              >
                <span
                  style={css(
                    'width:48px;height:48px;border-radius:50%;border:1px solid var(--line2);display:flex;align-items:center;justify-content:center;color:var(--accent)'
                  )}
                >
                  <span aria-hidden="true" style={css(`${ICONO}font-weight:300;font-size:24px`)}>{ICONOS_AUTO[i]}</span>
                </span>
                <div style={css('display:flex;flex-direction:column;gap:8px')}>
                  <h3 style={css('margin:0;font-size:clamp(24px,2.2vw,34px);font-weight:600;letter-spacing:-.025em')}>{a.t}</h3>
                  <p style={css('margin:0;font-size:17px;line-height:1.5;color:var(--soft);max-width:50ch')}>{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={css(
            'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));border-top:1px solid var(--line);border-bottom:1px solid var(--line)'
          )}
        >
          {t.stats.map((st, i) => (
            <div
              key={i}
              data-reveal=""
              style={css(
                `padding:clamp(36px,4vw,60px) clamp(16px,3vw,44px);border-right:1px solid var(--line);display:flex;flex-direction:column;gap:20px;justify-content:space-between;min-height:clamp(200px,28vw,300px);${REVEAL()}`
              )}
            >
              <span style={css('font-size:clamp(72px,9vw,168px);font-weight:700;font-stretch:75%;letter-spacing:-.05em;line-height:.85')}>{st.v}</span>
              <span style={css('font-size:16px;line-height:1.45;color:var(--soft);max-width:28ch')}>{st.l}</span>
            </div>
          ))}
        </section>

        <section style={css('padding:clamp(100px,16vh,200px) clamp(16px,3vw,44px)')}>
          <div style={css(`${ROTULO}margin-bottom:28px`)}>{t.critLabel}</div>
          <h2
            data-reveal=""
            style={css(`margin:0 0 28px;max-width:16ch;font-size:clamp(44px,6.4vw,116px);font-weight:600;line-height:.92;letter-spacing:-.045em;${REVEAL()}`)}
          >
            {t.critA} <span style={css(`${SERIF}font-weight:400;color:var(--accent)`)}>{t.critB}</span>
          </h2>
          <p style={css('margin:0 0 72px;max-width:56ch;font-size:18px;line-height:1.5;color:var(--soft)')}>{t.critSub}</p>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:20px')}>
            <div style={css('padding:clamp(28px,3vw,48px);border:1px solid var(--line2);border-radius:8px')}>
              <div style={css(`${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:24px`)}>{t.critL}</div>
              {t.critLi.map((li) => (
                <div key={li} style={css('display:flex;gap:16px;padding:16px 0;border-top:1px solid var(--line);font-size:19px;line-height:1.35')}>
                  <span
                    aria-hidden="true"
                    style={css(`${ICONO}font-weight:300;font-size:22px;flex:none;text-transform:none;letter-spacing:0;color:var(--accent)`)}
                  >
                    check
                  </span>
                  <span>{li}</span>
                </div>
              ))}
            </div>
            <div style={css('padding:clamp(28px,3vw,48px);background:var(--ink);color:var(--bg);border-radius:8px')}>
              <div style={css(`${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:24px`)}>{t.critR}</div>
              {t.critRi.map((li) => (
                <div key={li} style={css('display:flex;gap:16px;padding:16px 0;border-top:1px solid var(--iline);font-size:19px;line-height:1.35')}>
                  <span
                    aria-hidden="true"
                    style={css(`${ICONO}font-weight:300;font-size:22px;flex:none;text-transform:none;letter-spacing:0;color:var(--iaccent)`)}
                  >
                    block
                  </span>
                  <span>{li}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proyectos" data-hscroll="" style={css('position:relative;height:340vh')}>
          <div
            style={css(
              'position:sticky;top:0;height:100svh;overflow:hidden;padding-top:64px;display:flex;flex-direction:column;justify-content:center;gap:clamp(28px,5vh,56px)'
            )}
          >
            <div style={css('display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;padding:0 clamp(16px,3vw,44px)')}>
              <div>
                <div style={css(`${ROTULO}margin-bottom:16px`)}>{t.projLabel}</div>
                <h2 style={css('margin:0;font-size:clamp(40px,5vw,88px);font-weight:600;line-height:.95;letter-spacing:-.04em')}>{t.projTitle}</h2>
              </div>
              <div aria-hidden="true" style={css('width:min(320px,100%);height:2px;background:var(--line);overflow:hidden')}>
                <div data-hbar="" style={css('height:100%;background:var(--accent);transform:scaleX(0);transform-origin:left')} />
              </div>
            </div>
            <div
              data-htrack=""
              style={css('display:flex;gap:clamp(20px,2.5vw,40px);width:max-content;padding:0 clamp(16px,3vw,44px);will-change:transform')}
            >
              {proyectos.map((p) => (
                <a
                  key={p.slug}
                  href={rutaCaso(p.slug)}
                  data-cursor={t.caseCursor}
                  style={css('flex:none;width:clamp(270px,50vw,820px);display:flex;flex-direction:column;gap:18px;color:var(--ink)')}
                >
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
                    <h3 style={css('margin:0;font-size:clamp(30px,3vw,52px);font-weight:600;letter-spacing:-.035em')}>{p.title}</h3>
                    <span style={css(`${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)`)}>{p.cat}</span>
                  </div>
                  <p style={css('margin:0;font-size:16px;line-height:1.5;color:var(--soft);max-width:56ch')}>{p.desc}</p>
                </a>
              ))}
              <a
                href="#contacto"
                data-cursor="↗"
                style={css(
                  'flex:none;width:clamp(270px,38vw,600px);aspect-ratio:16/10;border-radius:6px;border:1px dashed var(--line2);display:flex;flex-direction:column;justify-content:space-between;padding:clamp(24px,3vw,44px);color:var(--ink)'
                )}
              >
                <span style={css(`${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)`)}>
                  {`0${proyectos.length + 1} / 0${proyectos.length + 1}`}
                </span>
                <span style={css('font-size:clamp(36px,4vw,72px);font-weight:600;line-height:.95;letter-spacing:-.04em')}>
                  {t.projEndA} <span style={css(`${SERIF}font-weight:400;color:var(--accent)`)}>{t.projEndB}</span>
                </span>
              </a>
            </div>
          </div>
        </section>

        <section
          id="proceso"
          style={css(
            'padding:clamp(100px,16vh,200px) clamp(16px,3vw,44px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:56px 80px;align-items:start'
          )}
        >
          <div style={css(`position:${stickyPos};top:120px;display:flex;flex-direction:column;gap:24px`)}>
            <div style={css(ROTULO)}>{t.procLabel}</div>
            <h2 style={css('margin:0;font-size:clamp(44px,5.6vw,100px);font-weight:600;line-height:.92;letter-spacing:-.045em;text-wrap:balance')}>{t.procTitle}</h2>
            <p style={css('margin:0;max-width:40ch;font-size:18px;line-height:1.5;color:var(--soft)')}>{t.procSub}</p>
          </div>
          <div data-process="" style={css('position:relative;padding-left:40px')}>
            <div aria-hidden="true" style={css('position:absolute;left:0;top:0;bottom:0;width:1px;background:var(--line)')} />
            <div
              data-pline=""
              aria-hidden="true"
              style={css('position:absolute;left:0;top:0;bottom:0;width:1px;background:var(--accent);transform:scaleY(0);transform-origin:top')}
            />
            {t.steps.map((sp, i) => (
              <div key={i} data-reveal="" style={css(`padding:0 0 clamp(64px,10vh,120px);display:flex;flex-direction:column;gap:12px;${REVEAL()}`)}>
                <span style={css(`${SERIF}font-size:clamp(72px,8vw,132px);line-height:.8;color:var(--accent)`)}>{'0' + (i + 1)}</span>
                <span
                  style={css(
                    `display:flex;align-items:center;gap:10px;${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:12px`
                  )}
                >
                  <span aria-hidden="true" style={css(`${ICONO}font-weight:300;font-size:20px;letter-spacing:0;text-transform:none;color:var(--ink)`)}>
                    {ICONOS_PASO[i]}
                  </span>
                  {sp.k}
                </span>
                <h3 style={css('margin:0;font-size:clamp(28px,2.8vw,44px);font-weight:600;letter-spacing:-.03em')}>{sp.t}</h3>
                <p style={css('margin:0;font-size:17px;line-height:1.5;color:var(--soft);max-width:46ch')}>{sp.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="faq"
          style={css(
            'padding:0 clamp(16px,3vw,44px) clamp(100px,16vh,200px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:48px 80px;align-items:start'
          )}
        >
          <div style={css('display:flex;flex-direction:column;gap:24px')}>
            <div style={css(ROTULO)}>{t.faqLabel}</div>
            <h2 style={css('margin:0;font-size:clamp(40px,4.6vw,80px);font-weight:600;line-height:.95;letter-spacing:-.04em;text-wrap:balance')}>{t.faqTitle}</h2>
          </div>
          <div style={css('border-bottom:1px solid var(--line)')}>
            {t.faq.map((f, i) => {
              const esta = faqAbierta === i;
              return (
                <div key={i} style={css('border-top:1px solid var(--line)')}>
                  <button
                    type="button"
                    className="oj-faq"
                    aria-expanded={esta}
                    onClick={() => setFaqAbierta(esta ? null : i)}
                    data-cursor=""
                    style={css(
                      'all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;align-items:center;gap:24px;padding:26px 0;font-size:clamp(20px,1.8vw,26px);font-weight:500;letter-spacing:-.015em;color:var(--ink)'
                    )}
                  >
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      style={css(
                        `flex:none;${ICONO}font-weight:300;font-size:30px;transform:rotate(${esta ? 45 : 0}deg);transition:transform .4s cubic-bezier(.2,.8,.2,1)`
                      )}
                    >
                      add
                    </span>
                  </button>
                  {esta && <p style={css('margin:0;padding:0 0 28px 0;font-size:17px;line-height:1.55;color:var(--soft);max-width:62ch')}>{f.a}</p>}
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="contacto"
          style={css(
            'padding:clamp(100px,16vh,180px) clamp(16px,3vw,44px) 80px;background:var(--ink);color:var(--bg);border-radius:clamp(18px,3vw,28px) clamp(18px,3vw,28px) 0 0'
          )}
        >
          <div style={css(`${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--imuted);margin-bottom:32px`)}>{t.ctLabel}</div>
          <h2 style={css('margin:0 0 72px;max-width:14ch;font-size:clamp(44px,8.4vw,164px);font-weight:700;font-stretch:80%;line-height:.86;letter-spacing:-.05em')}>
            {t.ctA} <span style={css(`${SERIF}font-weight:400;font-stretch:100%;color:var(--iaccent)`)}>{t.ctB}</span>
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:56px 80px;align-items:start')}>
            <div style={css('display:flex;flex-direction:column;gap:36px')}>
              <p style={css('margin:0;max-width:42ch;font-size:19px;line-height:1.5;color:var(--isoft)')}>{t.ctSub}</p>
              <div style={css('display:flex;align-items:center;gap:28px;flex-wrap:wrap')}>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener"
                  data-magnet=""
                  data-cursor="↗"
                  data-track="whatsapp"
                  style={css(
                    'flex:none;width:clamp(140px,38vw,180px);height:clamp(140px,38vw,180px);border-radius:50%;background:var(--bg);color:var(--ink);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:600'
                  )}
                >
                  WhatsApp ↗
                </a>
                <div style={css('display:flex;flex-direction:column;gap:8px;min-width:0')}>
                  <a
                    href={`mailto:${CONTACTO_EMAIL}`}
                    data-cursor=""
                    style={css(
                      'display:inline-flex;align-items:center;gap:10px;font-size:clamp(16px,1.6vw,22px);font-weight:500;overflow-wrap:anywhere;border-bottom:1px solid currentColor;padding-bottom:2px'
                    )}
                  >
                    <span aria-hidden="true" style={css(`${ICONO}font-weight:300;font-size:22px;flex:none;text-transform:none;letter-spacing:0;`)}>
                      mail
                    </span>
                    {CONTACTO_EMAIL}
                  </a>
                  <span style={css('font-size:15px;color:var(--imuted)')}>{t.ctNote}</span>
                </div>
              </div>
            </div>
            {envio !== 'enviado' ? (
              <form onSubmit={enviar} style={css('display:flex;flex-direction:column;gap:28px')}>
                <input type="hidden" name="_subject" value="Solicitud desde el sitio web" />
                <input type="hidden" name="idioma" value={idioma} />
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" style={css('display:none')} />
                <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:28px')}>
                  <input name="nombre" required minLength={2} autoComplete="name" placeholder={t.fName} aria-label={t.fName} style={css(campo)} />
                  <input name="email" type="email" required autoComplete="email" placeholder={t.fEmail} aria-label={t.fEmail} style={css(campo)} />
                </div>
                <div style={css('display:flex;flex-direction:column;gap:14px')}>
                  <span style={css(`${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--imuted)`)}>{t.fNeed}</span>
                  <div style={css('display:flex;flex-wrap:wrap;gap:8px')}>
                    {t.needs.map((l, i) => {
                      const elegida = necesidad === i;
                      return (
                        <button
                          key={i}
                          type="button"
                          aria-pressed={elegida}
                          onClick={() => setNecesidad(elegida ? null : i)}
                          data-cursor=""
                          style={css(
                            `all:unset;padding:10px 16px;border:1px solid var(--bg);border-radius:999px;font-size:15px;background:${elegida ? 'var(--bg)' : 'transparent'};color:${elegida ? 'var(--ink)' : 'var(--bg)'};transition:background .2s,color .2s`
                          )}
                        >
                          {l}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <textarea name="idea" placeholder={t.fMsg} aria-label={t.fMsg} rows={3} style={css(`${campo};resize:none`)} />
                <button
                  type="submit"
                  className="oj-send"
                  disabled={envio === 'enviando'}
                  data-cursor="↗"
                  style={css('all:unset;align-self:flex-start;padding:18px 28px;border-radius:999px;background:var(--bg);color:var(--ink);font-size:17px;font-weight:600')}
                >
                  {envio === 'enviando' ? t.fSending : t.fSend}
                </button>
                {envio === 'error' && (
                  <span role="alert" style={css('font-size:15px;color:var(--iaccent)')}>
                    {t.fError}
                  </span>
                )}
              </form>
            ) : (
              <div role="status" style={css('display:flex;flex-direction:column;gap:12px;padding:40px 0')}>
                <span style={css(`${SERIF}font-size:clamp(40px,4vw,64px);line-height:1;color:var(--iaccent)`)}>{t.sentT}</span>
                <span style={css('font-size:18px;color:var(--isoft)')}>{t.sentD}</span>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer style={css('background:var(--ink);color:var(--bg);padding:0 clamp(16px,3vw,44px) 28px;overflow:hidden')}>
        <div
          aria-hidden="true"
          style={css(
            'font-size:10.6vw;font-weight:800;font-stretch:75%;letter-spacing:-.05em;line-height:.8;white-space:nowrap;padding-top:40px;border-top:1px solid var(--iline)'
          )}
        >
          OJOS PUBLICITARIOS
        </div>
        <div
          style={css(
            `display:flex;justify-content:space-between;gap:16px 32px;flex-wrap:wrap;margin-top:32px;${MONO}font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--imuted)`
          )}
        >
          <span>© {ANIO} Ojos Publicitarios</span>
          <span>{t.footTag}</span>
          <div style={css('display:flex;gap:24px')}>
            {INSTAGRAM && (
              <a href={INSTAGRAM} target="_blank" rel="noopener" data-cursor="">
                Instagram
              </a>
            )}
            <a href={whatsappUrl()} target="_blank" rel="noopener" data-cursor="">
              WhatsApp
            </a>
            <a href="#top" data-cursor="">
              ↑ Top
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
