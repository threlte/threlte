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
    maxDuration = 1,
    margin = 1.2,
    animate = true,
    fit = false,
    clip = false,
    interpolate,
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
    () => maxDuration,
    () => interpolate,
    () => onFit
  )

  const controls = $derived<OrbitControls | CameraControls | TrackballControls | undefined>(
    $cameraControls ?? $orbitControls ?? $trackballControls
  )

  export const update = () => {
    bounds.refresh()

    if (fit) {
      bounds.reset().fit()
    }

    if (clip) {
      bounds.clip()
    }
  }

  // Refresh bounds when viewport changes.
  $effect(() => {
    $size
    clip
    fit
    margin
    $camera
    controls

    update()
  })
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  {@render children?.({ ref: group })}
</T>
