import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Idioma } from '../../data/ojos';

// Piezas compartidas por el home y los casos: estilos en línea, idioma,
// paleta, cursor propio y aparición al hacer scroll.

export type Tema = 'dark' | 'blue';
export interface Punto {
  x: number;
  y: number;
}

const cache = new Map<string, CSSProperties>();

/**
 * Convierte una declaración CSS en el objeto `style` de React. Así los estilos
 * quedan escritos igual que en el diseño y se pueden comparar línea a línea.
 */
export function css(texto: string): CSSProperties {
  const guardado = cache.get(texto);
  if (guardado) return guardado;
  const estilo: Record<string, string> = {};
  for (const declaracion of texto.split(';')) {
    const i = declaracion.indexOf(':');
    if (i < 0) continue;
    const prop = declaracion.slice(0, i).trim();
    if (!prop) continue;
    const clave = prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, letra: string) => letra.toUpperCase());
    estilo[clave] = declaracion.slice(i + 1).trim();
  }
  cache.set(texto, estilo);
  return estilo;
}

/** Estilo base de un ícono de Material Symbols. */
export const ICONO =
  "font-family:'Material Symbols Outlined';font-feature-settings:'liga';line-height:1;";

function leer(clave: string): string | null {
  try {
    return localStorage.getItem(clave);
  } catch {
    return null;
  }
}

function guardar(clave: string, valor: string) {
  try {
    localStorage.setItem(clave, valor);
  } catch {
    // Sin almacenamiento (modo privado): la elección dura lo que dura la visita.
  }
}

/**
 * Idioma, compartido entre el home y los casos. Manda `?lang=` (al que llegan
 * los enlaces viejos a /en/), después lo elegido a mano y, si no, el navegador.
 */
export function useIdioma(): [Idioma, (idioma: Idioma) => void] {
  const [idioma, setIdioma] = useState<Idioma>('es');
  useEffect(() => {
    const pedido = new URLSearchParams(location.search).get('lang');
    if (pedido === 'es' || pedido === 'en') {
      setIdioma(pedido);
      guardar('ojos_lang', pedido);
      return;
    }
    const guardado = leer('ojos_lang');
    if (guardado === 'es' || guardado === 'en') {
      setIdioma(guardado);
      return;
    }
    const idiomas = navigator.languages?.length ? navigator.languages : [navigator.language];
    if (!idiomas.some((i) => i.toLowerCase().startsWith('es'))) setIdioma('en');
  }, []);
  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);
  const elegir = (nuevo: Idioma) => {
    setIdioma(nuevo);
    guardar('ojos_lang', nuevo);
  };
  return [idioma, elegir];
}

/** Paleta (oscura o azul). El layout la aplica antes del primer pintado. */
export function useTema(): [Tema, (tema: Tema) => void] {
  const [tema, setTema] = useState<Tema>('dark');
  useEffect(() => {
    if (leer('ojos_theme') === 'blue') setTema('blue');
  }, []);
  const elegir = (nuevo: Tema) => {
    setTema(nuevo);
    document.documentElement.setAttribute('data-theme', nuevo);
    guardar('ojos_theme', nuevo);
  };
  return [tema, elegir];
}

/** Hace aparecer los [data-reveal] al entrar en pantalla, también los nuevos. */
export function useReveal() {
  const io = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    io.current = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          const el = entrada.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.setAttribute('data-shown', '');
          io.current?.unobserve(el);
        }),
      { threshold: 0.1 }
    );
    return () => io.current?.disconnect();
  }, []);
  useEffect(() => {
    document
      .querySelectorAll('[data-reveal]:not([data-shown])')
      .forEach((el) => io.current?.observe(el));
  });
}

