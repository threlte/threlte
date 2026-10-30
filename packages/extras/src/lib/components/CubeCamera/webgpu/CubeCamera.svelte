<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core/webgpu'
  import { Group } from 'three/webgpu'
  import type { CubeCameraWebGPUProps } from '../types.js'
  import { useCubeCamera } from './useCubeCamera.svelte.js'

  let {
    background = 'auto',
    far,
    fog = 'auto',
    frames = Infinity,
    near,
    onupdatestart,
    onupdatestop,
    resolution,
    children,
    ref = $bindable(),
    ...props
  }: CubeCameraWebGPUProps = $props()

  export const { camera, renderTarget } = useCubeCamera(
    () => near,
    () => far,
    () => resolution
  )

  const { renderer, scene } = useThrelte()

  const group = new Group()
  const inner = new Group()

  let count = 0
  let running = $state(false)

  export const update = () => {
    // if frames === Infinity, the task will run indefinitely
    if (count < frames) {
      const lastBackground = scene.background
      if (background !== 'auto') scene.background = background

      const lastFog = scene.fog
      if (fog !== 'auto') scene.fog = fog

      inner.visible = false
      camera.update(renderer, scene)

      scene.background = lastBackground
      scene.fog = lastFog
      inner.visible = true
      count += 1
    } else {
      running = false
      onupdatestop?.()
    }
  }

  useTask(update, {
    running: () => running
  })

  export const restart = () => {
    if (running) {
      onupdatestop?.()
    }

    count = 0
    running = true
    onupdatestart?.()
  }

  // if any of these props update, the task needs to be restarted
  $effect(() => {
    void [background, far, near, fog, frames, resolution]
    restart()
  })
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  <T is={camera} />
  <T is={inner}>
    {@render children?.({
      camera,
      renderTarget,
      ref: group,
      restart,
      update
    })}
  </T>
</T>
