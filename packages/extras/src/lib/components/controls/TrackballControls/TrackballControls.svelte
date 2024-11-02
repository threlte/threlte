<!--
@component

`<TrackballControls>` allow the camera to orbit freely around a target
without causing gimbal lock. This type of camera controller is commonly used
when the concepts of up and down are less important than the ability to
carefully inspect a model from every angle.

For an alternative camera controller, see
[`<OrbitControls>`](https://threlte.xyz/docs/reference/extras/orbit-controls).

The component `<TrackballControls>` must be a direct child of a camera
component and will mount itself to that camera. By default, damping is
enabled. You can disable this by setting `staticMoving` to true.

## Usage

```svelte
<script>
  import { TrackballControls } from '@threlte/extras'
  import { T } from '@threlte/core'
</script>

<T.PerspectiveCamera
  makeDefault
  fov={50}
>
  <TrackballControls />
</T.PerspectiveCamera>
```

`<TrackballControls>` is a light wrapper that will use its parent as the target camera and the DOM element the renderer is rendering to as the DOM element to listen to. It will also by demand invalidate the frame loop.
-->
<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { TrackballControls as ThreeTrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
  import { useControlsContext } from '../useControlsContext'
  import type { TrackballControlsProps } from './types'

  let { ref = $bindable(), onchange, children, ...props }: TrackballControlsProps = $props()

  const parent = useParent()

  const { renderer, invalidate } = useThrelte()

  if (!isInstanceOf($parent, 'Camera')) {
    throw new Error('Parent missing: <TrackballControls> need to be a child of a <Camera>')
  }

  // `<HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  const controls = new ThreeTrackballControls($parent, renderer.domElement.parentElement!)

  useTask(() => controls.update(), {
    autoInvalidate: false
  })

  const { trackballControls } = useControlsContext()
  trackballControls.set(controls)
  onDestroy(() => trackballControls.set(undefined))
</script>

<T
  is={controls}
  bind:ref
  {...props}
  onchange={(event) => {
    invalidate()
    onchange?.(event)
  }}
>
  {@render children?.({ ref: controls })}
</T>
