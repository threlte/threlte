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

  let { onchange, ref = $bindable(), children, ...props }: TrackballControlsProps = $props()

  const parent = useParent()
  const { dom, invalidate, size } = useThrelte()

  if (!isInstanceOf($parent, 'Camera')) {
    throw new Error('Parent missing: <TrackballControls> need to be a child of a <Camera>')
  }

  // `<HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  const controls = $derived(new ThreeTrackballControls($parent))

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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    $size
    controls.handleResize()
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
