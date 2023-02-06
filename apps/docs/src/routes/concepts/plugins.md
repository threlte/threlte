# Plugins

## Injecting a Plugin

### What it looks like

Plugins open up the component `<Three>` (`<T>` with preprocessing) to external code that will be injected via context into every child instance of a `<Three>` component.

```ts
import { injectPlugin } from '@threlte/core'

injectPlugin('plugin-name', ({ ref, props }) => {
	console.log(ref, props)
})
```

If a plugin decides via `ref` or `props` analysis that it doesn't need to act in the context of a certain `<Three>` component, it can return early.

```ts
import { injectPlugin } from '@threlte/core'
import type { Object3D } from 'three'

const refIsObject3D = (ref: any): ref is Object3D => ref.isObject3D

injectPlugin('raycast-plugin', ({ ref, props }) => {
	if (!refIsObject3D(ref) || !props.raycast) return
})
```

The code of a plugin acts as if it would be part of the `<Three>` component itself and has access to all properties. A plugin is notified about property or `ref` changes and can run code in lifecycle functions such as `onMount` or `onDestroy`.

```ts
import { injectPlugin } from '@threlte/core'
import { onMount } from 'svelte'

injectPlugin('plugin-name', () => {
	// Use lifecycle hooks as if it would run inside a <Three> component.
	onMount(() => {
		console.log('onMount')
	})

	return {
		// This is called when the ref changes and on initialization.
		onRefChange(ref) {
			console.log(ref)

			// You can return a cleanup function that will be called when the ref
			// changes again or when the component is destroyed.
			return () => {
				console.log('cleanup')
			}
		},

		// This is called when the props change and on initialization. This includes
		// props like "args", "manual" and other base props of <Three> but also
		// props that are not part of the base props.
		onPropsChange(props) {
			console.log(props)
		},

		// This is called when the props change that are not part of the <Three>
		// components base props and on initialization.
		onRestPropsChange(restProps) {
			console.log(restProps)
		}
	}
})
```

It can also _claim properties_ so that the component `<Three>` does not act on it.

```ts
import { injectPlugin } from '@threlte/core'

injectPlugin('ecs', () => {
	return {
		// without claiming the property "position", <Three> would apply the
		// property to the object
		pluginProps: ['entity', 'health', 'velocity', 'position']
	}
})
```

Plugins are passed down by context and can be overridden to prevent the effects of a plugin for a certain tree.

```ts
import { injectPlugin } from '@threlte/core'

// this overrides the plugin with the name "plugin-name" for all child components.
injectPlugin('plugin-name', () => {})
```

### Creating a Plugin

Plugins can also be _created_ for external consumption. This creates a _named plugin_. The name is used to identify the plugin and to override it.

```ts
import { createPlugin } from '@threlte/core'

export const layersPlugin = createPlugin('layers', () => {
	// ... Plugin Code
})
```

```ts
// somewhere else, e.g. in a component

import { injectPlugin } from '@threlte/core'
import { layersPlugin } from '$plugins'

injectPlugin(layersPlugin)
```

## Examples

### Interactivity Plugin

This is en example implementation that adds interactivity to all `<Three>` components, so that `<T.Mesh on:click={() => console.log('click')} />` is possible:

```html
<script lang="ts">
	import { useThrelteRoot, injectPlugin, type ThreltePointerEvent } from '@threlte/core'
	import { createEventDispatcher } from 'svelte'
	import type { Object3D } from 'three'

	injectPlugin('interactivity', () => {
		const getThrelteUserData = (object: any): any => {
			return object.userData as any
		}

		const eventDispatcher = createEventDispatcher<{
			click: ThreltePointerEvent
			contextmenu: ThreltePointerEvent
			pointerup: ThreltePointerEvent
			pointerdown: ThreltePointerEvent
			pointerenter: ThreltePointerEvent
			pointerleave: ThreltePointerEvent
			pointermove: ThreltePointerEvent
		}>()

		const {
			addInteractiveObject,
			removeInteractiveObject,
			addRaycastableObject,
			removeRaycastableObject
		} = useThrelteRoot()

		const removeObjectInteractivity = (object: Object3D) => {
			removeRaycastableObject(object)
			removeInteractiveObject(object)
			delete getThrelteUserData(object).eventDispatcher
		}

		const setupObjectInteractivity = (object: Object3D) => {
			getThrelteUserData(object).eventDispatcher = eventDispatcher
			addRaycastableObject(object)
			addInteractiveObject(object)
		}

		return {
			onRefChange: (ref) => {
				if (!ref.raycast) return
				setupObjectInteractivity(ref)
				return () => {
					removeObjectInteractivity(ref)
				}
			},
			pluginProps: ['entity']
		}
	})
</script>

<slot />
```

Implementing it in your app would be as easy as:

```html
<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Interactivity from './plugins/Interactivity.svelte'
	import Scene from './Scene.svelte'
</script>

<canvas>
	<Interactivity>
		<Scene />
	</Interactivity>
</canvas>
```

### BVH Raycast Plugin

A Plugin that implements [BVH raycasting](https://github.com/gkjohnson/three-mesh-bvh) on all child meshes and geometries.

```html
<script lang="ts">
	import { injectPlugin } from '@threlte/core'
	import type { BufferGeometry, Mesh } from 'three'
	import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'

	const isBufferGeometry = (ref: any): ref is BufferGeometry => {
		return ref.isBufferGeometry
	}

	const isMesh = (ref: any): ref is Mesh => {
		return ref.isMesh
	}

	injectPlugin('bvh-raycast', () => {
		return {
			onRefChange(ref) {
				if (isBufferGeometry(ref)) {
					;(ref as any).computeBoundsTree = computeBoundsTree
					;(ref as any).disposeBoundsTree = disposeBoundsTree
					;(ref as any).computeBoundsTree()
				}
				if (isMesh(ref)) {
					;(ref as any).raycast = acceleratedRaycast
				}
				return () => {
					if (isBufferGeometry(ref)) {
						;(ref as any).disposeBoundsTree()
					}
				}
			}
		}
	})
</script>

<slot />
```

Implementing this plugin in your Scene:

```html
<script lang="ts">
	import { Canvas } from '@threlte/core'
	import BvhRaycast from './plugins/BvhRaycast.svelte'
	import Scene from './Scene.svelte'
</script>

<canvas>
	<BvhRaycast>
		<Scene />
	</BvhRaycast>
</canvas>
```

## Effects

In the components prior to version 5 render components (such as `<Mesh>`) all functionality was baked in. This Plugin API makes it possible to write safe and performant code that runs in every instance of `<Three>`/`<T>` and is able to provide generic features such as interactivity or implementing an ECS (such as [miniplex](https://github.com/hmans/miniplex)) or use-case specific plugin code.
