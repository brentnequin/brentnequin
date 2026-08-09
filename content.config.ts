import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        draft: z.boolean().optional(),
        url: z.string().optional(),
        featured: z.boolean().optional(),
        order: z.number().optional(),
        status: z.string().optional(),
        technologies: z.array(z.string()),
      }),
    })
  }
})