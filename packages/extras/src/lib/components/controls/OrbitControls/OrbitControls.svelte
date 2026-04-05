<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import {
    OrbitControls,
    type OrbitControlsEventMap
  } from 'three/examples/jsm/controls/OrbitControls.js'
  import { useControlsContext } from '../useControlsContext.js'
  import type { OrbitControlsProps } from './types.js'
  import type { Event } from 'three'

  let { camera, ref = $bindable(), children, ...props }: OrbitControlsProps = $props()

  const { dom, camera: defaultCamera, invalidate } = useThrelte()
  const parent = useParent()
  const resolvedParent = $derived(
    camera ? camera : isInstanceOf($parent, 'Camera') ? $parent : $defaultCamera
  )

  // <HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  const controls = $derived(new OrbitControls(resolvedParent, dom))

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

  const handleChange = (event: Event<keyof OrbitControlsEventMap, OrbitControls>) => {
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
