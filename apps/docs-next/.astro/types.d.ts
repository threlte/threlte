declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}
declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	export const image: () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodString;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	const entryMap: {
		"learn": {
"advanced/custom-abstractions.mdx": {
  id: "advanced/custom-abstractions.mdx",
  slug: "advanced/custom-abstractions",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"advanced/migration-guide.mdx": {
  id: "advanced/migration-guide.mdx",
  slug: "advanced/migration-guide",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"advanced/plugins.mdx": {
  id: "advanced/plugins.mdx",
  slug: "advanced/plugins",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"basics/context.mdx": {
  id: "basics/context.mdx",
  slug: "basics/context",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"basics/disposal.mdx": {
  id: "basics/disposal.mdx",
  slug: "basics/disposal",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"basics/events.mdx": {
  id: "basics/events.mdx",
  slug: "basics/events",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"basics/hooks.mdx": {
  id: "basics/hooks.mdx",
  slug: "basics/hooks",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"basics/loading-assets.mdx": {
  id: "basics/loading-assets.mdx",
  slug: "basics/loading-assets",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"examples/animation/transitions.mdx": {
  id: "examples/animation/transitions.mdx",
  slug: "examples/animation/transitions",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"examples/camera/pointer-lock-controls.mdx": {
  id: "examples/camera/pointer-lock-controls.mdx",
  slug: "examples/camera/pointer-lock-controls",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"examples/camera/third-person.mdx": {
  id: "examples/camera/third-person.mdx",
  slug: "examples/camera/third-person",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"examples/geometry/terrain-physics.mdx": {
  id: "examples/geometry/terrain-physics.mdx",
  slug: "examples/geometry/terrain-physics",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"examples/geometry/terrain.mdx": {
  id: "examples/geometry/terrain.mdx",
  slug: "examples/geometry/terrain",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"examples/index.mdx": {
  id: "examples/index.mdx",
  slug: "examples",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"examples/postprocessing/outline.mdx": {
  id: "examples/postprocessing/outline.mdx",
  slug: "examples/postprocessing/outline",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"examples/template.md": {
  id: "examples/template.md",
  slug: "examples/template",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".md"] },
"getting-started/installation.mdx": {
  id: "getting-started/installation.mdx",
  slug: "getting-started/installation",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"getting-started/introduction.mdx": {
  id: "getting-started/introduction.mdx",
  slug: "getting-started/introduction",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
"getting-started/your-first-scene.mdx": {
  id: "getting-started/your-first-scene.mdx",
  slug: "getting-started/your-first-scene",
  body: string,
  collection: "learn",
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] },
},
"reference": {
"core/canvas.mdx": {
  id: "core/canvas.mdx",
  slug: "core/canvas",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/components.mdx": {
  id: "core/components.mdx",
  slug: "core/components",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/getting-started.mdx": {
  id: "core/getting-started.mdx",
  slug: "core/getting-started",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/helpers.mdx": {
  id: "core/helpers.mdx",
  slug: "core/helpers",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/hierarchical-object.mdx": {
  id: "core/hierarchical-object.mdx",
  slug: "core/hierarchical-object",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/hooks.mdx": {
  id: "core/hooks.mdx",
  slug: "core/hooks",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/plugins.mdx": {
  id: "core/plugins.mdx",
  slug: "core/plugins",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/scene-graph-object.mdx": {
  id: "core/scene-graph-object.mdx",
  slug: "core/scene-graph-object",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/t.mdx": {
  id: "core/t.mdx",
  slug: "core/t",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/trait-components.mdx": {
  id: "core/trait-components.mdx",
  slug: "core/trait-components",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/use-frame.mdx": {
  id: "core/use-frame.mdx",
  slug: "core/use-frame",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/use-loader.mdx": {
  id: "core/use-loader.mdx",
  slug: "core/use-loader",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/use-render.mdx": {
  id: "core/use-render.mdx",
  slug: "core/use-render",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/use-threlte-user-context.mdx": {
  id: "core/use-threlte-user-context.mdx",
  slug: "core/use-threlte-user-context",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/use-threlte.mdx": {
  id: "core/use-threlte.mdx",
  slug: "core/use-threlte",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"core/utilities.mdx": {
  id: "core/utilities.mdx",
  slug: "core/utilities",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"docs/docs.mdx": {
  id: "docs/docs.mdx",
  slug: "docs/docs",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/audio-listener.mdx": {
  id: "extras/audio-listener.mdx",
  slug: "extras/audio-listener",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/audio.mdx": {
  id: "extras/audio.mdx",
  slug: "extras/audio",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/components.mdx": {
  id: "extras/components.mdx",
  slug: "extras/components",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/contact-shadows.mdx": {
  id: "extras/contact-shadows.mdx",
  slug: "extras/contact-shadows",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/edges.mdx": {
  id: "extras/edges.mdx",
  slug: "extras/edges",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/environment.mdx": {
  id: "extras/environment.mdx",
  slug: "extras/environment",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/float.mdx": {
  id: "extras/float.mdx",
  slug: "extras/float",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/getting-started.mdx": {
  id: "extras/getting-started.mdx",
  slug: "extras/getting-started",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/gltf.mdx": {
  id: "extras/gltf.mdx",
  slug: "extras/gltf",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/grid.mdx": {
  id: "extras/grid.mdx",
  slug: "extras/grid",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/hooks.mdx": {
  id: "extras/hooks.mdx",
  slug: "extras/hooks",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/html.mdx": {
  id: "extras/html.mdx",
  slug: "extras/html",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/instance.mdx": {
  id: "extras/instance.mdx",
  slug: "extras/instance",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/instanced-mesh.mdx": {
  id: "extras/instanced-mesh.mdx",
  slug: "extras/instanced-mesh",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/instanced-meshes.mdx": {
  id: "extras/instanced-meshes.mdx",
  slug: "extras/instanced-meshes",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/interactivity.mdx": {
  id: "extras/interactivity.mdx",
  slug: "extras/interactivity",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/layers.mdx": {
  id: "extras/layers.mdx",
  slug: "extras/layers",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/lifecycle.mdx": {
  id: "extras/lifecycle.mdx",
  slug: "extras/lifecycle",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/onReveal.mdx": {
  id: "extras/onReveal.mdx",
  slug: "extras/onreveal",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/onSuspend.mdx": {
  id: "extras/onSuspend.mdx",
  slug: "extras/onsuspend",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/orbit-controls.mdx": {
  id: "extras/orbit-controls.mdx",
  slug: "extras/orbit-controls",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/plugins.mdx": {
  id: "extras/plugins.mdx",
  slug: "extras/plugins",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/portal-target.mdx": {
  id: "extras/portal-target.mdx",
  slug: "extras/portal-target",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/portal.mdx": {
  id: "extras/portal.mdx",
  slug: "extras/portal",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/positional-audio.mdx": {
  id: "extras/positional-audio.mdx",
  slug: "extras/positional-audio",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/suspense.mdx": {
  id: "extras/suspense.mdx",
  slug: "extras/suspense",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/text.mdx": {
  id: "extras/text.mdx",
  slug: "extras/text",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/transform-controls.mdx": {
  id: "extras/transform-controls.mdx",
  slug: "extras/transform-controls",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/transitions.mdx": {
  id: "extras/transitions.mdx",
  slug: "extras/transitions",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/use-audio-listener.mdx": {
  id: "extras/use-audio-listener.mdx",
  slug: "extras/use-audio-listener",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/use-cursor.mdx": {
  id: "extras/use-cursor.mdx",
  slug: "extras/use-cursor",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/use-gltf-animations.mdx": {
  id: "extras/use-gltf-animations.mdx",
  slug: "extras/use-gltf-animations",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/use-gltf.mdx": {
  id: "extras/use-gltf.mdx",
  slug: "extras/use-gltf",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/use-progress.mdx": {
  id: "extras/use-progress.mdx",
  slug: "extras/use-progress",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/use-suspense.mdx": {
  id: "extras/use-suspense.mdx",
  slug: "extras/use-suspense",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/use-texture.mdx": {
  id: "extras/use-texture.mdx",
  slug: "extras/use-texture",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"extras/use-threlte-audio.mdx": {
  id: "extras/use-threlte-audio.mdx",
  slug: "extras/use-threlte-audio",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"gltf/getting-started.mdx": {
  id: "gltf/getting-started.mdx",
  slug: "gltf/getting-started",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/about-joints.mdx": {
  id: "rapier/about-joints.mdx",
  slug: "rapier/about-joints",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/attractor.mdx": {
  id: "rapier/attractor.mdx",
  slug: "rapier/attractor",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/auto-colliders.mdx": {
  id: "rapier/auto-colliders.mdx",
  slug: "rapier/auto-colliders",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/basic-vehicle-controller.mdx": {
  id: "rapier/basic-vehicle-controller.mdx",
  slug: "rapier/basic-vehicle-controller",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/collider.mdx": {
  id: "rapier/collider.mdx",
  slug: "rapier/collider",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/collision-groups.mdx": {
  id: "rapier/collision-groups.mdx",
  slug: "rapier/collision-groups",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/components.mdx": {
  id: "rapier/components.mdx",
  slug: "rapier/components",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/debug.mdx": {
  id: "rapier/debug.mdx",
  slug: "rapier/debug",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/getting-started.mdx": {
  id: "rapier/getting-started.mdx",
  slug: "rapier/getting-started",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/hooks.mdx": {
  id: "rapier/hooks.mdx",
  slug: "rapier/hooks",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/joints.mdx": {
  id: "rapier/joints.mdx",
  slug: "rapier/joints",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/recipes.mdx": {
  id: "rapier/recipes.mdx",
  slug: "rapier/recipes",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/rigid-body.mdx": {
  id: "rapier/rigid-body.mdx",
  slug: "rapier/rigid-body",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/use-collision-groups.mdx": {
  id: "rapier/use-collision-groups.mdx",
  slug: "rapier/use-collision-groups",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/use-fixed-joint.mdx": {
  id: "rapier/use-fixed-joint.mdx",
  slug: "rapier/use-fixed-joint",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/use-joint.mdx": {
  id: "rapier/use-joint.mdx",
  slug: "rapier/use-joint",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/use-prismatic-joint.mdx": {
  id: "rapier/use-prismatic-joint.mdx",
  slug: "rapier/use-prismatic-joint",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/use-rapier.mdx": {
  id: "rapier/use-rapier.mdx",
  slug: "rapier/use-rapier",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/use-revolute-joint.mdx": {
  id: "rapier/use-revolute-joint.mdx",
  slug: "rapier/use-revolute-joint",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/use-rigid-body.mdx": {
  id: "rapier/use-rigid-body.mdx",
  slug: "rapier/use-rigid-body",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/use-spherical-joint.mdx": {
  id: "rapier/use-spherical-joint.mdx",
  slug: "rapier/use-spherical-joint",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"rapier/world.mdx": {
  id: "rapier/world.mdx",
  slug: "rapier/world",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"theatre/components.mdx": {
  id: "theatre/components.mdx",
  slug: "theatre/components",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"theatre/editable.mdx": {
  id: "theatre/editable.mdx",
  slug: "theatre/editable",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"theatre/getting-started.mdx": {
  id: "theatre/getting-started.mdx",
  slug: "theatre/getting-started",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"theatre/helpers.mdx": {
  id: "theatre/helpers.mdx",
  slug: "theatre/helpers",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"theatre/project.mdx": {
  id: "theatre/project.mdx",
  slug: "theatre/project",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"theatre/sheet.mdx": {
  id: "theatre/sheet.mdx",
  slug: "theatre/sheet",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"theatre/studio.mdx": {
  id: "theatre/studio.mdx",
  slug: "theatre/studio",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"theatre/theatre.mdx": {
  id: "theatre/theatre.mdx",
  slug: "theatre/theatre",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"xr/button-ar.mdx": {
  id: "xr/button-ar.mdx",
  slug: "xr/button-ar",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"xr/button-vr.mdx": {
  id: "xr/button-vr.mdx",
  slug: "xr/button-vr",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"xr/button-xr.mdx": {
  id: "xr/button-xr.mdx",
  slug: "xr/button-xr",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"xr/components.mdx": {
  id: "xr/components.mdx",
  slug: "xr/components",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"xr/getting-started.mdx": {
  id: "xr/getting-started.mdx",
  slug: "xr/getting-started",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"xr/hooks.mdx": {
  id: "xr/hooks.mdx",
  slug: "xr/hooks",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"xr/use-xr.mdx": {
  id: "xr/use-xr.mdx",
  slug: "xr/use-xr",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
"xr/xr.mdx": {
  id: "xr/xr.mdx",
  slug: "xr/xr",
  body: string,
  collection: "reference",
  data: InferEntrySchema<"reference">
} & { render(): Render[".mdx"] },
},
"showcase": {
"bridge copy 2.mdx": {
  id: "bridge copy 2.mdx",
  slug: "bridge-copy-2",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
"bridge copy 3.mdx": {
  id: "bridge copy 3.mdx",
  slug: "bridge-copy-3",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
"bridge copy 4.mdx": {
  id: "bridge copy 4.mdx",
  slug: "bridge-copy-4",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
"bridge copy 5.mdx": {
  id: "bridge copy 5.mdx",
  slug: "bridge-copy-5",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
"bridge copy 6.mdx": {
  id: "bridge copy 6.mdx",
  slug: "bridge-copy-6",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
"bridge copy.mdx": {
  id: "bridge copy.mdx",
  slug: "bridge-copy",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
"bridge.mdx": {
  id: "bridge.mdx",
  slug: "bridge",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
"horse-carriage.mdx": {
  id: "horse-carriage.mdx",
  slug: "horse-carriage",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
"street-art copy 2.mdx": {
  id: "street-art copy 2.mdx",
  slug: "street-art-copy-2",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
"street-art copy 3.mdx": {
  id: "street-art copy 3.mdx",
  slug: "street-art-copy-3",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
"street-art copy.mdx": {
  id: "street-art copy.mdx",
  slug: "street-art-copy",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
"street-art.mdx": {
  id: "street-art.mdx",
  slug: "street-art",
  body: string,
  collection: "showcase",
  data: InferEntrySchema<"showcase">
} & { render(): Render[".mdx"] },
},
"testimonials": {
"amr.mdx": {
  id: "amr.mdx",
  slug: "amr",
  body: string,
  collection: "testimonials",
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".mdx"] },
"matan-shenhav.mdx": {
  id: "matan-shenhav.mdx",
  slug: "matan-shenhav",
  body: string,
  collection: "testimonials",
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".mdx"] },
"matthias-stahl.mdx": {
  id: "matthias-stahl.mdx",
  slug: "matthias-stahl",
  body: string,
  collection: "testimonials",
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".mdx"] },
"rich-harris.mdx": {
  id: "rich-harris.mdx",
  slug: "rich-harris",
  body: string,
  collection: "testimonials",
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".mdx"] },
"shiva.mdx": {
  id: "shiva.mdx",
  slug: "shiva",
  body: string,
  collection: "testimonials",
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".mdx"] },
"shiyun.mdx": {
  id: "shiyun.mdx",
  slug: "shiyun",
  body: string,
  collection: "testimonials",
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".mdx"] },
"vatroslav.mdx": {
  id: "vatroslav.mdx",
  slug: "vatroslav",
  body: string,
  collection: "testimonials",
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".mdx"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
