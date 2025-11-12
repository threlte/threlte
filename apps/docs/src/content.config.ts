// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

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
  exports: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        type: z.string()
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
  '@threlte/xr',
  '@threlte/flex',
  '@threlte/studio',
  'Documentation'
] as const

// 2. Define your collection(s)
export const referenceCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reference' }),
  schema: z.object({
    schemaType: z.string().default('reference'),
    type: z.enum(['component', 'hook', 'plugin']).optional(),
    title: z.string(),
    /**
     * Path to the source file or directory, relative to the root of the repository.
     */
    sourcePath: z.string().optional(),
    order: z.number().optional(),
    isDivider: z.boolean().optional(),
    category: z.enum(referenceCategories),
    componentSignature: componentSignature.optional(),
    showInSidebar: z.boolean().optional().default(true)
  })
})

export const learnCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/learn' }),
  schema: z.object({
    schemaType: z.string().default('learn'),
    category: z.enum(['Getting Started', 'Basics', 'Advanced', 'More', 'Preprocessing']),
    isDivider: z.boolean().optional(),
    title: z.string(),
    order: z.number().optional(),
    showInSidebar: z.boolean().optional().default(true)
  })
})

export const examplesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/examples' }),
  schema: z.object({
    schemaType: z.string().default('examples'),
    order: z.number().optional()
  })
})

export const testimonialsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/testimonials' }),
  schema: z.object({
    schemaType: z.string().default('testimonials'),
    image: z.string(),
    name: z.string(),
    title: z.string(),
    link: z.string(),
    contents: z.string()
  })
})

export const showcaseCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/showcase' }),
  schema: z.object({
    schemaType: z.string().default('showcase'),
    image: z.string(),
    name: z.string(),
    live: z.string().optional(),
    repo: z.string().optional(),
    description: z.string().optional(),
    size: z.enum(['regular', 'large'])
  })
})

export const authorsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
  schema: z.object({
    schemaType: z.string().default('authors'),
    name: z.string(),
    url: z.string()
  })
})

export const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    schemaType: z.string().default('blog'),
    author: z.string(),
    date: z.string(),
    image: z.string(),
    title: z.string(),
    subtitle: z.string()
  })
})

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  reference: referenceCollection,
  learn: learnCollection,
  testimonials: testimonialsCollection,
  showcase: showcaseCollection,
  examples: examplesCollection,
  blog: blogCollection,
  authors: authorsCollection
}
