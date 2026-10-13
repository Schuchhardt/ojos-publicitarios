import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { ARCHIVOS_IMAGEN, type ClaveImagen } from '../data/ojos';

// Las capturas viven en src/assets para que Astro las optimice; el contenido
// solo guarda el nombre del archivo.
const archivos = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/**/*.{png,jpg,jpeg,webp,avif}'
);

export async function cargarImagen(nombre?: string): Promise<ImageMetadata | undefined> {
  if (!nombre) return undefined;
  const cargar = archivos[`../assets/${nombre}`];
  return cargar ? (await cargar()).default : undefined;
}

/** URLs en WebP de las imágenes de /ojos, ya optimizadas por Astro. */
export async function imagenesOjos(): Promise<Record<ClaveImagen, string>> {
  const pares = await Promise.all(
    (Object.entries(ARCHIVOS_IMAGEN) as [ClaveImagen, string][]).map(async ([clave, archivo]) => {
      const original = await cargarImagen(archivo);
      if (!original) throw new Error(`Falta la imagen ${archivo}`);
      const optimizada = await getImage({ src: original, format: 'webp', width: Math.min(original.width, 1600) });
      return [clave, optimizada.src] as const;
    })
  );
  return Object.fromEntries(pares) as Record<ClaveImagen, string>;
}
