<script lang="ts">
  import { forwardEventHandlers, T, useTask, useParent, useThrelte } from '@threlte/core'

  import type { Camera } from 'three'
  import { TrackballControls as ThreeTrackballControls } from 'three/examples/jsm/controls/TrackballControls'

  import { onDestroy } from 'svelte'

  import { useControlsContext } from '../useControlsContext'
  import type {
    TrackballControlsEvents,
    TrackballControlsProps,
    TrackballControlsSlots
  } from './TrackballControls.svelte'

  type $$Props = TrackballControlsProps
  type $$Events = TrackballControlsEvents
  type $$Slots = TrackballControlsSlots

  const parent = useParent()

  const isCamera = (p: any): p is Camera => {
    return p.isCamera
  }

  const { renderer, invalidate } = useThrelte()

  if (!isCamera($parent)) {
    throw new Error('Parent missing: <TrackballControls> need to be a child of a <Camera>')
  }

  export const ref = new ThreeTrackballControls($parent, renderer.domElement)

  useTask(ref.update, {
    autoInvalidate: false
  })

  const component = forwardEventHandlers()

  const { trackballControls } = useControlsContext()
  trackballControls.set(ref)
  onDestroy(() => trackballControls.set(undefined))
</script>

<T
  is={ref}
  let:ref
  {...$$restProps}
  bind:this={$component}
  on:change={invalidate}
>
  <slot {ref} />
</T>
