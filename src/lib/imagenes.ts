import type { ImageMetadata } from 'astro';

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
