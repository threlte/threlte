---
title: Three
---

<script lang="ts">
import Example from '$examples/core/three-arcade-game/App.svelte'
</script>

!!!module_summary title=Three|sourcePath=Three.svelte|name=Three|from=core|type=component

:::admonition type="experimental"
This component is part of a recently released feature of threlte. It is still very much in a beta phase and can be subject to breaking API changes. Please use at your own risk. Learn more about this feature [here](/core-transition)
:::

The component `<Three />` provides the means to use **any** three.js module as a Svelte component. It does this by leveraging the rigid three.js naming and object property structure and act as a **renderer** to include objects in the scene graph or attach objects to parent object properties.

<ExampleWrapper>

<Example />

</ExampleWrapper>

!!!

## Usage

In contrast to other threlte components, the component `<Three />` does not wrap a single three.js class or acts in a single domain but rather tries to render any value that is passed to the property `type` in the context of a threlte application.

### Usage with preprocessor

There are two ways to use the component: With or without the [preprocessor](/preprocess).

<!-- prettier-ignore-start -->

|  | With Preprocessor | Without Preprocessor |
|---|---|---|
| Use a module from 'three' | `<T.Mesh>` | `import { Mesh } from 'three'` `<Three type={Mesh}>` |
| Use any module | extend preprocessor and `<T.AnyModule>` | `import { Module } from 'package'` `<Three type={Module}>` |
| Type autocompletion | On 'three' exports only | On anything |
| Setup | Install and implement preprocessor | – |

<!-- prettier-ignore-end -->

### type

- If a **class definition** such as `THREE.Mesh` is provided to the property `type`, it creates an instance of that class.

```svelte
<!-- equivalent to "new Mesh()" -->
<Three type={Mesh} />
```

- If a **class instance** or **any other value** such as `new THREE.Mesh()` is provided, the component uses this value as-is.

```svelte
<script>
	const mesh = new Mesh()
</script>

<Three type={mesh} />
```

Depending on certain value types, threlte makes these assumptions:

- If the value passed to `type` is extending `THREE.Object3D` it's added to the scene graph.
- If the value passed to `type` is a disposable, it's disposed `onDestroy`.
- If the value passed to `type` is extending `THREE.EventDispatcher`, you can add [event callbacks](#events).
- If the value passed to `type` is extending `THREE.Camera`, certain [camera-related properties](#camera-props) are available.

### args

In three.js objects are classes that are instantiated. These classes can receive one-time constructor arguments (`new THREE.SphereGeometry(1, 32)`). In Threlte, constructor arguments are always passed as an array via the property `args`. If `args` change later on, the object must naturally get reconstructed from scratch!

- If a **class definition** such as `THREE.BoxGeometry` is provided to the property `type`, the property `args` is used to instantiate the class: `<Three type={BoxGeometry} args={[1, 2, 1]}>` equals `new BoxGeometry(1, 2, 1)`.

### attach

Use `attach` to bind objects to their parent. If you unmount the attached object it will be taken off its parent automatically.

The following attaches a material to the material property of a mesh and a geometry to the geometry property:

```svelte
<Three type={Mesh}>
	<Three type={MeshBasicMaterial} attach="material" />
	<Three type={BoxGeometry} attach="geometry" />
</Three>
```

:::admonition type="tip"
All native elements ending with "Material" (such as `MeshStandardMaterial`) receive `attach="material"`, and all elements ending with "Geometry" receive `attach="geometry"`automatically. You do not strictly have to type it out!
:::

- The value inferred from the property `type` is "attached" to a parent property.

```svelte
<script>
	import { MeshStandardMaterial } from 'three'
	export let texture
</script>

<Three type={MeshStandardMaterial}>
	<!-- Attaches the texture to the property "map" of the parent material -->
	<Three type={texture} attach="map" />
</Three>
```

- `attach` can be a dot-notated path to a nested parent property:

```svelte
<Three type={DirectionalLight}>
	<!--
		Attaches an instance of a THREE.OrthographicCamera
		to the property camera of the property shadow of the
		parent THREE.DirectionalLight
	-->
	<Three
		type={OrthographicCamera}
		args={[-1, 1, 1, -1, 0.1, 100]}
		attach="shadow.camera"
	/>
</Three>
```

- `attach` can also be a function which is called on mounting with the parent and the value inferred from the property `type`. It can return a cleanup function which is called `onDestroy`:

```svelte
<Three type={DirectionalLight}>
	<!--
		Attaches an instance of a THREE.OrthographicCamera
		to the property camera of the property shadow of the
		parent THREE.DirectionalLight
	-->
	<Three
		type={OrthographicCamera}
		args={[-1, 1, 1, -1, 0.1, 100]}
		attach={(parent, self) => {
			parent.shadow.camera = self
			return () => {
				parent.shadow.camera = null
			}
		}}
	/>
</Three>
```

### Camera Props

By default Threlte is responsive and will set up cameras properly on resize (aspect ratio etc).
Cameras can be controlled manually by setting `manual` to `true` in camera. This will opt out of projection matrix recalculation when the drawing area resizes or other camera-related properties change.

```svelte
<Three type={PerspectiveCamera} manual />
```

Use the property `makeDefault` to set a camera to the default rendering camera.

```svelte
<Three type={PerspectiveCamera} makeDefault />
```

### Events

Adding an event listener to a component will also add the corresponding event listener to the three.js class instance. The event will be forwarded and is available at `event.detail`.

This will listen to the "change" event on the `THREE.OrbitControls`:

```svelte
<Three type={OrbitControls} on:change={(e) => {
	console.log('OrbitControls changed.', e.detail)
}} />
```

### Slot Props

The value infered from the property `type` is available as the slot prop `ref`:

```svelte
<Three type={PerspectiveCamera} let:ref={camera}>
	<!--
		The slot prop "ref" is used to reference the
		camera and instantiate the OrbitControls
	-->
	<Three type={OrbitControls} args={[camera, renderer.domElement]} />
</Three>
```

### Bindings

The value infered from the property `type` is available as the binding `ref`:

```svelte
<script>
	let camera
	$: console.log(camera)
</script>

<Three type={PerspectiveCamera} bind:ref={camera} />
```
