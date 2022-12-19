---
title: T
---

<script lang="ts">
import Example from '$examples/core/t/App.svelte'
</script>

!!!module_summary title=T|sourcePath=T.svelte|name=T|from=core|type=component

:::admonition type="experimental"
This component is part of a recently released feature of threlte. It is still very much in a beta phase and can be subject to breaking API changes. Please use at your own risk. Learn more about this feature [here](/core-transition).
:::

**The component `<T>` cannot be used without the threlte preprocessor**. Please follow the [instructions](/preprocess/preprocessThrelte) to install it first.

The usage of the component `<T>` is derived from the component `<Three>`. The preprocessor essentially transforms all occurrences of `<T>` components to `<Three>` components.

<ExampleWrapper>

<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/core/t/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/core/t/Scene.svelte)

</div>

</ExampleWrapper>

Let's have a look at a basic example. The preprocessor transforms this component:

```svelte
<script>
	import { T } from '@threlte/core'
</script>

<T.Mesh position.x={6}>
	<T.BoxGeometry args={[1, 2, 1]} />
	<T.MeshBasicMaterial />
</T.Mesh>
```

into this:

```svelte
<script>
	import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three'
	import { Three } from '@threlte/core'
</script>

<Three type={Mesh} position.x={6}>
	<Three type={BoxGeometry} args={[1, 2, 1]} />
	<Three type={MeshBasicMaterial} />
</Three>
```

Please follow the documentation of the component [`<Three>`](/core/three) for implementation details.
!!!
