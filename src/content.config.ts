import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const systemDesign = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/system-design" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.enum(['java', 'architecture', 'scalability'])),
    complexity: z.enum(['Easy', 'Medium', 'Hard']),
  }),
});

export const collections = {
  'system-design': systemDesign,
};
