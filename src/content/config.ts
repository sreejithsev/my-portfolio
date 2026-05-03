import { defineCollection, z } from 'astro:content';

const systemDesign = defineCollection({
  type: 'content',
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
