// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'

// 2. Define your collection(s)
export const referenceCollection = defineCollection({
  schema: z.object({
    type: z.enum(['component', 'hook']),
    name: z.string(),
    sourcePath: z.string(),
    package: z.enum(['core', 'preprocess', 'extras', 'rapier', 'theatre'])
  })
})

export const learnCollection = defineCollection({
  schema: z.object({
    category: z.enum(['start-here', 't', 'preprocessing']),
    title: z.string()
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

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  reference: referenceCollection,
  learn: learnCollection,
  testimonials: testimonialsCollection
}
