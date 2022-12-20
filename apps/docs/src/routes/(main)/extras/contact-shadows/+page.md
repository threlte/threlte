---
title: ContactShadows
---

<script lang="ts">
import Example from '$examples/extras/contact-shadows/App.svelte'
</script>

!!!module_summary title=ContactShadows|sourcePath=/components/ContactShadows/ContactShadows.svelte|name=ContactShadows|from=extras|type=component

This component is a port of [drei's `<ContactShadows>` component](https://github.com/pmndrs/drei#contactshadows).

A contact shadow implementation, facing upwards (positive Y) by default. `scale` can be a positive number or a 2D array (`x: number, y: number]`).

```svelte
<ContactShadows
	opacity={1}
	scale={10}
	blur={1}
	far={10}
	resolution={256}
	color="#000000"
/>
```

Since this is a rather expensive effect you can limit the amount of frames it renders when your objects are static. For instance making it render only once:

```svelte
<ContactShadows frames={1} />
```

Use the binding `refresh` to manually refresh the shadows:

```svelte
<script>
	let refresh

	const onSomeEvent = () => {
		if (refresh) refresh()
	}
</script>

<ContactShadows bind:refresh frames={0} />
```

Currently it has the same limitations of drei's version: It yields unexpected results if moved on the x or the z axis.

<ExampleWrapper playgroundHref="/extras/contact-shadows">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/extras/contact-shadows/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/extras/contact-shadows/Scene.svelte)

</div>
</ExampleWrapper>

!!!

### Example

```svelte
<script lang="ts">
  import { ContactShadows } from 'threlte/extras'
</script>

<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />
```

### Properties

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
visible: boolean | undefined = undefined
opacity: number = 1 // general shadow opacity
width: number = 1 // width of shadow area
height: number = 1 // height of shadow area
blur: number = 1 // amount of blur
far: number = 10 // far plane of the shadow camera
smooth: boolean = true	// true for two blur iterations
resolution: number = 512
frames: number = Infinity
scale: number | [x: number, y: number] = 10 // scale of the shadow area
color: THREE.ColorRepresentation = '#000000'
depthWrite: boolean = false
```

### Bindings

```ts
inViewport: boolean
refresh: () => void
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
