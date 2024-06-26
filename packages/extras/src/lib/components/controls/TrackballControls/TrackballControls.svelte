<script lang="ts">
  import { T, useTask, useParent, useThrelte } from '@threlte/core'
  import type { Camera } from 'three'
  import { TrackballControls as ThreeTrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
  import { onDestroy } from 'svelte'
  import { useControlsContext } from '../useControlsContext'
  import type { TrackballControlsProps } from './TrackballControls.svelte'

  let { ref = $bindable(), onchange, children, ...props }: TrackballControlsProps = $props()

  const parent = useParent()

  const isCamera = (p: any): p is Camera => {
    return p.isCamera
  }

  const { renderer, invalidate } = useThrelte()

  if (!isCamera($parent)) {
    throw new Error('Parent missing: <TrackballControls> need to be a child of a <Camera>')
  }

  const controls = new ThreeTrackballControls($parent, renderer.domElement)

  useTask(controls.update, {
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
