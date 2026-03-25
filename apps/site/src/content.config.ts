import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    date: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    detail: z
      .object({
        heroImage: z.string().optional(),
        features: z
          .array(
            z.object({
              title: z.string(),
              desc: z.string(),
            }),
          )
          .optional(),
        techStack: z.array(z.string()).optional(),
        appStoreUrl: z.string().optional(),
        lpUrl: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { projects };
