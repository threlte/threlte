<script lang="ts">
  import { forwardEventHandlers, T, useFrame, useParent, useThrelte } from '@threlte/core'
  import { derived } from 'svelte/store'
  import type { Camera } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { useInteractivity } from '../../../interactivity'
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

  const interactivity = useInteractivity()

  const isCamera = (p: any): p is Camera => {
    return p.isCamera
  }

  const { renderer, invalidate } = useThrelte()

  if (!isCamera($parent)) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  const ref = interactivity
    ? derived([interactivity.target, parent], ([target, parent]) => {
        if (!parent || !isCamera(parent)) return
        return new ThreeOrbitControls(parent, target || renderer.domElement)
      })
    : derived(parent, (parent) => {
        if (!parent || !isCamera(parent)) return
        return new ThreeOrbitControls(parent, renderer.domElement)
      })

  const { start, stop } = useFrame(() => $ref?.update(), {
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

{#if $ref}
  <T
    is={$ref}
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
    <slot ref={$ref} />
  </T>
{/if}
