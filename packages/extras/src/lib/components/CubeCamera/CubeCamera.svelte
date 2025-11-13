<script lang="ts">
  import type { CubeCameraProps } from './types.js'
  import { Group } from 'three'
  import { observe, T, useTask, useThrelte } from '@threlte/core'
  import { useCubeCamera } from '../../hooks/useCubeCamera.svelte.js'

  let {
    background = 'auto',
    far = 1000,
    fog = 'auto',
    frames = Infinity,
    near = 0.1,
    onupdatestart,
    onupdatestop,
    resolution = 256,
    children,
    ref = $bindable(),
    ...props
  }: CubeCameraProps = $props()

  export const { camera, renderTarget } = useCubeCamera(
    () => near,
    () => far,
    () => resolution
  )

  const { renderer, scene } = useThrelte()

  const group = new Group()
  const inner = new Group()

  let count = 0

  export const update = () => {
    // if frames === Infinity, the task will run indefinitely
    if (count < frames) {
      inner.visible = false
      const originalFog = scene.fog
      const originalBackground = scene.background
      scene.background = background === 'auto' ? originalBackground : background
      scene.fog = fog === 'auto' ? originalFog : fog
      camera.update(renderer, scene)
      scene.background = originalBackground
      scene.fog = originalFog
      inner.visible = true
      count += 1
    } else {
      stop()
      onupdatestop?.()
    }
  }

  const { start, stop, started } = useTask(update, { autoStart: false })

  export const restart = () => {
    if ($started) {
      stop()
      onupdatestop?.()
    }
    count = 0
    start()
    onupdatestart?.()
  }

  // if any of these props update, the task will need to be restarted
  observe(() => [background, far, near, fog, frames, resolution], restart)
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  <T is={camera} />
  <T is={inner}>
    {@render children?.({ camera, ref: group, renderTarget, restart, update })}
  </T>
</T>
