import { defineCollection, z } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

const testimonialsCollection = defineCollection({
  schema: z.object({
    schemaType: z.string().default("testimonials"),
    image: z.string(),
    name: z.string(),
    title: z.string(),
    link: z.string(),
    contents: z.string(),
  }),
});

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  i18n: defineCollection({ type: "data", schema: i18nSchema() }),
  testimonials: testimonialsCollection,
};
