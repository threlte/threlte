<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import {
    OrbitControls,
    type OrbitControlsEventMap
  } from 'three/examples/jsm/controls/OrbitControls.js'
  import { useControlsContext } from '../useControlsContext.js'
  import type { OrbitControlsProps } from './types.js'
  import type { Event } from 'three'
  import { untrack } from 'svelte'

  let { camera, ref = $bindable(), children, ...props }: OrbitControlsProps = $props()

  const { dom, camera: defaultCamera, invalidate } = useThrelte()
  const parent = useParent()
  const resolvedCamera = $derived(
    camera ? camera : isInstanceOf($parent, 'Camera') ? $parent : $defaultCamera
  )

  // <HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  const controls = new OrbitControls(
    untrack(() => resolvedCamera),
    dom
  )
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

  $effect(() => {
    const pierced = props as Record<string, unknown>

    controls.object = resolvedCamera

    void props.target
    void pierced['target.x']
    void pierced['target.y']
    void pierced['target.z']
    void props.minDistance
    void props.maxDistance
    void props.minZoom
    void props.maxZoom
    void props.minPolarAngle
    void props.maxPolarAngle
    void props.minAzimuthAngle
    void props.maxAzimuthAngle
    void props.minTargetRadius
    void props.maxTargetRadius
    void props.enableDamping
    void props.zoomToCursor

    controls.update()
  })

  const handleChange = (event: Event<keyof OrbitControlsEventMap, OrbitControls>) => {
    invalidate()
    props.onchange?.(event)
  }

  $effect(() => {
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
