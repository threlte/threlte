---
title: Getting Started
---

# Getting Started

## Installation

:::steps

!!!step title="Install threlte and three.js"|description="Threlte consists of several packages but @threlte/core is required"|orientation="vertical"

```bash copy
npm install @threlte/core @threlte/extras three
```

!!!

!!!step title="Install three.js types"|description="Optional for TypeScript users"|orientation="vertical"

```bash copy
npm install -D @types/three
```

!!!

!!!step title="Adapt SvelteKit config"|description="If you are using Threlte with SvelteKit, adapt your Vite configuration to prevent three.js and troika-three-text from being externalized for SSR by vites externalization step"|orientation="vertical"

```js copyHighlight{3-5}|title=vite.config.js
const config = {
	// …
	ssr: {
		noExternal: ['three', 'troika-three-text']
	}
	// …
}
```

!!!

:::

<br>

:::admonition type="tip"
[See this comment](https://github.com/grischaerbe/threlte/issues/8#issuecomment-1024085864) for tips on how to reduce bundle size when working with bundlers like vite and three.js.
:::

## First Scene

Build your first scene:

[Open in a Svelte REPL](https://svelte.dev/repl/14f38c03710945b797d0c421f55e4373?version=3.46.2)

@[code](../examples/getting-started/Scene.svelte)

It should look something like this:

<script lang="ts">
import GettingStarted from '$examples/getting-started/Scene.svelte'
</script>

<div style="height: 600px;" class="my-8 rounded-md shadow-lg mx-auto border border-gray-divider">
  <GettingStarted />
</div>

Congratulations :tada:
Orbit around the cube, hover over it and change some values.

Also have a look at the slightly more elaborate example including interactivity in a [Svelte REPL](https://svelte.dev/repl/bcb9474112ca440cb3c1f67e74250bcf?version=3.46.2).
