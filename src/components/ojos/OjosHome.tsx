import { useState } from 'react';
import { CASOS, HOME_OJOS, rutaCaso, rutaServicio, type Imagenes } from '../../data/ojos';
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

const ICONOS_SERVICIO = ['web', 'terminal', 'campaign'];
const ICONOS_AUTO = ['chat', 'notifications_active', 'contacts', 'calendar_month', 'inventory_2', 'autorenew', 'edit_note'];

export default function OjosHome({ imagenes }: { imagenes: Imagenes }) {
  const [idioma, setIdioma] = useIdioma();
  const [tema, setTema] = useTema();
  const [abierto, setAbierto] = useState<number | null>(null);
  const [encima, setEncima] = useState(-1);
  const { wide, twoCol, narrow, coarse } = useAncho(
    (w) => ({ wide: w > 900, twoCol: w >= 1080, narrow: w < 640, coarse: matchMedia('(pointer: coarse)').matches }),
    { wide: true, twoCol: false, narrow: false, coarse: false }
  );
  const t = HOME_OJOS[idioma];
  useReveal();
  useEscena(tema, coarse);

  const cambiarTema = () => {
    const nuevo = siguienteTema(tema);
    setTema(nuevo);
    pintarCursor('dropper', nuevo);
  };

  const proyectos = CASOS.map((caso) => ({ ...caso, ...caso.copy[idioma] }));
  const stickyPos = twoCol ? 'sticky' : 'relative';
  const svcCols = narrow ? 'minmax(0,1fr) auto' : 'minmax(48px,140px) minmax(0,1fr) auto';
  const floatOp = encima >= 0 && abierto !== encima && !coarse && wide ? 1 : 0;
  const floatImg = imagenes[t.services[Math.max(0, encima)].img];

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

      <Encabezado idioma={idioma} elegir={setIdioma} nav={t.nav} inicio="#top" contacto="#contacto" narrow={narrow} wide={wide} />

      <main>
        <section
          id="top"
          style={css(
            'position:relative;min-height:100svh;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(28px,5vh,40px);padding:clamp(84px,12vh,104px) clamp(16px,3vw,44px) 32px;overflow:hidden'
          )}
        >
          <DatosHero idioma={idioma} />

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

        <Cinta items={t.marquee} />

        <Manifiesto label={t.manLabel} texto={t.manifesto} clave={idioma} />

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
                  <div
                    hidden={!esta}
                    style={css(
                      `padding:8px clamp(16px,3vw,44px) clamp(48px,6vw,88px);display:${esta ? 'grid' : 'none'};grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:48px 64px`
                    )}
                  >
                    <div style={css('display:flex;flex-direction:column;gap:32px')}>
                      <p style={css('margin:0;font-size:clamp(22px,2vw,30px);line-height:1.25;letter-spacing:-.015em;text-wrap:pretty')}>{s.lead}</p>
                      <div style={css('border-radius:6px;overflow:hidden;aspect-ratio:16/10;background:var(--card)')}>
                        <img src={imagenes[s.img]} alt={s.title} loading="lazy" style={css('width:100%;height:100%;object-fit:cover;display:block')} />
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
                      <div style={css('display:flex;flex-wrap:wrap;align-items:baseline;gap:16px 32px;margin-top:24px')}>
                        <a
                          href="#contacto"
                          data-cursor=""
                          style={css('font-size:18px;font-weight:600;border-bottom:1px solid currentColor;padding-bottom:4px')}
                        >
                          {s.cta}
                        </a>
                        <a href={rutaServicio(s.slug)} data-cursor="" style={css(`${MONO}font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--accent)`)}>
                          {s.more}
                        </a>
                      </div>
                    </div>
                  </div>
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
          <div style={css(`position:${stickyPos};top:${twoCol ? '120px' : 'auto'};display:flex;flex-direction:column;gap:28px`)}>
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

        <Cifras stats={t.stats} />

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

        <Proceso label={t.procLabel} titulo={t.procTitle} sub={t.procSub} steps={t.steps} sticky={twoCol} />

        <Preguntas label={t.faqLabel} titulo={t.faqTitle} faq={t.faq} />

        <Contacto idioma={idioma} />
      </main>

      <Pie idioma={idioma} />
    </>
  );
}
