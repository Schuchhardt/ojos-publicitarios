import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    /** Meta description y bajada del listado. Entre 120 y 160 caracteres. */
    descripcion: z.string(),
    fecha: z.coerce.date(),
    actualizado: z.coerce.date().optional(),
    autor: z.string().default('Ojos Publicitarios'),
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
