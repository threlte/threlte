// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'

// 2. Define your collection(s)
export const referenceCollection = defineCollection({
  schema: z.object({
    type: z.enum(['component', 'hook', 'plugin']).optional(),
    name: z.string(),
    sourcePath: z.string().optional(),
    order: z.number().optional(),
    category: z.enum([
      '@threlte/core',
      '@threlte/extras',
      '@threlte/rapier',
      '@threlte/theatre',
      '@threlte/gltf',
      'Documentation'
    ])
  })
})

export const learnCollection = defineCollection({
  schema: z.object({
    category: z.enum([
      'Getting Started',
      'Basics',
      'Render Components',
      'Advanced',
      'Preprocessing'
    ]),
    title: z.string(),
    order: z.number().optional()
  })
})

export const testimonialsCollection = defineCollection({
  schema: z.object({
    image: z.string(),
    name: z.string(),
    title: z.string(),
    link: z.string(),
    contents: z.string()
  })
})

export const showcaseCollection = defineCollection({
  schema: z.object({
    image: z.string(),
    name: z.string(),
    live: z.string().optional(),
    repo: z.string().optional(),
    description: z.string().optional(),
    size: z.enum(['regular', 'large'])
  })
})

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  reference: referenceCollection,
  learn: learnCollection,
  testimonials: testimonialsCollection,
  showcase: showcaseCollection
}
