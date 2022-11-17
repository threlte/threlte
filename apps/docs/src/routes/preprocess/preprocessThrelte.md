---
title: preprocessThrelte
---

# preprocessThrelte

:::admonition type="experimental"
This preprocessor is part of a recently released feature of threlte. It is still very much in a beta phase and can be subject to breaking API changes. Please use at your own risk. Learn more about this feature [here](/core-transition)
:::

Threlte provides a custom preprocessor that _automagically_ turns `<T.Mesh>` into `<Three type={Mesh} />`. It resolves dependencies and automatically places imports for the corresponding modules used throughout your component. By default, you can use any import from `'three'`. The preprocessor is extendable, so that other modules (such as those from the famous "examples" directory) can be used.

:::admonition type="note"
If you're not familiar with the component [`<Three>`](/), please make yourself comfortable with it first as the preprocessor's main job is to provide syntactic sugar for that component.
:::

It's best described with a basic example. The preprocessor will turn this:

```svelte
<script lang="ts">
	import { T } from '@threlte/core'
</script>

<T.Mesh>
	<T.BoxGeometry />
	<T.MeshStandardMaterial />
</T.Mesh>
```

into this:

```svelte
<script lang="ts">
	import { Three } from '@threlte/core'
	import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three'
</script>

<Three type={Mesh}>
	<Three type={BoxGeometry} />
	<Three type={MeshStandardMaterial} />
</Three>
```

## Installation

1. **Install the package** `@threlte/preprocess`

```bash copy
npm install -D @threlte/preprocess
```

2. **Install additional dependencies**

If you need to run any other preprocessors in your project (e.g. [`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess)), you also need to install [`svelte-sequential-preprocessor`](https://github.com/pchynoweth/svelte-sequential-preprocessor) in order to run the preprocessors sequentially. This step is mandatory for a default SvelteKit project. In this case **threltes preprocessor must succeed** any other preprocessor.

```bash copy
npm install -D svelte-sequential-preprocessor
```

3. **Adapt your svelte configuration**

- As the only preprocessor

```js title="svelte.config.js"
import { preprocessThrelte } from '@threlte/preprocess'

const config = {
	preprocess: preprocessThrelte()
}
```

- In conjunction with other preprocessors

```js title="svelte.config.js"
import sequence from 'svelte-sequential-preprocessor'
import preprocess from 'svelte-preprocess'
import { preprocessThrelte } from '@threlte/preprocess'

const config = {
	preprocess: sequence([preprocess(), preprocessThrelte()])
}
```

## Configuration

By default, the preprocessor is able to use all exports of `three`. This means that if you were to import a module via `import { BoxGeometry } from 'three'` it's automatically in the default catalogue. You can however extend that catalogue with the option `extensions` which is an object where the key is a module name and the value is an array of import names:

```js title="svelte.config.js"
import { preprocessThrelte } from '@threlte/preprocess'

const config = {
	preprocess: preprocessThrelte({
		extensions: {
			// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
			'three/examples/jsm/controls/OrbitControls': ['OrbitControls'],

			// import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
			'three/examples/jsm/controls/TransformControls': ['TransformControls'],

			// import { CustomGrid } from '$lib/CustomGrid'
			'$lib/CustomGrid': ['CustomGrid']
		}
	})
}
```
