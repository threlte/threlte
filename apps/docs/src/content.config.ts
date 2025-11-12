// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'
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

// 2. Define your collection(s)
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
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  testimonials: testimonialsCollection,
  showcase: showcaseCollection,
  blog: blogCollection,
  authors: authorsCollection
}
