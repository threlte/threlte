<script lang="ts">
  import { forwardEventHandlers, T, useTask, useParent, useThrelte } from '@threlte/core'

  import type { Camera } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'

  import { onDestroy } from 'svelte'

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

  const { start, stop } = useTask(ref.update, {
    autoStart: false,
    autoInvalidate: false
  })

  $: {
    if ($$restProps.autoRotate || $$restProps.enableDamping) start()
    else stop()
  }

  const component = forwardEventHandlers()

  const { orbitControls } = useControlsContext()
  orbitControls.set(ref)
  onDestroy(() => orbitControls.set(undefined))
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
