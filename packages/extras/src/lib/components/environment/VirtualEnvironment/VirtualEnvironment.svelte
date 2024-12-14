<script lang="ts">
  import { createSceneContext, isInstanceOf, observe, T, useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { CubeCamera, WebGLCubeRenderTarget } from 'three'
  import { useEnvironment } from '../utils/useEnvironment.svelte'
  import type { VirtualEnvironmentProps } from './types'

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

  // Create a render target to render the virtual environment to
  export const renderTarget = new WebGLCubeRenderTarget(resolution)

  useEnvironment({
    texture: renderTarget.texture,
    get scene() {
      return parentScene
    },
    get isBackground() {
      return isBackground
    }
  })

  // Update the render target size when the resolution changes
  observe.pre(
    () => [resolution],
    () => {
      renderTarget.setSize(resolution, resolution)
    }
  )

  onDestroy(() => {
    renderTarget.dispose()
  })

  export const camera = new CubeCamera(near, far, renderTarget)

  // We need to update every camera's properties individually
  observe.pre(
    () => [near, far],
    () => {
      camera.children.forEach((child) => {
        if (isInstanceOf(child, 'PerspectiveCamera')) {
          child.far = far
          child.near = near
          child.updateProjectionMatrix()
        }
      })
    }
  )

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
