import { defineConfig, defineCollection, s } from "velite";

const sharedSchema = {
  title: s.string().max(120),
  summary: s.string().max(400),
  tags: s.array(s.string()).default([]),
  pipeline: s.array(s.string()).default([]),
  methods: s.string(),
  limitations: s.string(),
  published: s.boolean().default(true),
  order: s.number().default(0),
  metadata: s.metadata(),
  content: s.mdx(),
};

const research = defineCollection({
  name: "Research",
  pattern: "research/**/*.mdx",
  schema: s
    .object({
      ...sharedSchema,
      category: s.literal("research").default("research"),
      slug: s.path(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/research/${data.slug.split("/").pop()}`,
    })),
});

const work = defineCollection({
  name: "Work",
  pattern: "work/**/*.mdx",
  schema: s
    .object({
      ...sharedSchema,
      category: s.literal("work").default("work"),
      slug: s.path(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/work/${data.slug.split("/").pop()}`,
    })),
});

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { research, work },
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
