<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { TrackballControls as ThreeTrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
  import { useControlsContext } from '../useControlsContext'
  import type { TrackballControlsProps } from './TrackballControls.svelte'

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
