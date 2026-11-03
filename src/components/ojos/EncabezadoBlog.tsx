import { HOME_OJOS, type Idioma } from '../../data/ojos';
import { RUTA_HOME } from '../../data/home';
import { Cursor, useAncho, useAnimacion, useTema } from './comun';
import { Encabezado } from './secciones';

// Header del landing para las páginas del blog, que no son React: el idioma
// lo fija la URL, así que cambiarlo lleva a la misma nota en el otro idioma.

export default function EncabezadoBlog({
  idioma,
  alternos,
}: {
  idioma: Idioma;
  alternos: Partial<Record<Idioma, string>>;
}) {
  const [tema] = useTema();
  const { wide, narrow } = useAncho((w) => ({ wide: w > 900, narrow: w < 640 }), { wide: true, narrow: false });
  // Sin escena que animar: el bucle solo mueve el cursor propio.
  useAnimacion(() => {}, tema);

  const home = RUTA_HOME[idioma];
  const ancla = (h: string) => (home.includes('?') ? `${home}${h}` : `/${h}`);
  const nav = [...HOME_OJOS[idioma].nav.map((n) => ({ ...n, h: ancla(n.h) })), { l: 'Blog', h: '#top', actual: true }];

  const elegir = (nuevo: Idioma) => {
    if (nuevo === idioma) return;
    try {
      localStorage.setItem('ojos_lang', nuevo);
    } catch {
      // Sin almacenamiento: igual se navega.
    }
    location.href = alternos[nuevo] ?? RUTA_HOME[nuevo];
  };

  return (
    <>
      <Cursor />
      <Encabezado idioma={idioma} elegir={elegir} nav={nav} inicio={home} contacto={ancla('#contacto')} narrow={narrow} wide={wide} />
    </>
  );
}
