<script lang="ts">
  import { T, useTask, useParent, useThrelte } from '@threlte/core'
  import type { Camera } from 'three'
  import { TrackballControls as ThreeTrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
  import { onDestroy } from 'svelte'
  import { useControlsContext } from '../useControlsContext'
  import type {
    TrackballControlsEvents,
    TrackballControlsProps,
    TrackballControlsSlots
  } from './TrackballControls.svelte'

  type $$Events = TrackballControlsEvents
  type $$Slots = TrackballControlsSlots

  let { ref = $bindable(), ...props }: TrackballControlsProps = $props()

  const parent = useParent()

  const isCamera = (p: any): p is Camera => {
    return p.isCamera
  }

  const { renderer, invalidate } = useThrelte()

  if (!isCamera($parent)) {
    throw new Error('Parent missing: <TrackballControls> need to be a child of a <Camera>')
  }

  // `<HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  const controls = new ThreeTrackballControls($parent, renderer.domElement.parentElement!)

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
  on:change={(event) => {
    invalidate()
    props.$$events?.change?.(event)
  }}
>
  <slot ref={controls} />
</T>
