<!--
@component

`<TrackballControls>` allow the camera to orbit freely around a target
without causing gimbal lock. This type of camera controller is commonly used
when the concepts of up and down are less important than the ability to
carefully inspect a model from every angle.

For an alternative camera controller, see
[`<OrbitControls>`](https://threlte.xyz/docs/reference/extras/orbit-controls).

If placed as a child of a camera component, `<TrackballControls>` will
attach to that camera. Otherwise, it attaches to the scene's default
camera. A camera can also be passed explicitly via the `camera` prop.
By default, damping is enabled. You can disable this by setting
`staticMoving` to true.

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

`<TrackballControls>` is a light wrapper that will use its parent as the target camera and 
the DOM element the renderer is rendering to as the DOM element to listen to. It will also 
by demand invalidate the frame loop.
-->
<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import { TrackballControls as ThreeTrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
  import { useControlsContext } from '../useControlsContext.js'
  import type { TrackballControlsProps } from './types.js'
  import type { Event } from 'three'
  import { untrack } from 'svelte'

  let { onchange, camera, ref = $bindable(), children, ...props }: TrackballControlsProps = $props()

  const { dom, camera: defaultCamera, invalidate, size } = useThrelte()
  const parent = useParent()
  const resolvedCamera = $derived(
    camera ? camera : isInstanceOf($parent, 'Camera') ? $parent : $defaultCamera
  )

  // `<HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  const controls = new ThreeTrackballControls(untrack(() => resolvedCamera))
  $effect.pre(() => {
    controls.object = resolvedCamera
  })

  useTask(
    () => {
      controls.update()
    },
    {
      autoInvalidate: false
    }
  )

  $effect(() => {
    controls.connect(dom)
    return () => controls.disconnect()
  })

  $effect(() => {
    const { width, height } = $size

    if (width && height) {
      controls.handleResize()
    }
  })

  const { trackballControls } = useControlsContext()

  $effect.pre(() => {
    const handleChange = (event: Event<any, ThreeTrackballControls>) => {
      invalidate()
      onchange?.(event)
    }
    const currentControls = controls

    trackballControls.set(controls)
    currentControls.addEventListener('change', handleChange)
    return () => {
      trackballControls.set(undefined)
      currentControls.removeEventListener('change', handleChange)
    }
  })
</script>

<T
  is={controls}
  bind:ref
  {...props}
>
  {@render children?.({ ref: controls })}
</T>
