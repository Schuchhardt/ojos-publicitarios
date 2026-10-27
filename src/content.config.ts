import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Las notas en español van en src/content/blog/ y las en inglés en
// src/content/blog/en/. Las que genera el blog automático traen las dos.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      /** Meta description y bajada del listado. Entre 120 y 160 caracteres. */
      descripcion: z.string(),
      fecha: z.coerce.date(),
      actualizado: z.coerce.date().optional(),
      autor: z.string().default('Ojos Publicitarios'),
      idioma: z.enum(['es', 'en']).default('es'),
      /** Une la versión en español con la en inglés: las dos llevan la misma. */
      clave: z.string().optional(),
      /** Búsqueda a la que apunta la nota. El generador no repite las ya usadas. */
      keyword: z.string().optional(),
      /** Portada: ruta relativa al .md, dentro de src/assets/blog/. */
      imagen: image().optional(),
      imagenAlt: z.string().optional(),
      /** Respuesta directa a la pregunta del título, en 2 o 3 líneas.
       *  Va destacada al principio: es lo que cita un buscador con IA. */
      respuestaCorta: z.string(),
      tags: z.array(z.string()).default([]),
      /** Preguntas frecuentes del artículo; alimentan el bloque y el FAQPage. */
      faq: z
        .array(z.object({ pregunta: z.string(), respuesta: z.string() }))
        .default([]),
    }),
});

export const collections = { blog };
