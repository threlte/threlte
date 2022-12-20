---
title: Getting Started
---

# Getting Started

[Theatre.js](https://www.theatrejs.com/) is a javascript animation library with a professional motion design toolset. It helps you create any animation, from cinematic scenes in 3D, to delightful UI interactions.

Before you get started with using `@threlte/theatre`, you should get comfortable with the concepts and terminology of Theatre.js itself by reading [their documentation](https://www.theatrejs.com/docs/latest).

:::admonition type="info"
Code examples normally are embedded in the documentation itself. With examples using `@threlte/theatre` that's a bit different because the interface needs a large sceen. Therefore, the examples open in a new tab.
:::

### Installation

```bash copy
npm install @threlte/theatre @theatre/core @theatre/studio
```

### Quick Start

To get started quickly, encapsulate your whole scene in the component [`<Theatre>`](/theatre/theatre).

:::admonition type="tip"
The component `<Theatre>` provides a default [`<Project>`](/theatre/project) and [`<Sheet>`](/theatre/sheet) and implements [`<Studio>`](/theatre/studio). For a more flexible structure please consider using `<Project>`, `<Sheet>` and `<Studio>` on their own.
:::

```svelte title=App.svelte|copyHighlight={3,8,10}
<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Theatre } from '@threlte/theatre'
	import Scene from './Scene.svelte'
</script>

<Canvas>
	<Theatre>
		<Scene />
	</Theatre>
</Canvas>
```

In your Scene, add the component `<Editable>` as a child of any component you'd wish to edit or animate. Add boolean props (~_flags_) to the component indicating which parent property you'd like to manipulate.

:::admonition type="tip"
The property `transform` is a shortcut to add `position`, `scale` and `rotation` at once, the property `controls` enables comfortable `THREE.TransformControls` on the Object.
:::

```svelte title=Scene.svelte
<script lang="ts">
	import { OrbitControls, T } from '@threlte/core'
	import { Editable } from '@threlte/theatre'
	import { DEG2RAD } from 'three/src/math/MathUtils'
</script>

<T.PerspectiveCamera position={[0, 5, 10]} makeDefault>
	<OrbitControls target={{ y: 1.5 }} />
</T.PerspectiveCamera>

<!-- Box -->
<T.Mesh receiveShadow castShadow position.y={0.5}>
	<Editable name="Box / Mesh" transform controls />
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color="#b00d03">
		<Editable name="Box / Material" color roughness metalness />
	</T.MeshStandardMaterial>
</T.Mesh>

<!-- Floor -->
<T.Mesh receiveShadow castShadow rotation.x={DEG2RAD * -90}>
	<Editable name="Floor / Mesh" scale />
	<T.CircleGeometry args={[4, 60]} />
	<T.MeshStandardMaterial>
		<Editable name="Floor / Material" color roughness metalness />
	</T.MeshStandardMaterial>
</T.Mesh>

<T.DirectionalLight position={[0.5, 2, 1]} castShadow>
	<Editable name="Lights / Main" color intensity transform controls />
</T.DirectionalLight>

<T.AmbientLight intensity={0.2}>
	<Editable name="Lights / Fill" color intensity />
</T.AmbientLight>
```

You will now see the Theatre.js Interface. Make yourself comfortable with the controls and if you haven't done yet, please read the [Theatre.js documentation](https://www.theatrejs.com/docs/latest).

<img src="/images/theatre/getting-started.png" class="mt-8 rounded-md shadow-lg mx-auto border border-gray-divider overflow-hidden h-auto relative">
