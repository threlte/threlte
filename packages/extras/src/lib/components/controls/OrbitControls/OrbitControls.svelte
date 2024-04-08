<script lang="ts">
  import { T, useTask, useParent, useThrelte } from '@threlte/core'
  import type { Camera } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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

  let { ref = $bindable(), ...props }: OrbitControlsProps & { ref: ThreeOrbitControls } = $props()

  const parent = useParent()

  const isCamera = (p: any): p is Camera => {
    return p.isCamera
  }

  const { renderer, invalidate } = useThrelte()

  if (!isCamera($parent)) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  ref = new ThreeOrbitControls($parent, renderer.domElement)

  const { start, stop } = useTask(ref.update, {
    autoStart: false,
    autoInvalidate: false
  })

  $effect.pre(() => {
    if (props.autoRotate || props.enableDamping) {
      start()
    } else {
      stop()
    }
  })

  const { orbitControls } = useControlsContext()
  orbitControls.set(ref)
  onDestroy(() => orbitControls.set(undefined))
</script>

<T
  is={ref}
  on:change={(event) => {
    invalidate()
    props.$$events?.change?.(event)
  }}
  {...props}
>
  <slot {ref} />
</T>
