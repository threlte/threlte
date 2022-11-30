---
title: Editable
---

!!!module_summary title=Editable|sourcePath=components/Editable/Editable.svelte|name=Editable|from=theatre|type=component|relatedDocs={[{name:"Theatre.js Core Docs",url:"https://www.theatrejs.com/docs/latest/api/core"}]}

A component `<Editable>` represents a set of editable and animatable properties of its parent. This component is creating a [Theatre.js sheet object](https://www.theatrejs.com/docs/latest/manual/objects) under the hood and therefore all original concepts apply.

!!!

## Auto Props

#### Declaring Auto Props

Similar to the _magic_ that's driving the components `<Three>`/`<T>`, the component `<Editable>` is able to automatically pick up props from its parent.

```svelte
<script>
	import { T } from '@threlte/core'
	import { Editable } from '@threlte/theatre'
</script>

<T.Mesh>
	<!--
		Picks up the "position" and "scale" properties of
		the Mesh and makes them editable and animatable.
	-->
	<Editable name="Cube" position scale />

	<T.BoxGeometry />

	<T.MeshStandardMaterial color="red">
		<!--
			Picks up the material properties "color", "roughness"
			and "metalness" and their initial values ("red" in
			the case of "color", default values for others) and
			makes them editable and animatable.
		 -->
		<Editable name="Material" color roughness metalness />
	</T.MeshStandardMaterial>
</T.Mesh>
```

#### Pierced Auto Props

Similarly to the pierced props of [`<Three>`](/core/three)/[`<T>`](/core/t), the props of the component `<Editable>` can be notated in the same fashion:

```svelte
<script>
	import { T } from '@threlte/core'
	import { Editable } from '@threlte/theatre'
</script>

<T.Mesh>
	<!--
		Picks up only the x value of the position of
		the Mesh and makes it editable and animatable.
	-->
	<Editable name="Cube" position.x />

	<T.BoxGeometry />
	<T.MeshStandardMaterial />
</T.Mesh>
```

#### Labeling Auto Props

To label an auto prop, just provide a string instead of a boolean value.

```svelte
<script>
	import { T } from '@threlte/core'
	import { Editable } from '@threlte/theatre'
</script>

<T.Mesh>
	<!--
		Picks up only the x value of the position of
		the Mesh and makes it editable and animatable
		as the sheet object's property called "x".
	-->
	<Editable name="Cube" position.x="x" />

	<T.BoxGeometry />
	<T.MeshStandardMaterial />
</T.Mesh>
```

#### Special Auto Props

Some props are treated differently.

```svelte
<script>
	import { T } from '@threlte/core'
	import { Editable } from '@threlte/theatre'
</script>

<T.Mesh>
	<!--
		Picks up the rotation of the Mesh and
		transforms radians to degrees automatically.
		All properties that represent a THREE.Euler
		are automatically converted from radians to
		degrees.
	-->
	<Editable name="Cube" rotation />

	<T.BoxGeometry />
	<T.MeshStandardMaterial color="red">
		<!--
			All properties that represent a THREE.Color
			object can be edited with a Color-focused UI.
		 -->
		<Editable name="Material" color emissive />
	</T.MeshStandardMaterial>
</T.Mesh>
```

## Transform Shorthand

To easily add all transform properties to an `<Editable>` component, simply provide the flag `transform`. If `transform` is provided, add the flag `controls` to automatically add `THREE.TransformControls` when an object is selected in the Theatre.js Outliner.

```svelte
<script>
	import { T } from '@threlte/core'
	import { Editable } from '@threlte/theatre'
</script>

<T.Mesh>
	<!--
		Picks up the position, rotation and scale of
		the Mesh and makes them editable and animatable.
		If the object is selected in the Theatre.js studio,
		TransformControls will appear and let you edit your
		object directly in the scene.
	-->
	<Editable name="Cube" transform controls />

	<T.BoxGeometry />
	<T.MeshStandardMaterial />
</T.Mesh>
```

#### Configuring the Controls

The `THREE.TransformControls` added by the flag `controls` provide snapping to automatically snap an object along its axes. Hold down "shift" to enable snapping while dragging the controls. Provide the property `snap` to configure the snap settings:

```svelte
<script>
	import { T } from '@threlte/core'
	import { Editable } from '@threlte/theatre'
</script>

<T.Mesh>
	<Editable
		name="Cube"
		transform
		controls
		snap={{
			translate: 0.1,
			rotate: 15 * DEG2RAD,
			scale: 0.1
		}}
	/>

	<T.BoxGeometry />
	<T.MeshStandardMaterial />
</T.Mesh>
```
