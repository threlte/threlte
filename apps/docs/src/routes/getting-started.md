---
title: Getting Started
---

<script>
	import { preprocessThrelte } from '@threlte/preprocess'
import { slide } from 'svelte/transition'

	const preprocess = '@threlte/preprocess'
	let installPreprocess = true

	const sequentialPreprocessor = 'svelte-sequential-preprocessor'
	let installSequentialPreprocessor = true

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
		installPreprocess && installSequentialPreprocessor && sequentialPreprocessor,
		installExtras && extras,
		installRapier && rapier,
		installTypescript && typescript
	]
		.filter(Boolean)
		.join(' \\\n  ')
</script>

# Getting Started

## Installation

Threlte consists of 4 packages which can be installed and used individually. The core package is required for all projects, and the other packages are optional. Choose the packages you want to use. **The rest of this guide will adapt**:

<div class="flex flex-col install-script">

<div class="mb-4">
<input id="core" type="checkbox" checked disabled />
<label for="core">
Install <code>@threlte/core</code> and <code>three</code><br />
<p class="text-sm mt-0.5"><code>three</code> and core the library are required.</p>
</label>
</div>

<div class="mb-4">
<input id="preprocess" type="checkbox" bind:checked={installPreprocess} />
<label for="preprocess">
Install <code>@threlte/preprocess</code><br />
<p class="text-sm mt-0.5"><a href="/preprocess/preprocessThrelte">Threlte's preprocessor</a> with support for auto-importing and improved developer experience.</p>
</label>
</div>

{#if installPreprocess}

<div transition:slide class="mb-4">
<input id="sequentialPreprocessor" type="checkbox" bind:checked={installSequentialPreprocessor} />
<label for="sequentialPreprocessor">
Install <code>svelte-sequential-preprocessor</code><br />
<p class="text-sm mt-0.5"><a href="https://www.npmjs.com/package/svelte-sequential-preprocessor" target="_blank"><code>svelte-sequential-preprocessor</code></a> is required if you need to run other preprocessors as well.</p>
</label>
</div>
{/if}

<div class="mb-4">
<input id="extras" type="checkbox" bind:checked={installExtras} />
<label for="extras">
Install <code>@threlte/extras</code><br />
<p class="text-sm mt-0.5"><a href="/extras/use-gltf">Components, helpers, hooks and more</a> that extend the core functionality</p>
</label>
</div>

<div class="mb-4">
<input id="rapier" type="checkbox" bind:checked={installRapier} />
<label for="rapier">
Install <code>@threlte/rapier</code><br />
<p class="text-sm mt-0.5">Components and hooks to use the <a href="https://rapier.rs/" target="_blank">Rapier physics engine</a> in Threlte</p>
</label>
</div>

<div>
<input id="typescript" type="checkbox" bind:checked={installTypescript} />
<label for="typescript">
Install TypeScript types for <code>three</code><br />
</label>
</div>

</div>

<CodeFence title="terminal" lang="bash" rawCode={installCommand} code={'<pre><code><span class="line">' + installCommand + '</span></code></pre>'} showCopyCode highlightLines={[]} linesCount={1} />

## Configuration

{#if installPreprocess && installSequentialPreprocessor}

#### Adapt `svelte.config.js`

Add Threlte's preprocessor as well as `'svelte-sequential-preprocessor'` to your Svelte config:

```js lang=js|title=svelte.config.js
import preprocess from 'svelte-preprocess'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { preprocessThrelte } from '@threlte/preprocess'

const config = {
	preprocess: seqPreprocessor([
		preprocess({
			postcss: true
		}),
		preprocessThrelte({
			extensions: {
				'three/examples/jsm/controls/OrbitControls': ['OrbitControls'],
				'three/examples/jsm/controls/TransformControls': ['TransformControls']
			}
		})
	])
}

export default config
```

{:else if  installPreprocess}

#### Adapt `svelte.config.js`

Add Threlte's preprocessor to your Svelte config:

```js lang=js|title=svelte.config.js
import { preprocessThrelte } from '@threlte/preprocess'

const config = {
	preprocess: preprocessThrelte({
		extensions: {
			'three/examples/jsm/controls/OrbitControls': ['OrbitControls'],
			'three/examples/jsm/controls/TransformControls': ['TransformControls']
		}
	})
}

export default config
```

{/if}

#### Adapt your Vite config

{#if installExtras}

If you are using Threlte with SvelteKit, adapt your Vite configuration to prevent three.js and troika-three-text from being externalized for SSR by vites externalization step

```js copyHighlight{3-5}|title=vite.config.js
const config = {
	// …
	ssr: {
		noExternal: ['three', 'troika-three-text']
	}
	// …
}
```

{:else}

If you are using Threlte with SvelteKit, adapt your Vite configuration to prevent three.js from being externalized for SSR by vites externalization step

```js copyHighlight{3-5}|title=vite.config.js
const config = {
	// …
	ssr: {
		noExternal: ['three']
	}
	// …
}
```

{/if}

:::admonition type="tip"
[See this comment](https://github.com/threlte/threlte/issues/8#issuecomment-1024085864) for tips on how to reduce bundle size when working with bundlers like vite and three.js.
:::

## First Scene

Build your first scene:

{#if installPreprocess}

@[code](../examples/getting-started/preprocessed/Scene.svelte)

{:else}

@[code](../examples/getting-started/Scene.svelte)

{/if}

It should look something like this:

<script lang="ts">
import GettingStartedPreprocessed from '$examples/getting-started/preprocessed/Scene.svelte'
import GettingStarted from '$examples/getting-started/Scene.svelte'
</script>

<ExampleWrapper>

{#if installPreprocess}
<GettingStartedPreprocessed />
{:else}
<GettingStarted />
{/if}

</ExampleWrapper>

Congratulations :tada:
Orbit around the cube, hover over it and change some values.

Also have a look at the slightly more elaborate example including interactivity in a [Svelte REPL](https://svelte.dev/repl/bcb9474112ca440cb3c1f67e74250bcf?version=3.46.2).
