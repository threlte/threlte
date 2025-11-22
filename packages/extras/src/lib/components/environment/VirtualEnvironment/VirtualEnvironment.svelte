<script lang="ts">
  import type { VirtualEnvironmentProps } from './types.js'
  import { createSceneContext, observe, T, useTask, useThrelte } from '@threlte/core'
  import { useCubeCamera } from '../../../hooks/useCubeCamera.svelte.js'
  import { useEnvironment } from '../utils/useEnvironment.svelte.js'

  const ctx = useThrelte()

  let {
    far = 1000,
    frames = Infinity,
    isBackground = false,
    near = 0.1,
    onupdatestart,
    onupdatestop,
    resolution = 256,
    scene: parentScene = ctx.scene,
    visible,
    children
  }: VirtualEnvironmentProps = $props()

  // Create a parent scene to render the virtual environment into
  const { scene } = createSceneContext()

  export const { camera, renderTarget } = useCubeCamera(
    () => near,
    () => far,
    () => resolution
  )

  useEnvironment({
    texture: renderTarget.texture,
    get scene() {
      return parentScene
    },
    get isBackground() {
      return isBackground
    }
  })

  export const update = () => {
    camera.update(ctx.renderer, scene)
  }

  let count = 0
  const { start, stop, started } = useTask(
    () => {
      // if frames === Infinity, the task will run indefinitely
      if (count < frames) {
        update()
        count += 1
      } else {
        stop()
        onupdatestop?.()
      }
    },
    { autoStart: false }
  )

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
  observe(() => [far, near, frames, resolution], restart)
</script>

<T
  is={scene}
  attach={visible ? undefined : false}
>
  <T is={camera} />
  {@render children?.({ camera, renderTarget, restart, update })}
</T>
