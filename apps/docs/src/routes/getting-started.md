---
title: Getting Started
---

<script>
	import { preprocessThrelte } from '@threlte/preprocess'
	import { slide } from 'svelte/transition'
	import { onMount } from 'svelte'

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
		'npm i -D three @threlte/core',
		installPreprocess && preprocess,
		installPreprocess && installSequentialPreprocessor && sequentialPreprocessor,
		installExtras && extras,
		installRapier && rapier,
		installTypescript && typescript
	]
		.filter(Boolean)
		.join(' \\\n  ')

	onMount(() => {
		document.getElementsByTagName('main')[0].style.overflowX = 'clip'
	})
</script>

# Getting Started

## Installation

Threlte consists of 4 packages which can be installed and used individually. `@threlte/core` and `three` are required for all projects while the other packages are optional.

<ul>

<li style="margin-bottom: 25px !important;">
<code>@threlte/core</code> and <code>three</code> – required<br />
<p class="text-sm mt-0.5">three.js and core the library are required. Compose three.js scenes declaratively and state-driven.</p>
</li>

<li style="margin-bottom: 25px !important;">
<code>@threlte/preprocess</code><br />
<p class="text-sm mt-0.5"><a href="/preprocess/preprocessThrelte">Threlte's preprocessor</a> provides auto-importing and an improved developer experience.</p>
</li>

<li style="margin-bottom: 25px !important;">
<code>svelte-sequential-preprocessor</code> – external package<br />
<p class="text-sm mt-0.5"><a href="https://www.npmjs.com/package/svelte-sequential-preprocessor" target="_blank">svelte-sequential-preprocessor</a> is an external package and is required if you need to run other preprocessors as well.</p>
</li>

<li style="margin-bottom: 25px !important;">
<code>@threlte/extras</code><br />
<p class="text-sm mt-0.5"><a href="/extras/use-gltf">Components, helpers, hooks and more</a> that extend the core functionality.</p>
</li>

<li style="margin-bottom: 25px !important;">
<code>@threlte/rapier</code><br />
<p class="text-sm mt-0.5">Components and hooks to use the <a href="https://rapier.rs/" target="_blank">Rapier physics engine</a> in Threlte.</p>
</li>

<li style="margin-bottom: 25px !important;">
<code>@types/three</code> – external package<br />
<p class="text-sm mt-0.5">TypeScript types for three.js.</p>
</li>

</ul>


#### Choose the packages you want to use

The rest of this guide will adapt.

<div class="top-0 992:sticky flex flex-row install-script z-50 gap-2 w-full py-2 bg-white" style="	flex-wrap: wrap; margin-left: -25px; padding-left: 25px; padding-right: 25px; width: calc(100% + 50px);">

<InstallButton bind:bool={installPreprocess}>
@threlte/preprocess
</InstallButton>
{#if installPreprocess}
<InstallButton bind:bool={installSequentialPreprocessor}>
svelte-sequential-preprocessor
</InstallButton>
{:else}
<InstallButton bool={false} disabled>
svelte-sequential-preprocessor
</InstallButton>
{/if}
<InstallButton bind:bool={installExtras}>
@threlte/extras
</InstallButton>
<InstallButton bind:bool={installRapier}>
@threlte/rapier
</InstallButton>
<InstallButton bind:bool={installTypescript}>
@types/three
</InstallButton>
</div>

Install the packages with `npm`, `pnpm`, `yarn` or any other package manager you prefer.

<CodeFence title="terminal" lang="bash" rawCode={installCommand} code={'<pre><code><span class="line">' + installCommand + '</span></code></pre>'} showCopyCode highlightLines={[]} linesCount={1} />

## Configuration

{#if installPreprocess && installSequentialPreprocessor}

#### Adapt `svelte.config.js`

Add Threlte's preprocessor as well as `'svelte-sequential-preprocessor'` to your Svelte config:

```js lang=js|title=svelte.config.js|copyHighlight{2,3,7-10}
import preprocess from 'svelte-preprocess'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { preprocessThrelte } from '@threlte/preprocess'

const config = {
	// …
	preprocess: seqPreprocessor([
		preprocess(),
		preprocessThrelte()
	])
}

export default config
```

{:else if  installPreprocess}

#### Adapt `svelte.config.js`

Add Threlte's preprocessor to your Svelte config:

```js lang=js|title=svelte.config.js|copyHighlight{1,5}
import { preprocessThrelte } from '@threlte/preprocess'

const config = {
	// …
	preprocess: preprocessThrelte()
}

export default config
```

{/if}

#### Adapt `vite.config.js`

{#if installExtras}

If you are using Threlte with SvelteKit, adapt your Vite configuration to prevent `three` and `troika-three-text` from being externalized for SSR by vites externalization step

```js copyHighlight{3-5}|title=vite.config.js
const config = {
	// …
	ssr: {
		noExternal: ['three', 'troika-three-text']
	}
}
```

{:else}

If you are using Threlte with SvelteKit, adapt your Vite configuration to prevent `three` from being externalized for SSR by vites externalization step

```js copyHighlight{3-5}|title=vite.config.js
const config = {
	// …
	ssr: {
		noExternal: ['three']
	}
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

<ExampleWrapper playgroundHref="/getting-started/playground">

{#if installPreprocess}
<GettingStartedPreprocessed />
{:else}
<GettingStarted />
{/if}

</ExampleWrapper>

Congratulations :tada:
Orbit around the cube, hover over, [head over to the Playground](/playground/getting-started/playground) and change some values.
