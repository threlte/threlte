# Transitioning towards _Rendering_

<small>November 2022, by Grischa Erbe</small>

Hi. If you're reading this, you are probably looking for answers to why a component, hook or module from `@threlte/core` is on deprecation notice. The simple answer is that threlte as a wrapper component library for [three.js](https://threejs.org/) can't keep up with three.js's development speed and as such will always be one step behind.

That is why `@threlte/core` is transitioning towards acting more like a renderer which is able to work with everything that you throw at it. But let's dive a bit deeper.

## The history of `@threlte/core`

`@threlte/core` wrapped the most basic building blocks like meshes, lines, lights and cameras by mimicing the class system of three.js as nested Svelte components. This worked for a number of components and provided great DX and type-safety. One of the very basic three.js classes is the [Object3D](https://threejs.org/docs/index.html?q=obje#api/en/core/Object3D). It manages transformations, visibility, scene hierarchy, matrix calculations, and other fundamental things.

So naturally, there has been a component called `<Object3DInstance>` which uses an instance of a `THREE.Object3D` and with the help of some props, you can reactively manage an object instance that is part of your scene graph, convenient! Now we already established that a large part of three.js's classes base on this class, so threlte did that as well. Which meant there's for example a `<MeshInstance>` component that forwards all props belonging to the domain of a `THREE.Object3D` to its child `<Object3DInstance>` component and adds features that are part of a `THREE.Mesh`. It sounds like a sane and future-proof approach, no? But it also means hard-wiring and typing all props, events and bindings. Right from the start I gave using `$$props` and `restProps` a try but the performance drop was drastic. The architecture of nested components proved to be the natural enemy of the catch-all `$$props` property. So I resided with individually typed and declared props and a strong type system. Every new component meant extending and adding types, fleshing out the component itself and adding some bits and pieces that would make it feel a little bit magic. At some point I wanted to add a property `userData` to `<Object3DInstance>` which meant adding it to every single `@threlte/core` component by hand. It was at that point that I was worried this architecture of nested components wouldn't hold up for long.

## Svelte does not have custom renderers

In the meantime Paul Henschel – the person behind `react-three-fiber` – [criticised threlte for being a wrapper](https://twitter.com/0xca0a/status/1561789151996952577) instead of a renderer (or in react terms a _reconciler_) and while he was totally right I was still busy _wrapping_ stuff instead of finding a way to make a renderer happen in Svelteland. Svelte does not have something like custom renderers, a functionality that `react-three-fiber` extensively uses to dynamically use jsx elements as three.js classes: With `react-three-fiber`, `<mesh>` is dynamically transformed to a new instance of `THREE.Mesh` in the root context of a `<Canvas>` component. But what Svelte does have is the superpower of an AOT compiler and preprocessors that can parse the markup, script and style blocks of a component and inject everything that you can think of.

## The new `@threlte/core` at a glance

So here's the new threlte way of rendering three.js classes with the new preprocessor:

```svelte
<script>
	import { T } from '@threlte/core'
</script>

<T.Mesh>
	<T.BoxGeometry />
	<T.MeshStandardMaterial />
</T.Mesh>
```

## A quick FAQ at this point

- **Why not just `<mesh />`?**

The three namespace consists of elements that cannot be differentiated from DOM elements (e.g. `<path>`), also introducing types for IDE autocompletion is hard and the VS Code Svelte extension doesn't like binding to a web component.

- **Why not just `<Mesh />`?**

We also thought about a code generator that would transform every export of `three` to a standalone component but this approach is prone to a [bug that vite has with large Svelte component libraries](https://github.com/haruaki07/phosphor-svelte/issues/4). With currently over 450 exports, this did not seem like the solution.

- **What's `<T>`?**

This component will **not** end up in your bundle after compilation and will be stripped by the preprocessor. It's there to provide types for autocompletion for your IDE and is the marker by which the preprocessor knows where to replace.

## So how does threlte's preprocessing work?

1. The preprocessor looks for inline components that start with the set prefix, which is `T` by default.
2. It then looks up what's following that prefix and if it's existing in its import catalogue. This catalogue is the root `three` namespace by default. So if you can import something from `three`, it's there. This catalogue can be extended.
3. If there's no match it's ignoring the component and moving on.
4. If there is a match, the component is replaced by the component _actually_ in charge with providing all functionality: [`<Three />`](/core/three) from `@threlte/core`. It also places the required imports in the script block.

#### Basic Example

The preprocessor enables you to quickly outline a scene graph:

```svelte
<script>
	import { T } from '@threlte/core'
</script>

<T.Mesh>
	<T.BoxGeometry args={[1, 2, 1]} />
	<T.MeshStandardMaterial />
</T.Mesh>
```

Output:

```svelte
<script>
	import { Mesh, BoxGeometry, MeshStandardMateral } from 'three'
	import { Three } from '@threlte/core'
</script>

<Three type={Mesh} position={[1, 2, 1]}>
	<Three type={BoxGeometry} args={[1, 2, 1]} />
	<Three type={MeshStandardMaterial} color="hotpink" />
</Three>
```

## Extending the preprocessor

To use a module outside the main `three` namespace, simply extend the preprocessor where `extensions` are key-value pairs with module names and their corresponding import path:

```js title=svelte.config.js
const config = {
	preprocess: preprocessThrelte({
		extensions: {
			OrbitControls: 'three/examples/jsm/controls/OrbitControls',
			TransformControls: 'three/examples/jsm/controls/TransformControls',
			CustomGrid: '$lib/CustomGrid'
		}
	})
}

export default config
```

They can now be used in your components:

```svelte
<script>
	import { T, useThrelte } from '@threlte/core'
	const { renderer } = useThrelte()
</script>

<T.PerspectiveCamera let:ref>
	<T.OrbitControls args={[ref, renderer.domElement]} />
</T.PerspectiveCamera>
```

## Do I need to use the preprocessor?

Strictly speaking, no. You can go ahead and use the component `<Three>` from `@threlte/core` directly. It provides the same functionality and the same (shared) types but the output looks odd and is less accessible to some because of the ever repeating `<Three>` component. The preprocessor is _just_ syntactic sugar on top of `<Three>` and brings threlte's syntax closer to `react-three-fiber` to be able to use its ecosystem and tooling like [gltfjsx](https://github.com/pmndrs/gltfjsx) more easily.

## Props FAQ

- **What props are allowed?**

  - **Primitive properties** like numbers, strings and boolean values accept just that: `mesh.visible = false` translates to `<T.Mesh visible={false}>`.
  - **Object properties** like `THREE.Vector3` or `THREE.Color` which have a `set` function accept any value that you can pass to that function. This translates `mesh.position.set(1, 2, 3)` to `<T.Mesh position={[1, 2, 3]} >` or `color.set('hotpink')` to `<T.MeshStandardMaterial color="hotpink" />`.

This means that every property available on a three.js class is available (and fully typed!) on `<T>`/`<Three>`.
On top of that there are props to handle the disposal of objects (`dispose`) and camera-specific props (`manual` & `makeDefault`).

- **How would I set the x-axis of the position?**

Props can be used with dot-notation to pierce into objects. `mesh.position.x = 5` translates to `<T.Mesh position.x={5} />`

## Attaching things

Now there are situations where you'd want to `attach` some object to a property. Consider the following example:

```svelte
<T.Mesh
	material={new MeshStandardMaterial()}
	material.color="red"
	material.emissive="white"
	material.roughness={0.8}
	material.metalness={0.2}
	material.map={someTexture}
/>
```

Looks a bit silly, no? Because we now can use _any_ three.js class, we can _attach_ a material to its parents' `material` property:

```svelte
<T.Mesh>
	<T.MeshStandardMaterial
		color="red"
		emissive="white"
		roughness={0.8}
		metalness={0.2}
		map={someTexture}
		attach="material"
	/>
</T.Mesh>
```

This shows that objects which cannot be part of the scene graph (`THREE.MeshStandardMaterial` is not extending `THREE.Object3D`) can be attached to parent properties and therefore allow for easy composition of objects.

:::admonition type="tip"
All three.js modules ending with "Material" receive `attach="material"`, and all modules ending with "Geometry" receive `attach="geometry"` automatically. You do not strictly have to type it out!
:::

#### Attaching to nested properties

Just like with props, you can also attach the `ref` of a `<T>`/`<Three>` component to a nested property of its parent:

```svelte
<T.DirectionalLight>
	<T.OrthographicCamera
		attach="shadow.camera"
		left={-10}
		right={10}
		top={10}
		bottom={-10}
		near={1}
		far={1000}
	/>
</T.DirectionalLight>
```

## What about event handling?

A lot of three.js classes like the `OrbitControls` are extending `THREE.EventDispatcher` and offer a lot of events which you might want to listen and react to. Setting up event forwarders in wrapper components has been a manual chore for the most part. While unfortunately three.js's types do not yet contain strong type definitions for events, you can now listen to **any event** that a module has to offer:

```svelte
<T.OrbitControls
	on:change={(e) => {
		console.log('The times they are A-changin')
		console.log('event details:', e.detail)
	}}
/>
```

One thing to note is that `<T>`/`<Three>` does not offer interaction or viewport awareness out of the box but it can be easily implemented using [trait components](#using-trait-components).

## What happens to all the components in `@threlte/core`?

Some of the components in `@threlte/core` will move to `@threlte/extras` because that's where they belong. They are abstractions on top of three.js classes or add functionality that is special to how Svelte does things.

Other components will be removed after a certain transitional period. This gives you time to refactor your app to the new standard while keeping things running. Be aware that "old" `@threlte/core` components like `<Mesh>` or `<PerspectiveCamera>` will work in perfect harmony with the new approach!

The period in which the wrapping components will be marked as deprecated will be used to **collect feedback, educate and let concerns and ideas flow back into the project**.

Here's a preview of what goes where:

These components provide additional value and **will be moved to `@threlte/extras`**:

- `<AudioListener>`
- `<Audio>`
- `<PositionalAudio>`
- `<OrbitControls>`
- `<TransformControls>`
- `<SpotLight>`
- `<InstancedMesh>`
- `<Instance>`
- `<Line2>`

These components will be **removed**:

- `<OrthographicCamera>`
- `<PerspectiveCamera>`
- `<PositionalAudioHelper>`
- `<AmbientLight>`
- `<DirectionalLight>`
- `<PointLight>`
- `<HemisphereLight>`
- `<Fog>`
- `<FogExp2>`
- `<Mesh>`
- `<Group>`
- `<Object3D>`
- `<Line>`
- `<LineSegments>`
- `<MeshInstance>`
- `<Object3DInstance>`
- `<LightInstance>`
- `<CameraInstance>`
- `<LineInstance>`

I'm undecided on these components:

- `<Layers>`
- `<Pass>` – We want to open up the frameloop to allow custom rendering calls and therefore also custom postprocessing pipelines. This component might be obsolete then anyway.

## Using Trait Components

Threlte's way of composing functionality with _trait components_ works very well in harmony with the new components `<T>` and `<Three>`. Be aware that these new components are supposed to be as thin of a layer as possible and do not provide event handling or viewport awareness by default. It can easily composed in though:

```svelte
<T.Mesh let:ref>
	<InteractiveObject
		object={ref}
		interactive
		on:click={onClick}
	/>
	<ViewportAwareObject
		object={ref}
		viewportAware
		on:viewportenter={onViewportEnter}
	/>
</T.Mesh>
```

:::admonition type="info"

The trait components might be slightly renamed in the future to fit this use-case a bit better.

:::

## Wrapping it up

`@threlte/core` is changing. And I'm sorry for that. I know that some people might not like it in the beginning. I know that some educational content (that just came out) is at least _a bit_ deprecated. But I would not do that if I wouldn't think that this is the way forward. All of a sudden so much more is possible with just compositing Svelte components while still **benefitting from tree-shaking, extensibility, type-safety and reactivity**. I'm truly excited and looking forward to what you build with it.

Don't forget to leave your comments and feedback at our [Discord server](https://discord.gg/EqUBCfCaGm)!
