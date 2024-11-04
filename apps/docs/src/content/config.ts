import { defineCollection, z } from 'astro:content'
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema'

const testimonialsCollection = defineCollection({
	schema: z.object({
		schemaType: z.string().default('testimonials'),
		image: z.string(),
		name: z.string(),
		title: z.string(),
		link: z.string(),
		contents: z.string()
	})
})

export const componentSignature = z
	.object({
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
		exports: z.array(
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
	.optional()

export const collections = {
	docs: defineCollection({
		schema: docsSchema({
			extend: z.object({
				componentSignature: componentSignature
			})
		})
	}),
	i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
	testimonials: testimonialsCollection
}
