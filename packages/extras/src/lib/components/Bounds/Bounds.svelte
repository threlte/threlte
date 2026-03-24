<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-expressions */
  import { Group } from 'three'
  import { T, useThrelte } from '@threlte/core'
  import { useControlsContext } from '../controls/useControlsContext.js'
  import type { BoundsProps } from './types.js'
  import type { OrbitControls, TrackballControls } from 'three/examples/jsm/Addons.js'
  import type CameraControls from 'camera-controls'
  import { provideBounds } from './useBounds.svelte.js'

  let {
    margin = 1,
    animate = true,
    enabled = true,
    onFit,
    ref = $bindable(),
    children,
    ...props
  }: BoundsProps = $props()

  const { camera, size } = useThrelte()
  const { orbitControls, trackballControls, cameraControls } = useControlsContext()

  const group = new Group()

  export const bounds = provideBounds(
    () => group,
    () => margin,
    () => animate,
    () => onFit
  )

  const controls = $derived<OrbitControls | CameraControls | TrackballControls | undefined>(
    $cameraControls ?? $orbitControls ?? $trackballControls
  )

  export const fit = () => {
    bounds.fit()
  }

  export const reset = () => {
    bounds.reset()
  }

  $effect(() => {
    $size
    enabled
    margin
    $camera
    controls
    animate

    if (enabled) {
      fit()
    }
  })
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  {@render children?.({ ref: group })}
</T>
