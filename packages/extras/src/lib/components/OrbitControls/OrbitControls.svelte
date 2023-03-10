<script lang="ts">
  import { forwardEvents, T, useFrame, useParent, useThrelte } from '@threlte/core'
  import { Camera } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import type {
    OrbitControlsEvents,
    OrbitControlsProps,
    OrbitControlsSlots
  } from './OrbitControls.svelte'

  type $$Props = OrbitControlsProps
  type $$Events = OrbitControlsEvents
  type $$Slots = OrbitControlsSlots

  const parent = useParent()

  const { renderer, invalidate } = useThrelte()

  if (!renderer) throw new Error('Threlte Context missing: Is <OrbitControls> a child of <Canvas>?')

  if (!($parent instanceof Camera)) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  export const controls = new ThreeOrbitControls($parent, renderer.domElement)

  const { start, stop } = useFrame(() => controls.update(), {
    autostart: false,
    debugFrameloopMessage: 'OrbitControls: updating controls'
  })

  $: {
    if ($$restProps.autoRotate || $$restProps.enableDamping) start()
    else stop()
  }

  const events = forwardEvents()
</script>

<T is={controls} let:ref {...$$restProps} bind:this={$events} on:change={invalidate}>
  <slot {ref} />
</T>
