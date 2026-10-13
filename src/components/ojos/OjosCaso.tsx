import { CASOS, rutaCaso, type Idioma } from '../../data/ojos';
import { Cursor, SelectorIdioma, css, useAncho, useAnimacion, useIdioma, useReveal, useTema } from './comun';

const MONO = "font-family:'JetBrains Mono',monospace;";
const SERIF = "font-family:'Instrument Serif',serif;font-style:italic;";
const REVEAL = (s = 1, y = 40) =>
  `opacity:0;transform:translateY(${y}px);transition:opacity ${s}s cubic-bezier(.2,.8,.2,1),transform ${s}s cubic-bezier(.2,.8,.2,1);`;
const PLACEHOLDER =
  `aspect-ratio:4/5;border-radius:10px;border:1px solid var(--line);background:repeating-linear-gradient(135deg,var(--ph1) 0 12px,var(--ph2) 12px 24px);display:flex;align-items:flex-end;padding:20px;${MONO}font-size:12px;color:var(--muted)`;

const TEXTOS: Record<Idioma, { back: string; cta: string; caseNo: string; next: string; nextCursor: string }> = {
  es: { back: '← Volver al estudio', cta: 'Hablemos ↗', caseNo: 'Caso', next: 'Siguiente proyecto', nextCursor: 'Siguiente' },
  en: { back: '← Back to studio', cta: "Let's talk ↗", caseNo: 'Case', next: 'Next project', nextCursor: 'Next' },
};