/** Cambia el tamaño y el rótulo del cursor según el [data-cursor] que pisa. */
export function pintarCursor(rotulo: string | null, tema: Tema) {
  const c = document.querySelector<HTMLElement>('[data-cursor-el]');
  const lb = document.querySelector<HTMLElement>('[data-cursor-label]');
  if (!c || !lb) return;
  if (rotulo === 'dropper') {
    c.style.width = c.style.height = '72px';
    c.style.mixBlendMode = 'normal';
    c.style.background = tema === 'dark' ? 'oklch(0.52 0.23 263)' : 'oklch(0.7 0.19 40)';
    Object.assign(lb.style, {
      fontFamily: "'Material Symbols Outlined'",
      fontSize: '34px',
      textTransform: 'none',
      letterSpacing: '0',
      color: '#ffffff',
      fontFeatureSettings: "'liga'",
    });
    lb.textContent = 'colorize';
    return;
  }
  Object.assign(lb.style, {
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '.06em',
    color: '#0e0d0c',
  });
  if (!rotulo) {
    c.style.width = c.style.height = rotulo === '' ? '44px' : '14px';
    c.style.background = '#f1ede6';
    c.style.mixBlendMode = 'difference';
    lb.textContent = '';
  } else {
    c.style.width = c.style.height = '96px';
    c.style.background = 'var(--accent)';
    c.style.mixBlendMode = 'normal';
    lb.textContent = rotulo;
  }
}

/**
 * Cursor propio y bucle de animación por cuadro. `cuadro` recibe la posición
 * del mouse y corre en cada requestAnimationFrame.
 */
export function useAnimacion(cuadro: (mouse: Punto) => void, tema: Tema, alturaInicial = 1 / 2) {
  const cuadroRef = useRef(cuadro);
  cuadroRef.current = cuadro;
  const temaRef = useRef(tema);
  temaRef.current = tema;

  useEffect(() => {
    const m: Punto = { x: innerWidth / 2, y: innerHeight * alturaInicial };
    const c: Punto = { ...m };
    const cursor = document.querySelector<HTMLElement>('[data-cursor-el]');
    if (matchMedia('(pointer: coarse)').matches && cursor) cursor.style.display = 'none';

    const alMover = (e: MouseEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
    };
    const alPasar = (e: MouseEvent) => {
      const t = e.target instanceof Element ? e.target.closest('[data-cursor]') : null;
      pintarCursor(t ? t.getAttribute('data-cursor') : null, temaRef.current);
    };
    addEventListener('mousemove', alMover);
    document.addEventListener('mouseover', alPasar);

    let raf = 0;
    const tick = () => {
      c.x += (m.x - c.x) * 0.22;
      c.y += (m.y - c.y) * 0.22;
      if (cursor) cursor.style.transform = `translate(${c.x}px,${c.y}px) translate(-50%,-50%)`;
      cuadroRef.current(m);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('mousemove', alMover);
      document.removeEventListener('mouseover', alPasar);
    };
  }, []);
}

/** Ancho de la ventana por tramos, para los cambios de grilla del diseño. */
export function useAncho<T>(medir: (ancho: number) => T, inicial: T): T {
  const [valor, setValor] = useState<T>(inicial);
  const medirRef = useRef(medir);
  medirRef.current = medir;
  useEffect(() => {
    const alCambiar = () => setValor(medirRef.current(innerWidth));
    alCambiar();
    addEventListener('resize', alCambiar);
    return () => removeEventListener('resize', alCambiar);
  }, []);
  return valor;
}

export function Cursor() {
  return (
    <div
      data-cursor-el=""
      aria-hidden="true"
      style={css(
        'position:fixed;left:0;top:0;width:14px;height:14px;border-radius:50%;background:#f1ede6;mix-blend-mode:difference;pointer-events:none;z-index:1000;display:flex;align-items:center;justify-content:center;transition:width .35s cubic-bezier(.2,.8,.2,1),height .35s cubic-bezier(.2,.8,.2,1),background .25s;will-change:transform'
      )}
    >
      <span
        data-cursor-label=""
        style={css(
          "font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#0e0d0c;white-space:nowrap"
        )}
      />
    </div>
  );
}

/** Selector ES / EN del header. */
export function SelectorIdioma({ idioma, elegir }: { idioma: Idioma; elegir: (i: Idioma) => void }) {
  const boton = (codigo: Idioma) => (
    <button
      type="button"
      onClick={() => elegir(codigo)}
      data-cursor=""
      aria-pressed={idioma === codigo}
      style={css(`all:unset;color:#f1ede6;opacity:${idioma === codigo ? 1 : 0.45};transition:opacity .2s`)}
    >
      {codigo.toUpperCase()}
    </button>
  );
  return (
    <div style={css("display:flex;gap:8px;font-family:'JetBrains Mono',monospace;font-size:12px")}>
      {boton('es')}
      <span style={css('opacity:.4')}>/</span>
      {boton('en')}
    </div>
  );
}
