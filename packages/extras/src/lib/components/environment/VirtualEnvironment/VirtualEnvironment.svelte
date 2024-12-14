<script lang="ts">
  import type { VirtualEnvironmentProps } from './types'
  import { createSceneContext, observe, T, useTask, useThrelte } from '@threlte/core'
  import { useCubeCamera } from '../../../hooks/useCubeCamera.svelte'
  import { useEnvironment } from '../utils/useEnvironment.svelte'

  const ctx = useThrelte()

  let {
    far = 1000,
    frames = Infinity,
    near = 0.1,
    onrenderstart,
    onrenderstop,
    resolution = 256,
    children,
    isBackground,
    visible,
    scene: parentScene = ctx.scene
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

  let count = 0
  const { start, stop, started } = useTask(
    () => {
      // if frames === Infinity, the task will run indefinitely
      if (count < frames) {
        camera.update(ctx.renderer, scene)
        count += 1
      } else {
        stop()
        onrenderstop?.()
      }
    },
    { autoStart: false }
  )

  export const restart = () => {
    if ($started) {
      stop()
      onrenderstop?.()
    }
    count = 0
    start()
    onrenderstart?.()
  }

  // if any of these props update, the task will need to be restarted
  observe.pre(() => [far, near, frames, resolution], restart)
</script>

<T
  is={scene}
  attach={visible ? undefined : false}
>
  <T is={camera} />
  {@render children?.({ restart })}
</T>