export default function OjosCaso({ slug, imagen }: { slug: string; imagen: string }) {
  const [idioma, setIdioma] = useIdioma();
  const [tema] = useTema();
  const { narrow, mid } = useAncho((w) => ({ narrow: w < 640, mid: w < 900 }), { narrow: false, mid: false });
  useReveal();

  useAnimacion(() => {
    const marco = document.querySelector('[data-parallax-wrap]');
    const img = document.querySelector<HTMLElement>('[data-parallax]');
    if (!marco || !img) return;
    const r = marco.getBoundingClientRect();
    const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
    img.style.transform = `translateY(${-8 + p * 8}%) scale(${1 + Math.abs(p) * 0.04})`;
  }, tema);

  const i = CASOS.findIndex((caso) => caso.slug === slug);
  const caso = CASOS[i];
  const siguiente = CASOS[(i + 1) % CASOS.length];
  const t = { ...TEXTOS[idioma], ...caso.copy[idioma] };
  const ctaPad = narrow ? '8px 12px' : '10px 16px';
  const featCols = mid ? 'minmax(0,1fr)' : 'minmax(64px,180px) minmax(0,1fr) minmax(0,1fr)';

  return (
    <>
      <Cursor />

      <header
        style={css(
          'position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:20px clamp(16px,3vw,44px);mix-blend-mode:difference;color:#f1ede6'
        )}
      >
        <a href="/ojos/" data-cursor="" aria-label={narrow ? t.back : undefined} style={css('display:flex;align-items:baseline;gap:12px;color:#f1ede6')}>
          <span style={css('font-weight:800;font-size:22px;letter-spacing:-0.03em;font-stretch:80%')}>OJOS®</span>
          <span style={css(`${MONO}font-size:11px;letter-spacing:.08em;text-transform:uppercase;opacity:.75`)}>{narrow ? '←' : t.back}</span>
        </a>
        <div style={css('display:flex;align-items:center;gap:18px')}>
          <SelectorIdioma idioma={idioma} elegir={setIdioma} />
          <a
            href="/ojos/#contacto"
            data-cursor=""
            style={css(
              `${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;padding:${ctaPad};border:1px solid #f1ede6;border-radius:999px;color:#f1ede6`
            )}
          >
            {t.cta}
          </a>
        </div>
      </header>

      <main>
        <section
          style={css(
            'min-height:88svh;display:flex;flex-direction:column;justify-content:flex-end;gap:clamp(28px,5vh,48px);padding:clamp(100px,14vh,140px) clamp(16px,3vw,44px) 56px'
          )}
        >
          <div style={css(`display:flex;gap:12px;flex-wrap:wrap;${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)`)}>
            <span>{`${t.caseNo} 0${i + 1}`}</span>
            <span style={css('color:var(--muted)')}>—</span>
            <span>{t.cat}</span>
          </div>
          <h1
            data-reveal=""
            style={css(`margin:0;font-size:clamp(52px,14.5vw,280px);font-weight:800;font-stretch:75%;letter-spacing:-.055em;line-height:.8;${REVEAL(1.2, 60)}`)}
          >
            {caso.title}
          </h1>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:40px 80px;align-items:end')}>
            <p style={css('margin:0;max-width:24ch;font-size:clamp(28px,3vw,48px);line-height:1.05;letter-spacing:-.03em')}>
              {t.introA} <span style={css(`${SERIF}color:var(--accent)`)}>{t.introB}</span>
            </p>
            <dl style={css('margin:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 32px')}>
              {t.meta.map((mt) => (
                <div key={mt.k} style={css('display:flex;flex-direction:column;gap:6px;padding-top:14px;border-top:1px solid var(--line)')}>
                  <dt style={css(`${MONO}font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)`)}>{mt.k}</dt>
                  <dd style={css('margin:0;font-size:17px')}>{mt.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section style={css('padding:0 clamp(16px,3vw,44px)')}>
          <div data-parallax-wrap="" style={css('border-radius:10px;overflow:hidden;aspect-ratio:var(--ar,16/9);min-height:260px;background:var(--card)')}>
            <img
              data-parallax=""
              src={imagen}
              alt={caso.title}
              style={css('width:100%;height:120%;object-fit:cover;display:block;will-change:transform')}
            />
          </div>
        </section>

        <section
          style={css(
            'padding:clamp(100px,16vh,200px) clamp(16px,3vw,44px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:64px 80px'
          )}
        >
          {t.blocks.map((b) => (
            <div key={b.k} data-reveal="" style={css(`display:flex;flex-direction:column;gap:20px;${REVEAL()}`)}>
              <span style={css(`${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)`)}>{b.k}</span>
              <h2 style={css('margin:0;font-size:clamp(34px,3.6vw,60px);font-weight:600;line-height:.98;letter-spacing:-.035em;text-wrap:balance')}>{b.t}</h2>
              <p style={css('margin:0;max-width:50ch;font-size:18px;line-height:1.55;color:var(--soft)')}>{b.d}</p>
            </div>
          ))}
        </section>

        <section style={css('border-top:1px solid var(--line)')}>
          {t.features.map((ft, j) => (
            <div
              key={j}
              data-reveal=""
              style={css(
                `display:grid;grid-template-columns:${featCols};gap:12px 48px;align-items:baseline;padding:clamp(32px,4vw,56px) clamp(16px,3vw,44px);border-bottom:1px solid var(--line);${REVEAL()}`
              )}
            >
              <span style={css(`${SERIF}font-size:clamp(48px,5vw,88px);line-height:.8;color:var(--accent)`)}>{'0' + (j + 1)}</span>
              <h3 style={css('margin:0;font-size:clamp(28px,3vw,52px);font-weight:600;letter-spacing:-.035em;line-height:1')}>{ft.t}</h3>
              <p style={css('margin:0;font-size:17px;line-height:1.5;color:var(--soft);max-width:44ch')}>{ft.d}</p>
            </div>
          ))}
        </section>

        <section
          style={css(
            'padding:clamp(80px,12vh,140px) clamp(16px,3vw,44px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:20px'
          )}
        >
          {t.ph.map((texto) => (
            <div key={texto} style={css(PLACEHOLDER)}>
              {texto}
            </div>
          ))}
        </section>

        <section style={css('padding:0 clamp(16px,3vw,44px) clamp(100px,14vh,160px);display:flex;justify-content:center')}>
          <a
            href={caso.visit.href}
            target="_blank"
            rel="noopener"
            data-cursor="↗"
            style={css(
              'display:flex;align-items:center;gap:24px;font-size:clamp(32px,6vw,110px);font-weight:700;font-stretch:78%;letter-spacing:-.045em;overflow-wrap:anywhere;border-bottom:2px solid currentColor;padding-bottom:8px'
            )}
          >
            {caso.visit.label} <span style={css('font-weight:300')}>↗</span>
          </a>
        </section>
      </main>

      <a
        href={rutaCaso(siguiente.slug)}
        data-cursor={t.nextCursor}
        style={css(
          'display:block;background:var(--ink);color:var(--bg);border-radius:clamp(18px,3vw,28px) clamp(18px,3vw,28px) 0 0;padding:clamp(64px,10vh,120px) clamp(16px,3vw,44px);overflow:hidden'
        )}
      >
        <span style={css(`display:block;${MONO}font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--imuted);margin-bottom:24px`)}>{t.next}</span>
        <span style={css('display:block;font-size:clamp(56px,12vw,240px);font-weight:800;font-stretch:75%;letter-spacing:-.055em;line-height:.85;text-wrap:balance')}>
          {siguiente.title} →
        </span>
      </a>
    </>
  );
}
