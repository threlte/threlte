<script lang="ts">
  import { forwardEventHandlers, T, useFrame, useParent, useThrelte } from '@threlte/core'
  import type { Camera } from 'three'
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

  if (!isCamera($parent)) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  export const ref = new ThreeOrbitControls($parent, renderer.domElement)

  const { start, stop } = useFrame(() => ref.update(), {
    autostart: false
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
    ref.update()
    cleanup(() => {
      orbitControls.set(undefined)
    })
  }}
>
  <slot {ref} />
</T>
