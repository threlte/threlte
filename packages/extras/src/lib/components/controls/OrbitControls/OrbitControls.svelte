<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import {
    OrbitControls as ThreeOrbitControls,
    type OrbitControlsEventMap
  } from 'three/examples/jsm/controls/OrbitControls.js'
  import { useControlsContext } from '../useControlsContext.js'
  import type { OrbitControlsProps } from './types.js'
  import type { Event } from 'three'

  let { ref = $bindable(), children, ...props }: OrbitControlsProps = $props()

  const parent = useParent()
  const { dom, invalidate } = useThrelte()

  if (!isInstanceOf($parent, 'Camera')) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  // <HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  const controls = new ThreeOrbitControls($parent, dom)

  const { orbitControls } = useControlsContext()

  useTask(
    () => {
      controls.update()
    },
    {
      autoInvalidate: false,
      running: () => props.autoRotate || props.enableDamping || false
    }
  )

  const handleChange = (event: Event<keyof OrbitControlsEventMap, ThreeOrbitControls>) => {
    invalidate()
    props.onchange?.(event)
  }

  $effect.pre(() => {
    orbitControls.set(controls)
    return () => {
      orbitControls.set(undefined)
    }
  })
</script>

<T
  is={controls}
  bind:ref
  {...props}
  onchange={handleChange}
>
  {@render children?.({ ref: controls })}
</T>
