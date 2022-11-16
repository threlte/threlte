---
title: Getting Started
---

<script>
	const preprocess = '@threlte/preprocess'
	let installPreprocess = true

	const extras = '@threlte/extras'
	let installExtras = true

	const rapier = '@threlte/rapier'
	let installRapier = true

	const typescript = '@types/three'
	let installTypescript = true

	$: installCommand = [
		'npm i -D three',
		'@threlte/core',
		installPreprocess && preprocess,
		installExtras && extras,
		installRapier && rapier,
		installTypescript && typescript
	]
		.filter(Boolean)
		.join(' \\\n  ')
</script>


# Getting Started

Threlte consists of 4 packages which can be used individually.

## Installation

<div class="flex flex-col">

<div class="mb-4">
<input id="core" type="checkbox" checked disabled />
<label for="core">
Install <code>@threlte/core</code> and <code>three</code><br />
<small><code>three</code> and core components library (required)</small>
</label>
</div>

<div class="mb-4">
<input id="preprocess" type="checkbox" bind:checked={installPreprocess} />
<label for="preprocess">
Install <code>@threlte/preprocess</code><br />
<small>A preprocessor with support for auto-importing and improved DX</small>
</label>
</div>

<div class="mb-4">
<input id="extras" type="checkbox" bind:checked={installExtras} />
<label for="extras">
Install <code>@threlte/extras</code><br />
<small>Components, helpers, hooks and more that extend the core functionality</small>
</label>
</div>

<div class="mb-4">
<input id="rapier" type="checkbox" bind:checked={installRapier} />
<label for="rapier">
Install <code>@threlte/rapier</code><br />
<small>Components and hooks to use the <a href="https://rapier.rs/" target="_blank">Rapier physics engine</a> in Threlte</small>
</label>
</div>

<div>
<input id="typescript" type="checkbox" bind:checked={installTypescript} />
<label for="typescript">
Install TypeScript types
</label>
</div>

</div>

<CodeFence lang="bash" rawCode={installCommand} code={'<pre><code><span class="line">' + installCommand + '</span></code></pre>'} showCopyCode highlightLines={[]} linesCount={1} />


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

!!!step title="Adapt Vite Configuration"|description="If you are using Threlte with SvelteKit, adapt your Vite configuration to prevent three.js and troika-three-text from being externalized for SSR by vites externalization step"|orientation="vertical"

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
[See this comment](https://github.com/threlte/threlte/issues/8#issuecomment-1024085864) for tips on how to reduce bundle size when working with bundlers like vite and three.js.
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
