// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'

export const componentSignature = z.object({
  pretext: z.string().optional(),
  extends: z
    .object({
      type: z.string(),
      url: z.string().optional()
    })
    .optional(),
  props: z
    .array(
      z.object({
        name: z.string(),
        type: z.string().or(
          z.object({
            name: z.string(),
            url: z.string()
          })
        ),
        required: z.boolean(),
        default: z.string().optional(),
        description: z.string().optional()
      })
    )
    .optional(),
  events: z
    .array(
      z.object({
        name: z.string(),
        payload: z.string().or(
          z.object({
            name: z.string(),
            url: z.string()
          })
        ),
        description: z.string().optional()
      })
    )
    .optional(),
  bindings: z
    .array(
      z.object({
        name: z.string(),
        type: z.string().or(
          z.object({
            name: z.string(),
            url: z.string()
          })
        )
      })
    )
    .optional()
})

export const referenceCategories = [
  '@threlte/core',
  '@threlte/extras',
  '@threlte/rapier',
  '@threlte/theatre',
  '@threlte/gltf',
  'Documentation'
] as const

// 2. Define your collection(s)
export const referenceCollection = defineCollection({
  schema: z.object({
    type: z.enum(['component', 'hook', 'plugin']).optional(),
    name: z.string(),
    sourcePath: z.string().optional(),
    order: z.number().optional(),
    isDivider: z.boolean().optional(),
    category: z.enum(referenceCategories),
    componentSignature: componentSignature.optional(),
    showInSidebar: z.boolean().optional().default(true)
  })
})

export const learnCollection = defineCollection({
  schema: z.object({
    category: z.enum(['Getting Started', 'Basics', 'Advanced', 'Preprocessing']),
    isDivider: z.boolean().optional(),
    title: z.string(),
    order: z.number().optional(),
    showInSidebar: z.boolean().optional().default(true)
  })
})

export const examplesCollection = defineCollection({
  schema: z.object({
    category: z.enum(['Animation', 'Camera', 'Geometry', 'Shaders', 'Postprocessing']).optional(),
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
  showcase: showcaseCollection,
  examples: examplesCollection
}
