<script lang="ts">
  import { forwardEventHandlers, T, useFrame, useParent, useThrelte } from '@threlte/core'
  import { Camera } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { useControlsContext } from '../useControlsContext'
  import type {
    OrbitControlsEvents,
    OrbitControlsProps,
    OrbitControlsSlots
  } from './OrbitControls.svelte'

  type $$Props = OrbitControlsProps
  type $$Events = OrbitControlsEvents
  type $$Slots = OrbitControlsSlots

  const parent = useParent()

  const isCamera = (p: any): p is Camera => {
    return p.isCamera
  }

  const { renderer, invalidate } = useThrelte()

  if (!renderer) throw new Error('Threlte Context missing: Is <OrbitControls> a child of <Canvas>?')

  if (!isCamera($parent)) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  export const ref = new ThreeOrbitControls($parent, renderer.domElement)

  const { start, stop } = useFrame(() => ref.update(), {
    autostart: false,
    debugFrameloopMessage: 'OrbitControls: updating controls'
  })

  $: {
    if ($$restProps.autoRotate || $$restProps.enableDamping) start()
    else stop()
  }

  const component = forwardEventHandlers()

  const { orbitControls } = useControlsContext()
</script>

<T
  is={ref}
  let:ref
  {...$$restProps}
  bind:this={$component}
  on:change={invalidate}
  on:create={({ ref, cleanup }) => {
    orbitControls.set(ref)
    cleanup(() => {
      orbitControls.set(undefined)
    })
  }}
>
  <slot {ref} />
</T>
